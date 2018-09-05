(function () {

    "use strict";

    angular.module("app")
        .controller("tithesReportingController", tithesReportingController);

    tithesReportingController.$inject = ["tithingDataService"];

    function tithesReportingController(tithingDataService) {
        var vm = this;


        vm.getTithingActivity = getTithingActivity;
        vm.tithingActivityPanelSettings = {
            panelHeading: "Tithing Activity",
            isOpen: false
        };
        //////////////////////////////

        function getTithingActivity(searchType, startDate, endDate, familyId, memberId) {
            switch (searchType) {
                case "DateRange":
                    tithingDataService.getTithingActivityByDateRange(startDate, endDate)
                        .then(function (response) {
                            vm.tithingActivity = response.data;
                            if (response.data.length > 0)
                                vm.tithingActivityPanelSettings.isOpen = true;
                        });
                    break;
                default:
                    break;
            }
        }
    }

})();