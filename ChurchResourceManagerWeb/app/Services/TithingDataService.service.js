(function () {
    "use strict";
    //get reference to module to register service in main module
    angular.module("app")
        //register the service with angular
        .factory("tithingDataService", tithingDataService);

    tithingDataService.$inject = ["$q", "$http", "utilityService", "titheVars", "$filter"];

    //define service
    function tithingDataService($q, $http, utilityService, titheVars, $filter) {

        return {
            addTithe: addTithe,
            getMemberTithes: getMemberTithes,
            updateTithe: updateTithe,
            deleteTithe: deleteTithe,
            getTithesRunningTotal: getTithesRunningTotal,
            getTodaysTithingActivity: getTodaysTithingActivity,
            getTithingActivity: getTithingActivity,
            updateTitheGrids: updateTitheGrids,
            addToTotal: addToTotal
        };


        //initialize titheRecordData to an empty object to be assigned a value later by other controllers and will be made
        //available to all controllers by the service


        //add tithes
        function addTithe(titheRecord) {

            return $http({
                method: "POST",
                url: "/Tithing/AddTitheRecord/",
                data: { titheRecord: titheRecord }

            })
                .then(onAddTitheRecordComplete)
                .catch(onAddTitheRecordError);
        }

        //get success response
        function onAddTitheRecordComplete(response) {
            return response;
        }

        //get error reason
        function onAddTitheRecordError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Adding Tithe Record"));
        }


        //get tithing acitvity
        function getMemberTithes(memberId, date) {
            return $http({
                method: "GET",
                url: "/Tithing/GetMemberTithes/",
                params: {
                    memberId: memberId,
                    date: date
                }
            })
                .then(onGetMemberTithesComplete)
                .catch(onGetMemberTithesError);
        }

        //get success response
        function onGetMemberTithesComplete(response) {
            return response;
        }

        //get error response
        function onGetMemberTithesError(reason) {
            console.log(reason.data);
            return $q.reject(utilityService.httpError(reason, "Error Getting Member Tithes"));
        }

        //Edit Selectded record
        function updateTithe(tithe) {
            return $http({
                method: "POST",
                url: "/Tithing/UpdateTithe/",
                data: { tithe: tithe }
            })
                .then(onUpdateTitheComplete)
                .catch(onUpdateTitheError);
        }

        //get success response
        function onUpdateTitheComplete(response) {
            return response;
        }

        //get error response
        function onUpdateTitheError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Updating Tithes"));
        }

        //delete Selected Record
        function deleteTithe(titheId) {
            return $http({
                method: "POST",
                url: "/Tithing/DeleteTithe/",
                data: { titheId: titheId }
            })
                .then(onDeleteTitheComplete)
                .catch(onDeleteTitheError);
        }

        //get success response
        function onDeleteTitheComplete(response) {
            return response;
        }

        //get error response
        function onDeleteTitheError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Deleting Tithes"));
        }

        // get tithes running total
        function getTithesRunningTotal(date) {
            date = utilityService.isUndefinedOrNull(date) ? new Date() : date;
            return $http({
                method: "GET",
                url: "/Tithing/GetTithesRunningTotal/",
                params: { date: date }
            })
                .then(onGetTithesRunningTotalComplete)
                .catch(onGetTithesRunningTotalError);
        }

        // get success response
        function onGetTithesRunningTotalComplete(response) {
            return response;
        }

        // get error response
        function onGetTithesRunningTotalError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Tithes Running Total"));
        }

        function getTodaysTithingActivity() {
            return $http({
                method: "GET",
                url: "/Tithing/GetTodaysTithingActivity/"
            })
                .then(onGetTodaysTithingActivityComplete)
                .catch(onGetTodaysTithingActivityError);
        }

        function onGetTodaysTithingActivityComplete(response) {
            return response;
        }

        function onGetTodaysTithingActivityError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Today's Tithing Activity"));
        }

        function getTithingActivity() {
            return $http({
                method: "GET",
                url: "/Tithing/GetTithingActivity/"
            })
                .then(onGetTithingActivityComplete)
                .catch(onGetTithingActivityError);
        }

        function onGetTithingActivityComplete(response) {
            return response;
        }

        function onGetTithingActivityError(reason) {
            return $q.reject(utilityService.httpError(reason, "Error Getting Tithing Activity"));
        }

        function updateTitheGrids(grid, action, tithe) {
            if (utilityService.isUndefinedOrNull(grid)) {
                titheVars.tithingActivity.splice(titheVars.titheToEdit.editIndex, 1, tithe);
            } else {
                switch (action) {
                    case 1: // update
                        updateTitheArray(grid, tithe);
                        break;
                    case 2: // delete
                        deleteTitheArray(grid);
                        break;
                    default:
                        break;
                }
            }
        }

        function updateTitheArray(grid, tithe) {
            switch (grid) {
                case 1: // Member's recent Activity Grid
                    titheVars.tithingActivity.splice(titheVars.titheToEdit.editIndex, 1, tithe);
                    utilityService.updateArray(titheVars.todaysTithingActivity, tithe, "TitheId");
                    addTodaysTithingActitity(tithe);
                    $filter("orderBy")(titheVars.tithingActivity, "TitheDate", true);
                    break;
                case 2: // Today's Tithing Activity Grid
                    titheVars.todaysTithingActivity.splice(titheVars.titheToEdit.editIndex, 1, tithe);
                    utilityService.updateArray(titheVars.tithingActivity, tithe, "TitheId");
                    removeTodaysTithingActivity(tithe);
                    break;
                default:
                    break;
            }
        }

        function deleteTitheArray(grid) {
            switch (grid) {
                case 1: // Member's recent Activity Grid
                    titheVars.tithingActivity.splice(titheVars.titheToDelete.titheIndex, 1);
                    utilityService.deleteArray(titheVars.todaysTithingActivity, titheVars.titheToDelete, "TitheId");
                    break;
                case 2: // Today's Tithing Activity Grid
                    titheVars.todaysTithingActivity.splice(titheVars.titheToDelete.titheIndex, 1);
                    utilityService.deleteArray(titheVars.tithingActivity, titheVars.titheToDelete, "TitheId");
                    break;
                default:
                    break;
            }
        }

        function addTodaysTithingActitity(tithe) {
            if (tithe.TitheDate === $filter("date")(new Date(), "MM/dd/yyyy") && utilityService.getArrayIndexOf(titheVars.todaysTithingActivity, tithe, "TitheId") === -1)
                titheVars.todaysTithingActivity.push(tithe);
        }

        function removeTodaysTithingActivity(tithe) {
            if (tithe.TitheDate !== $filter("date")(new Date(), "MM/dd/yyyy"))
                titheVars.todaysTithingActivity.splice(utilityService.getArrayIndexOf(titheVars.todaysTithingActivity, tithe, "TitheId"), 1);
        }

        function addToTotal(currentTotal, newTotal, checkDate, date) {
            currentTotal = parseFloat(currentTotal);
            newTotal = parseFloat(newTotal);

            if (checkDate) {
                if ($filter("date")(new Date(), "MM/dd/yyyy") === date)
                    return currentTotal += newTotal;
                else
                    return currentTotal;
            } else {
                return currentTotal += newTotal;
            }
        }
    }

}());