const express = require('express');
var cookieParser = require('cookie-parser')
//var csrf = require('csurf')
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/nomi/user');
//const serviceJnnyRoutes = require('./routes/jnny/service');

//const CronJob = require('cron').CronJob;

//var serveStatic = require('serve-static')
//var serveIndex = require('serve-index');
//const fs = require('fs');

//const Info = require('./models/jnny/info');
//const Card = require('./models/jnny/card');
//const History = require('./models/jnny/history');

// test node cron
/*
const CronJob = require('cron').CronJob;

//console.log('Before job instantiation');
let date = new Date('2020-11-12T19:16:00')
date.setSeconds(date.getSeconds()+2);
const job = new CronJob(date, function() {
	const d = new Date();
	//console.log('Specific date:', date, ', onTick at:', d);
});
//console.log('After job instantiation');
job.start();
*/
// end of test node cron

//const Service = require('./models/jnny/service');

const app = express();

/*
//for websocket
var expressWs = require('express-ws')(app);
//
*/


app.use(cookieParser());
//const csrfProtection = csrf({
//  cookie: true
//});
//app.use(csrfProtection);

mongoose.connect('mongodb://localhost:27017/nomi_dev',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
//app.use('/api/auth', serviceJnnyRoutes);


// for fb login
//app.use(logger('combined'));
//app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
//app.use(passport.initialize());
//app.use(passport.session());


//

/*

app.post('/api/add_response_in_history', (req, res, next) => {
  //console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

app.post('/api/add_messages_in_history', (req, res, next) => {
  //console.log(req.body);
  //console.log(req.body.new_messages_and_responses.messages);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

//


app.get('/api/history/:service_id', (req, res, next) => {
  History.findOne({ service_id: req.params.service_id, user_id : "5eb59edd7cd953320d3e4a06" })
    .then(history => res.status(200).json(history))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/service_infos/:service_id', (req, res, next) => {
  Service.findOne({_id: req.params.service_id})
    .populate('creator')
    .then(service_infos => res.status(200).json(service_infos))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/history_old', (req, res, next) => {
  const history = {
    "_id" : "5eb5a4227cd953320d3e4b9a",
    "service_id" : "5eb5a0627cd953320d3e4a3c",
    "user_id" : "5eb59edd7cd953320d3e4a06",
    history:[
      {
        "message" : "message 1",
        "created" : "2010-09-25T05:44:20.201Z",
        "type" : 0
      },
      {
        "message" : "message 2",
        "created" : "2010-09-25T05:44:20.201Z",
        "type" : 0
      },
      {
        "message" : "reponse 2",
        "created" : "2010-09-25T05:44:20.201Z",
        "type" : 1
      },
      {
        "message" : "message 3",
        "created" : "2010-09-25T05:44:20.201Z",
        "type" : 0
      },
      {
        "url" : "http://localhost:3000/images/bravo.jpeg",
        "created" : "2010-09-25T05:44:20.201Z",
        "type" : 2
      },
      {
        "message" : "reponse 3",
        "created" : "2010-09-25T05:44:20.201Z",
        "type" : 1
      },
      {
        "message" : "last message",
        "created" : "2010-09-25T05:44:20.201Z",
        "type" : 0
      }
    ],
    "responses" : [
            {
                "text" : "suggestion 1",
                "response" : "suggestion 1 ici",
                "to_message" : "5eb5a1617cd953320d3e4a73"
            },
            {
                "text" : "suggestion 2",
                "response" : "suggestion 2 ici",
                "to_message" : "5eb5a1617cd953320d3e4a73"
            },
            {
                "text" : "suggestion 3",
                "response" : "suggestion 3 ici",
                "to_message" : "5eb5a1617cd953320d3e4a73"
            }
      ]
  };
  res.status(200).json(history);
});

app.use('/api/next_message', (req, res, next) => {
  const next_message = {
    "_id" : "5eb5a1617cd953320d3e4a73",
    "messages": [
      {
        "url" : "http://localhost:3000/images/bravo.jpeg",
        "type" : 2
      },
      {
        "message" : "Maintenant, pour chaque objectif ou tâche, tu mentionne la date avant laquelle tu dois le finir ONE",
        "type" : 0
      },
      {
        "message" : "Maintenant, pour chaque objectif ou tâche, tu mentionne la date avant laquelle tu dois le finir TWO",
        "type" : 0
      },
      {
        "url" : "http://localhost:3000/images/bravo.jpeg",
        "type" : 2
      },
      {
        "message" : "Maintenant, pour chaque objectif ou tâche, tu mentionne la date avant laquelle tu dois le finir THREE",
        "type" : 0
      },
      {
        "url" : "http://localhost:3000/images/bravo.jpeg",
        "type" : 2
      }
    ],
    "responses" : [
       {
           "text" : "ta daaa reponse 1",
           "response" : "reponse 1 ici",
           "to_message" : 1
       },
       {
           "text" : "ta daaa reponse 2",
           "response" : "reponse 2 ici",
           "to_message" : 2
       },
       {
           "text" : "ta daaa reponse 3",
           "response" : "reponse 3 ici",
           "to_message" : 3
       }
   ]
    };
  res.status(200).json(next_message);
});

app.use('/api/service', (req, res, next) => {
  const service = {
    "history" : [
        {
            "message" : "Bonjour!",
            "type" : 0
        },
        {
            "message" : "Aujourd’hui à 18:00, tu dois faire un peu de Sport",
            "type" : 0
        }
    ],
    "responses" : []
};
  res.status(200).json(service);
});

*/

/*
//for deploying
//app.use('/.well-known/*', express.static(path.join(__dirname, './.well-known', 'assetlinks.json')));

app.use(express.static(path.join(__dirname, './jnny/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './jnny', 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, './diagrams/build')));

app.get('/diagram', function (req, res) {
  res.sendFile(path.join(__dirname, './diagrams', 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, './diagrams/build')));

app.get('/diagram/*', function (req, res) {
  res.sendFile(path.join(__dirname, './diagrams', 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, './iframes/build')));

app.get('/iframes', function (req, res) {
  res.sendFile(path.join(__dirname, './iframes', 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, './iframes/build')));

app.get('/iframes/*', function (req, res) {
  res.sendFile(path.join(__dirname, './iframes', 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, './tasks/build')));

app.get('/tasks', function (req, res) {
  res.sendFile(path.join(__dirname, './tasks', 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, './nizias/build')));

app.get('/nizias/*', function (req, res) {
  res.sendFile(path.join(__dirname, './nizias', 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, './nizias/build')));

app.get('/nizias', function (req, res) {
  res.sendFile(path.join(__dirname, './nizias', 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, './tasks/build')));

app.get('/tasks/*', function (req, res) {
  res.sendFile(path.join(__dirname, './tasks', 'build', 'index.html'));
});


app.use(express.static(path.join(__dirname, './.well-known')));

//app.use(serveStatic(path.join(__dirname, './.well-known'),{dotfiles:'allow'}))


app.get('/.well-known/*', function (req, res) {
  res.sendFile(path.join(__dirname, './.well-known', 'assetlinks.json'));
  /*
  fs.readFile(path.join(__dirname, './assetslinks.json'), 'utf8', (err, json) => {
        console.log(err)
        let obj = JSON.parse(json);
        res.json(obj);
    });
    */
/*
});


app.use(express.static(path.join(__dirname, './jnny/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './jnny', 'build', 'index.html'));
});
//
*/
app.use(express.static(path.join(__dirname, './nomi/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './nomi', 'build', 'index.html'));
});

module.exports = app;
