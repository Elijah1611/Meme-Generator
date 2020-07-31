// Disable for intellisense
const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);
const create = selector => document.createElement(selector);

// New Meme Preview

const newMemeObj = {
	id: Math.floor(Math.random() * 16777216).toString(16),
	photo:
		"https://cobblestone.me/wp-content/plugins/photonic/include/images/placeholder.png",
	top: { text: "", size: 3 },
	bottom: { text: "", size: 3 },
	created: new Date(),
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

function deleteMemeInLocalStorage(id) {
	const allMemes = JSON.parse(localStorage.getItem("memes"));
	const modifiedMemeSet = allMemes.filter(m => m.id !== id);
	localStorage.setItem("memes", JSON.stringify(modifiedMemeSet));
}

// Navigation Buttons

const newMemeBtn = select("#newMemeBtn");
const allMemesBtn = select("#allMemesBtn");
const newMemeSection = select(".newMemeSection");
const allMemeSection = select(".allMemeSection");
const MakeMemeHeading = select("#MakeMemeHeading");
const AllMemesHeading = select("#AllMemesHeading");

newMemeBtn.addEventListener("click", e => {
	document.title = "Make A Meme | MemeME";

	newMemeSection.classList.remove("hidden");
	allMemeSection.classList.add("hidden");

	MakeMemeHeading.classList.remove("hidden");
	AllMemesHeading.classList.add("hidden");
});

allMemesBtn.addEventListener("click", e => {
	document.title = "All Memes | MemeME";

	allMemeSection.classList.remove("hidden");
	newMemeSection.classList.add("hidden");

	AllMemesHeading.classList.remove("hidden");
	MakeMemeHeading.classList.add("hidden");
});

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
	memeBottomTextPreview.innerText = newMemeObj.bottom.text.toUpperCase();
});

memeBottomTextSizeInput.addEventListener("input", e => {
	newMemeObj.bottom.size = e.target.value;
	memeBottomTextPreview.style.fontSize = `${newMemeObj.bottom.size}rem`;
});

// Render All Memes
const memeGallery = select(".memeGallery");

function buildMemeImage(wrapper, photo) {
	const image = create("img");
	image.classList.add("memeImg");

	image.src = photo;

	wrapper.append(image);
}

function buildMemeText(wrapper, memeObj) {
	const imgTextWrapper = create("div");
	imgTextWrapper.classList.add("memeGalleryImgText");

	const topText = create("span");
	const bottomText = create("span");

	topText.classList.add("topText");
	topText.classList.add("classicMemeTextStyle");

	topText.innerText = memeObj.top.text;
	topText.style.fontSize = `${memeObj.top.size}rem`;

	bottomText.classList.add("bottomText");
	bottomText.classList.add("classicMemeTextStyle");

	bottomText.innerText = memeObj.bottom.text;
	bottomText.style.fontSize = `${memeObj.bottom.size}rem`;

	imgTextWrapper.append(topText);
	imgTextWrapper.append(bottomText);

	wrapper.append(imgTextWrapper);
}

function buildMemeGalleryThumbnail(memeObj, parentEl = memeGallery) {
	const memeGalleryImgWrapper = create("div");

	memeGalleryImgWrapper.setAttribute("data-id", memeObj.id);
	memeGalleryImgWrapper.classList.add("memeGalleryImgWrapper");

	buildMemeText(memeGalleryImgWrapper, memeObj);
	buildMemeImage(memeGalleryImgWrapper, memeObj.photo);

	parentEl.append(memeGalleryImgWrapper);
}

function renderAllMemes() {
	const allMemes = JSON.parse(localStorage.getItem("memes"));

	allMemes.forEach(meme => {
		buildMemeGalleryThumbnail(meme);
	});
}

function clearAllMemes() {
	memeGallery.innerHTML = "";
}

function refreshAllMemes() {
	clearAllMemes();
	renderAllMemes();
}

// Display Modal

function buildDateText(appendEl) {
	const dateText = create("p");
	dateText.classList.add("memeCreatedDate");
	dateText.innerText = "Created: Unknown";
	appendEl.append(dateText);
}

function handleMemeDate(date) {
	const createdDateText = select(".memeCreatedDate");

	if (date) {
		createdDateText.innerText = `Created: ${new Date(date).toDateString()}`;
	}
}

function showMemeInModal(wrapperElement) {
	const displayModal = select(".displayModal");

	const memeId = wrapperElement.dataset.id;

	const allMemeObj = JSON.parse(localStorage.getItem("memes"));

	const clickMemeObj = allMemeObj.find(meme => meme.id === memeId);

	buildDateText(displayModal);

	buildMemeGalleryThumbnail(clickMemeObj, displayModal);

	handleMemeDate(clickMemeObj.created);

	displayModal.classList.remove("hidden");
}

function toggleDisplayModal() {
	memeGallery.addEventListener("click", e => {
		let wrapperElement = null;
		const containsClass = c => e.target.classList.contains(c);

		if (containsClass("classicMemeTextStyle")) {
			wrapperElement = e.target.parentElement.parentElement;
			showMemeInModal(wrapperElement);
		} else if (containsClass("memeGalleryImgText")) {
			wrapperElement = e.target.parentElement;
			showMemeInModal(wrapperElement);
		}
	});

	const displayModal = select(".displayModal");

	displayModal.addEventListener("click", e => {
		const date = select(".displayModal .memeCreatedDate");
		const meme = select(".displayModal .memeGalleryImgWrapper");

		displayModal.classList.add("hidden");
		meme.remove();
		date.remove();
	});

	activateDeleteMemes();
}

// Delete Meme

function activateDeleteMemes() {
	console.log("delete active");
	const deleteBtn = select(".deleteBtn");

	deleteBtn.addEventListener("click", e => {
		const meme = select(".displayModal .memeGalleryImgWrapper");

		deleteMemeInLocalStorage(meme.dataset.id);

		refreshAllMemes();
	});
}

// Notifications

const notificationBubble = select(".notification");
const notifySaveText = select(".notifySaveText");
const notifyDeleteText = select(".notifyDeleteText");

function showSavedMessage() {
	notificationBubble.classList.remove("hidden");
	notifySaveText.classList.remove("hidden");

	setTimeout(() => {
		notificationBubble.classList.add("hidden");
		notifySaveText.classList.add("hidden");
	}, 6000);
}

function showDeleteMessage() {
	notificationBubble.classList.remove("hidden");
	notifyDeleteText.classList.remove("hidden");

	setTimeout(() => {
		notificationBubble.classList.add("hidden");
		notifyDeleteText.classList.add("hidden");
	}, 6000);
}

// Save Submit on Make A Meme Page

const saveNewMemeBtn = select(".saveBtn");

saveNewMemeBtn.addEventListener("click", e => {
	saveMemeToLocalStorage(newMemeObj);
	resetMakeNewMemeSection();
	refreshAllMemes();
	showSavedMessage();
});

(function main() {
	checkLocalStorageState();
	renderAllMemes();
	toggleDisplayModal();
})();
