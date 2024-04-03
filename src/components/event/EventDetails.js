import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, selectEvent } from '../../store/event/eventSlice';
import Map from '../map/Map';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { selectUser } from '../../store/auth/authSlice';
import { AUTHENTICATION, HOME } from '../../utils/path';

export default function EventDetails() {
  const { id } = useParams();
  const eventList = useSelector(selectEvent);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if(eventList.length < 1) return <h1>No any event found..</h1>;

  const event = eventList.find(event => event.id === id);

  if(!event) return <h1>No any event found</h1>;

  const handleDeleteEvent = () => {
    if(!user?.email) return navigate(AUTHENTICATION);    
    dispatch(deleteEvent(id));
    navigate(HOME);
  };

  return (
    <div style={{ margin: 10 }}>
      <div>
        <h1 className='heading_title'>{event.title}</h1>

        <p>{event.description}</p>

        <Map location={event.location} />

        <Button
          type="dashed" 
          size='default' 
          style={{marginTop:20}}
          color='red'
          onClick={handleDeleteEvent}
          icon={<LogoutOutlined />} 
        >
            DELETE
        </Button>
      </div>
    </div>
  );
}
