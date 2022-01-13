const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        CLOSERESET: ':nth-child(2) > .toast-close-button',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]',
        EXTRATO: '[data-test="menu-extrato"]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: (nome) => {
            `//table//tr[contains(.,'${nome}')]/td/i[1]`
        }
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        BTN_SALVAR: '.btn-primary',
        CONTA: '[data-test="conta"]',
        STATUS: '[data-test=status]'
    },
    EXTRATO: {
        FN_XP_BUSCA_ELEMENTO: (desc, value) => {
            `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`
        },
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt'] `
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => {
            `//td[contains(., '${nome}')]/../td[2]`
        }
    },
    MESSAGE: '.toast-message'
}

export default locators;