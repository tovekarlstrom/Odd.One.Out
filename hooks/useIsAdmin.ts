import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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

const setIsAdmin = async (isAdmin: boolean) => {
  await AsyncStorage.setItem('isAdmin', JSON.stringify(isAdmin));
};

export const useIsAdmin = () => {
  const queryClient = useQueryClient();

  const { data: isAdmin, isLoading, error } = useQuery('isAdmin', getAdmin);

  const mutation = useMutation(setIsAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries('isAdmin');
    },
  });

  const updateIsAdmin = (newIsAdmin: boolean) => {
    mutation.mutate(newIsAdmin);
  };

  return { isAdmin, isLoading, error, updateIsAdmin };
};
