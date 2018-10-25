(function () {

    "use strict";

    angular.module("app")
        .controller("donationsReportingController", donationsReportingController);

    donationsReportingController.$inject = ["donationsDataService"];

    function donationsReportingController(donationsDataService) {
        var vm = this;

        vm.getDonationActivity = getDonationActivity;
        vm.runningTotal = { data: "0" };
        vm.reset = reset;
        vm.donationActivityPanelSettings = {
            panelHeading: "Donation Activity",
            isOpen: false
        };
        /////////////////////

        activate();

        function activate() {
            reset();
        }

        function getDonationActivity(searchType, startDate, endDate, familyId, memberId) {
            switch (searchType) {
                case "DonationDate":
                    donationsDataService.getDonationsByDonationDate(startDate, endDate)
                        .then(searchComplete);
                    break;
                case "Member":
                    donationsDataService.getDonationsByMemberId(memberId)
                        .then(searchComplete);
                    break;
                default:
                    break;
            }
        }

        function searchComplete(response) {
            vm.noResults = false;
            vm.donationActivity = response.data;
            vm.donationActivityPanelSettings.isOpen = true;
            if (response.data.length === 0) {
                vm.noResults = true;
            }
            //calculateTransactionStats(vm.transactions);
        }

        //function calculateTransactionStats(transactions) {
        //    var totals = 0;
        //    angular.forEach(transactions, function (record, key, obj) {
        //        totals = record.TransactionAmount + totals;
        //    });
        //    vm.runningTotal.data = totals;
        //}

        function reset() {
            vm.donationActivity = [];
            vm.noResults = false;
            vm.runningTotal = { data: "0" };
        }

    }

})();