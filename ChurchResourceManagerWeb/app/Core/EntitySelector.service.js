(function () {

    "use strict";

    angular.module("app")
        .factory("entitySelectorService", entitySelectorService);

    entitySelectorService.$inject = [];

    function entitySelectorService() {

        const entityType = {
            Tithe: 1,
            Offering: 2,
            Donation: 3
        };

        return {
            entityType: entityType
        };
    }

})();