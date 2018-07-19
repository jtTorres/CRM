(function () {

    "use strict";
    angular.module("app")
        .controller("familyController", familyController);

    familyController.$inject = ["operationFlowService"];

    function familyController(operationFlowService) {
        var vm = this;

        vm.submit = submit;
        vm.edit = edit;
        ///////////////////////


        function submit(family, form) {
            if (!operationFlowService.isFormValid(form)) return;
            vm.onSubmit({ family: family });
        }

        function edit() {
            vm.onEdit({formName: "familyForm"});
        }

    }

})();