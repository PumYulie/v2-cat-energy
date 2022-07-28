const barPin = document.querySelector(".progress-bar__pin");
const rangeInput = document.querySelector(".progress-bar__input");
const buttonBefore = document.querySelector(".progress-bar__button--before");
const buttonAfter = document.querySelector(".progress-bar__button--after");
const catBeforeImage = document.querySelector(".example__cat--before");
const catAfterImage = document.querySelector(".example__cat--after");
const viewport = document.documentElement.clientWidth;


/* функция для смещения пина до упора налево */
const onButtonBeforeClick = function () {
	if (buttonBefore.hasAttribute("disabled")) { return; }

	buttonBefore.setAttribute("disabled", "disabled");
	buttonAfter.removeAttribute("disabled");

/* 	Пин переезжает налево до упора и меняются коты */
	rangeInput.value = 0;
	if (viewport < 768) {
		barPin.style.left = "6px";
		barPin.style.right = "auto";
		catAfterImage.classList.remove("example__cat--active");
		catBeforeImage.classList.add("example__cat--active");
	} else {
		barPin.style.left = `${rangeInput.value}%`;
	}
}


/* функция для крайне правого смещения пина */
const onButtonAfterClick = function () {
	if (buttonAfter.hasAttribute("disabled")) { return; }

	buttonAfter.setAttribute("disabled", "disabled");
	buttonBefore.removeAttribute("disabled");

	/* 	Пин переезжает направо до упора и меняются коты */
	rangeInput.value = 100;
	if (viewport < 768) {
		barPin.style.right = "6px";
		barPin.style.left = "auto";
		catBeforeImage.classList.remove("example__cat--active");
		catAfterImage.classList.add("example__cat--active");
	} else {
		barPin.style.left = `${rangeInput.value}%`;
	}
}


const onRangeInput = function () {
	if (viewport < 768) {
		rangeInput.value > 50 ? onButtonAfterClick() : onButtonBeforeClick();
	} else {
		barPin.style.left = `${rangeInput.value}%`;

		if (rangeInput.value !== 100) {
			buttonAfter.removeAttribute("disabled");
		}
		if (rangeInput.value !== 0) {
			buttonBefore.removeAttribute("disabled");
		}

	}
}


buttonBefore.addEventListener("click", onButtonBeforeClick);
buttonAfter.addEventListener("click", onButtonAfterClick);
rangeInput.addEventListener("input", onRangeInput);
