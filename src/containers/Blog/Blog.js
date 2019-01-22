import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Blog.module.scss';
import Posts from './Posts/Posts'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    render() {
        return (
            <Aux>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    exact
                                    activeClassName={styles.active}
                                    to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    exact
                                    activeClassName={styles.active}
                                    to='/new-post'>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path='/new-post' exact component={AsyncNewPost}/>
                    <Route path='/post' component={Posts}/>
                    {/*<Route render={() => <h3 style={{textAlign: 'center', color: 'red'}}>Not found (404)!</h3>}/>*/}
                    <Redirect from={'/'} to={'/post'}/>
                </Switch>
            </Aux>
        );
    }
}

export default Blog;