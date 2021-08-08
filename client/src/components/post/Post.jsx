import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './post.scss';
import { format } from "timeago.js";

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/";

    return (
        <div className='post'>
            {post.photo && <img src={PF + post.photo} alt="" className="postImg" />}
            <div className="postInfo">
                <div className="postCats">
                    {(post.category).map((cate) => (
                        <span className="postCat">{cate}</span>
                    ))}
                </div>
                <span className="postTitle">
                    <Link style={{ textDecoration: "none" }} to={`/post/${post._id}`}>{post.title}</Link>
                </span>
                <hr />
                <span className="postDate">{format(new Date(post.createdAt))}</span>
            </div>
            <p className="postDesc">
                {post.desc}
            </p>
        </div>
    )
}
