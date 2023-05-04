import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../../constants/Colors'
import {decode, isIOS} from '../Utilities';
import { StyleSheet } from 'react-native-size-scaling';

const mapWidth = Dimensions.get('window').width-80;
const mapHeight = Dimensions.get('window').height-100;

export default function ModalVenuesMap(props) {
    const { 
        isVisible, 
        venuesList,
        toggleVenuesMapModal 
     } = props;

    const [ mapRegion, SetMapRegion ] = React.useState({
      latitude: 55.052288,
      longitude: -6.956111,
      latitudeDelta: -0.002209,
      longitudeDelta: 0.024462
    })
 
    return (
      <View>
      <Modal //Venues Map
        isVisible={isVisible}
        animationInTiming={600}
        animationOutTiming={600}
        style={{alignContent: 'center', width: '95%'}}
      >
        <View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 55.051635,
                longitude: -6.951036,
                latitudeDelta: 0.0004,
                longitudeDelta: 0.01          
              }}
            >
              {
                venuesList.map((venue, idx) => {
                  return (
                    <Marker
                      key={idx}
                      coordinate={{
                        latitude: venue.venueLat,
                        longitude: venue.venueLong,
                      }}
                      title={decode(venue.venueName)}
                      description={venue.venueAddr}
                      image={require('../../assets/images/musicNoteMarker.png')}
                    />
                  )
                })
              }
            </MapView>
            <Button 
              buttonStyle={styles.backButtonBackGround} 
              titleStyle={styles.backButtonText} 
              title="Back" 
              onPress={toggleVenuesMapModal}
            />
        </View>
      </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  backButtonBackGround: {
      backgroundColor: Colors.primaryColour,
      marginTop: 5,
      borderWidth: 1,
      width: '95%',
      borderColor: Colors.secondaryColour
  },
  backButtonText: {
      color: Colors.secondaryColour,
  },
  map: {
    width: '95%',
    height: '90%'
  }

});
