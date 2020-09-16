import React from "react";
import { StyleSheet, Dimensions, Platform, View } from "react-native";
import { Block, Input, Text, theme } from "galio-framework";
import { materialTheme } from "../constants/";
import { Switch, Icon } from "../components/";
import DropDownPicker from "react-native-dropdown-picker";
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
  { value: 4, label: "Rentas" },
];

export default class B1_NuevoIngreso extends React.Component {
  actions = [
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

  state = {
    "switch-1": false,
    "switch-2": false,
    "switch-3": false,
  };
  toggleSwitch = (switchId) =>
    this.setState({ [switchId]: !this.state[switchId] });

  renderSwitch = (titulo, id) => {
    return (
      <Block
        row
        style={[
          {
            height: 40,
            backgroundColor: "#FFFFFF",
            paddingTop: theme.SIZES.BASE * 0.5,
            paddingHorizontal: theme.SIZES.BASE,
          },
        ]}
      >
        <Block>
          <Text size={16}>{titulo}</Text>
        </Block>
        <Block flex style={[{ left: theme.SIZES.BASE }]}>
          <Switch
            value={this.state["switch-" + id]}
            onValueChange={() => this.toggleSwitch("switch-" + id)}
          />
        </Block>
      </Block>
    );
  };

  renderDropdown = (lista, texto) => {
    return (
      <DropDownPicker
        items={lista}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: "#FFFFFF" }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#FFFFFF" }}
        placeholder={texto}
        onChangeItem={(item) =>
          this.setState({
            seleccionado: item.value,
          })
        }
      />
    );
  };

  renderDinero = () => {
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

  renderInputBox = (tipo, texto) => {
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
  };

  renderCuotasRestantes = () => {
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

  render() {
    const { navigation } = this.props;
    return (
      <Block>
        <Block center>{this.renderDinero()}</Block>
        <Block>
          {this.renderDropdown(arrayCategoriasIngreso, "Categoría")}
          {this.renderSwitch("Periódico", 1)}
          {this.renderInputBox("numeric", "Día del mes")}
          {this.renderDropdown(arrayCuentas, "Destino de fondos")}
        </Block>
        <Block
          style={{ marginTop: 0.2 * height, marginBottom: theme.SIZES.BASE }}
        />
        <FloatingAction
          actions={this.actions}
          color={theme.COLORS.DEFAULT}
          onPressItem={(name) => {
            console.log("selected button: " + name);
          }}
        />
      </Block>
    );
  }
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
