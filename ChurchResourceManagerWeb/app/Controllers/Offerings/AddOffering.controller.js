(function () {

    "use strict";

    angular.module("app")
        .controller("addOfferingController", addOfferingController);

    addOfferingController.$inject = ["utilityService", "operationFlowService"];

    function addOfferingController(utilityService, operationFlowService) {
        var vm = this;


        vm.addOffering = addOffering;
        //////////////////////

        function addOffering(offering, form) {
            if (!operationFlowService.isFormValid(form)) return;

            vm.onSave({ offering: offering })
                .then(onSaveSuccess);
        }

        function onSaveSuccess() {
            clearForm();
        }

        function clearForm() {
            vm.Offering = utilityService.clearObject(vm.Offering);
            vm.addOfferingsForm.$setPristine();
            vm.addOfferingsForm.$setUntouched();
        }
    }

})();