/// <reference types="cypress" />


it('Should acess a page and interact with an element', () => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
        .get('#buttonSimple').click()
        .get('#buttonSimple').should('have.value', 'Obrigado!')
})

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    })

    it('Text', () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.get('body').should('contain', 'Cuidado')
        // cy.get.('body').should('have.text','Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
    })

    it('Links', () => {

        cy.get('a').click({ multiple: true })
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()

    })

    it('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
            .type('teste123')
            .should('have.value', 'teste123')

            .clear()
            .type('Erro{selectall}acerto')
            .should('have.value', 'acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')
        cy.get("[name='formSexo']").should('have.length', 2)
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        //TODO validar as opções do combo
    })

    it('Combo Múltiplo', () => {
        cy.get('[data-testid="dataEsportes"]')
            .select(['natacao', 'Corrida', 'nada'])

        //TODO validar as opções selecionadas do combo multiplo
    })
})