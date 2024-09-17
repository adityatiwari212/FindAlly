import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/temp'); // Store files temporarily in a 'temp' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid conflicts
    }
});

export const upload = multer({ storage });