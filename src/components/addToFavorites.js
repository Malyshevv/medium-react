import React from 'react'
import classNames from 'classnames'

import useFetch from '../hooks/useFetch'

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {

  const apiUrl = `/articles/${articleSlug}/favorite`
  const [{response}, doFetch] = useFetch(apiUrl)
  const favoritesCountResp = response ? response.article.favoritesCount : favoritesCount
  const isFavoritedResp = response ? response.article.favorited : isFavorited

  const buttonClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritedResp,
    'btn-outline-primary': !isFavoritedResp
  })

  const handleLike = event => {
      event.preventDefault()
      doFetch({
        method: isFavoritedResp ? 'delete' : 'post'
      })
  }
  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart"></i>
      <span>&nbsp; {favoritesCountResp}</span>
    </button>
  )
}

export default AddToFavorites
