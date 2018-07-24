(function () {

    "use strict";
    angular.module("app")
        .controller("addressController", addressController);

    addressController.$inject = ["operationFlowService", "membershipDataService"];

    function addressController(operationFlowService, membershipDataService) {
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
    }

})();