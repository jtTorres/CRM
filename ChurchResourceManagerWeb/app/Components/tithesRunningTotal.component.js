(function () {

    "use strict";
    angular.module("app")
        .component("tithesRunningTotals",
            {
                templateUrl: "/Tithing/TithesRunningTotals",
                controller: "tithesRunningTotalController",
                controllerAs: "trt"
            });

})();