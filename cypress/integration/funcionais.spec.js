/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Testes do desafio final', () => {
    before(() => {
        cy.login('igor123', 'igor123')
        /* cy.visit('http://barrigareact.wcaquino.me')
        cy.get(loc.LOGIN.USER).type('igor123')
        cy.get(loc.LOGIN.PASSWD).type('igor123')
        cy.get(loc.LOGIN.BTN_LOGIN).click() */
    })

    it('Testar criação de conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('Conta qualquer')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE.SUCESSO).should('contain', 'Conta inserida com sucesso!')
    })

    it('Testar alteração de conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE.SUCESSO).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Teste de inserção de conta repetida', () => {
        cy.get('.dropdown-toggle').click()
        cy.get('[href="/contas"]').click()
        cy.get('.form-control')
            .clear()
            .type('Conta alterada')
        cy.get('.btn').click()
        cy.get('.toast-error > .toast-message').should('contain', 'Erro: Error: Request failed with status code 400')

    })

    it('Teste de movimentação', () => {
        cy.get(':nth-child(2) > .nav-link > .fas').click()
        cy.get('.col-2 > .btn').click()
        cy.get('.btn-secondary').click()
        cy.get('#descricao').type('teste')
        cy.get('.col-4 > .form-control').type('123')
        cy.get('#envolvido').type('pessoa qualquer')
        cy.get(':nth-child(3) > :nth-child(2) > .form-control').select('Conta alterada')
        cy.get(':nth-child(3) > .form-control').invoke('removeAttr', 'type').type('2022-01-01{enter}');
        cy.get('.btn-primary').click()
        cy.get('.toast-success > .toast-message').should('contain', 'Movimentação inserida com sucesso!')
    })

    it('Teste de cálculo de saldo', () => {
        cy.get(':nth-child(1) > .nav-link > .fas').click()
        cy.xpath("//table//tr[contains(.,'Conta alterada')]/td[1]").should('contain', 'Conta alterada')
        cy.xpath("//table//tr[contains(.,'Conta alterada')]/td[2]").should('contain', '123')
    })

    it('Teste de remoção de movimentação', () => {
        cy.get(':nth-child(7) > .row > .col > .far').click()
        cy.get('[href="/movimentacao/943643"] > .fas').click()
        cy.get('.toast-success > .toast-message').should('contain', 'Movimentação removida com sucesso!')
    })

})
