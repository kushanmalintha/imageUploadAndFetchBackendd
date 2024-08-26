const ImageModel = require('./image_model');

const uploadImage = async (name, file) => {
    try {
        const newImage = new ImageModel({
            name: name,
            image: {
                data: file.buffer,
                contentType: file.mimetype
            }
        });
        await newImage.save();
        return { success: true };
    } catch (error) {
        console.error('Error saving image:', error);
        return { success: false, error };
    }
};

const getImageByName = async (name) => {
    try {
        const image = await ImageModel.findOne({ name });
        if (!image) {
            return { success: false, message: 'Image not found' };
        }
        return { success: true, image };
    } catch (error) {
        console.error('Error retrieving image:', error);
        return { success: false, error };
    }
};

module.exports = {
    uploadImage,
    getImageByName
};