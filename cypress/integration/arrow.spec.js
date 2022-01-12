/*Uso e teste de arrow functions */

it('nada agora', function () { })

/* function soma(a, b) {
    return a + b;
} */

/* const soma = (a, b) => {
    return a+b;
}  */

const soma = (a, b) => a + b

it('a function test', function () {
    console.log('Function', this)
})

it('an arrow test', () => {
    console.log('Arrow', this)
})

console.log(soma(1, 4))