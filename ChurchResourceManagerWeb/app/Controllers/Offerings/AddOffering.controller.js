(function () {

    "use strict";

    angular.module("app")
        .controller("addOfferingController", addOfferingController);

    addOfferingController.$inject = [];

    function addOfferingController() {
        var vm = this;


        vm.addOffering = addOffering;
        //////////////////////

        function addOffering(offering) {
            vm.onSave({ offering: offering });
        }
    }

})();