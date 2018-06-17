(function () {

    "use strict";
    angular.module("app")
        .component("deleteTitheModal",
            {
                templateUrl: "/Tithing/DeleteTitheModal",
                controller: "deleteTitheController",
                controllerAs: "dtc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();