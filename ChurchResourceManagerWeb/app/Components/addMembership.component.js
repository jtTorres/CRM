(function () {

    "use strict";

    angular.module("app")
        .component("addMembership",
            {
                templateUrl: "/Membership/AddMember/",
                controller: "addMembershipController",
                controllerAs: "amc",
                bindings: {
                    onSave: "&",
                    membership: "<",
                    genders: "<",
                    maritalStatuses: "<",
                    stateList: "<",
                    memberGroups: "<",
                    memberInfo: "<",
                    beingEdited: "<",
                    addRelative: "&"
                }
            });

})();