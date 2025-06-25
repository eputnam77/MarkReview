(function () {
  function applyBars() {
    document.querySelectorAll('ins, del, mark, .critic').forEach(function (el) {
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
    wrap.innerHTML = '<select aria-label="Change view">' +
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

  function applyAria() {
    document.querySelectorAll('ins').forEach(function (el) {
      if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'addition');
    });
    document.querySelectorAll('del').forEach(function (el) {
      if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'deletion');
    });
    document.querySelectorAll('mark').forEach(function (el) {
      if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'highlight');
    });
    document.querySelectorAll('.critic.comment, .critic-comment').forEach(function (el) {
      if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'comment');
    });
  }

  function findEdit(node) {
    var el = node.nodeType === 1 ? node : node.parentElement;
    while (el && !el.matches('ins, del, mark, .critic')) {
      el = el.parentElement;
    }
    return el;
  }

  function accept(el) {
    if (!el) return;
    if (el.tagName === 'INS') {
      el.replaceWith.apply(el, el.childNodes);
    } else if (el.tagName === 'DEL') {
      el.remove();
    } else if (el.tagName === 'MARK') {
      el.replaceWith.apply(el, el.childNodes);
    } else if (el.classList.contains('critic-comment') || el.classList.contains('critic') && el.classList.contains('comment')) {
      el.remove();
    }
  }

  function reject(el) {
    if (!el) return;
    if (el.tagName === 'INS') {
      el.remove();
    } else if (el.tagName === 'DEL') {
      el.replaceWith.apply(el, el.childNodes);
    } else if (el.tagName === 'MARK') {
      el.replaceWith.apply(el, el.childNodes);
    } else if (el.classList.contains('critic-comment') || el.classList.contains('critic') && el.classList.contains('comment')) {
      el.remove();
    }
  }

  function nextView() {
    var views = ['original', 'markup', 'accepted'];
    var current = document.body.className.match(/marktrace-(\w+)/);
    var idx = views.indexOf(current ? current[1] : 'markup');
    var next = views[(idx + 1) % views.length];
    applyView(next);
    var select = document.querySelector('.marktrace-toggle select');
    if (select) select.value = next;
  }

  function handleKey(e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }
    if (e.key === 'm') {
      nextView();
    } else if (e.key === 'a') {
      var sel = window.getSelection();
      if (sel.rangeCount) accept(findEdit(sel.getRangeAt(0).startContainer));
    } else if (e.key === 'r') {
      var selr = window.getSelection();
      if (selr.rangeCount) reject(findEdit(selr.getRangeAt(0).startContainer));
    }
    applyBars();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var view = localStorage.getItem('marktrace-view') || 'markup';
    applyBars();
    applyAria();
    applyView(view);
    createToggle(view);
    document.addEventListener('keydown', handleKey);
  });
})();
