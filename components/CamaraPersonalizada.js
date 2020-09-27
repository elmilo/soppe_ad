import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet,Dimensions} from 'react-native';
import { Block, Button, theme } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import { materialTheme } from '../constants';
const { width } = Dimensions.get("screen");

export default function CamaraPersonalizada() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('No le diste permiso a la app para esto!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //<Button title="Elegí una imagen para tu comprobante" onPress={pickImage} />

  return (
    <Block>
      <Button  shadowless color="success" style={[styles.button]} 
           onPress={pickImage}
          >    
          Elegí una imagen para tu comprobante  
          </Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </Block>
  );
}

const styles = StyleSheet.create({
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 2,
    height: 22
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});