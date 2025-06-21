import React, {useRef} from 'react'
import {useNavigate} from 'react-router'
import {useAppDispatch} from '../../redux/store'
import {useForm, type SubmitHandler} from 'react-hook-form'
import {Input} from '../input/Input.tsx'
import {ImageUploader} from '../image-uploader/ImageUploader'
import {fetchNewPost} from '../../redux/post-slice'

type Inputs = {
  title: string
  lesson_num: number
  description: string
  text: string
  image: string
}

export function NewPostForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async () => {
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const {payload} = await dispatch(fetchNewPost(formData))
    navigate(`/posts/${payload.id}`)
  }

  const renderAlert = () => {
    if (!Object.keys(errors).length) return null

    return (
      <div className="alert alert-danger mb-4" role="alert">
        Form is not valid
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      {renderAlert()}

      <div className="mb-3">
        <Input
          type="text"
          label="Title"
          className={`form-control ${errors.title && 'is-invalid'}`}
          {...register('title', {required: true})}
        />
      </div>

      <div className="mb-3">
        <Input
          type="number"
          label="Lesson number"
          className={`form-control ${errors.title && 'is-invalid'}`}
          {...register('lesson_num', {required: true})}
        />
      </div>

      <div className="mb-3">
        <Input
          type="textarea"
          label="Description"
          className={`form-control ${errors.title && 'is-invalid'}`}
          {...register('description', {required: true})}
          rows={3}
        />
      </div>

      <div className="mb-3">
        <Input
          type="textarea"
          label="Text"
          className={`form-control ${errors.title && 'is-invalid'}`}
          {...register('text', {required: true})}
          rows={6}
        />
      </div>

      <div className="mb-3">
        <ImageUploader label="Image" {...register('image', {required: true})} />
      </div>

      <button type="submit" className="btn btn-primary mb-5">
        Add new post
      </button>
    </form>
  )
}
