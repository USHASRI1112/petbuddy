import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import {API_URL} from '../../../API';
import {requestPhotoLibraryPermission} from '../../components/Permissions';
import {styles} from './GalleryScreen.styles';

const GalleryScreen = ({route}: {route: any}) => {
  const {pet} = route.params;
  const [photo, setPhoto] = useState('');
  const [gallery, setGallery] = useState([]);

  const updatePic = async (path: string) => {
    try {
      const response = await fetch(`${API_URL}pets/gallery/${pet.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({path: path}),
      });
      console.log(response);
      if (response.status === 200) {
        Alert.alert('Pic uploaded succesffully');
        fetchImages();
      } else {
        Alert.alert('Something went wrong, Try again later');
      }
    } catch (e) {
      Alert.alert(`${e}`);
    }
  };

  const fetchImages = async () => {
    try {
      const resposne = await fetch(`${API_URL}pets/gallery/${pet.name}`);
      if (resposne.ok) {
        const data = await resposne.json();
        setGallery(data);
      }
    } catch (e: any) {
      console.log(`Error fetching images:${e}`);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
    } catch (Error: any) {}
  };

  const renderImage = ({item}: {item: string}) => (
    <Image testID="gallery-image" style={styles.image} source={{uri: item}} />
  );

  return (
    <View style={styles.container}>
      {gallery && gallery.length > 0 ? (
        <FlatList
          data={gallery}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.imageContainer}
        />
      ) : (
        <Text>No Images Found. Please Add</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => handleImage()}>
        <Text style={styles.buttonText}>Add Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GalleryScreen;
