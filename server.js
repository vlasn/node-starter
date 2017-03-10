/**
 * Created by clstrfvck on 06/03/2017.
 */
var express = require('express');
var app = express();

app.get('/korruta/', function (req, res) {
    var arv1 = req.query.arv1;
    var arv2 = req.query.arv2;
    var tulem = arv1 * arv2;
    res.json(tulem);
    //Testimiseks url: localhost:3000/korruta?arv1=7&arv2=16
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
