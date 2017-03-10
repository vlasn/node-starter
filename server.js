/**
 * Created by clstrfvck on 06/03/2017.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var massiiv = {
        yks: 1,
        kaks: 2
    };
    res.json(massiiv);
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
