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


        /*
        // setup bindable members
        vm.getTithesRunningTotal = getTithesRunningTotal;

        ////////////////////////////

        // init
        activate();

        function activate() {
            vm.getTithesRunningTotal();
            console.log("Activated Tithes Running Total Controller");
        }

        function getTithesRunningTotal(date) {
            tithingDataService.getTithesRunningTotal(date)
                .then(function (response) {
                    titheVars.tithesRunningTotal.data = response.data;
                    vm.tithesRunningTotal = titheVars.tithesRunningTotal;
                })
                .catch(function (reason) {
                    console.log("Error getting Tithes Running Total");
                });
        }
        */
    }

})();