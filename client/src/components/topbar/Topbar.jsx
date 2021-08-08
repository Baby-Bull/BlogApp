import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.scss';

export default function Topbar() {
    const PF = "http://localhost:5000/images/";

    const { user, dispatch } = useContext(Context);
    const handleClick = () => {
        dispatch({ type: "LOGOUT" });
    }
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem"><Link className='link' to='/'>HOME</Link></li>
                    <li className="topListItem">ABOUT</li>
                    <li className="topListItem">CONTACT</li>
                    <li className="topListItem"><Link className='link' to='/write'>WRITE</Link></li>
                    <li style={{ marginLeft: "200px" }} className="topListItem" onClick={handleClick}><Link className="link" to="/login">{user && "LOGOUT"} </Link></li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to="/settings">
                        <img src={user.profilePic ? PF + user.profilePic : "https://tipsmake.com/data1/thumbs/instructions-for-creating-facebook-avatar-animated-version-of-yourself-thumb-Ul9cSm54g.jpg"} alt="" className="topImg" />
                    </Link>) :
                    (<ul className="topList">
                        <li className="topListItem"><Link className='link' to='/login'>LOGIN</Link></li>
                        <li className="topListItem"><Link className='link' to='/register'>REGISTER</Link></li>
                    </ul>)
                }
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
