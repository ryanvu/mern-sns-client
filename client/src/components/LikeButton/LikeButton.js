import React, { useEffect, useState } from 'react'
import nolike from '../../assets/icons/nolike.svg';
import like from '../../assets/icons/like.svg';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion';

const LikeButton = ({user, id, likeCount, likes, handleError, commentId}) => {
    const [liked, setLiked] = useState(false);

    const mutation = commentId ? LIKE_COMMENT_MUTATION : LIKE_POST_MUTATION
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes])

    const [likePost] = useMutation(mutation, {
        variables: commentId ? { postId: id, commentId} : { postId: id },
        onError(err){
            handleError('You must be logged in to like a post')
            window.scrollTo(0,0)
        }
    })

    return (
        <div onClick={likePost} className="post__like">
            {likeCount}
            
                {liked ? 
                <motion.img
                initial={{scale: 0}}
                animate={liked ? {scale: 1} : {scale: 0}}
                transition={{duration: 0.7}}
                className="post__heart" 
                src={like} 
                alt="liked heart"/> : 
                <motion.img
                initial={{scale: 0}}
                animate={!liked ? {scale: 1} : {scale: 0}}
                transition={{duration: 0.7}}
                className="post__heart"
                src={nolike} 
                alt="non liked heart"/>}
            
        </div>
    )
}
const LIKE_COMMENT_MUTATION = gql`
    mutation likeComment($postId: ID!, $commentId: ID!){
        likeComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id
                createdAt
                likes{
                    id
                    username
                }
            }
        }
    }
`
const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`
export default LikeButton
