import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ScrollView, LongPressGestureHandler } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import HomeNavButton from '../components/HomeNavButton'
import EventsList from '../components/EventsList'
import {useGlobal} from 'reactn';
import Modal from "react-native-modal";
import moment from 'moment';

const buttonList = [
  {
    id: 1,
    navText: "What's On Now",
    icon: "play",
  },
  {
    id: 2,
    navText: "What's On Next",
    icon: "skip-forward",
  },
  {
    id: 3,
    navText: "News",
    icon: "paper",
  },
  {
    id: 4,
    navText: "Gig Schedule",
    icon: "musical-notes",
  },
  {
    id: 5,
    navText: "Gigs By Venue",
    icon: "restaurant",
  },
  {
    id: 6,
    navText: "Favourites",
    icon: "heart",
  },
]


export default function HomeScreen() {
  const [eventsData, setEventsData] = useGlobal('EVENTS');
  const [modalEventsList, setModalEventsList] = React.useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  
  const pressed = (key, text) => {

    switch(text) {
      case "What's On Now":
        var filterList = eventsData.filter(event => {
          return moment().isBetween(moment(event.startTime, 'X'), moment(event.endtime, 'X'));
        })
        if(filterList.length == 0) {
          filterList = [
            {
              Title: "No events on currently",
              Thumbnail: 'https://s3-eu-west-1.amazonaws.com/dbjabmbl.events.xml/DBJAB_logo_100x100.png'
            }
          ]
        }
        console.log("Setting:", filterList)
        setModalEventsList(filterList);
        setModalShow(true);
        break;
      default:
        alert("Pressed " + text);
        break;
    }
  }

  
  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  const navButtonArray = buttonList.map(button => {
    return <HomeNavButton 
      key={button.id} 
      id={button.id} 
      text={button.navText} 
      icon={button.icon}
      pressed={pressed}
    />
  })

  return (
    <View style={styles.container}>
      <Modal isVisible={modalShow}>
        <View style={styles.eventList}>
          <EventsList data={modalEventsList} />
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {navButtonArray}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backGroundPrimary,
  },
  contentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
  },
  eventList: {
    backgroundColor: Colors.backGroundPrimary,
    padding: 20,
  }
});
