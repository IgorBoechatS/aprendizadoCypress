/// <reference types="cypress" />


import loc from '../support/locators.js'

describe('Testes funcionais', () => {
    before(() => {
        cy.login('igor123', 'igor123')
        cy.resetApp()
        /* cy.visit('http://barrigareact.wcaquino.me')
        cy.get(loc.LOGIN.USER).type('igor123')
        cy.get(loc.LOGIN.PASSWD).type('igor123')
        cy.get(loc.LOGIN.BTN_LOGIN).click() */
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })

    it('Testar criação de conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta qualquer')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Testar alteração de conta', () => {
        cy.acessarMenuConta()

        //cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta qualquer')).click()
        cy.xpath(`//table//tr[contains(.,'Conta para alterar')]/td/i[1]`).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Teste de inserção de conta repetida', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Erro: Error: Request failed with status code 400')

    })

    it('Teste de movimentação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('teste')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('inter')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
        //cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('teste', '123')).should('exist')
        cy.xpath("//span[contains(., 'teste')]/following-sibling::small[contains(., '123')]").should('exist')




        /* cy.get('.col-2 > .btn').click()
        cy.get('.btn-secondary').click()
        cy.get('#descricao').type('teste')
        cy.get('.col-4 > .form-control').type('123')
        cy.get('#envolvido').type('pessoa qualquer')
        cy.get(':nth-child(3) > :nth-child(2) > .form-control').select('Conta alterada')
        cy.get(':nth-child(3) > .form-control').invoke('removeAttr', 'type').type('2022-01-01{enter}');
        cy.get('.btn-primary').click()
        cy.get('.toast-success > .toast-message').should('contain', 'Movimentação inserida com sucesso!') */
    })

    it('Teste de cálculo de saldo', () => {
        cy.get(loc.MENU.HOME).click()
        //cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain', 123)
        cy.xpath("//td[contains(., 'Conta para saldo')]/../td[2]").should('contain', 534)
    })

    it('Teste de remoção de movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click()
        //cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('teste')).click()
        cy.xpath("//span[contains(., 'Movimentacao para exclusao')]/../../..//i[@class='far fa-trash-alt']").click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        //span[contains(., 'Movimentacao para extrato')]/../../..//i[@class='far fa-trash-alt'] 

    })

})
