// const ImageKit = require("imagekit");

// const imagekit = new ImageKit({
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
// });

// async function uploadFile(file, fileName) {
//     const result = await imagekit.upload({
//         file: file,
//         fileName: fileName
//     })

//     return result.url;
// }

// module.exports = {
//     uploadFile
// }

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(buffer, fileName, mimetype) {
    try {
        const base64File = `data:${mimetype};base64,${buffer.toString("base64")}`;

        const result = await imagekit.upload({
            file: base64File,
            fileName: `${fileName}`,
            useUniqueFileName: true,
            fileType: "video"   
        });

        console.log("ImageKit upload success:", result.url);

        return { url: result.url };

    } catch (error) {
        console.error("ImageKit upload FAILED:", error.message);
        return null;
    }
}

module.exports = { uploadFile };
