const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const test = require('./controller/pagecontroller');


// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://errol:aUdi0o0o@cluster0.6ps2d.mongodb.net/ivan?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});



//home page
app.get('/', (req, res) => {
  res.redirect('/home')
});

//pages
app.get('/home', (req, res) => {
  res.render('home', { title: 'Home',log:'Admin' });
});

app.get('/services', test.service_index);
app.get('/services/AirValidation', test.air);
app.get('/services/NitrogenValidation', test.nitrogen);
app.get('/services/ThermalValidation', test.thermal);
app.get('/services/Caliberation', test.caliberation);

app.get('/clients', test.client_index);

//login
app.get('/Admin', test.loginpage);
app.post('/Admin', test.login);
app.get('/Adminpage', test.adminpage);

app.delete('/Admin/:id', test.deletek);
app.get('/:id', test.adminpage);

app.post('/Adminpage', test.add_data);

//mailing
app.post('/Contact', test.message);
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});