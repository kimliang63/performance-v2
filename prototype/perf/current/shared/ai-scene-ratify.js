/**
 * V6 · 结果审定 AI 场景
 * 依赖：MEMBERS / DIST_RULES / currentGroup / renderMembers / showToast / GRADE_OPTIONS
 */
(function () {
  if (!window.HroneAiForm) return;
  if (typeof getFilteredMembers !== 'function' && typeof MEMBERS === 'undefined') return;

  function filtered() {
    if (typeof getFilteredMembers === 'function') return getFilteredMembers();
    return MEMBERS || [];
  }

  function applyBatch(preferGrade) {
    var list = filtered();
    var applied = 0;
    list.forEach(function (m, idx) {
      if (!m.reached) return;
      var key = m.id != null ? m.id : idx;
      if (preferGrade && preferGrade[key]) {
        m.ratifyGrade = preferGrade[key];
        applied++;
      } else if (!m.ratifyGrade) {
        m.ratifyGrade = m.grade;
        applied++;
      }
    });
    if (typeof renderMembers === 'function') renderMembers();
    showToast('已将审定等级写入表单（' + applied + ' 人）', 'success');
    var rows = document.querySelectorAll('tbody tr, .member-row');
    HroneAiForm.flash(Array.prototype.slice.call(rows, 0, 8));
    ai.push({
      role: 'bot',
      text: '已把审定调整等级写入左侧名单。请核对后提交。',
      time: HroneAiForm.now()
    });
  }

  function pendingPeople(list) {
    return list.filter(function (m) { return m.reached && !m.ratifyGrade; });
  }

  function personCard(m) {
    var suggest = m.ratifyGrade || m.grade;
    return {
      title: m.name,
      badges: [m.grade, '建议 ' + suggest],
      fields: [
        { k: '姓名', v: m.name },
        { k: '部门', v: m.dept || '-' },
        { k: '岗位', v: m.role || '-' },
        { k: '得分', v: String(m.totalScore) },
        { k: '初评等级', v: m.grade },
        { k: '建议审定', v: suggest }
      ]
    };
  }

  function peopleGroups(people) {
    var map = {};
    people.forEach(function (m) {
      var g = m.group || '未分组';
      if (!map[g]) map[g] = [];
      map[g].push(m);
    });
    return Object.keys(map).sort().map(function (g) {
      var rows = map[g].slice().sort(function (a, b) { return b.totalScore - a.totalScore; });
      return {
        title: g,
        meta: rows.length + ' 人',
        goals: rows.map(personCard)
      };
    });
  }

  function distGroups(list, rules) {
    var filled = list.filter(function (m) { return m.reached && m.ratifyGrade; });
    var denom = filled.length || list.filter(function (m) { return m.reached; }).length || 1;
    return [{
      title: currentGroup || '强制分布',
      meta: '已填 ' + filled.length + ' 人',
      goals: (rules || []).map(function (r) {
        var count = filled.filter(function (m) { return m.ratifyGrade === r.grade; }).length;
        var target = Math.ceil(denom * r.pct / 100);
        return {
          title: r.grade,
          badges: [count + ' 人', '目标约 ' + target],
          fields: [
            { k: '等级', v: r.grade },
            { k: '人数', v: String(count) },
            { k: '目标占比', v: r.pct + '%' },
            { k: '目标人数', v: String(target) }
          ]
        };
      })
    }];
  }

  function analysisGroups(list) {
    var reached = list.filter(function (m) { return m.reached; }).slice().sort(function (a, b) { return a.totalScore - b.totalScore; });
    var low = reached.slice(0, 3);
    var high = reached.slice(-3).reverse();
    return [
      {
        title: '需关注',
        meta: low.length + ' 人',
        goals: low.map(function (m) {
          return {
            title: m.name,
            badges: [m.grade, m.totalScore + ' 分'],
            fields: [
              { k: '姓名', v: m.name },
              { k: '得分', v: String(m.totalScore) },
              { k: '初评等级', v: m.grade },
              { k: '建议', v: '关注绩效改进计划' }
            ]
          };
        })
      },
      {
        title: '表现突出',
        meta: high.length + ' 人',
        goals: high.map(function (m) {
          return {
            title: m.name,
            badges: [m.grade, m.totalScore + ' 分'],
            fields: [
              { k: '姓名', v: m.name },
              { k: '得分', v: String(m.totalScore) },
              { k: '初评等级', v: m.grade },
              { k: '建议', v: '确认是否维持超出预期' }
            ]
          };
        })
      }
    ];
  }

  var ai = HroneAiForm.create({
    title: 'AI 审定助手',
    subtitle: '等级分配 · 强制分布 · 探索分析',
    placeholder: '输入「帮我审定结果」或描述关注的人或等级…',
    greeting: '你好，我是结果审定助手。\n\n可生成审定等级建议、分布校验和探索分析；确认后写入左侧名单。',
    shortcuts: [
      { id: '帮我审定结果', icon: '审', label: '帮我审定结果' },
      { id: '探索式分析结果', icon: '析', label: '探索式分析结果' },
      { id: '校验强制分布', icon: '布', label: '校验强制分布' }
    ],
    onAction: function (a, asst) { handle(a, asst); },
    onSend: function (t, asst) { handle(t, asst); },
    onFiles: function (files, list, asst) {
      asst.withBusy(function () {
        asst.push({
          role: 'bot',
          text: '已记录上传文件作为补充证据。建议继续「帮我审定结果」生成等级调整。',
          time: HroneAiForm.now(),
          files: list.map(function (f) { return { name: f.name, size: f.size, status: 'parsed' }; }),
          actions: ['帮我审定结果', '探索式分析结果']
        });
      });
    },
    onApply: function (id) {
      if (id === 'batch') applyBatch();
      if (id === 'batch-fix') {
        var list = filtered();
        var map = {};
        list.forEach(function (m, idx) {
          if (m.reached) map[m.id != null ? m.id : idx] = m.ratifyGrade || m.grade;
        });
        applyBatch(map);
      }
    }
  });

  function handle(action, asst) {
    var key = String(action || '');
    var list = filtered();
    var reached = list.filter(function (m) { return m.reached; }).length;
    var pending = pendingPeople(list);
    var rules = (typeof DIST_RULES !== 'undefined' && DIST_RULES[currentGroup]) ? DIST_RULES[currentGroup] : (DIST_RULES && DIST_RULES['全部']) || [];

    asst.withBusy(function () {
      if (/探索|分析/.test(key) && !/强制分布|校验/.test(key)) {
        asst.push({
          role: 'bot',
          text: '探索式分析结果。',
          time: HroneAiForm.now(),
          result: {
            title: '探索式分析',
            tag: '只读总结',
            tagTone: 'em',
            groups: analysisGroups(list),
            actions: [{ id: '帮我审定结果', label: '生成审定建议', primary: true }]
          }
        });
        return;
      }

      if (/强制分布|校验/.test(key)) {
        if (pending.length > 0) {
          asst.push({
            role: 'bot',
            text: '强制分布校验尚未完成。',
            time: HroneAiForm.now(),
            result: {
              title: '分布校验',
              tag: '未完成',
              tagTone: 'ac',
              groups: peopleGroups(pending),
              applyId: 'batch',
              applyLabel: '先填入建议等级',
              actions: ['帮我审定结果']
            }
          });
          return;
        }
        asst.push({
          role: 'bot',
          text: '强制分布校验完成。',
          time: HroneAiForm.now(),
          result: {
            title: '分布校验通过',
            tag: '合规',
            tagTone: 'em',
            groups: distGroups(list, rules)
          }
        });
        return;
      }

      if (/审定|分配|调整|帮我/.test(key)) {
        var targets = pending.length ? pending : list.filter(function (m) { return m.reached; });
        asst.push({
          role: 'bot',
          text: '已按得分、初评等级与强制分布规则生成审定建议。',
          time: HroneAiForm.now(),
          result: {
            title: '审定结果建议',
            tag: '待填入表单',
            tagTone: 'pr',
            groups: peopleGroups(targets),
            applyId: 'batch',
            applyLabel: '填入表单',
            actions: ['探索式分析结果', '校验强制分布']
          }
        });
        return;
      }

      asst.push({
        role: 'bot',
        text: '可继续：帮我审定结果、探索式分析，或校验强制分布。',
        time: HroneAiForm.now(),
        actions: ['帮我审定结果', '探索式分析结果', '校验强制分布']
      });
    });
  }
})();
