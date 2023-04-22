import * as React from 'react';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import { StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview'
import {removeImageSizes, extractImage} from '../Utilities'

import Colors from '../../constants/Colors'

const sliderWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ModalNews(props) {
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
      <GestureHandlerRootView>
          <Carousel
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
              loop={false}
              width={sliderWidth-40}
              height={windowHeight-50}
              data={newsData}
              scrollAnimationDuration={1000}
              renderItem={renderNewsItem}
              panGestureHandlerProps={{
                activeOffsetX: [-50, 50],
              }}
          />
      </GestureHandlerRootView>
      <Button 
        buttonStyle={styles.backButtonBackGround} 
        titleStyle={styles.backButtonText} 
        title="Back" 
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
    backButtonBackGround: {
        backgroundColor: Colors.primaryColour,
        marginLeft: 20,
        borderWidth: 1,
        width: sliderWidth-75,
        borderColor: Colors.secondaryColour
        
    },
    backButtonText: {
        color: Colors.secondaryColour,
    },
});
