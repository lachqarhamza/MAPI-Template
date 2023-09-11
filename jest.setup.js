import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoMemoryServer;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  const mongoUri = await mongoMemoryServer.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();

  allCollections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongoMemoryServer.stop();
  await mongoose.connection.close();
});
