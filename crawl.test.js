const { normalize } = require('yargs');
const {normalizeURL} = require('./crawl.js');
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
