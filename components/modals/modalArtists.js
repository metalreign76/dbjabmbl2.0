import * as React from 'react';
import {useGlobal} from 'reactn';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native-size-scaling';

import Colors from '../../constants/Colors'
import {decode, extractImage, isIOS} from '../Utilities'
import ModalArtistDetail from './modalArtistDetail'
import ModalGigSchedule from './modalGigSchedule';
import GestureRecognizer from 'react-native-swipe-gestures';

const sliderWidth = Dimensions.get('window').width;

export default function ModalArtists(props) {
    const { 
        isVisible, 
        artistsDisplayList,
        artistsInfo, 
        toggleArtistsModal,
        gigsByArtistFlag
     } = props;


    const [ artistDetailModalIsVisible, setArtistDetailModalIsVisible ] = React.useState(false);
    const [ gigScheduleModalIsVisible, setGigScheduleModalIsVisible ] = React.useState(false);
    const [ selectedArtist, setSelectedArtist ] = React.useState({gigs: []});
  
    const toggleArtistDetailModal = () => {
       setArtistDetailModalIsVisible(!artistDetailModalIsVisible);
    };

    const toggleGigScheduleModal = () => {
      setGigScheduleModalIsVisible(!gigScheduleModalIsVisible);
    }

    return (
      <View>
      <GestureRecognizer
            onSwipeLeft={toggleArtistsModal}
      >
      <Modal //Artists
        isVisible={isVisible}
        animationInTiming={600}
        animationOutTiming={isIOS()?300:600}
        style={{width: '90%', alignSelf: 'center'}}
      >
        <ScrollView style={styles.artistList}>
            {
              artistsDisplayList.map((artist, idx) => {
                  return (<ListItem
                      key={idx}
                      topDivider={ idx == 0 ? false : true}
                      bottomDivider
                      onPress={() => {
                        setSelectedArtist({
                          title: decode(artist.artistName),
                          detail: artist.artistInfo,
                          thumbnail: artist.artistImage,
                          gigs: artistsInfo[decode(artist.artistName)].artistGigs
                        });       
                        toggleArtistsModal();
                        if(gigsByArtistFlag)
                          setTimeout(() => {toggleGigScheduleModal();}, isIOS()?750 : 500);
                        else
                          setTimeout(() => {toggleArtistDetailModal();}, isIOS()?750 : 500);
                      }}
                    >
                        <Avatar 
                            source={ artist.artistImage.length ? { 
                                      uri: extractImage(artist.artistImage) } :
                                      require('../../assets/images/2023_app_logo_100_100.png')
                            }
                            rounded={true}
                        />
                        <ListItem.Title style={styles.artistsListItem}>{decode(artist.artistName)}</ListItem.Title>
                    </ListItem>
                  )
              })
            }
            <Button 
              buttonStyle={styles.backButtonBackGround} 
              titleStyle={styles.backButtonText} 
              title="Back" 
              onPress={toggleArtistsModal}
            />
        </ScrollView>
      </Modal>
      <ModalArtistDetail 
          isVisible={artistDetailModalIsVisible}
          artistObject={selectedArtist}
          togglePreviousModal={toggleArtistsModal}
          toggleArtistDetailModal={toggleArtistDetailModal}
      />
    </GestureRecognizer>
      <ModalGigSchedule 
        isVisible={gigScheduleModalIsVisible} 
        allEvents={selectedArtist.gigs}
        togglePrevModal={toggleArtistsModal}
        toggleGigScheduleModal={toggleGigScheduleModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButtonBackGround: {
      backgroundColor: Colors.primaryColour,
      marginTop: 5,
      marginBottom: 5,
      borderWidth: 1,
      padding: 10,
      borderColor: Colors.secondaryColour
  },
  backButtonText: {
      color: Colors.secondaryColour,
  },
  artistsListItem: {
    color: Colors.primaryColour,
    fontWeight: isIOS() ? 600 : 'bold',
    fontSize: 14,
    flex: 1,
  },
  artistList: {
    padding: 5,
  },
});

