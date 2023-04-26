import * as React from 'react';
import { Image,   Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import Colors  from './constants/Colors'
import {useGlobal} from 'reactn';
import wpAPI from 'wpapi'

import useLinking from './navigation/useLinking';

const eventsAPI = 'https://5amdysgq4a.execute-api.eu-west-1.amazonaws.com/default/dbJabEvents';

const homePageImageHeight=170;
const Stack = createNativeStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [eventsData, setEventsData] = useGlobal('EVENTS');
  const [newsData, setNewsData] = useGlobal('NEWS');
  const [ eventsLoaded, setEventsLoaded ] = React.useState(false);

  var apiData;
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load our initial navigation state
        setInitialNavigationState(useLinking());

        // Load fonts
        await Font.loadAsync({
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'Helvetica Neue': require('./assets/fonts/HelveticaNeueBlack.otf'),
        });

        await Asset.loadAsync([ 
          require('./assets/images/2023_app_banner.png'),
          require('./assets/images/2023_app_splash_white.png'),
          require('./assets/images/DBJAB_logo_100x100.png'),
          require('./assets/images/musicNoteMarker.png'),
          require('./assets/images/musicNoteMarker-android.png')
        ]);
  

        //Load events
        if(!eventsLoaded) {
          var response = await fetch(eventsAPI);
          apiData = await response.json();
          setEventsData(JSON.parse(apiData.body));  
          setEventsLoaded(true);
        }


        //Load News       
        var wp = new wpAPI({ endpoint: 'http://www.dannyboyjazzandblues.com/wp-json' })
        const thisYear = new Date().getFullYear();
        var news = await wp.posts().categories( 3 ).perPage( 5 ).param( 'after', new Date(thisYear + '-03-01' ))
        setNewsData(news);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, [eventsData]);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;

  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer linking={initialNavigationState} fallback={<Text>Loading...</Text>}>
          <Stack.Navigator
              screenOptions={{
                header: ( props =>  
                <Image 
                  source={require('./assets/images/2023_app_banner.png')}
                  style={{...styles.imageHeader, height: homePageImageHeight}}
                  resizeMode='contain'
                />),
              }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backGroundPrimary,
  },
  imageHeader: {
    marginTop: 20, 
    width: "100%", 
    backgroundColor: Colors.backGroundPrimary,
  }
});
