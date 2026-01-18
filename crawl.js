function normalizeURL(urlString){
    const urlObjt = new URL(urlString);
    const hostpath =  `${urlObjt.hostname}${urlObjt.pathname}`;
    if (hostpath.length > 0 && hostpath.slice(-1) === '/'){
        return hostpath.slice(0, -1);
    }
    return hostpath;
}

module.exports = {
    normalizeURL
}