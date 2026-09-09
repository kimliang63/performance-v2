/**
 * V6 · 上级绩效考核评分 AI 场景（直线/双线）
 * 依赖：setDirectStar 或 setIndirectStar / showToast / MODULES
 */
(function () {
  if (!window.HroneAiForm || typeof MODULES === 'undefined') return;

  var mode = (document.title || '').indexOf('双线') >= 0 ? 'indirect' : 'direct';
  var starFnName = mode === 'indirect' ? 'setIndirectStar' : 'setDirectStar';
  var starIdPrefix = mode === 'indirect' ? 'indirect_score_' : 'direct_score_';
  var evalLabel = mode === 'indirect' ? '双线上级评价' : '直线上级评价';
  var PENDING = null;

  function applyBatch() {
    var grades = PENDING && PENDING.grades;
    if (!grades) return;
    var starFn = window[starFnName];
    var gradeStars = { '低于预期': 1, '符合预期-': 2, '符合预期': 3, '符合预期+': 4, '超出预期': 5 };
    grades.forEach(function (g) {
      var value = g.starRating || gradeStars[g.grade] || 0;
      var rating = document.getElementById(starIdPrefix + g.mi + '_' + g.gi);
      var star = rating && rating.querySelector('.star[data-v="' + value + '"]');
      if (star && typeof starFn === 'function') starFn(star, g.mi, g.gi, value);
      if (rating) HroneAiForm.flash([rating.closest('tr') || rating]);
    });
    if (PENDING.comment) {
      var id = mode === 'indirect' ? 'indirectComment' : 'directComment';
      var el = document.getElementById(id) || document.querySelector('textarea[name="managerComment"], #mgrComment, #leaderComment');
      if (el) {
        el.value = PENDING.comment;
        HroneAiForm.flash([el]);
      }
    }
    showToast('已将上级评价写入表单', 'success');
    ai.push({
      role: 'bot',
      text: '已写入左侧绩效考核表单的上级评价字段。请核对后提交。',
      time: HroneAiForm.now()
    });
    PENDING = null;
  }

  function buildPending() {
    return {
      grades: [
        { mi: 1, gi: 0, grade: '符合预期+' },
        { mi: 1, gi: 1, grade: '符合预期' },
        { mi: 1, gi: 2, grade: '符合预期+' },
        { mi: 1, gi: 3, grade: '符合预期+' }
      ],
      comment: '综合员工自评与双线意见，本周期交付稳定，项目类目标完成度较好；评审类指标接近目标，建议下期继续盯紧首次通过率。'
    };
  }

  function pendingGroups(pending) {
    var byMi = {};
    (pending.grades || []).forEach(function (g) {
      if (!byMi[g.mi]) byMi[g.mi] = [];
      byMi[g.mi].push(g);
    });
    var groups = Object.keys(byMi).sort(function (a, b) { return Number(a) - Number(b); }).map(function (mi) {
      var mod = MODULES[mi];
      var rows = byMi[mi];
      return {
        title: mod ? mod.name : ('模块 ' + mi),
        meta: rows.length + ' 项目标' + (mod && mod.weight != null ? ' · 权重 ' + mod.weight + '%' : ''),
        goals: rows.map(function (g) {
          var goal = MODULES[g.mi] && MODULES[g.mi].goals[g.gi];
          var name = goal ? goal.name : ('目标 ' + g.mi + '-' + g.gi);
          var fields = [
            { k: '名称', v: name },
            { k: evalLabel, v: g.grade }
          ];
          if (goal) {
            if (goal.employeeGrade) fields.splice(1, 0, { k: '员工自评', v: goal.employeeGrade });
            if (mode === 'direct' && goal.indirectGrade) fields.splice(2, 0, { k: '双线上级评价', v: goal.indirectGrade });
            if (goal.completed) fields.splice(1, 0, { k: goal.type === 'quant' ? '完成值' : '完成情况', v: goal.completed });
          }
          return {
            title: name,
            badges: [(goal && goal.type === 'quant') ? '定量' : '定性', g.grade],
            fields: fields
          };
        })
      };
    });
    if (pending.comment) {
      groups.push({
        title: '上级评语',
        meta: '总评',
        goals: [{
          title: evalLabel + '评语',
          badges: ['总评'],
          fields: [{ k: '评语', v: pending.comment }]
        }]
      });
    }
    return groups;
  }

  function analysisGroups() {
    return [
      {
        title: 'KPI',
        meta: '3 项目标',
        goals: [
          { title: '资源利用率（通用）', badges: ['定量', '对齐'], fields: [{ k: '名称', v: '资源利用率（通用）' }, { k: '完成值', v: '108%' }, { k: '分析', v: '高于目标，依据充分' }] },
          { title: 'HRAS UAT用户验收首次通过率', badges: ['定量', '待核实'], fields: [{ k: '名称', v: 'HRAS UAT用户验收首次通过率' }, { k: '完成值', v: '97%' }, { k: '分析', v: '略低于目标，自评说明可接受' }] },
          { title: 'HRAS需求评审及时率', badges: ['定量', '待核实'], fields: [{ k: '名称', v: 'HRAS需求评审及时率' }, { k: '完成值', v: '96%' }, { k: '分析', v: '接近目标，建议维持符合预期' }] }
        ]
      },
      {
        title: 'KPA',
        meta: '关注项',
        goals: [
          { title: 'HRAS产品管理规范', badges: ['定性', '对齐'], fields: [{ k: '名称', v: 'HRAS产品管理规范' }, { k: '分析', v: '完成情况清楚，建议维持或略上调' }] }
        ]
      }
    ];
  }

  function fillResult(title, pending) {
    return {
      title: title,
      tag: '待填入表单',
      tagTone: 'pr',
      groups: pendingGroups(pending),
      applyId: 'batch',
      applyLabel: '填入表单',
      actions: [{ id: '查看自评AI分析依据', label: '查看依据' }]
    };
  }

  var ai = HroneAiForm.create({
    title: mode === 'indirect' ? 'AI 双线评分助手' : 'AI 评分助手',
    subtitle: '综合自评 · 辅助上级评价 · 可解释依据',
    placeholder: '输入「帮我填写绩效」或说明评价关注点…',
    greeting: '你好，我是绩效考核助手。\n\n可基于员工自评与参考材料生成上级评价；确认后写入左侧表单。',
    shortcuts: [
      { id: '帮我填写绩效', icon: '评', label: '帮我填写绩效' },
      { id: '查看自评AI分析依据', icon: '据', label: '查看自评AI分析依据' },
      { id: '上传文件辅助评价', icon: '文', label: '上传文件辅助评价' }
    ],
    onAction: function (a, asst) { handle(a, asst); },
    onSend: function (t, asst) { handle(t, asst); },
    onFiles: function (files, list, asst) {
      asst.withBusy(function () {
        PENDING = buildPending();
        asst.push({
          role: 'bot',
          text: '已解析参考文件，并完成上级评价建议。',
          time: HroneAiForm.now(),
          files: list.map(function (f) { return { name: f.name, size: f.size, status: 'parsed' }; }),
          result: fillResult('上级评价建议已就绪', PENDING)
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
      if (/查看自评|分析依据|依据/.test(key)) {
        asst.push({
          role: 'bot',
          text: '员工自评 AI 分析依据（只读，不改表单）。',
          time: HroneAiForm.now(),
          result: {
            title: '自评分析依据',
            tag: '只读',
            tagTone: 'em',
            groups: analysisGroups(),
            actions: [{ id: '帮我填写绩效', label: '基于依据生成评价', primary: true }]
          }
        });
        return;
      }
      if (/上传文件/.test(key)) {
        asst.push({
          role: 'bot',
          text: '请上传 word / xlsx / xls 完成情况材料，解析后给出上级评价建议。',
          time: HroneAiForm.now()
        });
        return;
      }
      if (/填写绩效|评价|评分|批量/.test(key)) {
        PENDING = buildPending();
        asst.push({
          role: 'bot',
          text: '已生成上级评价建议。',
          time: HroneAiForm.now(),
          result: fillResult('绩效考核建议完成', PENDING)
        });
        return;
      }
      asst.push({
        role: 'bot',
        text: '可继续：帮我填写绩效、查看自评分析依据，或上传文件。',
        time: HroneAiForm.now(),
        actions: ['帮我填写绩效', '查看自评AI分析依据']
      });
    });
  }
})();
