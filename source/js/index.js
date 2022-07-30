const buttonBefore = document.querySelector(".progress-bar__button--before");
const buttonAfter = document.querySelector(".progress-bar__button--after");
const viewport = document.documentElement.clientWidth;

buttonAfter.removeAttribute("disabled");

if (viewport >= 768) {
	buttonBefore.removeAttribute("disabled");
}
