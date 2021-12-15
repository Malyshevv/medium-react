import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'

import {CurrentUserContext} from '../context/curentUser'

const FeedToogler = ({tagName}) => {
    const [currentUserState] = useContext(CurrentUserContext)
    return (
        <div className="feed-toogle">
            <ul className="nav nav-pills outline-active">
                {currentUserState.isLoggedIn && (
                    <li className="nav-item">
                        <NavLink to="/feed" className="nav-link">
                            YourFeed
                        </NavLink>
                    </li>
                )}
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" exact>
                        GlobalFeed
                    </NavLink>
                </li>
                {tagName && (
                    <li className="nav-item">
                        <NavLink to={`/tags/${tagName}`} className="nav-link" exact>
                            <i className="ion-pound"></i>
                            {tagName}
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default FeedToogler
