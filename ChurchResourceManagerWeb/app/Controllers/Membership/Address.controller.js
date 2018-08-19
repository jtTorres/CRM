(function () {

    "use strict";
    angular.module("app")
        .controller("addressController", addressController);

    addressController.$inject = ["operationFlowService", "$scope"];

    function addressController(operationFlowService, $scope) {
        var vm = this;

        vm.edit = edit;
        vm.submit = submit;
        ///////////////////////


        function edit() {
            vm.onEdit({ formName: "addressInfoForm" });
        }

        function submit(addressInfo, form) {
            if (!operationFlowService.isFormValid(form)) return;
            vm.onSubmit({ addressInfo: addressInfo });
        }

        function resetForm() {
            operationFlowService.resetForm(vm.addressInfoMainForm);
        }

        $scope.$on("onClearForms", resetForm);
    }

})();