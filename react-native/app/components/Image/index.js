import React from 'react';
import { Image as RNImage } from 'react-native';
import getStyleSheet from './styles';

function Image(props) {
	let styleSheet = getStyleSheet(props.cssProps || {});

	return (
		<RNImage 
			source={props.source} 
			style={props.style}
		/>
	);
};

export default Image;
