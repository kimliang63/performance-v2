# 后端处理逻辑规格

> 版本 v2 | 2026-06-27 | 基于系统架构讨论确认 + V2 PRD 补全

---

## 一、架构原则

| 原则 | 说明 |
|------|------|
| 前端纯展示 | 前端不含任何业务逻辑，只渲染表单 + 收集用户输入 |
| 无保存草稿 | 只有 submit 接口，无 save 接口 |
| 一个原子操作 | submit = A校验 → B计算 → C存储 → D提交流程 |
| 业务层 vs 流程引擎 | A/B/C 是绩效业务层，D 才交给流程引擎 |
| AI Agent 兼容 | Agent 调用同一个 submit 接口，传原始输入即可 |

---

## 二、submit 接口通用流程

```
前端/Agent 传原始输入
      ↓
A. 校验（必填/格式/业务规则）
      ↓ 校验失败 → 返回错误，不往下走
B. 计算（按环节类型决定是否计算）
      ↓
C. 存储（新增一行明细记录）
      ↓
D. 提交流程（调用流程引擎 API → 推进节点 → 分配下一待办）
```

### 各环节的 B 计算步骤差异

| 环节 | B 计算内容 |
|------|-----------|
| 目标制定 | 无计算（纯数据录入） |
| 绩效考核 | 指标得分（calc_rule.formula） + 总分（层级2公式） + 等级映射 |
| 结果审定 | 无计算（只调整等级） + 强制分布计数更新 |
| 绩效面谈 | 无计算（纯数据录入） |
| 结果确认 | 无计算（纯操作） |

---

## 三、计算引擎

### 3.1 两层级公式

| 层级 | 配置什么 | 字段来源 | 触发时机 |
|------|---------|---------|---------|
| 层级1：指标得分 | 每个指标的评分公式 | 该指标的衡量标准 grades + 表单字段 | submit Step B（考核环节） |
| 层级2：总分汇总 | 总分计算公式 | 各指标得分 + 权重 + 加减分 | submit Step B（直接上级节点） |

### 3.2 公式编辑器字段注册

- **来源**：配置层 indicator → FK → measure_standard → grades
- **时机**：COE 配指标时（先于表单，不依赖表单数据）
- **机制**：grades 数组中的字段注册为公式变量（challenge_value/target_value/baseline_value...）

### 3.3 指标得分计算流程

```
submit Step B（考核环节）:
  遍历该员工的每个指标:
    1. 读取 indicator.FK → calc_rule → formula
    2. 读取 indicator.FK → measure_standard → grades
    3. 组装公式变量: { actual_value, challenge_value, target_value, baseline_value, ... }
    4. 执行 formula → 返回指标得分
  所有指标得分算完
```

### 3.4 最终得分计算（直接上级节点）

```
submit Step B（直接上级节点）:
  1. 层级1: 各节点表单总分（已由各节点算出）
  2. 层级2: 最终得分 = Σ(各节点表单总分 × 方案配置的节点权重 / 100)
  3. 最终得分映射到等级（查 grade_rule）
```

**注意**：等级仅用于展示和强制分布，不参与任何计算。等级映射在最终得分算出后执行。

### 3.5 最终得分计算（节点权重）

```
if 节点权重已配置:
    最终得分 = Σ(各节点表单总分 × 节点权重) / Σ(节点权重)
else:
    最终得分 = 最后一个填写节点的表单总分（BR-034）
```

### 3.6 强制分布实时计算

- **触发时机**：审定环节每次 submit 后立即重算
- **分母**：考核组参与考核的总人数（含跳过审定+含未审定）
- **分子**：该等级当前 active 行数
- **并发控制**：乐观锁（version 字段）或行级锁

---

## 四、数据存储模式

### 4.1 追加式（4个环节）

