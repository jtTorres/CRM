(function () {

    "use strict";
    angular.module("app")
        .controller("membershipController", membershipController);

    membershipController.$inject = ["membershipDataService", "utilityService", "operationFlowService"];

    function membershipController(membershipDataService, utilityService, operationFlowService) {
        var vm = this;

        vm.doSaveMembership = doSaveMembership;
        vm.genders = [
            { Name: "Male", Abbreviation: "M" },
            { Name: "Female", Abbreviation: "F" }
        ];
        vm.maritalStatuses = [
            { Name: "Unknown", ID: 0 },
            { Name: "Single", ID: 1 },
            { Name: "Married", ID: 2 },
            { Name: "Divorced", ID: 3 },
            { Name: "Widowed", ID: 4 }
        ];

        vm.stateList = membershipDataService.getStateList();
        vm.memberGroups = [
            { Name: "Unknown", ID: 0 },
            { Name: "Adults", ID: 1 },
            { Name: "Youth", ID: 2 },
            { Name: "Children", ID: 3 }

        ];
        /////////////////////////////

        activate();

        function activate() {
            console.log("Activated Membership Controller");
        }

        function doSaveMembership(membershipRecord) {
            if (utilityService.isUndefinedOrNull(membershipRecord.MemberId)) {
                return membershipDataService.addMembership(membershipRecord)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            } else {
                return membershipDataService.updateMembership(membershipRecord)
                    .then(onSaveSuccess)
                    .catch(onSaveError);
            }
        }

        function onSaveSuccess(response) {
            vm.processFlow = operationFlowService.operationCompletion("Membership Saved Successfully!", true);
        }

        function onSaveError(reason) {
            vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
        }
    }

})();