import { Colors, Sizes } from '@/constants/Theme';
import { forwardRef } from 'react';
import { TextInput, StyleSheet, ReturnKeyTypeOptions } from 'react-native';

interface InputComponentProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  editable?: boolean;
}

export const InputComponent = forwardRef<TextInput, InputComponentProps>(
  (
    {
      placeholder,
      onChangeText,
      value,
      onSubmitEditing,
      returnKeyType,
      editable,
    },
    ref,
  ) => {
    return (
      <TextInput
        style={styles.input}
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
    );
  },
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.light.inputField,
    width: '100%',
    maxWidth: 285,
    height: 55,
    borderWidth: 0,
    paddingLeft: Sizes.Spacings.medium,
    paddingRight: Sizes.Spacings.medium,
    borderRadius: 30,
    margin: 'auto',
  },
});
