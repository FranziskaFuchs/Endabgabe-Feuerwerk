"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Feuerwerk;
(function (Feuerwerk) {
    let rocket;
    let databaseUrl = "mongodb+srv://user1:Mondsilbertraum1@eia2.482ba.mongodb.net/Firework?retryWrites=true&w=majority";
    startServer();
    connectToDatabase(databaseUrl);
    function startServer() {
        console.log("start_server");
        let server = Http.createServer();
        let port = process.env.PORT;
        port = 5001;
        console.log("Server starting on port:" + port);
        server.listen(port);
        server.addListener("request", handleRequest);
    }
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            yield mongoClient.connect();
            rocket = mongoClient.db("fireworks").collection("rocketlists");
            console.log("Database connected: " + rocket);
        });
    }
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url = Url.parse(_request.url, true);
        let verify = url.query["command"];
        switch (verify) {
            case "retrieve":
                getRocketsFromDb(_request, _response);
                break;
            case "delete":
                deleteRocket(_request, _response);
                break;
            case "update":
                updateRocket(_request, _response);
                break;
            default:
                for (let key in url.query) {
                    _response.write(key + " : " + url.query[key] + "\n"); //Schlüssel-Werte-Paar jeweils in Ausgabe an Client zurück
                }
                storeRocket(url.query);
                _response.end();
        }
    }
    function getRocketsFromDb(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = rocket.find(); //Ergebnissuche der Einträge in rocket
            let rockets = yield results.toArray(); //Ergebnisse in Array rockets speichern
            _response.write(JSON.stringify(rockets)); //Client ausgeben, welche Raketen gespeichert wurden
            _response.end();
        });
    }
    function deleteRocket(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = Url.parse(_request.url, true);
            let rocketName = url.query["rocket"];
            rocket.deleteOne({ "Name": rocketName });
            _response.write("rocket deleted!");
            _response.end();
        });
    }
    function updateRocket(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = Url.parse(_request.url, true);
            let oldName = url.query["rocket"];
            let rocketName = url.query["Name"];
            let rocketExplosion = url.query["ExplosionSize"];
            let rocketLifetime = url.query["Lifetime"];
            let rocketColor = url.query["Color"];
            let rocketAmount = url.query["Amount"];
            let rocketParticleType = url.query["ParticleType"];
            let rocketParticleSize = url.query["ParticleSize"];
            rocket.updateOne({ "Name": oldName }, { $set: { "rocketName": rocketName, "ExplosionSize": rocketExplosion, "Lifetime": rocketLifetime, "Color": rocketColor, "Amount": rocketAmount, "ParticleType": rocketParticleType, "ParticleSize": rocketParticleSize } });
            _response.write("rocket updated!");
            _response.end();
        });
    }
    function storeRocket(_data) {
        rocket.insertOne(_data);
    }
})(Feuerwerk = exports.Feuerwerk || (exports.Feuerwerk = {}));
//# sourceMappingURL=server.js.map