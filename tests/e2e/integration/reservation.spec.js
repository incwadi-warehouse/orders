describe('Reservation', () => {
  it('show reservation', () => {
    cy.server()
    cy.route('GET', '**/api/me', {})
    cy.route('GET', '**/api/reservation/list', [
      {
        id: '1',
      },
      {
        id: '2',
      },
    ])
    cy.route('GET', '**/api/reservation/1', {
      id: '1',
      branch: {},
      createdAt: 1653558991,
      collection: 1653734687,
      notes: 'note',
      books: [],
      salutation: 'f',
      firstname: 'Jane',
      surname: 'Doe',
      mail: '',
      phone: '',
    })
    cy.route('GET', '**/api/reservation/2', {
      id: '2',
      branch: {},
      createdAt: 1651449991,
      collection: 1653734687,
      notes: 'note',
      books: [],
      salutation: 'm',
      firstname: 'John',
      surname: 'Doe',
      mail: '',
      phone: '',
    })
    cy.route('GET', '**/api/bookmark', {})

    cy.setCookie('token', 'token')
    cy.setCookie('refresh_token', 'refresh_token')

    cy.visit('/')
    cy.url().should('include', '/')

    cy.get(
      ':nth-child(1) > .form > :nth-child(1) > :nth-child(2) > #date'
    ).should('have.value', '2022-05-28')

    cy.get(
      ':nth-child(1) > .form > :nth-child(2) > :nth-child(2) > #time'
    ).should('have.value', '12:44')

    cy.get(
      ':nth-child(1) > .form > :nth-child(4) > :nth-child(2) > #salutation'
    ).should('have.value', 'f')

    cy.get(
      ':nth-child(1) > .form > :nth-child(5) > :nth-child(2) > #firstname'
    ).should('have.value', 'Jane')

    cy.get(
      ':nth-child(1) > .form > :nth-child(6) > :nth-child(2) > #surname'
    ).should('have.value', 'Doe')

    cy.get(
      ':nth-child(1) > .form > :nth-child(7) > :nth-child(2) > #mail'
    ).should('have.value', '')

    cy.get(
      ':nth-child(1) > .form > :nth-child(8) > :nth-child(2) > #phone'
    ).should('have.value', '')

    cy.get(
      ':nth-child(1) > .form > :nth-child(9) > :nth-child(2) > #notes'
    ).should('have.value', 'note')

    cy.get('div[data-v-a0d12cb0=""] > :nth-child(2) > .alert')
  })

  it('show buttons', () => {
    cy.get(':nth-child(2) > .form > .hasButtons > .form-item > :nth-child(2)')
    cy.get(
      ':nth-child(2) > .form > .hasButtons > .form-item > .btn_outline_danger'
    )
  })

  it('edit reservation', () => {
    cy.get(
      'div[data-v-a0d12cb0=""] > :nth-child(2) > .form > :nth-child(1) > :nth-child(2) > #date'
    ).type('2022-05-29')
    cy.get(
      'div[data-v-a0d12cb0=""] > :nth-child(2) > .form > :nth-child(1) > :nth-child(2) > #date'
    ).should('have.value', '2022-05-29')

    cy.get(
      ':nth-child(2) > .form > :nth-child(2) > :nth-child(2) > #time'
    ).type('01:00')
    cy.get(
      ':nth-child(2) > .form > :nth-child(2) > :nth-child(2) > #time'
    ).should('have.value', '01:00')

    cy.get(
      ':nth-child(2) > .form > :nth-child(4) > :nth-child(2) > #salutation'
    ).select('f')
    cy.get(
      ':nth-child(2) > .form > :nth-child(4) > :nth-child(2) > #salutation'
    ).should('have.value', 'f')

    cy.get(
      ':nth-child(2) > .form > :nth-child(5) > :nth-child(2) > #firstname'
    ).type('{backspace}{backspace}{backspace}{backspace}Jane')
    cy.get(
      ':nth-child(2) > .form > :nth-child(5) > :nth-child(2) > #firstname'
    ).should('have.value', 'Jane')

    cy.get(
      ':nth-child(2) > .form > :nth-child(6) > :nth-child(2) > #surname'
    ).type('{backspace}{backspace}{backspace}Test')
    cy.get(
      ':nth-child(2) > .form > :nth-child(6) > :nth-child(2) > #surname'
    ).should('have.value', 'Test')

    cy.get(
      ':nth-child(2) > .form > :nth-child(7) > :nth-child(2) > #mail'
    ).type('test@localhost')
    cy.get(
      ':nth-child(2) > .form > :nth-child(7) > :nth-child(2) > #mail'
    ).should('have.value', 'test@localhost')

    cy.get(
      ':nth-child(2) > .form > :nth-child(8) > :nth-child(2) > #phone'
    ).type('123')
    cy.get(
      ':nth-child(2) > .form > :nth-child(8) > :nth-child(2) > #phone'
    ).should('have.value', '123')

    cy.get(
      ':nth-child(2) > .form > :nth-child(9) > :nth-child(2) > #notes'
    ).type(' note')
    cy.get(
      ':nth-child(2) > .form > :nth-child(9) > :nth-child(2) > #notes'
    ).should('have.value', 'note note')
  })
})
