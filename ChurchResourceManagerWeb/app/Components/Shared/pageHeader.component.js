(function () {

    "use strict";
    angular.module("app")
        .component("pageHeader",
            {
                templateUrl: "/Shared/PageHeader",
                controller: "pageHeaderController",
                controllerAs: "phc",
                bindings: {
                    pageTitle: "@"
                }
            });

})();