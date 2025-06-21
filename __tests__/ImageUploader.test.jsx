import {render, screen, fireEvent} from '@testing-library/react'
import {expect, test, describe, jest, beforeEach, afterEach} from '@jest/globals'
import {ImageUploader} from '../src/components/image-uploader/ImageUploader'

describe('ImageUploader Component', () => {
  let mockCreateObjectURL
  let mockRevokeObjectURL

  beforeEach(() => {
    // Мокаем URL.createObjectURL
    mockCreateObjectURL = jest.fn(() => 'blob:http://localhost/mock-image-url')
    mockRevokeObjectURL = jest.fn()

    global.URL.createObjectURL = mockCreateObjectURL
    global.URL.revokeObjectURL = mockRevokeObjectURL
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renders file input with correct attributes', () => {
    render(<ImageUploader />)

    const fileInput = screen.getByRole('textbox', {hidden: true}) // file input имеет специфичную роль

    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).toHaveAttribute('accept', 'image/png, image/jpeg')
    expect(fileInput).toHaveClass('form-control')
  })

  test('renders with provided props', () => {
    render(<ImageUploader id="test-uploader" name="test-image" label="Upload your image" />)

    const fileInput = screen.getByRole('textbox', {hidden: true})
    const label = screen.getByText('Upload your image')

    expect(fileInput).toHaveAttribute('id', 'test-uploader')
    expect(fileInput).toHaveAttribute('name', 'test-image')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'test-uploader')
  })

  test('does not render label when not provided', () => {
    render(<ImageUploader id="test-uploader" />)

    const labels = screen.queryAllByRole('label')
    expect(labels).toHaveLength(0)
  })

  test('shows image preview when file is selected', () => {
    render(<ImageUploader />)

    const fileInput = screen.getByRole('textbox', {hidden: true})

    // Создаем мок файла
    const mockFile = new File(['test'], 'test-image.png', {type: 'image/png'})

    // Симулируем выбор файла
    fireEvent.change(fileInput, {
      target: {files: [mockFile]},
    })

    // Проверяем, что URL.createObjectURL был вызван
    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockFile)

    // Проверяем, что превью появилось
    const previewImage = screen.getByRole('img')
    expect(previewImage).toBeInTheDocument()
    expect(previewImage).toHaveAttribute('src', 'blob:http://localhost/mock-image-url')
    expect(previewImage).toHaveClass('d-block', 'w-50', 'mt-2', 'rounded-3')
  })

  test('does not show preview when no file is selected', () => {
    render(<ImageUploader />)

    const images = screen.queryAllByRole('img')
    expect(images).toHaveLength(0)
  })

  test('handles multiple file selections (shows last one)', () => {
    render(<ImageUploader />)

    const fileInput = screen.getByRole('textbox', {hidden: true})

    // Первый файл
    const mockFile1 = new File(['test1'], 'test-image1.png', {type: 'image/png'})
    fireEvent.change(fileInput, {
      target: {files: [mockFile1]},
    })

    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockFile1)

    // Второй файл
    const mockFile2 = new File(['test2'], 'test-image2.jpg', {type: 'image/jpeg'})
    fireEvent.change(fileInput, {
      target: {files: [mockFile2]},
    })

    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockFile2)
    expect(mockCreateObjectURL).toHaveBeenCalledTimes(2)

    // Должно быть только одно превью (последнее)
    const previewImages = screen.getAllByRole('img')
    expect(previewImages).toHaveLength(1)
  })

  test('handles empty file selection', () => {
    render(<ImageUploader />)

    const fileInput = screen.getByRole('textbox', {hidden: true})

    // Симулируем событие без файлов
    fireEvent.change(fileInput, {
      target: {files: []},
    })

    expect(mockCreateObjectURL).not.toHaveBeenCalled()

    const images = screen.queryAllByRole('img')
    expect(images).toHaveLength(0)
  })

  test('forwardRef works correctly', () => {
    const ref = {current: null}

    render(<ImageUploader ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current.type).toBe('file')
  })

  test('preview image has empty alt attribute', () => {
    render(<ImageUploader />)

    const fileInput = screen.getByRole('textbox', {hidden: true})
    const mockFile = new File(['test'], 'test-image.png', {type: 'image/png'})

    fireEvent.change(fileInput, {
      target: {files: [mockFile]},
    })

    const previewImage = screen.getByRole('img')
    expect(previewImage).toHaveAttribute('alt', '')
  })

  test('input accepts only image files', () => {
    render(<ImageUploader />)

    const fileInput = screen.getByRole('textbox', {hidden: true})
    expect(fileInput).toHaveAttribute('accept', 'image/png, image/jpeg')
  })

  test('works with different image types', () => {
    render(<ImageUploader />)

    const fileInput = screen.getByRole('textbox', {hidden: true})

    // Тестируем PNG
    const pngFile = new File(['png-data'], 'test.png', {type: 'image/png'})
    fireEvent.change(fileInput, {
      target: {files: [pngFile]},
    })

    expect(mockCreateObjectURL).toHaveBeenCalledWith(pngFile)

    // Тестируем JPEG
    const jpegFile = new File(['jpeg-data'], 'test.jpg', {type: 'image/jpeg'})
    fireEvent.change(fileInput, {
      target: {files: [jpegFile]},
    })

    expect(mockCreateObjectURL).toHaveBeenCalledWith(jpegFile)
  })
})
