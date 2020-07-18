// Disable for intellisense
const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);
const create = selector => document.createElement(selector);

let memePhoto =
	"https://cobblestone.me/wp-content/plugins/photonic/include/images/placeholder.png";
let topText = { text: "", size: "3rem" };
let bottomText = { text: "", size: "3rem" };

const form = select("form");
const image = select(".stockImg");
const topTextLabel = select(".memePreviewTopText");
const bottomTextLabel = select(".memePreviewBottomText");

const localMemes = JSON.parse(localStorage.getItem("memes"));
const allMemesHeading = select("main h2").innerText;
const makeAMemeHeading = select("main h2").innerText;

if (!localStorage.getItem("memes")) {
	localStorage.setItem(
		"memes",
		JSON.stringify([
			{
				id: "1",
				photo:
					"https://karlaspetcare.com/wp-content/uploads/2019/03/Understanding-Your-Cats-Body-Language.png",
				top: { text: "My First Meme", size: "3rem" },
				bottom: { text: "You Better Like It!", size: "3rem" },
			},
		]),
	);
}

function allMemes() {
	const section = select("section");

	if (localMemes) {
		for (const meme of localMemes) {
			buildMemeImage(meme.id, meme.photo, meme.top, meme.bottom);
		}
	}

	// Delete memes
	section.addEventListener("click", e => {
		if (
			e.target.tagName === "BUTTON" &&
			e.target.parentElement.tagName === "DIV" &&
			e.target.parentElement.className === "memePreview"
		) {
			const newMemeSet = localMemes.filter(
				m => m.id !== e.target.parentElement.id,
			);
			localStorage.setItem("memes", JSON.stringify(newMemeSet));

			e.target.parentElement.remove();

			const notification = create("div");
			notification.classList.add("notification");
			notification.innerText = "Removed!";
			select("body").append(notification);
			setTimeout(() => {
				select(".notification").remove();
			}, 6000);
		}
	});
}

function buildMemeImage(id, photo, top, bottom) {
	const wrapper = create("div");
	const textWrapper = create("div");
	textWrapper.classList.add("allMemesTextWrapper");
	wrapper.classList.add("memePreview");
	wrapper.setAttribute("id", id);

	const image = create("img");
	image.classList.add("memeImg");
	image.setAttribute("src", photo);

	const topMemeText = create("span");
	topMemeText.classList.add("memePreviewTopText");

	const bottomMemeText = create("span");
	bottomMemeText.classList.add("memePreviewBottomText");

	const deleteBtn = create("button");
	deleteBtn.classList.add("deleteBtn");
	deleteBtn.innerText = "❌";

	topMemeText.innerText = top.text;
	topMemeText.style.fontSize = `${top.size}rem`;
	bottomMemeText.innerText = bottom.text;
	bottomMemeText.style.fontSize = `${bottom.size}rem`;

	textWrapper.append(topMemeText);
	textWrapper.append(bottomMemeText);
	wrapper.append(textWrapper);
	wrapper.append(image);
	wrapper.append(deleteBtn);
	select("section").append(wrapper);
}

function makeMeme() {
	form.addEventListener("input", e => {
		if (e.target.name === "photoURL") {
			memePhoto = e.target.value;
		}

		if (e.target.name === "topText") {
			if (e.target.type === "number") {
				topText.size = e.target.value;
				topTextLabel.style.fontSize = `${topText.size}rem`;
			}
			if (e.target.type === "text") {
				topText.text = e.target.value;
				topTextLabel.classList.add("memeTextStyle");
				topTextLabel.innerText = topText.text.toUpperCase();
			}
		}

		if (e.target.name === "bottomText") {
			if (e.target.type === "number") {
				bottomText.size = e.target.value;
				bottomTextLabel.style.fontSize = `${bottomText.size}rem`;
			}
			if (e.target.type === "text") {
				bottomText.text = e.target.value;
				bottomTextLabel.classList.add("memeTextStyle");
				bottomTextLabel.innerText = bottomText.text.toUpperCase();
			}
		}
	});

	const memePreviewOverlay = select(".memePreview div");
	memePreviewOverlay.addEventListener("click", e => {
		image.setAttribute("src", memePhoto);
	});

	form.addEventListener("submit", e => {
		e.preventDefault();
		save();
		const photoUrl = select(".memePhotoUrl");
		const topMemeText = select(".topMemeText");
		const bottomMemeText = select(".bottomMemeText");
		photoUrl.value = "";
		topMemeText.value = "";
		bottomMemeText.value = "";
	});
}

function save() {
	const idGen = Math.floor(Math.random() * 16777216).toString(16);
	const newMeme = {
		id: idGen,
		photo: memePhoto,
		top: topText,
		bottom: bottomText,
	};
	localMemes.push(newMeme);
	localStorage.setItem("memes", JSON.stringify(localMemes));
}

if (allMemesHeading === "ALL MEMES") allMemes();
if (makeAMemeHeading === "MAKE A MEME!") makeMeme();
