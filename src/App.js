import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initAuthListener, selectLoading } from './store/auth/authSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/Authentication';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import './App.css';
import Navigation from './components/navigation/Navigation';
import EventDetails from './components/event/EventDetails';

function App() {

  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = initAuthListener(dispatch);
    return unsubscribe;
  },[]);


  if(loading){
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
