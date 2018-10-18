(function () {

    "use strict";

    angular.module("app")
        .controller("membersGridController", membersGridController);

    membersGridController.$inject = ["membershipDataService"];

    function membersGridController(membershipDataService) {
        var vm = this;

        vm.edit = edit;
        /////////////////////////////

        activate();

        function activate() {
            vm.getMemberSearchData();
        }

        function edit(member) {
            vm.openEditModal({ member: member });
        }

    }

})();