(function () {

    "use strict";

    angular.module("app")
        .controller("reportingTabsController", reportingTabsController);

    reportingTabsController.$inject = [];

    function reportingTabsController() {

        var vm = this;


        vm.dateFormat = "MM/dd/yyyy";
        vm.openFromDate = openFromDate;
        vm.openToDate = openToDate;
        //////////////////

        function openFromDate() {
            vm.isOpenFromDate = true;
        }

        function openToDate() {
            vm.isOpenToDate = true;
        }
    }

})();