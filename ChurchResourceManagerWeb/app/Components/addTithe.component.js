(function () {

    "use strict";
    angular.module("app")
        .component("addTithe",
            {
                templateUrl: "/Tithing/Addtithe",
                controller: "addTithesController",
                controllerAs: "atc",
                bindings: {
                    getMemberTithes: "&",
                    onSave: "&",
                    tithe: "<",
                    action: "@"
                }
            });

})();