from storages.backends.s3boto3 import S3Boto3Storage

class StaticStorage(S3Boto3Storage):
    location = 'static'
    default_acl = None  # Changed from 'public-read' to None

class MediaStorage(S3Boto3Storage):
    location = 'media'
    default_acl = None  # Changed from 'public-read' to None
    file_overwrite = False
