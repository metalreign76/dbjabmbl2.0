import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { StyleSheet } from 'react-native';
import moment from 'moment';
import { WebView } from 'react-native-webview'
import Colors from '../../constants/Colors'

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
            animationOutTiming={600}
        >
            <WebView
                source={{ html: eventDetails}}
                contentInset={{top: 10, left: 5, bottom: 10, right: 5}}
                style={{
                    backgroundColor: Colors.backGroundPrimary
                }}
                scalesPageToFit={false}
            />
            <Button 
                buttonStyle={styles.backButtonBackGround} 
                titleStyle={styles.backButtonText} 
                title="Back" 
                onPress={() => {
                    toggleGigDetailModal();
                    togglePreviousModal();
                }}
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
    }
});
  