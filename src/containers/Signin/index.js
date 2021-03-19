import React, { useState } from 'react'
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { login } from '../../actions'

export default function Signin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] =useState('')
    const auth = useSelector(state=> state.auth)

    const dispatch = useDispatch()

    const userLogin = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        dispatch(login(user))
    }

    if(auth.authenticate){
        return <Redirect to='/' />
    }

    if(auth.authenticating){
        return (
            <>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
            </>
            )
    }

    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset:3}}>
                        <Form onSubmit={userLogin}>
                            <Input 
                                label='Email' placeholder='Email' type='text' 
                                onChange={(e)=>setEmail(e.target.value)} value={email}
                            />
                            <Input 
                                label='Password' placeholder='Password'
                                type='password' onChange={(e)=>setPassword(e.target.value)} 
                                value={password}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
