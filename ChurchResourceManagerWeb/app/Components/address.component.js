(function () {

    "use strict";
    angular.module("app")
        .component("address",
            {
                templateUrl: "/Membership/Address/",
                controller: "addressController",
                controllerAs: "fc",
                bindings: {
                    onSubmit: "&",
                    address: "<"
                }
            });

})();