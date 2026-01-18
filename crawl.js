const {JSDOM} = require('jsdom');

function normalizeURL(urlString){
    
    const urlObjt = new URL(urlString);
    const hostpath =  `${urlObjt.hostname}${urlObjt.pathname}`;
    if (hostpath.length > 0 && hostpath.slice(-1) === '/'){
        return hostpath.slice(0, -1);
    }
    return hostpath;
}

function getUrlsFromHTML(htmlBody, baseURL){

    const urls = [];
    const dom = new JSDOM(htmlBody);
    dom.window.document.querySelectorAll('a').forEach((anchor) => {
        let href = anchor.href; 
        if (href.startsWith(baseURL)) {
            try{
            const urlObjt = new URL(href);
            urls.push(href);
            }
            catch(err){
                console.log(`error with absolute url: ${err.message}`);
            }
        }
        if (href.startsWith('/')) {
            try {
                const completeURL = new URL(href, baseURL);
                urls.push(completeURL.href);
            } catch (err) {
                console.log(`error with relative url: ${err.message}`);
            }
        }
    });
    return urls;
}

async function crawlPage(baseURL, currentURL, pages) {
    console.log(`Crawling ${currentURL}`);

    const baseURLObjt = new URL(baseURL);
    const currentURLObjt = new URL(currentURL);

    if (baseURLObjt.hostname !== currentURLObjt.hostname){
        console.log(`different domain, skipping crawl of ${currentURL}`);
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL] ++; 
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`actively crawling ${currentURL}`);
    
    try {
    const response = await fetch(currentURL, {
    method : "GET",
    mode: "cors"
    });
    
    if (response.stats > 399){
        console.log(`error in fetch with status code: ${response.status} on page ${currentURL}`);
    return pages;
    }

    if (!response.headers.get("content-type").includes("text/html")){
        console.log(`non html response, content-type: ${response.headers.get("content-type")} on page ${currentURL}`);
    return pages;
    }

    const htmlBody = await response.text();
    nextUrls = getUrlsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextUrls){
        pages = await crawlPage(baseURL, nextURL, pages);
    }

    } catch (err) {
    console.log(`error in fetch: ${err.message}`);
    }

    return pages;

}


module.exports = {
    normalizeURL,
    getUrlsFromHTML,
    crawlPage
}