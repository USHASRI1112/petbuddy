import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reminderText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
  add: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
  },
  bottomSection: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  image: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  typesDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  type: {
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
  },
  reminders: {
    marginHorizontal: '4%',
    marginVertical: '5%',
  },
  reminderContent: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  nodata: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },
  reminderTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectedType: {
    padding: 10,
    backgroundColor: 'forestgreen',
    borderRadius: 10,
  },
});
