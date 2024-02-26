const express = require('express');
const HTTP_SERVER = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./Database/dbConfig');
const path = require('path')

const PORT = process.env.PORT || 3000 ;

HTTP_SERVER.use(express.json())
HTTP_SERVER.use(bodyParser.json())
HTTP_SERVER.use(express.urlencoded({extended:false}))
HTTP_SERVER.use(cors())




HTTP_SERVER.get('/', (req, res) => {
    console.log('Server is running.');
    res.send('Server is running.');   
});

HTTP_SERVER.listen(PORT , ()=> {
    console.log(`Listening at port ${PORT}`);
});


HTTP_SERVER.use('/',require('./app'));