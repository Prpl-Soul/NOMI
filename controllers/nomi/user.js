const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/nomi/user');

const nomi = require('../../constants/Nomi');

exports.upsertGoogleUser = (accessToken, refreshToken, profile, cb) => {
  User.findOne({'googleProvider.id': profile.id})
  .then(user => {
    if (!user) {

      const newUser = new User({
        name: profile.displayName,
        history:[nomi.START],
        email: profile._json.email,
        image: profile._json.picture,
        googleProvider: {
          id: profile.id
        },
        created: new Date()
      });
      newUser.save(function(error, savedUser) {
          if (error) {
              //console.log(error);
          }
          var usefulInfosUser={
            id:savedUser.id,
            name:savedUser.name,
            image:savedUser.image
          }
          return cb(error, usefulInfosUser);
      })

    }
    else {
        var usefulInfosUser={
          id:user.id,
          name:user.name,
          image:user.image
        }
        return cb('', usefulInfosUser);
    }
  })
};

exports.upsertFbUser = (accessToken, refreshToken, profile, cb) => {
  User.findOne({'facebookProvider.id': profile.id})
  .then(user => {
    if (!user) {
      console.log(profile)
      const newUser = new User({
        name: profile.displayName,
        history:[nomi.START],
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        facebookProvider: {
          id: profile.id
        },
        created: new Date()
      });
      newUser.save(function(error, savedUser) {
          if (error) {
              //console.log(error);
          }
          console.log(savedUser)
          var usefulInfosUser={
            id:savedUser.id,
            name:savedUser.name,
            image:savedUser.image
          }
          return cb(error, usefulInfosUser);
      })
    }
    else {
        var usefulInfosUser={
          id:user.id,
          name:user.name,
          image:user.image
        }
        return cb('', usefulInfosUser);
    }
  })
};

exports.getHistory = (req, res, next) => {
  User.findOne({
    _id: req.userId
  })
  .select('history -_id')
  .then(
    (user) => {
      req.infos={}
      req.infos.history=user.toObject().history

      return next()
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.generateToken = (req, res, next) => {
  req.auth = jwt.sign(
    { userId: req.auth.id },
    '1019833676a0024967e46901',
    { expiresIn: '24h' }
  )
  return next();
};

exports.sendToken = (req, res, next) => {
  res.status(200);
  res.cookie('token', req.auth , { maxAge: 86399000, httpOnly: true });
  //res.json(req.user);
  req.infos.name=req.user.name
  req.infos.image=req.user.image
  res.json(req.infos);
};

exports.checkCookies = (req, res, next) => {
  req.infos={}
  req.infos.user={}
  if (typeof req.cookies.token === "undefined")
  {
    req.infos.user.login=false
    //res.status(200).json(req.infos);
  }
  else
  {
    req.infos.user.login=true
  }
  return next();
};

exports.getUserId = (req, res, next) => {
  if(req.infos.user.login){
    const decodedToken = jwt.verify(req.cookies.token, '1019833676a0024967e46901');
    req.userId = decodedToken.userId;
  }
  return next();
};

exports.getUserInfos = (req, res, next) => {
  if(req.infos.user.login){
  User.findOne({
    _id: req.userId
  })
  .select('name image history -_id')
  .then(
    (user) => {
      req.infos.user=user.toObject()
      req.infos.user.login=true
      return next()
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
  }
  else
    return next()
};

exports.sendInfos = (req, res, next) => {
  res.status(200).json(req.infos);
};

exports.destroyCookies = (req, res, next) => {
  res.status(200);
  res.cookie('token', 'toDestroy', { maxAge: 0});
  res.json({message:'token destroyed'});
};

exports.updateHistory = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.userId }, {history: req.body.history })
    .then(() => res.status(200).json({ message: 'history updated'}))
    .catch(error => res.status(400).json({ error }));
};

exports.updateHistoryIfBeginning = (req, res, next) => {
  var history=req.infos.history
  if(typeof req.body.history !== 'undefined' && history.length==1)
  {
    User.findOneAndUpdate({ _id: req.userId }, {history: req.body.history })
      .then(() => {
        req.infos.history=req.body.history
        return next()
      })
      .catch(error => res.status(400).json({ error }));
  }
  else
    return next()
};

exports.deleteUser = (req, res, next) => {
        User.deleteOne({ _id: req.userId })
          .then(() => next())
          .catch(error => res.status(400).json({ error }));
};

//exports.generateCsrfToken = (req, res, next) => {
//  res.json({ csrfToken: req.csrfToken() });
//}
