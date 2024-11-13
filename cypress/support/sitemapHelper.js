import { environment, basicAuth } from "./helpers/forms";

const excludedLinks = [
    `${environment}/feedback/`,
    `${environment}/sitemap/`,
    `${environment}/thank-you/`,
    `${environment}/thankyou-subscribe/`,
    `${environment}/thank-you-newsletter/`
];
let links = [];

before(() => {
    const sitemapLink = `${environment}/sitemap`;
    cy.request({
        method: "GET",
        url: sitemapLink, 
        auth: basicAuth
    }).its('body').then((html) => {
        const $ = Cypress.$;
        $(html).find('.sitemap-list a').each((index, element) => {
            links.push($(element).attr('href')); 
        });
        links = links.filter(url => url && !excludedLinks.includes(url));
    });
});

export default links;