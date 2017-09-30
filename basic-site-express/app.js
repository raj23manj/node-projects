var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', {title : 'Welcome'});
});


app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send', (req, res) => {
  let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'test',
            pass: 'test'
        }
    });

  let mailOptions = {
        from: 'Foo <foo@test.com>', // sender address
        to: 'test@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.redirect('/');
        }else{
          console.log('Message sent:');
          res.redirect('/');
        }
        
        
    });
});

app.listen(3000);

console.log("Server is running");

module.exports = app;