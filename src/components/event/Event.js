import React from 'react';
import { useSelector } from 'react-redux';
import { selectEvent } from '../../store/event/eventSlice';
import EventItem from './EventItem';
import { PlusOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import IMAGE from '../../assets/img/_5159f6f9-0f60-42a4-a3e7-b90e944c4a45.jpg';
import { useNavigate } from 'react-router-dom';

export default function Event() {

  const eventList = useSelector(selectEvent);
  const navigate = useNavigate();

  const redirect = (path) => {
    navigate(path);
  };
  
  return (
    <div className='event_container'>
      <div>
        <h1 className='heading_title'>Explore event !</h1>
        <div style={{display:'flex', gap:20}}>
          { eventList.length < 1 && <h3 className='heading_title'>No event !!</h3> }
          {
            eventList.map(event => <EventItem key={event.id} event={event} />)
          }
        </div>
      </div>

      <div style={{ marginTop:'5%' }}>
        <h1 className='heading_title'>Create your event !</h1>

        <div
          className='event_item' 
          style={{ height: 40 }} 
          onClick={() => redirect('/create-event')}
        >
          <Row justify="center" align="middle" >
            <PlusOutlined size='large' />
          </Row>
        </div>
      </div>
    </div>
  );
}
