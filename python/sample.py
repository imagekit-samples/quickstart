import base64
import os
import sys
import uuid

from imagekitio.models.UploadFileRequestOptions import UploadFileRequestOptions
from imagekitio.models.ListAndSearchFileRequestOptions import (
    ListAndSearchFileRequestOptions,
)
from imagekitio.models.UpdateFileRequestOptions import UpdateFileRequestOptions
from imagekitio.models.CopyFileRequestOptions import CopyFileRequestOptions
from imagekitio.models.MoveFileRequestOptions import MoveFileRequestOptions
from imagekitio.models.RenameFileRequestOptions import RenameFileRequestOptions
from imagekitio.models.CreateFolderRequestOptions import CreateFolderRequestOptions
from imagekitio.models.DeleteFolderRequestOptions import DeleteFolderRequestOptions
from imagekitio.models.CopyFolderRequestOptions import CopyFolderRequestOptions
from imagekitio.models.MoveFolderRequestOptions import MoveFolderRequestOptions
from imagekitio.models.CreateCustomMetadataFieldsRequestOptions import (
    CreateCustomMetadataFieldsRequestOptions,
)
from imagekitio.models.CustomMetadataFieldsSchema import (
    CustomMetadataFieldsSchema,
    CustomMetaDataTypeEnum,
)
from imagekitio.models.UpdateCustomMetadataFieldsRequestOptions import (
    UpdateCustomMetadataFieldsRequestOptions,
)

sys.path.append("..")

# #### set your private_key public_key, url_endpoint, url ### ##
private_key = "your_private_api_key"
public_key = "your_public_api_key"
url_endpoint = "https://ik.imagekit.io/your_imagekit_id/"

# dummy image url
dummy_url = "https://picsum.photos/200/300"

