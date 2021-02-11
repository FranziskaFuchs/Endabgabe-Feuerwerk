import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Feuerwerk {
    interface Rocketlist {
        [type: string]: string | string[];
    }

    let rocketlists: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;


    let databaseUrl: string = "mongodb://localhost:27017";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);

    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        rocketlists = mongoClient.db("CocktailBar").collection("Orders");
        console.log("Database connection ", rocketlists != undefined);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }

            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);

            storeRocketlist(url.query);
        }

        _response.end();
    }


    function storeRocketlist(_rocketlist: Rocketlist): void {
        rocketlists.insert(_rocketlist);
        rocketlists.insertOne(_rocketlist);
    }
}
