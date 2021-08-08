import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import './write.scss';

export default function Write() {
    const [cates, setCates] = useState([]);
    useEffect(() => {
        const fetchCates = async () => {
            const res = await axios.get("/category");
            setCates(res.data);
        }
        fetchCates();
    }, []);
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [postCate, setPostCate] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            title,
            desc,
            category: postCate
        };
        if (file) {
            const data = new FormData();
            const fileName = file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.photo = fileName;
            try {
                await axios.post("/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await axios.post("/post", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="write">
            {file && <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
            />}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => { setFile(e.target.files[0]) }}
                    />
                    <input
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    <select onChange={(e) => { setPostCate(e.target.value) }} placeholder="category" id="selector">
                        <option selected disabled="true" hidden="true">Category</option>
                        {cates.map((cate) => (
                            <option>{cate.name}</option>
                        ))}
                    </select>
                </div>
                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                        onChange={(e) => { setDesc(e.target.value) }}
                    />
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    )
}
