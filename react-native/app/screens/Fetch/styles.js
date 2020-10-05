import { StyleSheet} from 'react-native';

function getStyleSheet(cssProps){
	return StyleSheet.create({
		btnContainer : {
			flex : 1,
			alignItems : 'stretch',
			justifyContent : 'center',
		},
		imgContainer : {
			flex : 3,
			alignItems : 'center',
			justifyContent : 'flex-start',
		},
		btnView : {
			flexDirection : 'row',
			justifyContent : 'space-evenly',
			alignItems : 'center',
			marginTop : 10,
			marginBottom : 10,
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