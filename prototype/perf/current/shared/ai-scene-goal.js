/**
 * V6 · 目标制定 AI 场景
 * 依赖页面：MODULES / render / showToast / expandedGoals
 */
(function () {
  if (!window.HroneAiForm || typeof MODULES === 'undefined') return;

  function goalCard(g) {
    var fields = [
      { k: '名称', v: g.name },
      { k: '权重', v: (g.weight != null ? g.weight : '-') + '%' }
    ];
    if (g.type === 'quant') {
      fields.push({
        k: '梯度值',
        v: '保底 ' + g.baseline + (g.unit || '') + ' / 目标 ' + g.target + (g.unit || '') + ' / 挑战 ' + g.challenge + (g.unit || '')
      });
    }
    fields.push({ k: '衡量标准', v: g.desc || '-' });
    return {
      title: g.name,
      badges: [
        g.type === 'quant' ? '定量' : '定性',
        '权重 ' + g.weight + '%'
      ],
      fields: fields
    };
  }

  function goalPreviewGroups(goals) {
    var order = ['KPI', 'KPA'];
    var map = {};
    (goals || []).forEach(function (g) {
      var m = g.module || '其他';
      if (!map[m]) map[m] = [];
      map[m].push(g);
    });
    var keys = order.filter(function (m) { return map[m] && map[m].length; });
    Object.keys(map).forEach(function (m) {
      if (keys.indexOf(m) < 0) keys.push(m);
    });
    return keys.map(function (m) {
      var list = map[m];
      var weightSum = list.reduce(function (s, g) { return s + (Number(g.weight) || 0); }, 0);
      return {
        title: m,
        meta: list.length + ' 项目标 · 权重 ' + weightSum + '%',
        goals: list.map(goalCard)
      };
    });
  }

  function fillResult(title, goals, applyId) {
    return {
      title: title,
      tag: '待填入表单',
      tagTone: 'pr',
      groups: goalPreviewGroups(goals),
      applyId: applyId,
      applyLabel: '填入表单'
    };
  }

  var PENDING = null;

  function gid() {
    return 'gai' + Date.now().toString(36) + Math.floor(Math.random() * 1000);
  }

  function fillGeneratedGoals() {
    var payload = PENDING && PENDING.goals;
    if (!payload || !payload.length) return;
    var updated = 0;
    var added = 0;
    payload.forEach(function (g) {
      var mi = g.module === 'KPI' ? 0 : 1;
      var existing = null;
      MODULES.forEach(function (m) {
        m.goals.forEach(function (goal) {
          if (!existing && (goal.name === g.name || goal.indicator === (g.indicator || g.name))) existing = goal;
        });
      });
      if (existing) {
        existing.desc = g.desc || existing.desc;
        if (g.weight != null) existing.weight = g.weight;
        if (g.target != null) existing.target = g.target;
        if (g.challenge != null) existing.challenge = g.challenge;
        if (g.baseline != null) existing.baseline = g.baseline;
        if (g.linked) existing.linkedIndicatorId = existing.linkedIndicatorId || 'ind-ai';
        existing.aiFilled = true;
        if (typeof expandedGoals !== 'undefined' && expandedGoals.add) expandedGoals.add(existing.id);
        updated++;
        return;
      }
      var goal = {
        id: gid(),
        name: g.name,
        indicator: g.indicator || g.name,
        type: g.type || 'qual',
        weight: g.weight || 5,
        desc: g.desc || '',
        measure: g.type === 'quant' ? '梯度评分' : '定性评分',
        target: g.target != null ? g.target : 1,
        challenge: g.challenge != null ? g.challenge : (g.type === 'quant' ? g.target : 1),
        baseline: g.baseline != null ? g.baseline : (g.type === 'quant' ? Math.round((g.target || 100) * 0.9) : 1),
        unit: g.unit || (g.type === 'quant' ? '%' : ''),
        rule: g.type === 'quant' ? '标准梯度计算' : '-',
        ruleFormula: '',
        msLevels: g.msLevels || [],
        linkedIndicatorId: g.linked ? 'ind-ai' : null,
        aiFilled: true,
        i18n: {}
      };
      MODULES[mi].goals.push(goal);
      if (typeof expandedGoals !== 'undefined' && expandedGoals.add) expandedGoals.add(goal.id);
      added++;
    });
    PENDING = null;
    render();
    setTimeout(function () {
      HroneAiForm.flash(document.querySelectorAll('.mod-section, .goal-block, .g-card, .mod-card'));
    }, 30);
    showToast('已更新表单：改写 ' + updated + ' 项' + (added ? '，新增 ' + added + ' 项' : ''), 'success');
    ai.push({
      role: 'bot',
      text: '已将建议写入左侧目标表单（更新 ' + updated + ' 项' + (added ? '，新增 ' + added + ' 项' : '') + '）。\n\n请核对名称、权重、衡量标准（含梯度值）后提交。',
      time: HroneAiForm.now()
    });
  }

  function applyOptimizeDesc() {
    var g = MODULES[1] && MODULES[1].goals[0];
    if (!g) return;
    g.desc = (PENDING && PENDING.text) || '1. 指标定义：覆盖需求受理、澄清、方案、内审、技术评审、研发交付、产品验收、用户验收全链路\n2. 完成标准：4 项规范全部落地，团队遵从度 ≥ 95%\n3. 验收方式：月度抽查 + 周会更新准时率\n4. 符合预期：按规范执行且无重大遗漏';
    g.aiFilled = true;
    if (typeof expandedGoals !== 'undefined' && expandedGoals.add) expandedGoals.add(g.id);
    render();
    showToast('已优化「' + g.name + '」衡量标准到表单', 'success');
    ai.push({
      role: 'bot',
      text: '已把优化后的衡量标准写入表单对应目标。对话框只保留处理总结，详细字段请在左侧表单查看。',
      time: HroneAiForm.now()
    });
  }

  function highlightCheckIssues() {
    // soft visual: expand problematic goals
    ['g4', 'g5'].forEach(function (id) {
      if (typeof expandedGoals !== 'undefined' && expandedGoals.add) expandedGoals.add(id);
    });
    render();
    showToast('已在表单中定位待改进目标', 'success');
  }

  var ai = HroneAiForm.create({
    title: 'AI 目标助手',
    subtitle: '生成目标 · 优化描述 · 填写检查',
    placeholder: '输入「帮我制定目标」或描述你的本期工作…',
    greeting: '你好，我是目标制定助手。\n\n可上传 word / xlsx / xls，或点下方场景开始；确认后写入左侧表单。',
    shortcuts: [
      { id: '帮我生成本期目标', icon: '生', label: '帮我生成本期目标' },
      { id: '优化目标描述', icon: '优', label: '优化目标描述' },
      { id: '目标填写检查', icon: '检', label: '目标填写检查' }
    ],
    onAction: function (action, assistant) {
      handle(action, assistant);
    },
    onSend: function (text, assistant) {
      handle(text, assistant);
    },
    onFiles: function (files, list, assistant) {
      assistant.withBusy(function () {
        PENDING = {
          kind: 'file-goals',
          goals: [
            { module: 'KPI', name: '需求交付周期', indicator: '需求交付周期', type: 'quant', weight: 8, target: 10, challenge: 8, baseline: 14, unit: '天', linked: true, desc: '从需求确认到上线的平均周期；符合预期：≤10 天' },
            { module: 'KPA', name: 'Q3 产品规范落地', indicator: '产品管理规范', type: 'qual', weight: 10, linked: false, desc: '完成需求池、文档、迭代火车、例会四项规范落地；符合预期：4 项全部达标' },
            { module: 'KPA', name: '绩效活动管理里程碑', indicator: '绩效重构推进', type: 'qual', weight: 15, linked: false, desc: '完成活动管理需求内审与评审；符合预期：按里程碑准时交付' }
          ]
        };
        assistant.push({
          role: 'bot',
          text: '已解析参考文件，并完成目标提取任务。',
          time: HroneAiForm.now(),
          files: list.map(function (f) { return { name: f.name, size: f.size, status: 'parsed' }; }),
          result: fillResult('文件解析完成', PENDING.goals, 'file-goals')
        });
      });
    },
    onApply: function (applyId) {
      if (applyId === 'file-goals' || applyId === 'gen-goals') fillGeneratedGoals();
      else if (applyId === 'opt-desc') applyOptimizeDesc();
      else if (applyId === 'check-jump') highlightCheckIssues();
    }
  });

  function handle(action, assistant) {
    var key = String(action || '');
    assistant.withBusy(function () {
      if (/制定目标|生成.*目标|帮我制定/.test(key)) {
        PENDING = {
          kind: 'gen-goals',
          goals: [
            { module: 'KPI', name: '资源利用率（通用）', indicator: '资源利用率', type: 'quant', weight: 5, target: 105, challenge: 110, baseline: 100, unit: '%', linked: true, desc: '人员实际投入有效工作量占比；符合预期：≥105%' },
            { module: 'KPI', name: 'UAT首次通过率', indicator: 'UAT首次通过率', type: 'quant', weight: 10, target: 98, challenge: 100, baseline: 95, unit: '%', linked: true, desc: '需求首次业务验收通过率；符合预期：≥98%' },
            { module: 'KPA', name: '日常滚动需求响应', indicator: '日常需求响应', type: 'qual', weight: 10, linked: false, desc: '按优先级滚动响应并完成验收；符合预期：关键迭代按时交付' },
            { module: 'KPA', name: '绩效重构事项推进', indicator: '绩效重构推进', type: 'qual', weight: 25, linked: false, desc: '完成原型、内审、评审里程碑；符合预期：节点准时' },
            { module: 'KPA', name: 'AI应用探索落地', indicator: 'AI应用落地', type: 'qual', weight: 20, linked: false, desc: '完成版本交付与试点；符合预期：按计划上线' }
          ]
        };
        assistant.push({
          role: 'bot',
          text: '已结合历史目标、指标库和评价规则完成本期目标生成。',
          time: HroneAiForm.now(),
          result: fillResult('本期目标已生成', PENDING.goals, 'gen-goals')
        });
        return;
      }

      if (/优化目标|优化描述|衡量标准/.test(key)) {
        var optText = '1. 指标定义：覆盖需求受理、澄清、方案、内审、技术评审、研发交付、产品验收、用户验收全链路\n2. 完成标准：4 项规范全部落地，团队遵从度 ≥ 95%\n3. 验收方式：月度抽查 + 周会更新准时率\n4. 符合预期：按规范执行且无重大遗漏';
        PENDING = { kind: 'opt-desc', text: optText };
        assistant.push({
          role: 'bot',
          text: '已完成目标描述优化任务。',
          time: HroneAiForm.now(),
          result: {
            title: '描述优化完成',
            tag: '可写入表单',
            tagTone: 'em',
            groups: [{
              title: 'KPA',
              meta: '1 项目标',
              goals: [{
                title: 'HRAS产品管理规范',
                badges: ['定性'],
                fields: [
                  { k: '名称', v: 'HRAS产品管理规范' },
                  { k: '衡量标准', v: optText }
                ]
              }]
            }],
            applyId: 'opt-desc',
            applyLabel: '写入表单'
          }
        });
        return;
      }

      if (/检查|SMART|上级目标|填写检查/.test(key)) {
        assistant.push({
          role: 'bot',
          text: '目标填写检查完成（检查结果只在对话中汇总，不改正式字段）。',
          time: HroneAiForm.now(),
          result: {
            title: '填写检查结果',
            tag: '需关注',
            tagTone: 'ac',
            summary: '已检查定性目标 SMART，以及与上级目标相关性（上级目标仅供 AI 辅助，不在表单展示）。',
            stats: ['SMART 不足 2 项', '相关度：中'],
            items: [
              '「日常滚动需求响应」缺少可量化验收标准',
              '「产品管理规范」与上级「组织效能提升」相关，但未写清承接关系',
              '定量目标梯度完整，评价规则提示已覆盖'
            ],
            applyId: 'check-jump',
            applyLabel: '在表单中定位',
            actions: [{ id: '优化目标描述', label: '去优化描述' }]
          }
        });
        return;
      }

      assistant.push({
        role: 'bot',
        text: '已理解你的指令。你可以继续：上传文件生成目标、优化描述，或做填写检查。',
        time: HroneAiForm.now(),
        actions: ['帮我生成本期目标', '优化目标描述', '目标填写检查']
      });
    });
  }

  // remove legacy AI DOM if present from old inline markup
  // HroneAiForm.create already mounts fresh panel; strip duplicates
  var chats = document.querySelectorAll('.ai-chat');
  if (chats.length > 1) {
    for (var i = 0; i < chats.length - 1; i++) chats[i].remove();
  }
  var toggles = document.querySelectorAll('.ai-toggle');
  if (toggles.length > 1) {
    for (var j = 0; j < toggles.length - 1; j++) toggles[j].remove();
  }
})();
