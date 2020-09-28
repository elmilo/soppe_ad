import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, ScrollView } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get('screen');
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Icon, Product, Header, Select } from '../components';
import ModalSelector from 'react-native-modal-selector';
import ModalPersonalizado from '../components/ModalPersonalizado';
import products from '../constants/products';
import { setPresupuesto} from "../Database/Database";

const arrayCategoriasIngreso = [
  { value: 1, label: "Luz" },
  { value: 2, label: "Gas" },
  { value: 3, label: "Aguas" },
  { value: 4, label: "Tv por Cable" },
  { value: 5, label: "Internet" },
  { value: 6, label: "Teléfono Fijo" },
  { value: 7, label: "Teléfono Movil" },
  { value: 8, label: "Otros" },
];

const arrayRubrosIngreso = [
  { value: 1, label: "Servicios" },
  { value: 2, label: "Impuestos" },
  { value: 3, label: "Salud" },
  { value: 4, label: "Viaticos" },
  { value: 5, label: "Comidas" },
  { value: 6, label: "Entretenimiento" },
  { value: 7, label: "Vacaciones" },
  { value: 8, label: "Otros" },

];


export default function G01_Presupuestos(props) {
  
  const [categoria, SetCategoria] = useState("");
  const [rubro, SetRubro] = useState("");
  const [valorMensual, setValorMensual] = useState(0.0);
  const [descripcion, setDescripcion] = useState("");

  const navigation = props.navigation;
  let index = 0;

  function handleOnChangeCategoria(unaCategoria) {
    SetCategoria(unaCategoria);
  }

  function handleOnChangeRubro(rubro) {
    SetRubro(rubro);
  }

  function savePresupuesto() {
    setPresupuesto(rubro, categoria,valorMensual,descripcion);
    navigation.navigate("Presupuestos");
  }
  

  function renderDropdown(lista, texto) {
    return <ModalPersonalizado data={lista} initValue={texto} />;
  }

  function DropdownCategorias(props) {
    return (
      <ModalPersonalizado
        data={arrayCategoriasIngreso}
        initValue="Seleccione una Categoria"
        value={categoria}
        onSelected={handleOnChangeCategoria}
      />
    );
  };

  function DropdownRubros(props) {
    return (
      <ModalPersonalizado
        data={arrayRubrosIngreso}
        initValue="Seleccione un Rubro"
        value={rubro}
        onSelected={handleOnChangeRubro}
      />
    );
  };
 
  return (
    <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Rubro</Text>
        <DropdownRubros />
        <Block />
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Categoria</Text>
        <DropdownCategorias />
        <Block />
        <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Valor Mensual</Text>
        <Block flex style={styles.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="$"
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
              onChangeText={(text) => {setValorMensual(text); }}
            />
          </Block>
        </Block>
        <Text></Text>
        <Block flex>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción</Text>
          <Block flex style={styles.group}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                right
                placeholder=""
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 1, borderColor: materialTheme.COLORS.INPUT }}
                onChangeText={(text) => {setDescripcion(text); }}
              />
            </Block>
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
            <Button shadowless color="success" style={[styles.button, styles.shadow]} onPress={() => {
                savePresupuesto();
              }}>
              +
            </Button>
          </Block>
          <Text></Text>
        </Block>
      </ScrollView>
    </Block>
  )
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
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
