const puppeteer = require('puppeteer');
const url = require('url');

// get the url from terminal
let siteUrl = process.argv[2];
let q = url.parse(siteUrl, true);

(async () => {
  // get browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // go to sitemap page
  await page.goto(q.protocol + q.host + '/p/Sitemap-p.asp');
  // get all the links
  const theUrls = await page.$$eval( '.TPartBox1 td > a', (links) => links.map( link => link.href ));
  // loop over urls opening a page for each
  for (let i = 0; i < theUrls.length; i++) {
    const theLink = theUrls[i];
    await page.goto(theLink);
    console.log("opened up the url " + theLink);
  }
  console.log("done hitting urls.")

  await browser.close();
})().catch( e => { console.error(e) } );