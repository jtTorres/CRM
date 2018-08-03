(function () {

    "use strict";

    angular.module("app")
        .component("manageMembership",
            {
                templateUrl: "/Membership/ManageMembership/",
                controller: "manageMembershipController",
                controllerAs: "mmc",
                bindings: {
                    activeTab: "<",
                    disableTab: "&",
                    family: "<",
                    address: "<",
                    memberInfoArray: "<",
                    contactInfo: "<",
                    beingEdited: "<",
                    onEdit: "&",
                    onSubmit: "&",
                    stateList: "<",
                    onFindActiveIndex: "&",
                    accordionSettings: "<",
                    isEditMode: "<"
                }
            });

})();