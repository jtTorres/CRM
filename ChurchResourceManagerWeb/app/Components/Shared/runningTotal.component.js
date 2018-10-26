(function () {

    "use strict";
    angular.module("app")
        .component("runningTotals",
            {
                templateUrl: "/Shared/RunningTotals",
                controller: "runningTotalController",
                controllerAs: "rtc",
                bindings: {
                    runningTotal: "<",
                    title: "@",
                    getTithesRunningTotal: "&"
                }
            });

})();