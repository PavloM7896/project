angular.module("App", [])
    .controller("ItemCtrl", function($scope)
    {
        // Загрузка
        if (localStorage["items"])
        {
            $scope.items = JSON.parse(localStorage["items"]);
        }
        else
        {
            $scope.items = [];
        }
      if(localStorage["comments"])
      {
          $scope.comments = JSON.parse(localStorage["comments"]);
      }
      else {
        $scope.comments = [];
      }

        $scope.AddItem = function()
        {
            var index = $scope.items.length;
            console.log(index);
            $scope.items.push({id: index , name: $scope.itemName});
            console.log($scope.itemName);
            localStorage["items"] = JSON.stringify($scope.items);//saving
        }
      
      $scope.selected = 0;

      $scope.select= function(index) {
          $scope.selected = index;
          if (index == $scope.selected) {
              console.log($scope.selected);
              for ($scope.comments.id = 0; $scope.comments.id < $scope.comments.length; $scope.comments.id++) {
                  if ($scope.comments.id == $scope.selected) {
                      console.log($scope.comments.id+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                      $scope.comments[index] = JSON.stringify(localStorage["comments"]);//downloading comments
                  }
              }
          }
      }
            $('.commentText').keydown(function (e) {
                var key = e.which;
                if(key == 13)  // the enter key code
                {
                    $scope.AddComment();
                }
            });

        $scope.AddComment = function () {

            var indexCom = 0;
            $scope.comments.push({id: $scope.selected , idCom:indexCom ,text: $scope.comentText });
            indexCom++;
            console.log($scope.comentText,$scope.selected, indexCom);
            localStorage["comments"] = JSON.stringify($scope.comments);//saving

           }




        $scope.onKeyPress = function ($event) {
            $scope.AddComment();
        };


        $scope.DeleteItem = function(item)
        {
            var index = $scope.items.indexOf(item);
            if (index != -1) $scope.items.splice(index , 1);
            localStorage["items"] = JSON.stringify($scope.items);//saving
        }
    })

    .directive("myitem", function()
    {
        return {
            restrict: "E",
            scope: {
              item: "=item",
                delete: "=delete"
            },

            template:
            " <div " +
            "class=\"info\"  >{{item.name}}</div>   <button class=\"btn-danger\" ng-click=\"delete(item)\">Delete</button> "
        }
    })

.directive("mycomment",function () {
  return {
    restrict:"E",
    scope: {
      comment:"=comment"
    },
    template:"<div " + "class=\"userBlock\"  >{{comment.text}}</div>"
  }
  });


