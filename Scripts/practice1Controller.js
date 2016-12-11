var alertControl = function($scope) {

    $scope.toAlert = function() {
        alert("查詢條件：" + $scope.modelNumber + " " + $scope.modelName);
    };

    $scope.toClear = function() {
        $scope.modelNumber = "";
        $scope.modelName = "";
    };
};
