import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
import { userData } from "../Database/Database";

import { fakeprofile as miPerfil } from "../constants";
import { TouchableHighlight } from "react-native";
import { getTodo } from "../Database/SelectTables";

import { login } from "../external/UserAPI";



    

export default function B01_Perfil(props) {
  const [indicadorWIPE, setIndicadorWIPE] = useState(false);
  const [indicadorWIPR, setIndicadorWIPR] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  function successCallback(rowDB) {
    setNombre(rowDB.nombre);
    setApellido(rowDB.apellido);
  }

  useEffect(() => {
    getTodo("Usuarios", successCallback);
  }, []);

  function recuperarDatosNube (){
    setIndicadorWIPR(true);

  }


  function enviarDatosNube (){
    setIndicadorWIPE(true);

  }

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={miPerfil.avatar}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}
        >
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="black" size={28} style={{ paddingBottom: 8 }}>
                {nombre + " " + apellido}
              </Text>
              <Block row space="between">
                <Block row>
                  <Text color="white" size={16} muted style={styles.seller}>
                    {miPerfil.time}
                  </Text>
                  <Text size={16} color={materialTheme.COLORS.WARNING}>
                    <Icon name="shape-star" family="GalioExtra" size={14} />{" "}
                    {miPerfil.amount} administrados
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              style={styles.gradient}
            />
          </Block>
        </ImageBackground>

        <Block>
          <Block center>
            <Button
              style={styles.button}
              color={materialTheme.COLORS.INFO}
              onPress={() => {
                enviarDatosNube();
                alert("ok");
              }}
            >
              <Text>Enviar mis datos a la nube</Text>
              {indicadorWIPE? <ActivityIndicator /> : null}
            </Button>

            <Button
              style={styles.button}
              color={materialTheme.COLORS.LABEL}
              onPress={() => {
                recuperarDatosNube();
                alert("ok");
              }}
            >
              <Text>Recuperar datos de la nube</Text>
              {indicadorWIPR? <ActivityIndicator /> : null}
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
  },
});
