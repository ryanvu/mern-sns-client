import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput';
import { motion } from 'framer-motion';
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

import './PostForm.scss';

const PostForm = ({close}) => {
    const [errors, setErrors] = useState('');
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
        const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            let newData = [...data.getPosts];
            proxy.writeQuery({ 
                query: FETCH_POSTS_QUERY,
                variables: values, 
                data: {
                    ...result.data.createPost,
                    getPosts: {
                        newData,
                    },
                },
            })
            values.body = ''
            close();
        },
        onError(err){
            setErrors(err.graphQLErrors)
        }
    })

    function createPostCallback(){
        createPost();
    }

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0, transition: { duration: 0.3}}}
        className="postform">
            <form onSubmit={onSubmit} className="postform__form">
                <div className="postform__title">
                    <h4 className="postform__h">Post</h4>
                    <span onClick={close} className="postform__close">x</span>
                </div>
                <FormInput post 
                name="body"
                handleChange={onChange}
                value={values.body}/>
                <button className="postform__btn">Create Post</button>
                {errors && 
                    <div className="postform__error">
                        <ul>
                            <li>
                                {JSON.stringify(errors[0].message)}
                            </li>
                        </ul>
                    </div>
                }
            </form>
            
        </motion.div>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body: String!
    ){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id username body createdAt
            }
            commentCount
        }
    }
`

export default PostForm
