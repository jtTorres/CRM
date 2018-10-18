﻿(function () {

    "use strict";

    angular.module("app")
        .controller("membershipReportingController", membershipReportingController);

    membershipReportingController.$inject = ["membershipDataService"];

    function membershipReportingController(membershipDataService) {

        var vm = this;
        vm.getMembership = getMembership;
        vm.reset = reset;
        //////////////////

        activate();

        function activate() {
            reset();
        }

        function getMembership(searchType, startDate, endDate, familyId, memberId) {
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
            });
        }

        function reset() {
            vm.noResults = undefined;
            vm.members = [];
            vm.activeCount = 0;
            vm.terminatedCount = 0;
            vm.totalCount = 0;
        }

    }

})();