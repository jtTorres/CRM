(function () {

    "use strict";
    angular.module("app")
        .component("contactInformation",
            {
                templateUrl: "/Membership/ContactInformation",
                controller: "contactInformationController",
                controllerAs: "cic",
                bindings: {
                    onSubmit: "&",
                    contactInfo: "<",
                    onFindActiveIndex: "&",
                    contactMethods: "<",
                    beingEdited: "<",
                    onEdit: "&"
                }
            });

})();