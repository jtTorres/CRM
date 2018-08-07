(function () {

    "use strict";

    angular.module("app")
        .component("submitTransaction",
            {
                templateUrl: "/Transactions/SubmitTransaction/",
                controller: "submitTransactionController",
                controllerAs: "stc",
                bindings: {
                    transaction: "<"
                }
            });

})();