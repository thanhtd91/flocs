/*
 * Controller for login form
 */
angular.module('flocs.user')
.controller('loginModalCtrl', function($scope, $log, $state, $uibModalInstance,
      $uibModal, userService){

  $scope.loginForm = {};
  $scope.credentials = {
      username: undefined,
      password: undefined
  };
  $scope.errorMessage = "";

  function login() {
    var username = $scope.model.username;
    var password = $scope.model.password;
    userService.loggingIn(username, password)
      .then(function success() {
        $uibModalInstance.close();
        if ($state.current.name === 'logout' ||
            $state.current.name === 'httpErrors') {
          $state.go('home');
        } else {
          $state.go($state.current, {}, {reload: true});
        }
      }, function error() {
        // no other possibility thank to frontend checks in modal it self
        $scope.errorMessage = "LOGIN_MODAL.INCORRECT_USERNAME_OR_PASSWORD";
      });
  }

  function register() {
    var modalInstance = $uibModal.open({
        templateUrl: 'user/register-modal.tpl.html',
        controller: 'registerModalCtrl',
    });
    modalInstance.result.then(function success() {
        // NOTE: logging after successful signing up was moved to the server
        $uibModalInstance.close();
        $state.go($state.current, {}, {reload: true});
      }, function dismiss() {
        $uibModalInstance.dismiss();
      });
  }

  function close() {
    $uibModalInstance.dismiss();
  }

  $scope.login = login;
  $scope.register = register;
  $scope.close = close;
});
