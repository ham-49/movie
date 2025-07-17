import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login'>
      <div className="login-content">
        <Form className='login-form'>
          <Form.Label className='login-title'>Login</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="id" placeholder="id" />
          </Form.Group>
          <Form.Group className="mb-3"  controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button type="submit" className='login-btn'>
            Login
          </Button>
        </Form>
        <div className="text-wrap">
          <h5>처음이신가요?</h5>
          <Link to="/" className='home-btn'>
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login