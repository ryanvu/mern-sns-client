import React, { useState } from 'react'
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';
import moment from 'moment';
import { useAuth } from '../../context/auth';

import commentsvg from '../../assets/icons/comments.svg';

import './SinglePost.scss';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import Comment from '../Comment/Comment';
const SinglePost = ({match, history}) => {
    const [error, setError] = useState("")
    const [comment, setComment] = useState('');

    const handleError = (err) => {
        setError(err)
    }

    const { user } = useAuth();

    const postId = match.params.postId

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update(){
            setComment('')
        },
        variables: {
            postId,
            body: comment
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        submitComment();
    }
    const deletePostCallback = () => {
        history.push("/")
    }
    let postMarkup;
    if(!data){
        postMarkup = <Loading />
    } else {
        
        const { username, id, body, createdAt, likeCount, commentCount, likes, comments } = data.getPost;
       
            postMarkup = (
                <>
                    {error && <p className="singlepost__err">{error}</p>}
                    <div id={id} className="singlepost">
                        <h2>{username}</h2>
                        <p>{moment(createdAt).fromNow()}</p>

                        <p className="singlepost__body">{body}</p>
                        <div className="singlepost__tray">
                            <LikeButton user={user} likeCount={likeCount} id={id} likes={likes} handleError={handleError}/>
                            <div className="singlepost__tray-comments">{commentCount}<img style={{height: "1.5rem", marginLeft: "0.25rem"}} src={commentsvg} alt="comments"/></div>
                            {user && user.username === username && <DeleteButton callback={deletePostCallback} postId={id}/>}
                        </div>
                        {user && (
                            <form onSubmit={handleSubmit} className="singlepost__createcomment">
                                <div className="singlepost__input">
                                    <label 
                                    className="singlepost__createcomment-label">Write a comment</label>
                                    <input
                                    className="singlepost__createcomment-input"
                                    type="text" 
                                    value={comment} 
                                    name="comment" 
                                    onChange={(e) => {setComment(e.target.value)}}/>
                                </div>
                                <button 
                                className="singlepost__createcomment-btn"
                                >Comment</button>
                            </form>
                        )}
                        <div className="singlepost__comments">
                            <h5 className="singlepost__comments-title">{commentCount} Comments</h5>
                            {
                                comments.map((com, i) => {
                                    return (
                                    <Comment
                                    userContext={user}
                                    likes={com.likes} 
                                    key={i} 
                                    commentId={com.id}
                                    postId={id}
                                    createdAt={com.createdAt}
                                    body={com.body}
                                    username={com.username}
                                    handleErr={handleError}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                </>
            )
        }
    return postMarkup
}

const CREATE_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                username
                body
                createdAt
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            username
            body
            createdAt
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
                likes{
                    id
                    username
                }
            }
        }
    }
`

export default SinglePost
