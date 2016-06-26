angular.module("App", [])
    .controller("UserCtrl", function($scope)
    {

        // Загрузка
        if (localStorage["users"])
        {
            $scope.users = JSON.parse(localStorage["users"]);
        }
        else
        {
            $scope.users = [];
        }

        $scope.AddUser = function()
        {
            var index = $scope.users.length + 1;
            console.log(index);
            $scope.users.push({id: index , name: $scope.itemName});
            console.log($scope.itemName);
            localStorage["users"] = JSON.stringify($scope.users);//saving
        }

        $scope.getCategory = function(user) {
            $scope.selected = user.id;
            console.log("happy");

        };
        $scope.isActive = function(user) {
            console.log("happy act");
            return $scope.selected === user.id;

        };
        $scope.count = 0;
        $scope.select = function($event) {
            count++;//noinspection JSAnnotator
            if(count % 2 =! 0 ) {
            angular.element($event.target).addClass('itemselected');
        }
        }

        $scope.DeleteUser = function(user)
        {
            var index = $scope.users.indexOf(user);
            if (index != -1) $scope.users.splice(index , 1);
            localStorage["users"] = JSON.stringify($scope.users);//saving
        }

        var activeUser = null;

        $scope.Select = function(user)
        {
            $scope.activeUser = user;

        }


    })

    .directive("myitem", function()
    {
        return {
            restrict: "E",
            scope: {
                user: "=user",
                delete: "=delete"
            },

            template: "<div  class=\"userBlock\" >" +
            " <div " +
            "class=\"info\"  >{{user.name}}</div>   <button class=\"btn btn-danger\" ng-click=\"delete(user)\">Delete</button> </div>"
        }
    });
