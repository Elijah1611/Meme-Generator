// Disable for intellisense
const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);
const create = selector => document.createElement(selector);

const memePhotoPreview = select(".memePreviewPhoto");
const photoURLInput = select("#photoURLInput");

const newMeme = {
	id: Math.floor(Math.random() * 16777216).toString(16),
	photo:
		"https://cobblestone.me/wp-content/plugins/photonic/include/images/placeholder.png",
	top: { text: "", size: "3rem" },
	bottom: { text: "", size: "3rem" },
};

photoURLInput.addEventListener("input", e => {
	newMeme.photo = e.target.value;
	memePhotoPreview.setAttribute("src", newMeme.photo);
});
