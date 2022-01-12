/// <reference types="cypress"/>

/* Uso do describe e sua utilidade em agrupar testes */

it('A external test... ', () => {

})

describe('Should group tests...', () => {
    describe('Should group specific tests...', () => {
        it.skip('A specific test...', () => {

        })
    })
    it('A internal test...', () => {

    })
})