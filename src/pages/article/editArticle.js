import React, { useEffect, useState, useContext} from 'react'
import { Redirect } from 'react-router-dom';

import ArticleForm from "../../components/articleForm";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../context/curentUser";


const EditArticle = props => {
    const slug = props.match.params.slug
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl)
    const [initialValues, setInitialValues] = useState(null)
    const [isSuccessfulSubmit, setIsSuccessfullSubmit] = useState(false)
    const [currentUserState] = useContext(CurrentUserContext)

    const handleSubmit = article => {
        console.log('handleSubmit', article)
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if(!fetchArticleResponse) {
            return
        }
        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        })
    }, [fetchArticleResponse])

    useEffect(() => {
        if(!updateArticleResponse) {
            return
        }
        setIsSuccessfullSubmit(true)
    },[updateArticleResponse])

    if(currentUserState.isLoggedIn === false) {
        return <Redirect to="/"/>
    }

    if(isSuccessfulSubmit) {
        return <Redirect to={`/articles/${slug}`}/>
    }

    return (
        <div>
            <ArticleForm
                errors={(updateArticleError && updateArticleError.errors) || {}}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default EditArticle
