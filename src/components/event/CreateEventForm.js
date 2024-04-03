import React, { useState } from 'react';
import { Input, Row, Col, TimePicker, DatePicker, Button } from 'antd';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { add } from '../../store/event/eventSlice';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';

const { TextArea } = Input;

export default function CreateEventForm() {
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleTimeChange = (time, timeString) => {
    console.log('Selected Time: ', time, 'Formatted Time: ', timeString);
    setTime(timeString);
  };

  const handleDateChange = (date, dateString) => {
    console.log('Selected Date: ', date, 'Formatted Date: ', dateString);
    setDate(dateString);
  };

  const getLatAndLon = debounce(async(location) => {
    try{
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;
      if(!location?.trim())return;

      setIsLoading(true);
      setError('');
      
      const response = await fetch(url);
      const data = await response.json();
    
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const long = parseFloat(data[0].lon);
        setLocation({
          location,
          lat,
          long
        });
      } else {
        console.error('Location not found.');
        setError('Location not found.');
      }
    }catch(err){
      console.log('Error: error in location fetch');
      setError(err?.message);
    }
    setIsLoading(false);
  }, 1500); //


   

  const handleAddEvent = () => {
    if(!title || !description || !location?.lat || !time || !date) return;
    
    const event = {
      title,
      description,
      location,
      time,
      date,
      id: uuidv4()
    };

    dispatch(add(event));
    alert('Event creatd.');
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col 
        xs={20} sm={15} md={13} lg={8} xl={6} 
        style={{display:'flex', flexDirection:'column', rowGap:20}}
      >
        <Input 
          onChange={e => setTitle(e.target.value)} 
          width="100%"
          size="medium"
          placeholder="Title*"
        />
          
        <div style={{display:'flex', columnGap:40}}>
          <TimePicker
            onChange={handleTimeChange}
            format="HH:mm"
            placeholder="Select time*"
          />

          <DatePicker
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            placeholder="Select date*"
          />
        </div>
          
        <div>
          <Input 
            onChange={e => getLatAndLon(e.target.value)} 
            width="100%"
            size="medium" 
            placeholder="Location*"
          />
         
          { 
            isLoading && <Spin /> 
          }
         
          { 
            error && <small>{error}</small>
          }
        </div>
          
        <TextArea 
          onChange={e => setDescription(e.target.value)} 
          rows={3}
          placeholder="Description*" 
        />
          
        <Button
          type="dashed" 
          size='default' 
          onClick={handleAddEvent}
          style={{ color:'#ada9a9', fontWeight:500 }}
        >
            Create Event
        </Button>

      </Col>
    </Row>
  );
}
