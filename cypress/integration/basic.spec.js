/// <reference types="cypress" />

/*Teste e uso dos elementos mais comuns, como RadioButton, TextFields e outros  */

it('Should access a page and assert title', () => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')

    /*    const title = cy.title();
       console.log(title);
       
       Sempre que se usa "promise" é preciso considerar a assincronidade */

    cy.title().should('be.equal', 'Campo de Treinamento')

    cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .should('contain', 'Campo').debug()

    let syncTitle

    cy.title().then(title => {
        console.log(title)

        cy.get('#formNome').type(title)


        syncTitle = title
    })

    cy.get('[data-cy="dataSobrenome"]').then($el => {
        $el.val(syncTitle)
    })

    cy.get('#elementosForm\\:sugestoes').then($el => {
        cy.wrap($el).type(syncTitle)
    })

})

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

        cy.get('[data-test=dataEscolaridade')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        cy.get('[data-test="dataEscolaridade"] option').should('have.length', 8)
        cy.get('[data-test="dataEscolaridade"] option').then($arr => {
            const values = []
            $arr.each(function () {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })

    })

    it.only('Combo Múltiplo', () => {
        //forma 1 de validar as opções selecionadas do combo multiplo
        cy.get('[data-testid="dataEsportes"]')
            .select(['natacao', 'Corrida', 'nada'])


        //forma 2 de validar as opções selecionadas do combo multipli
        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })


        //forma 3 de validar as opções selecionadas do combo multiplo
        cy.get('[data-testid="dataEsportes"]').invoke('val').should('eql', ['natacao', 'Corrida', 'nada'])


        //TODO validar as opções selecionadas do combo multiplo
    })
})
