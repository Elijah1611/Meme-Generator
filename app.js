// Disable for intellisense
const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);
const create = selector => document.createElement(selector);

// New Meme Preview

const newMemeObj = {
	id: Math.floor(Math.random() * 16777216).toString(16),
	photo:
		"https://cobblestone.me/wp-content/plugins/photonic/include/images/placeholder.png",
	top: { text: "", size: "3rem" },
	bottom: { text: "", size: "3rem" },
};

// Local Storage Functionality
function checkLocalStorageState() {
	const allMemes = localStorage.getItem("memes");
	if (!allMemes) {
		localStorage.setItem("memes", JSON.stringify([]));
	}
}

function saveMemeToLocalStorage(newMeme) {
	const allMemes = JSON.parse(localStorage.getItem("memes"));
	allMemes.push(newMeme);
	localStorage.setItem("memes", JSON.stringify(allMemes));
}

// New Meme Form

const newMemeForm = select("#newMemeForm");

newMemeForm.addEventListener("submit", e => {
	e.preventDefault();
});

// Photo Preview

const memePhotoPreview = select(".memePreviewPhoto");
const memeTopTextPreview = select(".memePreviewTopText");
const memeBottomTextPreview = select(".memePreviewBottomText");
const memePhotoURLInput = select(".memePhotoURL");

memePhotoURLInput.addEventListener("input", e => {
	newMemeObj.photo = e.target.value;
	memePhotoPreview.setAttribute("src", newMemeObj.photo);
});

function resetMemeImagePreview(img) {
	img.src =
		"https://cobblestone.me/wp-content/plugins/photonic/include/images/placeholder.png";
}

function resetMemePreviewText() {
	memeTopTextPreview.innerText = "";
	memeBottomTextPreview.innerText = "";
}

function resetNewMemeForm() {
	newMemeForm.reset();
}

function resetMakeNewMemeSection() {
	resetMemeImagePreview(memePhotoPreview);
	resetMemePreviewText();
	resetNewMemeForm();
}

// New Meme Top Text

const memeTopTextInput = select(".memeTopText");
const memeTopTextSizeInput = select(".memeTopTextSize");

memeTopTextInput.addEventListener("input", e => {
	newMemeObj.top.text = e.target.value;
	memeTopTextPreview.classList.add("classicMemeTextStyle");
	memeTopTextPreview.innerText = newMemeObj.top.text.toUpperCase();
});

memeTopTextSizeInput.addEventListener("input", e => {
	newMemeObj.top.size = e.target.value;
	memeTopTextPreview.style.fontSize = `${newMemeObj.top.size}rem`;
});

// New Meme Bottom Text

const memeBottomTextInput = select(".memeBottomText");
const memeBottomTextSizeInput = select(".memeBottomTextSize");

memeBottomTextInput.addEventListener("input", e => {
	newMemeObj.bottom.text = e.target.value;
	memeBottomTextPreview.classList.add("classicMemeTextStyle");
	memeBottomTextPreview.innerText = newMemeObj.bottom.text.toUpperCase();
});

memeBottomTextSizeInput.addEventListener("input", e => {
	newMemeObj.bottom.size = e.target.value;
	memeBottomTextPreview.style.fontSize = `${newMemeObj.bottom.size}rem`;
});

// Save Submit

const saveNewMemeBtn = select(".saveBtn");

saveNewMemeBtn.addEventListener("click", e => {
	console.log("Saving...", newMemeObj);
	saveMemeToLocalStorage(newMemeObj);
	resetMakeNewMemeSection();
});

(function main() {
	console.log("running...");
	checkLocalStorageState();
})();
