const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);

function clearPage() {
	const main = select("main");

	for (let element of main.children) {
		console.log("removing", element);
		element.remove();
	}

	select("main button").remove();
}

function renderPhotoPage() {}

function photoHandler() {}
