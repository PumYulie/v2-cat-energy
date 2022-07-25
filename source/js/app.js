const headerNavigation = document.querySelector(".page-header__navigation");
const formSubmitButton = document.querySelector(".form__button");
const menuToggle = document.querySelector(".page-header__menu-toggle"); /* кнопка меню */
const menuToggleSvg = document.querySelector(".menu-toggle__svg");
const mobileMenuList = document.querySelector(".page-header__menu-list");

if (headerNavigation.classList.contains("page-header__navigation--nojs")) {
	headerNavigation.classList.remove("page-header__navigation--nojs");
}

/* СДЕЛАТЬ НАДПИСЬ */
if (formSubmitButton) {
	if (formSubmitButton.hasAttribute("disabled")) {
		formSubmitButton.removeAttribute("disabled");
	/* 	убрать полоску, которая говорит что-нибудь про извините, просим перезагрузить сайт */
	}
	formSubmitButton.addEventListener("click", evt => onSubmitOrderClick(evt));
}

const onMenuToggleClick = function (evt) {
	console.log(evt);
	/* если меню открыто = на кнопке висит сигнальный класс --menu-openned */
	if (menuToggle.classList.contains("menu-toggle--menu-openned")) {
		menuToggle.classList.remove("menu-toggle--menu-openned");
		/* меняю в use  href чтобы отображалась иконка бургера из спрайта */
		menuToggleSvg.firstElementChild.setAttribute("href", "./img/vector-sprite.svg#menu-burger-icon");
		/* вернуть размеры бургера, удалив изменяющий размеры класс */
		menuToggleSvg.classList.remove("menu-toggle__svg--close-icon");
		menuToggle.lastElementChild.textContent = "Открыть меню сайта";
		mobileMenuList.classList.remove("page-header__menu-list--opened");
	} else {
		menuToggle.classList.add("menu-toggle--menu-openned");
		/* 	меняю классом размеры svg под закрывающий крестик */
		menuToggleSvg.classList.add("menu-toggle__svg--close-icon");
		/* меняю в use href на #menu-close-icon, чтобы отображался крестик из спрайта */
		menuToggleSvg.firstElementChild.setAttribute("href", "./img/vector-sprite.svg#menu-close-icon");
		menuToggle.lastElementChild.textContent = "Закрыть меню сайта";
		mobileMenuList.classList.add("page-header__menu-list--opened");
	}
}

const onSubmitOrderClick = function (evt) {
	alert(evt.target);
}

menuToggle.addEventListener("click", evt => onMenuToggleClick(evt));
