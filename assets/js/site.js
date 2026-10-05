/* Shared loader: site.json -> page text, footer, splash, language toggle, project markdown */
window.siteReady = (async () => {
  const ROOT = new URL('../../', document.currentScript.src).href;
  const U = p => new URL(p, ROOT).href;
  const zh = document.documentElement.lang.startsWith('zh');
  const cfg = await (await fetch(U('assets/data/site.json'))).json();
  const T = cfg[zh ? 'zh' : 'en'];
  const $$ = s => document.querySelectorAll(s);

  $$('[data-t]').forEach(e => { if (T[e.dataset.t] != null) e.innerHTML = T[e.dataset.t]; });
  $$('[data-lang-switch]').forEach(a => { a.href = U(zh ? 'index.html' : 'qiaopi.html'); a.textContent = T.switchLabel; });
  $$('[data-social]').forEach(a => a.href = cfg.contact[a.dataset.social]);
  const d = document.getElementById('date-display');
  if (d) d.textContent = new Date().toLocaleDateString('en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();

  const zb = document.getElementById('zh-body');
  if (zb) zb.innerHTML = T.letter.map(x => x.startsWith('<') ? x : `<p>${x}</p>`)
    .join('').replace(/\|/g, '<span class="honor-space"></span>');

  const ICONS = {"instagram": "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", "linkedin": "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", "email": "M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z", "github": "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", "phone": "M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.3 22 2 13.7 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z"};
  const links = ['phone','instagram','linkedin','email','github'].map(k =>
    `<a href="${cfg.contact[k]}" target="_blank" rel="noopener" aria-label="${k}"><svg class="social-icon" viewBox="0 0 24 24"><path d="${ICONS[k]}"/></svg></a>`).join('');
  const onLog = /log\.html$/.test(location.pathname);
  $$('[data-footer]').forEach(f => f.innerHTML = `
    ${onLog ? '' : `<div class="footer-log"><a href="log.html" class="footer-nav-link">${T.logLink}</a></div>`}
    <div class="social-links">${links}</div>
    <div class="copyright">${T.copyright} <a href="#" class="to-top">${T.toTop}</a></div>`);

  const link = document.createElement('link');
  link.rel = 'stylesheet'; link.href = U('assets/common.css');
  document.head.appendChild(link);
  if (!zh) {
    const t = document.createElement('a');
    t.className = 'lang-toggle'; t.href = U('qiaopi.html'); t.textContent = T.switchLabel;
    t.onclick = () => localStorage.lang = 'zh';
    document.body.appendChild(t);
  }

  if (document.body.dataset.splash != null && !sessionStorage.splash) {
    const s = document.createElement('div'); s.id = 'splash';
    s.innerHTML = `<div class="card"><h2>The Daily Engineer · 番批</h2><p>Choose your reading</p>
      <a class="splash-btn" href="${U('index.html')}" data-lang="en">Enter Front Page</a>
      <a class="splash-btn" href="${U('qiaopi.html')}" data-lang="zh">進入中文版</a>
      <a class="splash-btn" href="${U(cfg.pdf)}" target="_blank" rel="noopener">Link to CV ↗</a>
      <div class="social-links">${links}</div></div>`;
    s.querySelectorAll('.splash-btn').forEach(a => a.onclick = e => {
      sessionStorage.splash = 1;
      if (a.dataset.lang) {
        localStorage.lang = a.dataset.lang;
        if ((a.dataset.lang === 'zh') === zh) { e.preventDefault(); s.remove(); }
      }
    });
    document.body.appendChild(s);
  }

  const parse = raw => {
    const m = raw.replace(/\r/g, '').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    const meta = {};
    m[1].split('\n').forEach(l => { const i = l.indexOf(':'); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
    return { meta, body: m[2] };
  };
  const loadProject = async id => {
    const r = await fetch(U(`assets/projects/${id}.md`));
    if (!r.ok) throw new Error(id);
    return { id, ...parse(await r.text()) };
  };
  // Projects are discovered automatically: projects.json is regenerated on every push
  // (tools/build_index.py + GitHub Action). If it is missing, fall back to the GitHub API.
  const listProjects = async () => {
    let ids;
    try { const r = await fetch(U('assets/projects/projects.json')); if (r.ok) ids = await r.json(); } catch {}
    if (!ids) {
      const r = await fetch(`https://api.github.com/repos/${cfg.repo}/contents/assets/projects`);
      ids = (await r.json()).filter(f => f.name.endsWith('.md')).map(f => f.name.slice(0, -3));
    }
    const ts = m => m.date === 'present' ? Infinity : (Date.parse(m.date) || 0);
    return (await Promise.allSettled(ids.map(loadProject))).filter(x => x.status === 'fulfilled')
      .map(x => x.value).sort((a, b) => ts(b.meta) - ts(a.meta));   // newest first
  };
  return { cfg, T, U, loadProject, listProjects };
})();
