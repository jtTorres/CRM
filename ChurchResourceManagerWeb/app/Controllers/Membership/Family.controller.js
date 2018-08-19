(function () {

    "use strict";
    angular.module("app")
        .controller("familyController", familyController);

    familyController.$inject = ["operationFlowService", "$scope"];

    function familyController(operationFlowService, $scope) {
        var vm = this;

        vm.submit = submit;
        vm.edit = edit;
        ///////////////////////


        function submit(family, form) {
            if (!operationFlowService.isFormValid(form)) return;
            vm.onSubmit({ family: family });
        }

        function edit() {
            vm.onEdit({ formName: "familyForm" });
        }

        function resetForm() {
            operationFlowService.resetForm(vm.addFamilyForm);
        }

        $scope.$on("onClearForms", resetForm);

    }

})();