(function () {

    "use strict";
    angular.module("app")
        .controller("memberInformationController", memberInformationController);

    memberInformationController.$inject = ["$scope", "enumsDataService", "operationFlowService"];

    function memberInformationController($scope, enumsDataService, operationFlowService) {
        var vm = this;

        vm.edit = edit;
        vm.followLastCurrentActiveIndex = followLastCurrentActiveIndex;
        vm.onAddRelative = onAddRelative;
        vm.onRemoveRelative = onRemoveRelative;
        vm.submit = submit;
        /////////////////////////


        activate();

        function activate() {
            console.log("Activated Member Information Controller");
            console.log(vm.accordionSettings);
            setupDropDowns();
        }

        function setupDropDowns() {
            vm.enums = enumsDataService.enums;
        }

        function followLastCurrentActiveIndex(currentIndex, arrayCount) {
            //return currentIndex === relativesCount;
            return vm.onFindActiveIndex({ currentIndex: currentIndex, arrayCount: arrayCount });
        }

        function onAddRelative() {
            $scope.$emit("memberInfoAddRelative");
        }

        function onRemoveRelative(index) {
            $scope.$emit("memberInfoRemoveRelative", index);
        }

        function edit() {
            vm.onEdit({ formName: "personalInfoForm" });
        }

        function submit(memberInfo, form) {
            if (!operationFlowService.isFormValid(form)) return;
            vm.onSubmit({ memberInfo: memberInfo });
        }
    }

})();