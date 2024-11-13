import { siteLink } from "./global-helper";

const excludedLinks = [
    `${siteLink.url}/feedback/`,
    `${siteLink.url}/sitemap/`,
    `${siteLink.url}/thank-you/`,
    `${siteLink.url}/thankyou-subscribe/`,
    `${siteLink.url}/thank-you-newsletter/`
];
let links = [];

before(() => {
    const sitemapLink = `${siteLink.url}/sitemap`;
    cy.request({
        method: "GET",
        url: sitemapLink, 
        auth: siteLink.auth
    }).its('body').then((html) => {
        const $ = Cypress.$;
        $(html).find('.sitemap-list a').each((index, element) => {
            links.push($(element).attr('href')); 
        });
        links = links.filter(url => url && !excludedLinks.includes(url));
    });
});

export { links };