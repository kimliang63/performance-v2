/**
 * V6 · 绩效自评 AI 场景
 * 依赖：MODULES / updateCompleted / setStar / overallComment / showToast
 */
(function () {
  if (!window.HroneAiForm || typeof MODULES === 'undefined') return;

  var PENDING = null;

  function applyBatch() {
    var comments = PENDING && PENDING.rows;
    if (!comments) return;
    comments.forEach(function (c) {
      var goal = MODULES[c.mi] && MODULES[c.mi].goals[c.gi];
      if (!goal) return;
      goal.completed = c.completed;
      if (goal.type === 'qual' && c.stars) goal.stars = c.stars;
      var comp = document.getElementById('completed_' + c.mi + '_' + c.gi);
      if (comp) {
        if (goal.type === 'quant') {
          comp.value = c.completed;
          if (typeof updateCompleted === 'function') updateCompleted(c.mi, c.gi);
        } else {
          comp.value = c.completed;
          if (c.stars) {
            var rating = document.getElementById('stars_' + c.mi + '_' + c.gi);
            var starEl = rating && rating.querySelector('.star[data-v="' + c.stars + '"]');
            if (starEl && typeof setStar === 'function') setStar(starEl, c.mi, c.gi, c.stars);
          }
        }
      }
      var row = comp && comp.closest('tr');
      if (row) HroneAiForm.flash([row]);
    });
    if (PENDING.overall) {
      overallComment = PENDING.overall;
      var oc = document.getElementById('overallComment');
      if (oc) {
        oc.value = PENDING.overall;
        HroneAiForm.flash([oc]);
      }
    }
    showToast('已填入完成情况与自评到表单', 'success');
    ai.push({
      role: 'bot',
      text: '已写入左侧绩效自评表单。请核对完成值/完成情况、评价结果与自评后提交。',
      time: HroneAiForm.now()
    });
    PENDING = null;
  }

  function buildBatch() {
    return {
      rows: [
        { mi: 0, gi: 0, completed: '108', unit: '%' },
        { mi: 0, gi: 1, completed: '97', unit: '%' },
        { mi: 0, gi: 2, completed: '96', unit: '%' },
        { mi: 1, gi: 0, completed: '4项规范全部符合，团队遵从度95%以上', stars: 4, grade: '符合预期+' },
        { mi: 1, gi: 1, completed: '按时完成GOFO 6月迭代需求评审和验收', stars: 4, grade: '符合预期+' },
        { mi: 1, gi: 2, completed: '3个里程碑按时交付，无延期', stars: 5, grade: '超出预期' },
        { mi: 1, gi: 3, completed: '3个版本按时发布，1个试点应用已落地', stars: 5, grade: '超出预期' }
      ],
      overall: '本季度整体工作完成情况良好。KPI 资源利用率达标，UAT 与评审及时率接近目标；KPA 规范落地与项目里程碑按计划推进。下一季度将继续优化评审效率。'
    };
  }

  function goalCardFromRow(c) {
    var goal = MODULES[c.mi] && MODULES[c.mi].goals[c.gi];
    var name = goal ? goal.name : ('目标 ' + c.mi + '-' + c.gi);
    var isQuant = goal && goal.type === 'quant';
    var fields = [{ k: '名称', v: name }];
    if (isQuant) {
      fields.push({ k: '完成值', v: c.completed + (c.unit || goal.unit || '') });
    } else {
      fields.push({ k: '完成情况', v: c.completed });
      fields.push({ k: '评价结果', v: c.grade || '' });
    }
    return {
      title: name,
      badges: [isQuant ? '定量' : '定性'].concat(c.grade ? [c.grade] : []),
      fields: fields
    };
  }

  function batchGroups(batch) {
    var byMi = {};
    batch.rows.forEach(function (c) {
      if (!byMi[c.mi]) byMi[c.mi] = [];
      byMi[c.mi].push(c);
    });
    var groups = Object.keys(byMi).sort(function (a, b) { return Number(a) - Number(b); }).map(function (mi) {
      var mod = MODULES[mi];
      var rows = byMi[mi];
      return {
        title: mod ? mod.name : ('模块 ' + mi),
        meta: rows.length + ' 项目标' + (mod && mod.weight != null ? ' · 权重 ' + mod.weight + '%' : ''),
        goals: rows.map(goalCardFromRow)
      };
    });
    groups.push({
      title: '员工自评',
      meta: '总评',
      goals: [{
        title: '员工自评',
        badges: ['总评'],
        fields: [{ k: '自评', v: batch.overall }]
      }]
    });
    return groups;
  }

  function fillResult(title, batch, applyId) {
    return {
      title: title,
      tag: '待填入表单',
      tagTone: 'pr',
      groups: batchGroups(batch),
      applyId: applyId,
      applyLabel: '填入表单'
    };
  }

  function recommendGroups() {
    return [
      {
        title: 'KPI',
        meta: '3 项目标',
        goals: [
          { title: '资源利用率（通用）', badges: ['定量', '建议更高档'], fields: [{ k: '名称', v: '资源利用率（通用）' }, { k: '完成值', v: '108%' }, { k: '建议评价', v: '符合预期+' }] },
          { title: 'HRAS UAT用户验收首次通过率', badges: ['定量', '符合预期'], fields: [{ k: '名称', v: 'HRAS UAT用户验收首次通过率' }, { k: '完成值', v: '97%' }, { k: '建议评价', v: '符合预期' }] },
          { title: 'HRAS需求评审及时率', badges: ['定量', '符合预期'], fields: [{ k: '名称', v: 'HRAS需求评审及时率' }, { k: '完成值', v: '96%' }, { k: '建议评价', v: '符合预期' }] }
        ]
      },
      {
        title: 'KPA',
        meta: '4 项目标',
        goals: [
          { title: 'HRAS产品管理规范', badges: ['定性', '符合预期+'], fields: [{ k: '名称', v: 'HRAS产品管理规范' }, { k: '建议评价', v: '符合预期+' }] },
          { title: '日常滚动需求响应', badges: ['定性', '符合预期+'], fields: [{ k: '名称', v: '日常滚动需求响应' }, { k: '建议评价', v: '符合预期+' }] },
          { title: 'HR ONE 绩效重构事项推进', badges: ['定性', '超出预期'], fields: [{ k: '名称', v: 'HR ONE 绩效重构事项推进' }, { k: '建议评价', v: '超出预期' }] },
          { title: 'AI应用项目探索与落地推广', badges: ['定性', '超出预期'], fields: [{ k: '名称', v: 'AI应用项目探索与落地推广' }, { k: '建议评价', v: '超出预期' }] }
        ]
      }
    ];
  }

  var ai = HroneAiForm.create({
    title: 'AI 绩效助手',
    subtitle: '填写完成情况 · 推荐评价 · 生成自评',
    placeholder: '输入「帮我填写绩效」或补充完成说明…',
    greeting: '你好，我是绩效自评助手。\n\n可上传 word / xlsx / xls，或点下方场景开始；确认后写入左侧表单。',
    shortcuts: [
      { id: '帮我填写绩效', icon: '填', label: '帮我填写绩效' },
      { id: '推荐评价等级', icon: '评', label: '推荐评价等级' },
      { id: '上传文件提取完成情况', icon: '文', label: '上传文件提取完成情况' }
    ],
    onAction: function (a, asst) { handle(a, asst); },
    onSend: function (t, asst) { handle(t, asst); },
    onFiles: function (files, list, asst) {
      asst.withBusy(function () {
        PENDING = buildBatch();
        asst.push({
          role: 'bot',
          text: '已从参考文件提取本期绩效完成情况。',
          time: HroneAiForm.now(),
          files: list.map(function (f) { return { name: f.name, size: f.size, status: 'parsed' }; }),
          result: fillResult('完成情况提取完成', PENDING, 'batch')
        });
      });
    },
    onApply: function (id) {
      if (id === 'batch') applyBatch();
    }
  });

  function handle(action, asst) {
    var key = String(action || '');
    asst.withBusy(function () {
      if (/填写绩效|批量|自动填|上传文件提取/.test(key)) {
        if (/上传文件/.test(key)) {
          asst.push({
            role: 'bot',
            text: '请点击输入框左侧回形针上传 word / xlsx / xls。上传后我会提取完成情况，并给出「填入表单」。',
            time: HroneAiForm.now()
          });
          return;
        }
        PENDING = buildBatch();
        asst.push({
          role: 'bot',
          text: '已根据目标衡量标准与完成信息生成自评建议。',
          time: HroneAiForm.now(),
          result: fillResult('绩效自评建议已就绪', PENDING, 'batch')
        });
        return;
      }
      if (/推荐评价|等级/.test(key)) {
        asst.push({
          role: 'bot',
          text: '已按模块给出评价等级建议。',
          time: HroneAiForm.now(),
          result: {
            title: '推荐评价等级',
            tag: '建议',
            tagTone: 'em',
            groups: recommendGroups(),
            actions: [{ id: '帮我填写绩效', label: '生成并填入', primary: true }]
          }
        });
        return;
      }
      asst.push({
        role: 'bot',
        text: '可以继续：「帮我填写绩效」、查看推荐评价，或上传文件提取完成情况。',
        time: HroneAiForm.now(),
        actions: ['帮我填写绩效', '推荐评价等级']
      });
    });
  }
})();
