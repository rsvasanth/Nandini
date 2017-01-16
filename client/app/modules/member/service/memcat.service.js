(function () {
  'use strict';
  angular
    .module('com.module.member')
    .service('MemberService', function (CoreService, Membercategories, gettextCatalog) {

      this.getMemberscat = function () {
        return Membercategories.find({

        }).$promise;
      };

    
    });

})();
