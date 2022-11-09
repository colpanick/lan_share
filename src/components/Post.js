import React from 'react';
import {Card} from "react-bootstrap";
import {FaTrashAlt} from "react-icons/fa";

const Post = ({post, onDelete}) => {
    const title = post.title ? post.title : post.url
    return (
        <Card className="p-3 m-2 text-light bg-dark">
            <h5 className="card-header p-2 shadow">
                <span>{post.url ? <a href={post.url} className="link-secondary" target="_blank" rel="noreferrer">{title}</a> : title}</span>
                <span><FaTrashAlt onClick={() => onDelete(post.id)} /></span>
            </h5>
            { post.body &&
                <p className="card-body post-body">
                {post.body}
                </p>
            }

        </Card>
    );
};

export default Post;
