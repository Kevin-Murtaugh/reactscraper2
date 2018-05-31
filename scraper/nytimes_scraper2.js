let cheerio = require("cheerio");
const phantom = require("phantom");
const fs = require("fs");

const nytimes_scraper = (searchterm, startyear, endyear, callback) => {
  const results = [];
  let startDate = "";

  if (startyear && startyear.length === 0) {
    startDate = "19900101";
  } else {
    startDate = `${startyear}0101`;
  }

  if (endyear && endyear.length === 0) {
    endDate = `${new Date().getFullYear()}1231`;
  } else {
    endDate = `${endyear}1231`;
  }

  let url = `https://www.nytimes.com/search?endDate=${endDate}&query=${searchterm}&sort=best&startDate=${startDate}`;

  console.log(`Scraping url ${url}`);

  request(url, function(html) {
    // console.log(html);
    const $ = cheerio.load(html);
    // console.log($("li.SearchResults-item--3k02W").length);
    $("li.SearchResults-item--3k02W").each(function(i, element) {
      console.log("One");
      let title = $(this)
        .find("h4.Item-headline--3WqlT")
        .text();

      let link = $(this)
        .find("a")
        .attr("href");

      let author = $(this)
        .find("p.Item-byline--4xY36")
        .text();

      link = `https://www.nytimes.com${link}`;

      results.push({
        title,
        link,
        author
      });
    });
    callback(results);
  });
};

const request = (url, callback) => {
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(url).then(function(status) {
        page.property("content").then(function(content) {
          callback(content);
          page.close();
          ph.exit();
        });
      });
    });
  });
};

nytimes_scraper("trump", "", "", results => {
  console.log(results);
});

// module.exports = nytimes_scraper;
