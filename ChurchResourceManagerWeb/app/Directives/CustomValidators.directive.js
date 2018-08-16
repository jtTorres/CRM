angular.module("app")
    .directive("equalWithHoh", equalWithHoh);

function equalWithHoh() {
    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            equalWithHoh: "&"
        },
        link: function (scope, elem, attrs, ctrl) {
            var validate = function (viewValue) {
                var isValidHoh = true;
                var isValidSpouse = true;

                if (viewValue) {
                    angular.forEach(scope.equalWithHoh(), function (record, key, obj) {
                        if (record.SelectedRelationshipType) {
                            if (viewValue.Id === record.SelectedRelationshipType.Id && viewValue.Id === 1)
                                isValidHoh = false;
                            else if (viewValue.Id === record.SelectedRelationshipType.Id && viewValue.Id === 2)
                                isValidSpouse = false;
                        }
                    });
                }
                ctrl.$setValidity("equalWithHoh", isValidHoh);
                ctrl.$setValidity("equalWithSpouse", isValidSpouse);

                return viewValue;
            };

            ctrl.$parsers.unshift(validate);
            ctrl.$formatters.push(validate);
        }
    };
}







/*
angular.module("app")
    .directive("equalWithHoh", equalWithHoh);

function equalWithHoh() {
    return {
        require: "ngModel",
        scope: {
            equalWithHoh: "&"
        },
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$validators.equalWithHoh = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (viewValue) {
                    var valid = true;
                    angular.forEach(scope.equalWithHoh(), function (record, key, obj) {
                        if (record.SelectedRelationshipType) {
                            if (viewValue.Id === record.SelectedRelationshipType.Id)
                                valid = false;
                        }
                    });
                    return valid;
                }
                return true;
            };
        }
    };
}
*/