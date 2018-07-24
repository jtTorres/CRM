﻿(function () {

    "use strict";
    angular.module("app")
        .controller("contactInformationController", contactInformationController);

    contactInformationController.$inject = ["enumsDataService", "$scope", "operationFlowService"];

    function contactInformationController(enumsDataService, $scope, operationFlowService) {

        var vm = this;

        vm.followLastCurrentActiveIndex = followLastCurrentActiveIndex;
        vm.enums = { contactMethods: enumsDataService.enums.contactMethods };
        vm.onRemoveContactInfo = onRemoveContactInfo;
        vm.submit = submit;
        vm.edit = edit;
        ////////////////////////////


        function followLastCurrentActiveIndex(currentIndex, arrayCount) {
            return vm.onFindActiveIndex({ currentIndex: currentIndex, arrayCount: arrayCount });
        }

        function onRemoveContactInfo(index) {
            $scope.$emit("contactInfoRemoveContact", index);
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