let cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

// https://www.nytimes.com/search?endDate=20180430&query=trump&sort=best&startDate=20180401&endDate=20180430

// BOTH START DATE AND END DATE SPECIFIED
// https://www.nytimes.com/search?endDate=20180228&query=california&sort=best&startDate=20170801

//  ONLY START DATE

// ONLY END DATE

const nytimes_scraper = (searchterm, startyear, endyear, callback) => {
  const results = [];
  let startDate = "";
  // const url = `https://www.nytimes.com/search?query=${searchterm}`;

  if (startyear.length === 0) {
    startDate = "19900101";
  } else {
    startDate = `${startyear}0101`;
  }

  if (endyear.length === 0) {
    endDate = `${new Date().getFullYear()}1231`;
  } else {
    endDate = `${endyear}1231`;
  }

  let url = `https://www.nytimes.com/search?endDate=${endDate}&query=${searchterm}&sort=best&startDate=${startDate}`;

  console.log(`Scraping url ${url}`);

  var dateMonth;
  var dateDay;
  var dateYear;

  // function dateTrim(dateStringRaw, datStringFormatted) {
  //   dateYear = dateStringRaw (2,5);
  //   dateMonth= dateStringRaw (6,7);
  //   dateDay= dateStringRaw (9,10);
  //   dateStringFormatted= dateDay + "/" + dateMonth + "/" + dateYear
  // }

  // console.log(dateStringRaw, dateStringFormatted);


  request(url, function(error, response, html) {
    const $ = cheerio.load(html);
    $("li.SearchResults-item--3k02W").each(function(i, element) {
  //     let date = $(this)
  //       .find("Item-section--1T6pp")
  //       .attr("href")
  //       dateTrim("href",dateFormatted)
  //       .attr(dateFormatted);
  // console.log(dateFormatted);  

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

// nytimes_scraper("trump", results => {
//   console.log(results);
// });

module.exports = nytimes_scraper;
