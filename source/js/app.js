/* DOM-элементы */

/* в form.html финальная кнопка */
const firstScreenBtn = document.querySelector(".form__button");

const menuToggle = document.querySelector(".menu-toggle");
const siteHeaderNavigation = document.querySelector(".page-header__navigation");


/* функции-обработчики */

/* кликнули в корзине отправить заявку */
const onSubmitOrderClick = function (evt) {

}

const onMenuToggleClick = function () {
	siteHeaderNavigation.classList.remove("page-header__navigation--nojs");

	if ()
}

/* навешиваю счетчики */
firstScreenBtn.addEventListener("click", onSubmitOrderClick);
menuToggle.addEventListener("click", onMenuToggleClick);
