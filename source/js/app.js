const headerNavigation = document.querySelector(".page-header__navigation");
const menuToggle = document.querySelector(".page-header__menu-toggle");
const menuToggleSvg = document.querySelector(".menu-toggle__svg");
const mobileMenuList = document.querySelector(".page-header__menu-list");

/* убираю блокировки элементов раз js подгрузился */
if (headerNavigation.classList.contains("page-header__navigation--nojs")) {
	headerNavigation.classList.remove("page-header__navigation--nojs");
}

/* счетчики и обработчики в header */
const onMenuToggleClick = function (evt) {
	/* если меню открыто = на кнопке висит сигнальный класс --menu-openned */
	if (menuToggle.classList.contains("menu-toggle--menu-openned")) {
		menuToggle.classList.remove("menu-toggle--menu-openned");
		/* меняю в use  href чтобы отображалась иконка бургера из спрайта */
		menuToggleSvg.firstElementChild.setAttribute("href", "./img/sprite.svg#burger-menu");
		/* вернуть размеры бургера, удалив изменяющий размеры класс */
		menuToggleSvg.classList.remove("menu-toggle__svg--close-icon");
		menuToggle.lastElementChild.textContent = "Открыть меню сайта";
		mobileMenuList.classList.remove("page-header__menu-list--opened");
	} else {
		menuToggle.classList.add("menu-toggle--menu-openned");
		/* 	меняю классом размеры svg под закрывающий крестик */
		menuToggleSvg.classList.add("menu-toggle__svg--close-icon");
		/* меняю в use href на #close-icon, чтобы отображался крестик из спрайта */
		menuToggleSvg.firstElementChild.setAttribute("href", "./img/sprite.svg#close-icon");
		menuToggle.lastElementChild.textContent = "Закрыть меню сайта";
		mobileMenuList.classList.add("page-header__menu-list--opened");
	}
}

menuToggle.addEventListener("click", evt => onMenuToggleClick(evt));
