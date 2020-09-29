import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Block, Input, Text, theme } from "galio-framework";
import { materialTheme } from "../constants/";
import { Icon } from "../components/";
import SwitchPersonalizado from "../components/SwitchPersonalizado";
import ModalPersonalizado from "../components/ModalPersonalizado";
import { FloatingAction } from "react-native-floating-action";
import CamaraPersonalizada from "../components/CamaraPersonalizada";
import { getCompletoFormateado } from "../Database/SelectTables";
import { block } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

const arrayCuentas = [
  { key: 1, label: "Cuenta Bancaria ARS" },
  { key: 2, label: "Efectivo" },
  { key: 3, label: "Cuenta Bancaria ARS 2" },
  { key: 4, label: "Cuenta Bancaria USD" },
];

/*
const arrayCategorias = getCompletoFormateado('Categorias');
const arrayRubros = getCompletoFormateado('Rubros');
*/

export default function B1_NuevoEgreso(props) {
  const { navigation } = props.navigation;
  
  const [isPrimerGet, setIsPrimerGet] = useState(true);
  
  const [arrayCategorias, setArrayCategorias] = useState([]); 
  const [arrayRubros, setArrayRubros] = useState([]);

  const [isEnabledPeriodico, setIsEnabledPeriodico] = useState(false);
  const togglePeriodico = () =>
    setIsEnabledPeriodico((previousState) => !previousState);

  const [isEnabledParaSiempre, setIsEnabledParaSiempre] = useState(false);
  const toggleParaSiempre = () =>
    setIsEnabledParaSiempre((previousState) => !previousState);

    const [cuenta, SetCuenta] = useState("");
    const [categoria, SetCategoria] = useState("");
  
    function handleOnChangeCuenta(unaCuenta) {
      SetCuenta(unaCuenta);
    }
  
    function handleOnChangeCategoria(unaCategoria) {
      SetCategoria(unaCategoria);
    }


    function successArrayCategorias (rows){
      var datosFinales = [];
      rows.forEach((elemento) => {
        datosFinales.push({
          "key": $(elemento.id),
          "label": $(elemento.descripcion)
        });
      });
      setIsPrimerGet(false);
      setArrayCategorias(datosFinales);
    }

    function primerGet (){
      if (isPrimerGet){
        getCompletoFormateado('Categorias', successArrayCategorias);
        //getCompletoFormateado('Rubros');
      }
      
      return true;
    }
  /*const actions = [
    {
      text: "Con recursividad",
      name: "bt_accessibility",
      position: 1
    },
    {
      text: "Guardar",
      name: "bt_language",
      position: 1
    }
  ];*/

    function renderDropdown(lista, texto, handle) {
    return <ModalPersonalizado 
    data={lista} 
    initValue={texto}
    onSelected={handle}    
    />;
  }

  function renderDinero() {
    return (
      <Block style={{ height: 0.1 * height }}>
        <Input
          borderless
          bgColor="#00000000"
          type="numeric"
          placeholder="0.00"
          fontSize={40}
          placeholderTextColor={materialTheme.COLORS.DEFAULT}
          iconContent={
            <Icon
              size={50}
              color={theme.COLORS.ICON}
              name="attach-money"
              family="MaterialIcons"
            />
          }
          style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
        />
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </Block>
    );
  }

  function renderInputBox(tipo, texto) {
    return (
      <Block>
        <Input
          borderless
          bgColor="#FFFFFFFF"
          type={tipo}
          placeholder={texto}
          fontSize={16}
          placeholderTextColor={materialTheme.COLORS.DEFAULT}
          style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
        />
      </Block>
    );
  }

  function renderSwitchParaSiempre() {
    return (
      <SwitchPersonalizado
        titulo={"Para siempre"}
        initialValue={isEnabledParaSiempre}
        toggle={toggleParaSiempre}
      />
    );
  }

  return (
    <Block>
      {primerGet()}
      <Block center>{renderDinero()}</Block>
      <Block>
        {renderDropdown(arrayCategorias, "Categoría", handleOnChangeCategoria)}
        {renderInputBox("default", "Descripción")}
        {renderDropdown(arrayCuentas, "Origen de fondos", handleOnChangeCuenta)}
      </Block>
      <SwitchPersonalizado
        titulo={"Periódico mensual"}
        initialValue={isEnabledPeriodico}
        toggle={togglePeriodico}
      />
      {isEnabledPeriodico ? renderSwitchParaSiempre() : null}
      {isEnabledPeriodico && !isEnabledParaSiempre
        ? renderInputBox("numeric", "Cuotas restantes")
        : null}

      <Block>
        <CamaraPersonalizada />
      </Block>
      <Block
        style={{ marginTop: 0.2 * height, marginBottom: theme.SIZES.BASE }}
      />
    </Block>
  );
}

/*
         <FloatingAction
            actions={this.actions}
            color={theme.COLORS.DEFAULT}
            onPressItem={(name) => {
              console.log("selected button: " + name);
            }}
          />
          */

const styles = StyleSheet.create({
  components: {
    paddingVertical: theme.SIZES.BASE,
  },
  container: {
    backgroundColor: theme.COLORS.DEFAULT,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: "absolute",
    bottom:
      Platform.OS === "android" ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  inputBox: {
    paddingTop: theme.SIZES.BASE * 1.5,
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
    height: 22,
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});
