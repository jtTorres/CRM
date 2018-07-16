(function () {

    "use strict";
    angular.module("app")
        .controller("membershipController", membershipController);

    membershipController.$inject = ["membershipDataService", "utilityService", "operationFlowService", "$scope", "enumsDataService"];

    function membershipController(membershipDataService, utilityService, operationFlowService, $scope, enumsDataService) {
        var vm = this;
        vm.addRelative = addRelative;
        vm.emptyMemberInfo = {};

        vm.getEmptyMemberInfo = getEmptyMemberInfo;
        vm.memberInfoArray = [];
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
            getEmptyMemberInfo();
            getAllEnums();
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

        function getAllEnums() {
            enumsDataService.getContactMethods().then(function (response) {
                enumsDataService.enums.contactMethods = response.data;
            });

            enumsDataService.getMembershipStatuses().then(function (response) {
                enumsDataService.enums.membershipStatuses = response.data;
            });

            enumsDataService.getRelationshipTypes().then(function (response) {
                enumsDataService.enums.relationshipTypes = response.data;
            });

            enumsDataService.getMaritalStatuses().then(function (response) {
                enumsDataService.enums.maritalStatuses = response.data;
            });

            enumsDataService.getMemberGroups().then(function (response) {
                enumsDataService.enums.memberGroups = response.data;
            });
        }

        // #region Add Membership Controller
        function getEmptyMemberInfo() {
            membershipDataService.getEmptyMemberInfo()
                .then(function (response) {
                    vm.emptyMemberInfo = angular.copy(response.data);
                    vm.memberInfoArray.push(vm.emptyMemberInfo);
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        $scope.$on("memberInfoAddRelative", addRelative);

        function addRelative() {
            var emptyMemberInfoCopy = angular.copy(vm.emptyMemberInfo);
            vm.memberInfoArray.push(emptyMemberInfoCopy);
        }
        // #endregion
    }

})();