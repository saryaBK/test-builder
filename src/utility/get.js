import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocalStorage = async ({ key }) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {}
};
