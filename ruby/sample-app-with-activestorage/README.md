# Ruby on Rails with activestorage

This is a sample to show you how to integrate ImageKit in the Ruby on rails application with activestorage gem.

## Setting up ImageKit Ruby on Rails SDK

Open `config/initializers/imagekitio.rb` it and add your public and private API keys, as well as the URL Endpoint as follows: (You can find these keys in the Developer section of your ImageKit Dashboard)

```ruby
ImageKitIo.configure do |config|
  if Rails.env.development?
    config.public_key = 'YOUR_PUBLIC_KEY'
    config.private_key = 'YOUR_PRIVATE_KEY'
    config.url_endpoint = 'YOUR_URL_ENDPOINT' #https://ik.imagekit.io/dgn23df2n
  end
  config.service = :active_storage
  # config.constants.MISSING_PRIVATE_KEY = 'custom error message'
end

```
Then create install gems and database:
```bash
bundle install
rails db:create
rails db:migrate
rails active_storage:install
rails db:migrate
```

In another terminal run the webpacker:
```bash
yarn 
bin/webpack-dev-server
```

Then run the server:

```ruby
rails server
```

In your web browser, navigate to [`http://localhost:3000/posts`](http://localhost:3000/posts)


## **Useful links**

* [Ruby](ghttps://docs.imagekit.io/getting-started/quickstart-guides/ruby)

## Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
