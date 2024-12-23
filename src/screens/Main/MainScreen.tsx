import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './MainScreen.styles';

const Main = ({navigation}:{navigation:any}) => {
  return (
    <ImageBackground
      testID="image-background"
      source={require('../../../public/assets/Home/dog.jpg')}
      style={styles.container}
      >
      <View style={styles.bottomContainer}>
          <Text style={styles.welcomeHeading}>Hey! Welcome</Text>
          <Text style={styles.description}>While you sit and stay - we'll go out and play</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Login")}style={styles.getStartedButton}><Text style={styles.getStartedText}>Get Started</Text><Text  style={styles.getStartedText1}>➜</Text></TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Main;
