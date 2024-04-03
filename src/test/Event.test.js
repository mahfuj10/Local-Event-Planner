// Event.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Event from '../components/event/Event';

// Mock useSelector and useNavigate
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Event Component', () => {
  test('renders event list', () => {
    useSelector.mockReturnValue([{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }]);
    const { getByText } = render(<Event />);
    expect(getByText('Event 1')).toBeInTheDocument();
    expect(getByText('Event 2')).toBeInTheDocument();
  });

  test('renders "No event" message when event list is empty', () => {
    useSelector.mockReturnValue([]);
    const { getByText } = render(<Event />);
    expect(getByText('No event !!')).toBeInTheDocument();
  });

  test('redirects to create event page when "Create your event" button is clicked', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    const { getByText } = render(<Event />);
    fireEvent.click(getByText('Create your event !'));
    expect(navigateMock).toHaveBeenCalledWith('/create-event');
  });
});
