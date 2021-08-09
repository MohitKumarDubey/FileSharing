require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
console.log( process.env.ALLOWED_CLIENTS);
Cors 
// const corsOptions = {
//   origin: process.env.ALLOWED_CLIENTS.split(',')
//   // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
// }
const corsOptions={
    origin: "*"
}

app.use(cors(corsOptions));
app.use(express.static('./public'));
app.use(express.static('./public/frontend'));
const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
app.get("/",(req,res)=>{
  res.sendFile("index.html");
})
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));