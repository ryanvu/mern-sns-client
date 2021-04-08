import React, { useState } from 'react'
import './DeleteButton.scss';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

import trash from '../../assets/icons/trash.svg';

const DeleteButton = ({postId, commentId, callback}) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy){
            setConfirmDelete(false);
            //remove from cache
            if(!commentId){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });
    
                let newData = data.getPosts.filter(p => p.id !== postId);
                proxy.writeQuery({ 
                    query: FETCH_POSTS_QUERY, 
                    variables: { postId, commentId },
                    data: { 
                        getPosts: {
                            newData
                        }
                    }
                });
            }
            if (callback) callback();
        },
        variables: { postId, commentId }
    })
    return (
        <>
        <div onClick={()=>{setConfirmDelete(true)}}className="delete">
            <img className="delete__trash" src={trash} alt="trash"/>
        </div>
        {confirmDelete &&
        <div className="delete__modal">
            <div className="delete__modal-content">
                <p className="delete__modal-msg">Are you sure you want to delete this post?</p>
                <div className="delete__modal-tray">
                    <button className="delete__modal-btn"onClick={() => setConfirmDelete(false)}>Cancel</button>
                    <button className="delete__modal-btn" onClick={deletePostOrMutation}>Delete</button>
                </div>
            </div>
        </div>}
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`

export default DeleteButton
