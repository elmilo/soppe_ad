import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';

import B0_Inicio from '../screens/B0_Inicio';
import B01_Perfil from '../screens/B01_Perfil';
import C0_Tarjetas from '../screens/C0_Tarjetas';
import C1_Tarjetas from '../screens/C1_Tarjetas';
import C2_Tarjetas from '../screens/C2_Tarjetas';
import D0_Cuentas from '../screens/D0_Cuentas';
import D1_Cuentas from '../screens/D1_Cuentas';
import D2_Cuentas from '../screens/D2_Cuentas';
import E00_Inversiones from '../screens/E00_Inversiones';
import E01_Inversiones from '../screens/E01_Inversiones';
import E02_Inversiones from '../screens/E02_Inversiones';
import F00_Prestamos from '../screens/F00_Prestamos';
import F01_Prestamos from '../screens/F01_Prestamos';
import F02_Prestamos from '../screens/F02_Prestamos';
import G00_Presupuestos from '../screens/G00_Presupuestos';
import G01_Presupuestos from '../screens/G01_Presupuestos';
import G02_Presupuestos from '../screens/G02_Presupuestos';

import OnboardingScreen from '../screens/Onboarding';
import ProScreen from '../screens/Pro';
import SettingsScreen from '../screens/Settings';

import CustomDrawerContent from './Menu';
import { Icon, Header } from '../components';
import { Images, materialTheme } from "../constants/";


