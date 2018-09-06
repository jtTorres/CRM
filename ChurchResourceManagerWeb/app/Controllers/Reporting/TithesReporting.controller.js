(function () {

    "use strict";

    angular.module("app")
        .controller("tithesReportingController", tithesReportingController);

    tithesReportingController.$inject = ["tithingDataService"];

    function tithesReportingController(tithingDataService) {
        var vm = this;

        vm.getTithingActivity = getTithingActivity;
        vm.noResults = false;
        vm.tithingActivityPanelSettings = {
            panelHeading: "Tithing Activity",
            isOpen: false
        };
        //////////////////////////////

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
            if (response.data.length > 0)
                vm.tithingActivityPanelSettings.isOpen = true;
            else
                vm.noResults = true;
        }
    }

})();