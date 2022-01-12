/*Elementos como alert, popups e frameworks como ajax, React, Angular e View.
Mock é utilizado para testar certo método A quando há a chamada de um outro método B ou de uma API. Sua função é
ser um objeto falso e genérico que é colocado como a chamada de uma API ou do método B que vai retornar o que for
definido pelo testador. Isso serve para evitar um acesso direto concreto com o método B ou API*/
/// <reference types="cypress" />


describe('Work with basic elements', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })


    /*Como tratar o "alert" no cypress*/
    it('Alert...', () => {
        /* cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        }) */
        clickAlert('#alert', 'Alert Simples')
    })

    it('Alert com mock...', () => {
        const stub = cy.stub().as("alerta")
        cy.on('window:alert', stub)
        cy.get('#alert').click()
    })
})