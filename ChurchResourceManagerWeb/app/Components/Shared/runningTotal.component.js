(function () {

    "use strict";
    angular.module("app")
        .component("runningTotals",
            {
                templateUrl: "/Shared/RunningTotals",
                controller: "tithesRunningTotalController",
                controllerAs: "trt",
                bindings: {
                    tithesRunningTotal: "<",
                    getTithesRunningTotal: "&"
                }
            });

})();