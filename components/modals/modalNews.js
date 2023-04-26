import * as React from 'react';
import Modal from "react-native-modal";
import Accordion from 'react-native-collapsible/Accordion';
import { Button, Avatar } from 'react-native-elements'
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import {removeImageSizes} from '../Utilities'
import defaultLogo from '../../assets/images/DBJAB_logo_100x100.png';

import Colors from '../../constants/Colors'
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';

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
        alignSelf: 'center',
        borderWidth: 1,
        width: windowWidth-75,
        borderColor: Colors.secondaryColour,
        marginTop: 5
        
    },
    backButtonText: {
        color: Colors.secondaryColour,
    },
    accordionBackdrop: {
      backgroundColor: Colors.backGroundPrimary,
      width: windowWidth-75,
      alignSelf: 'center',
    },
    headerText: {
      color: Colors.primaryColour,
      fontWeight: 'bold' ,
      marginLeft: 10,
      alignSelf: 'center'
    },
    sectionTitle: {
      marginBottom: 15,
      marginTop: 15,
      marginLeft: 5,
      flexDirection: 'row',
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
    },
    scrollViewStyle: {
    }
});
