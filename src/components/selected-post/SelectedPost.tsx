import React from 'react'
import type {SelectedPostProps} from '../../types'

export function SelectedPost({image, title, text, date}: SelectedPostProps): React.ReactElement {
  return (
    <article className="container my-5">
      <time className="text-body-secondary">{date}</time>
      <div className="text-center">
        <img
          src={image}
          className="img-fluid w-100 mb-3 mx-auto d-block object-fit-cover "
          alt={title}
          style={{
            maxHeight: '400px',
          }}
        />
      </div>
      <p className="w-75 m-auto">{text}</p>
    </article>
  )
}
