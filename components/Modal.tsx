import React, { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Theme';
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

interface ModalProps {
  heading: string;
  children?: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}
export function ModalComponent({
  heading,
  children,
  onClose,
  showCloseButton,
}: ModalProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    flex: 1,
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
