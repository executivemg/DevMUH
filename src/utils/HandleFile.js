import { writeFile, mkdir } from "fs/promises";
import uploadFile from "./cloudnary";
async function HandleFile(file) {
	try {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		// await mkdir('public/files', { recursive: true }).catch((err) => {
		//     if (err.code !== 'EEXIST') {
		//         throw err;
		//     }
		// });
		// const path = `public/files/${file.name}`;
		// await writeFile(path, buffer);
		const res = await uploadFile(buffer);

		return res;
	} catch (error) {
		console.log(error.message);
	}
}

export default HandleFile;
