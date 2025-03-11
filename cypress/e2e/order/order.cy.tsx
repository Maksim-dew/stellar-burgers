<<<<<<< HEAD
describe('Проверка заказа', function () {
    beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('GET', '/api/auth/user', {fixture: 'userData.json'});
        cy.intercept('POST', '/api/orders', {fixture: 'sucessOrder.json'});

        window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
        cy.setCookie('accessToken', 'test-accessToken');
        cy.viewport(1300, 800);
        cy.visit('/');
=======
//проверка создания заказа
describe('Order test', function () {
    this.beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('GET', '/api/auth/user', {fixture: 'userData.json'});
        cy.intercept('POST', '/api/orders', {fixture: 'sucessOrder.json'});
//токены для успешной авторизации
        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('test-refreshToken')
        );

        cy.setCookie('accessToken', 'test-accessToken');

        cy.viewport(1300, 800);
        cy.visit('/');

>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    });

    afterEach(function () {
        cy.clearCookies();
        cy.clearLocalStorage();
<<<<<<< HEAD
    });

    const addIngredientToConstructor = (ingredient: string, container: string) => {
        cy.get(container).contains('Добавить').click({ force: true });
        cy.get(container).contains(ingredient).should('exist');
    };

    const checkOrderModal = (orderNumber: string) => {
        cy.get('[data-cy=order_number]').contains(orderNumber).should('exist');
    };

    const closeModal = () => {
        cy.get('[data-cy=modal]').should('not.exist');
        cy.get('[data-cy=closeIcon]').click({ force: true });
        
    };

    const checkConstructorEmpty = () => {
        cy.get('[data-cy=bun_1_constructor]').should('not.contain', 'Ингридиент_1');
        cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингридиент_4');
        cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингридиент_2');
    };

    it('Создать тест для успешного выполнения заказа', function() {
        addIngredientToConstructor('Ингредиент_1', '[data-cy=bun_ingredients]');
        addIngredientToConstructor('Ингредиент_2', '[data-cy=main_ingredients]');
        cy.get('[data-cy=order_button]').contains('Оформить заказ').should('exist').click({ force: true });
        checkOrderModal('2128506');
        closeModal();
        checkConstructorEmpty();
    });
});
=======
    })

    //Добавление ингредиентов и создание заказа
   it('Создать тест для успешного выполнения заказа', function() {
    cy.get('[data-cy=bun_ingredients]').contains('Добавить').click({force : true});
    cy.get('[data-cy=main_ingredients]').contains('Добавить').click({force : true});
    cy.get('[data-cy=souce_ingredients]').contains('Добавить').click({force : true});

    //Клик на кнопку заказа
    cy.get('[data-cy=order_button]').contains('Оформить заказ').should('exist').click({force : true});

    //Проверка открытия модального окна и номера заказа после успешного создания заказа 
    cy.get('[data-cy=order_number]').contains('2128506').should('exist');

    //Проверка закрытия модального окна при клике на крестик
    cy.get('[data-cy=close_icon]').click({force : true});
    cy.get('[data-cy=modal]').should('not.exist');

    //Проверка очищения конструктора от ингредиентов
    cy.get('[data-cy=bun_1_constructor]').should('not.contain', 'Ингридиент_1');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингридиент_4');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингридиент_2');
   })
})
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
