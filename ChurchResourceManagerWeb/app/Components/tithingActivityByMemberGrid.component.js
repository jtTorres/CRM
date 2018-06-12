(function () {

    "use strict";

    angular.module("app")
        .component("tithingActivityByMemberGrid",
            {
                templateUrl: "/Tithing/TithingActivityByMemberGrid",
                controller: "tithingActivityByMemberGridController",
                controllerAs: "tbmg",
                bindings: {
                    openEditModal: "&",
                    panelSettings: "<"
                }
            });

})();