import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';

type propsType = {
  value: string;
  setValue: (value: string) => void;
};

export default function RegionDropdown({value, setValue}: propsType) {
  const colorScheme = useColorScheme();
  
  const REGION = [
    {label: 'Upper West Region', value: 'Upper West Region'},
    {label: 'Upper East Region', value: 'Upper East Region'},
    {label: 'North East Region', value: 'North East Region'},
    {label: 'Northern Region', value: 'Northern Region'},
    {label: 'Savannah Region', value: 'Savannah Region'},
    {label: 'Bono East Region', value: 'Bono East Region'},
    {label: 'Brong Ahafo Region', value: 'Brong Ahafo Region'},
    {label: 'Oti Region', value: 'Oti Region'},
    {label: 'Volta Region', value: 'Volta Region'},
    {label: 'Eastern Region', value: 'Eastern Region'},
    {label: 'Ashanti Region', value: 'Ashanti Region'},
    {label: 'Ahafo Region', value: 'Ahafo Region'},
    {label: 'Western North Region', value: 'Western North Region'},
    {label: 'Western Region', value: 'Western Region'},
    {label: 'Central Region', value: 'Central Region'},
    {label: 'Greater Accra Region', value: 'Greater Accra Region'},
  ];

  const [openModal, setOpenModal] = React.useState(false);

  return (
    <View>
      <View style={styles.picker}>
        <Picker
        style={{color: Colors.gray}}
          selectedValue={value}
          onValueChange={itemValue => setValue(itemValue)}>
          <Picker.Item
            label={'Select region'}
            value={''}
            style={{color: Colors.gray}}
          />
          {REGION.map((item, index) => (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={index}
              style={{
                color: colorScheme === 'dark' ? Colors.white : Colors.black,
              }}
            />
          ))}
        </Picker>
      </View>
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
  picker: {
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginHorizontal: 5,
    height: 44,
    justifyContent: 'center',
    alignContent: 'center',
  },
  pickerText: {
    color: Colors.white,
  },
});
