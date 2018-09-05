(function () {

    "use strict";

    angular.module("app")
        .component("reportingTabs",
            {
                templateUrl: "/Reporting/ReportingTabs/",
                controller: "reportingTabsController",
                controllerAs: "rtc",
                bindings: {
                    reportType: "@",
                    goButton: "&"
                }
            });

})();