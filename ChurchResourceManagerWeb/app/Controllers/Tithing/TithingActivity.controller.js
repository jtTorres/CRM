(function () {

    "use strict";

    angular.module("app")
        .controller("tithingActivityController", tithingActivityController);

    tithingActivityController.$inject = ["tithingDataService", "utilityService"];

    function tithingActivityController(tithingDataService, utilityService) {
        var vm = this;

        // setup bindable members
        vm.getTithingActivity = getTithingActivity;
        vm.editTithe = editTithe;
        vm.editingTithe = false;
        vm.openDeleteTitheModal = openDeleteTitheModal;
        vm.openEditTitheModal = openEditTitheModal;
        //vm.tithingActivity = {};
        ///////////////

        activate();

        function activate() {
            getTithingActivity();
        }

        function getTithingActivity() {
            tithingDataService.getTithingActivity()
                .then(function (response) {
                    vm.tithingActivity = response.data;
                    tithingDataService.tithingActivity = vm.tithingActivity;
                })
                .catch(function (reason) {
                    vm.processFlow = utilityService.processCompletion(vm.processFlow, reason.message, false);
                });
        }

        function editTithe(tithe, index) {
            tithingDataService.titheToEdit = angular.copy(tithe);
            tithingDataService.titheToEdit.editIndex = index;
            vm.editingTithe = true;
            vm.openEditTitheModal();    
        }

        // #region modals
        function openEditTitheModal() {
            utilityService.openModal("editTitheModal");
        }

        function openDeleteTitheModal(titheId, titheIndex) {
            tithingDataService.titheToDelete = {
                titheId: titheId,
                titheIndex: titheIndex
            };
                utilityService.openModal("deleteTithesModal");
        }
        // #endregion
    }

})();