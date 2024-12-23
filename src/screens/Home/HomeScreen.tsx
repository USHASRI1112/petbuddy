import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AddPetModal} from '../../components/AddPetModal';
import {API_URL} from '../../../API';
import {Pet} from '../../components/PetTile';
import {styles} from './HomeScreen.styles';
import {UserContext} from '../../Context/Context';

const Home = ({navigation}: {navigation: any}) => {
  const [pets, setPets] = useState([]);
  const userContext = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  if (!userContext) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  const {user} = userContext;
  if (!user) {
    return <Text>Something went wrong.</Text>;
  }
  const onHandleClose = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_URL}pets/${user.name}`);
        if (response.status === 200) {
          const data = await response.json();
          setPets(data);
        }
      } catch (e) {
        throw new Error(`${e}`);
      }
    };
    fetchPets();
  }, [user, onHandleClose]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <Text style={styles.headerName}>{user.name}</Text>,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('./../../../public/assets/Register/profile2.png')}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.pawEmoji}>🐾</Text>
        <Text style={styles.headerText}>My Pets</Text>
      </View>
      <View style={styles.middleSection}>
        <View></View>
        {pets.length === 0 ? (
          <View>
            <Text>No pets found</Text>
          </View>
        ) : (
          <ScrollView style={styles.petsDisplaySection}>
            {pets.map((pet, index) => (
              <Pet pet={pet} key={index} navigation={navigation} />
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.addPet}>
          <Image
            style={styles.image}
            source={require('../../../public/assets/Login/paw.png')}
          />
          <Text
            style={styles.addPetText}
            onPress={() => setIsVisible(!isVisible)}>
            Add Pet
          </Text>
        </TouchableOpacity>
      </View>
      <AddPetModal
        visible={isVisible}
        closeFn={onHandleClose}
        username={user.name}
      />
    </View>
  );
};

export default Home;
