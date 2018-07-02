(function () {

    "use strict";

    angular.module("app")
        .factory("activitySelectorService", activitySelectorService);

    activitySelectorService.$inject = [];

    function activitySelectorService() {

        const activityReportType = {
            Today: 1,
            All: 2
        };

        return {
            activityReportType: activityReportType
        }
    }

})();