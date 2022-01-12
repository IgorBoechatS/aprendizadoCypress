/// <reference types="cypress" />

describe('Trabalhando com o comando clock', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    })

    it('Voltando ao passado', () => {
        const data = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(data.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Indo ao futuro', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('to.be.greaterThan', 1334082230000)
        cy.clock()
        cy.tick(5000)
        cy.get('#resultado > span').invoke('text').should('gte', 4000)
    })
})