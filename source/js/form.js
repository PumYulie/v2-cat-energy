const formSubmitButton = document.querySelector(".form__button");

const onSubmitOrderClick = function (evt) {
	alert(evt.target);
}

if (formSubmitButton) {
	if (formSubmitButton.hasAttribute("disabled")) {
		formSubmitButton.removeAttribute("disabled");
	}
	formSubmitButton.addEventListener("click", evt => onSubmitOrderClick(evt));
}
