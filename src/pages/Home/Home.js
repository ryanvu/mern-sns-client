import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';

import Loading from '../../components/Loading/Loading';
import './Home.scss';
import Post from '../../components/Post/Post';
import { useAuth } from '../../context/auth';
import PostForm from '../../components/PostForm/PostForm';
import { AnimatePresence } from 'framer-motion';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

const Home = () => {
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useAuth();

    if (data) {
        
    }

    const toggleModal = () => {
        setShowModal(prev => !prev);
    }

    const handleErrors = (err) => {
        setError(err);
    }
    return (
        <div className="home">
            {error && <motion.p 
            initial={{y: -100}}
            animate={{y: 0}}
            className="home__error">{error}</motion.p>}
            <AnimatePresence>
                {showModal && <PostForm close={toggleModal}/>}
            </AnimatePresence>
            {user && (
                <button onClick={() => setShowModal(prev => !prev)}className="home__btn">Post</button>
            )}
            {loading ? <Loading /> : null}
            <div className="home__posts">
                
                {data && !loading && data.getPosts.map((post, i) => {
                    return (
                        <Post handleError={handleErrors} key={i} data={post}/>
                    )
                })}
                
            </div>
        </div>
    )
}

export default Home
