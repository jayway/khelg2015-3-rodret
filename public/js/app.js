$(document).ready(function () {
    $(window).on('hashchange', selectView);

    function selectView() {
        console.info(window.location.hash);

        showPage(window.location.hash.replace('#', ''));
    }

    function showPage(pageName) {
        $('.page').removeClass('show');
        $('.page[data-page="' + pageName + '"]').addClass('show');
    }

});
