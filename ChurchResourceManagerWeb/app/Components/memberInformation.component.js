(function () {

    "use strict";
    angular.module("app")
        .component("memberInformation",
            {
                templateUrl: "/Membership/MemberInformation",
                controller: "memberInformationController",
                controllerAs: "mic",
                bindings: {
                    memberInfo: "<",
                    accordionSettings: "<",
                    index: "<",
                    memberInfoCount: "<",
                    beingEdited: "<",
                    onEdit: "&"
                }
            });

})();