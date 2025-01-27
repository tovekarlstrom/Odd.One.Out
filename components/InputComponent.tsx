import { Colors, Sizes } from '@/constants/Theme';
import { forwardRef } from 'react';
import { TextInput, StyleSheet, ReturnKeyTypeOptions } from 'react-native';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface InputComponentProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  editable?: boolean;
  checks?: boolean;
}

export const InputComponent = forwardRef<TextInput, InputComponentProps>(
  (
    {
      placeholder,
      onChangeText,
      value,
      onSubmitEditing,
      returnKeyType,
      editable = true,
      checks,
    },
    ref,
  ) => {
    return (
      <ThemedView
        style={[
          styles.container,
          {
            backgroundColor: !editable
              ? Colors.light.background
              : Colors.light.inputField,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: !editable ? '#747474' : undefined,
            },
          ]}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={
            placeholder ? Colors.light.placeholder : Colors.light.text
          }
          ref={ref}
          onChangeText={onChangeText}
          value={value}
          returnKeyType={returnKeyType ? returnKeyType : 'done'} // Change the return key type to "done" on mobile keyboard
          onSubmitEditing={onSubmitEditing} // Call the addNewQusetion function when the user presses "done" on the keyboard
          editable={editable}
        />
        {(!editable || checks) && (
          <Ionicons
            name='checkmark-outline'
            size={24}
            color={Colors.light.placeholder}
            style={{ position: 'absolute', right: 20, top: 15 }}
          />
        )}
      </ThemedView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 285,
    height: 55,
    borderWidth: 0,
    borderRadius: 30,
    margin: 'auto',
  },
  input: {
    outline: 'none',
    paddingHorizontal: Sizes.Spacings.medium,
    borderRadius: 30,
    height: '100%',
    marginVertical: 'auto',
  },
});
