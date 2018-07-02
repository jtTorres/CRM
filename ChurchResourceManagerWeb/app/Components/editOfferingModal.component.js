(function () {

    "use strict";
    angular.module("app")
        .component("editOfferingModal",
            {
                templateUrl: "/Offerings/EditOffering",
                controller: "editOfferingController",
                controllerAs: "eoc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();