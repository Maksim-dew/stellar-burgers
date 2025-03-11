<<<<<<< HEAD
describe('Проверка страницы конструктора', function () {
    beforeEach(function() {
=======
describe('Constructor page test', function () {
    this.beforeEach(function() {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('/');
    })
<<<<<<< HEAD

    const checkIngredientNotExist = (ingredient: string, container: string) => {
        cy.get(container).contains(ingredient).should('not.exist');
    }

    const checkIngredientExist = (ingredient: string, container: string) => {
        cy.get(container).contains(ingredient).should('exist');
    }

    const addIngredient = (ingredient: string, button: string) => {
        cy.get(button).contains('Добавить').click({ force: true });
    }

    it('тест добавления булки в конструктор при клике на кнопку', function () {
        checkIngredientNotExist('Ингредиент_1', '[data-cy=bun_1_constructor]');
        checkIngredientNotExist('Ингредиент_1', '[data-cy=bun_2_constructor]');
        addIngredient('Ингредиент_1', '[data-cy=bun_ingredients]');
        checkIngredientExist('Ингредиент_1', '[data-cy=bun_1_constructor]');
        checkIngredientExist('Ингредиент_1', '[data-cy=bun_2_constructor]');
    })

    it('тест добавления ингредиентов в конструктор при клике на кнопку', function () {
        checkIngredientNotExist('Ингредиент_2', '[data-cy=ingredient_constructor]');
        checkIngredientNotExist('Ингредиент_4', '[data-cy=ingredient_constructor]');
        addIngredient('Ингредиент_2', '[data-cy=main_ingredients]');
        addIngredient('Ингредиент_4', '[data-cy=souce_ingredients]');
=======
//тест добавления булки в конструктор при клике на кнопку
    it('тест добавления булки в конструктор при клике на кнопку', function () {
        cy.get('[data-cy=bun_1_constructor]').contains('Ингредиент_1').should('not.exist');
        cy.get('[data-cy=bun_2_constructor]').contains('Ингредиент_1').should('not.exist');
        cy.get('[data-cy=bun_ingredients]').contains('Добавить').click({ force: true });
        cy.get('[data-cy=bun_1_constructor]').contains('Ингредиент_1').should('exist');
        cy.get('[data-cy=bun_2_constructor]').contains('Ингредиент_1').should('exist');
    })

//тест добавления ингредиентов в конструктор при клике на кнопку
    it('тест добавления ингредиентов в конструктор при клике на кнопку', function () {
        cy.get('[data-cy=ingredient_constructor]').contains('Ингредиент_2').should('not.exist');
        cy.get('[data-cy=ingredient_constructor]').contains('Ингредиент_4').should('not.exist');
        cy.get('[data-cy=main_ingredients]').contains('Добавить').click({ force: true });
        cy.get('[data-cy=souce_ingredients]').contains('Добавить').click({ force: true });
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    })
})
