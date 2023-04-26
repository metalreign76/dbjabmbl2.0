import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements'
import moment from 'moment';
import defaultLogo from '../../assets/images/DBJAB_logo_100x100.png';

import ModalGigDetail from './modalGigDetail'

import {decode, extractImage, isIOS} from '../Utilities'
import Colors from '../../constants/Colors';

export default function ModalWhatsOnNow(props) {
    const { 
        isVisible, 
        eventsList,
        toggleEventsModal 
    } = props;

    const [ gigDetailModalIsVisible, setGigDetailModalIsVisible ] = React.useState(false);
    const [ selectedGig, setSelectedGig ] = React.useState({});

    const toggleGigDetailModal = () => {
        setGigDetailModalIsVisible(!gigDetailModalIsVisible);
    };

    return (
        <View>
            <Modal //Whats On Now/Next
                isVisible={isVisible}
                animationInTiming={600}
                animationOutTiming={isIOS()?300:600}
            >
                <ScrollView style={styles.eventList}>
                    {
                        eventsList.map((event, idx) => {
                            return (<ListItem
                                key={idx}
                                bottomDivider
                                onPress={() => {
                                    if(!event.Venue) return;
                                    setSelectedGig({
                                        title: decode(event.Title),
                                        start: moment(event.startTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                                        end: moment(event.endTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                                        summary: event.Venue,
                                        detail: event.Detail ,
                                        thumbnail: event.Thumbnail,
                                        location: event.VenueDetails
                                    });
                                    toggleEventsModal();
                                    setTimeout(() => {toggleGigDetailModal()}, isIOS() ? 750 : 500);
                                }}
                            >
                                <Avatar 
                                    source={ event.Thumbnail ? { 
                                             uri: extractImage(event.Thumbnail) } : defaultLogo
                                    }
                                    rounded={true}
                                />
                                <ListItem.Title style={styles.eventsListItem}>{decode(event.Title)}</ListItem.Title>
                                <ListItem.Subtitle style={styles.eventsSubtitle}>
                                    {event.Venue ? decode(event.Venue) 
                                    + "\n" 
                                    + moment(event.Date).format('dddd') 
                                    + ", " 
                                    + moment(event.startTime, 'X').format('h:mma') 
                                    + " - " 
                                    + moment(event.endTime, 'X').format('h:mma') 
                                    : ""}
                                </ListItem.Subtitle>
                            </ListItem>
                            )
                        })
                    }
                    <Button 
                        buttonStyle={styles.backButtonBackGround} 
                        titleStyle={styles.backButtonText} 
                        title="Back" 
                        onPress={toggleEventsModal}
                    />
                </ScrollView>
            </Modal>
            <ModalGigDetail 
                isVisible={gigDetailModalIsVisible}
                gigObject={selectedGig}
                toggleGigDetailModal={toggleGigDetailModal}
                togglePreviousModal={toggleEventsModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    eventList: {
        padding: 10
    },
    backButtonBackGround: {
        backgroundColor: Colors.primaryColour,
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.secondaryColour
    },
    backButtonText: {
        color: Colors.secondaryColour,
    },
    eventsListItem: {
        color: Colors.primaryColour,
        fontWeight: 'bold',
        flex: 2
    },
    eventsSubtitle: {
        color: Colors.primaryColour,
        flex: 1
    }
});
