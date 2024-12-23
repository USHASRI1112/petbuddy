import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from 'react-native';
import {API_URL} from '../../../API';
import {styles} from './ActitvityScreen.styles';

const Activity = ({route}: {route: any}) => {
  const {pet} = route.params;
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${API_URL}pets/activities/${pet.name}`);
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        Alert.alert('Failed to fetch');
      }
    } catch (e) {
      Alert.alert(`Something Went Wrong`);
    }
  };
  useEffect(() => {
    fetchActivities();
  }, []);

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

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text testID="reminder-header" style={styles.reminderText}>
          ⏱ Activities
        </Text>
        {pet.image_uri ? (
          <Image
            testID="custom-image"
            style={styles.image}
            source={{uri: pet.image_uri}}
          />
        ) : (
          <Image
            testID="default-image"
            style={styles.image}
            source={require('./../../../public/assets/Login/paw.png')}
          />
        )}
      </View>
      <ScrollView style={styles.reminders}>
        {activities && activities.length > 0 ? (
          activities.map((activity: any, index: any) => (
            <View key={index} style={styles.reminderContent}>
              <View>
                <Text>🐾</Text>
              </View>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderTitle}>{activity.title}</Text>
                <Text>
                  {formatDate(activity.date)} -{' '}
                  {formatTimeRange(activity.startTime, activity.endTime)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.nodata}>
            <Text>No Activities found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Activity;
