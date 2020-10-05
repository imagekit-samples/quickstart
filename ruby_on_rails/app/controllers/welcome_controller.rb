class WelcomeController < ApplicationController
  def index
    @default_image = @imagekitio.url({
      path: 'default-image.jpg',
    })

    @height_width = @imagekitio.url({
      path: 'default-image.jpg',
      transformation: [{
        height: "200",
        width: "200",
      }]
    })

    @crop_mode = @imagekitio.url({
      path: 'default-image.jpg',
      transformation: [{
        height: "300",
        width: "200",
        crop_mode: 'extract',
      }],
    })

    @overlay = @imagekitio.url({
      path: 'default-image.jpg',
      transformation: [{
        height: "300",
        width: "300",
        overlay_text: 'ImageKit',
        overlay_text_font_size: 50,
        overlay_text_color: '0651D5',
      }],
    })

    @chained_transform = @imagekitio.url({
      path: 'default-image.jpg',
      transformation: [
      {
        height: "300",
        width: "200",
      },
      {
        rt: 90,
      },
    ],
    })
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
      file = uploaded_file, # required
      file_name= "new_file.jpg",  # required
      options= {response_fields: 'tags', tags: ["hello"]}
    )
    if output[:error]
      redirect_to "/", notice: "There was some problem uploading your image"
    else
      redirect_to "/", notice: "Your image has been uploaded successfully with the name #{output[:response]["name"]}"
    end
  end
end
