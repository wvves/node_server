require("dotenv").config()
const { createServer } = require('http');
const express = require("express");
const cors = require("cors")
const fs = require("fs")
const mongoose = require("mongoose");
const authRouter = require("./routes");

const app = express();
const httpServer = createServer(app);

const port = process.env.PORT || 3000;
const host = process.env.HOST; 

app.use(express.json())
app.use(cors({
  credentials: true,
  // origin: 'http://localhost:5173'
}))

app.use('/api', authRouter)

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`, {
      useNewUrlParser:true,
      useUnifiedTopology:true,
    })

    httpServer.listen(port, () => {
      console.log(`Server listens http://localhost:${port}`);
    })
  } catch(e) {
    console.log(e);
  }
}

start()
// httpServer.listen(port, () => {
//   console.log(`Server listens http://localhost:${port}`);
// })
// const port = 3001;
// const host = '127.0.0.1';

// app.use(express.json())
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:5173'
// }))
// app.use(function (req, res, next) {
//   console.log('cors')
//   next();
// })

// app.post('/new', (request, response) => {
//   const id = request.body.id
//   fileHandler(id);
//   response.set('Content-Type', 'application/json')
//   response.status(200).send(`created new game feild with id: ${request.body.id}`)
//   // response.send(gameZone)
//   console.log('send Data')
// })

// app.post('/draw', (request, response) => {
//   const array = request.body.array
//   const dataRes = clickDrawEvent(array)
//   response.send(dataRes)
// })

// app.listen(port, host, function () {
//   console.log(`Server listens http://${host}:${port}`);
// });