import * as React from 'react';
import { Image,   Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import Colors  from './constants/Colors'
import {useGlobal} from 'reactn';
import wpAPI from 'wpapi'

import useLinking from './navigation/useLinking';

const eventsAPI = 'https://5amdysgq4a.execute-api.eu-west-1.amazonaws.com/default/dbJabEvents';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [eventsData, setEventsData] = useGlobal('EVENTS');
  const [newsData, setNewsData] = useGlobal('NEWS');
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [ eventsLoaded, setEventsLoaded ] = React.useState(false);

  var apiData;
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
//          Ionicons: Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });

        await Asset.loadAsync([ 
          require('./assets/images/banner2.png'),
          require('./assets/images/DBJAB_logo_100x100.png'),
        ]);
  

        //Load events
        if(!eventsLoaded) {
          var response = await fetch(eventsAPI);
          apiData = await response.json();
          console.log("Events:", JSON.parse(apiData.body));
          setEventsData(JSON.parse(apiData.body));  
          setEventsLoaded(true);
        }


        //Load News       
        var wp = new wpAPI({ endpoint: 'http://www.dannyboyjazzandblues.com/wp-json' })
        const thisYear = new Date().getFullYear();
        var news = await wp.posts().categories( 3 ).perPage( 5 ).param( 'after', new Date(thisYear + '-01-01' ))
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
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator
              screenOptions={{
                header: ( props =>  
                <Image 
                  source={require('./assets/images/banner2.png')}
                  style={styles.imageHeader}
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
    backgroundColor: '#fff',
  },
  imageHeader: {
    marginTop: 20, 
    width: "100%", 
    height: 170, 
    backgroundColor: Colors.backGroundPrimary,
  }
});
