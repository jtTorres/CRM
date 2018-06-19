(function () {

    "use strict";

    angular.module("app")
        .component("tithingActivity",
            {
                templateUrl: "/Tithing/TithingActivity",
                controller: "tithingActivityController",
                controllerAs: "tac",
                bindings: {
                    getTithingActivity: "&",
                    openEditModal: "&",
                    openDeleteModal: "&",
                    tithingActivity: "<",
                    panelSettings: "<",
                    tithingActivityType: "@"
                }
            });

})();