import { useContext, useEffect } from 'react'

import useFetch from '../hooks/useFetch'
import {CurrentUserContext} from '../context/curentUser'
import useLocalStorge from '../hooks/useLocalStorage'

const CurrentUserChecker = ({children}) => {
    const [{response}, doFetch] = useFetch('/user')
    const [, dispatch] = useContext(CurrentUserContext)
    const [token] = useLocalStorge('token')

    useEffect(() => {
        if(!token) {
            dispatch({type: 'SET_UNAUTHORIZED'})
            return
        }

        doFetch()
        dispatch({type: 'LOADING'})
    },[token, dispatch, doFetch])

    useEffect(() => {
        if(!response) {
            return
        }

        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    },[response, dispatch])
    return children
}

export default CurrentUserChecker
