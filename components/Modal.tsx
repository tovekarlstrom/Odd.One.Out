import React, { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Theme';
import { StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface ModalProps {
  heading: string;
  children?: React.ReactNode;
  onClose?: () => void;
}
export function ModalComponent({ heading, children, onClose }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true);
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
      setIsOpen(false);
      if (onClose) onClose();
    });
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        if (onClose) onClose();
      }}
    >
      <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
        <ThemedView style={styles.modalView}>
          <ThemedView
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name='close' size={24} color={Colors.light.icon} />
            </TouchableOpacity>
          </ThemedView>
          <ThemedText type='heading32' style={styles.heading}>
            {heading}
          </ThemedText>
          {children}
        </ThemedView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,

    paddingVertical: 20,
    paddingHorizontal: 10,
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
