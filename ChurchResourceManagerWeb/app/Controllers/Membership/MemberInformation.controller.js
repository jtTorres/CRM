(function () {

    "use strict";
    angular.module("app")
        .controller("memberInformationController", memberInformationController);

    memberInformationController.$inject = ["$scope", "enumsDataService"];

    function memberInformationController($scope, enumsDataService) {
        var vm = this;
        vm.displayAddRelativeButton = displayAddRelativeButton;
        vm.onAddRelative = onAddRelative;
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

        function displayAddRelativeButton(currentIndex, relativesCount) {
            return currentIndex === relativesCount;
        }

        function onAddRelative() {
            $scope.$emit("memberInfoAddRelative");
        }
    }

})();