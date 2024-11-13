Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

import { 
    siteLink, 
    pageLink
} from '../../support/helpers/global-helper';

import {
    getTestInfo
} from '../../support/helpers/forms';

import {links} from '../../support/helpers/sitemap';

describe('Loft Banner Form Testing', () => {    
    // Visit All the Pages and Test Banner Forms
    it(`Loft Banner Forms Testing: ${siteLink.url}`, () => {
        links.forEach((link) => {
            cy.visit(`${link}`, {
                auth: siteLink.auth
            });
            cy.get('body').then((body) => {
                if(body.find('[href="#site-global-inquire-popup"]').length > 0) {
                    const button = body.find('[href="#site-global-inquire-popup"]').first();
                    cy.get(button).click();
                    cy.get('form.site-form.inquire-form').then((forms) => {
                        cy.get(forms).each((form) => {
                            cy.wrap(form).within(() => {
                                if(form.find('input[type="text"], input[type="checkbox"], input[type="tel"], input[type="email"], select, textarea').length > 0) {
                                    cy.get(form.find('input[type="text"], input[type="checkbox"], input[type="tel"], input[type="email"], select, textarea')).each(($input) => {
                                        getTestInfo($input);
                                    })
                                }
                                if(form.find('input[type="submit"]').length > 0) {
                                    cy.get('input[type="submit"]').click({force: true});
                                }
                            });
                        });
                    });
                }
            });
        });
    });
    
});