﻿(function () {

    "use strict";
    angular.module("app")
        .controller("membershipController", membershipController);

    membershipController.$inject = ["membershipDataService", "utilityService", "operationFlowService", "$scope", "enumsDataService"];

    function membershipController(membershipDataService, utilityService, operationFlowService, $scope, enumsDataService) {
        var vm = this;
        vm.addRelative = addRelative;
        vm.emptyMemberInfo = {};

        vm.getEmptyMemberInfo = getEmptyMemberInfo;
        vm.Membership = {};
        vm.memberInfoArray = [];
        vm.doSaveMembership = doSaveMembership;
        vm.stateList = membershipDataService.getStateList();
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
                    vm.memberInfoArray.push(response.data);
                })
                .catch(function (reason) {
                    vm.processFlow = operationFlowService.operationCompletion(reason.message, false);
                });
        }

        $scope.$on("memberInfoAddRelative", addRelative);
        $scope.$on("memberInfoRemoveRelative", removeRelative);

        function addRelative() {
            var emptyMemberInfoCopy = angular.copy(vm.emptyMemberInfo);
            vm.memberInfoArray.push(emptyMemberInfoCopy);
        }

        function removeRelative(event, index) {
            vm.memberInfoArray.splice(index, 1);
        }


        // #endregion
    }

})();