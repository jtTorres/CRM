(function () {

    "use strict";

    angular.module("app")
        .controller("donationsLetterController", donationsLetterController);

    donationsLetterController.$inject = ["tithingDataService"];

    function donationsLetterController(tithingDataService) {
        var vm = this;

        vm.getMemberTithesLetter = getMemberTithesLetter;
        vm.memberTithes = [];
        vm.memberInfo = {};
        vm.showLetters = false;
        vm.totalTithes = 0;

        ////////////////////
        getMemberTithesLetter(2002, 2018);
        function getMemberTithesLetter(memberId, year) {

            tithingDataService.getMemberTithesWithDateRange(memberId, `1/1/${year}`, `12/31/${year}`)
                .then(function (response) {
                    vm.memberTithes = response.data;
                    vm.memberInfo = response.data[0];
                    vm.showLetters = true;
                    vm.year = year;
                    vm.letterDate = new Date();

                    angular.forEach(vm.memberTithes, function (tithe, key, obj) {
                        vm.totalTithes += tithe.TitheAmount;
                    });
                });
        }
    }

})();