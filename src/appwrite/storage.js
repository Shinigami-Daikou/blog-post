import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite"

class StorageService{
    client = new Client();
    storage;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.storage = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId, ID.unique(), file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId, fileId
            );
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId, fileId
        );
    }
}

const storageService = new StorageService()
export default storageService