| 环节 | 模式 | 每次 submit |
|------|------|------------|
| 目标制定 | 每人多行 | 新增一行 goal_detail（员工行/上级行） |
| 绩效考核 | 每人多行 | 新增一行 eval_detail（自评/间接/直接） |
| 结果审定 | 每人多行 | 新增一行 ratification_detail（各级处理人） |
| 绩效面谈 | 每人多行 | 新增一行 interview_detail（员工行/上级行） |

**规则**：
- 新增行 status=active
- 驳回重提：旧行 status=voided，新行 status=active
- 查询取 active 最新行 = 当前数据
- voided 行保留 = 历史可追溯

### 4.2 状态驱动（确认环节）

| 环节 | 模式 | 说明 |
|------|------|------|
| 结果确认 | 每人一行 | 员工只有一次操作（同意/不同意），终态不可逆 |

### 4.3 关键字段

| 表 | 字段 | 说明 |
|----|------|------|
| goal_detail | ref_detail_id | 上级审批行 → 指向被审批的员工行 |
| interview_detail | ref_detail_id | 上级审批行 → 指向被审批的员工行 |
| eval_detail | ref_detail_id | 可选，驳回重提时指向被驳回的行 |
| 所有明细表 | submitter_role | 处理人角色（employee/indirect/direct/hrbp） |
| 所有明细表 | status | active/voided |
| 所有明细表 | submitted_at | 提交时间 |

### 4.4 score_data JSON 结构（考核明细表）

```json
{
  "indicator_scores": [
    {
      "indicator_id": "KPI_001",
      "indicator_name": "季度营收达成率",
      "actual_value": 115,
      "weight": 60,
      "grades_ref": {"challenge": 120, "target": 100, "baseline": 80},
      "calc_rule_id": "CR_001",
      "formula": "IF(actual>challenge,120,...)",
      "score": 115.0
    }
  ],
  "bonus": 5,
  "penalty": 0
}
```

---

## 五、各环节 submit 详细流程

### 5.1 目标制定

```
员工 submit:
  A. 校验: 目标数≥2, 总权重=100%, 必填字段完整
  B. 计算: 无
  C. 存储: 新增 goal_detail (submitter_role=employee, status=active)
  D. 流程: 生成间接上级审批待办

间接/直接上级 submit:
  A. 校验: 无（只读审批）
  B. 计算: 无
  C. 存储: 新增 goal_detail (submitter_role=direct, ref_detail_id=被审批行ID, approval_action=approve/reject)
  D. 流程: 推进到下一节点 / 驳回到员工

驳回重提:
  员工 submit → 新增行(active)，之前被驳回的行(voided)
  上级重新审批 → ref_detail_id 指向新行
```

### 5.2 绩效考核

```
自评 submit:
  A. 校验: 完成值+评价结果必填
  B. 计算:
    → 遍历每个指标:
      定量指标: calc_rule.formula(actual_value, grades) → 指标得分
      定性指标: eval_rule.grades[选择的等级].score → 指标得分
    → 单表单总分 = Σ(指标得分 × 指标权重 / 100) + 加分 - 减分
  C. 存储: 新增 eval_detail (submitter_role=self, status=active, score_data, total_score=单表单总分)
  D. 流程: 生成间接上级评分待办

间接上级 submit:
  A. 校验: 评价结果必填
  B. 计算:
    → 遍历每个指标:
      定量指标: calc_rule.formula(员工填的actual_value, grades) → 指标得分
      定性指标: eval_rule.grades[间接上级选择的等级].score → 指标得分（基于间接上级的评价重新计算）
    → 单表单总分 = Σ(指标得分 × 指标权重 / 100) + 加分 - 减分
  C. 存储: 新增 eval_detail (submitter_role=indirect, status=active, score_data, total_score=单表单总分)
  D. 流程: 推进到直接上级

间接上级/直接上级 reject:
  该员工所有 active 行全部 voided
  流程回到 self_scoring
  员工修改后 submit → 全流程重来

直接上级 submit:
  A. 校验: 总评价结果必填
  B. 计算:
    → 同上计算各指标得分 + 单表单总分
    → 层级2: 最终得分 = Σ(各节点表单总分 × 方案配置的节点权重 / 100)
    → 最终得分映射到等级（查 grade_rule）
  C. 存储: 新增 eval_detail (submitter_role=direct, total_score=最终得分, total_eval_result=等级)
  D. 流程: 考核完成 → 触发结果审定
```

