/**
 * Created by jiaobinqgian on 17/3/13.
 */
const Authenticate = (function (auth) {

  const KEY_OF_USERDATA = 'user-data';
  const KEY_OF_REALNAME = 'realName';
  const KEY_OF_LOGGEDIN = 'logged-in';
  const KEY_OF_EMAIL = 'email';
  const KEY_OF_ADMIN = 'isAdmin';
  const KEY_OF_TOKEN = 'token';
  const KEY_OF_REQUIRESALTERPASSWORD = 'isNeedResetPassWord';
  const KEY_OF_PERMISSIONS = 'menuPermissions';
  const KEY_OF_ROLESIGN = 'roleSign';
  const KEY_OF_EMPLOYEEID = 'employeeID';
  const KEY_OF_EMPLOYEEPASSWORD = 'employeePassword';


  var userData = null;

  auth.loadUserData = function () {
    var rawdata = localStorage.getItem(KEY_OF_USERDATA);
    try {
      userData = JSON.parse(rawdata);
    }
    catch (error) {
    }
  };

  auth.loggedIn = function () {
    return localStorage.getItem(KEY_OF_LOGGEDIN) == 'true';
  };

  auth.requiresAlterPassword = function () {
    return localStorage.getItem(KEY_OF_REQUIRESALTERPASSWORD) === 'true';
  };

  auth.getToken = function () {
    return localStorage.getItem(KEY_OF_TOKEN);
  };

  auth.getRealName = function () {
    return localStorage.getItem(KEY_OF_REALNAME) || '';
  };
  auth.getEmail = function () {
    return localStorage.getItem(KEY_OF_EMAIL);
  };

  auth.isAdmin = function () {
    // return true;
    return localStorage.getItem(KEY_OF_ADMIN) === 'true';
  };
  auth.isRoleSign  = () => {
    return localStorage.getItem(KEY_OF_ROLESIGN);
  }
  auth.getEmployee = () => {
    return {
      employeeId: localStorage.getItem(KEY_OF_EMPLOYEEID),
      employeePassword: localStorage.getItem(KEY_OF_EMPLOYEEPASSWORD)
    }
  }
  auth.hasPermission = function (resource) {
    if (auth.isAdmin()) {
      return true;
    }

    let rawdata = localStorage.getItem(KEY_OF_PERMISSIONS);
    try {
      let permissions = JSON.parse(rawdata);
      if (permissions) {
        return permissions[resource];
      }
    } catch (error) {
    }
    return false;
  };

  auth.getItem = function (param) {
    return localStorage.getItem(param);
  };

  auth.login = function (userData) {
    userData = userData || {};
    if (typeof userData === 'object') {
      const menuTree = userData.menuPerms || [];

      localStorage.setItem(KEY_OF_REALNAME, userData.realName);
      localStorage.setItem(KEY_OF_EMAIL, userData.email);
      localStorage.setItem(KEY_OF_LOGGEDIN, true);
      localStorage.setItem(KEY_OF_ADMIN, userData.isAdmin);
      localStorage.setItem(KEY_OF_REQUIRESALTERPASSWORD, userData.isNeedResetPwd);
      localStorage.setItem(KEY_OF_ROLESIGN, userData.roleSign);
      localStorage.setItem(KEY_OF_EMPLOYEEID, userData.employeeID);
      localStorage.setItem(KEY_OF_EMPLOYEEPASSWORD, userData.employeePassword);
      localStorage.setItem(KEY_OF_USERDATA, JSON.stringify(userData));

      let permissions = {};
      menuTree.forEach((item) => {
        permissions[item.permission] = item;
      });
      localStorage.setItem(KEY_OF_PERMISSIONS, JSON.stringify(permissions));
      return true;
    }
    return false;
  };

  auth.setRequiresAlterPassword = function (requiresAlter) {
    localStorage.setItem(KEY_OF_REQUIRESALTERPASSWORD, requiresAlter);
  };

  auth.setAsLoggedOut = function () {
    localStorage.setItem(KEY_OF_LOGGEDIN, false);
  };

  auth.logout = function () {
    //localStorage.clear();
    localStorage.removeItem(KEY_OF_REALNAME);
    localStorage.removeItem(KEY_OF_EMAIL);
    localStorage.removeItem(KEY_OF_LOGGEDIN);
    localStorage.removeItem(KEY_OF_ADMIN);
    localStorage.removeItem(KEY_OF_REQUIRESALTERPASSWORD);
    localStorage.removeItem(KEY_OF_ROLESIGN);
    localStorage.removeItem(KEY_OF_EMPLOYEEID);
    localStorage.removeItem(KEY_OF_EMPLOYEEPASSWORD);
    localStorage.removeItem(KEY_OF_USERDATA);
    localStorage.removeItem(KEY_OF_PERMISSIONS);
  };

  return auth;
})(Authenticate || {});

export default Authenticate;
