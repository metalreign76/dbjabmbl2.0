import * as React from 'react';
import Modal from "react-native-modal";
import Accordion from 'react-native-collapsible/Accordion';
import { Button, Avatar } from 'react-native-elements'
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import {removeImageSizes, isIOS} from '../Utilities'
import defaultLogo from '../../assets/images/2023_app_logo_100_100.png';

import Colors from '../../constants/Colors'
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-size-scaling';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ModalNews(props) {
    const { 
        isVisible, 
        newsData, 
        toggleNewsModal 
     } = props;

    const [activeSection, setActiveSection] = React.useState([]);

     const AccordionSections = newsData.map((newsItem) => {
      return {
        title: newsItem.title.rendered,
        content: newsItem.content.rendered
      }
    })

    _renderHeader = (section) => {
      return (
        <View style={styles.sectionTitle}>
          <Avatar 
              source={ defaultLogo }
              rounded={true}
          />
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      );
    };
  
    _renderContent = (section) => {
      return (
          <RenderHtml
            contentWidth={windowWidth-75}
            source={{html: removeImageSizes(section.content)}}
            baseStyle={styles.overallContainer}
          />
      );
    };

    return (
      <Modal //News 
          isVisible={isVisible}
          animationInTiming={600}
          animationOutTiming={600}
          style={{width: '90%', alignContent: 'center'}}
      >
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Accordion
          sections={AccordionSections}
          activeSections={activeSection}
          touchableComponent={TouchableOpacity}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={setActiveSection}
          containerStyle={styles.accordionBackdrop}
          sectionContainerStyle={styles.sectionContainerStyle}
          duration={750}
        />
        <Button 
          buttonStyle={styles.backButtonBackGround} 
          titleStyle={styles.backButtonText} 
          title="Back" 
          onPress={toggleNewsModal}
        />
        </ScrollView>
      </Modal>
    );
}

const styles = StyleSheet.create({
    backButtonBackGround: {
        backgroundColor: Colors.primaryColour,
        borderWidth: 1,
        width: '100%',
        borderColor: Colors.secondaryColour,
        marginTop: 5
        
    },
    backButtonText: {
        color: Colors.secondaryColour,
    },
    accordionBackdrop: {
      backgroundColor: Colors.backGroundPrimary,
      width: '100%',
    },
    headerText: {
      color: Colors.primaryColour,
      fontWeight: isIOS() ? 600 : 'bold' ,
      marginLeft: 10,
      fontSize: 15,
    },
    sectionTitle: {
      marginBottom: 15,
      marginTop: 15,
      marginLeft: 5,
      flexDirection: 'row',
      flex: 1,
    },
    sectionContainerStyle: {
      borderColor: Colors.primaryColour,
      borderWidth: 1,
    },
    overallContainer: {
      backgroundColor: Colors.backGroundPrimary,
      borderWidth: 1,
      borderColor: Colors.primaryColour,
      paddingLeft: 5,
      fontSize: 13,
    },
    scrollViewStyle: {
    }
});
