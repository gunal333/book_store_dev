const dirname = require('./util/path'); 
const path =  require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminROutes =require('./routes/admin');
const books =require('./routes/shop');
const invalidPathController = require('./controllers/invalidPath')
const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(dirname,"/public/")));
app.use('/admin/',adminROutes);
app.use(books);
app.use(invalidPathController.invalidPath);
app.listen(3030);    