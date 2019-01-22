import React, {Component} from 'react';
import styles from "./Posts.module.scss";
import axios from "../../../axios";
import Post from '../../../components/Post/Post'
import Spinner from '../../../components/Spinner/Spinner';
import {Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";
import Aux from "../../../hoc/Auxiliary";

class Posts extends Component {
    state = {
        posts: [],
        error: false,
        totalPostCount: 0,
        showNumber: 10,
        fetching: false
    };

    componentDidMount() {
        this.fetchPostsHandler();
    }

    fetchPostsHandler = () => {
        this.setState({fetching: true});
        axios.get('/posts.json')
            .then(response => {
                const fetchedPosts = [];

                for (let key in response.data) {
                    fetchedPosts.push({
                        ...response.data[key],
                        id: key
                    });
                }

                this.setState({totalPostCount: fetchedPosts.length});

                const posts = fetchedPosts.slice(0, this.state.showNumber);
                const updatedPosts = posts.map(post => {
                    return {...post};
                });
                this.setState({
                    posts: updatedPosts,
                    fetching: false
                });
            })
            .catch(error => {
                console.log(error);
                //this.setState({error: true});
            });
    };

    showChosenNumberHandler = (newNumber) => {
        this.setState({showNumber: newNumber});
        this.fetchPostsHandler();
    };

    removePostHandler = (selectedId) => {
        axios.delete(`/posts/${selectedId}.json`)
            .then(response => {
                this.fetchPostsHandler();
            });
    };

    render() {
        let posts = <h3 className={styles.error}>Something went wrong!</h3>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        author={post.author}
                        delete={() => this.removePostHandler(post.id)}/>
                );
            });
        }

        if (this.state.posts.length === 0 && !this.state.fetching) {
            posts = <h3 className={styles.add}>Please add a post!</h3>;
        } else if (this.state.fetching) {
            posts = (
                <Spinner/>
            );
        }

        return (
            <Aux>
                <Route path='/post/:id' exact component={FullPost}/>
                <section className={styles.posts}>
                    <label>
                        <p>Number of posts:</p>
                        <select
                            value={this.state.showNumber}
                            onChange={(event) => this.showChosenNumberHandler(event.target.value)}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={40}>40</option>
                            <option value={80}>80</option>
                        </select>
                    </label>
                    <h4>Showing maximum {this.state.showNumber} of {this.state.totalPostCount} posts!</h4>
                    {posts}
                </section>
            </Aux>
        );
    }
}

export default Posts;