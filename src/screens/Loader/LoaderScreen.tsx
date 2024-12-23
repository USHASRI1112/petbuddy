import React from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './LoaderScreen.styles';

const Loader = () => {
  return (
    <ImageBackground testID="bg-image" style={styles.container} source={require('./../../../public/assets/Loading/loading.jpg')}/>
  );
};

export default Loader;