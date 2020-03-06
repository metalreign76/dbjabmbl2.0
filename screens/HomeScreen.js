import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import HomeNavButton from '../components/HomeNavButton'

const buttonList = [
  {
    id: 1,
    navText: "What's On Now",
    icon: "play",
  },
  {
    id: 2,
    navText: "What's On Next",
    icon: "skip-forward",
  },
  {
    id: 3,
    navText: "News",
    icon: "paper",
  },
  {
    id: 4,
    navText: "Gig Schedule",
    icon: "musical-notes",
  },
  {
    id: 5,
    navText: "Gigs By Venue",
    icon: "restaurant",
  },
  {
    id: 6,
    navText: "Favourites",
    icon: "heart",
  },
]

const navButtonArray = buttonList.map(button => {
  return <HomeNavButton 
    key={button.id} 
    text={button.navText} 
    icon={button.icon}
  />
})

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {navButtonArray}
      </ScrollView>
    </View>
  );
}

// HomeScreen.navigationOptions = {
//   header: null,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backGroundPrimary,
  },
  contentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
  },
});
