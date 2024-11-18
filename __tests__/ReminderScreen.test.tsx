import {render} from '@testing-library/react-native';
import Reminders from '../src/screens/Reminders/ReminderScreen';

jest.mock('react-native-date-picker', () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue(null),
  };
});

global.fetch = jest.fn()
describe('Test for remidners page', () => {
  const mockRoute = {
    params: {
      pet: {
        name: 'Buddy',
        age: 3,
        weight: 15,
        height: 50,
        color: 'Brown',
        remarks: 'Friendly dog',
      },
    },
  };

  it('Should render reminder text', () => {
    const {getByTestId} = render(<Reminders route={mockRoute} />);
    expect(getByTestId('reminder-header')).toBeTruthy();
    expect(getByTestId('+-icon')).toBeTruthy();
  });

  it
});


import React from 'react';
import { fireEvent, waitFor, act} from '@testing-library/react-native';
import AddReminder from '../src/components/AddreminderModal';
import { API_URL } from '../API';

jest.mock('./../src/components/AddreminderModal', () =>
  jest.fn(() => null) 
);

describe('Reminders Component', () => {
  const mockPet = {
    name: 'Fluffy',
    image_uri: '',
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the header and basic UI elements', () => {
    const {getByTestId, getByText} = render(
      <Reminders route={{params: {pet: mockPet}}} />
    );

    expect(getByTestId('reminder-header').props.children).toBe('⏱ Reminders');
    expect(getByText('+')).toBeTruthy();
  });

  it('should fetch and display reminders', async () => {
    const mockReminders = [
      {
        title: 'Walk the dog',
        date: '2024-11-16T00:00:00Z',
        startTime: '2024-11-16T10:00:00Z',
        endTime: '2024-11-16T11:00:00Z',
        type: 'Daily',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => mockReminders,
    });
    const mockRoute = {
      params: {
        pet: {
          name: 'Buddy',
          age: 3,
          weight: 15,
          height: 50,
          color: 'Brown',
          remarks: 'Friendly dog',
        },
      },
    }
    const {getByText} = render(<Reminders route={mockRoute}  />);
 
    await waitFor(() => {
      expect(getByText('Walk the dog')).toBeTruthy();
      expect(getByText('On 16 Nov 2024 - 3:30 PM - 4:30 PM')).toBeTruthy();
    });
  });

  it('should display "No reminders found" when no reminders are fetched', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => [],
    });

    const {getByText} = render(<Reminders route={{params: {pet: mockPet}}} />);

    await waitFor(() => {
      expect(getByText('No reminders found: Try adding')).toBeTruthy();
    });
  });

  it('should toggle modal visibility when the "+" button is pressed', async () => {
    const {getByText, queryByTestId} = render(
      <Reminders route={{params: {pet: mockPet}}} />
    );
    expect(queryByTestId('modal')).toBeFalsy();
    fireEvent.press(getByText('+'));
    expect(AddReminder).toHaveBeenCalledWith(
      expect.objectContaining({visible: true}),
      {}
    );
  });


  it('should handle API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const {getByText} = render(<Reminders route={{params: {pet: mockPet}}} />);

    await waitFor(() => {
      expect(getByText('No reminders found: Try adding')).toBeTruthy();
    });
  });
});
