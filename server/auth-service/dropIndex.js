const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb+srv://rawan:1234@cluster0.mongodb.net/users";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('<dbname>');
    const collection = db.collection('users');
    await collection.dropIndex("username_1");
    console.log("Index dropped successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
