import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
    margin: 10,
    borderRadius: 10,
  },
  scroll: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 20,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'forestgreen',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
