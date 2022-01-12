/// <reference types="cypress" />



describe('Helpers... ', () => {


    /*"Wrap" serve para encapsular qualquer objeto e, com isso, permitir o uso de propriedades que
são do cypress e o objeto não tinha anteriormente */

    it('Wrap', () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
        const obj = { nome: 'User', idade: 20 }
        expect(obj).to.have.property('nome')
        /* obj.should('have.property', 'nome') não funciona porque a propriedade "should" vem do cypress e o object não o tem
        */
        cy.wrap(obj).should('have.property', 'nome')

        /*Uso de propriedades do cypress dentro de uma promise, o que faz com que trabalhemos com objetos de JQuery ($el)*/

        cy.get('#formNome').then($el => {
            /*$el.val('funciona via jquery') funciona via jquery, porém, como não aparece no log e só ocorre debaixo
            dos panos, estamos tentando fazer via cypress*/
            cy.wrap($el).type('funciona via cypress')
        })

        /*Caso as promises não sejam gerenciadas pelo cypress - como o que ocorre no código comentando na linha 36 abaixo -, as promises
        são executadas antes dos comandos do cypress, devido a assincronicidade do cy. Por isso, há interesse
        em encapsular as promises e se manter, assim, a assincronicidade do conjunto */

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500);

            cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
            //promise.then(num => console.log(num))
            cy.wrap(promise).then(ret => console.log(ret))
            cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))
        })
    })

    /* Its trabalha com as propriedades dos objetos */

    it('Its...', () => {
        const obj = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos' } }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos' } }
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })


    /*O método invoke serve para chamar funções no geral */
    it('Invoke...', () => {
        const getValue = () => {
            return 1;
        }

        const soma = (a, b) => a + b

        /*para receber a função getValue vou criar um objeto chamado "fn". Dessa forma, uma das propriedades do meu objeto
        vai ser a função getValue */
        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)


        //uso do invoke para chamar a função val do jquery
        cy.get('#formNome').invoke('val', 'Texto via invoke')
        cy.window().invoke('alert', 'Da pra ver?')
    })

    /*O stub vai substituir o método como um mock
    https://docs.cypress.io/api/commands/stub#Command-Log
     */
    it('Alert com mock...', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples') //stub.getCall(0) pega a primeira chamada do stub, pois é um array e a primeira casa é 0
        })


        /* 
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert Simples')
        }) */
    })

    /*Confirm é um evento no qual aparece uma janela do tipo "Alert", porém, com a opção de clicar em "ok" ou 
    "cancelar". A ação padrão do cypress é de clicar em "ok" quando se aparece esse recurso no teste */
    it('Confirm... ', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()

    })

    /*Agora o objetivo é fazer com que o cypress click em "negar" ou "deny" no lugar de automaticamente clicar em "ok" */

    it('Deny... ', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false //essa linha que é responsável por obrigar o cypress a clicar em "deny"
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()

    })


    /*O Promp parece com o "Confirm", porém, além da opção de "ok" e "cancelar", aparece também uma caixa para escrever
    algo. A ação padrão do cypress é cancelar o prompt sem receber valor algum. Para conseguir pegar essa valor, então,
    é preciso um stub que recebe o comando "cy.window" e usar uma promise ".then" para poder trabalhar com o prompt */
    it('Prompt... ', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42') //o return é pra enviar o que sera respondido na caixa do prompt
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        cy.get('#prompt').click()
    })

    it.only('Desafio!', () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')

        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        cy.get('#formNome').type('asassad')


        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        cy.get('[data-cy="dataSobrenome"]').type('slkhskg')

        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        cy.get('#formSexoFem').click()
        cy.get('#formCadastrar').click()



    })
})