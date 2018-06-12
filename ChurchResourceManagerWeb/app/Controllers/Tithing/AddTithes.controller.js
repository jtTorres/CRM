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
            //setupDefaults();
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
            // TODO: what this method is doing needs to be changed more in the future. Ideally, this controller would call the parent controller and it will take care of doing all this stuff

            updateTodaysTotal(vm.Tithe.TitheAmount);

            vm.Tithe = utilityService.clearObject(vm.Tithe);
            titheVars.tithingActivity.data = utilityService.clearObject(titheVars.tithingActivity.data);
        }

        function onMemberSelected(item, model, label) {
            if (utilityService.isUndefinedOrNull(vm.Tithe.MemberId) ||
                !utilityService.isUndefinedOrNull(item.MemberId) && vm.Tithe.MemberId !== item.MemberId)
                vm.Tithe.MemberId = item.MemberId;

            vm.getMemberTithes({ memberId: vm.Tithe.MemberId });

        }

        function updateTodaysTotal(titheAmount) {

            titheAmount = parseFloat(titheAmount);
            titheVars.tithesRunningTotal.data = parseFloat(titheVars.tithesRunningTotal.data);

            titheVars.tithesRunningTotal.data += titheAmount;
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