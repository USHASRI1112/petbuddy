import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { API_URL } from '../../../API';
import {AddReminder} from '../../components/AddreminderModal';
import { styles } from './ReminderScreen.styles';

const Reminders = ({route}: {route: any}) => {
  const {pet} = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [current, setCurrent] = useState<'Daily' | 'Weekly' | 'Monthly'>(
    'Daily',
  );
  const onHandleClose = () => {
    setIsVisible(false);
  };

  function formatDate(dateString: any): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear();
    return `On ${day} ${month} ${year}`;
  }

  function formatTimeRange(startTimeString: any, endTimeString: any): string {
    const formatTime = (dateString: string) => {
      const date = new Date(dateString);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;

      return formattedTime;
    };

    return `${formatTime(startTimeString)} - ${formatTime(endTimeString)}`;
  }

  const fetchReminders = async () => {
    try {
      const response = await fetch(`${API_URL}pets/reminders/${pet.name}`);
      if (response.status === 200) {
        const data = await response.json();
        const finaldata = data.filter((item: any) => item.type === current);
        setReminders(finaldata);
      }
    } catch (e) {
      console.log('Error fetching data');
    }
  };
  useEffect(() => {
    fetchReminders();
  }, [current, onHandleClose]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text testID="reminder-header" style={styles.reminderText}>
          ⏱ Reminders
        </Text>
        {pet.image_uri ? (
          <Image style={styles.image} source={{uri: pet.image_uri}} />
        ) : (
          <Image
            style={styles.image}
            source={require('./../../../public/assets/Login/paw.png')}
          />
        )}
      </View>
      <View style={styles.typesDisplay}>
        <TouchableOpacity
          testID="daily-type"
          style={current === 'Daily' ? styles.selectedType : styles.type}
          onPress={() => setCurrent('Daily')}>
          <Text>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="weekly-type"
          style={current === 'Weekly' ? styles.selectedType : styles.type}
          onPress={() => setCurrent('Weekly')}>
          <Text>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="monthly-type"
          style={current === 'Monthly' ? styles.selectedType : styles.type}
          onPress={() => setCurrent('Monthly')}>
          <Text>Monthly</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.reminders}>
        {reminders && reminders.length > 0 ? (
          reminders.map((reminder: any, index: any) => (
            <View key={index} style={styles.reminderContent}>
              <View>
                <Text>🐾</Text>
              </View>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <Text>
                  {formatDate(reminder.date)} -{' '}
                  {formatTimeRange(reminder.startTime, reminder.endTime)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.nodata}>
            <Text>No reminders found: Try adding</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.bottomSection}>
        <Text
          onPress={() => setIsVisible(!isVisible)}
          testID="+-icon"
          style={styles.add}>
          +
        </Text>
      </TouchableOpacity>
      <AddReminder visible={isVisible} closeFn={onHandleClose} pet={pet} />
    </View>
  );
};

export default Reminders;
