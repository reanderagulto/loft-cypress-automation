Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

import { 
    siteLink, 
    specificLinks
} from '../../support/helpers/global-helper';

import {
    getTestInfo
} from '../../support/helpers/forms';

describe('Loft Banner Form Test', () => {    
    // Visit All the Pages and Test Banner Forms
    it(`Loft Banner Forms Testing: ${siteLink.url}`, () => {
        specificLinks.forEach((link) => {
            cy.visit(`${siteLink.url}${link}`, {
                auth: siteLink.auth
            });
            cy.get('form.site-form').then((forms) => {
                cy.get(forms).each((form) => {
                    if (!form.parents('.site-global-inquire-popup').length && !form.parents('.site-newsletter').length && !form.parents('.site-book').length) {
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
                    }
                });
            });
        });
    });
    
});