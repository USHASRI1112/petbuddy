import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    backgroundColor: 'white',
  },
  topImage: {
    resizeMode: 'stretch',
    height: 100,
    width: '100%',
  },
  pawImg: {
    borderRadius: 50,
    height: 90,
    width: 90,
  },
  middleSection: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: 40,
  },
  petText: {
    color: 'forestgreen',
    fontWeight: 'bold',
    fontSize: 25,
  },
  buddyText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  petBuddyTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageAndTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  inputElement: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 60,
    borderRadius: 10,
  },
  inputSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },
  loginButton: {
    backgroundColor: 'forestgreen',
    padding: 10,
    marginHorizontal: 80,
    borderRadius: 10,
  },
  loginSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noAccountText: {
    color: 'green',
    textAlign: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightsText: {
    color: 'white',
    backgroundColor: 'green',
    paddingVertical: 20,
    width: 500,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
