(function () {

    "use strict";

    angular.module("app")
        .controller("membershipReportingController", membershipReportingController);

    membershipReportingController.$inject = ["membershipDataService", "operationFlowService"];

    function membershipReportingController(membershipDataService, operationFlowService) {

        var vm = this;
        vm.getMembership = getMembership;
        vm.reset = reset;
        //////////////////

        activate();

        function activate() {
            reset();
        }

        function getMembership(searchType, startDate, endDate, familyId, memberId) {
            reset();
            if (startDate === undefined)
                startDate = new Date(1900, 1, 1);

            switch (searchType) {
                case "Family":
                    membershipDataService.getMembershipByFamilyId(familyId)
                        .then(searchComplete);
                    break;
                case "Member":
                    membershipDataService.getMembershipByMemberId(memberId)
                        .then(searchComplete);
                    break;
                case "MembershipDate":
                    membershipDataService.getMembershipByMembershipDate(startDate, endDate)
                        .then(searchComplete);
                    break;
                case "ExitDate":
                    membershipDataService.getMembershipByExitDate(startDate, endDate)
                        .then(searchComplete);
                    break;
                case "DateOfBirth":
                    membershipDataService.getMembershipByDateOfBirth(startDate, endDate)
                        .then(searchComplete);
                    break;
                default:
                    operationFlowService.operationCompletion("Please select a search type!", false);
                    vm.invalidReportType = true;
                    break;
            }
        }

        function searchComplete(response) {
            vm.noResults = false;
            vm.members = response.data;
            if (response.data.length === 0) {
                vm.noResults = true;
            }
            calculateMembershipStats(vm.members);
        }

        function calculateMembershipStats(membership) {
            vm.totalCount = membership.length;
            vm.activeCount = 0;
            vm.terminatedCount = 0;
            vm.maleCount = 0;
            vm.femaleCount = 0;
            vm.adultsCount = 0;
            vm.youthCount = 0;
            vm.childrenCount = 0;

            angular.forEach(membership, function (record, key, obj) {

                switch (record.MembershipStatusId) {
                    case 1: //Active
                        vm.activeCount++;
                        break;
                    case 5: //Terminated
                        vm.terminatedCount++;
                        break;
                    default:
                        break;
                }

                switch (record.Gender) {
                    case "M":
                        vm.maleCount++;
                        break;
                    default:
                        vm.femaleCount++;
                        break;
                }

                switch (record.GroupId) {
                    case 1:
                        vm.adultsCount++;
                        break;
                    case 2:
                        vm.youthCount++;
                        break;
                    case 3:
                        vm.childrenCount++;
                        break;
                }
            });
        }

        function reset() {
            vm.noResults = undefined;
            vm.members = [];
            vm.activeCount = 0;
            vm.terminatedCount = 0;
            vm.totalCount = 0;
            vm.maleCount = 0;
            vm.femaleCount = 0;
            vm.adultsCount = 0;
            vm.youthCount = 0;
            vm.childrenCount = 0;
            vm.invalidReportType = false;
        }

    }

})();