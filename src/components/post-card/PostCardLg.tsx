import React from 'react'
import {PostType} from '../../types'

export function PostCardLg({id, date, title, text, image}: PostType): React.ReactElement {
  return (
    <article
      id={`post-${id}`}
      className="card border-0 border-bottom rounded-0 "
      style={{maxWidth: '700px'}}
    >
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body">
            <p className="card-text">
              <small className="text-body-secondary">{date}</small>
            </p>
            <h5 className="card-title fs-3 fw-bolder">{title}</h5>
            <p className="card-text text-secondary">{text}</p>
          </div>
        </div>
        <div className="col-md-4">
          <img src={image} className="img-fluid " alt={title} />
        </div>
      </div>
    </article>
  )
}
