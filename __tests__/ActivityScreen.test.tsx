import {render, screen} from '@testing-library/react-native';
import Activity from '../src/screens/Activity/ActivityScreen';
import { Alert } from 'react-native';

global.fetch = jest.fn();
Alert.alert = jest.fn();

describe('Activity Component', () => {
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it('should render activities correctly', async () => {
        const mockActivities = [
            {
              title: 'Playtime at the park',
              date: '2024-11-18T00:00:00Z',
              startTime: '2024-11-18T08:00:00Z',
              endTime: '2024-11-18T09:30:00Z',
            },
            {
              title: 'Fetch exercise',
              date: '2024-11-18T00:00:00Z',
              startTime: '2024-11-18T10:00:00Z',
              endTime: '2024-11-18T11:00:00Z',
            },
          ];
      (global.fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockActivities),
        status: 200,
      })
       
  
      render(<Activity route={{ params: { pet: { name: 'Buddy' } } }} />);
  
      await screen.findByText('Playtime at the park');
      await screen.findByText('Fetch exercise');
      expect(screen.getByText('On 18 Nov 2024 - 1:30 PM - 3:00 PM')).toBeTruthy();
    });
    it('should handle empty activity list', () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve([]),
        status: 200,
      })
      render(<Activity route={{ params: { pet: { name: 'Buddy' } } }} />);
      expect(screen.getByText('No Activities found')).toBeTruthy();
    });

  });
