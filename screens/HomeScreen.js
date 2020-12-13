import * as React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import HomeNavButton from '../components/HomeNavButton'
import {useGlobal} from 'reactn';
import Modal from "react-native-modal";
import moment from 'moment';
import { Button, Image } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { WebView } from 'react-native-webview'
import {removeImageSizes, extractImage} from '../components/Utilities'

import ModalWhatsOnNow from '../components/modals/modalWhatsOnNow';

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
    navText: "Gig Schedule",
    icon: "calendar-sharp",
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
  {
    id: 7,
    navText: "Artists",
    icon: "musical-notes",
  },
  {
    id: 8,
    navText: "Venues",
    icon: "beer-outline",
  }]

var dayButtonPressedStatus = [];


export default function HomeScreen() {
  const [eventsData, setEventsData] = useGlobal('EVENTS');
  const [newsData, setNewsData] = useGlobal('NEWS');
  const [modalEventsList, setModalEventsList] = React.useState([]);
  const [eventsModalShow, setEventsModalShow] = React.useState(false);
  const [eventDetailShow, setEventDetailShow] = React.useState(false);
  const [newsModalShow, setNewsModalShow] = React.useState(false);
  const [eventDetailIdx, setEventDetailIdx] = React.useState(-1);
  const [gigScheduleShow, setGigScheduleShow] = React.useState(false);
  const [festivalDays, setFestivalDays] = React.useState([]);
  const [dayButtonPressed, setDayButtonPressed] = React.useState(false);

  React.useEffect(() => {  
    //Process Events, extract Days
    var eventDaysArray = eventsData.map(evt => {
      return moment(evt.startTime, 'X').format('ddd')
    })
    var uniqueDays = eventDaysArray.filter((evt, idx, arr) => {
      return arr.indexOf(evt) === idx
    })
    setFestivalDays(uniqueDays);
    dayButtonPressedStatus = uniqueDays.map(() => { return false})
  }, eventsData);

  const sliderWidth = Dimensions.get('window').width;

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
        setModalEventsList(filterList);
        setEventsModalShow(true);
        break;

      case buttonList[1].navText: // Whats On next
        var filterList = eventsData.filter(event => {
          return moment().isBefore(moment(event.startTime, 'X'));
        })
        if(filterList.length == 0) filterList = NoEvents;
        filterList=filterList.filter((item, idx) => {return idx<5})
        setModalEventsList(filterList);
        setEventsModalShow(true);
        break;

      case buttonList[2].navText: // News
        setNewsModalShow(true);
        break;
  
      case buttonList[3].navText: // Gig Schedule
        setGigScheduleShow(true);
        break;

      default:
        alert("Pressed " + text);
        break;
    }
  }
  
  const toggleEventsModal = () => {
    setEventsModalShow(!eventsModalShow);
  };
  
  const toggleGigSchedule = () => {
    setGigScheduleShow(!gigScheduleShow);
  };
  
  const toggleEventDetailModal = (idx) => {
    (idx > -1) && setEventDetailIdx(idx)
    setEventsModalShow(!eventsModalShow);
    setEventDetailShow(!eventDetailShow);
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

  const toggleGigScheduleDayButton = (idx) => {
    var tmpArray = dayButtonPressedStatus.map((day, i) => {
      return idx == i;
    })
    dayButtonPressedStatus = tmpArray;
    setDayButtonPressed(!dayButtonPressed);
  }

  const daysPanels = festivalDays.map((day, idx) => {
    return (
      <View style={dayButtonPressedStatus[idx] ? styles.dayPanelSelected : styles.dayPanel} key={idx}>
        <TouchableOpacity onPress={() => toggleGigScheduleDayButton(idx)}>
          <Text style={dayButtonPressedStatus[idx] ? styles.dayPanelContentSelected : styles.dayPanelContent}>{day}</Text>
        </TouchableOpacity>
      </View>
    )
  })

  
  const renderNewsItem = ({item, index}) => {
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
      <ModalWhatsOnNow 
        isVisible={eventsModalShow} 
        modalEventsList={modalEventsList}
        toggleEventDetailModal={toggleEventDetailModal}
        toggleEventsModal={toggleEventsModal}
      />
      <Modal //Event Details
        isVisible={eventDetailShow}
        animationIn={'slideInDown'}
        animationInTiming={600}
        animationOut={'slideOutUp'}
        animationOutTiming={600}
      >         
        <Image
          style={styles.eventDetailImageStyles}
          containerStyle={{backgroundColor: '#fff'}}
          resizeMode={'stretch'}
          source={
            {uri: modalEventsList[eventDetailIdx] && 
              removeImageSizes(extractImage(modalEventsList[eventDetailIdx].Thumbnail))}}
        />
        <WebView
          source={{ html: modalEventsList[eventDetailIdx] && removeImageSizes(modalEventsList[eventDetailIdx].Detail)}}
          contentInset={{top: 10, left: 5, bottom: 10, right: 5}}
          style={{backgroundColor: '#fff'}}
          scalesPageToFit={false}
        />
        <Button 
          buttonStyle={styles.closeButtonBackGround} 
          titleStyle={styles.closeButtonText} 
          title="Close" 
          onPress={toggleEventDetailModal}
        />          
      </Modal>
      <Modal //News
        isVisible={newsModalShow}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <Carousel
              data={newsData}
              renderItem={renderNewsItem}
              sliderWidth={sliderWidth}
              itemWidth={sliderWidth-75}
              activeSlideAlignment={'start'}
              useScrollView={true}
        />
        <Button 
          buttonStyle={styles.closeButtonBackGround} 
          titleStyle={styles.closeButtonText} 
          title="Close" 
          onPress={toggleNewsModal}
        />
      </Modal>
      <Modal //Gig Schedule
        isVisible={gigScheduleShow}
        transparent={true}
        animationInTiming={500}
        animationOutTiming={500}
        style={styles.gigScheduleContainer}
      >
        <View style={styles.gigScheduleDaysPanel} data={dayButtonPressed}>
            {daysPanels}
        </View>
        <Button 
          containerStyle={styles.closeScheduleButton}
          buttonStyle={styles.closeGigsButtonBackGround} 
          titleStyle={styles.closeButtonText} 
          title="Close" 
          onPress={toggleGigSchedule}
        />
      </Modal>
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
  },
  closeButtonBackGround: {
    backgroundColor: Colors.primaryColour,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.secondaryColour
  },
  closeButtonText: {
    color: Colors.secondaryColour,
  },
  eventList: {
    backgroundColor: Colors.backGroundPrimary,
    padding: 20,
  },
  eventDetailImageStyles: {
    width: 200, 
    height: 150
  },
  closeGigsButtonBackGround: {
    backgroundColor: Colors.primaryColour,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryColour,
  },
  gigScheduleContainer: {
    backgroundColor: Colors.backGroundPrimary,
    display: 'flex',
  },
  closeScheduleButton: {
  },
  gigScheduleDaysPanel: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  dayPanel: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.secondaryColour,
    backgroundColor: Colors.primaryColour,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dayPanelContent: {
    color: Colors.secondaryColour,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  dayPanelSelected: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primaryColour,
    backgroundColor: Colors.secondaryColour,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dayPanelContentSelected: {
    color: Colors.primaryColour,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
