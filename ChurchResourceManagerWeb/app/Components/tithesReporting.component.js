(function () {

    "use strict";

    angular.module("app")
        .component("tithesReporting",
            {
                templateUrl: "/Reporting/TithesReport/",
                controller: "tithesReportingController",
                controllerAs: "trc",
                bindings: {
                }
            });

})();