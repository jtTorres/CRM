(function () {

    "use strict";
    angular.module("app")
        .component("offeringActivity",
            {
                templateUrl: "/Offerings/OfferingActivity",
                controller: "offeringActivityController",
                controllerAs: "oac",
                bindings: {
                    getOfferingActivity: "&",
                    openEditModal: "&",
                    openDeleteModal: "&",
                    offeringActivity: "<",
                    panelSettings: "<",
                    offeringActivityType: "@",
                    includeDateColumn: "@",
                    showEditDelete: "@"
                }
            });

})();