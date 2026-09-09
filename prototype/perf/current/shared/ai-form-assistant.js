/**
 * V6 AI 表单助手
 * 对话框：任务处理结果 / 总结
 * 表单：填写结果内容
 */
(function (global) {
  'use strict';

  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M18 14h.01"/><path d="M6 14h.01"/><path d="M12 14v4"/><path d="M8 18h8"/><path d="M6 22h12"/></svg>';
  var CLOSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var SEND = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
  var PAPER = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function now() {
    return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }

  function fileSize(n) {
    if (n > 1024 * 1024) return (n / (1024 * 1024)).toFixed(1) + 'MB';
    return Math.max(1, Math.round(n / 1024)) + 'KB';
  }

  function renderResult(r) {
    if (!r) return '';
    var html = '<div class="ai-result">';
    html += '<div class="ai-result-hd"><div class="ai-result-title">' + esc(r.title || '任务结果') + '</div>';
    if (r.tag) html += '<span class="ai-result-tag ' + esc(r.tagTone || 'pr') + '">' + esc(r.tag) + '</span>';
    html += '</div><div class="ai-result-bd">';
    if (r.summary) html += '<div class="ai-result-sum">' + esc(r.summary) + '</div>';
    if (r.stats && r.stats.length) {
      html += '<div class="ai-result-stats">' + r.stats.map(function (s) {
        return '<span class="ai-result-stat">' + esc(s) + '</span>';
      }).join('') + '</div>';
    }
    if (r.details && r.details.length) {
      html += '<div class="ai-result-details">' + r.details.map(function (d) {
        var block = '<div class="ai-detail-card">';
        block += '<div class="ai-detail-hd"><div class="ai-detail-title">' + esc(d.title || '') + '</div>';
        if (d.badges && d.badges.length) {
          block += '<div class="ai-detail-badges">' + d.badges.map(function (b) {
            return '<span class="ai-detail-badge">' + esc(b) + '</span>';
          }).join('') + '</div>';
        }
        block += '</div>';
        if (d.fields && d.fields.length) {
          block += '<div class="ai-detail-fields">' + d.fields.map(function (f) {
            return '<div class="ai-detail-row"><span class="ai-detail-k">' + esc(f.k) + '</span><span class="ai-detail-v">' + esc(f.v).replace(/\n/g, '<br/>') + '</span></div>';
          }).join('') + '</div>';
        }
        if (d.body) block += '<div class="ai-detail-body">' + esc(d.body).replace(/\n/g, '<br/>') + '</div>';
        block += '</div>';
        return block;
      }).join('') + '</div>';
    }
    if (r.groups && r.groups.length) {
      html += '<div class="ai-result-groups">' + r.groups.map(function (g) {
        var block = '<div class="ai-mod-group">';
        block += '<div class="ai-mod-hd"><span class="ai-mod-name">' + esc(g.title || '') + '</span>';
        if (g.meta) block += '<span class="ai-mod-meta">' + esc(g.meta) + '</span>';
        block += '</div><div class="ai-mod-goals">';
        (g.goals || []).forEach(function (d) {
          block += '<div class="ai-detail-card">';
          block += '<div class="ai-detail-hd"><div class="ai-detail-title">' + esc(d.title || '') + '</div>';
          if (d.badges && d.badges.length) {
            block += '<div class="ai-detail-badges">' + d.badges.map(function (b) {
              return '<span class="ai-detail-badge">' + esc(b) + '</span>';
            }).join('') + '</div>';
          }
          block += '</div>';
          if (d.fields && d.fields.length) {
            block += '<div class="ai-detail-fields">' + d.fields.map(function (f) {
              return '<div class="ai-detail-row"><span class="ai-detail-k">' + esc(f.k) + '</span><span class="ai-detail-v">' + esc(f.v).replace(/\n/g, '<br/>') + '</span></div>';
            }).join('') + '</div>';
          }
          block += '</div>';
        });
        block += '</div></div>';
        return block;
      }).join('') + '</div>';
    }
    if (r.items && r.items.length) {
      html += '<ul class="ai-result-list">' + r.items.map(function (it) {
        return '<li>' + esc(it) + '</li>';
      }).join('') + '</ul>';
    }
    html += '</div>';
    if (r.applyId || (r.actions && r.actions.length)) {
      html += '<div class="ai-result-ft">';
      if (r.applyId) {
        html += '<button class="ai-msg-btn primary" data-ai-apply="' + esc(r.applyId) + '">' + esc(r.applyLabel || '填入表单') + '</button>';
      }
      (r.actions || []).forEach(function (a) {
        var label = typeof a === 'string' ? a : a.label;
        var id = typeof a === 'string' ? a : a.id;
        var primary = typeof a === 'object' && a.primary ? ' primary' : '';
        html += '<button class="ai-msg-btn' + primary + '" data-ai-action="' + esc(id) + '">' + esc(label) + '</button>';
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderMsg(m, shortcuts) {
    var html = '<div class="ai-msg ' + (m.role || 'bot') + '">';
    if (m.typing) {
      html += '<div class="ai-msg-bd"><span class="ai-typing"><i></i><i></i><i></i></span></div></div>';
      return html;
    }
    html += '<div class="ai-msg-bd">' + esc(m.text || '').replace(/\n/g, '<br/>') + '</div>';
    if (m.shortcuts && shortcuts && shortcuts.length) {
      html += '<div class="ai-shortcuts">' + shortcuts.map(function (s) {
        return '<button type="button" class="ai-shortcut" data-ai-action="' + esc(s.id || s.label) + '">' +
          '<span class="ai-shortcut-icon">' + esc(s.icon || 'AI') + '</span>' +
          '<span class="ai-shortcut-text"><span class="ai-shortcut-label">' + esc(s.label) + '</span></span></button>';
      }).join('') + '</div>';
    }
    if (m.files && m.files.length) {
      html += '<div class="ai-file-list">' + m.files.map(function (f) {
        return '<div class="ai-file"><span class="ai-file-name">' + esc(f.name) + '</span>' +
          '<span class="ai-file-size">' + esc(f.size) + '</span>' +
          '<span class="ai-file-status ' + (f.status || 'parsed') + '">' + esc(f.statusLabel || (f.status === 'parsing' ? '解析中' : '已解析')) + '</span></div>';
      }).join('') + '</div>';
    }
    if (m.result) html += renderResult(m.result);
    if (m.actions && m.actions.length) {
      html += '<div class="ai-msg-actions">' + m.actions.map(function (a) {
        var label = typeof a === 'string' ? a : a.label;
        var id = typeof a === 'string' ? a : a.id;
        var primary = (typeof a === 'object' && a.primary) || /填入|确认|应用|采纳/.test(label) ? ' primary' : '';
        return '<button class="ai-msg-btn' + primary + '" data-ai-action="' + esc(id) + '">' + esc(label) + '</button>';
      }).join('') + '</div>';
    }
    if (m.time) html += '<div class="ai-msg-time">' + esc(m.time) + '</div>';
    html += '</div>';
    return html;
  }

  function flash(els) {
    var list = Array.prototype.slice.call(els || []);
    list.forEach(function (el) {
      if (!el) return;
      el.classList.remove('ai-form-flash');
      void el.offsetWidth;
      el.classList.add('ai-form-flash');
    });
  }

  function AiFormAssistant(config) {
    this.config = config || {};
    this.msgs = [];
    this.busy = false;
    this.root = null;
    this.bd = null;
  }

  AiFormAssistant.prototype.mount = function () {
    var c = this.config;
    var existing = document.getElementById('aiChat');
    if (existing) {
      existing.remove();
      document.querySelectorAll('.ai-toggle').forEach(function (el) { el.remove(); });
    }
    var html =
      '<div class="ai-chat" id="aiChat">' +
      '<div class="ai-chat-hd">' +
      '<div class="ai-chat-hd-ic">' + ICON + '</div>' +
      '<div><div class="ai-chat-hd-t">' + esc(c.title || 'AI 助手') + '</div>' +
      '<div class="ai-chat-hd-s">' + esc(c.subtitle || '') + '</div></div>' +
      '<button class="ai-chat-close" type="button" data-ai-toggle>' + CLOSE + '</button>' +
      '</div>' +
      '<div class="ai-chat-bd" id="chatBd"></div>' +
      '<div class="ai-chat-ft">' +
      '<label class="ai-chat-upload" title="上传参考文件">' + PAPER +
      '<input type="file" multiple accept=".doc,.docx,.xls,.xlsx,.pdf,.txt,.word" data-ai-file/></label>' +
      '<input class="ai-chat-input" id="chatInput" placeholder="' + esc(c.placeholder || '输入指令…') + '" data-ai-input/>' +
      '<button class="ai-chat-send" type="button" data-ai-send>' + SEND + '</button>' +
      '</div></div>' +
      '<button class="ai-toggle" type="button" data-ai-toggle>' + ICON + '</button>';
    document.body.insertAdjacentHTML('beforeend', html);
    this.root = document.getElementById('aiChat');
    this.bd = document.getElementById('chatBd');
    this.bind();
    this.resetGreeting();
    return this;
  };

  AiFormAssistant.prototype.bind = function () {
    var self = this;
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ai-toggle],[data-ai-send],[data-ai-action],[data-ai-apply]');
      if (!t) return;
      if (t.hasAttribute('data-ai-toggle')) {
        document.body.classList.toggle('chat-open');
        return;
      }
      if (t.hasAttribute('data-ai-send')) {
        self.sendFromInput();
        return;
      }
      if (t.hasAttribute('data-ai-apply')) {
        var applyId = t.getAttribute('data-ai-apply');
        if (typeof self.config.onApply === 'function') self.config.onApply(applyId, t);
        return;
      }
      if (t.hasAttribute('data-ai-action')) {
        var action = t.getAttribute('data-ai-action');
        self.handleAction(action);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.target && e.target.matches && e.target.matches('[data-ai-input]') && e.key === 'Enter') {
        e.preventDefault();
        self.sendFromInput();
      }
    });
    document.addEventListener('change', function (e) {
      if (!e.target.matches || !e.target.matches('[data-ai-file]')) return;
      var files = Array.prototype.slice.call(e.target.files || []);
      e.target.value = '';
      if (!files.length) return;
      self.handleFiles(files);
    });
  };

  AiFormAssistant.prototype.resetGreeting = function () {
    var c = this.config;
    this.msgs = [{
      role: 'bot',
      text: c.greeting || '你好，我可以协助你完成本页填写。',
      time: now(),
      shortcuts: true
    }];
    this.render();
  };

  AiFormAssistant.prototype.render = function () {
    if (!this.bd) return;
    var shortcuts = this.config.shortcuts || [];
    this.bd.innerHTML = this.msgs.map(function (m) {
      return renderMsg(m, shortcuts);
    }).join('');
    this.bd.scrollTop = this.bd.scrollHeight;
  };

  AiFormAssistant.prototype.push = function (msg) {
    this.msgs.push(msg);
    this.render();
  };

  AiFormAssistant.prototype.replaceLast = function (msg) {
    if (this.msgs.length) this.msgs[this.msgs.length - 1] = msg;
    else this.msgs.push(msg);
    this.render();
  };

  AiFormAssistant.prototype.withBusy = function (fn) {
    var self = this;
    if (self.busy) return;
    self.busy = true;
    self.push({ role: 'bot', typing: true });
    setTimeout(function () {
      self.msgs.pop();
      try { fn(); } finally { self.busy = false; self.render(); }
    }, 700);
  };

  AiFormAssistant.prototype.sendFromInput = function () {
    var input = document.getElementById('chatInput');
    if (!input) return;
    var text = (input.value || '').trim();
    if (!text) return;
    input.value = '';
    this.push({ role: 'user', text: text, time: now() });
    if (typeof this.config.onSend === 'function') this.config.onSend(text, this);
    else this.handleAction(text);
  };

  AiFormAssistant.prototype.handleAction = function (action) {
    if (!action) return;
    var last = this.msgs[this.msgs.length - 1];
    if (!(last && last.role === 'user' && last.text === action)) {
      this.push({ role: 'user', text: action, time: now() });
    }
    if (typeof this.config.onAction === 'function') this.config.onAction(action, this);
  };

  AiFormAssistant.prototype.handleFiles = function (files) {
    var list = files.map(function (f) {
      return { name: f.name, size: fileSize(f.size), status: 'parsing', statusLabel: '解析中' };
    });
    this.push({
      role: 'user',
      text: '已上传 ' + files.length + ' 个参考文件',
      time: now(),
      files: list.map(function (f) { return { name: f.name, size: f.size, status: 'parsed', statusLabel: '已选' }; })
    });
    if (typeof this.config.onFiles === 'function') this.config.onFiles(files, list, this);
  };

  AiFormAssistant.prototype.open = function () {
    document.body.classList.add('chat-open');
  };

  AiFormAssistant.now = now;
  AiFormAssistant.flash = flash;
  AiFormAssistant.fileSize = fileSize;

  global.HroneAiForm = {
    create: function (config) { return new AiFormAssistant(config).mount(); },
    now: now,
    flash: flash,
    fileSize: fileSize
  };
})(window);
