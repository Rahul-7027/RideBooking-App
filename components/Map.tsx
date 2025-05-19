import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

const Map = () => {
  // const region={

  // }
  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_DEFAULT} style={styles.map}
        tintColor='black'
        mapType='mutedStandard'
        showsPointsOfInterest={false}
        showsUserLocation={true}
        userInterfaceStyle='light'
      />
      <Text>Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 288, // ~h-72
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5, // shadow on Android
    shadowColor: '#000', // shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    flex: 1,
  },
});

export default Map;
