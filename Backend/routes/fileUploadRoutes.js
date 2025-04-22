import express from 'express'
import FileUpload from '../controllers/services/fileUploadController.js';
import checkToken from '../middleware/checkToken.js'
import postcontroller from '../controllers/postcontroller.js';
class FileUploadRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/profile',  checkToken, FileUpload.upload.single('avatar'), FileUpload.uploadProfile);
        this.router.post('/photos/upload', checkToken,  FileUpload.uploadtophotos.array('file', 12), FileUpload.uploadPhotos, postcontroller.createPost );
    }
}

export default new FileUploadRoutes().router