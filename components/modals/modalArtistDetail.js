import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import moment from 'moment';
import { WebView } from 'react-native-webview'
import Colors from '../../constants/Colors'

export default function ModalArtistDetail(props) {
    const { 
        isVisible, 
        artistObject,
        toggleArtistDetailModal,
        togglePreviousModal
    } = props;

    const [ artistDetails, setArtistDetails ] = React.useState();

    React.useEffect(() => {
        if(artistObject.detail) {
            let artistDetailstr = "";
            artistDetailstr += `<H3>${artistObject.title}</H3>`;
            artistDetailstr += `<img src='${artistObject.thumbnail}'/>`
            artistDetailstr += artistObject.detail;
            setArtistDetails(artistDetailstr);
        }
    }, [artistObject])

    return (
        <Modal
            isVisible={isVisible}
            animationInTiming={300}
            animationOutTiming={300}
        >
            <WebView
                source={{ html: artistDetails}}
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
                    toggleArtistDetailModal();
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
  