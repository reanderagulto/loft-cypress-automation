Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

describe('Loft Form Testing', () => {

    // Constants
    const basicAuth = Cypress.env('basicAuth');
    const excludedLinks = [
        `${Cypress.env('staging')}/feedback/`,
    ];

    const testInfo = {
        first_name: 'Automated Dev',
        last_name: 'Testing',
        email: 'imdev@august99.com',
        password: "password123456",
        phone: '09121231234',
        message: "This is an automated dev testing, please disregard. Thanks!",
        exclusives_name: "Automated Dev Testing",
        exclusives_email: 'imdev@august99.com',
    }

    const fillUpInputsBasedOnPlaceholders = ($element) => {
        cy.wrap($element).invoke('attr', 'placeholder').then((placeholder) => {
            const placeholderItem = placeholder.toLowerCase().replace(' ', '_');
            if (testInfo.hasOwnProperty(placeholderItem)) {
                cy.get(`[placeholder="${placeholder}"]`).then(($inputs) => {
                    cy.wrap($inputs).each(($input) => {
                        cy.wrap($input).type(testInfo[placeholderItem], { force: true });
                    });
                });
            }
        });
    }

    // Visit Homepage and fill out forms
    it(`Homepage Banner Form: ${Cypress.env('staging')}`, () => {
        cy.visit(Cypress.env('staging'), {
            auth: basicAuth
        });
        cy.get('form.site-form').then((forms) => {
            cy.get(forms).each((form) => {
                if (!form.parents('.site-global-inquire-popup').length && !form.parents('.site-newsletter').length) {
                    cy.wrap(form).within(() => {
                        if(form.find('[placeholder]').length > 0) {
                            cy.get('[placeholder]').each(($input) => {
                                fillUpInputsBasedOnPlaceholders($input)
                            });
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

