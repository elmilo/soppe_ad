import React, {useState} from 'react';
import { StyleSheet, Dimensions, Platform, View } from "react-native";
import { Block, Input, Text, theme } from "galio-framework";
import { materialTheme } from "../constants/";
import { Icon } from "../components/";
import SwitchPersonalizado from "../components/SwitchPersonalizado";
import ModalPersonalizado from '../components/ModalPersonalizado';
import { FloatingAction } from "react-native-floating-action";


const { height, width } = Dimensions.get("screen");


const arrayCuentas = [
  { value: 1, label: "Cuenta Bancaria ARS" },
  { value: 2, label: "Efectivo" },
  { value: 3, label: "Cuenta Bancaria ARS 2" },
  { value: 4, label: "Cuenta Bancaria USD" },
];

const arrayCategoriasIngreso = [
  { value: 1, label: "Sueldo" },
  { value: 2, label: "Venta" },
  { value: 3, label: "Otros conceptos" },
  { value: 4, label: "Aguinaldo" },
  { value: 5, label: "Rentas" },
];

export default function B1_NuevoIngreso(props){
  const { navigation } = props.navigation;
  const [isEnabled, setIsEnabled] = useState(false);
  const togglePeriodico = () => setIsEnabled(previousState => !previousState);
  const [cuenta, SetCuenta] = useState('');
  const [categoria, SetCategoria] = useState('');

  const actions = [
    {
      text: "Con recursividad",
      name: "bt_accessibility",
      position: 1,
    },
    {
      text: "Guardar",
      name: "bt_language",
      position: 1,
    },
  ];

  function SwitchPeriodico (){
    return (
      <SwitchPersonalizado
        titulo={"Periódico"}
        initialValue={isEnabled}
        toggle={togglePeriodico}
      />
    );
  };

  function DropdownCuentas (props){
    return (
      <ModalPersonalizado
      data={arrayCuentas}
      initValue="Destino de Fondos"
      value={cuenta}
      onChange={e => SetCuenta(e.target.value)}
      // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
      />
    );
  };

  function DropdownCategorias (props){
    return (
      <ModalPersonalizado
      data={arrayCategoriasIngreso}
      initValue="Categoría"
      value={categoria}
      onChange={e => SetCategoria(e.target.value)}
      // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
      />
    );
  };

  function Dinero (props){
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
  };

  function InputDia (props){
    return (
      <Block>
        <Input
          borderless
          bgColor="#FFFFFFFF"
          type="numeric"
          placeholder="Cuotas restantes"
          fontSize={16}
          placeholderTextColor={materialTheme.COLORS.DEFAULT}
          style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
        />
      </Block>
    );
  };

  function CuotasRestantes (props){
    return (
      <Block>
        <Input
          borderless
          bgColor="#FFFFFFFF"
          type="default"
          placeholder="Descripción"
          fontSize={16}
          placeholderTextColor={materialTheme.COLORS.DEFAULT}
          style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
        />
      </Block>
    );
  };

return (
      <Block>
        <Block center>
          <Dinero/>
        </Block>
        <Block>
          <DropdownCategorias/>
          <SwitchPeriodico/>
          <InputDia/>
          <DropdownCuentas/>
        </Block>
        <Block
          style={{ marginTop: 0.2 * height, marginBottom: theme.SIZES.BASE }}
        />
        <FloatingAction
          actions={actions}
          color={theme.COLORS.DEFAULT}
          onPressItem={(name) => {
            console.log("selected button: " + name);
          }}
        />
      </Block>
    );
}

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
