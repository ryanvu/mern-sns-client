import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';

console.log(process.env.REACT_APP_URI)
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_URI
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies:{
            Query:{
                fields: {
                    getPosts: {
                        merge(existing, incoming){
                            return incoming
                        },
                    }
                }
            },
            Post:{
                fields: {
                    comments: {
                        merge(existing, incoming){
                            return incoming
                        }
                    },
                    likes: {
                        merge(existing, incoming){
                            return incoming
                        }
                    }
                }
            },
            Comment:{
                fields: {
                    likes: {
                        merge(existing, incoming){
                            return incoming
                        }
                    }
                }
            }
        }
    })
})



export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)