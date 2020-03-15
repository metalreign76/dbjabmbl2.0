import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import HomeNavButton from '../components/HomeNavButton'
import EventsList from '../components/EventsList'
import {useGlobal} from 'reactn';
import Modal from "react-native-modal";
import moment from 'moment';
import { Button } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { WebView } from 'react-native-webview'
import {removeImageSizes} from '../components/Utilities'

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
  const [newsData, setNewsData] = useGlobal('NEWS');
  const [modalEventsList, setModalEventsList] = React.useState([]);
  const [eventsModalShow, setEventsModalShow] = React.useState(false);
  const [newsModalShow, setNewsModalShow] = React.useState(false);
  var myRef = React.useRef();

  const NoEvents = [
    {
      Title: "No events on currently",
      Thumbnail: require('../assets/images/DBJAB_logo_100x100.png')
    }
  ]
  
  const pressed = (key, text) => {

    switch(text) {
      case "What's On Now":
        var filterList = eventsData.filter(event => {
          return moment().isBetween(moment(event.startTime, 'X'), moment(event.endtime, 'X'));
        })
        if(filterList.length == 0) filterList = NoEvents;
        setModalEventsList(filterList);
        setEventsModalShow(true);
        break;

      case "What's On Next":
        var filterList = eventsData.filter(event => {
          return moment().isBefore(moment(event.startTime, 'X'));
        })
        if(filterList.length == 0) filterList = NoEvents;
        filterList=filterList.filter((item, idx) => {return idx<5})
        setModalEventsList(filterList);
        setEventsModalShow(true);
        break;

      case "News":
        setNewsModalShow(true);
        break;
  
      default:
        alert("Pressed " + text);
        break;
    }
  }

  
  const toggleEventsModal = () => {
    setEventsModalShow(!eventsModalShow);
  };
  
  const toggleNewsModal = () => {
    setNewsModalShow(!newsModalShow);
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

  
  const renderNewsItem = ({item, index}) => {
    console.log("Item:", removeImageSizes(item.content.rendered))
    return (
      <WebView
        source={{ html: removeImageSizes(item.content.rendered)}}
        contentInset={{top: 10, left: 5, bottom: 10, right: 5}}
        style={{backgroundColor: '#fff'}}
        scalesPageToFit={false}
      />
    )
}

  return (
    <View style={styles.container}>
      <Modal 
        isVisible={eventsModalShow}
        animationInTiming={500}
      >
        <View style={styles.eventList}>
          <EventsList data={modalEventsList} />
          <Button 
            buttonStyle={styles.closeButtonBackGround} 
            titleStyle={styles.closeButtonText} 
            title="Close" 
            onPress={toggleEventsModal}
          />
        </View>
      </Modal>
      <Modal 
        isVisible={newsModalShow}
        animationType={'slide'}
      >
        <Carousel
              data={newsData}
              renderItem={renderNewsItem}
              sliderWidth={330}
              itemWidth={280}
        />
        <Button 
          buttonStyle={styles.closeButtonBackGround} 
          titleStyle={styles.closeButtonText} 
          title="Close" 
          onPress={toggleNewsModal}
        />
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
  closeButtonBackGround: {
    backgroundColor: Colors.primaryColour,
  },
  closeButtonText: {
    color: Colors.secondaryColour,
  },
  eventList: {
    backgroundColor: Colors.backGroundPrimary,
    padding: 20,
  }
});
