(function () {

    "use strict";
    angular.module("app")
        .component("contactInformationReadOnly",
            {
                templateUrl: "/Membership/ContactInformationReadOnly",
                controller: "contactInformationController",
                controllerAs: "cic",
                bindings: {
                    contactInfo: "<",
                    isAccordionOpen: "<",
                    activeIndex: "<",
                    onEdit: "&",
                    onSubmit: "&"
                }
            });

})();