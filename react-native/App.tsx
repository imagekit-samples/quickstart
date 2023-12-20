import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppComponent from './app/AppComponent';

function App() {
	return (
		<SafeAreaView style={{flex : 1}}>
			<NavigationContainer>
				<AppComponent />
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default App;
