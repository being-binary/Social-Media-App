import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import postcontroller from '../postcontroller.js';

import cloudinary from './cloudinary.js';
class FileUpload {

    constructor() {
        this.upload = multer({ dest: 'uploads/' })
        this.uploadtophotos = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    // Set the specific directory for photos
                    const uploadPath = path.join(__dirname, '../../uploads/');
                    cb(null, uploadPath);
                },
                filename: function (req, file, cb) {
                    // Add timestamp and extension to the filename
                    const uniqueName = `${Date.now()}-${file.originalname}`;
                    cb(null, uniqueName);
                }

            })
        })
    }

    uploadProfile(req, res) {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded', success: false });
        }


        res.status(200).json({ msg: 'Upload successful', success: true, file: req.file });
    }

    async uploadPhotos(req, res, next) {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: 'No files uploaded', success: false });
        }
        try {
            const result = await cloudinary.uploadImages(req.files)
            console.log(Array.isArray(result));
            const media = result.map((media) => {
                return { secure_url: media.secure_url, public_id: media.public_id }
            });
            req.media = media

            // Process the file (e.g., upload to cloud storage)
            // After processing, delete the file
            // for (const file of req.files) {
            //     fs.unlink(file.path, (err) => {
            //         if (err) {
            //             console.error('Error deleting file:', err);
            //         }
            //     });
            // }
            next()
        } catch (err) {
            res.status(400).json({ msg: 'Upload Unsuccessful', success: false, files: req.files });
        }
    }

    uploadCoolProfile(req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: 'No files uploaded', success: false });
        }
        res.status(200).json({ msg: 'Upload successful', success: true, files: req.files });
    }

}

export default new FileUpload()