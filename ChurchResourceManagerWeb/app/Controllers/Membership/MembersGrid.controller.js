(function () {

    "use strict";

    angular.module("app")
        .controller("membersGridController", membersGridController);

    membersGridController.$inject = ["membershipDataService"];

    function membersGridController(membershipDataService) {
        var vm = this;


        /////////////////////////////

        activate();

        function activate() {
            membershipDataService.getMemberSearch()
                .then(function (response) {
                    vm.members = response.data;
                });
        }


    }

})();