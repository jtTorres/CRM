(function () {

    "use strict";
    angular.module("app")
        .controller("addTithesController", addTithesController);

    addTithesController.$inject = ["tithingDataService", "utilityService", "membershipDataService", "titheVars"];

    function addTithesController(tithingDataService, utilityService, membershipDataService, titheVars) {

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

        function addTithe(titheRecord) {

            vm.onSave({ tithe: titheRecord })
                .then(onSaveSuccess);
        }

        function onSaveSuccess(response) {
            vm.Tithe = utilityService.clearObject(vm.Tithe);
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
        }

    }

})();