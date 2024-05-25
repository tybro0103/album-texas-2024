const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const tybroData = require('./docs/images');

const title = 'Dallas, South Padre, & Starbase';

console.log('----tybroData.images.length', tybroData.images.length);
console.log('----tybroData.ssImageUrl', tybroData.ssImageUrl);

const baseHtmlPath = path.join(__dirname, '/docs/base.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

tybroData.images.forEach((img, index) => {
  const imgHtmlPath = path.join(__dirname, `/docs/${img.key}.html`);
  const imgHtml = baseHtml.replace('<!-- DYNAMIC_HEAD -->', `
    <title>#${img.key} | ${title}</title>
    <meta property="og:title" content="#${img.key} | ${title}" />
    <meta property="og:image" content="${img.urlLarge}" />
    <meta property="og:site_name" content="${title}" />
  `);
  fs.writeFileSync(imgHtmlPath, imgHtml);
});


const indexHtmlPath = path.join(__dirname, `/docs/index.html`);
const indexHtml = baseHtml.replace('<!-- DYNAMIC_HEAD -->', `
  <title>${title}</title>
  <meta property="og:title" content="${title}" />
  <meta property="og:image" content="${tybroData.ssImageUrl}" />
  <meta property="og:site_name" content="${title}" />
`);
fs.writeFileSync(indexHtmlPath, indexHtml);
