import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './homepage.scss';
import axios from 'axios';

export default function Homepage() {
    const path = window.location.search;

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/post/" + path);
            setPosts(res.data);
        }
        fetchPosts();
    })

    return (
        <div>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </div>
    )
}
