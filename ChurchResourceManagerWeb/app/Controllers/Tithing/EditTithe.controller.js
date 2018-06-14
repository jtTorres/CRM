(function () {

    "use strict";
    angular.module("app")
        .controller("editTitheController", editTitheController);

    editTitheController.$inject = ["tithingDataService", "utilityService", "membershipDataService", "titheVars", "$filter"];

    function editTitheController(tithingDataService, utilityService, membershipDataService, titheVars, $filter) {
        var vm = this;

        // #region bindable members
        vm.updateTithe = updateTithe;


        // #endregion

        vm.$onInit = function () {
            vm.Tithe = vm.resolve.titheToEdit;
        }

        function updateTithe(tithe) {

            return vm.resolve.save.saveTithe(tithe)
                .then(function() {
                    vm.close({ $value: tithe });
                });

            //return tithingDataService.updateTithe(tithe)
            //    .then(function (response) {

            //        //tithingDataService.updateTitheGrids(grid, 1, tithe);

            //        //closeEditTitheModal();
            //        //getTithesRunningTotal(new Date());
            //        //vm.processFlow = utilityService.processCompletion(vm.processFlow, "Tithe Updated Successfully!", true);

            //        vm.close({ $value: tithe });

            //    })
            //    .catch(function (reason) {
            //        //vm.processFlow = utilityService.processCompletion(vm.processFlow, reason.message, false);
            //    });
        }

    }
})();