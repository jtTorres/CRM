(function () {

    "use strict";
    angular.module("app")
        .component("family",
            {
                templateUrl: "/Membership/Family/",
                controller: "familyController",
                controllerAs: "fc",
                bindings: {
                    onSubmit: "&",
                    family: "<",
                    beingEdited: "<",
                    onEdit: "&"
                }
            });

})();