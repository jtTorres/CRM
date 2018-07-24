(function () {

    "use strict";
    angular.module("app")
        .component("address",
            {
                templateUrl: "/Membership/Address/",
                controller: "addressController",
                controllerAs: "ac",
                bindings: {
                    onSubmit: "&",
                    locationAddress: "<",
                    beingEdited: "<",
                    onEdit: "&",
                    stateList: "<"
                }
            });

})();