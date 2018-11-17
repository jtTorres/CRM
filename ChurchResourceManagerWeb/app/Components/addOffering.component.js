(function () {

    "use strict";

    angular.module("app")
        .component("addOffering",
            {
                templateUrl: "/Offerings/AddOffering/",
                controller: "addOfferingController",
                controllerAs: "aoc",
                bindings: {
                    onSave: "&",
                    offering: "<",
                    enums: "<"
                }
            });
})();