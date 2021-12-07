require 'imagekitio'
require "base64"

public_key = 'YOUR_PUBLIC_KEY'
private_key = 'YOUR_PRIVATE_KEY'
url_endpoint = 'YOUR_URL_ENDPOINT' #https://ik.imagekit.io/4xrvxesdft/

# dummy image url
url = "https://homepages.cae.wisc.edu/~ece533/images/cat.png"

imagekitio = ImageKitIo::Client.new(private_key, public_key, url_endpoint)

# URL generation using image path and image hostname
gen_url = imagekitio.url({path: 'default-image.jpg'})

puts "-------------------------------------"
puts "generated url => #{gen_url}"


# 2 Using full image URL
image_url = imagekitio.url({src: url_endpoint.chomp("/") + "/default-image.jpg",
                            transformation: [{height: "300", width: "400"}],})
puts "-------------------------------------"

puts "Url using full image url =>  #{image_url}"


image_url = imagekitio.url({src: url_endpoint + "default-image.jpg",
                            transformation: [{format: "jpg",
                                              progressive: "true",
                                              effect_sharpen: "-",
                                              effect_contrast: "1",}],})

print("-------------------------------------", "\n")
puts "sharpening and contrast transforms => #{image_url}"
# 4. Sharpening and contrast transforms and a progressive JPG image
print("-------------------------------------")


# Uploading image from file
file = File.open("./sample.jpg", "rb")
upload = imagekitio.upload_file(
	file: file,
	file_name:  "testing.jpg",
    response_fields: 'tags,customCoordinates,isPrivateFile,metadata',
    tags: %w[abc def],
    use_unique_file_name: false,
    is_private_file: true
    )
puts "------------------------------------------", "\n"
puts "Upload Private with binary => ", upload


# signed url
url = imagekitio.url({path: upload[:response]["filePath"],
    transformation: [{'height': "300", 'width': "400"}],
    signed: true,
    expire_seconds: 10})
print("-------------------------------------", "\n")
puts "Signed url => #{url}"


# Uploading image from Base64
image64 = Base64.encode64(File.open("sample.jpg", "rb").read)

upload = imagekitio.upload_file(
    file: image64,
    file_name: "testing",
    response_fields: 'tags,customCoordinates,isPrivateFile,metadata',
    tags: %w[abc def],
    use_unique_file_name: true,
    )
puts "------------------------------------------", "\n"
puts "Upload with base64 => ", upload

# Uploading image from remote URL
upload = imagekitio.upload_file(
    file: "https://file-examples.com/wp-content/uploads/2017/10/file_example_JPG_100kB.jpg",
    file_name: "testing",
    response_fields: 'tags,customCoordinates,isPrivateFile,metadata',
    # tags: %w[abc def],
    overwrite_tags: true,
    use_unique_file_name: false,    
    )
puts "------------------------------------------", "\n"
puts "Upload with url => #{upload}"

#Uploading repeat to grow number of files in the server.
upload = imagekitio.upload_file(
    file: "https://file-examples.com/wp-content/uploads/2017/10/file_example_JPG_100kB.jpg",
    file_name: "testing",
    response_fields: 'tags,customCoordinates,isPrivateFile,metadata,mime,AITags,customMetadata',
    tags: %w[abc def],
    use_unique_file_name: true,
    )
puts "------------------------------------------", "\n"
puts "Upload with url => #{upload}"
upload = imagekitio.upload_file(
    file: "https://file-examples.com/wp-content/uploads/2017/10/file_example_JPG_100kB.jpg",
    file_name: "testing.jpg",
    response_fields: 'tags,customCoordinates,isPrivateFile,metadata',
    tags: %w[abc def],
    use_unique_file_name: true
    )
puts "------------------------------------------", "\n"
puts "Upload with url => #{upload}"


#Getting file list from server
list_files = imagekitio.list_files(skip: 0, limit: 5)
bulk_ids = Array[list_files[:response][1]["fileId"],list_files[:response][2]["fileId"],list_files[:response][3]["fileId"], list_files[:response][4]["fileId"],]
puts bulk_ids
puts list_files[:response][0]["fileId"]
print("-------------------------------------", "\n")

print("List files => ", "\n", list_files, "\n")

print("-----------------------------------", "\n")
bulk_add_id = imagekitio.add_bulk_tags(file_ids: bulk_ids, tags: ['personal_image', 'custom'])
puts 'bulk tag add result '
puts bulk_add_id

print("-----------------------------------", "\n")
bulk_remove_id = imagekitio.delete_bulk_tags(file_ids: bulk_ids, tags: ['personal_image'])
puts 'bulk tag remove result'
puts bulk_remove_id

print("-----------------------------------", "\n")
bulk_ai_tag_remove_id = imagekitio.delete_bulk_ai_tags(file_ids: bulk_ids, ai_tags: ['ai_tags'])
puts 'bulk ai tag remove result'
puts bulk_ai_tag_remove_id

print("-----------------------------------", "\n")
copy_file_result = imagekitio.copy_file(source_file_path: '/Van_Detail_Page_cQK2aPD0gLi7.png', destination_path: '/folder/favourite/')
puts 'copy file result'
puts copy_file_result

