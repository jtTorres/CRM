(function () {

    "use strict";

    angular.module("app")
        .controller("tithingActivityByMemberGridController", tithingActivityByMemberGridController);

    tithingActivityByMemberGridController.$inject = ["titheVars"];

    function tithingActivityByMemberGridController(titheVars) {
        var vm = this;

        // #region bindable members
        vm.editTithe = editTithe;
        vm.MemberTithes = titheVars.tithingActivity;
        // #endregion

        /////////////////////////////////////////////



        function editTithe(tithe, index, grid) {
            vm.openEditModal({ tithe: tithe, index: index, grid: grid });
        }

        //vm.panelSettings = {
        //    panelHeading: "Member Recent Activity",
        //    isOpen: true
        //};
    }

})();