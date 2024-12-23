import React, {useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {API_URL} from '../../../API';
import {styles} from './RegisterScreen.styles';

const Register = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');

  const register = async () => {
    try {
      if (password != confirmPassword) {
        Alert.alert('Pasword and confirm password mismatch');
        return;
      }
      const response = await fetch(`${API_URL}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
          address,
          about,
          email,
          contact,
          image_uri: '',
          pets: [],
        }),
      });
      if (response.status === 201) {
        navigation.replace('Loading');
        Alert.alert('Registration Success');
        setTimeout(() => {
          navigation.replace('Login');
        }, 1000);
      } else {
        Alert.alert('Registration failed');
      }
    } catch (error) {
      Alert.alert(`Error registering user: ${error}`);
    }
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
            source={require('../../../public/assets/Register/profile.png')}
            style={styles.pawImg}
          />
        </View>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.inputElement}
            testID="username-input"
            placeholder="User name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.inputElement}
            testID="password-input"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.inputElement}
            testID="confirm-password-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.inputElement}
            testID="email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.inputElement}
            testID="contact"
            placeholder="Contact"
            value={contact}
            onChangeText={setContact}
          />
          <TextInput
            style={styles.inputElement}
            testID="about-me"
            placeholder="About you"
            value={about}
            onChangeText={setAbout}
          />
          <TextInput
            style={styles.inputElement}
            testID="address"
            placeholder="Adress"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.loginSection}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => register()}>
            <Text style={styles.loginText}>REGISTER</Text>
          </TouchableOpacity>
          <Text
            style={styles.noAccountText}
            onPress={() => navigation.replace('Login')}>
            Already have an account? Login
          </Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.petBuddyTitle}>
          <Text style={styles.petText}>Pet</Text>
          <Text style={styles.buddyText}>Buddy!</Text>
        </View>
        <Text style={styles.rightsText}>
          ©️All Rights Reserved to PetBuddy - 2024
        </Text>
      </View>
    </View>
  );
};

export default Register;
