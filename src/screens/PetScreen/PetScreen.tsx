import React, {useLayoutEffect, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {requestCallPermission} from '../../components/Permissions';
import {styles} from './PetScreen.styles';
import {Track} from '../../components/TrackModal';

const PetScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {pet} = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const CustomBackButton = () => (
    <TouchableOpacity
      testID="back-button"
      onPress={() => navigation.goBack()}
      style={{
        padding: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        borderRadius: 50,
      }}>
      <Text style={{fontSize: 18, color: 'white'}}>{'<'}</Text>
    </TouchableOpacity>
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerStyle: {backgroundColor: 'transparent'},
      headerTitle: '',
      headerLeft: () => <CustomBackButton />,
    });
  }, [navigation]);
  const onHandleClose = () => {
    setIsVisible(false);
  };

  const makeCall = async () => {
    if (Platform.OS === 'ios') {
      Alert.alert('This feature is not available');
    } else {
      const hasPermission = await requestCallPermission();
      if (hasPermission) {
        const phoneNumber = `tel:+91${pet.emergencyContact}`;
        try {
          Linking.openURL(phoneNumber);
        } catch (e) {
          Alert.alert(
            'Error',
            'Unable to make a call. Please try again later.',
          );
        }
      } else {
        Alert.alert(
          'Permission Denied',
          'Please enable call permissions in your settings.',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {!pet.image_uri ? (
          <Image
            testID="no-dog-image"
            style={styles.dogImage}
            source={require('./../../../public/assets/Home/dog.jpg')}></Image>
        ) : (
          <Image
            testID="dog-image"
            style={styles.dogImage}
            source={{uri: pet.image_uri}}></Image>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.bottomSection}>
        <TouchableOpacity style={styles.topDisplay}>
          <Text style={styles.petName}>{pet.name}</Text>
          <View style={styles.gender}>
            <View>
              <Text style={styles.breed}>{pet.breed}</Text>
              <Text
                testID="phone-call"
                onPress={() => makeCall()}
                style={styles.phn}>
                +91{pet.emergencyContact}
              </Text>
            </View>
            <View testID="genderid" style={styles.genderDisplay}>
              <Text testID="gender-id">
                {pet.gender === 'Male' ? '♂' : '♀'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.about}>🐾About {pet.name}</Text>
          <View style={styles.petinfo}>
            <TouchableOpacity style={styles.info}>
              <Text>Age</Text>
              <Text style={styles.value}>{pet.age}y</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info}>
              <Text>Weight</Text>
              <Text style={styles.value}>{pet.weight}kg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info}>
              <Text>Height</Text>
              <Text style={styles.value}>{pet.height}cm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info}>
              <Text>Color</Text>
              <Text style={styles.value}>{pet.color}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.remark}>
          <Text style={styles.remarkText}>Remarks</Text>
          <Text>{pet.remarks}</Text>
        </View>
        <TouchableOpacity
          style={styles.gallery}
          onPress={() => navigation.navigate('Gallery', {pet})}>
          <Text style={styles.galleryText}>{'Gallery    >'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="track-button"
          style={styles.track}
          onPress={() => setIsVisible(!isVisible)}>
          <Text style={styles.trackText}>Track</Text>
        </TouchableOpacity>
      </ScrollView>
      <Track
        visible={isVisible}
        pet={pet}
        navigation={navigation}
        closeFn={onHandleClose}></Track>
    </View>
  );
};

export default PetScreen;
