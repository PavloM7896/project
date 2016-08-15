angular.module("App", [])
    .controller("MealCtrl", function($scope) {
        //DOWNLOADING
        if (localStorage["meals"]) {
            $scope.meals = JSON.parse(localStorage["meals"]);
        }
        else {
            $scope.meals = [];
        }

        if (localStorage["recipes"]) {
            $scope.recipes = JSON.parse(localStorage["recipes"]);
        }
        else {
            $scope.recipes = [];
        }
        //Adding meals
        $scope.AddMeal = function () {
            var index = $scope.meals.length;

            $scope.meals.push({                       //pushing meal data in local storage "meals"
                id: index,
                name: $scope.mealName
            });
            
            localStorage["meals"] = JSON.stringify($scope.meals);//saving

        }



        $scope.select = function (index) {

            $scope.selected = index;//selected meal


            for ($scope.idRecipe = 0; $scope.idRecipe < $scope.recipes.length; $scope.idRecipe++) {
               // $(".recipe").show();

                if ($scope.idRecipe == $scope.selected) {
                        if($scope.idRecipe = 0) {
                            for ($scope.idRecipe = $scope.selected ; $scope.idRecipe < $scope.recipes.length ; $scope.idRecipe++) {
                                $(".recipe").hide();
                            }
                        }
                    else {
                    for ($scope.idRecipe = 0; $scope.idRecipe < $scope.selected - 1 ; $scope.idRecipe++) {
                        $(".recipe").hide();
                    }
                        }

                }
                $scope.com = JSON.stringify($scope.recipes[$scope.selected].text);//downloading recipes

            }


    }

        //Adding recipes
        $scope.AddRecipe = function(){

            var index = $scope.recipes.length;

        $scope.recipes.push ({                          //pushing comments data to local storage "recipes"
            idRec: index ,
            id: $scope.selected,
            text: $scope.recipeText,
            
        });
            localStorage["recipes"] = JSON.stringify($scope.recipes);//saving

    }




        $scope.DeleteMeal = function(meal)  //function for deleting meal
        {
            var index = $scope.meals.indexOf(meal);
            if (index != -1) $scope.meals.splice(index , 1);
            localStorage["meals"] = JSON.stringify($scope.meals);//saving
        }

        $scope.DeleteRecipe = function(recipe)  //function for deleting recipe
        {
            var index = $scope.recipes.indexOf(recipe);
            if (index != -1) $scope.recipes.splice(index , 1);
            localStorage["recipes"] = JSON.stringify($scope.recipes);//saving
        }
})
    .directive("mymeal", function()   // directive for outputting meals
    {
        return {
            restrict: "E",
            scope: {
                meal: "=meal",
                delete: "=delete"
            },

            template:   //contain number of meal, name  and delete button
            " <div " + "class=\"info\"  >{{meal.id + 1 + '. '}}{{meal.name}}</div>  <button class=\"btn-delete\" ng-click=\"delete(meal)\">Delete</button> "
        }
    })

.directive("myrecipe",function () {  //directive for outputting recipes
  return {
    restrict:"E",
    scope: {
        recipe:"=recipe",
        delete: "=delete"
    },
    template: //contain number of recipe, name  and delete button
    " <div class=\"recipe\"> <div " + "class=\"recipeBlock\"  >{{recipe.idRec + 1 + '. '}} {{ recipe.text}}" +
    " </div><button class=\"btn-delete\" ng-click=\"delete(recipe)\">Delete</button> </div>"
    
  }
  });


