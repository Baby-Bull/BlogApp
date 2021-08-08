import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/singlePost/SinglePost';
import './single.scss';

export default function Single() {
    const [catesPost, setCatesPost] = useState([]);
    const callbackCates = (childData) => {
        setCatesPost(childData);
    }
    return (
        <div className='single'>
            <SinglePost parentFunc={callbackCates} />
            <Sidebar cates={catesPost} />
        </div>
    )
}
