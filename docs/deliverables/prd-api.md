# API 定义

> 版本 v3 | 基于字段清单 + 状态机 + 业务规则

---

## 目录

1. [Scheme API（绩效方案）](#1-scheme-api绩效方案)
2. [PBC Goal API（目标制定）](#2-pbc-goal-api目标制定)
3. [Evaluation API（绩效考核）](#3-evaluation-api绩效考核)
4. [Ratification API（结果审定）](#4-ratification-api结果审定)
5. [Confirmation API（员工确认）](#5-confirmation-api员工确认)
6. [Interview API（绩效面谈）](#6-interview-api绩效面谈)
7. [Shared API（共享接口）](#7-shared-api共享接口)
8. [错误码目录](#8-错误码目录)

---

## 1. Scheme API（绩效方案）

### 1.1 GET /api/schemes — 方案列表

**描述**：获取绩效方案列表，支持筛选和分页。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `search` | string | 否 | 按名称/编号模糊搜索 |
| `cycle` | enum | 否 | 月度/半年度/年度/自定义 |
| `status` | enum | 否 | enabled/disabled/draft |
| `page` | number | 否 | 页码，默认 1 |
| `pageSize` | number | 否 | 每页条数，默认 20 |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `total` | number | 总数 |
| `items` | Scheme[] | 方案数组 |

**Scheme 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 方案 ID |
| `name` | string | 方案名称 |
| `code` | string | 方案编号 |
| `cycle` | string | 周期类型 |
| `status` | enum | enabled/disabled/draft |
| `activities` | number | 关联活动数 |
| `progress` | number | 配置进度百分比 |
| `creator` | string | 创建人 |
| `modified` | string | 最近修改时间 |

**所需权限**：scheme:list

---

### 1.2 POST /api/schemes — 创建方案

**描述**：创建新的绩效方案（草稿状态）。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 方案名称 |
| `cycle` | enum | 是 | 月度/半年度/年度/自定义 |
| `dept` | string | 是 | 适用部门 |
| `downward` | boolean | 是 | 是否向下公开 |
| `desc` | string | 否 | 规则描述 |
| `gradeRule` | string | 是 | 引用的等级规则名称 |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 新方案 ID |
| `code` | string | 自动生成的编号 |

**所需权限**：scheme:create

---

### 1.3 PUT /api/schemes/:id — 更新方案

**描述**：更新方案基本信息。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 否 | 方案名称 |
| `cycle` | enum | 否 | 周期类型 |
| `dept` | string | 否 | 适用部门 |
| `downward` | boolean | 否 | 是否向下公开 |
| `desc` | string | 否 | 规则描述 |
| `gradeRule` | string | 否 | 等级规则名称 |
| `groups` | Group[] | 否 | 考核组配置 |
| `stages` | Stage[] | 否 | 考核环节配置 |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `success` | boolean | 操作结果 |

**所需权限**：scheme:update

---

### 1.4 DELETE /api/schemes/:id — 删除方案

**描述**：删除方案。仅草稿状态可删除。

**校验规则**

| 校验项 | 规则 | 错误码 |
|--------|------|--------|
| 状态 | 必须为 draft | 3001 |

**所需权限**：scheme:delete

---

### 1.5 POST /api/schemes/:id/copy — 复制方案

**描述**：复制方案为新方案。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 新方案名称 |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 新方案 ID |

**所需权限**：scheme:create

---

### 1.6 PUT /api/schemes/:id/toggle — 启用/停用方案

**描述**：切换方案启用状态。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `enabled` | boolean | 是 | true=启用, false=停用 |

**校验规则**

| 校验项 | 规则 | 错误码 |
|--------|------|--------|
| 启用条件 | 必须有名称+至少1个考核组+至少1个环节 | 3002 |

**所需权限**：scheme:update

---

### 1.7 GET /api/schemes/:id — 方案详情

**描述**：获取方案完整配置（只读）。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 方案名称 |
| `code` | string | 方案编号 |
| `cycle` | string | 周期类型 |
| `enabled` | boolean | 启用状态 |
| `downward` | boolean | 向下公开 |
| `desc` | string | 描述 |
| `creator` | string | 创建人 |
| `created` | string | 创建时间 |
| `modified` | string | 最近修改时间 |
| `grades` | Grade[] | 等级列表 |
| `groups` | Group[] | 考核组列表 |
| `stages` | Stage[] | 考核环节列表 |

**所需权限**：scheme:read

---

## 2. PBC Goal API（目标制定）

### 2.1 GET /api/goals/:activityId/:employeeId — 获取目标

**描述**：获取员工的目标制定表单数据。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `status` | enum | 状态机当前状态 |
| `basicInfo` | object | 基本信息（只读） |
| `modules` | Module[] | 模块列表 |
| `totalWeight` | number | 总权重（前端计算） |
| `totalScore` | number | 总分（前端计算） |

**Module 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 模块 ID |
| `name` | string | 模块名称 |
| `weight` | number | 模块权重（展示用） |
| `goals` | Goal[] | 目标列表 |

**Goal 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 目标 ID |
| `name` | string | 目标名称 |
| `indicator` | string | 引用指标编码 |
| `weight` | number | 目标权重 |
| `measureType` | enum | 定量/定性 |
| `target` | number | 目标值 |
| `challenge` | number | 挑战值 |
| `baseline` | number | 保底值 |
| `score` | number | 得分（自动计算） |
| `gradeResult` | string | 定性评价结果 |
| `comment` | string | 评语 |
| `bonusPoints` | number | 加分 |
| `penaltyPoints` | number | 减分 |

**所需权限**：goal:read

---

### 2.2 POST /api/goals/:activityId/:employeeId/save — 保存草稿

**描述**：保存目标制定草稿（不触发流程）。

**请求 Schema**：同 GET 响应的 `modules` 字段。

**所需权限**：goal:update

---

### 2.3 POST /api/goals/:activityId/:employeeId/submit — 提交目标

**描述**：提交目标（触发审批流程）。

**请求 Schema**：同保存草稿。

**校验规则**

| 校验项 | 规则 | 错误码 |
|--------|------|--------|
| 目标数量 | ≥ 2 | 2001 |
| 总权重 | = 100% | 2002 |
| 必填字段 | 目标名称+权重+衡量标准 | 2003 |

**状态转换**：`goal_setting` → `pending_indirect_approval`

**所需权限**：goal:submit

---

### 2.4 POST /api/goals/:activityId/:employeeId/goals — 新增目标

**描述**：在指定模块下新增目标。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `moduleId` | string | 是 | 模块 ID |
| `name` | string | 是 | 目标名称 |
| `indicator` | string | 否 | 引用指标编码 |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 新目标 ID |

**所需权限**：goal:update

---

### 2.5 PUT /api/goals/:activityId/:employeeId/goals/:goalId — 更新目标

**描述**：更新目标字段。

**请求 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 目标名称 |
| `weight` | number | 权重 |
| `measureType` | enum | 定量/定性 |
| `target` | number | 目标值 |
| `challenge` | number | 挑战值 |
| `baseline` | number | 保底值 |
| `gradeResult` | string | 定性评价结果 |
| `comment` | string | 评语 |
| `bonusPoints` | number | 加分 |
| `penaltyPoints` | number | 减分 |

**所需权限**：goal:update

---

### 2.6 DELETE /api/goals/:activityId/:employeeId/goals/:goalId — 删除目标

**描述**：删除目标。模块至少保留 1 个目标。

**校验规则**

| 校验项 | 规则 | 错误码 |
|--------|------|--------|
| 模块目标数 | 删除后模块内至少 1 个目标 | 2004 |

**所需权限**：goal:update

---

### 2.7 POST /api/goals/:activityId/import — 批量导入目标

**描述**：HRBP 批量导入员工目标。

**请求 Schema**：multipart/form-data

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `file` | file | 是 | Excel 文件 |
| `templateId` | string | 否 | 导入模板 ID |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `success` | number | 成功条数 |
| `failed` | number | 失败条数 |
| `errors` | ErrorRow[] | 失败明细 |

**ErrorRow 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `row` | number | 行号 |
| `field` | string | 字段名 |
| `message` | string | 错误原因 |

**状态转换**：`not_started` → `goal_import`

**所需权限**：goal:import

---

### 2.8 POST /api/goals/:activityId/:employeeId/approve — 审批目标

**描述**：审批人审批目标。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `action` | enum | 是 | approve/reject |
| `comment` | string | 否 | 审批意见 |

**状态转换**

| 当前状态 | action | 目标状态 |
|----------|--------|----------|
| `pending_indirect_approval` | approve | `pending_direct_approval` |
| `pending_indirect_approval` | reject | `rejected` |
| `pending_direct_approval` | approve | `approved` |
| `pending_direct_approval` | reject | `rejected` |

**所需权限**：goal:approve

---

### 2.9 GET /api/goals/:activityId/:employeeId/history — 目标历史

**描述**：获取目标制定的操作历史。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `items` | HistoryItem[] | 操作记录列表 |

**HistoryItem 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `operator` | string | 操作人 |
| `action` | string | 操作类型 |
| `time` | string | 操作时间 |
| `comment` | string | 操作说明 |

**所需权限**：goal:read

---

## 3. Evaluation API（绩效考核）

### 3.1 GET /api/evaluations/:activityId/:employeeId — 获取考核表单

**描述**：获取绩效考核表单数据。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `status` | enum | 状态机当前状态 |
| `basicInfo` | object | 基本信息（只读） |
| `goals` | GoalRef[] | 引用的目标（只读） |
| `modules` | EvalModule[] | 考核模块 |
| `totalEvalResult` | string | 总评价结果（直接上级可编辑） |
| `totalComment` | string | 总评语（直接上级可编辑） |

**GoalRef 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 目标名称 |
| `weight` | number | 权重 |
| `measureType` | enum | 定量/定性 |
| `target` | number | 目标值 |

**EvalModule 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 模块 ID |
| `name` | string | 模块名称 |
| `goals` | EvalGoal[] | 考核目标 |

**EvalGoal 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 目标 ID |
| `name` | string | 目标名称 |
| `actualValue` | number | 完成值 |
| `evalResult` | string | 评价结果 |
| `comment` | string | 评语 |

**所需权限**：evaluation:read

---

### 3.2 POST /api/evaluations/:activityId/:employeeId/save — 保存草稿

**描述**：保存考核表单草稿。

**请求 Schema**：同 GET 响应的 `modules` + `totalEvalResult` + `totalComment`。

**所需权限**：evaluation:update

---

### 3.3 POST /api/evaluations/:activityId/:employeeId/submit — 提交考核

**描述**：提交考核表单。

**校验规则**

| 校验项 | 规则 | 错误码 |
|--------|------|--------|
| 必填字段 | 完成值+评价结果（自评节点） | 2005 |
| 必填字段 | 总评价结果（直接上级节点） | 2006 |

**状态转换**：`self_scoring` → `pending_indirect_scoring`

**所需权限**：evaluation:submit

---

### 3.4 POST /api/evaluations/batch-submit — 批量提交考核

**描述**：上级批量提交多个员工的考核表单。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `activityId` | string | 是 | 活动 ID |
| `employeeIds` | string[] | 是 | 员工 ID 列表 |
| `evaluations` | EvalData[] | 是 | 各员工的考核数据 |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `success` | number | 成功条数 |
| `failed` | number | 失败条数 |
| `errors` | ErrorRow[] | 失败明细 |

**所需权限**：evaluation:submit

---

### 3.5 POST /api/evaluations/:activityId/import — 导入考核数据

**描述**：HRBP 导入线下考核评分。

**请求 Schema**：multipart/form-data

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `file` | file | 是 | Excel 文件 |

**所需权限**：evaluation:import

---

### 3.6 GET /api/evaluations/:activityId/export-template — 导出模板

**描述**：下载考核数据导入模板。

**响应**：Excel 文件下载

**所需权限**：evaluation:export

---

## 4. Ratification API（结果审定）

### 4.1 GET /api/ratifications/:activityId/:employeeId — 获取审定表单

**描述**：获取结果审定表单数据。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `status` | enum | 状态机当前状态 |
| `basicInfo` | object | 基本信息（只读） |
| `evalResult` | object | 考核结果（只读） |
| `preGrade` | string | 审定前等级（只读） |
| `preScore` | number | 审定前总分（只读） |
| `adjustedGrade` | string | 调整后等级（可编辑） |
| `distStats` | DistStats | 强制分布统计（只读） |

**DistStats 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `grades` | DistGrade[] | 各等级分布 |

**DistGrade 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `grade` | string | 等级名称 |
| `required` | number | 要求比例 |
| `current` | number | 当前比例 |
| `requiredN` | number | 要求人数 |
| `currentN` | number | 当前人数 |
| `status` | enum | ok/warn/error |

**所需权限**：ratification:read

---

### 4.2 PUT /api/ratifications/:activityId/:employeeId/adjust — 调整等级

**描述**：调整员工绩效等级。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `adjustedGrade` | string | 是 | 调整后等级 |

**校验规则**

| 校验项 | 规则 | 错误码 |
|--------|------|--------|
| 强控校验 | 调整后分布不超出强控比例 | 3003 |
| 等级有效性 | 必须在方案等级列表中 | 2007 |

**所需权限**：ratification:update

---

### 4.3 POST /api/ratifications/:activityId/:employeeId/submit — 提交审定

**描述**：提交审定结果。

**校验规则**

| 校验项 | 规则 | 错误码 |
|--------|------|--------|
| 强控校验 | 强控模式下分布不超限 | 3003 |
| 必填字段 | 调整后等级 | 2008 |

**状态转换**

| 当前状态 | 条件 | 目标状态 |
|----------|------|----------|
| `pending_direct_rate` | 弱控超限 | `pending_indirect_rate`（附警告） |
| `pending_direct_rate` | 校验通过 | `pending_indirect_rate` |
| `pending_hierarchy_rate` | grade=A | `pending_hrbp_approval` |
| `pending_hierarchy_rate` | grade≠A | `completed` |

**所需权限**：ratification:submit

---

### 4.4 GET /api/ratifications/:activityId/distribution — 分布统计

**描述**：获取当前活动的强制分布统计数据。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `totalEmployees` | number | 总人数 |
| `grades` | DistGrade[] | 各等级分布详情 |
| `isValid` | boolean | 分布是否符合要求 |

**所需权限**：ratification:read

---

### 4.5 POST /api/ratifications/:activityId/import — 导入审定数据

**描述**：HRBP 批量导入审定等级。

**请求 Schema**：multipart/form-data

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `file` | file | 是 | Excel 文件 |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `success` | number | 成功条数 |
| `failed` | number | 失败条数 |
| `errors` | ErrorRow[] | 失败明细 |

**所需权限**：ratification:import

---

## 5. Confirmation API（员工确认）

### 5.1 GET /api/confirmations/:activityId/:employeeId — 获取确认表单

**描述**：获取员工确认表单数据（全部只读）。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `status` | enum | 状态机当前状态 |
| `basicInfo` | object | 基本信息（只读） |
| `evalResult` | object | 考核结果（只读） |
| `ratificationResult` | object | 审定结果（只读） |
| `interviewResult` | object | 面谈结果（直接引用面谈表单，实时读取，年度考核时有值） |

**所需权限**：confirmation:read

---

### 5.2 POST /api/confirmations/:activityId/:employeeId/confirm — 员工确认

**描述**：员工确认绩效结果。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `action` | enum | 是 | agree/disagree |
| `comment` | string | 否 | 员工意见 |

**状态转换**

| action | 目标状态 |
|--------|----------|
| `agree` | `completed` |
| `disagree` | `pending_hrbp_ack` |

**所需权限**：confirmation:confirm

---

### 5.2.1 POST /api/confirmations/:activityId/:employeeId/auto-confirm — 超时自动确认

**描述**：员工确认环节超时，系统自动确认为"同意"。

**触发条件**：确认环节持续超过配置天数。

**状态转换**：`pending` → `completed`（自动确认）

**动作**：发送通知告知员工已自动确认。

**所需权限**：system:auto-confirm

---

### 5.3 POST /api/confirmations/:activityId/:employeeId/ack — HRBP 知悉

**描述**：HRBP 知悉员工异议。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `comment` | string | 否 | HRBP 意见 |

**状态转换**：`pending_hrbp_ack` → `completed`

**所需权限**：confirmation:ack

---

### 5.4 GET /api/confirmations/:activityId/stats — 确认统计

**描述**：获取确认环节统计数据。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `total` | number | 总人数 |
| `confirmed` | number | 已确认人数 |
| `disagreed` | number | 不同意人数 |
| `pending` | number | 待确认人数 |

**所需权限**：confirmation:read

---

## 6. Interview API（绩效面谈）

### 6.1 GET /api/interviews/:activityId/:employeeId — 获取面谈表单

**描述**：获取绩效面谈表单数据。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `status` | enum | 状态机当前状态 |
| `basicInfo` | object | 基本信息（只读） |
| `interviewType` | string | 面谈类型 |
| `highlights` | string[] | 亮点列表 |
| `shortcomings` | string[] | 不足列表 |
| `nextPlan` | string | 下阶段规划 |
| `needs` | string[] | 需求列表 |
| `attachments` | Attachment[] | 附件列表 |
| `leaderComment` | string | 上级评语（上级节点可编辑） |

**Attachment 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 附件 ID |
| `name` | string | 文件名 |
| `size` | number | 文件大小 |
| `url` | string | 下载链接 |

**所需权限**：interview:read

---

### 6.2 POST /api/interviews/:activityId/:employeeId/save — 保存草稿

**描述**：保存面谈表单草稿。

**请求 Schema**：同 GET 响应中的可编辑字段。

**所需权限**：interview:update

---

### 6.3 POST /api/interviews/:activityId/:employeeId/submit — 提交面谈

**描述**：员工提交面谈记录。

**校验规则**

| 校验项 | 规则 | 错误码 |
|--------|------|--------|
| 面谈类型 | 必填 | 2009 |
| 亮点 | ≥ 3 项 | 2010 |
| 不足 | ≥ 3 项 | 2011 |
| 下阶段规划 | 必填 | 2012 |
| 需求 | ≥ 1 项 | 2013 |

**状态转换**：`pending_employee_fill` → `pending_leader_review`

**所需权限**：interview:submit

---

### 6.4 POST /api/interviews/:activityId/:employeeId/approve — 上级审批

**描述**：直接上级审批面谈记录。

**请求 Schema**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `action` | enum | 是 | approve/reject |
| `leaderComment` | string | 是 | 上级评语 |
| `comment` | string | 否 | 审批意见 |

**状态转换**

| action | 目标状态 |
|--------|----------|
| `approve` | `completed` |
| `reject` | `pending_employee_fill` |

**所需权限**：interview:approve

---

## 7. Shared API（共享接口）

### 7.1 GET /api/indicators — 指标库

**描述**：获取指标库列表。

| 参数 | 类型 | 说明 |
|------|------|------|
| `category` | string | 指标分类筛选 |
| `search` | string | 模糊搜索 |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `items` | Indicator[] | 指标列表 |

**Indicator 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | string | 指标编码 |
| `name` | string | 指标名称 |
| `category` | string | 指标分类 |
| `measureStd` | string | 衡量标准编码 |

**所需权限**：indicator:read

---

### 7.2 GET /api/grade-rules — 等级规则

**描述**：获取等级规则列表。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `items` | GradeRule[] | 等级规则列表 |

**GradeRule 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 规则名称 |
| `grades` | Grade[] | 等级列表 |

**Grade 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 等级名称 |
| `code` | string | 等级代码 |
| `min` | number | 分数下限 |
| `max` | number | 分数上限 |

**所需权限**：grade:read

---

### 7.3 GET /api/dist-rules — 分布规则

**描述**：获取强制分布规则列表。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `items` | DistRule[] | 分布规则列表 |

**DistRule 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 规则 ID |
| `name` | string | 规则名称 |
| `type` | enum | strong/weak |
| `minHead` | number | 最少人数 |
| `groups` | string[] | 适用考核组 |
| `dist` | DistItem[] | 分布比例 |

**DistItem 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `grade` | string | 等级名称 |
| `required` | number | 要求比例 |

**所需权限**：dist:read

---

### 7.4 GET /api/report-relations — 汇报关系

**描述**：获取汇报关系树。

| 参数 | 类型 | 说明 |
|------|------|------|
| `employeeId` | string | 员工 ID（查询其汇报链） |

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `employee` | string | 员工姓名 |
| `directLeader` | string | 直接上级 |
| `indirectLeader` | string | 间接上级 |
| `hierarchy` | string[] | 逐级上级列表 |

**所需权限**：relation:read

---

### 7.5 GET /api/form-templates — 表单模板

**描述**：获取预置表单模板列表。

**响应 Schema**

| 字段 | 类型 | 说明 |
|------|------|------|
| `items` | FormTemplate[] | 表单模板列表 |

**FormTemplate 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 模板 ID |
| `name` | string | 模板名称 |
| `desc` | string | 描述 |
| `status` | enum | ready/pending |

**所需权限**：template:read

---

## 8. 错误码目录

### 1xxx — 认证与权限

| 错误码 | 说明 |
|--------|------|
| 1001 | 未登录或会话过期 |
| 1002 | 无操作权限 |
| 1003 | 资源不存在 |
| 1004 | 无访问权限 |

### 2xxx — 数据校验

| 错误码 | 说明 |
|--------|------|
| 2001 | 目标数量不足（< 2） |
| 2002 | 总权重不等于 100% |
| 2003 | 必填字段缺失 |
| 2004 | 模块内至少保留 1 个目标 |
| 2005 | 考核必填字段缺失（完成值+评价结果） |
| 2006 | 总评价结果未填写 |
| 2007 | 等级不在方案等级列表中 |
| 2008 | 调整后等级未填写 |
| 2009 | 面谈类型未填写 |
| 2010 | 亮点不足 3 项 |
| 2011 | 不足不足 3 项 |
| 2012 | 下阶段规划未填写 |
| 2013 | 需求不足 1 项 |

### 3xxx — 业务规则

| 错误码 | 说明 |
|--------|------|
| 3001 | 方案非草稿状态，不可删除 |
| 3002 | 启用条件不满足（缺少必填配置） |
| 3003 | 强制分布强控超限，提交后弹窗阻止并返回修改 |

### 4xxx — 状态机

| 错误码 | 说明 |
|--------|------|
| 4001 | 当前状态不允许此操作 |
| 4002 | 流程已结束，不可操作 |
| 4003 | 状态转换目标无效 |

### 5xxx — 系统

| 错误码 | 说明 |
|--------|------|
| 5001 | 服务器内部错误 |
| 5002 | 数据库操作失败 |
| 5003 | 文件上传失败 |
| 5004 | 文件格式不支持 |
| 5005 | 导入数据解析失败 |

---

## API 统计

| 分组 | 端点数 |
|------|--------|
| Scheme API | 7 |
| PBC Goal API | 9 |
| Evaluation API | 6 |
| Ratification API | 5 |
| Confirmation API | 4 |
| Interview API | 4 |
| Shared API | 5 |
| **合计** | **40** |
