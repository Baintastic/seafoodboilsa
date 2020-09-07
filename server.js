const express = require('express');
require('dotenv').config();
const sendMail = require('./mail');
const app = express();
const log = console.log;
const path = require('path');
const bodyParser = require('body-parser')
const port = 8080;
 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true 
}));

app.post('/email', (req, res) => {
    log('Data: ', req.body);
    sendMail(req.body, function(err, data){
        if(err){
            res.status(500).json({ message: 'Internal Error'})
        }
        else{
            res.json({message: 'Email sent !!!!!!'})
        }
    });
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
})

app.listen(port , () =>{
    log('Server is starting on PORT', 8080)
});