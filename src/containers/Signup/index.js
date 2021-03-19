import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'

import { signup } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

export default function Signup () {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useSelector(state=> state.auth)
    const user = useSelector(state=> state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!user.loading){
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
        }
    }, [user.loading])

    const userSignup = (e) => {
        e.preventDefault()
        const user = {
            firstName, lastName, email, password
        }

        dispatch(signup(user))
    }

    if(auth.authenticate){
        return <Redirect to='/' />
    }

    if(user.loading){
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
                {user.message}
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset:3}}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input 
                                        label='First Name' placeholder='First name'
                                        type='text' value={firstName}
                                        onChange={(e)=>setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                <Input 
                                        label='Last Name' placeholder='Last name'
                                        type='text' value={lastName}
                                        onChange={(e)=>setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input 
                                label='Email' placeholder='Email'
                                type='text' value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <Input 
                                label='Password' placeholder='Password'
                                type='password' value={password}
                                onChange={(e)=>setPassword(e.target.value)}
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
