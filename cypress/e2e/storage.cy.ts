/// <reference types="cypress" />

context('Local Storage', () => {
	it('cy.clearLocalStorage() - clear all data in localStorage for the current origin', () => {
		// clearLocalStorage() yields the localStorage object
		cy.clearLocalStorage().should('have.length', 0);
	});

	it('add and remove new todo item from local storage', () => {
		cy.visit('/');

		const newItem = 'Run Cypress tests';

		cy.get('[data-cy=new-todo]').type(`${newItem}{enter}`);

		cy.getAllLocalStorage().should(() => {
			expect(localStorage.getItem('todos')).to.eq(
				JSON.stringify([
					{
						id: 1,
						name: newItem,
						complete: false,
					},
				])
			);
		});

		cy.get('[data-cy=todo] [data-cy=delete]').click();

		cy.getAllLocalStorage().should(() => {
			expect(localStorage.getItem('todos')).to.eq('[]');
		});
	});

	it('pull todos from local storage on load', () => {
		const storageItem = 'Run Cypress tests';

		cy.visit('/', {
			onBeforeLoad(win) {
				win.localStorage.setItem(
					'todos',
					JSON.stringify([
						{
							id: 1,
							name: storageItem,
							complete: false,
						},
					])
				);
			},
		});

		cy.get('[data-cy=todo] span').should(
			'have.text',
			storageItem
		);
	});
});

export {};
