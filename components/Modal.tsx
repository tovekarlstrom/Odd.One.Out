import React, { useEffect, useRef } from 'react';
import { Colors, Sizes } from '@/constants/Theme';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Pressable,
} from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { ButtonComponent } from './ButtonComponent';
import { useLanguage } from '@/hooks/useLanguage';

interface ModalProps {
  heading: string;
  description?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onContinue?: () => void;
  showCloseButton?: boolean;
  oneButton?: boolean;
  twoButtons?: boolean;
}
export function ModalComponent({
  heading,
  description,
  children,
  onClose,
  onContinue,
  showCloseButton,
  oneButton,
  twoButtons,
}: ModalProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { content, isLoading, error } = useLanguage();

  const buttons = content?.buttons;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  if (isLoading || error) return null;

  return (
    <Modal animationType='fade' transparent={true}>
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
          <ThemedView style={styles.modalView}>
            {showCloseButton && (
              <ThemedView style={styles.closeButton}>
                <TouchableOpacity onPress={handleClose}>
                  <Ionicons name='close' size={30} color={Colors.light.icon} />
                </TouchableOpacity>
              </ThemedView>
            )}
            <ThemedText type='heading32' style={styles.heading}>
              {heading}
            </ThemedText>
            {description && (
              <ThemedText type='default' style={{ padding: 15 }}>
                {description}
              </ThemedText>
            )}
            {oneButton && (
              <ButtonComponent
                text={buttons.ok}
                variant='primary'
                onSubmit={handleClose}
              />
            )}
            {twoButtons && (
              <ThemedView style={styles.buttonContainer}>
                <ButtonComponent
                  text={buttons.yes}
                  variant='primary'
                  onSubmit={() => {
                    if (onContinue) {
                      handleClose();
                      onContinue();
                    }
                  }}
                />
                <ButtonComponent
                  text={buttons.cancel}
                  variant='secondary'
                  onSubmit={handleClose}
                />
              </ThemedView>
            )}
            {children}
          </ThemedView>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: Sizes.Widths.medium,
    width: '100%',
  },
  modalView: {
    position: 'relative',
    width: '90%',
    borderRadius: 30,
    backgroundColor: Colors.light.Card,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  buttonContainer: {
    gap: Sizes.Spacings.medium,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
