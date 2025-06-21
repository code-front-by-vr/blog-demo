import {render, screen} from '@testing-library/react'
import {expect, test, describe, jest} from '@jest/globals'
import userEvent from '@testing-library/user-event'

import {Input} from '../src/components/input/input'

describe('Test Input Component', () => {
  test('renders text input correctly', () => {
    const handleChange = jest.fn()

    render(
      <Input
        type="text"
        label="Username"
        id="username"
        placeholder="Enter username"
        onChange={handleChange}
      />
    )

    expect(screen.getByLabelText('Username')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('placeholder', 'Enter username')
  })

  test('renders email input with correct type', () => {
    const handleChange = jest.fn()

    render(
      <Input
        type="email"
        label="Email"
        id="email"
        placeholder="Enter email"
        onChange={handleChange}
      />
    )

    expect(screen.getByLabelText('Email')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'Enter email')
  })

  test('renders password input correctly', () => {
    const handleChange = jest.fn()

    render(
      <Input
        type="password"
        label="Password"
        id="password"
        placeholder="Enter password"
        onChange={handleChange}
      />
    )
    expect(screen.getByLabelText('Password')).toBeInTheDocument()

    const input = screen.getByPlaceholderText('Enter password')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('placeholder', 'Enter password')
  })

  test('renders textarea correctly', () => {
    const handleChange = jest.fn()

    render(
      <Input
        type="textarea"
        label="Description"
        id="description"
        placeholder="Enter description"
        rows={5}
        onChange={handleChange}
      />
    )

    expect(screen.getByLabelText('Description')).toBeInTheDocument()

    const textarea = screen.getByRole('textbox')
    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toHaveAttribute('rows', '5')
    expect(textarea).toHaveAttribute('placeholder', 'Enter description')
  })

  test('renders number input correctly', () => {
    const handleChange = jest.fn()

    render(
      <Input type="number" label="Age" id="age" placeholder="Enter age" onChange={handleChange} />
    )

    expect(screen.getByLabelText('Age')).toBeInTheDocument()

    const input = screen.getByRole('spinbutton')
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('placeholder', 'Enter age')
  })

  test('handles onChange for text input', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    render(<Input type="text" label="Username" id="username" onChange={handleChange} />)

    const input = screen.getByLabelText('Username')
    await user.type(input, 'john')

    expect(handleChange).toHaveBeenCalledTimes(4)
    expect(screen.getByDisplayValue('john')).toBeInTheDocument()
  })

  test('applies custom props correctly', () => {
    const handleChange = jest.fn()

    render(
      <Input
        type="text"
        label="Custom Input"
        id="custom-id"
        name="custom-name"
        className="custom-class"
        value="test value"
        onChange={handleChange}
      />
    )

    const input = screen.getByLabelText('Custom Input')
    expect(input).toHaveAttribute('id', 'custom-id')
    expect(input).toHaveAttribute('name', 'custom-name')
    expect(input).toHaveClass('custom-class')
    expect(input).toHaveValue('test value')
  })

  test('renders input without label', () => {
    const handleChange = jest.fn()

    render(<Input type="text" placeholder="No label input" onChange={handleChange} />)

    const input = screen.getByPlaceholderText('No label input')
    expect(input).toBeInTheDocument()

    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  test('textarea accepts custom rows prop', () => {
    const handleChange = jest.fn()

    render(
      <Input
        type="textarea"
        label="Custom Textarea"
        id="custom-textarea"
        rows={10}
        onChange={handleChange}
      />
    )

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '10')
  })

  test('textarea uses default rows when not specified', () => {
    const handleChange = jest.fn()

    render(
      <Input
        type="textarea"
        label="Default Textarea"
        id="default-textarea"
        onChange={handleChange}
      />
    )

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '3')
  })
})
