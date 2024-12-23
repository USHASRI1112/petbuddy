import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './TrainingTab.styles';

const Training = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={require('./../../../public/assets/Home/training.jpg')}
          style={styles.heroImage}
        />
        <Text style={styles.heroTitle}>Pet Training Essentials</Text>
        <Text style={styles.heroSubtitle}>
          Guidance and Tips to Shape Good Habits
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Commands</Text>
        <Text style={styles.sectionDescription}>
          Master commands like "Sit," "Stay," and "Come" with our simple guides.
        </Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            openLink('https://www.akc.org/expert-advice/training/')
          }>
          <Text style={styles.linkText}>Learn More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Behavior Training</Text>
        <Text style={styles.sectionDescription}>
          Handle barking, biting, and jumping with behavior modification
          techniques.
        </Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            openLink('https://www.aspca.org/pet-care/dog-care/dog-training')
          }>
          <Text style={styles.linkText}>Read More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Potty Training</Text>
        <Text style={styles.sectionDescription}>
          Get step-by-step guidance on potty training for both indoors and
          outdoors.
        </Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            openLink(
              'https://www.humanesociety.org/resources/how-housetrain-your-dog-or-puppy',
            )
          }>
          <Text style={styles.linkText}>Potty Training Guide</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Socialization Skills</Text>
        <Text style={styles.sectionDescription}>
          Learn how to introduce your pet to new environments, people, and other
          animals.
        </Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            openLink('https://www.cesarsway.com/socializing-your-dog')
          }>
          <Text style={styles.linkText}>Explore Socialization Techniques</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Training;
