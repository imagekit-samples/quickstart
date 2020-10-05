import { StyleSheet} from 'react-native';

function getStyleSheet(cssProps){
	return StyleSheet.create({
		button : {
			height: 40, 
			width: cssProps.width || 100,
			backgroundColor: 'dodgerblue',
			justifyContent: 'center',
			alignItems: 'center',
		}
	})
}

export default getStyleSheet;