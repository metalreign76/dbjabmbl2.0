import * as React from 'react';
import { Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function HomeNavButton(props) {
  return (
    <TouchableOpacity 
        style={styles.navButtonStyle}
        onPress={pressed}
    >
            <Text style={styles.navButtontext}>{props.text}</Text>
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-'+ props.icon : 'md-'+ props.icon}
                size={50}
                style={{ marginBottom: -3 }}
                color={Colors.secondaryColour}
            />
    </TouchableOpacity>
  );
}

function pressed() {
    alert("Yup");
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
      paddingTop: '10%'
    },
    navButtontext : {
        color: Colors.secondaryColour,
        fontWeight: 'bold',
        paddingBottom: 5,
        fontSize: 20,
    }
  });
