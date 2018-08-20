(function () {

    "use strict";
    angular.module("app")
        .controller("dashboardController", dashboardController);

    dashboardController.$inject = ["membershipDataService", "tithingDataService", "offeringDataService", "entitySelectorService", "transactionsDataService", "enumsDataService"];

    function dashboardController(membershipDataService, tithingDataService, offeringDataService, entitySelectorService, transactionsDataService, enumsDataService) {
        var vm = this;

        //////////////////////

        activate();
        function activate() {
            getMemberCounts();
            getTithesRunningTotal();
            getOfferingsRunningTotal();
            getExpensesRunningTotal();
        }

        function getMemberCounts() {
            membershipDataService.getMemberCount()
                .then(function (response) {
                    vm.memberCounts = response.data.MemberCount;
                });
        }

        function getTithesRunningTotal() {
            tithingDataService.getTithesRunningTotal()
                .then(function (response) {
                    vm.tithesSum = response.data;
                });
        }

        function getOfferingsRunningTotal() {
            offeringDataService.getRunningTotals(null, entitySelectorService.entityType.Offering)
                .then(function (response) {
                    vm.offeringsSum = response.data;
                });
        }

        function getExpensesRunningTotal() {
            transactionsDataService.getExpensesRunningTotal(null, enumsDataService.transactionInquiryTypes.Expenses)
                .then(function (response) {
                    vm.expensesSum = response.data;
                });
        }

    }

})();