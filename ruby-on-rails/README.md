# Introduction

This sample project covers:

1. Setting up ImageKit Ruby on Rails SDK
2. Rendering Images
4. Applying Common Image Manipulations
5. Adding Overlays to Images
6. Generate Secure Signed URL for an Image
7. Generating Authentication Parameters
8. File Uploading

# How to run locally

## Install Dependencies

```bash
bundle install
```

## Setup Authentication

Add this configuration to `config/environments/development.rb` and `config/environments/production.rb`

```ruby
config.imagekit={
  private_key: "<your-private-key>",
  public_key: "<your-public-key>",
  url_endpoint: "<endpoint-url>"
}
```

Next, go to `app/controllers/application_controller.rb`, and fill in the following values there as well:

```ruby
def init_ik
    private_key: "<your-private-key>",
    public_key: "<your-public-key>",
    # default value for endpoint is: https://ik.imagekit.io/<IMAGEKIT_ID>/
    url_endpoint: "<endpoint-url>"

    # here, we initialize an instance of the SDK, which we will use to work with images
    @imagekitio = ImageKit::ImageKitClient.new(private_key, public_key, url_endpoint)
end
```

You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard.
API public key can be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

## Run the Rails App

```bash
rails server
```

Open the page at `http://localhost:3000/`
You should see the headings and the corresponding images on the home page.

# Useful links
* Ruby on Rails quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/ruby-on-rails
* Ruby on Rails SDK and documentation - https://github.com/imagekit-developer/imagekit-ruby

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
