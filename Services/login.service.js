const mongo = require("../Shared/mongo");
const randomize = require("randomatic");

const service = {
    async login(req, res) {
        try {
            console.log(req.body);
            let data = req.body;
            const insertData = await mongo.db.collection("login").insertOne(data);
            await mongo.db.collection("login").findOneAndUpdate({ _id: insertData.insertedId },
                {
                    $set:
                        { "code": `${randomize('0', 6)}` }
                })
            const code = await mongo.db.collection("login").findOne({ _id: insertData.insertedId },
                { projection: { _id: 0, code: 1 } })
            res.send(code);

        } catch (error) {
            res.status(500).send({ error: "Internal server error" });
        }
    }
}

module.exports = service;