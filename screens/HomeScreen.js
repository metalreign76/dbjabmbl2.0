import * as React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import HomeNavButton from '../components/HomeNavButton'
import {useGlobal} from 'reactn';
import moment from 'moment';

import ModalWhatsOnNow from '../components/modals/modalWhatsOnNow';
import ModalNews from '../components/modals/modalNews';
import ModalGigSchedule from '../components/modals/modalGigSchedule'

const buttonList = [
  {
    id: 1,
    navText: "What's On Now",
    icon: "play",
  },
  {
    id: 2,
    navText: "What's On Next",
    icon: "play-skip-forward",
  },
  {
    id: 3,
    navText: "News",
    icon: "newspaper-outline",
  },
  {
    id: 4,
    navText: "Favourites",
    icon: "heart",
  },
  {
    id: 5,
    navText: "Gig Schedule",
    icon: "calendar-sharp",
  },
  {
    id: 6,
    navText: "Gigs By Venue",
    icon: "beer-outline",
  },
  {
    id: 7,
    navText: "Artists",
    icon: "musical-notes",
  },
  {
    id: 8,
    navText: "Venues",
    icon: "restaurant",
  }
]

var dayButtonPressedStatus = [];


export default function HomeScreen() {
  const [eventsData, setEventsData] = useGlobal('EVENTS');
  const [newsData, setNewsData] = useGlobal('NEWS');
  const [eventsList, setEventsList] = React.useState([]);
  const [eventsModalIsVisible, setEventsModalIsVisible] = React.useState(false);
  const [newsModalIsVisible, setNewsModalIsVisible] = React.useState(false);
  const [gigScheduleModalIsVisible, setGigScheduleModalIsVisible] = React.useState(false);
  
  const NoEvents = [
    {
      Title: "No events on currently",
      Thumbnail: require('../assets/images/DBJAB_logo_100x100.png')
    }
  ]
  
  const pressed = (key, text) => {

    switch(text) {
      case buttonList[0].navText: // Whats On Now
        var filterList = eventsData.filter(event => {
          return moment().isBetween(moment(event.startTime, 'X'), moment(event.endtime, 'X'));
        })
        if(filterList.length == 0) filterList = NoEvents;
        setEventsList(filterList);
        setEventsModalIsVisible(true);
        break;

      case buttonList[1].navText: // Whats On next
        var filterList = eventsData.filter(event => {
          return moment().isBefore(moment(event.startTime, 'X'));
        })
        if(filterList.length == 0) filterList = NoEvents;
        filterList=filterList.filter((item, idx) => {return idx<5})
        setEventsList(filterList);
        setEventsModalIsVisible(true);
        break;

      case buttonList[2].navText: // News
        setNewsModalIsVisible(true);
        break;

      case buttonList[4].navText: // Gig Schedule
        setGigScheduleModalIsVisible(true);
        break;

      default:
        alert("Pressed " + text);
        break;
    }
  }
  
  const toggleEventsModal = () => {
    setEventsModalIsVisible(!eventsModalIsVisible);
  };
  
  const toggleNewsModal = () => {
    setNewsModalIsVisible(!newsModalIsVisible);
  };
  
  const toggleGigScheduleModal = () => {
    setGigScheduleModalIsVisible(!gigScheduleModalIsVisible);
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
      <ModalWhatsOnNow 
        isVisible={eventsModalIsVisible} 
        eventsList={eventsList}
        toggleEventsModal={toggleEventsModal}
      />
      <ModalNews 
        isVisible={newsModalIsVisible} 
        newsData={newsData}
        toggleNewsModal={toggleNewsModal}
      />
      <ModalGigSchedule 
        isVisible={gigScheduleModalIsVisible} 
        allEvents={eventsData}
        toggleGigScheduleModal={toggleGigScheduleModal}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.homePageButtonsContainer}>
        {navButtonArray}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backGroundPrimary,
  },
  homePageButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
  }
});