print("-----------------------------------", "\n")
move_file_result = imagekitio.move_file(source_file_path: '/blog_7Xi82U86r.png', destination_path: '/folder/favourite/')
puts 'move file result'
puts move_file_result

print("-----------------------------------", "\n")
rename_file_result = imagekitio.rename_file(file_path: 'icon.png', new_file_name: 'icon1.png', purge_cache: true)
puts 'rename file result'
puts rename_file_result



print("-----------------------------------", "\n")
create_folder_result = imagekitio.create_folder(folder_name: 'test with space13')
puts 'create folder result'
puts create_folder_result

print("-----------------------------------", "\n")
delete_folder_result = imagekitio.delete_folder(folder_path: 'test')
puts 'delete folder result'
puts delete_folder_result

print("-----------------------------------", "\n")
copy_folder_result = imagekitio.copy_folder(source_folder_path: 'folder', destination_path: 'copied')
puts 'copy folder result'
puts copy_folder_result

print("-----------------------------------", "\n")
copy_folder_result = imagekitio.copy_folder(source_folder_path: 'folder', destination_path: 'copied')
puts 'copy folder result'
puts copy_folder_result

print("-----------------------------------", "\n")
move_folder_result = imagekitio.move_folder(source_folder_path: 'folder/favourite', destination_path: 'copied')
puts 'move folder result'
puts move_folder_result

print("-----------------------------------", "\n")
job_status = imagekitio.bulk_job_status(job_id: '619e028e20b7ef03efc4eeb9')
puts 'job status result'
puts job_status

print("-----------------------------------", "\n")
create_custom_metadata_result = imagekitio.create_custom_metadata_field(
  name: 'local_availability',
  label: 'locally available',
  schema: {
    type: 'Boolean',
  }
)
puts 'create custom metadata result'
puts create_custom_metadata_result
#
print("-----------------------------------", "\n")
get_custom_metadata_result = imagekitio.get_custom_metadata_fields
puts 'get custom metadata result'
puts get_custom_metadata_result

print("-----------------------------------", "\n")
update_custom_metadata_result = imagekitio.update_custom_metadata_field(id: '619e667320b7ef03efc5d870', label: 'custom price')
puts 'update custom metadata result'
puts update_custom_metadata_result

print("-----------------------------------", "\n")
get_custom_metadata_result = imagekitio.get_custom_metadata_fields
puts 'get custom metadata result'
puts get_custom_metadata_result

print("-----------------------------------", "\n")
delete_custom_metadata = imagekitio.delete_custom_metadata_field(id: '619e667320b7ef03efc5d870')
puts 'delete custom metadata field'
puts delete_custom_metadata

print("-----------------------------------", "\n")
get_custom_metadata_result = imagekitio.get_custom_metadata_fields
puts 'get custom metadata result'
puts get_custom_metadata_result

updated_detail = imagekitio.update_file_details(
    file_id: list_files[:response][0]["fileId"],
    webhook_url: 'example.com',
    custom_metadata: {
    	'local_availability': true,
    	'price1': 200
    }
      # "tags": ['image_tag1'],
      # "custom_coordinates": "10,10,100,200"
    
)
puts '--------------------------------'
puts "updated details => #{updated_detail}"



puts "------------------------------------------", "\n"

print("Updated detail => ", updated_detail, "\n\n")


details = imagekitio.get_file_details(file_id: list_files[:response][0]["fileId"])

puts "------------------------------------------", "\n"

print("File detail => ", details, "\n\n")


file_metadata = imagekitio.get_file_metadata(file_id: list_files[:response][0]["fileId"])

puts "------------------------------------------", "\n"
puts "File Metadata => #{file_metadata}"

print("-------------------------------------")

delete = imagekitio.delete_file(file_id: list_files[:response][0]["fileId"],)

puts "------------------------------------------", "\n"
puts "Delete file => #{delete}", "\n"

puts "-------------------------------------"
purge_cache = imagekitio.purge_file_cache(file_url: image_url)
puts "Purge cache => #{purge_cache}", "\n"

request_id = purge_cache[:response]["requestId"]
purge_cache_status = imagekitio.purge_file_cache_status(request_id: request_id)

puts "-------------------------------------", "\n"

print("Cache status => ", purge_cache_status, "\n")

puts "-------------------------------------", "\n"

auth_params = imagekitio.get_authentication_parameters
puts "Auth params => ", auth_params, "\n"

print("-------------------------------------", "\n")
print("Phash distance => ", imagekitio.phash_distance("f06830ca9f1e3e90", "f06830ca9f1e3e90"), "\n")

print("-------------------------------------")


puts "-------------------------------------", "\n"
remote_file_url = upload[:response]["url"]

print("Get metadata => ", imagekitio.get_remote_file_url_metadata(remote_file_url: list_files[:response][1]["url"]))

puts "-------------------------------------", "\n"


print("Bulk File delete => ", imagekitio.delete_bulk_files(file_ids: bulk_ids))
