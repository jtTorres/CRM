(function () {

    "use strict";
    angular.module("app")
        .controller("memberInformationController", memberInformationController);

    memberInformationController.$inject = ["$scope", "enumsDataService", "operationFlowService"];

    function memberInformationController($scope, enumsDataService, operationFlowService) {
        var vm = this;

        vm.dateFormat = "MM/dd/yyyy";
        vm.edit = edit;
        vm.followLastCurrentActiveIndex = followLastCurrentActiveIndex;
        vm.doAddRelative = doAddRelative;
        vm.onRemoveRelative = onRemoveRelative;
        vm.openDob = openDob;
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

        function doAddRelative() {
            $scope.$emit("memberInfoAddRelative");
            //vm.onAddRelative();
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

        function openDob() {
            vm.isOpenDob = true;
        }
    }

})();