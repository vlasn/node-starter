/**
 * Created by clstrfvck on 06/03/2017.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.json("sup");
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});