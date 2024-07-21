const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const mongoDb = {};
const mongoDbColumns = {};
const mongoInit = async () => {
  const mongoURL = process.env.MONGO_DB_URL;
  try {
    if (!mongoURL?.length) {
      throw new Error(`[err] mongoURL invalide ${mongoURL}`);
    }
    const connection = await mongoose.connect(mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "voosh",
    });
    const collectionPath = `${__dirname}/../collections`;
    const eligibleCollectionFiles = fs
      .readdirSync(collectionPath)
      .filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".js");
    for (let collectionFile of eligibleCollectionFiles) {
      const collection = require(path.join(collectionPath, collectionFile));
      mongoDb[collection.modelName] = mongoose.model(
        collection.tableName,
        collection.schema,
        collection.collectionName
      );
      mongoDbColumns[collection.modelName] = collection.keys || {};
    }
    console.log(`[msg] mongoDb Connected ... ${connection.connection.host}`);
  } catch (error) {
    console.log("[err] error while initializing mongo...", error);
  }
};
module.exports = { mongoInit, mongoDb, mongoDbColumns };
