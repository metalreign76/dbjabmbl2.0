import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { StyleSheet, Dimensions } from 'react-native';
import EventCalendar from 'react-native-events-calendar'
import moment from 'moment';

import Colors from '../../constants/Colors'

export default function ModalGigSchedule(props) {
    const { 
        isVisible, 
        allEvents,
        toggleGigScheduleModal
    } = props;

    const [ gigsList, setGigsList ] = React.useState([]);
    const [ festivalStart, setfestivalStart ] = React.useState(moment().format('YYYY-MM-DD'))

    let startDate = moment().format('YYYY-MM-DD');

    React.useEffect(() => {
        let tmpGigList = [];
        tmpGigList = allEvents.map((gigDetail) => {
            return {

                title: gigDetail.Title,
                start: moment(gigDetail.startTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                end: moment(gigDetail.endTime, 'X').format('YYYY-MM-DD HH:mm:00'),
                summary: gigDetail.Venue
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
        console.log('Events', tmpGigList);
        console.log('First Gig', startDate)
    }, allEvents)

    return (
        <Modal
            isVisible={isVisible}
            animationInTiming={300}
            animationOutTiming={300}
        >
            <EventCalendar
                events={gigsList}
                width={Dimensions.get('window').width-45}
                style={styles.calendarView}
                initDate={festivalStart}
                size={3}
            />
            <Button 
                buttonStyle={styles.backButtonBackGround} 
                titleStyle={styles.backButtonText} 
                title="Back" 
                onPress={toggleGigScheduleModal}
            />
        </Modal>
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
    },
    calendarView: {
        fontFamily: 'space-mono'
    }
});
