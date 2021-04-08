import React, { useState } from 'react'
import './Login.scss';
import FormInput from '../../components/FormInput/FormInput';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from '../../util/hooks';
import Loading from '../../components/Loading/Loading';
import { useAuth } from '../../context/auth';

const Login = ({history}) => {
    const { login } = useAuth();
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
        username: '',
        password: ''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            login(result.data.login)
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function loginUserCallBack(){
        console.log(values)
        loginUser();
    }

    return (
        <div className="login">
            {loading ? <Loading /> : 
            <form onSubmit={onSubmit} className="login__form">
                <h1>Log In</h1>
                <FormInput 
                    label="Username"
                    name="username"
                    value={values.username}
                    handleChange={onChange}/>
                <FormInput 
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    handleChange={onChange}/>
                <button>Log In</button>
            </form>}
            {Object.keys(errors).length > 0 && (
                <div className="login__errors">
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
    login( 
        username: $username password: $password
    )   {
            id 
            username 
            token 
            email 
            createdAt
        }
    }
`

export default Login
