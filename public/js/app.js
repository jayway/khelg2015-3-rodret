$(document).ready(function () {
    $(window).on('hashchange', selectView);

    init();

    function init() {
        setActiveMenu();
    }

    function selectView() {
        setActiveMenu();
        showPage(window.location.hash.replace('#', ''));
    }

    function showPage(pageName) {
        $('.page').removeClass('show');
        $('.page[data-page="' + pageName + '"]').addClass('show');
    }

    function setActiveMenu() {
        $('header a').removeClass('active');
        $('header a[href="' + window.location.hash + '"]').addClass('active');
    }
});
