// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  console.log(req.params.date);
  let isDateValid = new Date(req.params.date).toUTCString() !== "Invalid Date";

  if (isDateValid) {
    res.json({
      unix: new Date(req.params.date).getTime(),
      utc: new Date(req.params.date).toUTCString()
    });
  } else if (!isNaN(new Number(req.params.date))) {
    let unixStringToNumber = new Number(req.params.date);
    res.json({
      unix: new Date(unixStringToNumber).getTime(),
      utc: new Date(unixStringToNumber).toUTCString()
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
