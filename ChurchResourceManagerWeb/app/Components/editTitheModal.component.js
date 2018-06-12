(function () {

    "use strict";
    angular.module("app")
        .component("editTitheModal",
            {
                templateUrl: "/Tithing/EditTithe",
                controller: "editTitheController",
                controllerAs: "etc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });
})();