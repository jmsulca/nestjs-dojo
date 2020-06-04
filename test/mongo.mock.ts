import * as mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fixtures = require('node-mongodb-fixtures');
import {MongoMemoryServer} from 'mongodb-memory-server';

export default class MockMongo {

  setup = async (uri: string) => {
    const fixtures = new Fixtures({
      dir: 'test/fixtures',
      filter: '.*',
      mute: true
    });
    await fixtures
    .connect(uri)
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .catch(console.error)
    .finally(() => fixtures.disconnect());

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        uri,
        {useNewUrlParser: true}
      );
    }
  }

}

export async function setupServer () {
  const mongoServer = new MongoMemoryServer();
  const serverUri = await mongoServer.getConnectionString();
  return serverUri;
}