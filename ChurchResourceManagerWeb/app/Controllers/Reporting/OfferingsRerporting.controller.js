(function () {

    "use strict";

    angular.module("app")
        .controller("offeringsReportingController", offeringsReportingController);

    offeringsReportingController.$inject = ["offeringDataService"];

    function offeringsReportingController(offeringDataService) {
        var vm = this;

        vm.getOfferingActivity = getOfferingActivity;
        vm.offeringActivityPanelSettings = {
            panelHeading: "Offering Activity",
            isOpen: false
        };
        vm.reset = reset;

        ///////////////////

        activate();

        function activate() {
            reset();
        }

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

        function calculateOfferingStats(offerings) {
            vm.totalCount = offerings.length;
            var totals = 0;
            angular.forEach(offerings, function (record, key, obj) {
                totals = record.OfferingAmount + totals;
            });
            vm.runningTotal.data = totals;
        }

        function reset() {
            vm.noResults = false;
            vm.offeringActivity = [];
            vm.runningTotal = { data: "0" };
        }

    }

})();