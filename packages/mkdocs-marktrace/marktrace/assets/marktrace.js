(function () {
  function applyBars() {
    document.querySelectorAll('ins, del').forEach(function (el) {
      var block = el.closest('p, li, div, blockquote, td, th');
      if (block && !block.classList.contains('marktrace-block')) {
        block.classList.add('marktrace-block');
      }
    });
  }

  function applyView(view) {
    document.body.classList.remove('marktrace-original', 'marktrace-markup', 'marktrace-accepted');
    document.body.classList.add('marktrace-' + view);
    localStorage.setItem('marktrace-view', view);
  }

  function createToggle(initial) {
    var wrap = document.createElement('div');
    wrap.className = 'marktrace-toggle';
    wrap.innerHTML = '<select>' +
      '<option value="original">Original</option>' +
      '<option value="markup">Markup</option>' +
      '<option value="accepted">Accepted</option>' +
      '</select>';
    document.body.appendChild(wrap);
    var select = wrap.querySelector('select');
    select.value = initial;
    select.addEventListener('change', function () {
      applyView(select.value);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var view = localStorage.getItem('marktrace-view') || 'markup';
    applyBars();
    applyView(view);
    createToggle(view);
  });
})();
