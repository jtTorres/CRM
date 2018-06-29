(function () {

    "use strict";
    angular.module("app")
        .controller("runningTotalController", runningTotalController);

    runningTotalController.$inject = [];

    function runningTotalController() {
        var vm = this;

        // setup bindable members
        vm.refreshTotals = refreshTotals;

        ////////////////////////////


        function refreshTotals() {
            vm.getTithesRunningTotal();
        }
    }

})();