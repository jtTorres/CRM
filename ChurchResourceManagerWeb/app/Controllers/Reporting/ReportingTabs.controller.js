(function () {

    "use strict";

    angular.module("app")
        .controller("reportingTabsController", reportingTabsController);

    reportingTabsController.$inject = ["membershipDataService", "utilityService"];

    function reportingTabsController(membershipDataService, utilityService) {

        var vm = this;
        vm.checkDateRange = checkDateRange;
        vm.onGoButton = onGoButton;
        vm.onResetTabs = onResetTabs;

        vm.dateFormat = "MM/dd/yyyy";
        vm.isDateRange = false;
        vm.openFromDate = openFromDate;
        vm.openToDate = openToDate;
        vm.yearFormat = "yyyy";
        vm.taxLetterDatePickerOptions = {
            formatYear: "yyyy",
            startingDay: 1,
            minMode: "year"
        };
        //////////////////

        activate();
        function activate() {
            getAllMembership();
            vm.radioButtons =
                {
                    selected: vm.selectedSearchType
                };
        }

        function openFromDate() {
            vm.isOpenFromDate = true;
        }

        function openToDate() {
            vm.isOpenToDate = true;
        }

        function onGoButton(searchType, startDate, endDate, familyId, memberId) {
            if (searchType === "DateRange" || searchType === "TaxLetters")
                vm.isDateRange = true;

            searchType = getAdditionalDateRangeOptions(searchType);
            vm.goButton({ searchType: searchType, startDate: checkDate(startDate), endDate: checkDate(endDate), familyId: familyId, memberId: memberId });
        }

        function onResetTabs() {
            vm.isDateRange = false;
            vm.fromDate = undefined;
            vm.toDate = undefined;
            vm.SelectedMember = "";
            vm.SelectedFamily = "";
            vm.resetTabs();
        }

        function getAllMembership() {
            membershipDataService.getAllMembership()
                .then(function (response) {
                    vm.allMembership = response.data;
                });
        }

        function getAdditionalDateRangeOptions(searchType) {
            if (searchType === "DateRange" && !utilityService.isUndefinedOrNull(vm.radioButtons))
                if (!utilityService.isUndefinedOrNull(vm.radioButtons.selected))
                    searchType = vm.radioButtons.selected;
            return searchType;
        }

        function checkDate(date) {
            if (!vm.isDateRange)
                return null;

            return utilityService.isUndefinedOrNull(date) ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) : date;
        }

        function checkDateRange() {
            if (!vm.isDateRange) {
                vm.fromDate = undefined;
                vm.toDate = undefined;
            }

        }
    }

})();