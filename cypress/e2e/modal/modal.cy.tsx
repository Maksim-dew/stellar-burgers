///<reference types="cypress"/>

describe('Modal window test', function() {
    this.beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('/');
    })

    //открытие модального окна при клике на ингредиент в списке 
    it('Откроется окно выбора ингредиентов', function () {
        cy.get('[data-cy=modal]').should('not.exist');
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click({force : true});
    })

    //закрытие модального окна при клике на крестик
    it('Окно выбора ингредиентов закрыто', function() {
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click({force : true});
        cy.get('[data-cy=close_icon]').click({force : true});
        cy.get('[data-cy=modal]').should('not.exist');
    })

    //закрытие модального окна при клике на оверлей
    it('Модальное окно ингредиентов закрывается щелчком мыши при наложении', function () {
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click({force : true});
        cy.get('[data-cy=overlay]').should('exist').click('topRight', {force : true});
        cy.get('[data-cy=modal]').should('not.exist');
    })
})
