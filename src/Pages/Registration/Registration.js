import { Button, Form, Input, Row, Col, message } from 'antd'
import React from 'react'
import DefaultLayout from '../../Components/DefaultLayout/DefaultLayout';
import './Registration.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Registration = () => {

    const dispatch = useDispatch()

    const onFinish = (values) => {
        axios.post('https://pos-application-yuj3.onrender.com/api/users/register', values).then((res) => {
            dispatch({ type: 'hideLoading' })
            message.success('Registration successfull , please wait for verification')
        }).catch(() => {
            dispatch({ type: 'hideLoading' })
            message.error('Something went wrong')
        })
    }


    return (
        <DefaultLayout>
            <div className='authentication'>
                <Row>
                    <Col lg={8} xs={22}>
                        <Form
                            layout="vertical" onFinish={onFinish}>
                            <h3>Create A user</h3>
                            <Form.Item name='name' label='* Name' >
                                <Input />
                            </Form.Item>
                            <Form.Item name='userId' label='* User Id' >
                                <Input />
                            </Form.Item>
                            <Form.Item name='password' label='* Password' >
                                <Input type='password' />
                            </Form.Item>

                            <div className='d-flex justify-content-end'>

                                <Button htmlType='submit' type='primary'>Register</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </DefaultLayout>
    )
}

export default Registration
