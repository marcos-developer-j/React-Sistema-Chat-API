const express = require('express')
var app = express();
const server=require('http').Server(app)
const response = require('./network/response')
const db = require('./db')
const router = require('./network/routes');
const socket = require('./socket')
require('dotenv').config();

db.connect(process.env.DB)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

socket.connect(server)
router(app)
app.use(`/app`, express.static('public'));
/* app.use('/',(req, res)=>{
    res.send('Hola Mundo Para nada')
}) */
server.listen(3000,()=>{
    console.log("Funciona")
});
