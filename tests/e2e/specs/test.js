// https://docs.cypress.io/api/introduction/api.html

describe('fetching github user info', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', 'https://api.github.com/users/*', 'fixture:user.json').as('getInfo');
  });

  it('shows Github user info', () => {
    cy.visit('/');
    cy.get('input').type('guppy0356');
    cy.get('button.success').click();
    cy.wait('@getInfo');
    cy.get('div.layout').contains('guppy0356');
  });
});

describe('fetching failure', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://api.github.com/users/*',
      status: 404,
      response: []
    }).as('getInfoFailure');
  });

  it('shows error message', () => {
    cy.visit('/');
    cy.get('input').type('guppy0356');
    cy.get('button.success').click();
    cy.wait('@getInfoFailure');
    cy.contains('Oops! Github username not found.');
  });
});
