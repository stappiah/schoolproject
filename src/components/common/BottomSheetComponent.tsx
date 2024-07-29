import React, {useRef} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

export default function BottomSheetComponent() {
  const sheetRef = useRef<BottomSheet>(null);

  return (
    <View style={styles.container}>
      <Button
        title="Open Bottom Sheet"
        onPress={() => sheetRef.current?.snapTo(0)}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={() => (
          <View>
            <Text>Hello</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 450,
  },
});
