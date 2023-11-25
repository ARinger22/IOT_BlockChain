import os
import shutil


def copy_json_files(source_directory, destination_directory, file_names):
    source_files = os.listdir(source_directory)
    print("Files in source directory:", source_files)
    for file_name in file_names:
        source_path = os.path.join(source_directory, file_name)
        destination_path = os.path.join(destination_directory, file_name)
        shutil.copyfile(source_path, destination_path)


json_files_directory = "./contract_folder/build/contracts"

json_file_names = ["AnchorPeer.json","CertificateAuthority.json", "LPeer.json", "LPeer0.json"]

destination_directory = "./web_app/src/contracts"

copy_json_files(json_files_directory, destination_directory, json_file_names)
