import React,{useState,useContext,useEffect} from 'react'
import { Redirect } from 'react-router-dom';

import useFetch from "../../hooks/useFetch"
import useLocalStorage from '../../hooks/useLocalStorage'
import {CurrentUserContext} from "../../context/curentUser"
import BackendErrorMessages from "../../components/backendErrorMessages"

const Settings = () => {


    const apiUrl = `/user`
    const [{response,error}, doFetch] = useFetch(apiUrl)

    const [image, setImage] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [currentUserState,dispatch] = useContext(CurrentUserContext)
    const [, setToken] = useLocalStorage('token')
    const [isSuccessfulLogout, setIsSuccessfullLogout] = useState(false)

    const handleSubmit = event => {
      event.preventDefault()

      doFetch({
        method: 'put',
        data: {
          user: {
            ...currentUserState.currentUser,
            image,
            username,
            bio,
            email,
            password
          }
        }
      })
    }

    const logout = event => {
      event.preventDefault()
      setToken('')
      dispatch({type: 'LOGOUT'})
      setIsSuccessfullLogout(true)
    }

    useEffect(() => {
        if(!currentUserState.currentUser){
          return
        }
        const currentUser = currentUserState.currentUser

        if(currentUser.image == null) {
          currentUser.image = ""
        }
        if(currentUser.password == null) {
          currentUser.password = ""
        }

        if(currentUser.bio == null) {
          currentUser.bio = ""
        }

        setImage(currentUser.image)
        setUsername(currentUser.username)
        setBio(currentUser.bio)
        setEmail(currentUser.email)

    }, [currentUserState.currentUser])

    useEffect(() => {
      if(!response) {
        return
      }
      dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    },[response, dispatch])

    if(isSuccessfulLogout) {
      return <Redirect to="/" />
    }

    return (
      <div className="settings-page">
        <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your settings</h1>
                        {error && <BackendErrorMessages backendErrors={error.errors} /> }
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        onChange={e => setImage(e.target.value)}
                                        value={image}
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="URL of profile picture" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        onChange={e => setUsername(e.target.value)}
                                        value={username}
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Username" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        onChange={e => setBio(e.target.value)}
                                        value={bio}
                                        className="form-control form-control-lg"
                                        rows="8"
                                        placeholder="Shor bio">
                                    </textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        type="email"
                                        className="form-control"
                                        placeholder="Email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <center><label><b>Enter your password for update profile</b></label></center>
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        type="password"
                                        className="form-control"
                                        placeholder="Password" />
                                </fieldset>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary pull-xs-right">
                                    Update settings
                                </button>
                            </fieldset>
                        </form>
                        <hr/>
                        <button
                          className="btn btn-outline-danger"
                          onClick={logout}>
                          Or click here to logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
