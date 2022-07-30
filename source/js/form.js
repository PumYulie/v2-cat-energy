const formSubmitButton = document.querySelector(".form__button");

const onSubmitOrderClick = function (evt) {
	alert(evt.target);
}

/* СДЕЛАТЬ НАДПИСЬ и ПЕРЕМЕСТИТЬ В ДРУГОЙ JS-ФАЙЛ ПОД ФОРМУ!!!!*/
if (formSubmitButton) {
	if (formSubmitButton.hasAttribute("disabled")) {
		formSubmitButton.removeAttribute("disabled");
	/* 	убрать полоску, которая говорит что-нибудь про извините, просим перезагрузить сайт */
	}
	formSubmitButton.addEventListener("click", evt => onSubmitOrderClick(evt));
}
