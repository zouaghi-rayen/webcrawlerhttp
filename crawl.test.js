const {normalizeURL, getUrlsFromHTML} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizedUrl', () => {
    const input = "https://example.com/path";
    const actual = normalizeURL(input);
    const expected = "example.com/path";
    expect(actual).toEqual(expected);
})

test('normalizedUrl with a trailing slash ', () => {
    const input = "https://example.com/path/";
    const actual = normalizeURL(input);
    const expected = "example.com/path";
    expect(actual).toEqual(expected);
})

test('normalizedUrl with capitals ', () => {
    const input = "https://EXAMPLE.COM/path/";
    const actual = normalizeURL(input);
    const expected = "example.com/path";
    expect(actual).toEqual(expected);
})

test('normalizedUrl with http protocol ', () => {
    const input = "http://example.com/path/";
    const actual = normalizeURL(input);
    const expected = "example.com/path";
    expect(actual).toEqual(expected);
})

test('getUrlsFromHTML urls', () => {
    const inputHTMLBody = `<html>
    <body>
        <a href="https://example.com/path/1">link1</a>
        <a href="https://example.com/path/2">link2</a>
        <a href="/path/3">link3</a>
    </body>
    </html>`;
    const inputBaseURL = "https://example.com";
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        "https://example.com/path/1",
        "https://example.com/path/2",
        "https://example.com/path/3"
    ];
    expect(actual).toEqual(expected);

});

test('getUrlsFromHTML from invalid urls', () => {
    const inputHTMLBody = `<html>
    <body>
        <a href="invalid-url">link1</a>
    </body>
    </html>`;
    const inputBaseURL = "https://example.com";
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);

});
