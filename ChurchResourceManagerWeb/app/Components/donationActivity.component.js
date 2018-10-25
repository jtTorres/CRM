(function () {

    "use strict";
    angular.module("app")
        .component("donationActivity",
            {
                templateUrl: "/Donations/DonationActivity",
                controller: "donationActivityController",
                controllerAs: "dac",
                bindings: {
                    getDonationActivity: "&",
                    openEditModal: "&",
                    openDeleteModal: "&",
                    donationActivity: "<",
                    panelSettings: "<",
                    donationActivityType: "@",
                    includeDateColumn: "@",
                    showEditDelete: "@"
                }
            });

})();