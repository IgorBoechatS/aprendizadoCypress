/// <reference types="cypress" />

describe('Inserir conta', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me')
    })

    it('test', () => {
        cy.get('.input-group > .form-control').type('igor123')
        cy.get(':nth-child(2) > .form-control').type('igor123')
        cy.get('.btn').click()
        cy.get('.dropdown-toggle').click()
        cy.get('[href="/contas"]').click()
        cy.get('.form-control').type('Conta de teste 1')
        cy.get('.btn').click()
        cy.get('.toast-success > .toast-message').should('contain', 'Conta inserida com sucesso!')
    })

})
