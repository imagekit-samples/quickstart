import React from 'react';
import { Text, TouchableOpacity} from 'react-native';
import getStyleSheet from './styles';

function Button (props) {
	let styleSheet = getStyleSheet(props.cssProps || {});
	return (
		<TouchableOpacity onPress={props.onPress} style={styleSheet.button}> 
			<Text style={styleSheet.text}>{props.children}</Text>
		</TouchableOpacity >
	);
};

export default Button;
