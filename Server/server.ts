import * as Http from "http";
import * as Url from "url";
import * as  Mongo  from "mongodb";


export namespace Feuerwerk {
    interface Rocket {
        [type: string]: string | string[];
    }

    let rocket: Mongo.Collection;
    let databaseUrl: string = "mongodb://mongodb+srv://franziska_fuchs:<password>@eia2.482ba.mongodb.net/<dbname>?retryWrites=true&w=majority"
    startServer();
    connectToDatabase(databaseUrl);

    function startServer(): void {
        console.log("start_server");
        let server: Http.Server = Http.createServer();

        let port: number | string | undefined = process.env.PORT;
        if (port == undefined)
            port = 5001;

        console.log("Server starting on port:" + port);
        server.listen(port);
        server.addListener("request", handleRequest);

    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        rocket = mongoClient.db("fireworks").collection("rocketlists");
        console.log("Database connected: " + rocket);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let verify: string | string[] = url.query["command"];

        switch (verify) {
            case "retrieve": getRocketsFromDb(_request, _response);
                break;
            case "delete": deleteRocket(_request, _response);
                break;
            case "update": updateRocket(_request, _response);
                break;
            default:

                for (let key in url.query) {
                    _response.write(key + " : " + url.query[key] + "\n")                           //Schlüssel-Werte-Paar jeweils in Ausgabe an Client zurück
                }

                storeRocket(url.query);
                _response.end();

        }
    }

    async function getRocketsFromDb(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let results: Mongo.Cursor = rocket.find();                                             //Ergebnissuche der Einträge in rocket
        let rockets: string[] = await results.toArray();                                       //Ergebnisse in Array rockets speichern
        _response.write(JSON.stringify(rockets));                                              //Client ausgeben, welche Raketen gespeichert wurden

        _response.end();
    }


    async function deleteRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let rocketName: string | string[] = url.query["rocket"];
        rocket.deleteOne({ "Name": rocketName });
        _response.write("rocket deleted!");
        _response.end();
    }

    async function updateRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let oldName: string | string[] = url.query["rocket"];
        let rocketName: string | string[] = url.query["rocketName"];
        let rocketExplosion: string | string[] = url.query["ExplosionSize"];
        let rocketLifetime: string | string[] = url.query["Lifetime"];
        let rocketColor: string | string[] = url.query["Color"];
        let rocketParticleAmount: string | string[] = url.query["Amount"];
        let rocketParticleType: string | string[] = url.query["ParticleType"];
        let rocketParticleSize: string | string[] = url.query["ParticleSize"];

        rocket.updateOne({ "Name": oldName }, { $set: { "rocketName": rocketName, "ExplosionSize": rocketExplosion, "Lifetime": rocketLifetime, "Color": rocketColor, "Amount": rocketParticleAmount, "ParticleType": rocketParticleType, "ParticleSize": rocketParticleSize } });
        _response.write("rocket updated!");
        _response.end();
    }

    function storeRocket(data: Rocket): void {
        rocket.insertOne(data);                                                                //Speichern der Daten in rocket (mongo client)
    }


}
    