### 5.3 结果审定

```
各级上级 submit:
  A. 校验: 调整后等级必填 + 强制分布强控校验
  B. 计算: 无（只调整等级）
  C. 存储: 更新强制分布计数(原子操作) + 新增 ratification_detail
  D. 流程: 推进到下一节点

间接上级/逐级上级 reject:
  当前行 voided + 强制分布计数回滚
  流程回到直接上级 → 直接上级重新 submit

逐级上级到达停止人员:
  审定完成 → 触发面谈+确认环节

HRBP reject:
  当前 HRBP 行 voided + 强制分布计数回滚
  回到直接上级 → 直接上级重新 submit
```

### 5.4 绩效面谈

```
员工 submit:
  A. 校验: 面谈类型必填, 亮点≥3项, 不足≥3项, 需求≥1项
  B. 计算: 无
  C. 存储: 新增 interview_detail (submitter_role=employee, status=active)
  D. 流程: 生成上级审批待办

上级 submit:
  A. 校验: 上级评语必填
  B. 计算: 无
  C. 存储: 新增 interview_detail (submitter_role=direct, ref_detail_id=被审批行ID)
  D. 流程: 面谈完成

上级 reject:
  员工 submit → 新增行(active)，旧行(voided)
  上级重新审批
```

### 5.5 结果确认

```
员工 submit:
  A. 校验: 必须选择同意或不同意
  B. 计算: 无
  C. 存储: 确认结果写入 confirmation
  D. 流程: 同意→结束→写入 final_result; 不同意→HRBP知悉待办

超时自动确认:
  系统定时任务调用 submit (action=agree, operator=system)
```

---

## 六、逆向场景处理

### 6.1 目标驳回
- 间接/直接上级 reject → 新增审批行(approval_action=reject)
- 员工 submit → 新增行(active)，旧行(voided)
- 上级重新审批 → ref_detail_id 指向新行

### 6.2 绩效考核驳回（已确认方案B）
- 间接/直接上级 reject → 该员工所有 active 行全部 voided
- 员工修改完成值 → submit → 新增行 → 间接上级重新评分 → 直接上级重新评分
- 全部重来（完成值变了，旧评分失效）

### 6.3 审定驳回
- 间接/逐级上级 reject → 当前行 voided + 强制分布计数回滚 → 回到直接上级
- HRBP reject → 当前行 voided + 强制分布计数回滚 → 回到直接上级
- 直接上级重新 submit → 新增行 → 重新进入逐级审定流程

### 6.4 面谈驳回
- 上级 reject → 员工 submit → 新增行(active)，旧行(voided)

### 6.5 员工确认不同意
- 员工 submit(action=disagree) → HRBP 知悉待办
- HRBP submit(action=ack) → 流程结束，结果锁定（线下处理）

### 6.6 流程超时
- 目标/考核/面谈超时 → 按方案配置的 forced_end_grade 处理
- 确认超时 → 系统调用 submit(action=agree)

### 6.7 方案停用
- 方案停用不影响已发起的活动（BR-052）
- 活动引用 scheme_snapshot（配置快照）

---

## 七、数据级联规则

| 上游环节 | 下游环节 | 级联数据 | 级联时机 |
|----------|----------|----------|----------|
| 目标制定 approved | 绩效考核 | 目标数据（只读引用） | 目标审批通过时 |
| 绩效考核 completed | 结果审定 | 考核结果（只读引用） | 考核完成时 |
| 结果审定 completed | 结果确认 | 审定结果（只读引用） | 审定完成时 |
| 绩效面谈 completed | 结果确认 | 面谈数据（实时引用，BR-023） | 面谈完成时 |

