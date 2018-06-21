(function () {

    "use strict";
    angular.module("app")
        .controller("tithesRunningTotalController", tithesRunningTotalController);

    tithesRunningTotalController.$inject = [];

    function tithesRunningTotalController() {
        var vm = this;

        // setup bindable members
        vm.refreshTotals = refreshTotals;

        ////////////////////////////


        function refreshTotals() {
            vm.getTithesRunningTotal();
        }
    }

})();