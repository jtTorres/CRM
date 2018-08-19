(function () {

    "use strict";
    angular.module("app")
        .controller("memberEntryCompleteController", memberEntryCompleteController);

    memberEntryCompleteController.$inject = [];

    function memberEntryCompleteController() {
        var vm = this;

        vm.closeModal = closeModal;
        vm.ok = ok;
        /////////////////////////////

        function ok() {
            vm.close();
        }

        function closeModal() {
            vm.dismiss();
        }
    }

})();