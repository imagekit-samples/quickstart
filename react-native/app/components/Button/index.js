import React from 'react';
import { TouchableOpacity} from 'react-native';
import RNText from '../Text/';
import getStyleSheet from './styles';

function Button (props) {
	let styleSheet = getStyleSheet(props.cssProps || {});

	let textCssProps = {
		color : 'white'
	}

	return (
		<TouchableOpacity onPress={props.onPress} style={styleSheet.button}> 
			<RNText cssProps={textCssProps}>{props.children}</RNText>
		</TouchableOpacity >
	);
};

export default Button;
