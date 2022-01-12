/// <reference types="cypress" />

/*Exemplo e teste de como trabalhar com iFrames, que é a abreviação de inline frame 
e é tag HTML utilizada para inserir conteúdos externos em uma página */

describe('Work with iFrames', () => {
    it('Deve preencher campo de texto', () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iFrame => {
            const body = iFrame.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')
        })


        /*O CYPRESS NÃO CONSEGUE LIDAR COM O ALERT DENTRO DO IFRAME!! o expect não consegue ser testado. E
        Essa é uma limitação do cypress. Uma forma de contornar isso é ir direto pra pagina do iframe
        e fazer os teste de lá, como no exemplo a baixo */


        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert Simples')
        })
        cy.wrap(body).find('#otherButton').click()


    })

    it('Deve testar o frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click Ok!')
        })
    })
})