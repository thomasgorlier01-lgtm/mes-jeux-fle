(() => {
  const script = document.currentScript;
  if (!script?.src || window.self !== window.top) return;

  const base = new URL('.', script.src);
  const portal = base.protocol === 'file:'
    ? new URL('https://thomasgorlier01-lgtm.github.io/mes-jeux-fle/')
    : base;
  const isPortal = address => address.origin === portal.origin
    && address.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/') === portal.pathname;

  function addPortalBack() {
    if (isPortal(new URL(location.href))) return;
    if (document.querySelector('#games, [data-fle-portal-back]')) return;
    if ([...document.querySelectorAll('header a[href]')].some(link => isPortal(new URL(link.href)))) return;

    const header = document.querySelector('header');
    const host = header?.querySelector('[data-fullscreen-slot], .header-actions');
    const link = document.createElement('a');
    link.href = portal.href;
    link.className = 'fle-portal-back';
    link.dataset.flePortalBack = '';
    link.textContent = '← Tous les jeux';

    const style = document.createElement('style');
    style.textContent = `
      .fle-portal-back { display:inline-flex; align-items:center; justify-content:center;
        flex:none; min-height:34px; margin:2px 5px; padding:4px 10px; box-sizing:border-box;
        border:1px solid #d9cee7; border-radius:11px; background:#fffdf8; color:#523c99;
        font:700 .82rem/1.2 system-ui,sans-serif; text-decoration:none; white-space:nowrap; }
      .fle-portal-back:hover { background:#eee6f8; }
      .fle-portal-back:focus-visible { outline:3px solid #bd8c38; outline-offset:3px; }
      .fle-portal-header { flex-wrap:wrap; }
      @media(max-width:480px) { .fle-portal-back { margin:2px; padding:4px 7px; font-size:.73rem; } }
    `;
    document.head.append(style);
    header?.classList.add('fle-portal-header');
    if (host) host.prepend(link);
    else if (header) header.append(link);
    else document.body.prepend(link);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addPortalBack, { once: true });
  else addPortalBack();
})();
