import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, Platform, View ,ScrollView } from "react-native";
import { Block, Input, Text, theme , Button} from "galio-framework";
import { materialTheme } from "../constants/";
import { Icon } from "../components/";
import SwitchPersonalizado from "../components/SwitchPersonalizado";
import ModalPersonalizado from '../components/ModalPersonalizado';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import  InsertMaestros  from "../Database/InsertMaestros";
import { getCuentas } from "../Database/Database";
import { setIngreso, getIngresos } from "../Database/Ingresos";

const { height, width } = Dimensions.get("screen");

/*
  •
  La aplicación permite que el usuario registre sus ingresos.
  •
  Los ingresos pueden ser periódicos: alquileres de propiedades, sueldos en relación de
  dependencia, facturación autónomo, etc.
  •
  Ingresos extraordinarios
  •
  La aplicación debe permitir el destino de los ingresos: cuentas bancarias, efectivo. En
  el caso de cuentas bancarias actualizaran el saldo de las mismas
*/
const arrayTiposIngreso = InsertMaestros.TIPOSINGRESO;

export default function B1_NuevoIngreso(props){
  const [user_id, setUser_id]               = useState(1);
  const [cuenta, setCuenta]                 = useState("");
  const [tipoIngreso, setTipoIngreso]       = useState(null);
  const [descripcion, setDescripcion]       = useState("");
  const [monto, setMonto]                   = useState("");
  
  const [cuotas_fechas, setCuotas_fechas]   = useState("");
  const [cuotas_restantes, setCuotas_restantes] = useState(1024);
  const [auto_manual, setAuto_manual]       = useState("manual");
 
  
  const { navigation } = props;


  const [arrayCuentas, setArrayCuentas] = useState([]);


  const [isEnabledPeriodico, setIsEnabledPeriodico] = useState(false);
  const togglePeriodico = () =>
    setIsEnabledPeriodico((previousState) => !previousState);


  function handleOnChangeCuenta (unaCuenta){
    console.log('handleOnChangeCuenta: ' + unaCuenta);
    setCuenta(unaCuenta);
  }

  function handleOnChangeTipoIngreso (elemento){
    console.log('handleOnChangeTipoIngreso: ' + elemento);
    setTipoIngreso(elemento);
  }

  /*********************************************************** */
  /*********************************************************** */
  /*********************************************************** */
  useEffect(() => {
    getCuentas(user_id, successArrayCuentas);
  }, []);
  

  function successArrayCuentas(rows) {
    var datosFinales = [];
    rows.forEach((elemento, key) => {
      datosFinales.push({
        key: elemento.id + elemento.nro_cuenta ,
        label: elemento.entidad_id  + ' - ' + elemento.nro_cuenta + ' (' + elemento.moneda + ')',
      });
    });

    setArrayCuentas(datosFinales);
  }

  function DropdownCuentas (){
    return (
      <ModalPersonalizado
      data={arrayCuentas}
      initValue="Destino de Fondos"
      onSelected={handleOnChangeCuenta}
      />
    );
  };

  function DropdownTiposIngreso (){
    return (
      <ModalPersonalizado
      data={arrayTiposIngreso}
      initValue="Tipo de Ingreso"
      onSelected={handleOnChangeTipoIngreso}
      />
    );
  };
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
          <Text>Elegir la fecha de acreditación</Text>
        </Button>
      </Block>
    )
}

/********************************************************************* */
function saveIngreso() {

  setIngreso( user_id,
      cuenta, 
      tipoIngreso, 
      monto, 
      cuotas_fechas, 
      cuotas_restantes, 
      descripcion,
      auto_manual);
    
    getIngresos();

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



return (
  <ScrollView showsVerticalScrollIndicator={false}>
      <Block>
        <Block center>
        {renderDinero()}
        </Block>
        <Block>
        {renderInputBox('default', 'Descripción', setDescripcion)}
        {DropdownTiposIngreso()}
        {DropdownCuentas()}

        <SwitchPersonalizado
        titulo={"Periódico mensual"}
        initialValue={isEnabledPeriodico}
        toggle={togglePeriodico}
      />
        {isEnabledPeriodico ? renderDatePicker() : null}
        {isEnabledPeriodico ? 
        renderInputBox("numeric", "Veces restantes", setCuotas_restantes)
         : null}
        </Block>

        <Block>
      </Block>
      <Button
              shadowless
              color="success"
              style={[styles.button, styles.shadow]}
              onPress={() => {
                saveIngreso();
                navigation.navigate('Inicio', {});
                }
              }
        >
              +
            </Button>
    </Block>
    </ScrollView>
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
