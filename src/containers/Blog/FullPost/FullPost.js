import React, {Component} from 'react';
import styles from './FullPost.module.scss';
import axios from "../../../axios";
import Spinner from '../../../components/Spinner/Spinner';

class FullPost extends Component {
    state = {
        post: null,
        error: false
    };

    componentDidMount() {
        this.fetchPost();
    }

    componentDidUpdate() {
        this.fetchPost();
    };

    fetchPost() {
        if (this.props.match.params.id) {
            if (!this.state.post || (this.state.post && this.state.post.id !== this.props.match.params.id)) {
                axios.get(`/posts/${this.props.match.params.id}.json`)
                    .then(response => {
                        if (response.data) {
                            const newData = {
                                ...response.data,
                                id: this.props.match.params.id
                            };

                            this.setState({post: newData});
                        } else {
                            this.setState({error: true});
                        }
                    });
            }
        }
    };

    removePostHandler = () => {
        this.setState({post: null});
        axios.delete(`/posts/${this.props.match.params.id}.json`)
            .then(response => {
                this.props.history.push('/');
            });
    };

    render() {
        let post = (
            <section className={styles["full-post"]}>
                <Spinner/>
            </section>
        );

        if (this.state.error) {
            post = (
                <section className={styles["full-post"]}>
                    <h3>Error!</h3>
                    <h4>Couldn't find post!</h4>
                </section>
            );
        }

        if (this.state.post) {
            post = (
                <section className={styles["full-post"]}>
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <p>
                        <small>Author: {this.state.post.author}</small>
                    </p>
                    <div className={styles.edit}>
                        <button onClick={this.removePostHandler} className={styles.delete}>Delete</button>
                    </div>
                </section>
            );
        }

        return post;
    }
}

export default FullPost;