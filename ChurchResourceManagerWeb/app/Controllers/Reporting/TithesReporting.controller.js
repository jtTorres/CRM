(function () {

    "use strict";

    angular.module("app")
        .controller("tithesReportingController", tithesReportingController);

    tithesReportingController.$inject = ["tithingDataService"];

    function tithesReportingController(tithingDataService) {
        var vm = this;

        vm.getTithingActivity = getTithingActivity;
        vm.reset = reset;
        vm.tithingActivityPanelSettings = {
            panelHeading: "Tithing Activity",
            isOpen: false
        };
        //////////////////////////////

        activate();

        function activate() {
            reset();
        }

        function getTithingActivity(searchType, startDate, endDate, familyId, memberId) {
            switch (searchType) {
                case "DateRange":
                    tithingDataService.getTithingActivityByDateRange(startDate, endDate)
                        .then(searchComplete);
                    break;
                case "Family":
                    tithingDataService.getTithingActivityByFamilyId(familyId)
                        .then(searchComplete);
                    break;
                case "Member":
                    tithingDataService.getMemberTithes(memberId, new Date())
                        .then(searchComplete);
                    break;
                default:
                    break;
            }
        }

        function searchComplete(response) {
            vm.noResults = false;
            vm.tithingActivity = response.data;
            if (response.data.length > 0) {
                vm.tithingActivityPanelSettings.isOpen = true;
                var totals = 0;
                angular.forEach(vm.tithingActivity, function (record, key, obj) {
                    totals = record.TitheAmount + totals;
                });
                vm.runningTotal.data = totals;
            }
            else
                vm.noResults = true;
        }

        function reset() {
            vm.tithingActivity = [];
            vm.noResults = false;
            vm.runningTotal = { data: "0" };
        }
    }

})();