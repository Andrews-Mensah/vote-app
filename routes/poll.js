const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1249139",
    key: "aa1cefd26c4690b93d17",
    secret: "0a2d98dbbee11c2fd11e",
    cluster: "eu",
    useTLS: true
});


router.get('/', (req, res,)=> {
    res.send('Poll Has Started');

});

router.post('/', (req, res) =>{
    pusher.trigger('presidential-poll', 'presidential-vote', {
        points: 1,
        presidential: req.body.presidential
    });

    return res.send( 
        'Thank You For Casting Your Vote');
});


module.exports = router;