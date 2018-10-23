(function () {

    "use strict";
    angular.module("app")
        .controller("editTitheController", editTitheController);

    editTitheController.$inject = ["uibDateParser"];

    function editTitheController(uibDateParser) {
        var vm = this;

        // #region bindable members
        vm.updateTithe = updateTithe;


        // #endregion

        vm.$onInit = function() {
            vm.Tithe = vm.resolve.titheToEdit;
            vm.Tithe.TitheDate = new Date(vm.Tithe.TitheDate);
            vm.updateTotals = vm.resolve.addToTotal.updateTotals;
        };

        function updateTithe(tithe) {

            return vm.resolve.save.saveTithe(tithe)
                .then(function() {
                    vm.close({ $value: tithe });
                });
        }

    }
})();