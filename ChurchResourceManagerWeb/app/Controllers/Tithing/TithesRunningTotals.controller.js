(function () {

    "use strict";
    angular.module("app")
        .controller("tithesRunningTotalController", tithesRunningTotalController);

    tithesRunningTotalController.$inject = ["tithingDataService", "titheVars"];

    function tithesRunningTotalController(tithingDataService, titheVars) {
        var vm = this;

        // setup bindable members
        vm.refreshTotals = refreshTotals;

        ////////////////////////////


        function refreshTotals() {
            vm.getTithesRunningTotal();
        }
    }

})();