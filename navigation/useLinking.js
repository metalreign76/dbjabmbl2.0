// import { useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default function() {
  return  {
    prefixes: [Linking.createURL('/')]
  };
}
