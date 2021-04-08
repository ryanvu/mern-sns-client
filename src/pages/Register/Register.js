import React, { useState } from 'react'
import FormInput from '../../components/FormInput/FormInput';
import './Register.scss';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import Loading from '../../components/Loading/Loading';
import { useAuth } from '../../context/auth';

import { useForm } from '../../util/hooks';

const Register = ({history}) => {
    const { login } = useAuth();

    const [password, showPassword] = useState(false);
    const [errors, setErrors] = useState({});

    
    // const toggleShowPassword = () => {
    //     showPassword(prev => !prev)
    // }

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword:''
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register: userData }}){
            login(userData);
            history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })



    function registerUser(){
        addUser();
    }
    
    return (
        <div className="register">
            {loading ? <Loading /> :
            <form className="register__form" onSubmit={onSubmit}>
                <h1>Register</h1>
                <FormInput 
                label="Username"
                name="username"
                value={values.username}
                handleChange={onChange}/>
                <FormInput 
                label="Email"
                name="email"
                type="email"
                value={values.email}
                handleChange={onChange}/>
                <FormInput 
                label="Password"
                name="password"
                type={password ? "text" : "password"}
                value={values.password}
                handleChange={onChange}/>
                <FormInput 
                label="Confirm Password"
                name="confirmPassword"
                type={password ? "text" : "password"}
                value={values.confirmPassword}
                handleChange={onChange}/>
                <button type="submit">Submit</button>
            </form>}
            {Object.keys(errors).length > 0 && (
                <div className="register__errors">
                    <ul>
                        {Object.values(errors).map(value => {
                            return <li key={value}>{value}</li>
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register
