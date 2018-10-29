(function () {

    "use strict";

    angular.module("app")
        .controller("addOfferingController", addOfferingController);

    addOfferingController.$inject = ["utilityService", "operationFlowService", "$scope"];

    function addOfferingController(utilityService, operationFlowService, $scope) {
        var vm = this;


        vm.addOffering = addOffering;
        vm.clearForm = clearForm;
        vm.dateFormat = "MM/dd/yyyy";
        vm.openOfferingDate = openOfferingDate;
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
            utilityService.setFocus("dateTxtBx");
        }

        function setOfferingFromBinding() {
            if (!utilityService.isUndefinedOrNull(vm.offering))
                vm.Offering = vm.offering;
        }

        function clearForm() {
            //vm.Offering = utilityService.clearObject(vm.Offering);
            vm.Offering.OfferingAmount = undefined;
            vm.Offering.Comments = undefined;
            operationFlowService.resetForm(vm.addOfferingsForm);
        }

        function openOfferingDate() {
            vm.isOpenOfferingDate = true;
        }

        $scope.$on("reloadAddOfferings", clearForm);
    }

})();