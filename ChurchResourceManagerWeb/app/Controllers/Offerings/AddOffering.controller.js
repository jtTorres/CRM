(function () {

    "use strict";

    angular.module("app")
        .controller("addOfferingController", addOfferingController);

    addOfferingController.$inject = ["utilityService", "operationFlowService"];

    function addOfferingController(utilityService, operationFlowService) {
        var vm = this;


        vm.addOffering = addOffering;
        vm.clearForm = clearForm;
        //////////////////////

        activate();
        function activate() {
            setOfferingFromBinding();
            console.log("Activated Add Offering Controller");
        }

        function addOffering(offering, form) {
            if (!operationFlowService.isFormValid(form)) return;

            vm.onSave({ offering: offering })
                .then(onSaveSuccess);
        }

        function onSaveSuccess() {
            clearForm();
        }

        function setOfferingFromBinding() {
            if (!utilityService.isUndefinedOrNull(vm.offering))
                vm.Offering = vm.offering;
        }

        function clearForm() {
            vm.Offering = utilityService.clearObject(vm.Offering);
            vm.addOfferingsForm.$setPristine();
            vm.addOfferingsForm.$setUntouched();
        }
    }

})();