const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  type: "12 meses en Soppe",
  plan: "Pro",
  rating: 4.8
};
/******************************************************************** */
function StackInicio(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen 
        name="Inicio"
        component={B0_Inicio}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              search
              tabs
              title="Inicio"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen 
        name="Pro"
        component={ProScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white transparent title="" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

/************************************************************************** */
function StackTarjetas(props) {
  return (
    <Stack.Navigator initialRouteName="Tarjetas" mode="card" headerMode="screen">
      <Stack.Screen
        name="Tarjetas"
        component={C0_Tarjetas}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Tarjetas"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

/************************************************************************** */
function StackCuentas(props) {
  return (
    <Stack.Navigator initialRouteName="Cuentas" mode="card" headerMode="screen">
      <Stack.Screen
        name="Cuentas"
        component={D0_Cuentas}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Cuentas"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */

function StackNuevaCuenta(props) {
  return (
    <Stack.Navigator initialRouteName="Nueva Cuenta" mode="card" headerMode="screen">
      <Stack.Screen
        name="Nueva Cuentas"
        component={D1_Cuentas}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Nueva Cuenta"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */


function StackDescripcionCuenta(props) {
  return (
    <Stack.Navigator initialRouteName="Descripcion Cuenta" mode="card" headerMode="screen">
      <Stack.Screen
        name="Descripcion Cuenta"
        component={D2_Cuentas}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Descripcion Cuenta"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */
function StackNuevaTarjeta(props) {
  return (
    <Stack.Navigator initialRouteName="Nueva Tarjeta" mode="card" headerMode="screen">
      <Stack.Screen
        name="Nueva Tarjetas"
        component={C1_Tarjetas}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Nueva Tarjeta"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */


function StackDescripcionTarjeta(props) {
  return (
    <Stack.Navigator initialRouteName="Descripcion Tarjeta" mode="card" headerMode="screen">
      <Stack.Screen
        name="Descripcion Tarjeta"
        component={C2_Tarjetas}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Descripcion Tarjeta"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */

function StackInversiones(props) {
  return (
    <Stack.Navigator initialRouteName="Inversiones" mode="card" headerMode="screen">
      <Stack.Screen
        name="Inversiones"
        component={E00_Inversiones}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Inversiones"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

/************************************************************************** */

function StackNuevaInversion(props) {
  return (
    <Stack.Navigator initialRouteName="Nueva Inversion" mode="card" headerMode="screen">
      <Stack.Screen
        name="Nueva Inversion"
        component={E01_Inversiones}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Nueva Inversion"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */

function StackDescripcionInversion(props) {
  return (
    <Stack.Navigator initialRouteName="Descripcion Inversion" mode="card" headerMode="screen">
      <Stack.Screen
        name="Descripcion Inversion"
        component={E02_Inversiones}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Descripcion Inversion"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */
function StackPrestamos(props) {
  return (
    <Stack.Navigator initialRouteName="Préstamos" mode="card" headerMode="screen">
      <Stack.Screen
        name="Préstamos"
        component={F00_Prestamos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Préstamos"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

/************************************************************************** */

function StackNuevoPrestamo(props) {
  return (
    <Stack.Navigator initialRouteName="Nueva Prestamo" mode="card" headerMode="screen">
      <Stack.Screen
        name="Nuevo Prestamo"
        component={F01_Prestamos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Nuevo Prestamo"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */
function StackDescripcionPrestamo(props) {
  return (
    <Stack.Navigator initialRouteName="Descripcion Prestamo" mode="card" headerMode="screen">
      <Stack.Screen
        name="Descripcion Prestamo"
        component={F02_Prestamos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Descripcion Prestamo"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}



/************************************************************************** */
function StackPresupuesto(props) {
  return (
    <Stack.Navigator initialRouteName="Presupuestos" mode="card" headerMode="screen">
      <Stack.Screen
        name="Presupuestos"
        component={G00_Presupuestos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Presupuestos"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}


/************************************************************************** */

function StackNuevoPresupuesto(props) {
  return (
    <Stack.Navigator initialRouteName="Nuevo Presupuesto" mode="card" headerMode="screen">
      <Stack.Screen
        name="Nuevo Presupuestos"
        component={G01_Presupuestos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Nuevo Presupuesto"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */


function StackDescripcionPresupuesto(props) {
  return (
    <Stack.Navigator initialRouteName="Descripcion Presupuesto" mode="card" headerMode="screen">
      <Stack.Screen
        name="Descripcion Presupuesto"
        component={G02_Presupuestos}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Descripcion Presupuesto"
              scene={scene}
              navigation={navigation}
            />
          )
        }}
      />
      
    </Stack.Navigator>
  );
}

/************************************************************************** */
function StackPerfil(props) {
  return (
    <Stack.Navigator initialRouteName="Perfil" mode="card" headerMode="screen">
      <Stack.Screen
        name="Perfil"
        component={B01_Perfil}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              transparent
              title="Perfil"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}




function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Inicio"
    >
      <Drawer.Screen
        name="Inicio"
        component={StackInicio}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="shop"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Woman"
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-woman"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 4 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Man"
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="man"
              family="entypo"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Kids"
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="baby"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Cuentas"
        component={StackCuentas}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Préstamos"
        component={StackPrestamos}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Descripcion Prestamo"
        component={StackDescripcionPrestamo}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Nuevo Prestamo"
        component={StackNuevoPrestamo}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
        <Drawer.Screen
        name="Presupuestos"
        component={StackPresupuesto}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
        <Drawer.Screen
        name="Tarjetas"
        component={StackTarjetas}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Inversiones"
        component={StackInversiones}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Nueva Cuenta"
        component={StackNuevaCuenta}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Nueva Inversion"
        component={StackNuevaInversion}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Descripcion Inversion"
        component={StackDescripcionInversion}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Descripcion Cuenta"
        component={StackDescripcionCuenta}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />

      <Drawer.Screen
        name="Nueva Tarjeta"
        component={StackNuevaTarjeta}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Descripcion Tarjeta"
        component={StackDescripcionTarjeta}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />


      <Drawer.Screen
        name="Nuevo Presupuesto"
        component={StackNuevoPresupuesto}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Descripcion Presupuesto"
        component={StackDescripcionPresupuesto}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />

      <Drawer.Screen
        name="Perfil"
        component={StackPerfil}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="circle-10"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-switch"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Sign In"
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="ios-log-in"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Sign Up"
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="md-person-add"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

/*
const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Profile" navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Settings" navigation={navigation} />,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const ComponentsStack = createStackNavigator({
  Components: {
    screen: ComponentsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Components" navigation={navigation} />,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});


const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search tabs title="Home" navigation={navigation} />,
    })
  },
  Pro: {
    screen: ProScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        )
      }
    },
    Woman: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Woman" />
        ),
      }),
    },
    Man: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Man" />
        ),
      }),
    },
    Kids: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Kids" />
        ),
      }),
    },
    NewCollection: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="New Collection" />
        ),
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
        ),
      }),
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Settings" title="Settings" />
        ),
      }),
    },
    Components: {
      screen: ComponentsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Components" title="Components" />
        ),
      }),
    },
    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
      },
    },
    SignIn: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Sign In" />
        ),
      }),
    },
    SignUp: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Sign Up" />
        ),
      }),
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;

*/