import React from 'react'
import {PostType} from '../../types'

type PostCardSmProps = PostType & {
  imagePosition?: 'left' | 'right'
  imageSize?: 'normal' | 'compact'
  imageHeight?: string
}

export function PostCardSm({
  date,
  title,
  image,
  imagePosition = 'right',
  imageSize = 'normal',
  imageHeight = '120px',
}: PostCardSmProps): React.ReactElement {
  const contentColClass = imageSize === 'compact' ? 'col-md-11' : 'col-md-8'
  const imageColClass = imageSize === 'compact' ? 'col-md-1' : 'col-md-4'

  const contentColumn = (
    <div className={contentColClass}>
      <div className="card-body">
        <p className="card-text">
          <small className="text-body-secondary">{date}</small>
        </p>
        <h5 className="card-title fw-semibold">{title}</h5>
      </div>
    </div>
  )

  const imageColumn = (
    <div className={imageColClass} style={{height: imageHeight}}>
      <img src={image} className="img-fluid h-100 object-fit-cover" alt={title} />
    </div>
  )

  return (
    <article className="card border-0 border-bottom rounded-0">
      <div className="row g-0">
        {imagePosition === 'left' ? (
          <>
            {imageColumn}
            {contentColumn}
          </>
        ) : (
          <>
            {contentColumn}
            {imageColumn}
          </>
        )}
      </div>
    </article>
  )
}
