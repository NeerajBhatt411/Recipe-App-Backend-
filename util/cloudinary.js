const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: 'dmgxy7zh1',  // Tumhara Cloudinary Cloud Name
    api_key: 455133491735624, // Tumhara API Key
    api_secret: 'CWJGl7HHJuw9xXSVlnKFZXnFXJM' // Tumhara API Secret
});

module.exports = cloudinary;
