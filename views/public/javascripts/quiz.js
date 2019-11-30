$(() => {
    /* UI */
    class AnnouncementViews extends Views {
    }

    class AnnouncementPresenters extends Presenters {
    }

    /* Client */
    const quizClient = function () {
        $("#footerMenu").load("footer_menu.html");
    }();
});

