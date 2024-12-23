import React, { useContext, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../API';
import { UserContext } from '../../Context/Context';
import { styles } from './LoginScreen.styles';

const Login = ({navigation}: {navigation: any}) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  const {user, setUser} = userContext;

  const [name, setUserName] = useState('');
  const [password, setpassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, password}),
      });

      if (response.status === 200) {
        const user = await response.json();
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
        setUser(user);
        navigation.replace('Loading'); 

        setTimeout(() => {
          navigation.replace('Home'); 
        }, 1000);
      } else if (response.status === 404) {
        Alert.alert('User Details not found');
      } else {
        Alert.alert('Invalid Credentials');
      }
    } catch (e) {
      Alert.alert(`Something went wrong: ${e}`);
    }
    setUserName('');
    setpassword('');
  };
  return (
    <View style={styles.container}>
      <Image
        testID="top-image"
        source={require('../../../public/assets/Login/topbg.png')}
        style={styles.topImage}
      />
      <View style={styles.middleSection}>
        <View style={styles.imageAndTitle}>
          <Image
            testID="petbuddy-image"
            source={require('../../../public/assets/Login/paw.png')}
            style={styles.pawImg}
          />
          <View style={styles.petBuddyTitle}>
            <Text style={styles.petText}>Pet</Text>
            <Text style={styles.buddyText}>Buddy!</Text>
          </View>
        </View>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.inputElement}
            testID="username-input"
            value={name}
            onChangeText={text => setUserName(text)}
            placeholder="User name"
          />
          <TextInput
            style={styles.inputElement}
            value={password}
            testID="password-input"
            onChangeText={text => setpassword(text)}
            placeholder="Password"
          />
        </View>
        <View style={styles.loginSection}>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <Text
            style={styles.noAccountText}
            onPress={() => navigation.replace('Register')}>
            Don't have an account? Register
          </Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.rightsText}>
          ©️All Rights Reserved to PetBuddy - 2024
        </Text>
      </View>
    </View>
  );
};

export default Login;
