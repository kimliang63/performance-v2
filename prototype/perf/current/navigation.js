// GHR Navigation Component
// Provides header with mega menu + sidebar navigation

const GHR_NAV = {
  // Icon set
  I: {
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    briefcase:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    building:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    dollar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    git:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    inbox:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  },

  // Module data with file paths
  M: {
    perf:{n:'绩效管理',l:'Performance',ic:'target',groups:[
      {n:'绩效基础配置',ic:'settings',items:[
        {n:'绩效周期',ic:'calendar',file:'perf-base-cycle.html'},
        {n:'单位',ic:'building',file:'perf-base-unit.html'},
        {n:'等级规则',ic:'settings',file:'perf-base-grade.html'},
        {n:'计算规则',ic:'settings',file:'perf-base-calc.html'},
        {n:'衡量标准',ic:'target',file:'perf-base-standard.html'},
        {n:'指标库',ic:'file',file:'perf-base-indicator.html'},
        {n:'评价规则',ic:'settings',file:'perf-base-evaluation.html'},
        {n:'强制分布规则',ic:'settings',file:'perf-forced-distribution.html'},
      ]},
      {n:'绩效方案',ic:'file',items:[
        {n:'绩效方案',ic:'file',file:'perf-scheme-list.html'},
      ]},
      {n:'绩效活动',ic:'calendar',items:[
        {n:'活动管理',ic:'grid',file:'perf-activity.html'},
      ]},
      {n:'工作台',ic:'home',items:[
        {n:'我的绩效',ic:'target',file:'employee/demo-workbench-home.html'},
        {n:'团队绩效',ic:'users',file:'employee/demo-workbench-team.html'},
      ]},
      {n:'绩效报表',ic:'chart',items:[
        {n:'目标中心',ic:'target',file:'perf-report-goals.html'},
        {n:'绩效结果',ic:'chart',file:'perf-report-results.html'},
        {n:'考核进度',ic:'chart',file:'perf-report-progress.html'},
        {n:'绩效报表',ic:'chart',file:'perf-report-distribution.html'},
      ]},
      {n:'绩效表单',ic:'file',items:[
        {n:'业务流程演示',ic:'eye',file:'demo-index.html'},
      ]},
    ]},
  },
  MO:['perf'],
  // Module aliases: map non-standard module names to real modules
  _aliases: { workbench: 'perf' },

  // State
  cur:'perf',
  child:'绩效方案',
  menuOn:false,
  toastTimer:null,

  // Initialize navigation
  init(activeModule, activeItem) {
    this.cur = activeModule || 'perf';
    this.child = activeItem || '绩效方案';
    // Compute base path for cross-directory navigation
    // All demo pages are one level deep (employee/, manager/, etc.),
    // so basePath is always '../' to reach demo-index.html and root-level files.
    const path = window.location.pathname;
    const subdirs = ['/employee/', '/manager/', '/employee-mobile/', '/manager-mobile/', '/employee-agent/', '/manager-agent/'];
    this.basePath = subdirs.some(d => path.includes(d)) ? '../' : '';
    this.injectHTML();
    this.injectCSS();
    this.injectToastCSS();
    this.enter();
  },

  // Inject toast CSS
  injectToastCSS() {
    if (document.getElementById('ghr-toast-css')) return;
    const style = document.createElement('style');
    style.id = 'ghr-toast-css';
    style.textContent = `
      .ghr-toast{position:fixed;top:calc(var(--header-h) + 16px);left:50%;transform:translateX(-50%);background:var(--c9);color:#FFF;padding:12px 20px;border-radius:var(--r2);font:500 13px/1 var(--f);z-index:9999;opacity:0;transition:opacity .3s;pointer-events:none;display:flex;align-items:center;gap:8px;box-shadow:0 8px 24px rgba(0,0,0,.2)}
      .ghr-toast.show{opacity:1}
      .ghr-toast svg{width:16px;height:16px;color:var(--ac);flex-shrink:0}
      .sb-i.has-child{cursor:default}
      .sb-i.has-child:hover{background:transparent;font-weight:400}
      .sb-child{margin-left:40px}
      .sb-child .sb-i{padding-left:10px;font-size:13px}
    `;
    document.head.appendChild(style);
  },

  // Show toast
  showToast(msg) {
    let toast = document.getElementById('ghrToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ghrToast';
      toast.className = 'ghr-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `${this.I.alert}${msg}`;
    toast.classList.add('show');
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  },

  // Inject CSS
  injectCSS() {
    if (document.getElementById('ghr-nav-css')) return;
    const style = document.createElement('style');
    style.id = 'ghr-nav-css';
    style.textContent = `
      :root{
        --sb-bg:#FFF;--sb-hover:#F4F4F5;--sb-active-bg:#F0F5FF;--sb-active-l:#2563EB;
        --sb-text:#71717A;--sb-text-hv:#3F3F46;--sb-text-act:#2563EB;
        --sb-icon:#A1A1AA;--sb-icon-act:#2563EB;
        --header-h:52px;--sidebar-w:240px;
        --shadow-dropdown:0 10px 40px -10px rgba(0,0,0,.12),0 2px 10px -2px rgba(0,0,0,.04);
      }
      .hdr{height:var(--header-h);background:var(--sf);border-bottom:1px solid var(--dv);display:flex;align-items:center;padding:0 24px;gap:16px;position:sticky;top:0;z-index:1100}
      .hdr-l{display:flex;align-items:center;gap:14px}
      .menu-btn{display:flex;align-items:center;gap:5px;padding:5px 12px;background:var(--sf);border:1px solid var(--c2);border-radius:var(--r1);font:500 13px/1 var(--f);color:var(--c6);cursor:pointer;transition:all .12s}
      .menu-btn:hover{border-color:var(--c3);color:var(--c8)}
      .menu-btn.on{background:var(--pr50);border-color:var(--pr200);color:var(--pr)}
      .menu-btn svg{width:13px;height:13px}
      .hdr-c{flex:1;display:flex;justify-content:center}
      .sch{width:320px;display:flex;align-items:center;gap:8px;background:var(--c0);border:1px solid transparent;border-radius:var(--r1);padding:0 12px;height:34px;transition:all .15s}
      .sch:focus-within{background:var(--sf);border-color:var(--pr)}
      .sch svg{color:var(--c4);flex-shrink:0}
      .sch input{border:none;background:transparent;outline:none;font:13px/1 var(--f);width:100%;color:var(--c9)}
      .sch input::placeholder{color:var(--c4)}
      .sch-k{font:600 10px/1 var(--m);color:var(--c4);background:var(--c1);padding:2px 6px;border-radius:3px;border:1px solid var(--c2);flex-shrink:0}
      .hdr-r{display:flex;align-items:center;gap:2px}
      .hdr-ic{width:32px;height:32px;border-radius:var(--r1);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--c5);background:transparent;border:none;transition:all .12s;position:relative}
      .hdr-ic:hover{background:var(--c1);color:var(--c7)}
      .hdr-ic .dot{position:absolute;top:6px;right:6px;width:7px;height:7px;background:var(--ro);border-radius:50%;border:1.5px solid var(--sf)}
      .av{width:30px;height:30px;border-radius:50%;background:var(--pr);display:flex;align-items:center;justify-content:center;font:600 12px/1 var(--f);color:#FFF;cursor:pointer;margin-left:6px}
      .menu-ov{position:fixed;inset:0;top:var(--header-h);background:rgba(0,0,0,.3);z-index:1200;opacity:0;pointer-events:none;transition:opacity .2s}
      .menu-ov.on{opacity:1;pointer-events:all}
      .mega{position:absolute;top:var(--header-h);left:0;right:0;bottom:0;background:var(--sf);z-index:1300;opacity:0;pointer-events:none;transition:all .2s ease;transform:translateY(-4px);overflow-y:auto}
      .mega.on{opacity:1;pointer-events:all;transform:translateY(0)}
      .mega-hd{display:flex;align-items:center;justify-content:space-between;padding:16px 28px 12px;background:var(--c0);border-bottom:1px solid var(--dv)}
      .mega-hd-l{display:flex;align-items:center;gap:12px}
      .mega-hd-ic{width:30px;height:30px;border-radius:var(--r1);background:var(--pr);display:flex;align-items:center;justify-content:center}
      .mega-hd-ic svg{width:14px;height:14px;color:#FFF}
      .mega-hd-t{font:600 14px/1.2 var(--f);color:var(--c9)}
      .mega-hd-s{font:400 11px/1 var(--f);color:var(--c5);margin-top:2px}
      .mega-grid{display:flex;flex-direction:column;padding:4px 0}
      .mega-mod{border-bottom:1px solid var(--dv)}
      .mega-mod:last-child{border-bottom:none}
      .mega-mod:hover{background:var(--c0)}
      .mega-mod-hd{display:flex;align-items:center;gap:10px;padding:12px 28px}
      .mega-mod-ic{width:26px;height:26px;border-radius:var(--r1);background:var(--pr);display:flex;align-items:center;justify-content:center}
      .mega-mod-ic svg{width:13px;height:13px;color:#FFF}
      .mega-mod-info{flex:1}
      .mega-mod-n{font:600 13px/1.3 var(--f);color:var(--c8)}
      .mega-mod-l{font:500 10px/1 var(--f);color:var(--c4);text-transform:uppercase;letter-spacing:.6px;margin-top:2px}
      .mega-mod-c{font:500 10px/1 var(--f);color:var(--c4);background:var(--c1);padding:2px 7px;border-radius:3px}
      .mega-mod-bd{padding:0 28px 12px;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:2px}
      .mega-g{padding:8px 12px;cursor:pointer;transition:all .12s;border-radius:var(--r1);border:1px solid transparent}
      .mega-g:hover{background:var(--pr50);border-color:var(--pr100)}
      .mega-g-hd{display:flex;align-items:center;gap:8px}
      .mega-g-ic{width:18px;height:18px;border-radius:4px;background:var(--pr50);display:flex;align-items:center;justify-content:center}
      .mega-g-ic svg{width:10px;height:10px;color:var(--pr)}
      .mega-g-n{font:500 13px/1 var(--f);color:var(--c7)}
      .mega-g-c{font:500 10px/1 var(--f);color:var(--c4);margin-left:auto;background:var(--c1);padding:2px 6px;border-radius:8px}
      .mega-g:hover .mega-g-n{color:var(--pr)}
      .mega-g:hover .mega-g-c{background:var(--pr100);color:var(--pr)}
      .main{display:flex;height:calc(100vh - var(--header-h))}
      .ct{flex:1;overflow-y:auto;padding:24px}
      .sb{width:var(--sidebar-w);background:var(--sb-bg);display:flex;flex-direction:column;flex-shrink:0;box-shadow:1px 0 0 0 var(--c2)}
      .sb-hd{padding:16px 16px 12px;border-bottom:1px solid var(--dv)}
      .sb-hd-in{display:flex;align-items:center;gap:10px}
      .sb-ic{width:30px;height:30px;border-radius:var(--r1);background:var(--pr);display:flex;align-items:center;justify-content:center}
      .sb-ic svg{width:15px;height:15px;color:#FFF}
      .sb-n{font:600 14px/1.2 var(--f);color:var(--c9)}
      .sb-l{font:500 10px/1 var(--f);color:var(--c4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}
      .sb-bd{flex:1;overflow-y:auto;padding:6px 8px}
      .sb-g{margin-bottom:1px}
      .sb-g-hd{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--r1);cursor:pointer;transition:all .12s;font:600 14px/1 var(--f);color:var(--sb-text)}
      .sb-g-hd:hover{background:var(--sb-hover);color:var(--sb-text-hv)}
      .sb-g-hd svg{width:14px;height:14px;color:var(--sb-icon);flex-shrink:0;transition:all .15s}
      .sb-g-hd.on svg{color:var(--sb-icon-act);transform:rotate(90deg)}
      .sb-g-hd.on{color:var(--sb-text-hv)}
      .sb-g-bd{overflow:hidden;max-height:0;transition:max-height .25s ease}
      .sb-g-bd.on{max-height:800px}
      .sb-i{display:flex;align-items:center;gap:8px;padding:7px 10px 7px 32px;border-radius:var(--r1);cursor:pointer;transition:all .12s;font:400 14px/1.4 var(--f);color:var(--sb-text);position:relative}
      .sb-i:hover{background:var(--sb-hover);color:var(--sb-text-hv);font-weight:500}
      .sb-i.on{background:var(--sb-active-bg);color:var(--sb-text-act);font-weight:600}
      .sb-i.on::before{content:'';position:absolute;left:0;top:5px;bottom:5px;width:3px;background:var(--sb-active-l);border-radius:0 2px 2px 0}
      .sb-i svg{width:14px;height:14px;flex-shrink:0;color:var(--sb-icon);opacity:.6}
      .sb-i:hover svg{opacity:.9;color:var(--sb-text-hv)}
      .sb-i.on svg{color:var(--sb-icon-act);opacity:1}
      .sb-ft{padding:10px 16px;border-top:1px solid var(--dv);font:500 10px/1 var(--f);color:var(--c4);text-align:center}
      .sb-i.has-children{cursor:default;font-weight:600;color:var(--sb-text-hv)}
      .sb-i.has-children:hover{background:transparent}
      .sb-children{margin-left:40px;max-height:0;overflow:hidden;transition:max-height .25s ease}
      .sb-children.on{max-height:500px}
      .sb-children .sb-i{padding-left:10px;font-size:13px}
    `;
    document.head.appendChild(style);
  },

  // Inject HTML structure
  injectHTML() {
    // Remove existing header if present
    const oldHdr = document.querySelector('body > .hdr');
    if (oldHdr) oldHdr.remove();

    // Create header
    const hdr = document.createElement('header');
    hdr.className = 'hdr';
    hdr.innerHTML = `
      <div class="hdr-l">
        <div class="logo">
          <span class="logo-t">HR ONE</span>
        </div>
        <button class="menu-btn" id="menuBtn" onclick="GHR_NAV.toggleMenu()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>全部菜单</span>
          <svg width="7" height="7" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 6l4 4 4-4"/></svg>
        </button>
      </div>
      <div class="hdr-c">
        <div class="sch">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input placeholder="搜索菜单、员工、流程…" />
          <span class="sch-k">⌘K</span>
        </div>
      </div>
      <div class="hdr-r">
        <button class="hdr-ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><span class="dot"></span></button>
        <button class="hdr-ic"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></button>
        <div class="av">管</div>
      </div>
    `;
    document.body.insertBefore(hdr, document.body.firstChild);

    // Create mega menu overlay and panel
    let menuOv = document.getElementById('menuOv');
    if (!menuOv) {
      menuOv = document.createElement('div');
      menuOv.id = 'menuOv';
      menuOv.className = 'menu-ov';
      menuOv.onclick = () => this.closeMenu();
      document.body.appendChild(menuOv);
    }
    let mega = document.getElementById('mega');
    if (!mega) {
      mega = document.createElement('div');
      mega.id = 'mega';
      mega.className = 'mega';
      mega.innerHTML = '<div id="megaWrap"></div>';
      document.body.appendChild(mega);
    }

    // Create main layout with sidebar
    const existingMain = document.querySelector('.main');
    if (!existingMain) {
      // Wrap existing content in main layout
      const body = document.body;
      const children = Array.from(body.children).filter(c => !c.classList.contains('hdr') && !c.classList.contains('menu-ov') && !c.classList.contains('mega') && c.id !== 'menuOv' && c.id !== 'mega');

      const main = document.createElement('div');
      main.className = 'main';

      const sidebar = document.createElement('aside');
      sidebar.className = 'sb';
      sidebar.innerHTML = `
        <div class="sb-hd" id="sbHd"></div>
        <div class="sb-bd" id="sbBd"></div>
        <div class="sb-ft">HR ONE v3.0</div>
      `;

      const ct = document.createElement('div');
      ct.className = 'ct';
      ct.id = 'ct';

      // Move existing content into ct
      children.forEach(c => {
        if (c.tagName === 'SCRIPT') return; // Skip scripts
        ct.appendChild(c);
      });

      main.appendChild(sidebar);
      main.appendChild(ct);
      body.appendChild(main);
    }
  },

  // Mega Menu
  toggleMenu() {
    if (this.menuOn) { this.closeMenu(); return; }
    this.buildMega();
    document.getElementById('mega').classList.add('on');
    document.getElementById('menuOv').classList.add('on');
    document.getElementById('menuBtn').classList.add('on');
    this.menuOn = true;
  },

  closeMenu() {
    document.getElementById('mega').classList.remove('on');
    document.getElementById('menuOv').classList.remove('on');
    document.getElementById('menuBtn').classList.remove('on');
    this.menuOn = false;
  },

  buildMega() {
    const w = document.getElementById('megaWrap');
    const tn = this.MO.length;
    const tg = this.MO.reduce((s, k) => s + this.M[k].groups.length, 0);
    let h = `<div class="mega-hd"><div class="mega-hd-l"><div class="mega-hd-ic">${this.I.grid}</div><div><div class="mega-hd-t">全部菜单</div><div class="mega-hd-s">${tn} 个模块 · ${tg} 个分组</div></div></div></div><div class="mega-grid">`;
    this.MO.forEach(k => {
      const m = this.M[k];
      h += `<div class="mega-mod"><div class="mega-mod-hd"><div class="mega-mod-ic">${this.I[m.ic]}</div><div class="mega-mod-info"><div class="mega-mod-n">${m.n}</div><div class="mega-mod-l">${m.l}</div></div><span class="mega-mod-c">${m.groups.length} 组</span></div><div class="mega-mod-bd">`;
      m.groups.forEach(g => {
        h += `<div class="mega-g" onclick="GHR_NAV.goGroup('${k}','${g.n}')"><div class="mega-g-hd"><div class="mega-g-ic">${this.I[g.ic]}</div><span class="mega-g-n">${g.n}</span><span class="mega-g-c">${g.items.length}</span></div></div>`;
      });
      h += `</div></div>`;
    });
    w.innerHTML = h + '</div>';
  },

  goGroup(mk, gn) {
    const m = this.M[mk];
    const g = m.groups.find(g => g.n === gn);
    if (g && g.items.length) {
      const firstItem = g.items[0];
      if (firstItem.children && firstItem.children.length) {
        this.go(mk, firstItem.n, firstItem.children[0].n);
      } else {
        this.go(mk, firstItem.n);
      }
    } else {
      this.go(mk, gn);
    }
  },

  go(m, i, child) {
    this.cur = m;
    this.child = i;
    this.closeMenu();
    this.enter();
    if (child) {
      // Find the item and click its child
      const mod = this.M[this._aliases[m] || m];
      if (mod) {
        for (const g of mod.groups) {
          for (const item of g.items) {
            if (item.n === i && item.children) {
              const ch = item.children.find(c => c.n === child);
              if (ch) this.navigateTo(ch);
            }
          }
        }
      }
    }
  },

  // Navigate to a page
  navigateTo(item) {
    if (item && item.file) {
      window.location.href = this.basePath + item.file;
    } else {
      this.showToast('该页面暂无原型，正在开发中');
    }
  },

  // Sidebar
  enter() {
    // Resolve module alias
    const modKey = this._aliases[this.cur] || this.cur;
    const m = this.M[modKey];
    if (!m) return;
    document.getElementById('sbHd').innerHTML = `<div class="sb-hd-in"><div class="sb-ic">${this.I[m.ic]}</div><div><div class="sb-n">${m.n}</div><div class="sb-l">${m.l}</div></div></div>`;

    // Find which group contains the active child
    let activeGroup = null;
    let activeParent = null;
    m.groups.forEach(g => {
      g.items.forEach(item => {
        if (item.n === this.child) {
          activeGroup = g.n;
        }
        if (item.children) {
          item.children.forEach(ch => {
            if (ch.n === this.child) {
              activeGroup = g.n;
              activeParent = item.n;
            }
          });
        }
      });
    });

    const sb = document.getElementById('sbBd');
    let h = '';
    m.groups.forEach(g => {
      const isOpen = g.n === activeGroup;
      h += `<div class="sb-g"><div class="sb-g-hd${isOpen ? ' on' : ''}" onclick="GHR_NAV.toggleSb(this)">${this.I[g.ic]}${g.n}</div><div class="sb-g-bd${isOpen ? ' on' : ''}">`;
      g.items.forEach(item => {
        if (item.children) {
          // Parent item with children (like 绩效表单)
          const isParentActive = item.n === activeParent;
          h += `<div class="sb-i has-children${isParentActive ? ' on' : ''}" onclick="GHR_NAV.toggleChildren(this)">
            <span style="display:flex;align-items:center;gap:8px;flex:1">${this.I[item.ic]}${item.n}</span>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="transition:transform .2s;${isParentActive ? 'transform:rotate(90deg)' : ''}"><path d="M6 4l4 4-4 4"/></svg>
          </div>`;
          h += `<div class="sb-children${isParentActive ? ' on' : ''}">`;
          item.children.forEach(ch => {
            h += `<div class="sb-i${ch.n === this.child ? ' on' : ''}" onclick="GHR_NAV.sel('${ch.n}', '${item.file || ''}', '${ch.file || ''}')">${this.I[ch.ic]}${ch.n}</div>`;
          });
          h += `</div>`;
        } else {
          const isActive = item.n === this.child && !activeParent;
          h += `<div class="sb-i${isActive ? ' on' : ''}" onclick="GHR_NAV.sel('${item.n}', '${item.file || ''}')">${this.I[item.ic]}${item.n}</div>`;
        }
      });
      h += `</div></div>`;
    });
    sb.innerHTML = h;
  },

  toggleSb(el) {
    el.classList.toggle('on');
    el.nextElementSibling.classList.toggle('on');
  },

  toggleChildren(el) {
    const children = el.nextElementSibling;
    const svg = el.querySelector('svg');
    children.classList.toggle('on');
    if (svg) svg.style.transform = children.classList.contains('on') ? 'rotate(90deg)' : '';
  },

  sel(name, parentFile, childFile) {
    this.child = name;
    this.enter();

    // Navigate to the file
    const file = childFile || parentFile;
    if (file) {
      window.location.href = this.basePath + file;
    } else {
      // Check if this is a parent item with children
      const mod = this.M[this._aliases[this.cur] || this.cur];
      if (mod) {
        for (const g of mod.groups) {
          for (const item of g.items) {
            if (item.n === name && item.children) {
              // Parent item, don't navigate, just toggle children
              return;
            }
            if (item.n === name && !item.file) {
              this.showToast('该页面暂无原型，正在开发中');
              return;
            }
          }
        }
      }
    }
  }
};
