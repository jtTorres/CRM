(function () {

    "use strict";
    angular.module("app")
        .controller("contactInformationController", contactInformationController);

    contactInformationController.$inject = ["enumsDataService", "$scope", "operationFlowService", "$rootScope"];

    function contactInformationController(enumsDataService, $scope, operationFlowService, $rootScope) {

        var vm = this;

        vm.followLastCurrentActiveIndex = followLastCurrentActiveIndex;
        vm.enums = { contactMethods: enumsDataService.enums.contactMethods };
        vm.onEnableDisableContactInfo = onEnableDisableContactInfo;
        vm.submit = submit;
        vm.edit = edit;
        ////////////////////////////


        function followLastCurrentActiveIndex(currentIndex, arrayCount) {
            return vm.onFindActiveIndex({ currentIndex: currentIndex, arrayCount: arrayCount });
        }

        function onEnableDisableContactInfo(info) {
            vm.enableDisableContactInfo({ info: info });
        }

        function edit() {
            vm.onEdit({ formName: "contactInfoForm" });
        }

        function submit(contactInfo, form) {
            if (!operationFlowService.isFormValid(form)) return;
            vm.onSubmit({ contactInfo: contactInfo });
        }
    }

})();