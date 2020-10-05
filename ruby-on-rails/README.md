## Initialization

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

    # here we initialize an instance of the SDK, which we will use to work with images
    @imagekitio = ImageKit::ImageKitClient.new(private_key, public_key, url_endpoint)
end
```

Now, run the server:
```bash
rails server
```
Go to http://localhost:3000/

You should see the headings and the corresponding images on the home page.
