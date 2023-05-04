import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { Dimensions } from 'react-native';
import moment from 'moment';
import Colors from '../../constants/Colors'
import { isIOS } from '../Utilities';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-size-scaling';
import RenderHtml from 'react-native-render-html';

const windowWidth = Dimensions.get('window').width;

export default function ModalGigDetail(props) {
    const { 
        isVisible, 
        gigObject,
        toggleGigDetailModal,
        togglePreviousModal
    } = props;

    const [ eventDetails, setEventDetails ] = React.useState();

    React.useEffect(() => {
        if(gigObject.detail) {
            let eventDetailStr = "";
            eventDetailStr += `<H3>${gigObject.title}</H3>`;
            eventDetailStr += `<H4>@ ${gigObject.summary} (`;
            eventDetailStr += moment(gigObject.start).format('h:mma');
            eventDetailStr += `-`;
            eventDetailStr += moment(gigObject.end).format('h:mma');
            eventDetailStr += `)</H4>`;
            eventDetailStr += gigObject.thumbnail + gigObject.detail;
            setEventDetails(eventDetailStr);
        }
    }, [gigObject])

    return (
        <Modal
            isVisible={isVisible}
            animationInTiming={600}
            animationOutTiming={isIOS()?300:600}
            style={{width: '90%', alignSelf: 'center'}}
            >
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <RenderHtml
                source={{ html: eventDetails}}
                contentWidth={windowWidth-75}
                baseStyle={styles.overallContainer}
            />
            <Button 
                buttonStyle={styles.backButtonBackGround} 
                titleStyle={styles.backButtonText} 
                title="Back" 
                onPress={() => {
                    toggleGigDetailModal();
                    if(togglePreviousModal) setTimeout(() => {togglePreviousModal()}, isIOS() ? 750 : 500);
                }}
            />
            </ScrollView>
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
    overallContainer: {
      borderWidth: 1,
      borderColor: Colors.primaryColour,
      backgroundColor: Colors.backGroundPrimary,
      paddingLeft: 5,
    },
    scrollViewStyle: {
    }
});
  