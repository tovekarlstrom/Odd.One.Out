import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import content from '../public/content.json';

// Function to fetch the language from AsyncStorage
const fetchLanguage = async () => {
  const language = await AsyncStorage.getItem('language');
  return language || 'en';
};

// Function to set the language in AsyncStorage
const setLanguage = async (language: string) => {
  await AsyncStorage.setItem('language', language);
};

// Function to fetch content based on language
const fetchContent = async (language: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contentByLanguage: { [key: string]: any } = {
    en: content.english.content,
    se: content.swedish.content,
  };
  return contentByLanguage[language] || contentByLanguage['en'];
};

// Custom hook to manage language state and fetch content
export const useLanguage = () => {
  const queryClient = useQueryClient();

  // Fetch the current language
  const {
    data: language,
    isLoading: isLoadingLanguage,
    error: languageError,
  } = useQuery('language', fetchLanguage);

  // Fetch the content based on the current language
  const {
    data: content,
    isLoading: isLoadingContent,
    error: contentError,
  } = useQuery(['content', language], () => fetchContent(language || 'en'), {
    enabled: !!language, // Only run the query if language is available
    staleTime: Infinity, // Cache the content indefinitely
  });

  // Mutation to update the language
  const mutation = useMutation(setLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries('language');
      queryClient.invalidateQueries(['content', language]);
    },
  });

  const updateLanguage = (newLanguage: string) => {
    mutation.mutate(newLanguage);
  };

  return {
    language,
    content,
    isLoading: isLoadingLanguage || isLoadingContent,
    error: languageError || contentError,
    updateLanguage,
  };
};
