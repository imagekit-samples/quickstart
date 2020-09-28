class ApplicationController < ActionController::Base
    before_action :init_ik

    def init_ik
        private_key = "YOUR_PRIVATE_KEY"
        public_key = "YOUR_PUBLIC_KEY"
        # default value for endpoint is: https://ik.imagekit.io/<IMAGEKIT_ID>/
        url_endpoint = "YOUR_IMAGEKIT_ENDPOINT"

        # here we initialize an instance of the SDK, which we will use to work with images
        @imagekitio = ImageKit::ImageKitClient.new(private_key, public_key, url_endpoint)
    end
end
