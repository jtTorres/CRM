(function () {

    "use strict";

    angular.module("app")
        .controller("membersGridController", membersGridController);

    membersGridController.$inject = [];

    function membersGridController() {
        var vm = this;

        vm.edit = edit;
        /////////////////////////////

        activate();

        function activate() {

        }

        function edit(member) {
            var membership = vm.members;
            vm.openEditModal({ member: member, membership: membership });
        }

    }

})();