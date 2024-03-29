import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './screens/Main';
import Fetch from './screens/Fetch';
import Upload from './screens/Upload';
import Videos from './screens/Videos';

const Stack = createStackNavigator();

function AppComponent() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Fetch Images" component={Fetch} />
      <Stack.Screen name="Upload File" component={Upload} />
	  <Stack.Screen name="Fetch Videos" component={Videos} />
    </Stack.Navigator>
  );
}

export default AppComponent;
