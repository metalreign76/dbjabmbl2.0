import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { StyleSheet, Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements'

import Colors from '../../constants/Colors'
import {decode, extractImage} from '../Utilities'
import ModalGigSchedule from './modalGigSchedule';

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
      <Modal //Venues
        isVisible={isVisible}
        animationInTiming={600}
        animationOutTiming={600}
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
                          gigs: venuesGigsLists[venue.venueName]
                        });
                        toggleVenuesListModal();
                        toggleGigScheduleModal();
                      }}
                    >
                        <Avatar 
                            source={ require('../../assets/images/DBJAB_logo_100x100.png')}
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
      borderWidth: 1,
      padding: 10,
      borderColor: Colors.secondaryColour
  },
  backButtonText: {
      color: Colors.secondaryColour,
  },
  venuesListItem: {
    color: Colors.primaryColour,
    fontWeight: 'bold',
    flex: 1
  },
  venuesListSubItem: {
    color: Colors.primaryColour,
    flex: 1
  },
  venuesList: {
    padding: 5,
  },
});

