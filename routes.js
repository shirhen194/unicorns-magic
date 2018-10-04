const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/unicornsDB', function () {
    console.log("DB connection established!!!");
})

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


var Unicorn = require('./public/model-unicorn.js');

router.get('', function (req, res) {
    Unicorn.find({}).exec(function (err, unicorns) {
        if (err) {
            console.error(err);
        } else {
            res.send(unicorns)
        }
    });
});

//2
router.post('', function (req, res) {
    var unicorn = new Unicorn({
        name: req.body.name,
        magic: req.body.magic
    });
    unicorn.save(function(err,data){
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }else{
         res.send(data)
        }
    })
    
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    Unicorn.findByIdAndRemove(id, function (err, post) {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }else{
            res.send("ok")
        }
    });
});



module.exports = router

