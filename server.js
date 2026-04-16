/**
 * শুধু app import করে app.listen() চালায় — অন্য কিছু না

    const app = require('./src/app');
    app.listen(5000, () => console.log('Server running'));
 */


const app = require('./src/app');
const connectDB = require('./src/config/db');
const config = require('./src/config');

const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`✅ Server running on port ${config.port}`);
  });
};

startServer();