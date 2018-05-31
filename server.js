const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
const ny_scraper = require("./scraper/nytimes_scraper");

app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.get("/news", (req, res) => {
  // let term = req.query.searchterm;
  // console.log(`The term is ${term}`);
  // console.log(req.query);

  let { searchterm, numofrecords, startyear, endyear } = req.query;
  ny_scraper(searchterm, startyear, endyear, function(results) {
    if (numofrecords) {
      results = results.slice(0, parseInt(numofrecords));
    }
    res.json({ results });
  });
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
