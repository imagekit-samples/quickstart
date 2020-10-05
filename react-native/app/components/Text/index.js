import React from 'react';
import { Text as RNText } from 'react-native';
import getStyleSheet from './styles';

function Text(props) {
	let styleSheet = getStyleSheet(props.cssProps || {});

	return (
		<RNText style={styleSheet.text}>{props.children}</RNText>
	);
};

export default Text;
