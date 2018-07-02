(function () {

    "use strict";

    angular.module("app")
        .controller("editOfferingController", editOfferingController);

    editOfferingController.$inject = [];

    function editOfferingController() {

        var vm = this;


        vm.updateOffering = updateOffering;
        ///////////////////////////////////

        vm.$onInit = function () {
            vm.Offering = vm.resolve.offeringToEdit;
            vm.updateTotals = vm.resolve.addToTotal.updateTotals;
        }

        function updateOffering(offering) {
            return vm.resolve.save.saveOffering(offering)
                .then(function () {
                    vm.close({ $value: offering });
                });
        }


    }

})();