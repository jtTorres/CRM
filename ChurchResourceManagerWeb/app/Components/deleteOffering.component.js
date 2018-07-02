(function () {

    "use strict";
    angular.module("app")
        .component("deleteOfferingModal",
            {
                templateUrl: "/Offerings/DeleteOfferingModal",
                controller: "deleteOfferingController",
                controllerAs: "doc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();