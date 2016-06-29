angular.module("App", [])
    .controller("ItemCtrl", function($scope)
    {
       //DOWNLOADING
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
        //Adding items
        $scope.AddItem = function()
        {
            var index = $scope.items.length;
            $scope.items.push({                       //pushing item data in local storage "items"
                                  id: index ,
                                  name: $scope.itemName
            });
            localStorage["items"] = JSON.stringify($scope.items);//saving

        }
      
      $scope.selected = 0;

      $scope.select= function(index) {
          $scope.selected = index; //selected item

        $scope.idComment = $scope.comments.id;

              for ($scope.idComment = 0; $scope.idComment < $scope.comments.length; $scope.idComment++) {
                  if ($scope.idComment == $scope.selected) {
                      $scope.comments.id = JSON.parse(localStorage["comments"]);//downloading comments
                  }
              }
          }
            $('textarea').keypress (function(event){  // if press enter in the textarea

              var keycode = (event.keyCode ? event.keyCode : event.which);
              if(keycode === 13){// the enter key code
                $scope.AddComment();                    //adding comment
                $scope.countComments = $scope.comments.length;   // variable for counting comments
              }
            });
        $scope.indexCom = 0;

        $scope.AddComment = function () { // function for adding comments

            $scope.comments.push({                          //pushing comments data to local storage "comments"
                                    id: $scope.selected ,
                                    idCom:$scope.indexCom ,
                                    text: $scope.comentText
            });
            localStorage["comments"] = JSON.stringify($scope.comments);//saving
           }

      
        $scope.DeleteItem = function(item)  //function for deleting item
        {
            var index = $scope.items.indexOf(item);
            if (index != -1) $scope.items.splice(index , 1);
            localStorage["items"] = JSON.stringify($scope.items);//saving
        }
})
    .directive("myitem", function()   // directive for outputting items
    {
        return {
            restrict: "E",
            scope: {
              item: "=item",
              delete: "=delete"
            },

            template:   //contain name , count comments and delete button
            " <div " +
            "class=\"info\"  >{{item.name}}</div> <div class=\"countComments\">{{ comments.length }}</div>   <button class=\"btn-danger\" ng-click=\"delete(item)\">Delete</button> "
        }
    })

.directive("mycomment",function () {  //directive for outputting comments
  return {
    restrict:"E",
    scope: {
      comment:"=comment"
    },
    template:" <div class=\"comment\"> <div "+"class=\"commentImage\"></div> <div " + "class=\"commentBlock\"  >{{comment.text}} </div> </div>"
    
  }
  });


