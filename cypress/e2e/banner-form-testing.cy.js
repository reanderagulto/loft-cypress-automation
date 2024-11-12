Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});

describe('Loft Banner Form Testing', () => {
    // Constants
    const basicAuth = Cypress.env('basicAuth');
    const environment = Cypress.env('staging'); // Change this to dev, staging or live.
    const excludedLinks = [
        `${environment}/feedback/`,
    ];
    let testInfo ;
    before(() => {
        cy.fixture('testInfo').then((data) => {
            testInfo = data;
        });
    });

    const getPlaceholder = (element) => {
        cy.get(element).invoke('attr', 'placeholder').then((placeholder) => {
            const placeholderItem = placeholder.toLowerCase().replace(' ', '_').replace('.', '');
            if (testInfo.hasOwnProperty(placeholderItem)) {
                cy.get(`[placeholder="${placeholder}"]`).then(($inputs) => {
                    cy.wrap($inputs).each(($input) => {
                        cy.wrap($input).type(testInfo[placeholderItem], { force: true });
                    });
                });
            }
        });
    }

    const getTestInfo = ($element) => {
        cy.get($element).then((element) => {
            const tagName = element.prop('tagName').toLowerCase();
            const type = element.attr('type');
            switch(tagName) {
                case 'input': 
                    if (['text', 'email', 'tel'].includes(type)) {
                        getPlaceholder(element);
                    }
                    if(type === 'checkbox') {
                        cy.get(element).first().check({force: true});
                    }
                    break; 
                case 'textarea':
                    getPlaceholder(element);
                    break;
                case "select":
                    cy.get(element).select(1, {force: true});
                    break;
                default:
                    break;
            }
        });
    }

    // Visit All the Pages and Test Banner Forms
    it(`Loft Banner Forms Testing: ${environment}`, () => {
        cy.visit(`${environment}/spaces/virtual-office/`, {
            auth: basicAuth
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