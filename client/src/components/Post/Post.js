import React from 'react'
import { Link } from 'react-router-dom';
import "./Post.scss";
import { useAuth } from '../../context/auth';
import moment from 'moment'


import comments from '../../assets/icons/comments.svg';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';



const Post = ({ data, handleError }) => {

    const { user } = useAuth();

    return (
        data && 
            <div className="post" id={data.id}>
                <h3 className="post__username">{data.username}</h3>
                <p className="post__date">{moment(data.createdAt).fromNow()}</p>
                <p className="post__body">{data.body}</p>
                <div className="post__tray">
                    <LikeButton handleError={handleError} user={user} likeCount={data.likeCount} id={data.id} likes={data.likes}/>
                    <Link to={`/post/${data.id}`}><div className="post__comments">{data.commentCount} <img className="post__com" src={comments} alt="comments"/></div></Link>
                    {user && user.username === data.username && <DeleteButton postId={data.id}/>}
                </div> 
            </div>
    )
}




export default Post
