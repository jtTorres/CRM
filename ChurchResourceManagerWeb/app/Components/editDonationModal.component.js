(function () {

    "use strict";
    angular.module("app")
        .component("editDonationModal",
            {
                templateUrl: "/Donations/EditDonation",
                controller: "editDonationController",
                controllerAs: "edc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();