import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { Colors } from './Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

type propsType = {
  value: string;
  setValue: (value: string) => void;
};

export default function RegionDropdown({ value, setValue }: propsType) {
  const REGION = [
    { label: 'Upper West Region', value: 'Upper West Region' },
    { label: 'Upper East Region', value: 'Upper East Region' },
    { label: 'North East Region', value: 'North East Region' },
    { label: 'Northern Region', value: 'Northern Region' },
    { label: 'Savannah Region', value: 'Savannah Region' },
    { label: 'Bono East Region', value: 'Bono East Region' },
    { label: 'Brong Ahafo Region', value: 'Brong Ahafo Region' },
    { label: 'Oti Region', value: 'Oti Region' },
    { label: 'Volta Region', value: 'Volta Region' },
    { label: 'Eastern Region', value: 'Eastern Region' },
    { label: 'Ashanti Region', value: 'Ashanti Region' },
    { label: 'Ahafo Region', value: 'Ahafo Region' },
    { label: 'Western North Region', value: 'Western North Region' },
    { label: 'Western Region', value: 'Western Region' },
    { label: 'Central Region', value: 'Central Region' },
    { label: 'Greater Accra Region', value: 'Greater Accra Region' },
  ];

  const [openModal, setOpenModal] = React.useState(false);

  return (
    <View>
      <Modal visible={openModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.container}>
              <FlatList
                data={REGION}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => {
                      setValue(item.value);
                      setOpenModal(false);
                    }}>
                    <Text style={{ color: Colors.gray, fontSize: 17 }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Pressable onPress={() => setOpenModal(true)} style={styles.input}>
        <View style={{ width: '95%', flexDirection: 'row' }}>
          <Icon name="location-pin" size={20} color={Colors.gray} />
          <Text style={{ color: Colors.gray, paddingLeft: 5 }}>
            {value ? value : 'Select Region'}
          </Text>
        </View>
        <Icon name="keyboard-arrow-down" size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 10,
    width: '80%',
    maxHeight: '60%',
    elevation: 20,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
