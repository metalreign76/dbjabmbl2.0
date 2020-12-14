import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { WebView } from 'react-native-webview'
import {removeImageSizes, extractImage} from '../Utilities'

import Colors from '../../constants/Colors'

const sliderWidth = Dimensions.get('window').width;

export default function ModalWhatsOnNow(props) {
    const { 
        isVisible, 
        newsData, 
        toggleNewsModal 
     } = props;

    return (
        <Modal //News
        isVisible={isVisible}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <Carousel
              data={newsData}
              renderItem={renderNewsItem}
              sliderWidth={sliderWidth}
              itemWidth={sliderWidth-75}
              activeSlideAlignment={'start'}
              useScrollView={true}
        />
        <Button 
          buttonStyle={styles.closeButtonBackGround} 
          titleStyle={styles.closeButtonText} 
          title="Close" 
          onPress={toggleNewsModal}
        />
      </Modal>
    );
}

  
const renderNewsItem = ({item, index}) => {
    return (
      <WebView
        source={{ html: removeImageSizes(item.content.rendered)}}
        contentInset={{top: 10, left: 5, bottom: 10, right: 5}}
        style={{backgroundColor: '#fff'}}
        scalesPageToFit={false}
      />
    )
  }


const styles = StyleSheet.create({
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
