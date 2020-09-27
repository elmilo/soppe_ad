import React, {useState} from 'react';
import { Block, Text, theme } from "galio-framework";
import Switch from './Switch';

export default function SwitchPersonalizado (props) {
    const initialValue = props.initialValue;
    const toggle = props.toggle;
    const titulo = props.titulo;

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
            onValueChange={toggle}
            value={initialValue}
          />
        </Block>
      </Block>
    );
};

