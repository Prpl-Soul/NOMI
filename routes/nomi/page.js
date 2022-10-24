const express = require('express');
const router = express.Router();

const userCtrl = require('../../controllers/jnny/user');
const infoCtrl = require('../../controllers/jnny/info');
const historyCtrl = require('../../controllers/jnny/history');
const cardCtrl = require('../../controllers/jnny/card');
const serviceCtrl = require('../../controllers/jnny/service');


router.put('/start_from_the_beginning/:service_id',
            userCtrl.checkCookiesBeforeHistory,
            userCtrl.getUserId,
            infoCtrl.cutParentLink,
            infoCtrl.startFromTheBeginning,
            historyCtrl.deleteService,
          );

router.delete('/delete_service/:service_id',
            userCtrl.checkCookiesBeforeHistory,
            userCtrl.getUserId,
            userCtrl.updateCurrentServices,
            infoCtrl.deleteService,
            infoCtrl.cutParentLink,
            historyCtrl.deleteService,
            );

router.post('/add_service',
            userCtrl.checkCookiesBeforeHistory,
            userCtrl.getUserId,
            infoCtrl.addService,
          );

router.get('/pre_redirection/:service_id',
            userCtrl.checkCookies,
            userCtrl.getUserId,
            //infoCtrl.updateCurrentsPreRedirection,
            serviceCtrl.checkIfIdIsValid,
            serviceCtrl.getServiceInfos
           );

router.put('/update_currents_pre_redirection',
            userCtrl.checkCookies,
            userCtrl.getUserId,
            infoCtrl.updateCurrentsPreRedirection,
          );

router.put('/publish_service/:service_id',
            userCtrl.checkCookiesBeforeHistory,
            userCtrl.getUserId,
            serviceCtrl.checkIfIdIsValid,
            serviceCtrl.publishService
          );

router.put('/get_new_cards/:service_id',
            userCtrl.checkCookies,
            userCtrl.getUserId,
            serviceCtrl.checkIfIdIsValid,
            cardCtrl.getNewCards,
            serviceCtrl.getNewCodeBss,
            infoCtrl.backOldInfos
          );

//router.get('/csrf-token',
//            userCtrl.generateCsrfToken);


module.exports = router;
