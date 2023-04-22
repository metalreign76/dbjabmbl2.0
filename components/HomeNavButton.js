import * as React from 'react';
import { Text, Platform, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const screenHeight = Dimensions.get('window').height;
const imageHeight = 170; // set in App.js

export default function HomeNavButton(props) {
  const { id, text, icon, pressed, numRows } = props;

  const availableButtonSpace = screenHeight - imageHeight;
  let calculatedButtonHeight = Math.abs(availableButtonSpace / numRows);
  calculatedButtonHeight -= Math.abs(calculatedButtonHeight*0.1); // Less 10%
  const buttonTextMargin = Math.abs(calculatedButtonHeight / 8);

  switch(icon)
  {
    case 'guitar':
    case 'map-marker-alt':
        return (
        <TouchableOpacity 
            style={{
              ...styles.navButtonStyle,
              height: calculatedButtonHeight,
              paddingTop: buttonTextMargin,
              width: (text === 'Favourites') ? '98%' : '48%',
            }}
            onPress={() => { pressed(id, text)}}
        >
          <Text style={styles.navButtontext}>{text}</Text>
          <FontAwesome5
              name={icon}
              size={40}
              style={{ marginBottom: -3 }}
              color={Colors.secondaryColour}
          />
        </TouchableOpacity>
      );
      break;

    default: 
      return (
        <TouchableOpacity 
          style={{
            ...styles.navButtonStyle,
            height: (text === 'Favourites') ? Math.abs(calculatedButtonHeight*0.8) : calculatedButtonHeight,
            paddingTop: (text === 'Favourites') ? Math.abs(buttonTextMargin*0.5) : buttonTextMargin,
            width: (text === 'Favourites') ? '98%' : '48%',
          }}
          onPress={() => { pressed(id, text)}}
        >
          <Text style={styles.navButtontext}>{text}</Text>
          <Ionicons
              name={Platform.OS === 'ios' ? 'ios-'+ icon : 'md-'+ icon}
              size={40}
              style={{ marginBottom: -3 }}
              color={Colors.secondaryColour}
          />
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
    navButtonStyle: {
      margin: '1%',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: Colors.secondaryColour,
      backgroundColor: Colors.primaryColour,
    },
    navButtontext : {
        color: Colors.secondaryColour,
        fontWeight: 'bold',
        paddingBottom: 5,
        fontSize: 20,
    }
  });
