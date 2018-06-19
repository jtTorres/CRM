(function () {

    "use strict";

    angular.module("app")
        .controller("tithingActivityController", tithingActivityController);

    tithingActivityController.$inject = [];

    function tithingActivityController() {
        var vm = this;

        vm.deleteTithe = deleteTithe;
        vm.editTithe = editTithe;

        ///////////////


        vm.$onInit = function () {
            vm.getTithingActivity({ tithingActivityType: vm.tithingActivityType });
        }

        function editTithe(tithe, index) {
            vm.openEditModal({ tithe: tithe, index: index });
        }

        function deleteTithe(titheId, memberId) {
            vm.openDeleteModal({ titheId: titheId, memberId: memberId });
        }

    }

})();