class Post < ApplicationRecord
    mount_uploader :picture, PictureUploader
end
