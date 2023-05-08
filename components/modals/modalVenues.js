import * as React from 'react';
import {useGlobal} from 'reactn';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements'
import { StyleSheet } from 'react-native-size-scaling';

import Colors from '../../constants/Colors'
import {decode, isIOS} from '../Utilities'
import ModalGigSchedule from './modalGigSchedule';
import GestureRecognizer from 'react-native-swipe-gestures';

const sliderWidth = Dimensions.get('window').width;

export default function ModalVenues(props) {
    const { 
        isVisible, 
        venuesList,
        venuesGigsLists,
        toggleVenuesListModal
    } = props;

    const [ gigScheduleModalIsVisible, setGigScheduleModalIsVisible ] = React.useState(false);
    const [ selectedVenue, setSelectedVenue ] = React.useState({gigs: []});

    const toggleGigScheduleModal = () => {
      setGigScheduleModalIsVisible(!gigScheduleModalIsVisible);
    }

    return (
      <View>
      <GestureRecognizer
            onSwipeLeft={toggleVenuesListModal}
      >
      <Modal //Venues
        isVisible={isVisible}
        animationInTiming={600}
        animationOutTiming={isIOS()?300:600}
        style={{width: '90%', alignSelf: 'center'}}
      >
        <ScrollView style={styles.venuesList}>
            {
              venuesList.map((venue, idx) => {
                  return (<ListItem
                      key={idx}
                      topDivider={ idx == 0 ? false : true}
                      bottomDivider
                      onPress={() => {
                        setSelectedVenue({
                          gigs: venuesGigsLists[decode(venue.venueName)]
                        });
                        toggleVenuesListModal();
                        setTimeout(() => {toggleGigScheduleModal()}, isIOS() ? 750 : 500);
                      }}
                    >
                        <Avatar 
                            source={ require('../../assets/images/2023_app_logo_100_100.png')}
                            rounded={true}
                        />
                        <ListItem.Title style={styles.venuesListItem}>{decode(venue.venueName)}</ListItem.Title>
                        <ListItem.Subtitle style={styles.venuesListSubItem}>{venue.venueAddr}</ListItem.Subtitle>
                    </ListItem>
                  )
              })
            }
            <Button 
              buttonStyle={styles.backButtonBackGround} 
              titleStyle={styles.backButtonText} 
              title="Back" 
              onPress={toggleVenuesListModal}
            />
        </ScrollView>
      </Modal>
      </GestureRecognizer>
      <ModalGigSchedule 
        isVisible={gigScheduleModalIsVisible} 
        allEvents={selectedVenue.gigs}
        toggleGigScheduleModal={toggleGigScheduleModal}
        togglePrevModal={toggleVenuesListModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButtonBackGround: {
      backgroundColor: Colors.primaryColour,
      marginTop: 5,
      marginBottom: 5,
      borderWidth: 1,
      padding: 10,
      borderColor: Colors.secondaryColour
  },
  backButtonText: {
      color: Colors.secondaryColour,
  },
  venuesListItem: {
    color: Colors.primaryColour,
    fontWeight: isIOS() ? 600 : 'bold',
    flex: 1,
    fontSize: 14
  },
  venuesListSubItem: {
    color: Colors.primaryColour,
    flex: 1,
    fontSize: 12
  },
  venuesList: {
    padding: 5,
  }
});