if __name__ == "__main__":
    from imagekitio.client import ImageKit

    imagekit = ImageKit(
        private_key=private_key,
        public_key=public_key,
        url_endpoint=url_endpoint,
    )
    current_folder = os.path.dirname(__file__)
    file_path = os.path.join(current_folder, "sample.jpg")
    file_name = "sample_file.jpg"
    upload = imagekit.upload_file(
        file=open(file_path, "rb"),
        file_name=file_name,
        options=UploadFileRequestOptions(
            use_unique_file_name=False,
            tags=["abc", "def"],
            folder="/testing-python-folder/",
            is_private_file=True,
            custom_coordinates="10,10,20,20",
            response_fields=[
                "tags",
                "custom_coordinates",
                "is_private_file",
                "embedded_metadata",
                "custom_metadata",
            ],
            extensions=[
                {
                    "name": "remove-bg",
                    "options": {"add_shadow": True, "bg_color": "pink"},
                },
                {"name": "google-auto-tagging", "minConfidence": 80, "maxTags": 10},
            ],
            webhook_url="https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e",
            overwrite_file=True,
            overwrite_ai_tags=False,
            overwrite_tags=False,
            overwrite_custom_metadata=True,
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    print("-------------------------------------")
    print("Upload with binary")
    print("-------------------------------------")
    # Final Result
    print(upload)
    # Raw Response
    print(upload.response_metadata.raw)
    # print that uploaded file's ID
    print(upload.file_id)

    upload2 = imagekit.upload_file(
        file=dummy_url,
        file_name="testing-url.jpg",
        options=UploadFileRequestOptions(
            tags=["abc", "def"],
            folder="/testing-python-folder/",
            is_private_file=True,
            custom_coordinates="10,10,20,20",
            response_fields=["is_private_file"],
            extensions=[
                {
                    "name": "remove-bg",
                    "options": {"add_shadow": True, "bg_color": "pink"},
                },
                {"name": "google-auto-tagging", "minConfidence": 80, "maxTags": 10},
            ],
            webhook_url="https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e",
            overwrite_file=False,
            overwrite_ai_tags=False,
            overwrite_tags=False,
            overwrite_custom_metadata=True,
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    print("-------------------------------------")
    print("Upload with url")
    print("-------------------------------------")
    # Final Result
    print(upload, end="\n\n")
    # Raw Response
    print(upload.response_metadata.raw)
    # print that uploaded file's ID
    print(upload.file_id)

    with open(file_path, mode="rb") as img:
        imgstr = base64.b64encode(img.read())

    upload_base64 = imagekit.upload_file(
        file=imgstr,
        file_name="testing-base64.jpg",
        options=UploadFileRequestOptions(
            tags=["abc", "def"],
            folder="/testing-python-folder/",
            is_private_file=False,
            custom_coordinates="10,10,20,20",
            response_fields=["is_private_file", "custom_metadata", "tags"],
            extensions=[
                {
                    "name": "remove-bg",
                    "options": {"add_shadow": True, "bg_color": "pink"},
                },
                {"name": "google-auto-tagging", "minConfidence": 80, "maxTags": 10},
            ],
            webhook_url="https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e",
            overwrite_file=False,
            overwrite_ai_tags=False,
            overwrite_tags=False,
            overwrite_custom_metadata=True,
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    print("-------------------------------------")
    print("Upload with base64")
    print("-------------------------------------")
    # Final Result
    print(upload_base64, end="\n\n")
    # Raw Response
    print(upload.response_metadata.raw)
    # print that uploaded file's ID
    print(upload.file_id)

    image_url = imagekit.url(
        {
            "path": upload.file_path,
            "query_parameters": {"v": "123"},
            "transformation": [
                {
                    "overlay_image": "/demo1/new_car.jpg",
                    "default_image": "/demo1/default-image.jpg",
                }
            ],
            "signed": True,
            "expire_seconds": 3000,
        }
    )

    print("-------------------------------------")
    print("Signed url")
    print("-------------------------------------")
    # Final Result
    print(image_url, end="\n\n")

    # URL generation using image path and image hostname
    image_url = imagekit.url(
        {
            "path": "default-image.jpg",
            "url_endpoint": url_endpoint,
            "transformation": [{"height": "300", "width": "400"}],
        }
    )

    print("-------------------------------------")
    print("Url using image path")
    print("-------------------------------------")
    # Final Result
    print(image_url, end="\n\n")

    # 2 Using full image URL
    image_url = imagekit.url(
        {
            "src": url_endpoint.rstrip("/") + "/default-image.jpg",
            "transformation": [{"height": "300", "width": "400"}],
        }
    )

    print("-------------------------------------")
    print("Url using src")
    print("-------------------------------------")
    # Final Result
    print(image_url, end="\n\n")

    image_url = imagekit.url(
        {
            "path": "/default-image.jpg",
            "url_endpoint": "https://ik.imagekit.io/your_imagekit_id/",
            "transformation": [{"height": "300", "width": "400", "raw": "ar-4-3,q-40"}],
        }
    )

    print("-------------------------------------")
    print("Chained transformation")
    print("-------------------------------------")
    # Final Result
    print(image_url, end="\n\n")

    upload_demo = imagekit.upload_file(
        file=open(file_path, "rb"),
        file_name="new_car.jpg",
        options=UploadFileRequestOptions(
            use_unique_file_name=False,
            tags=["abc", "def"],
            folder="/demo1/",
            is_private_file=False,
            custom_coordinates="10,10,20,20",
            response_fields=[
                "tags",
                "custom_coordinates",
                "is_private_file",
                "embedded_metadata",
                "custom_metadata",
            ],
            extensions=[
                {
                    "name": "remove-bg",
                    "options": {"add_shadow": True, "bg_color": "pink"},
                },
                {"name": "google-auto-tagging", "minConfidence": 80, "maxTags": 10},
            ],
            webhook_url="https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e",
            overwrite_file=True,
            overwrite_ai_tags=False,
            overwrite_tags=False,
            overwrite_custom_metadata=True,
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    upload_another_demo = imagekit.upload_file(
        file=open(file_path, "rb"),
        file_name="default-image.jpg",
        options=UploadFileRequestOptions(
            use_unique_file_name=False,
            tags=["abc", "def"],
            folder="/demo1/",
            is_private_file=False,
            custom_coordinates="10,10,20,20",
            response_fields=[
                "tags",
                "custom_coordinates",
                "is_private_file",
                "embedded_metadata",
                "custom_metadata",
            ],
            extensions=[
                {
                    "name": "remove-bg",
                    "options": {"add_shadow": True, "bg_color": "pink"},
                },
                {"name": "google-auto-tagging", "minConfidence": 80, "maxTags": 10},
            ],
            webhook_url="https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e",
            overwrite_file=True,
            overwrite_ai_tags=False,
            overwrite_tags=False,
            overwrite_custom_metadata=True,
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    image_url = imagekit.url(
        {
            "src": url_endpoint.rstrip("/") + "/default-image.jpg",
            "transformation": [
                {
                    "format": "jpg",
                    "progressive": "true",
                    "effect_sharpen": "-",
                    "effect_contrast": "1",
                }
            ],
        }
    )

    print("-------------------------------------")
    print("Sharpening and contrast transformation")
    print("-------------------------------------")
    # Final Result
    print(image_url, end="\n\n")

    list_files = imagekit.list_files(
        options=ListAndSearchFileRequestOptions(
            type="file",
            sort="ASC_CREATED",
            path="/",
            search_query="created_at >= '2d' OR size < '2mb' OR format='png'",
            file_type="all",
            limit=5,
            skip=0,
            tags="tag-1, tag-2, tag-3",
        )
    )
    bulk_ids = [list_files.list[0].file_id, list_files.list[1].file_id]

    print("-------------------------------------")
    print("List files")
    print("-------------------------------------")
    # Final Result
    print(list_files, end="\n\n")

    # Raw Response
    print(list_files.response_metadata.raw)

    # print the first file's ID
    print(list_files.list[0].file_id)

    details = imagekit.get_file_details(file_id=upload_base64.file_id)
    print("-------------------------------------")
    print("Get file details")
    print("-------------------------------------")
    # Final Result
    print(details, end="\n\n")

    # Raw Response
    print(details.response_metadata.raw)

    # print that file's id
    print(details.file_id)

    file_versions = imagekit.get_file_versions(file_id=upload_base64.file_id)
    print("-------------------------------------")
    print("Get file versions")
    print("-------------------------------------")
    # Final Result
    print(file_versions, end="\n\n")
    # Raw Response
    print(file_versions.response_metadata.raw)

    # print that file's version id
    print(file_versions.list[0].version_info.id)


    file_versions_details = imagekit.get_file_version_details(
        file_id=upload.file_id, version_id=upload.version_info.id
    )
    print("-------------------------------------")
    print("Get file version details")
    print("-------------------------------------")
    # Final Result
    print(file_versions_details, end="\n\n")

    # Raw Response
    print(file_versions_details.response_metadata.raw)

    # print that file's id
    print(file_versions_details.file_id)

    # print that file's version id
    print(file_versions_details.version_info.id)

    updated_detail = imagekit.update_file_details(
        file_id=upload_base64.file_id,
        options=UpdateFileRequestOptions(
            remove_ai_tags=["remove-ai-tag-1", "remove-ai-tag-2"],
            webhook_url="https://somewebhook.use/for/testing",
            extensions=[
                {
                    "name": "remove-bg",
                    "options": {"add_shadow": True, "bg_color": "red"},
                },
                {"name": "google-auto-tagging", "minConfidence": 80, "maxTags": 10},
            ],
            tags=["tag1", "tag2"],
            custom_coordinates="10,10,100,100",
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    print("-------------------------------------")
    print("Update file details")
    print("-------------------------------------")
    # Final Result
    print(updated_detail, end="\n\n")

    # Raw Response
    print(updated_detail.response_metadata.raw)

    # print that file's id
    print(updated_detail.file_id)

    tags = imagekit.add_tags(
        file_ids=[upload_base64.file_id, upload.file_id], tags=["abc", "def"]
    )
    print("-------------------------------------")
    print("Add tags")
    print("-------------------------------------")
    # Final Result
    print(tags, end="\n\n")

    # Raw Response
    print(tags.response_metadata.raw)

    # list successfully updated file ids
    print(tags.successfully_updated_file_ids)

    # print the first file's id
    print(tags.successfully_updated_file_ids[0])

    remove_tags = imagekit.remove_tags(
        file_ids=[upload_base64.file_id, upload.file_id], tags=["abc", "def"]
    )
    print("-------------------------------------")
    print("Remove tags")
    print("-------------------------------------")
    # Final Result
    print(remove_tags, end="\n\n")

    # Raw Response
    print(remove_tags.response_metadata.raw)

    # list successfully updated file ids
    print(remove_tags.successfully_updated_file_ids)

    # print the first file's id
    print(remove_tags.successfully_updated_file_ids[0])

    remove_ai_tags = imagekit.remove_ai_tags(
        file_ids=[upload_base64.file_id, upload.file_id],
        ai_tags=["ai-tag-to-remove-1", "ai-tag-to-remove-2"],
    )
    print("-------------------------------------")
    print("Remove AI tags")
    print("-------------------------------------")
    # Final Result
    print(remove_ai_tags, end="\n\n")

    # Raw Response
    print(remove_ai_tags.response_metadata.raw)

    # list successfully updated file ids
    print(remove_ai_tags.successfully_updated_file_ids)

    # print the first file's id
    print(remove_ai_tags.successfully_updated_file_ids[0])

    delete = imagekit.delete_file(file_id=upload_base64.file_id)
    print("-------------------------------------")
    print("Delete file")
    print("-------------------------------------")
    # Final Result
    print(delete, end="\n\n")

    # Raw Response
    print(delete.response_metadata.raw)

    upload3 = imagekit.upload_file(
        file=open(file_path, "rb"),
        file_name=file_name,
        options=UploadFileRequestOptions(
            use_unique_file_name=False,
            tags=["abc", "def"],
            folder="/testing-python-folder/",
            is_private_file=True,
            custom_coordinates="10,10,20,20",
            response_fields=[
                "tags",
                "custom_coordinates",
                "is_private_file",
                "embedded_metadata",
                "custom_metadata",
            ],
            extensions=[
                {
                    "name": "remove-bg",
                    "options": {"add_shadow": True, "bg_color": "pink"},
                },
                {"name": "google-auto-tagging", "minConfidence": 80, "maxTags": 10},
            ],
            webhook_url="https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e",
            overwrite_file=True,
            overwrite_ai_tags=False,
            overwrite_tags=False,
            overwrite_custom_metadata=True,
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    file_versions = imagekit.get_file_versions(file_id=upload3.file_id)
    print("-------------------------------------")
    print("Get file versions")
    print("-------------------------------------")
    # Final Result
    print(file_versions, end="\n\n")
    # Raw Response
    print(file_versions.response_metadata.raw)

    # print that file's version id
    print(file_versions.list[0].version_info.id)

    delete_file_version = imagekit.delete_file_version(
        file_id=file_versions.list[1].file_id,
        version_id=file_versions.list[1].version_info.id,
    )
    print("-------------------------------------")
    print("Delete file version")
    print("-------------------------------------")
    # Final Result
    print(delete_file_version, end="\n\n")

    # Raw Response
    print(delete_file_version.response_metadata.raw)

    bulk_file_delete = imagekit.bulk_file_delete(file_ids=[upload2.file_id])
    print("-------------------------------------")
    print("Bulk file delete")
    print("-------------------------------------")
    # Final Result
    print(bulk_file_delete, end="\n\n")

    # Raw Response
    print(bulk_file_delete.response_metadata.raw)

    # list successfully deleted file ids
    print(bulk_file_delete.successfully_deleted_file_ids)

    # print the first file's id
    print(bulk_file_delete.successfully_deleted_file_ids[0])

    upload4 = imagekit.upload_file(file=open(file_path, "rb"), file_name=file_name)

    copy_file = imagekit.copy_file(
        options=CopyFileRequestOptions(
            source_file_path=upload4.file_path,
            destination_path="/test",
            include_file_versions=True,
        )
    )
    print("-------------------------------------")
    print("Copy file")
    print("-------------------------------------")
    # Final Result
    print(copy_file, end="\n\n")

    # Raw Response
    print(copy_file.response_metadata.raw)

    move_file = imagekit.move_file(
        options=MoveFileRequestOptions(
            source_file_path=upload4.file_path, destination_path="/test"
        )
    )
    print("-------------------------------------")
    print("Move file")
    print("-------------------------------------")
    # Final Result
    print(move_file, end="\n\n")

    # Raw Response
    print(move_file.response_metadata.raw)

    upload5 = imagekit.upload_file(
        file=open(file_path, "rb"),
        file_name=file_name,
    )

    rename_file = imagekit.rename_file(
        options=RenameFileRequestOptions(
            file_path=upload5.file_path,
            new_file_name=str(uuid.uuid4()) + ".jpg",
            purge_cache=True,
        )
    )
    print("-------------------------------------")
    print("Rename file")
    print("-------------------------------------")
    # Final Result
    print(rename_file, end="\n\n")

    # Raw Response
    print(rename_file.response_metadata.raw)

    # print the purge request id
    print(rename_file.purge_request_id)

    upload_base64_version = imagekit.upload_file(
        file=imgstr,
        file_name="testing-base64.jpg",
        options=UploadFileRequestOptions(
            use_unique_file_name=False,
            tags=["abc", "def"],
            folder="/testing-python-folder/",
            is_private_file=False,
            custom_coordinates="10,10,20,20",
            response_fields=["is_private_file", "custom_metadata", "tags"],
            webhook_url="https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e",
            overwrite_file=True,
            overwrite_ai_tags=False,
            overwrite_tags=False,
            overwrite_custom_metadata=True,
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    upload_base64_version_again = imagekit.upload_file(
        file=imgstr,
        file_name="testing-base64.jpg",
        options=UploadFileRequestOptions(
            use_unique_file_name=False,
            tags=["abc", "def"],
            folder="/testing-python-folder/",
            is_private_file=False,
            custom_coordinates="10,10,20,20",
            response_fields=["is_private_file", "custom_metadata", "tags"],
            webhook_url="https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e",
            overwrite_file=True,
            overwrite_ai_tags=False,
            overwrite_tags=False,
            overwrite_custom_metadata=True,
            # custom_metadata={"test": 12}, # only add custom meta data if you have it in account.
        ),
    )

    file_versions_latest = imagekit.get_file_versions(file_id=upload_base64_version.file_id)

    restore_file_version = imagekit.restore_file_version(
        file_id=file_versions_latest.list[1].file_id, version_id=file_versions_latest.list[1].version_info.id
    )
    print("-------------------------------------")
    print("Restore file version")
    print("-------------------------------------")
    # Final Result
    print(restore_file_version, end="\n\n")

    # Raw Response
    print(restore_file_version.response_metadata.raw)

    # print that file's id
    print(restore_file_version.file_id)

    create_folder = imagekit.create_folder(
        options=CreateFolderRequestOptions(folder_name="test", parent_folder_path="/")
    )
    print("-------------------------------------")
    print("Create folder")
    print("-------------------------------------")
    # Final Result
    print(create_folder, end="\n\n")

    # Raw Response
    print(create_folder.response_metadata.raw)

    delete_folder = imagekit.delete_folder(
        options=DeleteFolderRequestOptions(folder_path="test")
    )
    print("-------------------------------------")
    print("Delete folder")
    print("-------------------------------------")
    # Final Result
    print(delete_folder, end="\n\n")

    # Raw Response
    print(delete_folder.response_metadata.raw)

    create_folder2 = imagekit.create_folder(
        options=CreateFolderRequestOptions(folder_name="test2", parent_folder_path="/")
    )
    print("-------------------------------------")
    print("Create folder2")
    print("-------------------------------------")
    # Final Result
    print(create_folder2, end="\n\n")

    copy_folder = imagekit.copy_folder(
        options=CopyFolderRequestOptions(
            source_folder_path="/test2",
            destination_path="/test21",
            include_file_versions=True,
        )
    )
    print("-------------------------------------")
    print("Copy folder")
    print("-------------------------------------")
    # Final Result
    print(copy_folder, end="\n\n")

    # Raw Response
    print(copy_folder.response_metadata.raw)

    # print the job's id
    print(copy_folder.job_id)

    move_folder = imagekit.move_folder(
        options=MoveFolderRequestOptions(
            source_folder_path="/test2", destination_path="/test21"
        )
    )
    print("-------------------------------------")
    print("Move folder")
    print("-------------------------------------")
    # Final Result
    print(move_folder, end="\n\n")

    # Raw Response
    print(move_folder.response_metadata.raw)

    # print the job's id
    print(move_folder.job_id)

    job_status = imagekit.get_bulk_job_status(job_id=move_folder.job_id)
    print("-------------------------------------")
    print("Bulk job status")
    print("-------------------------------------")
    # Final Result
    print(job_status, end="\n\n")

    # Raw Response
    print(job_status.response_metadata.raw)

    # print the job's id
    print(job_status.job_id)

    # print the status
    print(job_status.status)

    purge_cache = imagekit.purge_file_cache(file_url=upload5.url)
    print("-------------------------------------")
    print("Purge cache")
    print("-------------------------------------")
    # Final Result
    print(purge_cache, end="\n\n")

    # Raw Response
    print(purge_cache.response_metadata.raw)

    # print the purge file cache request id
    print(purge_cache.request_id)

    purge_cache_status = imagekit.get_purge_file_cache_status(
        purge_cache_id=purge_cache.request_id
    )

    print("-------------------------------------")
    print("Cache status")
    print("-------------------------------------")
    # Final Result
    print(purge_cache_status, end="\n\n")

    # Raw Response
    print(purge_cache_status.response_metadata.raw)

    # print the purge file cache status
    print(purge_cache_status.status)

    uploadMetaData = imagekit.upload_file(file="https://picsum.photos/200/300", file_name="uploadmetadata.jpg")
    file_metadata = imagekit.get_file_metadata(file_id=uploadMetaData.file_id)
    print("-------------------------------------")
    print("File metadata")
    print("-------------------------------------")
    # Final Result
    print(file_metadata, end="\n\n")

    # Raw Response
    print(file_metadata.response_metadata.raw)

    # print the file metadata fields
    print(file_metadata.width)
    print(file_metadata.exif.image.x_resolution)

    get_metadata = imagekit.get_remote_file_url_metadata(
        remote_file_url=uploadMetaData.url
    )
    print("-------------------------------------")
    print("Get metadata via url")
    print("-------------------------------------")
    # Final Result
    print(get_metadata, end="\n\n")

    # Raw Response
    print(get_metadata.response_metadata.raw)

    # print the file metadata fields
    print(get_metadata.width)
    print(get_metadata.exif.image.x_resolution)
    print(str(uuid.uuid1()) + "test")
    create_custom_metadata_fields_number = imagekit.create_custom_metadata_fields(
        options=CreateCustomMetadataFieldsRequestOptions(
            name=str(uuid.uuid1()) + "test",
            label=str(uuid.uuid1()) + "test",
            schema=CustomMetadataFieldsSchema(
                type=CustomMetaDataTypeEnum.Number, min_value=100, max_value=200
            ),
        )
    )
    print("-------------------------------------")
    print("Create custom metadata fields number type")
    print("-------------------------------------")
    # Final Result
    print(create_custom_metadata_fields_number, end="\n\n")

    # Raw Response
    print(create_custom_metadata_fields_number.response_metadata.raw)

    # print the id of created custom metadata fields
    print(create_custom_metadata_fields_number.id)

    # print the schema's type of created custom metadata fields
    print(create_custom_metadata_fields_number.schema.type)

    create_custom_metadata_fields_textarea = imagekit.create_custom_metadata_fields(
        CreateCustomMetadataFieldsRequestOptions(
            name=str(uuid.uuid1()) + "test",
            label=str(uuid.uuid1()) + "test",
            schema=CustomMetadataFieldsSchema(
                type=CustomMetaDataTypeEnum.Textarea,
                is_value_required=True,
                default_value=str(uuid.uuid1()) + "The",
                min_length=3,
                max_length=200,
            ),
        )
    )
    print("-------------------------------------")
    print("Create custom metadata fields textarea type")
    print("-------------------------------------")
    # Final Result
    print(create_custom_metadata_fields_textarea, end="\n\n")

    # Raw Response
    print(create_custom_metadata_fields_textarea.response_metadata.raw)

    # print the id of created custom metadata fields
    print(create_custom_metadata_fields_textarea.id)

    # print the schema's type of created custom metadata fields
    print(create_custom_metadata_fields_textarea.schema.type)

    create_custom_metadata_fields_date = imagekit.create_custom_metadata_fields(
        options=CreateCustomMetadataFieldsRequestOptions(
            name=str(uuid.uuid1()) + "test-date",
            label=str(uuid.uuid1()) + "test-date",
            schema=CustomMetadataFieldsSchema(
                type=CustomMetaDataTypeEnum.Date,
                min_value="2022-11-29T10:11:10+00:00",
                max_value="2022-11-30T10:11:10+00:00",
            ),
        )
    )
    print("-------------------------------------")
    print("Create custom metadata fields date type")
    print("-------------------------------------")
    # Final Result
    print(create_custom_metadata_fields_date, end="\n\n")

    # Raw Response
    print(create_custom_metadata_fields_date.response_metadata.raw)

    # print the label of created custom metadata fields
    print(create_custom_metadata_fields_date.label)

    # print the schema's min value of created custom metadata fields
    print(create_custom_metadata_fields_date.schema.min_value)

    create_custom_metadata_fields_boolean = imagekit.create_custom_metadata_fields(
        options=CreateCustomMetadataFieldsRequestOptions(
            name=str(uuid.uuid1()) + "test-boolean",
            label=str(uuid.uuid1()) + "test-boolean",
            schema=CustomMetadataFieldsSchema(
                type=CustomMetaDataTypeEnum.Boolean,
                is_value_required=True,
                default_value=True,
            ),
        )
    )
    print("-------------------------------------")
    print("Create custom metadata fields boolean type")
    print("-------------------------------------")
    # Final Result
    print(create_custom_metadata_fields_boolean, end="\n\n")

    # Raw Response
    print(create_custom_metadata_fields_boolean.response_metadata.raw)

    # print the label of created custom metadata fields
    print(create_custom_metadata_fields_boolean.label)

    create_custom_metadata_fields_single_select = (
        imagekit.create_custom_metadata_fields(
            options=CreateCustomMetadataFieldsRequestOptions(
                name=str(uuid.uuid1()) + "test",
                label=str(uuid.uuid1()) + "test",
                schema=CustomMetadataFieldsSchema(
                    type=CustomMetaDataTypeEnum.SingleSelect,
                    select_options=["small", "medium", "large", 30, 40, True],
                ),
            )
        )
    )
    print("-------------------------------------")
    print("Create custom metadata fields SingleSelect type")
    print("-------------------------------------")
    # Final Result
    print(create_custom_metadata_fields_single_select, end="\n\n")

    # Raw Response
    print(create_custom_metadata_fields_single_select.response_metadata.raw)

    # print the name of created custom metadata fields
    print(create_custom_metadata_fields_single_select.name)

    # print the schema's select options of created custom metadata fields
    print(create_custom_metadata_fields_single_select.schema.select_options)

    create_custom_metadata_fields_multi_select = imagekit.create_custom_metadata_fields(
        options=CreateCustomMetadataFieldsRequestOptions(
            name=str(uuid.uuid1()) + "test-MultiSelect",
            label=str(uuid.uuid1()) + "test-MultiSelect",
            schema=CustomMetadataFieldsSchema(
                type=CustomMetaDataTypeEnum.MultiSelect,
                is_value_required=True,
                default_value=["small", 30, True],
                select_options=["small", "medium", "large", 30, 40, True],
            ),
        )
    )
    print("-------------------------------------")
    print("Create custom metadata fields MultiSelect type")
    print("-------------------------------------")
    # Final Result
    print(create_custom_metadata_fields_multi_select, end="\n\n")

    # Raw Response
    print(create_custom_metadata_fields_multi_select.response_metadata.raw)

    # print the name of created custom metadata fields
    print(create_custom_metadata_fields_multi_select.name)

    # print the schema's select options of created custom metadata fields
    print(create_custom_metadata_fields_multi_select.schema.select_options)

    get_custom_metadata_fields = imagekit.get_custom_metadata_fields()
    print("-------------------------------------")
    print("Get custom metatdata fields")
    print("-------------------------------------")
    # Final Result
    print(get_custom_metadata_fields, end="\n\n")

    # Raw Response
    print(get_custom_metadata_fields.response_metadata.raw)

    # print the first customMetadataField's id
    print(get_custom_metadata_fields.list[0].id)

    # print the first customMetadataField schema's type
    print(get_custom_metadata_fields.list[0].schema.type)

    update_custom_metadata_fields = imagekit.update_custom_metadata_fields(
        field_id=create_custom_metadata_fields_number.id,
        options=UpdateCustomMetadataFieldsRequestOptions(
            label=str(uuid.uuid1())+"test-update",
            schema=CustomMetadataFieldsSchema(min_value=100, max_value=200),
        ),
    )
    print("-------------------------------------")
    print("Update custom metadata fields")
    print("-------------------------------------")
    # Final Result
    print(update_custom_metadata_fields, end="\n\n")

    # Raw Response
    print(update_custom_metadata_fields.response_metadata.raw)

    # print the label of updated custom metadata fields
    print(update_custom_metadata_fields.label)

    # print the schema's min value of updated custom metadata fields
    print(update_custom_metadata_fields.schema.min_value)

    delete_custom_metadata_field = imagekit.delete_custom_metadata_field(
        field_id=create_custom_metadata_fields_multi_select.id
    )
    print("-------------------------------------")
    print("Delete custom metatdata fields via custom metatdata fields's id")
    print("-------------------------------------")
    # Final Result
    print(delete_custom_metadata_field, end="\n\n")

    # Raw Response
    print(delete_custom_metadata_field.response_metadata.raw)

    auth_params = imagekit.get_authentication_parameters()
    print("-------------------------------------")
    print("Auth params")
    print("-------------------------------------")
    print(auth_params, end="\n\n")

    print("-------------------------------------")
    print("Phash distance")
    print("-------------------------------------")
    print(imagekit.phash_distance("f06830ca9f1e3e90", "f06830ca9f1e3e90"), end="\n\n")
