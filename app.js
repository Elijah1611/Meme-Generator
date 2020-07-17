// Disable for intellisense
// const select = selector => document.querySelector(selector);
// const selectAll = selector => document.querySelectorAll(selector);
// const create = selector => document.createElement(selector);
const body = document.querySelector("body");
const main = document.querySelector("main");
let mainSection = document.querySelector("section");
const nextBtn = document.querySelector(".nextBtn");
const backBtn = document.querySelector(".backBtn");
const pages = [start, addPhoto, addTopText, addBottomText, results];
let page = 0;

function clearSection(element) {
	element.remove();
	const section = document.createElement("section");
	main.insertBefore(section, backBtn);
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
	"https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg";
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

	form.addEventListener("input", e => {
		memePhoto = e.target.value;
		image.setAttribute("src", memePhoto);
	});

	// Set initial image
	image.setAttribute("src", memePhoto);
	document.querySelector("section").append(image);
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
	const topTextDisplay = document.createElement("p");

	form.addEventListener("input", e => {
		topText = e.target.value;
		topTextDisplay.innerText = topText;
	});

	// Set initial text
	topTextDisplay.innerText = "Top Text Here";
	document.querySelector("section").insertBefore(topTextDisplay, form);
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
	const bottomTextDisplay = document.createElement("p");

	form.addEventListener("input", e => {
		bottomText = e.target.value;
		bottomTextDisplay.innerText = bottomText;
	});

	// Set initial text
	bottomTextDisplay.innerText = "Bottom Text Here";
	document.querySelector("section").insertBefore(bottomTextDisplay, form);
}

function results() {
	const wrapper = document.createElement("div");
	const image = document.createElement("img");
	const topMemeText = document.createElement("p");
	const bottomMemeText = document.createElement("p");
	image.setAttribute("src", memePhoto);
	topMemeText.innerText = topText;
	bottomMemeText.innerText = bottomText;
	wrapper.append(topMemeText);
	wrapper.append(image);
	wrapper.append(bottomMemeText);
	document.querySelector("section").append(wrapper);
}

function pageHandler(btnType) {
	if (btnType === "next" && page < pages.length - 1) page += 1;
	if (btnType === "back" && page > 0) page -= 1;

	console.log(page);

	pages[page]();
}

function start() {}

main.addEventListener("click", e => {
	if (e.target.tagName === "BUTTON") {
		clearSection(e.target.parentElement.children[1]);

		if (e.target.classList.contains("nextBtn")) pageHandler("next");

		if (e.target.classList.contains("backBtn")) pageHandler("back");
	}
});

start();
