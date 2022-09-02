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

    cy.get('.reservation:nth-child(1) details .selector').click()

    cy.get('.reservation:nth-child(1) details #date').should(
      'have.value',
      '2022-05-28'
    )

    cy.get('.reservation:nth-child(1) details #time').should(
      'include.value',
      ':44'
    )

    cy.get('.reservation:nth-child(1) details #salutation').should(
      'have.value',
      'f'
    )

    cy.get('.reservation:nth-child(1) details #firstname').should(
      'have.value',
      'Jane'
    )

    cy.get('.reservation:nth-child(1) details #surname').should(
      'have.value',
      'Doe'
    )

    cy.get('.reservation:nth-child(1) details #mail').should('have.value', '')

    cy.get('.reservation:nth-child(1) details #phone').should('have.value', '')

    cy.get('.reservation:nth-child(1) details #notes').should(
      'have.value',
      'note'
    )

    cy.get(':nth-child(1) > .alert')
  })

  it('show buttons', () => {
    cy.get('.reservation:nth-child(2) .hasButtons > .item > :nth-child(2)')
    cy.get(
      '.reservation:nth-child(2) .hasButtons > .item > .btn_outline_danger'
    )
  })

  it('edit reservation', () => {
    cy.get('.reservation:nth-child(2) details .selector').click()

    cy.get('.reservation:nth-child(2) details #date').type('2022-05-29')
    cy.get('.reservation:nth-child(2) details #date').should(
      'have.value',
      '2022-05-29'
    )

    cy.get('.reservation:nth-child(2) details #time').type('13:00')
    cy.get('.reservation:nth-child(2) details #time').should(
      'include.value',
      ':00'
    )

    cy.get('.reservation:nth-child(2) details #salutation').select('f')
    cy.get('.reservation:nth-child(2) details #salutation').should(
      'have.value',
      'f'
    )

    cy.get('.reservation:nth-child(2) details #firstname').type(
      '{backspace}{backspace}{backspace}{backspace}Jane'
    )
    cy.get('.reservation:nth-child(2) details #firstname').should(
      'have.value',
      'Jane'
    )

    cy.get('.reservation:nth-child(2) details #surname').type(
      '{backspace}{backspace}{backspace}Test'
    )
    cy.get('.reservation:nth-child(2) details #surname').should(
      'have.value',
      'Test'
    )

    cy.get('.reservation:nth-child(2) details #mail').type('test@localhost')
    cy.get('.reservation:nth-child(2) details #mail').should(
      'have.value',
      'test@localhost'
    )

    cy.get('.reservation:nth-child(2) details #phone').type('123')
    cy.get('.reservation:nth-child(2) details #phone').should(
      'have.value',
      '123'
    )

    cy.get('.reservation:nth-child(2) details #notes').type(' note')
    cy.get('.reservation:nth-child(2) details #notes').should(
      'have.value',
      'note note'
    )
  })
})
