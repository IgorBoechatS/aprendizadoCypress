/// <reference types="cypress" />

/*A ferramente de locator do cypress é ótima, porém, ela já escolhe para você
como ela vai referenciar. Em alguns é id, input, etc. Contudo, é possível definir
qual estratégia vc quer q o cypress use. Nesse contexto, "data-cy", "data-test" e outras
tags criadas especialmente para se usar no teste, o que evita que alguém as altere e quebre
o teste */

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    })

    it('Using xpath... ', () => {
        cy.xpath('//input')
    })
})