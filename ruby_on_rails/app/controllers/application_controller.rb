require 'imagekitio'

class ApplicationController < ActionController::Base
    before_action :init_ik

    def init_ik
        private_key = "private_rCdVyDu/RQ+jMyD5+6n36NA3tM8="
        public_key = "public_zDv4VXT5FvgFI+ln6aSZCmOJ9KQ="
        # default value for endpoint is: https://ik.imagekit.io/<IMAGEKIT_ID>/
        url_endpoint = "https://ik.imagekit.io/violetviolinist/"

        # here we initialize an instance of the SDK, which we will use to work with images
        @imagekitio = ImageKit::ImageKitClient.new(private_key, public_key, url_endpoint)
    end
end
