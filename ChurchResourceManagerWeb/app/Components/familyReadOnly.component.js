(function () {

    "use strict";

    angular.module("app")
        .component("familyReadOnly",
            {
                templateUrl: "/Membership/FamilyReadOnly/",
                controller: "familyController",
                controllerAs: "fc",
                bindings: {
                    family: "<"
                }
            });

})();