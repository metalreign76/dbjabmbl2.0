import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { Dimensions } from 'react-native';
import Colors from '../../constants/Colors'
import { isIOS } from '../Utilities';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import { StyleSheet } from 'react-native-size-scaling';

const windowWidth = Dimensions.get('window').width;

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
            animationInTiming={600}
            animationOutTiming={isIOS()?300:600}
            style={{width: '90%', alignSelf: 'center'}}
        >
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <RenderHTML
                source={{ html: artistDetails}}
                contentWidth={windowWidth-75}
                baseStyle={styles.overallContainer}
            />
            <Button 
                buttonStyle={styles.backButtonBackGround} 
                titleStyle={styles.backButtonText} 
                title="Back" 
                onPress={() => {
                    setTimeout(() => {togglePreviousModal()}, isIOS() ? 750 : 500);
                    toggleArtistDetailModal();
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