import React, {useState, forwardRef} from 'react'

type ImageUploaderProps = {
  id?: string
  name?: string
  label?: string
}

function ImageUploaderBase(
  props: ImageUploaderProps,
  ref: React.ForwardedRef<HTMLInputElement>
): React.ReactElement {
  const [imageUrl, setImageUrl] = useState<string>('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0])

      setImageUrl(imageUrl)
    }
  }

  return (
    <>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}

      <input
        ref={ref}
        className="form-control"
        type="file"
        id={props.id}
        name={props.name}
        onChange={handleChange}
        accept="image/png, image/jpeg"
      />

      {imageUrl && <img src={imageUrl} alt="" className="d-block w-50 mt-2 rounded-3" />}
    </>
  )
}

export const ImageUploader = forwardRef(ImageUploaderBase)
