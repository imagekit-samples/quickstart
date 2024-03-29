# Ruby on Rails with carrierwave

This is a sample to show you how to integrate ImageKit in the Ruby on rails application with carrierwave gem.

## Setting up ImageKit Ruby on Rails SDK

Open `config/initializers/imagekitio.rb` it and add your public and private API keys, as well as the URL Endpoint as follows: (You can find these keys in the Developer section of your ImageKit Dashboard)

```ruby
ImageKitIo.configure do |config|
  if Rails.env.development?
    config.public_key = 'your_public_key'
    config.private_key = 'your_private_key'
    config.url_endpoint = 'your_url_endpoint' #https://ik.imagekit.io/dgn23df2n
  end
  config.service = :carrierwave
  # config.constants.MISSING_PRIVATE_KEY = 'custom error message'
end

```
Then create database:
```bash
bundle install
rails db:create
rails db:migrate
rails server
```
In another terminal run the webpacker:
```bash
yarn 
bin/webpack-dev-server
```

In your web browser, navigate to [`http://localhost:3000/posts`](http://localhost:3000/posts)


## **Useful links**

* [Ruby](ghttps://docs.imagekit.io/getting-started/quickstart-guides/ruby)

## Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
