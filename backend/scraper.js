const puppeteer = require('puppeteer');

async function scrapeMedium(topic) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(`https://medium.com/search?q=${encodeURIComponent(topic)}`, { waitUntil: 'networkidle2' });
    console.log("Browser launched");

    const articles = await page.evaluate(() => {
        const articles = Array.from(document.querySelectorAll("article")).map(e => {
            const titleElement = e.querySelector("a > h2");
            const authorElement = e.querySelector("a > p");
            const linkElement = e.querySelector("article > div > div > div > div > div:nth-child(1)");

            return {
                title: titleElement ? titleElement.innerText : 'No title',
                author: authorElement ? authorElement.innerText : 'No author',
                link: linkElement ? linkElement.getAttribute('data-href') : 'No link',
                // date: e.querySelector("article > a > span > div > span") ? e.querySelector("article > a > span > div > span").innerText : "no date"
            };
        });
        
        return articles;
    });

    console.log(`Found ${articles.length} articles`);
    await browser.close();
    return articles;
}

module.exports = {
    scrapeMedium
};
