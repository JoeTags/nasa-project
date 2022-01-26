const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model')
const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb+srv://joetags:********@cluster0.k9a3g.mongodb.net/NASA-project?retryWrites=true&w=majority"

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
})

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch(err) {
    console.error(err);
  }
  
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`)
  });

  
}
startServer();







