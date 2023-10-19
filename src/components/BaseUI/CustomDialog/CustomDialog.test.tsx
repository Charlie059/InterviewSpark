import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomDialog from './CustomDialog'

describe('CustomDialog', () => {
  it('renders correctly when open', () => {
    render(<CustomDialog open={true} onClose={jest.fn()} title='Test Dialog' content='Dialog Content' />)

    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog Content')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<CustomDialog open={false} onClose={jest.fn()} />)

    expect(screen.queryByText('Test Dialog')).toBeNull()
  })

  it('calls the onClose callback when the close button is clicked', () => {
    const onCloseMock = jest.fn()
    render(<CustomDialog open={true} onClose={onCloseMock} />)

    fireEvent.click(screen.getByText('Close'))
    expect(onCloseMock).toHaveBeenCalled()
  })
})
