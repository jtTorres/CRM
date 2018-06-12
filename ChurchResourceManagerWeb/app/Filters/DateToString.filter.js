(function () {

    "use strict";
    angular.module("app")
        .filter("dateToString", dateToString);

    dateToString.$inject = ["$filter"];

    function dateToString($filter) {
        return {
            mmddyyyy: mmddyyyy
        };

        //function mmddyyyy(object) {
        //    var toFilter = angular.copy(object);

        //    if (Array.isArray(toFilter)) {
        //        angular.forEach(toFilter, function (record, key) {
        //            record.TitheDate = $filter("date")(record.TitheDate, "MM/dd/yyyy");
        //        });
        //    } else {
        //        toFilter.TitheDate = $filter("date")(toFilter.TitheDate, "MM/dd/yyyy");
        //    }
        //    return toFilter;
        //}

        function mmddyyyy(object) {
            var toFilter = angular.copy(object);

            if (angular.isArray(object)) {
                angular.forEach(toFilter,
                    function (record, key) {
                        record.TitheDate = $filter("date")(record.TitheDate, "MM/dd/yyyy");
                        console.log(record);
                        //console.log(key);
                    });
            } else {

            }
        }

    };

})();