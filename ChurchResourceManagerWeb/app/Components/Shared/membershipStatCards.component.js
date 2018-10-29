(function () {

    "use strict";
    angular.module("app")
        .component("membershipStatCards",
            {
                templateUrl: "/Shared/MembershipStatCards",
                controller: "membershipStatCardsController",
                controllerAs: "mscc",
                bindings: {
                    totalCount: "<",
                    activeCount: "<",
                    terminatedCount: "<",
                    noResultsFound: "<",
                    maleCount: "<",
                    femaleCount: "<",
                    adultsCount: "<",
                    youthCount: "<",
                    childrenCount: "<"
                }
            });

})();