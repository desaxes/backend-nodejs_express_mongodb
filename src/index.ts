import { Collection, MongoClient } from "mongodb";
import { app } from "./app"

const mongoClient = new MongoClient("mongodb://localhost:27017");
const port = process.env.PORT || 3030;

let gameDb: Collection
let devDb: Collection
let userDb: Collection

(async () => {
    try {
        await mongoClient.connect();
        gameDb = mongoClient.db("GameDB").collection('Games')
        devDb = mongoClient.db("GameDB").collection('Developers')
        userDb = mongoClient.db("GameDB").collection('Users')
        app.listen(port);
        console.log("Success");
    } catch (err) {
        return console.log(err);
    }
})();

export { gameDb, devDb, userDb }
