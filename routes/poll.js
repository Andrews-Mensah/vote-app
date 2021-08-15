const express = require('express');
const router = express.Router();
const pg = require('pg');

const Vote = require('../models/Vote');



const Pusher = require('pusher');




router.get('/', (req, res,)=> {
    res.send('Poll Has Started');

});

router.post('/', (req, res) =>{
    const newVote = {
        presidential: req.body.presidential,
        points: 1
    }

    new Vote







    pusher.trigger('presidential-poll', 'presidential-vote', {
        points: 1,
        presidential: req.body.presidential
    });

    return res.send( 
        'Thank You For Casting Your Vote');
});


module.exports = router;