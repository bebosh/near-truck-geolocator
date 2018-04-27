const express = require ('express');
const router = express.Router();
const Load =require('../models/loads');

// get a list chemicals from db
router.get('/chemicals', (req,res, next)=>{
    Load.aggregate().near({
        near: {type: 'point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        distanceField: "dist.calculated",
        maxDistance: 100000,
        spherical: true,
        
       }).then((load)=>{
           res.send(load);
       }).catch(next);
});

// add a chemical to db
router.post('/chemicals', (req,res, next)=>{
    Load.create(req.body).then((load)=>{
        res.send(load);
    }).catch(next);  
});

// update a chemical to db
router.put('/chemicals/:id', (req,res, next)=>{
    Load.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        Load.findOne({_id:req.params.id}).then((load)=>{
            res.send(load);
        });
    });
});

// delete a chemical from db
router.delete('/chemicals/:id', (req,res, next)=>{
    Load.findByIdAndRemove({_id:req.params.id}).then((load)=>{
        res.send(load);
    });
});

module.exports = router;