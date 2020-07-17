// Disable for intellisense
// const select = selector => document.querySelector(selector);
// const selectAll = selector => document.querySelectorAll(selector);
// const create = selector => document.createElement(selector);
const body = document.querySelector("body");
const main = document.querySelector("main");
const nextBtn = document.querySelector(".nextBtn");
const backBtn = document.querySelector(".backBtn");
const pages = [start, addPhoto, addTopText, addBottomText, results];
let page = 0;

// localStorage.setItem(
// 	"memes",
// 	JSON.stringify([
// 		{
// 			photo:
// 				"https://karlaspetcare.com/wp-content/uploads/2019/03/Understanding-Your-Cats-Body-Language.png",
// 			topText: "My First Meme",
// 			bottomText: "Hello World",
// 		},
// 	]),
// );

const localMemes = JSON.parse(localStorage.getItem("memes"));

const allMemesHeading = document.querySelector("h2").innerText;

if (allMemesHeading === "All Memes") {
	if (localMemes) {
		// loop
		for (const meme of localMemes) {
			buildMemeImage(meme.photo, meme.topText, meme.bottomText);
		}
	}
}

function inputMaker(inputConfig) {
	const form = document.createElement("form");
	const label = document.createElement("label");
	label.innerText = inputConfig.label;
	label.setAttribute("id", inputConfig.id);
	const photoInput = document.createElement("input");
	photoInput.setAttribute("type", inputConfig.type);
	photoInput.setAttribute("name", inputConfig.id);
	photoInput.setAttribute("placeholder", inputConfig.placeholder);

	form.append(label);
	form.append(photoInput);
	document.querySelector("section").append(form);
}

let memePhoto =
	"https://cobblestone.me/wp-content/plugins/photonic/include/images/placeholder.png";
let topText;
let bottomText;

function addPhoto() {
	const inputConfig = {
		id: "photoURL",
		type: "text",
		placeholder: "Image URL",
		label: "Photo Label",
	};
	inputMaker(inputConfig);

	// Listen to input for image
	const form = document.querySelector("form");
	const image = document.createElement("img");
	image.classList.add("stockImg");

	form.addEventListener("input", e => {
		memePhoto = e.target.value;
		console.log(e.target.value);
	});

	// Set initial image
	image.setAttribute("src", memePhoto);
	document.querySelector("section").insertBefore(image, form);

	image.addEventListener("click", e => {
		document.querySelector(".stockImg").setAttribute("src", memePhoto);
	});
}

function addTopText() {
	const inputConfig = {
		id: "topText",
		type: "text",
		placeholder: "Top Text",
		label: "Top Text Label",
	};

	inputMaker(inputConfig);
	topText = inputConfig.placeholder;

	// Listen to input for top text
	const form = document.querySelector("form");

	form.addEventListener("input", e => {
		e.preventDefault();
		topText = e.target.value;
		const formLabel = document.querySelector("form label");
		formLabel.classList.add("memeTextStyle");
		formLabel.innerText = topText.toUpperCase();
	});
}

function addBottomText() {
	const inputConfig = {
		id: "bottomText",
		type: "text",
		placeholder: "Bottom Text",
		label: "Bottom Text Label",
	};

	inputMaker(inputConfig);
	bottomText = inputConfig.placeholder;

	// Listen to input for bottom text
	const form = document.querySelector("form");

	form.addEventListener("input", e => {
		bottomText = e.target.value;
		const formLabel = document.querySelector("form label");
		formLabel.classList.add("memeTextStyle");
		formLabel.innerText = bottomText.toUpperCase();
	});
}

function buildMemeImage(photo, textTop, textBottom) {
	const wrapper = document.createElement("div");
	wrapper.classList.add("meme-wrapper");

	const image = document.createElement("img");
	image.classList.add("meme-img");
	image.setAttribute("src", photo);

	const topMemeText = document.createElement("p");
	topMemeText.classList.add("meme-top-text");

	const bottomMemeText = document.createElement("p");
	bottomMemeText.classList.add("meme-bottom-text");

	topMemeText.innerText = textTop;
	bottomMemeText.innerText = textBottom;

	wrapper.append(topMemeText);
	wrapper.append(bottomMemeText);
	wrapper.append(image);
	document.querySelector("section").append(wrapper);
}

function results() {
	buildMemeImage(memePhoto, topText, bottomText);

	backBtn.remove();
	nextBtn.remove();

	const newMeme = { photo: memePhoto, topText, bottomText };
	localMemes.push(newMeme);
	localStorage.setItem("memes", JSON.stringify(localMemes));
}

function pageHandler(btnType) {
	if (btnType === "next" && page < pages.length - 1) page += 1;
	if (btnType === "back" && page > 0) page -= 1;

	console.log(page);

	pages[page]();
}

function start() {
	console.log("start");
}

main.addEventListener("click", e => {
	if (e.target.tagName === "BUTTON") {
		e.target.parentElement.parentElement.children[1].remove();

		const section = document.createElement("section");
		main.insertBefore(section, document.querySelector(".navigation"));

		if (e.target.classList.contains("nextBtn")) pageHandler("next");

		if (e.target.classList.contains("backBtn")) pageHandler("back");
	}
});

start();
