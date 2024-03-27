import { MongoClient } from "mongodb";
import { app } from "./app"

const mongoClient = new MongoClient("mongodb://localhost:27017");
const port = process.env.PORT || 3030;

(async () => {
    try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("GameDB").collection("Games");
        app.listen(port);
        console.log("Success");
    } catch (err) {
        return console.log(err);
    }
})();
