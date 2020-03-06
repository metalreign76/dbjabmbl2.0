import * as React from 'react';
import { Image,   Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import Colors  from './constants/Colors'

import useLinking from './navigation/useLinking';

const eventsAPI = 'https://5amdysgq4a.execute-api.eu-west-1.amazonaws.com/default';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [eventsData, setEventsData] = React.useState([]);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  var apiData;
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });

        await Asset.loadAsync([ 
          require('./assets/images/banner2.png'),
        ]);
  

        //Load events
        console.log("Calling API....")
        // var response = await fetch(eventsAPI);
        // apiData = await response.json();
        // setEventsData(apiData);

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

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
    height: 150, 
    backgroundColor: Colors.backGroundPrimary,
  }
});
