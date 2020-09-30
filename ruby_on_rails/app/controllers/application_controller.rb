require 'imagekitio'

class ApplicationController < ActionController::Base
    before_action :init_ik

    def init_ik
        private_key: "<your-private-key>",
        public_key: "<your-public-key>",
        # default value for endpoint is: https://ik.imagekit.io/<IMAGEKIT_ID>/
        url_endpoint: "<endpoint-url>"

        # here we initialize an instance of the SDK, which we will use to work with images
        @imagekitio = ImageKit::ImageKitClient.new(private_key, public_key, url_endpoint)
    end
end
