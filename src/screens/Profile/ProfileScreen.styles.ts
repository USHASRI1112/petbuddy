import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.2,
    resizeMode: 'stretch',
  },
  subContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
    marginHorizontal: '15%',
    marginTop: '5%',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'gray',
    shadowOpacity: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  userName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailContact: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 15,
  },
  nameText: {
    color: 'black',
    fontWeight: '900',
    fontSize: 20,
  },
  signOutText: {
    color: 'red',
    fontSize: 14,
  },
  info: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
