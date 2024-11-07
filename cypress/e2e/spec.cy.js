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
        text: 'Automated Dev Testing',
        email: 'dev@test.com',
        password: "password123456",
        tel: '09121231234',
        textarea: "This is an automated dev testing, please disregard. Thanks!"
    }

    // Visit Homepage and fill out forms
    it(`Visit Website: ${Cypress.env('staging')}`, () => {
        cy.visit(Cypress.env('staging'), {
            auth: basicAuth
        });
        cy.get('form.site-form:not(.site-global-inquire-popup form)').each((form) => {
            cy.wrap(form).within(() => {

                if(form.find('input[type="text"]').length > 0) {
                    cy.get('input[type="text"]').then(($inputs) => {
                        cy.wrap($inputs).each(($input) => {
                            cy.wrap($input).type(testInfo.text, { force: true });
                        });
                    });
                }

                if(form.find('input[type="tel"]').length > 0) {
                    cy.get('input[type="tel"]').then(($inputs) => {
                        cy.wrap($inputs).each(($input) => {
                            cy.wrap($input).type(testInfo.tel, { force: true });
                        });
                    });
                }
    
                if(form.find('input[type="email"]').length > 0) {
                    cy.get('input[type="email').then(($inputs) => {
                        cy.wrap($inputs).each(($input) => {
                            cy.wrap($input).type(testInfo.email, { force: true });
                        });
                    });
                }

                if(form.find('input[type="password"]').length > 0) {
                    cy.get('input[type="password"]').then(($inputs) => {
                        cy.wrap($inputs).each(($input) => {
                            cy.wrap($input).type(testInfo.password, { force: true });
                        });
                    });
                }
                
                if(form.find('input[type="checkbox"]').length > 0) {
                    cy.get('input[type="checkbox"]').then(($inputs) => {
                        cy.wrap($inputs).check({force: true});
                    });
                }

                if(form.find('input[type="radio"]').length > 0) {
                    cy.get('input[type="radio"]').then(($inputs) => {
                        cy.get($inputs).first().check({force: true});
                    });
                }

                if(form.find('select').length > 0) {
                    cy.get('select').then(($inputs) => {
                        $inputs.each(($index, $input) => {
                            cy.wrap($input).select($select.find('option').eq(1).val(), {force: true});
                        });
                    });
                }

                if(form.find('textarea').length > 0) {
                    cy.get('textarea').then(($inputs) => {
                        $inputs.each(($index, $input) => {
                            cy.wrap($input).type(testInfo.textarea, {force: true});
                        });
                    });
                }

                if(form.find('input[type="submit"]').length > 0) {
                    cy.get('input[type="submit"]').click({force: true});
                }
                
            });
        });
    });
});

