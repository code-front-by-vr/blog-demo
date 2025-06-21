import React from 'react'
import {PostCardLg} from '../post-card/PostCardLg'
import {PostCardMd} from '../post-card/PostCardMd'
import {PostCardSm} from '../post-card/PostCardSm'
import {Tabs} from '../tabs/Tabs'
import {PostType, TabsProps} from '../../types'

type CardType = 'PostCardLg' | 'PostCardMd' | 'PostCardSm'

interface PostGridProps {
  tabs: TabsProps['tabs']
  post: PostType[]
}

interface Row {
  type: CardType
  count: number
  className: string
}

export function PostGrid({tabs, post}: PostGridProps): React.ReactElement {
  const gridLayout: Row[][] = [
    [
      {type: 'PostCardLg', count: 1, className: 'col-sm-8 d-flex'},
      {type: 'PostCardSm', count: 2, className: 'col-sm-4 d-flex flex-column'},
    ],
    [
      {type: 'PostCardMd', count: 2, className: 'col-sm-8 d-flex justify-content-between gap-4'},
      {
        type: 'PostCardSm',
        count: 2,
        className: 'col-sm-4 d-flex justify-content-between flex-column',
      },
    ],
    [
      {type: 'PostCardMd', count: 2, className: 'col-sm-8 d-flex justify-content-between gap-4'},
      {
        type: 'PostCardSm',
        count: 2,
        className: 'col-sm-4 d-flex justify-content-between flex-column',
      },
    ],
  ]

  const cardComponents = {
    PostCardLg,
    PostCardMd,
    PostCardSm,
  }

  function renderCard(cardType: string, count: number, startIndex: number): React.ReactElement {
    const CardComponent = cardComponents[cardType as keyof typeof cardComponents]

    return (
      <>
        {Array.from({length: count}).map((_, index) => {
          const postIndex = startIndex + index
          if (postIndex >= post.length) return null

          return <CardComponent key={post[postIndex].id} {...post[postIndex]} />
        })}
      </>
    )
  }

  function renderRow(row: Row[], rowIndex: number): React.ReactElement {
    let postCounter = 0

    return (
      <div className="row" key={rowIndex}>
        {row.map((card, colIndex) => {
          const cardElement = renderCard(card.type, card.count, postCounter)
          postCounter += card.count
          return (
            <div className={card.className} key={`${rowIndex}-${colIndex}`}>
              {cardElement}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <Tabs tabs={tabs} />
      <div className="container mb-4">
        {gridLayout.map((row, rowIndex) => renderRow(row, rowIndex))}
      </div>
    </>
  )
}
