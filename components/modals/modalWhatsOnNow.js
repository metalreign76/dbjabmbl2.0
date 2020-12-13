import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import EventsList from '../EventsList'
import { StyleSheet, View } from 'react-native';

import Colors from '../../constants/Colors'

export default function ModalWhatsOnNow(props) {
    const { 
        isVisible, 
        modalEventsList, 
        toggleEventDetailModal, 
        toggleEventsModal 
     } = props;

    return (
        <Modal //Whats On Now/Next
            isVisible={isVisible}
            animationInTiming={600}
            animationOutTiming={600}
        >
            <View style={styles.eventList}>
            <EventsList data={modalEventsList} toggle={toggleEventDetailModal}/>
            <Button 
                buttonStyle={styles.closeButtonBackGround} 
                titleStyle={styles.closeButtonText} 
                title="Close" 
                onPress={toggleEventsModal}
            />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    eventList: {
        backgroundColor: Colors.backGroundPrimary,
        padding: 20,
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
});
