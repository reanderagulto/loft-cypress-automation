// Constants
export const basicAuth = Cypress.env('basicAuth');                    
const environment = Cypress.env('environment'); 
let testInfo;
let siteLink;
let specificLinks;

before(() => {
    cy.fixture('testInfo').then((data) => {
        testInfo = data;
    });
});

before(() => {
    cy.fixture('links').then((data) => {
        specificLinks = data.links;
    });
});

switch(environment) {
    case 'dev':
        siteLink = {
            url: Cypress.env('dev'),
            auth: {
                username: '',
                password: ''
            }
        };
        break;
    case 'staging': 
        siteLink = {
            url: Cypress.env('staging'),
            auth: basicAuth
        }; 
        break;
    case 'live': 
        siteLink = {
            url: Cypress.env('live'),
            auth: {
                username: '',
                password: ''
            }
        }; 
        break;
}

export const pageLink = `${siteLink.url}${Cypress.env('singlePage')}`; 
export { siteLink, testInfo, specificLinks };