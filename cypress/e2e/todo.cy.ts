/// <reference types="cypress" />

describe('to-do app', () => {
	const newItem = 'Run Cypress test';
	const firstTodo = 'Pay electric bill';
	const secondTodo = 'Walk the dog';
	const todoItem = '[data-cy=todo]';

	it('should let a user add, delete, complete, and filter todos', () => {
		cy.visit('/', {
			onBeforeLoad(win) {
				win.localStorage.setItem(
					'todos',
					JSON.stringify([
						{
							id: 1,
							name: firstTodo,
							complete: false,
						},
						{
							id: 2,
							name: secondTodo,
							complete: false,
						},
					])
				);
			},
		});

		cy.get(todoItem).should('have.length', 2);
		cy.get(todoItem).first().should('have.text', firstTodo);
		cy.get(todoItem).last().should('have.text', secondTodo);

		// add new todo item
		cy.get('[data-cy=new-todo]').type(`${newItem}{enter}`);

		cy.get(todoItem)
			.should('have.length', 3)
			.last()
			.should('have.text', newItem);

		// rename todo item
		cy.get(`${todoItem} [data-cy=name]`).last().click();

		cy.get(`${todoItem} [data-cy=rename]`).type(`s{enter}`);

		cy.get(todoItem)
			.last()
			.should('have.text', newItem + 's');

		// and delete the new todo item
		cy.get(`${todoItem} [data-cy=delete]`).last().click();

		cy.get(todoItem)
			.should('have.length', 2)
			.should('not.have.text', newItem);

		// can check off an item as completed
		cy.get(`${todoItem} [data-cy=complete]`).last().click();

		cy.get(`${todoItem} [data-cy=complete] img`)
			.last()
			.should('have.attr', 'src')
			.and('equal', '/images/icon-check.svg');

		// filter for uncompleted tasks
		cy.contains('Active').click();

		cy.get(todoItem)
			.should('have.length', 1)
			.first()
			.should('have.text', firstTodo);

		cy.contains(secondTodo).should('not.exist');

		// filter for completed tasks
		cy.contains('Completed').click();

		cy.get(todoItem)
			.should('have.length', 1)
			.first()
			.should('have.text', secondTodo);

		cy.contains(firstTodo).should('not.exist');

		// delete all completed tasks
		cy.contains('Clear Completed').click();

		cy.contains('All').click();

		cy.get(todoItem)
			.should('have.length', 1)
			.should('not.have.text', secondTodo);

		cy.contains('Clear Completed').should('not.exist');
	});
});

export {};
