///<reference types="cypress"/>

describe('Modal window test', function() {
    beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('/');
    })

    const openModal = () => {
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click({force: true});
    }

    const closeModal = () => {
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=closeIcon]').click({force: true});
    }

    const closeModalByOverlay = () => {
        cy.get('[data-cy=overlay]').should('exist').click('topRight', {force: true});
    }

    it('Откроется окно выбора ингредиентов', function () {
        cy.get('[data-cy=modal]').should('not.exist');
        openModal();
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=content]').contains('Ингредиент_1').should('exist');
    })

    it('Окно выбора ингредиентов закрыто', function() {
        openModal();
        closeModal();
        cy.get('[data-cy=modal]').should('not.exist');
    })

    it('Модальное окно ингредиентов закрывается щелчком мыши при наложении', function () {
        openModal();
        closeModalByOverlay();
        cy.get('[data-cy=modal]').should('not.exist');
    })
})