---

## 八、方案保存行为

### 8.1 三种保存模式

| 模式 | 触发方式 | 接口 | 校验范围 | 数据处理 |
|------|---------|------|---------|---------|
| 系统自动暂存 | 切换步骤/上一步/下一步 | POST /api/schemes/:id/auto-save | 不校验 | 仅保存当前步骤已填内容，状态保持 draft |
| 保存草稿 | 点击"保存草稿"按钮 | POST /api/schemes/:id/draft | 不校验 | 保存当前步骤已填内容，其他步骤不变，状态保持 draft |
| 提交保存 | 点击"提交"按钮 | PUT /api/schemes/:id | 全量校验 | 校验全部已开启步骤必填项，通过后保存全部配置，版本号+1 |

### 8.2 自动暂存实现

- 前端在步骤切换时 debounce 300ms 后调用 auto-save 接口
- 后端收到后直接写入当前步骤对应的配置表，不触发版本号变更
- 草稿状态下可无限次暂存，不产生版本历史

### 8.3 提交保存流程

```
前端调用 PUT /api/schemes/:id
  → 后端校验所有已开启步骤的必填项
    → 校验失败：返回 422 + 校验失败明细（步骤名/校验项/错误原因）
    → 校验通过：
      1. 更新 perf_scheme 表（版本号+1）
      2. 同步更新 perf_assessment_group / perf_stage_config
      3. 触发 trg_scheme_version_insert 写入版本历史快照
      4. 返回成功
```

### 8.4 启用校验

从草稿→已启用时，除提交保存的全量校验外，额外校验：
- 至少 1 个考核组
- 至少 1 个环节开启且已关联流程模板
- 方案名称不重复（同语种）

---

## 九、通知配置存储

### 9.1 通知配置结构

通知配置存储在 `perf_stage_config` 表的 JSON 字段中：

```json
{
  "notification": {
    "todo_notification": {
      "enabled": true,
      "channels": ["internal", "feishu", "email", "sms"]
    },
    "cc_notification": {
      "enabled": true,
      "channels": ["internal", "feishu"]
    }
  }
}
```

### 9.2 通知类型

| 类型 | config_key | 说明 |
|------|-----------|------|
| 待办处理 | todo_notification | 环节流转到处理人时触发 |
| 抄送通知 | cc_notification | 环节完成时通知相关人 |

### 9.3 通知渠道

| 渠道 | 标识 | 说明 |
|------|------|------|
| 站内信 | internal | 系统内消息中心 |
| 飞书 | feishu | 飞书机器人推送 |
| 邮件 | email | 邮件通知 |
| 短信 | sms | 短信通知 |

### 9.4 通知模板

通知模板由消息通知功能模块预置，绩效模块通过模板编码引用。活动实例化时，通知配置从方案 copy 到活动快照，活动级可修改。

---

## 十、API 接口清单（变更）

| 变更 | 说明 |
|------|------|
| 移除 save 接口 | goal/evaluation/interview 的 save 端点全部移除 |
| 考核 submit 增加 reject | action=submit / reject，reject 除发起人外任意节点可用 |
| 确认超时走 submit | auto-confirm 调用同一个 submit 接口 |
| API 总数 | 40 → 37（移除3个save） |

---

## 十一、待确认项

| 序号 | 问题 | 影响 | 状态 |
|------|------|------|------|
| 1 | 目标制定环节，空审批人跳过后，目标数据是否直接 approved？ | 目标状态机 | 待确认 |
| 2 | 考核环节间接上级驳回后，直接上级之前的评分是否需要保留作废？ | 已确认全部作废 | ✅ |
| 3 | 审定环节跳过审定的员工，其强制分布等级来源 | 方案配置的固定等级（BR-014） | ✅ |
| 4 | 面谈数据引用到确认表单，月度考核无面谈环节时确认表如何展示 | 确认表单面谈字段无数据传入即隐藏 | ✅ |
