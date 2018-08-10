(function () {

    "use strict";
    angular.module("app")
        .component("editTransactionModal",
            {
                templateUrl: "/Transactions/EditTransaction",
                controller: "editTransactionController",
                controllerAs: "etc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();