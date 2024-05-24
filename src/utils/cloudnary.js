import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: "dx6glzfyd",
	api_key: "768826227128213",
	api_secret: "4grhypR8B9FT70uWgu1lvq7ACXw",
});

const uploadFile = async (fileBuffer) => {
	try {
		const result = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
				if (error) {
					reject(error);
					return;
				}
				console.log("File uploaded successfully:", result.url);
				resolve(result);
			});
			stream.end(fileBuffer);
		});
		return result;
	} catch (error) {
		console.error("Error uploading file to Cloudinary:", error);
		throw error;
	}
};

export default uploadFile;
