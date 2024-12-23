import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  topSection: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  topHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  typesSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  selectedImage: {
    height: 60,
    width: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'forestgreen',
  },
  greenText: {
    color: 'green',
    marginTop: 8,
    fontWeight: 'bold',
  },
  bottomSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nearbyHeadingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  nearByHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  displaySection: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
