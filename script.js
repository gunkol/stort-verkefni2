document.addEventListener('DOMContentLoaded', function () {
  var foo = document.querySelector('foo');

  program.init(foo);
});

const program = (function() {
  const bar;

  function init(foo) {
    // const bar = foo.querySelector('');
  }

  return {
    init: init
  }
})();
