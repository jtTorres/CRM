(function () {

    "use strict";
    angular.module("app")
        .component("memberInformationReadOnly",
            {
                templateUrl: "/Membership/MemberInformationReadOnly",
                controller: "memberInformationController",
                controllerAs: "mic",
                bindings: {
                    memberInfoArray: "<"
                }
            });

})();