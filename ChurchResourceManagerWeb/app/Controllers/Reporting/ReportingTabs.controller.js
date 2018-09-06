(function () {

    "use strict";

    angular.module("app")
        .controller("reportingTabsController", reportingTabsController);

    reportingTabsController.$inject = ["membershipDataService"];

    function reportingTabsController(membershipDataService) {

        var vm = this;
        vm.onGoButton = onGoButton;


        vm.dateFormat = "MM/dd/yyyy";
        vm.openFromDate = openFromDate;
        vm.openToDate = openToDate;
        //////////////////

        activate();
        function activate() {
            getAllMembership();
        }

        function openFromDate() {
            vm.isOpenFromDate = true;
        }

        function openToDate() {
            vm.isOpenToDate = true;
        }

        function onGoButton(searchType, startDate, endDate, familyId, memberId) {
            vm.goButton({ searchType: searchType, startDate: startDate, endDate: endDate, familyId: familyId, memberId: memberId });
        }

        function getAllMembership() {
            membershipDataService.getAllMembership()
                .then(function (response) {
                    vm.allMembership = response.data;
                });
        }
    }

})();