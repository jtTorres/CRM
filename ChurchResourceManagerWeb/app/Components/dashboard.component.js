(function () {

    "use strict";

    angular.module("app")
        .component("dashboard",
            {
                templateUrl: "/Dashboard/Dashboard/",
                controller: "dashboardController",
                controllerAs: "dc",
                bindings: {
                    
                }
            });

})();