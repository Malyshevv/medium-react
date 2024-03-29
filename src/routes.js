import React from 'react'
import {Switch, Route} from 'react-router-dom'

import GlobalFeed from './pages/globalFeed'
import YourFeed from './pages/yourFeed'
import TagFeed from './pages/tagFeed'
import Article from './pages/article'
import CreateArticle from './pages/article/createArticle'
import EditArticle from './pages/article/editArticle'
import Authentication from './pages/authentication'
import Settings from './pages/settings'
import UserProfile from './pages/userProfile'

export default () => {
    return (
        <Switch>
            <Route path='/' component={GlobalFeed} exact/>
            <Route path='/feed' component={YourFeed} />
            <Route path='/settings' component={Settings} />
            <Route path='/profiles/:slug' component={UserProfile} />
            <Route path='/profiles/:slug/favorites' component={UserProfile} />
            <Route path='/tags/:slug' component={TagFeed} />
            <Route path='/articles/new' component={CreateArticle} />
            <Route path='/articles/:slug/edit' component={EditArticle} exact/>
            <Route path='/articles/:slug' component={Article} exact/>
            <Route path='/login' component={Authentication} />
            <Route path='/register' component={Authentication} />
        </Switch>
    )
}
