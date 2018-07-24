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
                    memberInfoArray: "<",
                    accordionSettings: "<",
                    beingEdited: "<",
                    onEdit: "&",
                    onSubmit: "&",
                    onFindActiveIndex: "&"
                }
            });

})();