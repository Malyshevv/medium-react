import React, { useContext, Fragment } from 'react'
import {Link,NavLink} from 'react-router-dom'

import {CurrentUserContext} from '../context/curentUser'

const TopBar = () => {
    const [curentUserState] = useContext(CurrentUserContext)
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Medium
                </Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" exact>
                            Home
                        </NavLink>
                    </li>
                    {curentUserState.isLoggedIn === false && (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                    Sign in
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">
                                    Sign up
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                    {curentUserState.isLoggedIn && (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink to ="/articles/new" className="nav-link">
                                    <i className="ion-compose"></i>
                                    &nbsp; New Post
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to ="/settings" className="nav-link">
                                    <i className="ion-gear-a"></i>
                                    &nbsp; Settings
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to ={`/profiles/${curentUserState.currentUser.username}`}
                                    className="nav-link">
                                    <img
                                        className="user-pic"
                                        src={curentUserState.currentUser.image || "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"}
                                        alt=""/>
                                         &nbsp; {curentUserState.currentUser.username}
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default TopBar;
