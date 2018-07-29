(function () {

    "use strict";

    angular.module("app")
        .component("membersGrid",
            {
                templateUrl: "/Membership/Members",
                controller: "membersGridController",
                controllerAs: "mgc",
                bindings: {
                    members: "<"
                }
            });

})();