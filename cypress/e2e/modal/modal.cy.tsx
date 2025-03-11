///<reference types="cypress"/>

<<<<<<< HEAD
describe('Тест модального окна', function() {
    beforeEach(function() {
=======
describe('Modal window test', function() {
    this.beforeEach(function() {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('/');
    })

<<<<<<< HEAD
    const openModal = () => {
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click({force: true});
    }

    const closeModal = () => {
        cy.get('[data-cy=overlay]').should('exist');
        cy.get('[data-cy=closeIcon]').click({force: true});
    }

    const closeModalByOverlay = () => {
        cy.get('[data-cy=overlay]').should('exist').click('topRight', {force: true});
    }

    it('Откроется окно выбора ингредиентов', function () {
        cy.get('[data-cy=modal]').should('not.exist');
        openModal();
    })

    it('Окно выбора ингредиентов закрыто', function() {
        openModal();
        closeModal();
        cy.get('[data-cy=modal]').should('not.exist');
    })

    it('Модальное окно ингредиентов закрывается щелчком мыши при наложении', function () {
        openModal();
        closeModalByOverlay();
=======
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
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
        cy.get('[data-cy=modal]').should('not.exist');
    })
})
