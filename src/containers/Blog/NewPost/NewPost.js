import React, {Component} from 'react';
import axios from '../../../axios';
import styles from './NewPost.module.scss';
import Spinner from '../../../components/Spinner/Spinner';

class NewPost extends Component {
    state = {
        title: '',
        body: '',
        author: 'Eduard',
        send: false,
        loading: false
    };

    sendPostRequestHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        };

        this.setState({loading: true});

        axios.post('/posts.json', data)
            .then(response => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    send: false,
                    loading: false
                });
            });
    };

    render() {
        let post = (
            <section className={styles["new-post"]}>
                <h1>Add a Post</h1>
                <label>Title</label>
                <input
                    type="text"
                    value={this.state.title}
                    onChange={(event) => this.setState({title: event.target.value})}/>
                <label>Content</label>
                <textarea
                    rows="4"
                    value={this.state.body}
                    onChange={(event) => this.setState({body: event.target.value})}/>
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Eduard">Eduard</option>
                    <option value="Emily">Emily</option>
                    <option value="James">James</option>
                </select>
                <button onClick={this.sendPostRequestHandler}>Add Post</button>
            </section>
        );

        if (this.state.loading) {
            post = (
                <section className={styles["new-post"]}>
                    <Spinner/>
                </section>
            );
        }

        return post;
    }
}

export default NewPost;