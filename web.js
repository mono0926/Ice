const
    express = require("express"),
    logfmt = require("logfmt"),
    fs = require("fs"),
    path = require('path'),
    app = express();

app.use(logfmt.requestLogger());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    fs.readFile('./index.html', 'UTF-8', function(err, data) {

        res.send(data);
    })
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});