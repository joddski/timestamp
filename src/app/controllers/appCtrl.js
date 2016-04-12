export default class AppCtrl {
  constructor($scope, $rootScope, Auth, Api, Notification) {
    let APPLICATION_ROOT = "timestamp";

    this.getOverrideUser = (fromPath) => {
      return fromPath.substring(fromPath.lastIndexOf(APPLICATION_ROOT) + APPLICATION_ROOT.length).replace(/\//g, '');
    };

    $scope.loading = true;

    let path = window.location.pathname;
    let overrideUser = this.getOverrideUser(path);

    function broadcastEmployee() {
      $rootScope.$broadcast('userChanged', Auth.getEmployee());
      $scope.loading = false;
    }

    Api.getLoggedInUser().then((result) => {
      Auth.setLoggedInUser(result.data);
      if (overrideUser) {
        Api.getEmployee(overrideUser).then((result) => {
          Auth.setEmployee(result.data);
          broadcastEmployee();
        }, () => {
          $scope.loading = false;
          Notification.error(`Fant ikke overstyrt ansatt '${overrideUser}'`, 100000);
        })
      } else {
        Auth.setEmployee(result.data);
        broadcastEmployee();
      }
    }, (result) => {
      $scope.loading = false;
      Notification.error("Fant ikke innlogget ansatt", 100000);
    });
  }
}
