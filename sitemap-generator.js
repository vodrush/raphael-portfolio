
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/skills', changefreq: 'monthly', priority: 0.8 },
  { url: '/projects', changefreq: 'monthly', priority: 0.8 },
  { url: '/learning', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
];

const sitemap = new SitemapStream({ hostname: 'https://raphaelsantiago.com' });
const writeStream = createWriteStream('./public/sitemap.xml');

sitemap.pipe(writeStream);

links.forEach(link => {
  sitemap.write(link);
});

sitemap.end();

streamToPromise(sitemap)
  .then(() => console.log('Sitemap created successfully!'))
  .catch(console.error);
