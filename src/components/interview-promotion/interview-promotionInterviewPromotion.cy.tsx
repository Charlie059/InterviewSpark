import React from 'react'
import InterviewPromotion from './interview-promotion'

describe('<InterviewPromotion />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react

    // @ts-ignore
    cy.mount(<InterviewPromotion />)
  })
})
