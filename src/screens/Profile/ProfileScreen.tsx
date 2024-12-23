import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import {AddPetModal} from '../../components/AddPetModal';
import {API_URL} from '../../../API';
import {requestPhotoLibraryPermission} from '../../components/Permissions';
import {styles} from './ProfileScreen.styles';
import {UserContext} from '../../Context/Context';

const Profile = ({navigation}: {navigation: any}) => {
  const userContext = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  if (!userContext) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  const {user, setUser} = userContext;
  if (!user) {
    return <Text>Something went wrong.</Text>;
  }
  const [photo, setPhoto] = useState(user.image_uri);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Hi, ${user.name}`,
    });
    setPhoto(user.image_uri);
  }, [navigation, user.name, user]);

  const updatePic = async (pic: string) => {
    try {
      const response = await fetch(`${API_URL}user/profile/${user.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({profile: pic}),
      });
      if (response.status === 200) {
        const user = await response.json();
        setUser(user);
        Alert.alert('Pic uploaded succesffully');
      }
    } catch (e) {
      Alert.alert(`Something went wrong`);
    }
  };
  const handleImage = async () => {
    try {
      if (await requestPhotoLibraryPermission()) {
        ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(async image => {
            const source = image.path;
            const base64Image = await RNFS.readFile(source, 'base64');
            setPhoto(`data:image/jpeg;base64,${base64Image}`);
            updatePic(`data:image/jpeg;base64,${base64Image}`);
          })
          .catch(error => {
            if (error.code === 'E_PICKER_CANCELLED') {
              console.log('User cancelled image picker');
            } else {
              console.log('Error: ', error.message);
            }
          });
      } else {
        Alert.alert('Permission Not Granted');
      }
    } catch (Error: any) {
      Alert.alert('Error');
    }
  };

  const handleSignOut = async () => {
    navigation.replace('Main');
    await AsyncStorage.setItem('loggedInUser', '');
  };

  const onHandleClose = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container} testID="profile-container">
      <TouchableOpacity testID="handle-image" onPress={() => handleImage()}>
        {user.image_uri ? (
          <Image
            testID="profile-image"
            style={styles.image}
            source={{uri: photo}}
          />
        ) : (
          <Image
            testID="profile-image2"
            style={styles.image}
            source={require('./../../../public/assets/Register/profile.png')}
          />
        )}
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <View style={styles.userName}>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text onPress={handleSignOut} style={styles.signOutText}>
            ↩ Sign Out
          </Text>
        </View>
        <View style={styles.emailContact}>
          <Text style={styles.info}>✉ {user.email}</Text>
          <Text style={styles.info}>📞 +91{user.contact}</Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.emailContact}>
          <TouchableOpacity>
            <Text
              style={styles.info}
              onPress={() => navigation.navigate('Home')}>
              🐾 My Pets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="add-pet-modal"
            onPress={() => setIsVisible(!isVisible)}>
            <Text style={styles.info}>🐾 Add Pet</Text>
          </TouchableOpacity>
        </View>
        <AddPetModal
          visible={isVisible}
          closeFn={onHandleClose}
          username={user.name}></AddPetModal>
      </View>
    </View>
  );
};

export default Profile;
