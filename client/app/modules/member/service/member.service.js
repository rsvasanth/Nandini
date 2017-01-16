(function () {
  'use strict';
  angular
    .module('com.module.member')
    .service('MemberService', function (CoreService, Member, gettextCatalog) {

      this.getMembers = function () {
        return Member.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getMember = function (id) {
        return Member.findById({
          id: id
        }).$promise;
      };

      this.upsertMember = function (member) {
        return Member.upsert(member).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Member saved'),
              gettextCatalog.getString('Your Member is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Member '),
              gettextCatalog.getString('This Member could no be saved: ') + err
            );
          }
        );
      };

      this.deleteMember = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Member.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Member deleted'),
                gettextCatalog.getString('Your Member is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Member'),
                gettextCatalog.getString('Your Member is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };
      this.getFormFields = function (categories) {
        var catOptions = categories.map(function (category) {
          return {
            name: category.name,
            value: category.id
          };
        });
        return [
          {
            key: 'fullname',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name'),
              required: true
            }
          },
          {
            key: 'categoryId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Category'),
              required: true,
              placeholder:'categories',
              options: catOptions
            }
          },
          {
            key: 'accountnumber',
            type: 'input',
            templateOptions: {
                  required: true,
              label: gettextCatalog.getString('Account Number')
            }
          },
          {
            key: 'community',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Community')
            }
          },
          {
            key: 'phone',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Phone')
            }
          },  {
              key: 'gender',
              type: 'select',
              templateOptions: {
                    
                label: gettextCatalog.getString('Gender')
              }
            },
            {
                key: 'contribution',
                type: 'input',
                templateOptions: {
                  required: true,
                  label: gettextCatalog.getString('Contribution')
                }
            },
            {
                key: 'status',
                type: 'input',
                templateOptions: {
                  required: true,
                  label: gettextCatalog.getString('Auroville Status')
                }
            },
            {
                key: 'nationality',
                type: 'input',
                templateOptions: {
                  required: true,
                  label: gettextCatalog.getString('Nationality')
                }
            },
            {
                key: 'birthday',
                type: 'datepicker',
                templateOptions: {
                  required: true,
                  label: gettextCatalog.getString('Date Of Birth')
                }
            }
        ];
      };



    });

})();
