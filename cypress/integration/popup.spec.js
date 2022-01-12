/// <reference types="cypress" />


describe('Work with PopUp', () => {

    /*Esse teste serve para verificar a mensagem da popup */

    it('Deve testar o popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })
    /*Ao clicar no buttonPopUp é gerado uma janela que ser capturada por meio do comando "window", gerando
    uma promise que a variável "win" vai receber o elemento do comando "window". Com isso, um stub é criado 
    pra receber o evento "open" desse "cy.window()". Essas linhas todas serve para testar se a popup foi chamada
    ou não*/
    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen') //esse "as" funciona como um alias que identifica esse stub
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen') //o @winOpen é pra identificar o stub, pq se usar o nome dele separado podem procurar por DOM do html
        cy.get('@winOpen').should('be.called') //testa se o popup foi invocado ou não

    })

    describe('Testando popup via links... ', () => {
        beforeEach(() => {
            cy.visit('http://wcaquino.me/cypress/componentes.html')
        })
        it('Check pop url', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'http://wcaquino.me/cypress/frame.html')
        })


        /*Testa agora essa verificação com link dinâmico. O método contains seleciona o link do popup e abre, uma promise
        com o "then". Essa promise entao é uma função em que $a é a âncora desse link do popup. Cria-se uma variável
        "href" para receber a propriedade href do $a. Se visita esse caminho do href*/
        it('Should acess popup dinamically', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
        })


        /*A propriedade "target" do html define como será aberta a pagina, em outra ou na mesma. O cypress nesse comando
        vai forçar uma forma de se abrir o link independente da propriedade target. Nessa linha de código será utilizado
        o método invoke para chamar o método "removeAttr" do JQuery. É só outra forma de fazer a mesma coisa */
        it('Should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#tfield').type('funciona')
        })
    })

})