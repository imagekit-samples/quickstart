import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Button from '../../components/Button/';
import Image from '../../components/Image/';
import Text from '../../components/Text/';
import getStyleSheet from './styles';

import { getImagekitUrlFromSrc, getImagekitUrlFromPath } from '../../lib/imagekit';
import { urlEndpoint } from '../../config/imagekit';

function Fetch() {
	let styleSheet = getStyleSheet({});
	
	var imagePath = "/default.jpg";
	var imageSrc = urlEndpoint+imagePath;
	
	const [imageUrl, setImageUrl] = useState();
	const [currentTr, setCurrentTr] = useState();

	useEffect(() => {
		showTransformedImage(currentTr);
	}, [currentTr])

	function showTransformedImage(transformationType) {
		var transformationArr = [];
		var transformedImageUrl;

		switch (transformationType){
			case 'Transformation 1' : //crop mode and url from source
				transformationArr = [{
					"height": 200,
					"width": 300,
					"cropMode" : "pad_resize",
					"background" : "F3F3F3"
				}];
				transformedImageUrl = getImagekitUrlFromSrc(imageSrc, transformationArr);
				break;

			case 'Transformation 2' : //aspect ration and url from path and transformations as query param
				imageSrc = "https://ik.imagekit.io/demo/default-image.jpg";
				transformationArr = [{
					"height": 400,
					"aspectRatio" : "3-2"
				}];
				transformedImageUrl = getImagekitUrlFromPath(imagePath, transformationArr, "query");
				break;


			case 'Transformation 3' :  //blur and readius
				transformationArr = [{
					"blur" : 5,
					"radius" : 50
				}];
				transformedImageUrl = getImagekitUrlFromSrc(imageSrc, transformationArr);
				break;

			case 'Transformation 4' : //overlay image with x,y and its height
				transformationArr = [{
					"overlayImage": "plant.jpeg",
					"overlayX" : 50,
					"overlayY" : 50,
					"overlayHeight" : 100,
				}];
				transformedImageUrl = getImagekitUrlFromPath(imagePath, transformationArr);
				break;

			case 'Transformation 5' :  //overlay text example
				transformationArr = [{
					"overlayText": 'ImageKit',
					"overlayTextFontSize": 50,
					"overlayTextColor": '0651D5',
					"overlayX" : 50,
					"overlayY" : 20
				}];
				transformedImageUrl = getImagekitUrlFromSrc(imageSrc, transformationArr);
				break;

			case 'Transformation 6' : //chained transformation
				transformationArr = [{
					"height": 300,
					"width" : 300
				}, {
					"rotation" : "90"
				}];
				transformedImageUrl = getImagekitUrlFromSrc(imageSrc, transformationArr);
				break;
			 
			default : 
				transformedImageUrl = getImagekitUrlFromSrc(imageSrc, []);
				break;
		}

		setImageUrl(transformedImageUrl);
	}

	return (
		<>
			<View style={styleSheet.btnContainer}>
				<View style={styleSheet.btnView}>
					<Button 
						cssProps={styleSheet.buttonCssProps} 
						onPress={() => setCurrentTr('Transformation 1')}
					>
						Transformation 1
					</Button>
					<Button 
						cssProps={styleSheet.buttonCssProps} 
						onPress={() => setCurrentTr('Transformation 2')}
					>
						Transformation 2
					</Button>
				</View>
				<View style={styleSheet.btnView}>
					<Button 
						cssProps={styleSheet.buttonCssProps} 
						onPress={() => setCurrentTr('Transformation 3')}
					>
						Transformation 3
					</Button>
					<Button 
						cssProps={styleSheet.buttonCssProps} 
						onPress={() => setCurrentTr('Transformation 4')}
					>
						Transformation 4
					</Button>
				</View>
				<View style={styleSheet.btnView}>
					<Button 
						cssProps={styleSheet.buttonCssProps} 
						onPress={() => setCurrentTr('Transformation 5')}
					>
						Transformation 5
					</Button>
					<Button 
						cssProps={styleSheet.buttonCssProps} 
						onPress={() => setCurrentTr('Transformation 6')}
					>
						Transformation 6
					</Button>
				</View>
			</View>

			<View style={styleSheet.imgContainer}>
				{ 
					imageUrl && 
					<>
						<Image 
							source={{'uri' : imageUrl}} 
							style={{
								width: 300,
								height: 300,
							}}
						/> 
						<View style={styleSheet.captionView}>
							{
								currentTr ? 
								<Text>{currentTr}</Text> : 
								<Text>Image with no Transformation</Text>
							}
						</View>
						<View style={styleSheet.captionView}>
							<Text>Rendered URL - {imageUrl}</Text>
						</View>
					</>
				}
			</View>
		</>
	);
};

export default Fetch;
