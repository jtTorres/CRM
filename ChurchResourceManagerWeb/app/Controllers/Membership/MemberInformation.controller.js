(function () {

    "use strict";
    angular.module("app")
        .controller("memberInformationController", memberInformationController);

    memberInformationController.$inject = ["$scope", "enumsDataService"];

    function memberInformationController($scope, enumsDataService) {
        var vm = this;

        vm.edit = edit;
        vm.followLastCurrentActiveIndex = followLastCurrentActiveIndex;
        vm.onAddRelative = onAddRelative;
        vm.onRemoveRelative = onRemoveRelative;
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

        function followLastCurrentActiveIndex(currentIndex, relativesCount) {
            return currentIndex === relativesCount;
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
    }

})();