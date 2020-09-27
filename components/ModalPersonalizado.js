import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Platform} from "react-native";
import ModalSelector from 'react-native-modal-selector';
import { materialTheme } from "../constants/";
import { theme } from "galio-framework";

export default function ModalPersonalizado(props){
    const [value, SetValue] = useState('');
    const [initValue, SetInitValue] = useState(props.initValue);
    const [data, SetData] = useState(props.data);
    

    return (
      <ModalSelector
        value={value}
        data={data}
        initValue={initValue}
        style={miModalStyle.general}
        optionStyle={miModalStyle.optionStyle}
        selectStyle={miModalStyle.selectStyle}
        initValueTextStyle={miModalStyle.initValueTextStyle}
        optionContainerStyle={miModalStyle.optionContainerStyle}
        cancelText={'Cancelar'}
      // onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} 
      />
    );

}
//overlayStyle={miModalStyle.overlayStyle}
//      optionContainerStyle={miModalStyle.optionContainerStyle}
const PADDING = theme.SIZES.BASE;
const BORDER_RADIUS = 0;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = theme.COLORS.PRIMARY;

const miModalStyle =  StyleSheet.create({
general: {
    borderRadius:    BORDER_RADIUS,
    flexShrink:      1,
    marginBottom:    4,
    padding:         PADDING * 0.2,
    backgroundColor: '#FFFFFF',
    paddingTop: theme.SIZES.BASE * 0.25,
    paddingHorizontal: theme.SIZES.BASE,
},

    overlayStyle: {
        flex:            1,
        padding:         '5%',
        justifyContent:  'center',
        backgroundColor: '#FFFFFF',
    },

    optionContainerStyle: {
        borderRadius:    BORDER_RADIUS,
        flexShrink:      1,
        marginBottom:    8,
        padding:         PADDING,
        backgroundColor: '#FFFFFF',
    },


    selectStyle: {
        borderColor:  '#FFFFFF',
        borderWidth:  1,
        padding:      PADDING * 0.5,
        borderRadius: BORDER_RADIUS,
    },

    selectTextStyle: {
        textAlign: 'right',
        color:     '#FFFFFF',
        fontSize:  FONT_SIZE,
    },

    cancelStyle: {
        borderRadius:    BORDER_RADIUS,
        backgroundColor: '#FFFFFF',
        padding:         PADDING,
    },

    cancelTextStyle: {
        textAlign: 'center',
        color:     '#333',
        fontSize:  FONT_SIZE,
    },

    optionStyle: {
        padding:           PADDING,
        borderBottomWidth: 0,
        borderBottomColor: '#ccc',
    },

    optionTextStyle: {
        textAlign: 'left',
        fontSize:  FONT_SIZE,
        color:     theme.COLORS.LABEL,
    },

    sectionStyle: {
        padding:           PADDING * 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    sectionTextStyle: {
        textAlign: 'center',
        fontSize:  FONT_SIZE,
    },
    
    initValueTextStyle: {
      textAlign: 'center',
      fontSize:  FONT_SIZE,
      color:     materialTheme.COLORS.PRIMARY,
  },
});