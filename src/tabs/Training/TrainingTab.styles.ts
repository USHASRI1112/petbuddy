import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E0F2E9',
    borderRadius: 10,
    flexDirection: 'column',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionDescription: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  linkButton: {
    marginTop: 10,
    backgroundColor: 'forestgreen',
    paddingVertical: 8,
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
