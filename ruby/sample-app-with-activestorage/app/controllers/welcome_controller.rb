class WelcomeController < ApplicationController
	before_action :set_imagekit

  def index
  end

  def signed_url
    @signed_image_url = @imagekitio.url({
      path: 'default-image.jpg',
      signed: true,
      expire_seconds: 1,
    })
  end

  def auth_params
    @auth_params = @imagekitio.get_authentication_parameters()
  end

  def upload
    uploaded_file = params[:picture]
    output = @imagekitio.upload_file(
      file: uploaded_file, # required
      file_name: "new_file.jpg",  # required
      response_fields: 'tags',
      tags: ["hello"]
    )
    if output[:error]
      redirect_to "/", notice: "There was some problem uploading your image"
    else
      redirect_to "/", notice: "Your image has been uploaded successfully with the name #{output[:response]["name"]}"
    end
  end

  def set_imagekit
  	@imagekitio = ImageKitIo.client
  end
end
