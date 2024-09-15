import {View, Text} from 'react-native';
import React from 'react';
import {Snackbar} from 'react-native-paper';

type propsType = {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  onPress: () => void;
};

export default function SnackbarComponent({
  message,
  visible,
  onDismiss,
  onPress,
}: propsType) {
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={onDismiss}
        action={{
          label: 'Okay',
          onPress: onPress,
        }}>
        {message}
      </Snackbar>
    </View>
  );
}
