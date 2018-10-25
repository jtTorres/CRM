(function () {

    "use strict";
    angular.module("app")
        .component("deleteDonationModal",
            {
                templateUrl: "/Donations/DeleteDonationModal/",
                controller: "deleteDonationController",
                controllerAs: "ddc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();