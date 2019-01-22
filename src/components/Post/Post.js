import React from 'react';
import styles from './Post.module.scss';
import {Link} from 'react-router-dom';

const post = (props) => (
    <article className={styles.post}>
        <h1>{props.title}</h1>
        <div className={styles.author}>{props.author}</div>
        <div className={styles.options}>
            <Link to={`/post/${props.id}`}>Show</Link>
            <button onClick={props.delete}>Delete</button>
        </div>
    </article>
);

export default post;