import ImageKit from "imagekit-javascript";
import { urlEndpoint, publicKey, authenticationEndpoint } from "../config/imagekit";

var imagekitConfigOptions = { urlEndpoint };
if(publicKey) imagekitConfigOptions.publicKey = publicKey;
if(authenticationEndpoint) imagekitConfigOptions.authenticationEndpoint = authenticationEndpoint;

const imagekit = new ImageKit(imagekitConfigOptions);

module.exports.getImagekitUrlFromSrc = function(imageSrc, transformationArr){
	var ikOptions = {
		src: imageSrc,
		transformation: transformationArr
	}
	var imageURL = imagekit.url(ikOptions);

	return imageURL;
}

module.exports.getImagekitUrlFromPath = function(imagePath, transformationArr, transformationPostion){
	var ikOptions = {
		urlEndpoint,
		path : imagePath,
		transformation: transformationArr
	};
	if(transformationPostion) ikOptions.transformationPostion = transformationPostion;

	var imageURL = imagekit.url(ikOptions);

	return imageURL;
}

module.exports.uploadFile = function(file) {
	return new Promise((resolve, reject) => {
		imagekit.upload({
			file,
			fileName: file.name, //you can change this and generate your own name if required
			tags: ["sample-tag-1", "sample-tag-2"] //change this or remove it if you want
		}, function(err, result) {
			if(err) reject(err);
			resolve(result);

		})
	})
}