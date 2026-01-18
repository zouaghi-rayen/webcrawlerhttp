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

module.exports = {
    normalizeURL,
    getUrlsFromHTML
}