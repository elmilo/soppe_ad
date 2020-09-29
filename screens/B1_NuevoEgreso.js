import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Block, Input, Text, theme } from "galio-framework";
import { materialTheme } from "../constants/";
import { Icon } from "../components/";
import SwitchPersonalizado from "../components/SwitchPersonalizado";
import ModalPersonalizado from "../components/ModalPersonalizado";
import { FloatingAction } from "react-native-floating-action";
import CamaraPersonalizada from "../components/CamaraPersonalizada";
import { getCompletoFormateado } from "../Database/SelectTables";
import { getCuentas, getTarjetas } from "../Database/Database";

import { block, concat } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

const arrayMediosDePago = [
  { value: "1Consumo", label: "Consumo Cuenta" },
  { value: "2TC", label: "Tarjeta de crédito" },
];

/*
CREATE TABLE IF NOT EXISTS `mydb`.`Egresos` (
  `id` INT NOT NULL,
  `user_id` INT NULL,
  `cuenta_id` INT NULL,
  `rubro_id` INT NULL,
  `categoria_id` INT NULL,
  `medio_de_pago` VARCHAR(45) NULL,
  `monto` DECIMAL NULL,
  `cuotas_fechas` INT NULL,
  `cuotas_restantes` INT NULL,
  `id_externa` INT NULL,
  `tabla_externa` VARCHAR(45) NULL,
  `descripcion` VARCHAR(128) NULL,
  `auto_manual` VARCHAR(45) NULL,
  `add_dttm` DATETIME NULL,
*/
/*
const arrayCategorias = getCompletoFormateado('Categorias');
const arrayRubros = getCompletoFormateado('Rubros');
*/

export default function B1_NuevoEgreso(props) {
  /********************************* */
  const [user_id, setUser_id] = useState(1);
  const [cuenta, setCuenta] = useState("");
  const [rubro, setRubro] = useState("");
  const [categoria, SetCategoria] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [medio_de_pago, setMedio_de_pago] = useState("");
  const [monto, setMonto] = useState("");
  const [cuotas_fechas, setCuotas_fechas] = useState("");
  const [cuotas_restantes, setCuotas_restantes] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [auto_manual, setAuto_manual] = useState("");
  const [add_dttm, setAdd_dttm] = useState("");

  function handleOnChangeMedioDePago(medioDePago) {
    
    console.log('Medio de pago: ' + medioDePago);

    const id_usuario = 1;

    if (medioDePago == "Consumo Cuenta") {
      getCuentas(id_usuario, successArrayCuentas);
      setMedio_de_pago("Consumo Cuenta");
      setTarjeta(null);
    }
    if (medioDePago == "Tarjeta de crédito") {
      getTarjetas(id_usuario, successArrayTarjetas);
      setMedio_de_pago("Tarjeta de crédito");
      setCuenta(null);
    }

    return true;
  }

  const [arrayTarjetas, setArrayTarjetas] = useState([]);
  const [arrayCuentas, setArrayCuentas] = useState([]);

  /**************************************/
  const { navigation } = props.navigation;

  const [arrayCategorias, setArrayCategorias] = useState([]);
  const [arrayRubros, setArrayRubros] = useState([]);

  const [isEnabledPeriodico, setIsEnabledPeriodico] = useState(false);
  const togglePeriodico = () =>
    setIsEnabledPeriodico((previousState) => !previousState);

  const [isEnabledParaSiempre, setIsEnabledParaSiempre] = useState(false);
  const toggleParaSiempre = () =>
    setIsEnabledParaSiempre((previousState) => !previousState);

  //const [cuenta, SetCuenta] = useState("");
  //const [categoria, SetCategoria] = useState("");

  function handleOnChangeRubro(elemento) {
    setRubro(elemento);
  }

  function handleOnChangeCuenta(elemento) {
    SetCuenta(elemento);
  }

  function handleOnChangeCategoria(elemento) {
    SetCategoria(elemento);
  }

  function successArrayCuentas(rows) {
    var datosFinales = [];
    rows.forEach((elemento, key) => {
      datosFinales.push({
        key: elemento.id,
        label: elemento.entidad_id  + ' - ' + elemento.nro_cuenta + ' (' + elemento.moneda + ')',
      });
    });

    setArrayCuentas(datosFinales);
  }

  function successArrayTarjetas(rows) {
    var datosFinales = [];
    rows.forEach((elemento, key) => {
      datosFinales.push({
        key: elemento.id,
        label: elemento.emisor + '(' + elemento.ultimos_4_digitos + ')',
      });
    });

    setArrayTarjetas(datosFinales);
  }

  function successArrayCategorias(rows) {
    var datosFinales = [];
    rows.forEach((elemento, key) => {
      datosFinales.push({
        key: elemento.id + elemento.descripcion,
        label: elemento.descripcion,
      });
    });

    setArrayCategorias(datosFinales);
  }

  function successArrayRubros(rows) {
    var datosFinales = [];
    rows.forEach((elemento, key) => {
      datosFinales.push({
        key: elemento.id + elemento.descripcion,
        label: elemento.descripcion,
      });
    });

    setArrayRubros(datosFinales);
  }

  useEffect(() => {
    getCompletoFormateado("Categorias", successArrayCategorias);
    getCompletoFormateado("Rubros", successArrayRubros);
  }, []); // <-- empty array means 'run once'

  function renderDropdown(lista, texto, handle) {
    return (
      <ModalPersonalizado data={lista} initValue={texto} onSelected={handle} />
    );
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
          onChangeText={(texto) => {setMonto(texto);}}
          iconContent={
            <Icon
              size={45}
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
      <Block center>{renderDinero()}</Block>
      <Block>
        {renderInputBox("default", "Descripción")}
        {renderDropdown(
          arrayMediosDePago,
          "Medio de pago",
          handleOnChangeMedioDePago
        )}

        {medio_de_pago == "Consumo Cuenta"
          ? renderDropdown(arrayCuentas, "Cuentas", setCuenta)
          : renderDropdown(arrayTarjetas, "Tarjetas de crédito", setTarjeta)}

        {renderDropdown(arrayRubros, "Rubro", handleOnChangeRubro)}
        {rubro == "Servicios e Impuestos"
          ? renderDropdown(
              arrayCategorias,
              "Categoría",
              handleOnChangeCategoria
            )
          : null}
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
