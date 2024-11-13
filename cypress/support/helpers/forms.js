import { testInfo } from "./global-helper";

const getPlaceholder = (element) => {
    cy.get(element).invoke('attr', 'placeholder').then((placeholder) => {
        const placeholderItem = placeholder.toLowerCase().replace(/\s+/g, '_').replace('.', '');
        if (testInfo.hasOwnProperty(placeholderItem)) {
            cy.get(`[placeholder="${placeholder}"]`).then(($inputs) => {
                cy.wrap($inputs).each(($input) => {
                    cy.wrap($input).type(testInfo[placeholderItem], { force: true });
                });
            });
        }
    });
}

export const getTestInfo = ($element) => {
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