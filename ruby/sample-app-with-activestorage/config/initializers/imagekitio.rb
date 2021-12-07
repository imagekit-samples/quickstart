ImageKitIo.configure do |config|
  if Rails.env.development?
  	# config.public_key = ''
  	# config.private_key = ''
  	# config.url_endpoint = ''
  end
  config.service = :active_storage
  # config.constants.MISSING_PRIVATE_KEY = 'custom error message'
end
