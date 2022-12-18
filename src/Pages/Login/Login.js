import { Button, Col, Form, Input, message, Row } from 'antd'
import React, { useEffect } from 'react'
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();


  const onFinish = (values) => {
    console.log(values)
    dispatch({ type: 'showLoading' })

    axios.post('https://pos-application-yuj3.onrender.com/api/users/login', values).then((res) => {
      dispatch({ type: 'hideLoading' })
      message.success('login Success')
      localStorage.setItem('pos-user', JSON.stringify(res.data));
      navigate('/home')
    }).catch(() => {
      dispatch({ type: 'hideLoading' })
      message.error('Something went wrong')
    })


  }

  useEffect(() => {
    if (localStorage.getItem('pos-user')) {
      navigate('/home')
    }
  }, [])




  return (
    <div className='auth-login'>
      <Row>
        <Col lg={8} xs={22}>
          <Form
            layout="vertical" onFinish={onFinish}>
            <h1>Point of Sales !!</h1>
            <hr></hr>
            <h3>Login User </h3>

            <Form.Item name='userId' label='* User Id' >
              <Input />
            </Form.Item>
            <Form.Item name='password' label='* Password' >
              <Input type='password' />
            </Form.Item>

            <div className='d-flex justify-content-end'>

              <Button htmlType='submit' type='primary'>Login </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
