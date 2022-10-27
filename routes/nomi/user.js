const express = require('express');
const router = express.Router();

var passport = require('passport');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');

const userCtrl = require('../../controllers/nomi/user');
const pageCtrl = require('../../controllers/nomi/page');

passport.use(new GoogleTokenStrategy(

    /*
    {
        clientID: '1019833678189666',
        clientSecret: '6a0024967e469014a34f8060577a8128'
    }
    */



    {
        clientID: '671322445374-5c86pdfo9m22p6r2fiue26o7lcf3mpql.apps.googleusercontent.com',
        clientSecret: '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'
    }





    ,
    function (accessToken, refreshToken, profile, done) {
      // I HAVE ACCESSTOKEN AND PROFILE
      userCtrl.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
            return done(err, user);
      });
    }));

passport.use(new FacebookTokenStrategy(


        {
            clientID: '421975540127985',
            clientSecret: 'f6de730284cbf1a233206dff3a39d1ae'
        }



        /*
        {
            clientID: '660173108818636',
            clientSecret: '2748599215c9da589730b356c6f05fad'
        }
        */





        ,
        function (accessToken, refreshToken, profile, done) {
          // I HAVE ACCESSTOKEN AND PROFILE
          userCtrl.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
          });
}));

router.post('/google',
            passport.authenticate('google-token', {session: false}),
            function(req, res, next) {
              if (!req.user) {
                return res.send(401, 'User Not Authenticated');
              }
              req.auth = {
                id: req.user.id
              };
              // for next
              req.userId=req.user.id
              //
              return next();
            },
            userCtrl.getHistory,
            userCtrl.updateHistoryIfBeginning,
            userCtrl.generateToken,
            userCtrl.sendToken
          );


router.post('/fb',
                      passport.authenticate('facebook-token', {session: false}),
                      function(req, res, next) {
                        if (!req.user) {
                          return res.send(401, 'User Not Authenticated');
                        }
                        req.auth = {
                          id: req.user.id
                        };
                        // for next
                        req.userId=req.user.id
                        //
                        return next();
                      },
                      userCtrl.getHistory,
                      userCtrl.updateHistoryIfBeginning,
                      userCtrl.generateToken,
                      userCtrl.sendToken
);

router.get('/get_infos',
            userCtrl.checkCookies,
            userCtrl.getUserId,
            userCtrl.getUserInfos,
            pageCtrl.getPages,
            userCtrl.sendInfos
);

router.get('/logout',
            userCtrl.destroyCookies);

router.put('/update_history',
            userCtrl.checkCookies,
            userCtrl.getUserId,
            userCtrl.updateHistory
            );

router.delete('/delete_user',
            userCtrl.checkCookies,
            userCtrl.getUserId,
            userCtrl.deleteUser,
            userCtrl.destroyCookies,
            );

//router.get('/csrf-token',
//            userCtrl.generateCsrfToken);


module.exports = router;
