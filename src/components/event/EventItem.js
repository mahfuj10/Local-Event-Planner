import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventItem({ event }) {
  const navigate = useNavigate();
  
  return (
    <div  className='event_item' onClick={() => navigate(`/event/${event.id}`)}>
      <h5>{event.title}</h5>

      <div style={{display:'flex', columnGap: 10}}>
        <small>
          <ClockCircleOutlined style={{marginRight:5}} />
          {event.time}
        </small>

        <small>
          <CalendarOutlined style={{marginRight:5}} />
          {event.date}
        </small>
      </div>
    </div>
  );
}
