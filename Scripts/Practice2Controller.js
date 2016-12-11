var tableController = function($scope, $filter) {
    $scope.members = [{
        "num": "001",
        "name": "吉米",
        "saving": 998
    }, {
        "num": "002",
        "name": "肯",
        "saving": 780000
    }, {
        "num": "003",
        "name": "大衛",
        "saving": 200000
    }, {
        "num": "004",
        "name": "亞瑟",
        "saving": 900000
    }, {
        "num": "005",
        "name": "艾倫",
        "saving": 5566
    }, {
        "num": "006",
        "name": "尚",
        "saving": 100000
    }];

    $scope.reverse = false;
    $scope.toOrder = function(name) {
        $scope.reverse = !$scope.reverse;
        $scope.propertyName = name;
        $scope.members = $filter('orderBy')($scope.members, name, $scope.reverse);
    };

    $scope.remove = function(index) {
        $scope.members.splice(index, 1);
    }

    $scope.insert = function() {
        $scope.members.push({
            "num": $scope.modelAddNum,
            "name": $scope.modelAddName,
            "saving": $scope.modelAddSaving
        });

        $scope.modelAddNum = "";
        $scope.modelAddName = "";
        $scope.modelAddSaving = "";

    };
};
