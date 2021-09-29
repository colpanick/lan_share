import React from 'react';
import Post from "./Post";

const Posts = ({posts, onDelete}) => {
    return (
        posts.map((post) => (
            <Post key={post.id} post={post} onDelete={onDelete}></Post>
        ))
    );
};

export default Posts;
