/// <reference types="cypress" />

/*SINCRONISMO EM CYPRESS

Observação do funcionamento de tentar uma assertiva e, caso
ela não funcione, retornar ao último comando e repetí-los até que termine o tempo 
padrão da tentativa*/

describe('Esperas...', () => {

    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar o elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')

    })

    /* Testar o uso do comando "find"*/

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        /* cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 2') */

        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    /*Uso do recurso de timeout  e wait, observando a possibilidade de alteração no "package.json" e
    o tempo padrão de 4 segundos utilizado pelo cypress*/
    it('Uso de timeout', () => {
        /* cy.get('#buttonDelay').click()
        wait(5000)
        cy.get('#novoCampo', { timeout: 1000 }).should('exist') */

        cy.get('#buttonDelay').click()
        cy.get('#novoCampo', { timeout: 3000 }).should('have.length', 1)
    })

    /*Análise do comando click e a ausência de, quando acontece retry, execução desse comando novamente
    mesmo que ele esteja anterior a uma assertiva ainda não confirmada */

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })

    /*Comparação do "should" com o "then". Should é executado ao longo da espera, enquanto que o then
    aguarda o fim dessa execução. Além disso, o "should" retorna sempre o que foi enviado da função, ao
    passo que o "then" aceita que se utilize "return". 
    
    Observa-se que a notação "$el" ocorre porque o elemento vem do JQuery */

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span').should($el => {
            console.log($el)
            expect($el).to.have.length(1)
            return 2
        })
    })

})