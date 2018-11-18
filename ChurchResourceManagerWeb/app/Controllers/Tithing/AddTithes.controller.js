(function () {

    "use strict";
    angular.module("app")
        .controller("addTithesController", addTithesController);

    addTithesController.$inject = ["utilityService", "membershipDataService", "operationFlowService", "$scope"];

    function addTithesController(utilityService, membershipDataService, operationFlowService, $scope) {

        var vm = this;

        // setup bindable members
        vm.addTithe = addTithe;
        vm.allMembership = {};
        vm.clearForm = clearForm;
        vm.dateFormat = "MM/dd/yyyy";
        vm.MemberTithes = {};
        vm.onMemberSelected = onMemberSelected;
        vm.openTitheDate = openTitheDate;
        vm.Tithe = {};
        /////////////////////////

        activate();

        function activate() {
            setTitheFromBinding();
            getAllMembership();
            console.log("Activated Add Tithes Controller");
        }

        function getAllMembership() {
            membershipDataService.getAllMembership()
                .then(function (response) {
                    vm.allMembership = response.data;
                });
        }

        function addTithe(titheRecord, form) {
            if (!operationFlowService.isFormValid(form)) return;

            vm.onSave({ tithe: titheRecord })
                .then(onSaveSuccess);
        }

        function onSaveSuccess(response) {
            clearForm();
            vm.clearTithingActivity();
            vm.setMemberActivityPanelDefaults();
            utilityService.setFocus("memberIdTextBx");
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
            //vm.Tithe = utilityService.clearObject(vm.Tithe);
            vm.Tithe.selectedMember = undefined;
            vm.Tithe.IsCheck = false;
            vm.Tithe.CheckNumber = undefined;
            vm.Tithe.TitheAmount = undefined;
            vm.Tithe.Comments = undefined;
            operationFlowService.resetForm(vm.addTithesForm);
        }

        function openTitheDate() {
            vm.isOpenTitheDate = true;
        }

        $scope.$on("reloadAddTithes", clearForm);
    }

})();