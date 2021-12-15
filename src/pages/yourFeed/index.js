import React, { Fragment, useEffect } from 'react'
import {stringify} from 'query-string'

import useFetch from '../../hooks/useFetch'
import Feed from '../../components/feed'
import PopularTags from '../../components/popularTags'
import FeedToogler from '../../components/feedToggler'
import Pagination from '../../components/pagination'
import {getPaginator, limit} from '../../utils'

import Loading from '../../components/loading'
import ErrorMessage from '../../components/errorMessage'

const YourFeed = ({location,match}) => {
    const {offset,currentPage} = getPaginator(location.search)
    const stringifiedParams = stringify({
        limit,
        offset
    })
    const apiUrl = `/articles/feed?${stringifiedParams}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    const url = match.url

    useEffect(() => {
        doFetch()
    }, [doFetch,currentPage])

    return(
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium Clone</h1>
                    <p>A place to share knowleadge</p>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <FeedToogler/>
                        {isLoading && <Loading/>}
                        {error && <ErrorMessage/>}
                        {!isLoading && response && (
                            <Fragment>
                                <Feed articles={response.articles}/>
                                <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage}/>
                            </Fragment>

                        )}
                    </div>
                    <div className="col-md-3">
                        <PopularTags/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourFeed;
