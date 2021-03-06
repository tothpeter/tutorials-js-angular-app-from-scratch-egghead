angular.module('Eggly', [])
  .controller('MainCtrl', function($scope) {
    $scope.categories = [
      {"id": 0, "name": "Development"},
      {"id": 1, "name": "Design"},
      {"id": 2, "name": "Exercise"},
      {"id": 3, "name": "Humor"}
    ];

    $scope.bookmarks = [
      {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
      {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
      {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
      {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
      {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
      {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
      {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
      {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
      {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
    ];

    $scope.currentCategory = null;
    $scope.editedBookmark = null;

    $scope.setCurrentCategory = function(category) {
      $scope.currentCategory = category;

      $scope.cancelCreating();
      $scope.cancelEditing();
    };

    $scope.isCurrentCategory = function(category) {
      return $scope.currentCategory != null && $scope.currentCategory.id == category.id;
    }

    // ----------------------
    // CRUD
    // ----------------------

    resetCreateForm = function(bookmark) {
      $scope.newBookmark = {
        title: '',
        url: '',
        category: $scope.currentCategory.name
      };
    }

    $scope.createBookmark = function(bookmark) {
      bookmark.id = $scope.bookmarks.length;
      $scope.bookmarks.push(bookmark);

      resetCreateForm();
    };

    $scope.updateBookmark = function(bookmark) {
      var index = _.findIndex($scope.bookmarks, function(b) {
        return b.id === bookmark.id;
      });

      $scope.bookmarks[index] = bookmark;
      $scope.editedBookmark = null;
      $scope.isEditing = false;
    }

    $scope.isSelectedBookmark = function(bookmark) {
      return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmark.id;
    };

    $scope.deleteBookmark = function(bookmark) {
      _.remove($scope.bookmarks, function(b) {
        return bookmark.id === b.id;
      })
    };

    // ----------------------
    // Creating and editing states
    // ----------------------

    $scope.isCreating = false;
    $scope.isEditing = false;

    $scope.startCreating = function() {
      $scope.isCreating = true;
      $scope.isEditing = false;

      resetCreateForm();
    }

    $scope.cancelCreating = function() {
      $scope.isCreating = false;
    }

    $scope.startEditing = function(bookmark) {
      $scope.isCreating = false;
      $scope.isEditing = true;
      $scope.editedBookmark = angular.copy(bookmark);
    }

    $scope.cancelEditing = function() {
      $scope.isEditing = false;
      $scope.editedBookmark = null;
    }

    $scope.shouldShowCreating = function() {
      return $scope.currentCategory && !$scope.isEditing;
    }
    $scope.shouldShowEditing = function() {
      return $scope.isEditing && !$scope.isCreating;
    }
  });
