(function () {

    "use strict";

    angular.module("app")
        .component("addDonation",
            {
                templateUrl: "/Donations/AddDonation/",
                controller: "addDonationController",
                controllerAs: "adc",
                bindings: {
                    onSave: "&",
                    donation: "<",
                    onClearForm: "&",
                    enums: "<"
                }
            });

})();