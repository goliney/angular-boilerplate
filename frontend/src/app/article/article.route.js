(function() {
  'use strict';

  angular
    .module('app.article')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.articles', {
        url: '/articles',
        views: {
          'main@' : {
            templateUrl: 'article/articles.tpl.html',
            controller: 'ArticlesController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          articles: ['Article', function(Article) {
            return Article.query().$promise;
          }]
        },
        data: {
          hasPermission: ['article.read']
        }
      });
  }
})();