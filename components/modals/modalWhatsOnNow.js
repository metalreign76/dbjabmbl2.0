import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'
import moment from 'moment';

import ModalGigDetail from './modalGigDetail'

import {decode, extractImage} from '../Utilities'
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
                animationOutTiming={600}
            >
                <ScrollView style={styles.eventList}>
                    {
                        eventsList.map((event, idx) => {
                            return (<ListItem
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
                                subtitle={event.Venue ? event.Venue 
                                    + "\n" 
                                    + moment(event.Date).format('dddd') 
                                    + ", " 
                                    + moment(event.startTime, 'X').format('h:mma') 
                                    + " - " 
                                    + moment(event.endTime, 'X').format('h:mma') 
                                    : ""}
                                subtitleStyle={styles.eventsSubtitle}
                                bottomDivider
                                onPress={() => {
                                    if(!event.Venue) return;
                                    setSelectedGig({
                                        title: decode(event.Title),
                                        start: moment(event.startTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                                        end: moment(event.endTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                                        summary: event.Venue,
                                        detail: event.Detail,
                                        thumbnail: event.Thumbnail,
                                        location: event.VenueDetails
                                    });
                                    toggleEventsModal();
                                    toggleGigDetailModal();
                                }}
                            />
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
        padding: 10,
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
        fontWeight: 'bold'
    },
    eventsSubtitle: {
        color: Colors.primaryColour,
    }
});
