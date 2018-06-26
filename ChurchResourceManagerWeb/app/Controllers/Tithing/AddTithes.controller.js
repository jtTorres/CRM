﻿(function () {

    "use strict";
    angular.module("app")
        .controller("addTithesController", addTithesController);

    addTithesController.$inject = ["tithingDataService", "utilityService", "membershipDataService", "operationFlowService"];

    function addTithesController(tithingDataService, utilityService, membershipDataService, operationFlowService) {

        var vm = this;

        // setup bindable members
        vm.addTithe = addTithe;
        vm.allMembership = {};
        vm.clearForm = clearForm;
        vm.MemberTithes = {};
        vm.onMemberSelected = onMemberSelected;
        vm.Tithe = {};
        /////////////////////////

        activate();

        function activate() {
            setTitheFromBinding();
            getAllMembership();
            console.log("Activated Add Tithes Controller");
        }

        function getAllMembership() {
            vm.allMembership = membershipDataService.allMembership;
        }

        function addTithe(titheRecord, form) {
            if (!operationFlowService.isFormValid(form)) return;

            //form.$setPristine();

            vm.onSave({ tithe: titheRecord })
                .then(onSaveSuccess);
        }

        function onSaveSuccess(response) {
            clearForm();
            vm.clearTithingActivity();
            vm.setMemberActivityPanelDefaults();
        }

        function onMemberSelected(item, model, label) {
            if (utilityService.isUndefinedOrNull(vm.Tithe.MemberId) ||
                !utilityService.isUndefinedOrNull(item.MemberId) && vm.Tithe.MemberId !== item.MemberId)
                vm.Tithe.MemberId = item.MemberId;

            vm.getMemberTithes({ memberId: vm.Tithe.MemberId });

        }

        function setTitheFromBinding() {
            if (!utilityService.isUndefinedOrNull(vm.tithe))
                vm.Tithe = vm.tithe;
        }

        function clearForm() {
            vm.Tithe = utilityService.clearObject(vm.Tithe);
            vm.addTithesForm.$setPristine();
            vm.addTithesForm.$setUntouched();
        }

    }

})();