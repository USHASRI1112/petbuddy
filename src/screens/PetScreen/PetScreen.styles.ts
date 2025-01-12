import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:10
  },
  dogImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.2,
    resizeMode: 'stretch',
  },
  topSection: {
    flex: 1,
  },
  bottomSection: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  topDisplay: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 5,
    padding: 10,
    marginHorizontal: '10%',
    borderRadius: 10,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  breed: {
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  phn: {
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  about: {
    marginLeft: '5%',
    fontWeight: 'bold',
    fontSize: 20,
  },
  info: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'gray',
    shadowOpacity: 1,
    justifyContent: 'center',
  },
  petinfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '3%',
  },
  value: {
    fontWeight: '900',
    textAlign: 'center',
    color: '#054B1D',
  },
  remark: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginTop: 10,
    justifyContent: 'flex-start',
    gap: 5,
  },
  remarkText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  gallery: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginRight: '70%',
    marginTop: 10,
    justifyContent: 'flex-start',
    gap: 5,
    padding: 10,
    backgroundColor: 'forestgreen',
    borderRadius: 10,
  },
  galleryText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  track: {
    backgroundColor: 'green',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  trackText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderDisplay: {
    color: 'white',
    backgroundColor: 'pink',
    borderRadius: 10,
    fontSize: 20,
    alignSelf: 'center',
    padding: 8,
  },
});
