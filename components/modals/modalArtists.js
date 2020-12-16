import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import { WebView } from 'react-native-webview'
import moment from 'moment';

import Colors from '../../constants/Colors'
import {decode, extractImage} from '../Utilities'
import ModalArtistDetail from './modalArtistDetail'

const sliderWidth = Dimensions.get('window').width;

export default function ModalArtists(props) {
    const { 
        isVisible, 
        artistsDisplayList,
        artistsInfo, 
        toggleArtistsModal 
     } = props;


    const [ artistDetailModalIsVisible, setArtistDetailModalIsVisible ] = React.useState(false);
    const [ selectedArtist, setSelectedArtist ] = React.useState({});
  
    const toggleArtistDetailModal = () => {
        setArtistDetailModalIsVisible(!artistDetailModalIsVisible);
    };
 
    return (
      <View>
      <Modal //Artists
        isVisible={isVisible}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <View style={styles.artistList}>
            {
              artistsDisplayList.map((artist, idx) => {
                  return (<ListItem
                      key={idx}
                      leftAvatar={ artist.artistImage.length ? { 
                            source: { uri: extractImage(artist.artistImage) } ,
                            size: 'large'
                        } :
                        {
                            source: require('../../assets/images/DBJAB_logo_100x100.png') ,
                            size: 'large'
                        }
                      }
                      title={decode(artist.artistName)}
                      titleStyle={styles.artistsListItem}
                      topDivider={ idx == 0 ? false : true}
                      bottomDivider
                      onPress={() => {
                        setSelectedArtist({
                          title: decode(artist.artistName),
                          detail: artist.artistInfo,
                          thumbnail: artist.artistImage
                        });
                        toggleArtistsModal();
                        toggleArtistDetailModal();
                      }}
                    />
                  )
              })
            }
            <Button 
              buttonStyle={styles.backButtonBackGround} 
              titleStyle={styles.backButtonText} 
              title="Back" 
              onPress={toggleArtistsModal}
            />
        </View>
      </Modal>
      <ModalArtistDetail 
          isVisible={artistDetailModalIsVisible}
          artistObject={selectedArtist}
          toggleArtistDetailModal={toggleArtistDetailModal}
          togglePreviousModal={toggleArtistsModal}
      />
      </View>
    );
}

const styles = StyleSheet.create({
  backButtonBackGround: {
      backgroundColor: Colors.primaryColour,
      marginTop: 5,
      borderWidth: 1,
      width: sliderWidth-75,
      borderColor: Colors.secondaryColour
  },
  backButtonText: {
      color: Colors.secondaryColour,
  },
  artistsListItem: {
    color: Colors.primaryColour,
    fontWeight: 'bold'
  },
  artistList: {
    backgroundColor: Colors.backGroundPrimary,
    padding: 20,
  },
});

