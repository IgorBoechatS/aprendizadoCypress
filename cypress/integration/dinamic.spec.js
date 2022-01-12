/// <reference types="cypress" />


describe('Dinamic tests', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    const comidas = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    /*Esse é um laço que vai variar para cada valor do array "comidas". É o que a função do javascript
    "forEach" faz */
    comidas.forEach(comida => {
        it('Dinamic tests com a ${comida}... ', () => {



            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name=formSexo][value='F']`).click()
            cy.xpath("//label[contains(.,'Carne')]/../input").click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })

    it.only('Deve selecionar todos usando o Each', () => {
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('Qualquer')
        cy.get(`[name=formSexo][value='F']`).click()

        cy.get('[name=formComidaFavorita]').each($el => {
            //#el.click() funciona mas foi comentado porque pede a rastreabilidade dos clicks
            cy.wrap($el).click()
        })


        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')

        /* cy.get('#formCadastrar').click()
        cy.clickAlert('#formCadastro', 'Tem certeza que você é vegetariano?') */
    })

})