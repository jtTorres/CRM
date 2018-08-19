(function () {

    "use strict";
    angular.module("app")
        .component("memberEntryCompleteModal",
            {
                templateUrl: "/Membership/MemberEntryCompleteModal",
                controller: "memberEntryCompleteController",
                controllerAs: "mec",
                bindings: {
                    resolve: "<",
                    close: "&",
                    dismiss: "&"
                }
            });

})();