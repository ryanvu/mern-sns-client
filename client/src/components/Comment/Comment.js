import React from 'react'
import moment from 'moment';
import './Comment.scss';
import DeleteButton from '../DeleteButton/DeleteButton';
import LikeButton from '../LikeButton/LikeButton';

const Comment = ({commentId, postId, username, createdAt, body, userContext, likes, handleErr}) => {
    return (
        <div id={commentId} className="comment">
            <h3 className="comment__user">{username}</h3>
            <p className="comment__date">{moment(createdAt).fromNow()}</p>
            <p className="comment__body">{body}</p>
            <div className="comment__tray">
                <LikeButton 
                user={userContext} 
                likes={likes} 
                likeCount={likes.length} 
                id={postId}
                commentId={commentId}
                handleError={handleErr}/>
            {userContext && userContext.username === username && (
                <DeleteButton commentId={commentId} postId={postId}/>
            )}
            </div>
        </div>
    )
}

export default Comment
