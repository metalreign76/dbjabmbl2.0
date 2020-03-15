import * as React from 'react';
import { Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import moment from 'moment';


import {decode, extractImage} from './Utilities'

import Colors from '../constants/Colors';

export default function EventsList(props) {

  // console.log("Data:", props.data)

  return (
    props.data.map((event, idx) => {
      return <ListItem
        key={idx}
        leftAvatar={ event.Venue ? { 
          source: { uri: extractImage(event.Thumbnail) } ,
          size: 'large'
        } :
        {
          source: event.Thumbnail ,
          size: 'large'
        }
      }
        title={decode(event.Title)}
        titleStyle={styles.eventsListItem}
        subtitle={event.Venue ? event.Venue + "\n" + moment(event.Date).format('dddd') + ", " + event.StartTime + " - " + event.EndTime : ""}
        subtitleStyle={styles.eventsSubtitle}
        onPress={() => { 
          if(!event.Venue) return;
          alert("Pressed " + props.data[idx].Title)
        }}
        bottomDivider
      />
    })
  )
}

const styles = StyleSheet.create({
  eventsListItem: {
    color: Colors.primaryColour,
    fontWeight: 'bold'
  },
  eventsSubtitle: {
    color: Colors.primaryColour,
  }
});
