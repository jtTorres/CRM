(function () {

    "use strict";

    angular.module("app")
        .controller("membershipReportingController", membershipReportingController);

    membershipReportingController.$inject = ["membershipDataService"];

    function membershipReportingController(membershipDataService) {

        var vm = this;

        vm.getMembership = getMembership;

        //////////////////

        function getMembership(searchType, startDate, endDate, familyId, memberId) {
            switch (searchType) {
                case "Family":
                    membershipDataService.getMembershipByFamilyId(familyId)
                        .then(searchComplete);
                    break;
                case "Member":
                    membershipDataService.getMembershipByMemberId(memberId)
                        .then(searchComplete);
                    break;
                default:
                    break;
            }
        }

        function searchComplete(response) {
            vm.noResults = false;
            vm.members = response.data;
            if (response.data.length === 0) {
                vm.noResults = true;
            }
        }

    }

})();