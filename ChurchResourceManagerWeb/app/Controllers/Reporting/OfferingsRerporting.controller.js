(function () {

    "use strict";

    angular.module("app")
        .controller("offeringsReportingController", offeringsReportingController);

    offeringsReportingController.$inject = ["offeringDataService"];

    function offeringsReportingController(offeringDataService) {
        var vm = this;

        vm.getOfferingActivity = getOfferingActivity;
        vm.noResults = false;
        vm.offeringActivityPanelSettings = {
            panelHeading: "Offering Activity",
            isOpen: false
        };
        vm.runningTotal = { data: "0" };

        ///////////////////


        function getOfferingActivity(searchType, startDate, endDate, familyId, memberId) {
            switch (searchType) {
                case "DateRange":
                    offeringDataService.getOfferingActivityByDateRange(startDate, endDate)
                        .then(searchComplete);
                    break;
                default:
                    break;
            }
        }

        function searchComplete(response) {
            vm.noResults = false;
            vm.offeringActivity = response.data;
            vm.offeringActivityPanelSettings.isOpen = true;
            if (response.data.length === 0) {
                vm.noResults = true;
            }
            calculateOfferingStats(vm.offeringActivity);
        }

        function calculateOfferingStats(membership) {
            vm.totalCount = membership.length;
            vm.activeCount = 0;
            vm.terminatedCount = 0;
            var totals = 0;
            angular.forEach(membership, function (record, key, obj) {
                totals = record.OfferingAmount + totals;
            });
            vm.runningTotal.data = totals;
        }

    }

})();