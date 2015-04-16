(function () {
  'use strict';

  angular
    .module('app.article' )
    .factory('Article', ArticleResource);

  ArticleResource.$inject = ['$resource', 'API_ROOT'];

  function ArticleResource($resource, API_ROOT) {
    var Article = $resource('/static/assets/mock/articles.json/:_id', {}, {
      update: {
        method: 'PUT'
      }
    });
    return Article;
  }
})();
