(function () {

    "use strict";
    angular.module("app")
        .controller("financialSummaryController", financialSummaryController);

    financialSummaryController.$inject = ["offeringDataService", "tithingDataService", "donationsDataService", "entitySelectorService"];

    function financialSummaryController(offeringDataService, tithingDataService, donationsDataService, entitySelectorService) {
        var vm = this;
        vm.getTotals = getTotals;

        ////////////////////////////

        activate();

        function activate() {

        }

        function getTotals(searchType, startDate, endDate, familyId, memberId) {
            tithingDataService.getTithingActivityByDateRange(startDate, endDate, entitySelectorService.entityType.Tithe)
                .then(getTithingTotalsComplete);

            offeringDataService.getRunningTotalsByDateRange(startDate, endDate, entitySelectorService.entityType.Offering)
                .then(getOfferingTotalsComplete);

            donationsDataService.getRunningTotalsByDateRange(startDate, endDate, entitySelectorService.entityType.Donation)
                .then(getDonationTotalsComplete);
        }

        function getTithingTotalsComplete(response) {
            vm.tithingRunningTotal = response;
        }

        function getOfferingTotalsComplete(response) {
            vm.offeringRunningTotal = response;
        }

        function getDonationTotalsComplete(response) {
            vm.donationRunningTotal = response;
        }
    }

})();