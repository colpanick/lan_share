import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {FaTrashAlt} from "react-icons/fa";
import Fade from "react-bootstrap/Fade"

const Post = ({post, onDelete}) => {

    const [showTrash, setShowTrash] = useState(false)

    const title = post.title ? post.title : post.url
    return (
        <Card className="p-3 mt-3 text-light bg-dark" onMouseEnter={() => setShowTrash(true)} onMouseLeave={() => setShowTrash(false)}>
            <h5 className="card-header p-2 shadow" >
                <span>{post.url ? <a href={post.url} className="link-secondary" target="_blank" rel="noreferrer">{title}</a> : title}</span>
                <span>
                    <Fade in={showTrash}>
                        <FaTrashAlt className={"text-secondary p-0 m-0"} onClick={() => onDelete(post.id)} />
                    </Fade>
                </span>
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
