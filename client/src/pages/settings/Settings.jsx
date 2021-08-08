import React, { useContext, useRef, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context';
import './settings.scss';
import axios from 'axios';

export default function Settings() {
    const PF = "http://localhost:5000/images/";
    const { user, dispatch } = useContext(Context);

    const [username, setUserName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");

    const [file, setFile] = useState(null);


    console.log(user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updateUser = {
            userId: user._id,
            username: username,
            email: email,
            password: password
        };
        if (file) {
            const data = new FormData();
            const filename = file.name;
            data.append("name", filename);
            data.append("file", file);
            updateUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await axios.put("/user/" + user._id, updateUser);
            dispatch({ type: "LOGOUT" });
            alert("Update Successful");
            window.location.replace("/login");
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });
            console.log(error);
        }
    };

    const handleDelete = async (e) => {
        try {
            await axios.delete("/user/" + user._id, {
                data: { userId: user._id }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Your Account</span>
                    <span onClick={handleDelete} className="settingsTitleDelete">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : (PF + user.profilePic)}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            className="settingsPPInput"
                            onChange={(e) => { setFile(e.target.files[0]) }}
                        />
                    </div>
                    <label>Username</label>
                    <input required value={username} type="text" placeholder={user.username} name="name" onChange={(e) => { setUserName(e.target.value) }} />
                    <label>Email</label>
                    <input required value={email} type="email" placeholder={user.email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <label>Password</label>
                    <input required value={password} type="password" placeholder="your password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <button className="settingsSubmitButton" type="submit">
                        Update
                    </button>
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
