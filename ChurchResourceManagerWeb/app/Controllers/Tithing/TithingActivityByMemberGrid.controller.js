(function () {

    "use strict";

    angular.module("app")
        .controller("tithingActivityByMemberGridController", tithingActivityByMemberGridController);

    tithingActivityByMemberGridController.$inject = ["titheVars", "$filter"];

    function tithingActivityByMemberGridController(titheVars, $filter) {
        var vm = this;

        // #region bindable members
        vm.deleteTithe = deleteTithe;
        vm.editTithe = editTithe;
        vm.MemberTithes = titheVars.tithingActivity;
        // #endregion

        /////////////////////////////////////////////

        function editTithe(tithe, index, grid) {
            vm.openEditModal({ tithe: tithe, index: index, grid: grid });
        }

        function deleteTithe(titheId, memberId) {
            vm.openDeleteModal({ titheId: titheId, memberId: memberId });
        }

    }

})();