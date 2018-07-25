(function () {

    "use strict";
    angular.module("app")
        .component("addressReadOnly",
            {
                templateUrl: "/Membership/AddressReadOnly/",
                controller: "addressController",
                controllerAs: "ac",
                bindings: {
                    locationAddress: "<"
                }
            });

})();