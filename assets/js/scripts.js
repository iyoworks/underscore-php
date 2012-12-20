// Generated by CoffeeScript 1.4.0
(function() {
  var method, namespacedMethod, page, parse, title, typeClass, _i, _j, _len, _len1, _ref, _ref1;

  parse = function(file) {
    file = marked.lexer(file);
    file = marked.parser(file);
    return file;
  };

  $('.main').affix({
    'offset': 50
  });

  $.get('./underscore/README.md', function(file) {
    $('#readme').html(parse(file));
    return $('body').scrollspy({
      'offset': 100
    });
  });

  _ref = ['Arrays', 'Number', 'Object', 'Parse', 'String'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    page = _ref[_i];
    $.ajax({
      type: 'GET',
      async: false,
      url: "./docs/" + page + ".md",
      success: function(file) {
        var article;
        file = parse(file);
        article = $('#' + page).html("<h1>" + page + "</h1>" + file);
        $('pre code', article).addClass('lang-php');
        return $('ul', article).addClass('list-unstyled').find('ul').addClass('breadcrumb');
      }
    });
  }

  _ref1 = $('a[name]');
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    title = _ref1[_j];
    method = $(title).attr('name');
    typeClass = $(title).parents('article').attr('id');
    namespacedMethod = typeClass + '-' + method;
    $('a[href=#' + method + ']').attr('href', '#' + namespacedMethod);
    $(title).attr('name', namespacedMethod).attr('id', namespacedMethod);
    $('.' + typeClass).append("<li><a href='#" + namespacedMethod + "'>" + method + "</a></li>");
  }

  $('.main > li').on('activate', function(li) {
    li = $(li.target);
    if (li.has('ul').length) {
      $('.main ul').hide();
      return $('ul', li).slideDown();
    }
  });

}).call(this);
