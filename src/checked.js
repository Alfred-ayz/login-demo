export default async function checked({ userName, password }) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (userName === "aoyang" && password === "aoyang") {
				resolve();
			} else {
				reject();
			}
		}, 1000);
	});
}
