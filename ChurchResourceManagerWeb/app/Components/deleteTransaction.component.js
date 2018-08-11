(function () {

    "use strict";
    angular.module("app")
        .component("deleteTransactionModal",
            {
                templateUrl: "/Transactions/DeleteTransactionModal",
                controller: "deleteTransactionController",
                controllerAs: "dtc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();