import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Authentication() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
    navigate('/home');
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>

      <Button 
        onClick={handleSignInWithGoogle} 
        type="dashed" 
        size='default' 
        icon={<GoogleOutlined />} 
      >
            Join with Google
      </Button>
    </Row>
  );
}
