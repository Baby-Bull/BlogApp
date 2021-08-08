import React, { useContext, useEffect, useState } from 'react';
import './singlePost.scss';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function SinglePost(props) {
    const PF = "http://localhost:5000/images/";
    const postId = window.location.pathname.split("/")[2];

    const { user } = useContext(Context)
    const [post, setPost] = useState({});
    const [userPost, setUserPost] = useState({});
    const [updateMode, setUpdateMode] = useState(false);
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`/post/` + postId);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            props.parentFunc(res.data.category);
            const res2 = await axios.get(`/user/${res.data.userId}`);
            setUserPost(res2.data);
        }
        fetchPost();
    }, [postId]);

    const handleDelete = async () => {
        await axios.delete(("/post/" + postId), {
            data: { userId: userPost._id }
        });
        window.location.replace("/");
    }
    const handleUpdate = async () => {
        try {
            await axios.put("/post/" + post._id, {
                userId: user._id,
                title,
                desc
            });
            setUpdateMode(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo ?
                    <img className="singlePostImg" src={PF + post.photo} />
                    : <img className="singlePostImg" src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />}
                {
                    updateMode ?
                        (<input className="singlePostTitleInput"
                            value={title}
                            type="text"
                            autoFocus
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }} />) :
                        (<h1 className="singlePostTitle">
                            {title}
                            {(user._id === userPost._id) &&
                                (<div className="singlePostEdit">
                                    <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                                </div>)
                            }
                        </h1>)
                }
                <div className="singlePostInfo">
                    <span>Author:
                        <Link style={{ textDecoration: "none" }} to={`/?userId=${userPost._id}`}>
                            <b className="singlePostAuthor">{user.username}</b>
                        </Link>
                    </span>
                    <span>{format(new Date(post.createdAt))}</span>
                </div>
                {
                    updateMode ?
                        (<>
                            <textarea className="singlePostDescInput"
                                value={desc}
                                onChange={e => {
                                    setDesc(e.target.value)
                                }}>
                            </textarea>
                            <button className='singlePostButton' onClick={handleUpdate}>Update</button>
                        </>
                        ) :
                        (<p className="singlePostDesc">
                            {desc}
                        </p>)
                }

            </div>
        </div >
    );
}
