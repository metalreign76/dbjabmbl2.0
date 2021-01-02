import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { View, StyleSheet, Dimensions } from 'react-native';
import EventCalendar from 'react-native-events-calendar'
import moment from 'moment';
import { decode } from '../Utilities'
import ModalGigDetail from './modalGigDetail'

import Colors from '../../constants/Colors'

export default function ModalGigSchedule(props) {
    const { 
        isVisible, 
        allEvents,
        toggleGigScheduleModal,
        togglePrevModal
    } = props;

    // console.log("********", allEvents);

    const [ gigDetailModalIsVisible, setGigDetailModalIsVisible ] = React.useState(false);
    const [ selectedGig, setSelectedGig ] = React.useState({});
  
    const [ gigsList, setGigsList ] = React.useState([]);
    const [ festivalStart, setfestivalStart ] = React.useState(moment().format('YYYY-MM-DD'))

    const toggleGigDetailModal = () => {
        setGigDetailModalIsVisible(!gigDetailModalIsVisible);
    };

    const toggleBackToPrevDisplay = () => {
        toggleGigScheduleModal();
        if(togglePrevModal) togglePrevModal();
    }
    
    let startDate = moment().format('YYYY-MM-DD');

    React.useEffect(() => {
        let tmpGigList = [];
        tmpGigList = allEvents.map((gigDetail) => {
            return {
                title: decode(gigDetail.Title),
                start: moment(gigDetail.startTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                end: moment(gigDetail.endTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                summary: gigDetail.Venue,
                detail: gigDetail.Detail,
                thumbnail: gigDetail.Thumbnail,
                location: gigDetail.VenueDetails
            }
        });
        startDate = allEvents.reduce((earliestDate, gig) => {
            let maybeEarlier = moment(gig.startTime, 'X').format('YYYY-MM-DD')
            if(maybeEarlier < earliestDate)
                return maybeEarlier;
            else 
                return earliestDate;
        }, '2099-01-01');
        setGigsList(tmpGigList);
        setfestivalStart(startDate);
    }, [allEvents])

    return (
        <View>
            <Modal
                isVisible={isVisible}
                animationInTiming={600}
                animationOutTiming={600}
            >
                <EventCalendar
                    events={gigsList}
                    width={Dimensions.get('window').width-45}
                    initDate={festivalStart}
                    size={3}
                    eventTapped={(gigDetail) => {
                        setSelectedGig(gigDetail);
                        toggleGigScheduleModal();
                        toggleGigDetailModal();
                    }}
                    styles={
                            {
                                eventTitle: {
                                    color : Colors.primaryColour
                                },
                                eventSummary: {
                                    color : Colors.primaryColour
                                },
                                eventTimes: {
                                    color : Colors.primaryColour
                                },
                                event: {
                                    borderColor: Colors.primaryColour,
                                    backgroundColor: Colors.secondaryColour
                                }
                            }                    
                    }
                />
                <Button 
                    buttonStyle={styles.backButtonBackGround} 
                    titleStyle={styles.backButtonText} 
                    title="Back" 
                    onPress={toggleBackToPrevDisplay    }
                />
            </Modal>
            <ModalGigDetail 
                isVisible={gigDetailModalIsVisible}
                gigObject={selectedGig}
                toggleGigDetailModal={toggleGigDetailModal}
                togglePreviousModal={toggleGigScheduleModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    backButtonBackGround: {
        backgroundColor: Colors.primaryColour,
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.secondaryColour
    },
    backButtonText: {
        color: Colors.secondaryColour,
    }
});
