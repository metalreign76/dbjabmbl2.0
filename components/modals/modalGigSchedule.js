import * as React from 'react';
import {useGlobal} from 'reactn';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { View, Text } from 'react-native';
import WeekView from 'react-native-week-view';
import moment from 'moment';
import { decode, isIOS } from '../Utilities'
import ModalGigDetail from './modalGigDetail'
import { StyleSheet } from 'react-native-size-scaling';

import Colors from '../../constants/Colors'

export default function ModalGigSchedule(props) {
    const { 
        isVisible, 
        allEvents,
        toggleGigScheduleModal,
        togglePrevModal
    } = props;

    const [festivalStartDate] = useGlobal('FESTIVALSTART')
    const [ gigDetailModalIsVisible, setGigDetailModalIsVisible ] = React.useState(false);
    const [ selectedGig, setSelectedGig ] = React.useState({});
  
    const [ gigsList, setGigsList ] = React.useState([]);

    const toggleGigDetailModal = () => {
        setGigDetailModalIsVisible(!gigDetailModalIsVisible);
    }

    const toggleBackToPrevDisplay = () => {
        toggleGigScheduleModal();
        if(togglePrevModal) setTimeout(() => {togglePrevModal()}, isIOS() ? 750 : 500);
    }

    React.useEffect(() => {
        let tmpGigList = [];
        tmpGigList = allEvents.map((gigDetail, idx) => {
            return {
                id: gigDetail.ID,
                idx: idx,
                title: decode(gigDetail.Title),
                description: decode(gigDetail.Venue),
                startDate: new Date(moment.utc(gigDetail.startTime, 'X').format('YYYY-MM-DD HH:mm:00')),
                endDate: new Date(moment.utc(gigDetail.endTime, 'X').format('YYYY-MM-DD HH:mm:00')),
                color: Colors.calendarColours[idx%2],
                start: moment.utc(gigDetail.startTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                end: moment.utc(gigDetail.endTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                summary: decode(gigDetail.Venue),
                detail: gigDetail.Detail,
                thumbnail: gigDetail.Thumbnail,
                location: gigDetail.VenueDetails,
                style: { borderColor: 'white', borderWidth: 1 }
            }
        });
        setGigsList(tmpGigList);
    }, [allEvents])

    const MyEventComponent = ({ event }) => (
        <>
            <Text style={{...styles.eventTitle, color: Colors.calendarTextColours[event.color]}}>
                {event.title}
            </Text>
            <Text style={{...styles.eventLocation, color: Colors.calendarTextColours[event.color] }}>
                {event.description}
            </Text>
        </>
    );
    
    let numDays = 1;
    if(togglePrevModal) numDays = 3;

    return (
        <View>
            <Modal
                isVisible={isVisible}
                animationInTiming={600}
                animationOutTiming={isIOS()?300:600}
                style={styles.container}
            >
                <WeekView
                    events={gigsList}
                    selectedDate={new Date(festivalStartDate)}
                    numberOfDays={numDays}
                    showNowLine
                    allowScrollByDay
                    hoursInDisplay={12}
                    headerStyle={styles.header}
                    headerTextStyle={styles.headerText}
                    hourTextStyle={styles.hourText}
                    hourContainerStyle={styles.hourContainer}
                    gridColumnStyle={styles.gridColumn}
                    gridRowStyle={styles.gridRow}
                    beginAgendaAt={12*60}
                    EventComponent={MyEventComponent}
                    onEventPress={(event) => {
                        setSelectedGig(gigsList[event.idx]);
                        toggleGigScheduleModal();
                        setTimeout(() => {toggleGigDetailModal()}, isIOS()?750:500);
                    }}
                />
                <Button 
                    buttonStyle={styles.backButtonBackGround} 
                    titleStyle={styles.backButtonText} 
                    title="Back" 
                    onPress={toggleBackToPrevDisplay}
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
        marginTop: 1,
        borderWidth: 1,
        borderColor: Colors.secondaryColour
    },
    backButtonText: {
        color: Colors.secondaryColour,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundPrimary,
        width: '90%', 
        alignSelf: 'center'
    },
    header: {
        backgroundColor: Colors.primaryColour,
        borderColor: Colors.backGroundPrimary,
    },
        headerText: {
        color: Colors.secondaryColour,
    },
    hourContainer: {
        backgroundColor: Colors.primaryColour
    },
    hourText: {
        color: Colors.secondaryColour
    },
    eventTitle: {
        fontWeight: 'bold', 
        fontSize: 11,
    },
    eventLocation: {
        fontStyle: 'italic', 
        fontSize: 10,
    }
});
