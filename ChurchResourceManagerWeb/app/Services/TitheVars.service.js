(function () {

    "use strict";
    angular.module("app")
        .factory("titheVars", titheVars);

    titheVars.$inject = [];

    function titheVars() {
        var titheToEdit = {};
        var titheToDelete = {};
        var tithingActivity = {
            data: {}
        };
        var tithesRunningTotal = {
            data: {}
        };
        var todaysTithingActivity = {};

        return {
            titheToEdit: titheToEdit,
            titheToDelete: titheToDelete,
            tithingActivity: tithingActivity,
            tithesRunningTotal: tithesRunningTotal,
            todaysTithingActivity: todaysTithingActivity
        };
    }

})();