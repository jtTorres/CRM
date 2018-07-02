(function () {

    "use strict";
    angular.module("app")
        .controller("deleteOfferingController", deleteOfferingController);

    deleteOfferingController.$inject = [];

    function deleteOfferingController() {
        var vm = this;

        vm.deleteOffering = deleteOffering;
        /////////////////////////////////////////////


        function deleteOffering() {
            vm.close();
        }

    }

})();