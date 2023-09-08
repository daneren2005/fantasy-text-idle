// https://on.cypress.io/api

/* eslint-disable cypress/no-unnecessary-waiting */
describe('Can load game', () => {
	beforeEach(() => {
		indexedDB.deleteDatabase('localforage');
	});
	
	it('can run the game without crashing for a full second', () => {
		cy.visit('/');
		cy.contains('h1', 'Idle Sim');;

		cy.wait(1_000);
		cy.contains('div', 'Gold: 2');
	});
});
