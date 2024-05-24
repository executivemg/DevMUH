import axios from "axios";

export const GetEvent = async (url) => {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (error) {
		return error.message;
	}
};

export const DeleteEvent = async (url) => {
	try {
		const res = await axios.delete(url);
		return res.data;
	} catch (error) {
		console.log(error.message);
	}
};

export const UpdateEvent = async (url, formData) => {
	console.log(url);
	try {
		const res = await axios.put(url, formData);
		return res.data;
	} catch (error) {
		console.log(error.message);
		return { error: error.message };
	}
};
