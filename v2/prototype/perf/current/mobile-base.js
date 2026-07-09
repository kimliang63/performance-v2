/* ═══════════════════════════════════════
   HR ONE · Mobile Base JS
   共享：AI面板渲染、Toast、通用工具
   ═══════════════════════════════════════ */

// Toast
function showToast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(function(){t.classList.remove('show')},2000);
}

// AI Panel 模板注入
function injectAIPanel(title, subtitle, shortcuts, onAction){
  var h='';
  h+='<div class="ai-overlay" id="aiOverlay" onclick="closeAI()"></div>';
  h+='<button class="m-fab" id="aiFab" onclick="toggleAI()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M18 14h.01"/><path d="M6 14h.01"/><path d="M12 14v4"/><path d="M8 18h8"/><path d="M6 22h12"/></svg></button>';
  h+='<div class="ai-panel" id="aiPanel">';
  h+='<div class="ai-hd"><div class="ai-hd-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M18 14h.01"/><path d="M6 14h.01"/><path d="M12 14v4"/><path d="M8 18h8"/><path d="M6 22h12"/></svg></div><div class="ai-hd-info"><div class="ai-hd-t">'+title+'</div><div class="ai-hd-s">'+subtitle+'</div></div><button class="ai-hd-close" onclick="closeAI()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
  h+='<div class="ai-bd" id="aiBd"></div>';
  h+='<div class="ai-ft"><input class="ai-input" id="aiInput" placeholder="输入指令…" onkeydown="if(event.key===\'Enter\')aiSend()"><button class="ai-send" onclick="aiSend()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>';
  h+='</div>';
  document.body.insertAdjacentHTML('beforeend', h);

  // AI 数据
  window._ai={open:false,msgs:[{role:'bot',text:subtitle.replace(/ · /g,'\n• ')+'\n\n• '+shortcuts.join('\n• '),time:'刚刚',shortcuts:true}]};
  window._aiShortcuts=shortcuts.map(function(s){return {label:s}});
  window._aiOnAction=onAction||function(){};
}

function toggleAI(){
  window._ai.open=!window._ai.open;
  document.getElementById('aiPanel').classList.toggle('open',window._ai.open);
  document.getElementById('aiOverlay').classList.toggle('open',window._ai.open);
  if(window._ai.open)renderAI();
}
function closeAI(){
  window._ai.open=false;
  document.getElementById('aiPanel').classList.remove('open');
  document.getElementById('aiOverlay').classList.remove('open');
}
function renderAI(){
  var bd=document.getElementById('aiBd');
  bd.innerHTML=window._ai.msgs.map(function(m){
    var h='<div class="ai-msg '+m.role+'"><div class="ai-msg-bd">'+m.text.replace(/\n/g,'<br/>')+'</div>';
    if(m.shortcuts){h+='<div class="ai-shortcuts">'+window._aiShortcuts.map(function(s){return '<div class="ai-shortcut" onclick="aiAction(\''+s.label+'\')"><span class="ai-shortcut-label">'+s.label+'</span></div>';}).join('')+'</div>';}
    if(m.time){h+='<div class="ai-msg-time">'+m.time+'</div>';}
    return h+'</div>';
  }).join('');
  bd.scrollTop=bd.scrollHeight;
}
function aiSend(){
  var inp=document.getElementById('aiInput');var t=inp.value.trim();if(!t)return;
  window._ai.msgs.push({role:'user',text:t});inp.value='';renderAI();
  setTimeout(function(){window._ai.msgs.push({role:'bot',text:'收到，正在分析…',time:'刚刚'});renderAI();window._aiOnAction(t);},600);
}
function aiAction(a){
  window._ai.msgs.push({role:'user',text:a});
  setTimeout(function(){window._aiOnAction(a);renderAI();},600);
}
