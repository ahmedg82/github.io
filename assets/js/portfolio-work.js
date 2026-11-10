(() => {
  const links = document.querySelectorAll('[data-preview]');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'preview-dialog';
  dialog.setAttribute('aria-labelledby', 'preview-title');
  dialog.innerHTML = '<header><h2 id="preview-title"></h2><button type="button" autofocus>Close preview</button></header><img alt=""><p>Illustrative portfolio preview. Any figures are fictional sample data, not business results.</p>';
  document.body.append(dialog);
  const close = () => dialog.close();
  dialog.querySelector('button').addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); } });
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    dialog.querySelector('h2').textContent = link.dataset.preview;
    dialog.querySelector('img').src = link.href;
    dialog.querySelector('img').alt = link.dataset.preview + ' — illustrative preview';
    dialog.showModal();
  }));
})();
