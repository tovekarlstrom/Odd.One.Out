import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

const getAdmin = async () => {
  const admin = await AsyncStorage.getItem('isAdmin');
  if (admin) {
    const parsedAdmin = JSON.parse(admin);
    if (parsedAdmin === true) {
      return parsedAdmin;
    } else {
      return false;
    }
  }
};

export const useIsAdmin = () => {
  return useQuery('isAdmin', getAdmin);
};
