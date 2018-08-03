(function () {

    "use strict";
    angular.module("app")
        .component("editMembershipModal",
            {
                templateUrl: "/Membership/EditMembership",
                controller: "editMembershipController",
                controllerAs: "emc",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();