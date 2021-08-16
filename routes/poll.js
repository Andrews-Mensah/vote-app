const express = require('express');
const router = express.Router();
const pg = require('pg');

// const Vote = require('../models/votes');



const Pusher = require('pusher');
const { pool } = require('../dbConfig');




router.get('/', (req, res,)=> {
    res.send('Poll Has Started');

});

router.post('/', (req, res) =>{
    const newVote = {
        presidential: req.body.presidential,
        points: 1
    }

    new Vote (newVote).save().then(vote=>{
        pusher.trigger('presidential-poll', 'presidential-vote', {
            points: parseInt(vote.points),
            presidential: req.body.presidential
        });
    
        return res.send( 
            'Thank You For Casting Your Vote');

    })
    
});




module.exports = router;