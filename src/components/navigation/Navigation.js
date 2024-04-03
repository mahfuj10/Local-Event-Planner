import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  selectUser, signOut } from '../../store/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
 
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut =  () => {
    dispatch(signOut());
  };
 
  return (
    <div className='navigation'>
      <Link to="/home">Home</Link>

      {
        user?.email
          ?
          <div>
            {
              user.photoURL 
                ?  
                <Avatar title={user.name} src={user.photoURL} style={{ verticalAlign: 'middle' }} size="medium" />
                :
                <Avatar title={user.name} style={{ verticalAlign: 'middle' }} size="medium" >
                  {user.name?.slice(0,1)}
                </Avatar>
            }

            <Button
              onClick={handleSignOut} 
              type="dashed" 
              size='default' 
              icon={<LogoutOutlined />} 
              style={{marginLeft:10}}
            >
              Sign Out
            </Button>
          </div>
          :
          <Button
            onClick={() => navigate('/authentication')} 
            type="dashed" 
            size='default' 
            icon={<LogoutOutlined />} 
          >
            Sign In
          </Button>
      }


    </div>
  );
}
