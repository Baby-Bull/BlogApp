import React, { useEffect, useState } from 'react';
import './sidebar.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar(props) {
    const [cates, setCates] = useState([]);
    useEffect(() => {
        const fetchCates = async () => {
            const res = await axios.get('/category');
            setCates(res.data);
        }
        fetchCates();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vel odio dignissimos, quaerat officiis aspernatur minima quae quo dolore id ullam, saepe iste expedita et quisquam. Molestiae maiores ea architecto!</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {props.cates ? props.cates.map((data) => (
                        <Link to={`/?cate=${data}`}>
                            <li className="sidebarListItem">{data}</li>
                        </Link>
                    ))
                    : cates.map((cate) => (
                        <Link to={`/?cate=${cate.name}`}>
                            <li className="sidebarListItem">{cate.name}</li>
                        </Link>
                    ))
                    }
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    )
}
