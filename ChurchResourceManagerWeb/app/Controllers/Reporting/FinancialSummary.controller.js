(function () {

    "use strict";
    angular.module("app")
        .controller("financialSummaryController", financialSummaryController);

    financialSummaryController.$inject = ["offeringDataService", "tithingDataService", "donationsDataService", "entitySelectorService", "usSpinnerService"];

    function financialSummaryController(offeringDataService, tithingDataService, donationsDataService, entitySelectorService, usSpinnerService) {
        var vm = this;
        vm.getTotals = getTotals;

        ////////////////////////////

        activate();

        function activate() {

        }

        function getTotals(searchType, startDate, endDate, familyId, memberId) {
            usSpinnerService.spin("spinner-FS");

            tithingDataService.getTithingActivityByDateRange(startDate, endDate, entitySelectorService.entityType.Tithe)
                .then(getTithingTotalsComplete);

            offeringDataService.getRunningTotalsByDateRange(startDate, endDate, entitySelectorService.entityType.Offering)
                .then(getOfferingTotalsComplete);

            donationsDataService.getRunningTotalsByDateRange(startDate, endDate, entitySelectorService.entityType.Donation)
                .then(getDonationTotalsComplete);
        }

        function getTithingTotalsComplete(response) {
            vm.tithingRunningTotal = response;
            usSpinnerService.stop("spinner-FS");
        }

        function getOfferingTotalsComplete(response) {
            vm.offeringRunningTotal = response;
            usSpinnerService.stop("spinner-FS");
        }

        function getDonationTotalsComplete(response) {
            vm.donationRunningTotal = response;
            usSpinnerService.stop("spinner-FS");
        }
    }

})();