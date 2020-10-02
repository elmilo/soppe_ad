import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Platform , ScrollView} from "react-native";
import { Block, Input, Button, theme, Text } from "galio-framework";
import { materialTheme } from "../constants/";
import { Icon } from "../components/";
import SwitchPersonalizado from "../components/SwitchPersonalizado";
import ModalPersonalizado from "../components/ModalPersonalizado";
import { FloatingAction } from "react-native-floating-action";
import CamaraPersonalizada from "../components/CamaraPersonalizada";
import { getCuentas, getTarjetas, updateSaldoCuentaEgreso, updateSaldoTarjetaEgreso } from "../Database/Database";
import { getTodo } from "../Database/SelectTables";
import { setEgreso, getEgresos } from "../Database/Egresos";
import  InsertMaestros  from "../Database/InsertMaestros";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { block, concat } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

const arrayMediosDePago = [
  { value: "1Consumo", label: "Consumo Cuenta" },
  { value: "2TC", label: "Tarjeta de crédito" },
];

const arrayCategorias = InsertMaestros.CATEGORIAS;
const arrayRubros     = InsertMaestros.RUBROS;



export default function B1_NuevoEgreso(props) {
  /********************************* */
  const [user_id, setUser_id]               = useState(1);
  const [cuenta, setCuenta]                 = useState("");
  const [rubro, setRubro]                   = useState("");
  const [categoria, SetCategoria]           = useState(null);
  const [tarjeta, setTarjeta]               = useState("");
  const [medio_de_pago, setMedio_de_pago]   = useState("");
  const [monto, setMonto]                   = useState("");
  const [cuotas_fechas, setCuotas_fechas]   = useState("");
  const [cuotas_restantes, setCuotas_restantes] = useState(1024);
  const [descripcion, setDescripcion]       = useState("");
  const [auto_manual, setAuto_manual]       = useState("manual");
  const [add_dttm, setAdd_dttm]             = useState(new Date());
  const [imagenComprobante, setImagenComprobante]   = useState(null);
  const {navigation } = props;
  
  
  function successCallbackUserID(rowDB) {
    setUser_id(rowDB.idExt);
  }

  useEffect(() => {
    getTodo("Usuarios", successCallbackUserID);
  }, []);

/********************************************************************* */
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
  
  function formatFecha(fecha) {
    var d = new Date(fecha),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

  //console.warn("A date has been picked: ", date);
  setFechaDatePicker (date);
  setCuotas_fechas (formatFecha(date));
  hideDatePicker();
};


  const [fechaDatePicker, setFechaDatePicker] = useState(new Date())
 
  function renderDatePicker() {
    return (
      <Block center>
        <Button shadowless color="success"onPress={showDatePicker}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
          <Text>Elegir la fecha de vencimiento</Text>
        </Button>
      </Block>
    )
}

/********************************************************************* */
function handleOnChangeMedioDePago(medioDePago) {
    
    if (medioDePago == "Consumo Cuenta") {
      getCuentas(user_id, successArrayCuentas);
      setMedio_de_pago("Consumo Cuenta");
      setTarjeta(null);
    }
    if (medioDePago == "Tarjeta de crédito") {
      getTarjetas(user_id, successArrayTarjetas);
      setMedio_de_pago("Tarjeta de crédito");
      setCuenta(null);
    }

    return true;
  }

  const [arrayTarjetas, setArrayTarjetas] = useState([]);
  const [arrayCuentas, setArrayCuentas] = useState([]);

  /**************************************/


  const [isEnabledPeriodico, setIsEnabledPeriodico] = useState(false);
  const togglePeriodico = () =>
    setIsEnabledPeriodico((previousState) => !previousState);

  const [isEnabledParaSiempre, setIsEnabledParaSiempre] = useState(false);
  const toggleParaSiempre = () =>
    setIsEnabledParaSiempre((previousState) => !previousState);

  //const [cuenta, SetCuenta] = useState("");

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

  function tratarImagenCallback (ImagenCamara){
    console.log('ImagenCamara: OK');
    setImagenComprobante(ImagenCamara);
  }
  
  function saveEgreso() {

  setEgreso(user_id,
    cuenta, 
      rubro, 
      categoria, 
      tarjeta, 
      medio_de_pago, 
      monto, 
      cuotas_fechas, 
      cuotas_restantes, 
      descripcion,
      auto_manual);

    getEgresos();
    {medio_de_pago == "Consumo Cuenta"
          ? updateSaldoCuentaEgreso(cuenta.slice(cuenta.search("-")+2,-5),monto): 
          updateSaldoTarjetaEgreso(tarjeta.slice(-5,-1),monto)
        };
    
//;tarjeta.slice(-2,-5) = ultimos 4 digitos
    setCuenta("");
    setRubro("");
    SetCategoria(null);
    setTarjeta("");
    setMedio_de_pago("");
    setMonto("");
    setCuotas_fechas("");
    setCuotas_restantes(1024);
    setDescripcion("");
    setAuto_manual("manual");
    setAdd_dttm(new Date());
    setImagenComprobante(null);

  }

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

  function renderInputBox(tipo, titulo, callback) {
    return (
      <Block>
        <Input
          borderless
          bgColor="#FFFFFFFF"
          type={tipo}
          placeholder={titulo}
          fontSize={16}
          placeholderTextColor={materialTheme.COLORS.DEFAULT}
          style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
          onChangeText={(texto) => {callback(texto);}}          
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
    <ScrollView showsVerticalScrollIndicator={false}>
    <Block>
      <Block center>{renderDinero()}</Block>
      <Block>
        {renderInputBox('default', 'Descripción', setDescripcion)}
        
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
        ? renderDatePicker()
        : null}
      
      {isEnabledPeriodico && !isEnabledParaSiempre
        ? renderInputBox("numeric", "Cuotas restantes", setCuotas_restantes)
        : null}

        <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
        <CamaraPersonalizada SelectedImage={tratarImagenCallback}/>
      </Block>
      <Text></Text>
      <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingVertical: theme.SIZES.BASE }}>
      <Button
              shadowless
              color="success"
              style={[styles.button, styles.shadow]}
              onPress={() => {
                saveEgreso();
                navigation.navigate('Inicio', {});
                }
              }
        >
              +
            </Button>
            </Block>
    </Block>
    </ScrollView>
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
