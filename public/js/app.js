$(document).ready(function () {
    $(window).on('hashchange', selectView);

    var currentPage = window.location.hash.replace('#', '');

    init();

    function init() {
        setActiveMenu();
        setActivePage();

        setTimeout(function () {
            $('.content').addClass('animate');
        })        
    }

    function selectView() {
        currentPage = window.location.hash.replace('#', '');

        setActiveMenu();
        setActivePage();
    }

    function setActivePage() {
        $('.page').removeClass('active');
        $('.page[data-page="' + currentPage + '"]').addClass('active');
    }

    function setActiveMenu() {
        $('header a').removeClass('active');
        $('header a[href="#' + currentPage + '"]').addClass('active');
    }
});
