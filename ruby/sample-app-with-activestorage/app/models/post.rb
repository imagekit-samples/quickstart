class Post < ApplicationRecord
	has_one_attached :picture do |attachable|
	    attachable.variant :thumb, resize: "100x100"
	  end
end
