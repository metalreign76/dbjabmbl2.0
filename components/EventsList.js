import * as React from 'react';
import { Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'

import Colors from '../constants/Colors';

export default function EventsList(props) {

  console.log("Data:", props.data)

  return (
    props.data.map((event, idx) => {
      return <ListItem
        key={idx}
        leftAvatar={{ source: { uri: event.Thumbnail } }}
        title={event.Title}
        // subtitle={l.subtitle}
        bottomDivider
      />
    })
  )
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
