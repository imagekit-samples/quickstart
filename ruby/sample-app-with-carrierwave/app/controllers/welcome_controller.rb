class WelcomeController < ApplicationController
	def index

	end

	def upload
		uploaded_file = params[:picture]
		@imagekitio = ImageKitIo.client
		output = @imagekitio.upload_file(
		    file: uploaded_file,
		    file_name: "new_file.jpg",
		    response_fields: 'tags',
		    tags: ["hello"]
		)
		if output[:error]
		    redirect_to "/", notice: "There was some problem uploading your image"
		else
		    redirect_to "/", notice: "Your image has been uploaded successfully with the name of #{output[:response]["name"]}"
		end
	end

	def auth_params
		@imagekitio = ImageKitIo.client
	  @auth_params = @imagekitio.get_authentication_parameters()
	end
end
