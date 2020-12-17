import * as React from 'react';
import { Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function HomeNavButton(props) {

  switch(props.icon)
  {
    case 'guitar':
      return (
        <TouchableOpacity 
            style={styles.navButtonStyle}
            onPress={() => { props.pressed(props.id, props.text)}}
        >
          <Text style={styles.navButtontext}>{props.text}</Text>
          <FontAwesome5
              name={props.icon}
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
            style={styles.navButtonStyle}
            onPress={() => { props.pressed(props.id, props.text)}}
        >
          <Text style={styles.navButtontext}>{props.text}</Text>
          <Ionicons
              name={Platform.OS === 'ios' ? 'ios-'+ props.icon : 'md-'+ props.icon}
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
      borderWidth: 2,
      borderColor: Colors.secondaryColour,
      backgroundColor: Colors.primaryColour,
      width: '48%',
      height: 150,
      margin: '1%',
      alignItems: 'center',
      paddingTop: '8%'
    },
    navButtontext : {
        color: Colors.secondaryColour,
        fontWeight: 'bold',
        paddingBottom: 5,
        fontSize: 20,
    }
  });
