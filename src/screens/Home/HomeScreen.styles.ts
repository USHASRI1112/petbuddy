import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  headerSection: {
    flex: 0.1,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    margin: '3%',
    height: '7%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 22,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 4,
  },
  pawEmoji: {
    color: 'black',
    fontSize: 20,
  },
  bottomSection: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    alignSelf: 'flex-end',
    height: '20%',
  },
  image: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  addPet: {
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    gap: 10,
    alignItems: 'center',
  },
  addPetText: {
    color: 'white',
  },
  middleSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 20,
    margin: '2%',
  },
  petsDisplaySection: {
    flexDirection: 'column',
    alignContent: 'center',
    gap: 10,
  },
});
