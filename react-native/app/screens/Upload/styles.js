import { StyleSheet} from 'react-native';

function getStyleSheet(cssProps){
	return StyleSheet.create({
		container : {
			flex : 1,
			alignItems : 'center',
			justifyContent : 'center',
		},
		buttonCssProps : {
			width : 150
		},
		captionView : {
			marginTop : 10
		}
	})
}

export default getStyleSheet;