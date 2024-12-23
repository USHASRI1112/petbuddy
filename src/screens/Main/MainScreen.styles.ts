import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 80,
  },
  welcomeHeading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  description: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: 'forestgreen',
    borderRadius: 10,
    padding: 10,
    width: 250,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  getStartedText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  getStartedText1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    color: 'white',
    fontWeight: 'bold',
  },
});
