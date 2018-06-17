(function () {

    "use strict";
    angular.module("app")
        .controller("deleteTitheController", deleteTitheController);

    deleteTitheController.$inject = ["titheVars"];

    function deleteTitheController(titheVars) {
        var vm = this;

        vm.deleteTithe = deleteTithe;
        /////////////////////////////////////////////


        function deleteTithe() {
            vm.close();
        }

    }

})();