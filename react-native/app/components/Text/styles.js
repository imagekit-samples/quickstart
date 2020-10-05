import { StyleSheet} from 'react-native';

function getStyleSheet(cssProps){
	return StyleSheet.create({
		text : {
			color: cssProps.color || 'black', 
			fontSize: cssProps.fontSize || 15
		}
	})
}

export default getStyleSheet;