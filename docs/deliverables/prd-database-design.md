# 数据库设计规格

> 版本 v2 | 2026-06-18 | 基于配置与方案更新逻辑、活动处理逻辑确认

---

## 目录

1. [数据模型总览](#1-数据模型总览)
2. [基础配置层（V1）](#2-基础配置层v1)
3. [方案配置层（V2）](#3-方案配置层v2)
4. [活动层（V4）](#4-活动层v4)
5. [环节明细表](#5-环节明细表)
6. [结果汇总表](#6-结果汇总表)
7. [版本管理表](#7-版本管理表)
8. [配置覆盖表](#8-配置覆盖表)
9. [操作日志表](#9-操作日志表)
10. [索引设计](#10-索引设计)

---

## 1. 数据模型总览

```
┌─────────────────────────────────────────────────────────────────┐
│  基础配置层（V1）— 全局共享，COE维护                              │
│  perf_cycle / perf_unit / perf_grade_rule / perf_calc_rule       │
│  perf_measure_standard / perf_indicator / perf_eval_rule         │
│  perf_dist_rule                                                   │
└─────────────────────────────────────────────────────────────────┘
                          ↓ FK 引用（只读）
┌─────────────────────────────────────────────────────────────────┐
│  方案配置层（V2）— 模板，COE维护                                  │
│  perf_scheme → perf_assessment_group → perf_stage_config         │
└─────────────────────────────────────────────────────────────────┘
                          ↓ 快照 copy
┌─────────────────────────────────────────────────────────────────┐
│  活动层（V4）— 实例，HRBP发起                                     │
│  perf_activity → perf_activity_participant                      │
│  perf_activity_config_override（活动级覆盖）                      │
└─────────────────────────────────────────────────────────────────┘
                          ↓ 实例数据
┌─────────────────────────────────────────────────────────────────┐
│  环节明细表 — 每人每环节一行                                       │
│  goal_detail / eval_detail / ratification_detail                 │
│  interview_detail / confirmation                                 │
└─────────────────────────────────────────────────────────────────┘
                          ↓ 结果汇总
┌─────────────────────────────────────────────────────────────────┐
│  结果汇总表                                                      │
│  final_result / dist_snapshot                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 基础配置层（V1）

> **更新说明**（2026-06-26）：根据飞书需求说明书核对修正，主要变更：
> - 新增：排序码、部门、向下公开、多语言支持
> - 删除：单位表的grades字段、计算规则的type字段
> - 修正：衡量标准梯度结构、等级规则区间配置

### 2.1 perf_cycle（绩效周期）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | json | NOT NULL | 多语言名称 {zh: "", en: ""} |
| `code` | varchar(50) | UNIQUE | 周期编码（系统自动生成） |
| `type` | enum | NOT NULL | fixed_year/fixed_half_year/fixed_quarter/fixed_month/non_fixed |
| `start_year_offset` | int | | 开始年份偏移（0=本年，-1=上一年，1=下一年） |
| `start_date` | date | | 开始日期（非固定周期时为空） |
| `end_year_offset` | int | | 结束年份偏移（0=本年，-1=上一年，1=下一年） |
| `end_date` | date | | 结束日期（非固定周期时为空） |
| `sort_order` | int | NOT NULL | 排序码（正整数，升序） |
| `is_preset` | boolean | NOT NULL DEFAULT FALSE | 是否系统预置 |
| `status` | enum | NOT NULL | enabled/disabled |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**约束**：
- 名称各语种唯一
- 排序码唯一
- 固定周期必须填写开始/结束日期
- 归属年份校验：下一年 > 本年 > 上一年

### 2.2 perf_unit（单位）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | json | NOT NULL | 多语言名称 {zh: "", en: ""} |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**说明**：单位仅存储名称，用于指标的计量单位引用。被启用中的指标引用时不可删除。

### 2.3 perf_grade_rule（等级规则）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | json | NOT NULL | 多语言名称 {zh: "", en: ""} |
| `code` | varchar(50) | UNIQUE | 规则编码（系统自动生成） |
| `dept_ids` | json | NOT NULL | 适用部门ID列表 |
| `is_public` | boolean | NOT NULL DEFAULT TRUE | 是否向下公开 |
| `match_rule` | enum | NOT NULL | enabled/disabled（匹配规则启用/不启用） |
| `status` | enum | NOT NULL | enabled/disabled |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**关联表：perf_grade_rule_detail（等级明细）**

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `grade_rule_id` | bigint | FK → perf_grade_rule | 所属等级规则 |
| `grade_name` | json | NOT NULL | 多语言等级名称 |
| `left_interval_type` | enum | | included/excluded（左区间：包含/不包含） |
| `right_interval_type` | enum | | included/excluded（右区间：包含/不包含） |
| `score` | decimal(10,2) | | 分值 |
| `sort_order` | int | NOT NULL | 排序码 |

**说明**：
- 匹配规则启用时，左区间/右区间/分值必填
- 被强制分布规则、绩效方案引用时不可删除

### 2.4 perf_calc_rule（计算规则）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | json | NOT NULL | 多语言名称 {zh: "", en: ""} |
| `code` | varchar(50) | UNIQUE | 规则编码（系统自动生成） |
| `sort_order` | int | NOT NULL | 排序码（正整数，升序） |
| `dept_ids` | json | NOT NULL | 适用部门ID列表 |
| `is_public` | boolean | NOT NULL DEFAULT TRUE | 是否向下公开 |
| `formula` | text | NOT NULL | 计算公式（公式编辑器表达式） |
| `description` | json | | 多语言规则描述 |
| `status` | enum | NOT NULL | enabled/disabled |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**约束**：
- 名称各语种唯一
- 排序码唯一
- 被指标引用时不可删除

**导入校验规则**：
1. 必填项校验：名称、排序码、部门、向下公开、公式
2. 唯一性校验：同语种名称、排序码
3. 数据匹配校验：编码值、部门、向下公开
4. 重复项校验：文件内名称、排序码
5. 内容长度校验：名称≤200，描述≤500
6. 公式校验：表达式是否正确

### 2.5 perf_measure_standard（衡量标准）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | json | NOT NULL | 多语言名称 {zh: "", en: ""} |
| `code` | varchar(50) | UNIQUE | 标准编码（系统自动生成） |
| `dept_ids` | json | NOT NULL | 适用部门ID列表 |
| `standard_type` | enum | NOT NULL | fixed（固定值，预留扩展） |
| `status` | enum | NOT NULL | enabled/disabled |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**关联表：perf_measure_standard_gradient（衡量梯度）**

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `standard_id` | bigint | FK → perf_measure_standard | 所属衡量标准 |
| `gradient_name` | json | NOT NULL | 多语言梯度名称 |
| `gradient_rule` | enum | NOT NULL | integer/decimal（整数/小数） |
| `sort_order` | int | NOT NULL | 排序码 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |

**说明**：
- 梯度支持上下移动
- 被指标引用时不可删除

### 2.6 perf_indicator（指标库）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | json | NOT NULL | 多语言名称 {zh: "", en: ""} |
| `code` | varchar(50) | UNIQUE | 指标编码（系统自动生成） |
| `sort_order` | int | NOT NULL | 排序码（正整数，升序） |
| `dept_ids` | json | NOT NULL | 适用部门ID列表 |
| `is_public` | boolean | NOT NULL DEFAULT TRUE | 是否向下公开 |
| `category_id` | bigint | FK → perf_indicator_category | 指标分类 |
| `indicator_type` | enum | NOT NULL | qualitative/quantitative/add_subtract（定性/定量/加减法） |
| `indicator_nature` | enum | NOT NULL | positive/negative（正向/负向） |
| `calc_rule_id` | bigint | FK → perf_calc_rule | 计算规则 |
| `unit_id` | bigint | FK → perf_unit | 单位 |
| `value_source` | enum | | user_fill（完成值来源，默认用户填写，预留扩展） |
| `description` | json | | 多语言指标描述 |
| `status` | enum | NOT NULL | enabled/disabled |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**关联表：perf_indicator_measure_value（指标衡量值）**

> 定量指标引用衡量标准时，存储用户填写的衡量值

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `indicator_id` | bigint | FK → perf_indicator | 所属指标 |
| `gradient_id` | bigint | FK → perf_measure_standard_gradient | 衡量梯度 |
| `measure_value` | decimal(10,2) | | 衡量值 |

**说明**：
- 指标分类为树结构，支持多级
- 定性/加减法指标：衡量标准为手动输入文本
- 定量指标：引用衡量标准，存储衡量值
- 被绩效方案/考核表单引用时不可删除

### 2.7 perf_indicator_category（指标分类）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `parent_id` | bigint | | 父级分类ID（NULL=顶级） |
| `name` | json | NOT NULL | 多语言分类名称 |
| `sort_order` | int | NOT NULL | 排序码 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**说明**：
- 存在子级分类时不可删除
- 存在关联指标时不可删除

### 2.8 perf_eval_rule（评价规则）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | json | NOT NULL | 多语言名称 {zh: "", en: ""} |
| `code` | varchar(50) | UNIQUE | 规则编码（系统自动生成） |
| `dept_ids` | json | NOT NULL | 适用部门ID列表 |
| `is_public` | boolean | NOT NULL DEFAULT TRUE | 是否向下公开 |
| `rule_type` | enum | NOT NULL | numeric/grade（数值/等级） |
| `min_score` | decimal(10,2) | | 分值范围最小值 |
| `max_score` | decimal(10,2) | | 分值范围最大值 |
| `status` | enum | NOT NULL | enabled/disabled |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**关联表：perf_eval_rule_level（评价等级）**

> 规则类型为"等级"时使用

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `eval_rule_id` | bigint | FK → perf_eval_rule | 所属评价规则 |
| `level_name` | json | NOT NULL | 多语言等级名称 |
| `score` | decimal(10,2) | | 分值 |
| `sort_order` | int | NOT NULL | 排序码 |

**说明**：
- 等级名称各语种不可重复
- 被考核组引用时不可删除

### 2.9 perf_dist_rule（强制分布规则）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | json | NOT NULL | 多语言名称 {zh: "", en: ""} |
| `code` | varchar(50) | UNIQUE | 规则编码（系统自动生成） |
| `dept_ids` | json | NOT NULL | 适用部门ID列表 |
| `is_public` | boolean | NOT NULL DEFAULT TRUE | 是否向下公开 |
| `grade_rule_id` | bigint | FK → perf_grade_rule | 应用等级（必须关联） |
| `rule_type` | enum | NOT NULL | numeric/grade（数值/等级） |
| `effective_count` | int | NOT NULL | 生效人数（>0） |
| `status` | enum | NOT NULL | enabled/disabled |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**关联表：perf_dist_rule_detail（分布规则明细）**

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `dist_rule_id` | bigint | FK → perf_dist_rule | 所属强制分布规则 |
| `grade_name` | json | NOT NULL | 多语言等级名称（来自等级规则） |
| `compare_rule` | enum | NOT NULL | le/ge（不超过/不低于） |
| `value` | decimal(10,4) | NOT NULL | 值（数值模式为绝对值，等级模式为百分比） |
| `sort_order` | int | NOT NULL | 排序码 |

**说明**：
- 强制分布规则必须绑定等级规则
- 等级名称必须是等级规则中定义的等级
- 等级规则增删等级时，引用的强制分布规则需同步更新
- 支持操作记录查看

---

## 3. 方案配置层（V2）

### 3.1 perf_scheme（绩效方案）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `name` | varchar(200) | NOT NULL | 方案名称（同语种唯一） |
| `code` | varchar(50) | UNIQUE | 方案编号（系统自动生成，不可编辑） |
| `version` | int | NOT NULL DEFAULT 1 | 版本号（每次保存+1） |
| `cycle_type` | enum | NOT NULL | monthly/quarterly/half_yearly/yearly/custom |
| `status` | enum | NOT NULL | draft/enabled/disabled |
| `dept_id` | bigint | FK → org_unit | 适用部门（方案适用的组织范围） |
| `is_public` | boolean | NOT NULL DEFAULT TRUE | 是否向下公开（控制员工是否可在工作台查看绩效结果） |
| `grade_rule_id` | bigint | FK → perf_grade_rule | 等级规则 |
| `dynamic_assessment` | enum | NOT NULL | snapshot/realtime（snapshot=活动发起时快照考核关系；realtime=每次环节启动时实时查询） |
| `config_mode` | enum | NOT NULL | merged/per_group（合并/按考核组） |
| `rule_desc` | text | | 规则描述（最多500字） |
| `created_by` | bigint | FK → employee | 创建人 |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**说明**：
- 方案的 `cycle_type` 是周期类型（monthly=月度/quarterly=季度/half_yearly=半年度/yearly=年度/custom=自定义），不绑定具体周期。具体周期由活动发起时选择（activity.cycle_id）。一个方案可跨多个周期复用。
- `dynamic_assessment` 为 snapshot 时，活动发起时快照考核关系，后续不随组织调整变化；为 realtime 时，每次环节启动时实时查询当前汇报关系。

**索引**：
- `idx_scheme_status` (status)
- `idx_scheme_cycle_type` (cycle_type)
- `idx_scheme_created` (created_at)

### 3.2 perf_assessment_group（考核组）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `scheme_id` | bigint | FK → perf_scheme | 所属方案 |
| `name` | varchar(200) | NOT NULL | 考核组名称 |
| `priority` | int | NOT NULL | 优先级（数字越小优先级越高） |
| `rule_type` | enum | NOT NULL | condition/person |
| `rule_config` | JSON | | 条件/人员规则 |
| `exclude_employees` | JSON | | 排除人员ID列表 |
| `eval_rule_id` | bigint | FK → perf_eval_rule | 评价规则 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**索引**：
- `idx_group_scheme` (scheme_id)

### 3.3 perf_stage_config（环节配置）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `scheme_id` | bigint | FK → perf_scheme | 所属方案 |
| `group_id` | bigint | FK → perf_assessment_group | 所属考核组（NULL=全局） |
| `stage_type` | enum | NOT NULL | goal/eval/ratify/confirm/interview |
| `enabled` | boolean | NOT NULL | 是否开启 |
| `start_method` | enum | NOT NULL | auto/manual（自动/手动开启） |
| `end_method` | enum | NOT NULL | timed/manual（定时/手动结束） |
| `timeout_days` | int | | 超时天数 |
| `flow_template_id` | bigint | FK → flow_engine | 流程模板 |
| `form_template_id` | bigint | FK → form_template | 表单模板 |
| `forced_end_grade` | varchar(10) | | 强制结束等级 |
| `node_weights` | JSON | | 节点权重配置 |
| `eval_rule_id` | bigint | FK → perf_eval_rule | 评价规则（考核环节专用） |
| `dist_rule_id` | bigint | FK → perf_dist_rule | 强制分布规则（审定环节专用） |
| `control_mode` | enum | | strong/weak（控制模式，审定环节专用） |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**说明**：审定模式（汇报线/组织架构）、停止人员等流程控制逻辑由流程引擎管理，不在方案配置层定义。方案环节配置只关联流程模板（flow_template_id）。

**索引**：
- `idx_stage_scheme` (scheme_id)
- `idx_stage_group` (group_id)

---

## 4. 活动层（V4）

### 4.1 perf_activity（考核活动）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `scheme_id` | bigint | FK → perf_scheme | 引用的方案 |
| `scheme_version` | int | NOT NULL | 方案版本号（快照时的版本） |
| `cycle_id` | bigint | FK → perf_cycle | 绑定的绩效周期 |
| `cycle_snapshot` | JSON | NOT NULL | 绩效周期快照（不可变） |
| `name` | varchar(200) | NOT NULL | 活动名称 |
| `status` | enum | NOT NULL | draft/active/completed/terminated |
| `start_date` | date | NOT NULL | 活动开始日期 |
| `end_date` | date | NOT NULL | 活动结束日期 |
| `scheme_snapshot` | JSON | NOT NULL | 方案配置快照（不可变） |
| `participant_count` | int | DEFAULT 0 | 参与人数 |
| `created_by` | bigint | FK → employee | 创建人（HRBP） |
| `modified_by` | bigint | FK → employee | 修改人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**说明**：活动单独绑定绩效周期，方案不含周期。cycle_snapshot 包含 {id, name, type, start_month, end_month}，不可变。

**索引**：
- `idx_activity_scheme` (scheme_id)
- `idx_activity_cycle` (cycle_id)
- `idx_activity_status` (status)
- `idx_activity_date` (start_date, end_date)

### 4.2 perf_activity_participant（活动参与人）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `employee_id` | bigint | FK → employee | 员工ID |
| `group_id` | bigint | FK → perf_assessment_group | 分配的考核组 |
| `stage_status` | JSON | NOT NULL | 各环节状态 {goal, eval, ratify, confirm, interview} |
| `final_grade` | varchar(10) | | 最终等级 |
| `final_score` | decimal(6,2) | | 最终得分 |
| `status` | enum | NOT NULL | active/skipped/terminated |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**索引**：
- `idx_participant_activity` (activity_id)
- `idx_participant_employee` (employee_id)
- `idx_participant_group` (group_id)

---

## 5. 环节明细表

### 5.1 goal_detail（目标明细表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `employee_id` | bigint | FK → employee | 员工ID |
| `submitter_id` | bigint | FK → employee | 处理人 |
| `submitter_role` | enum | NOT NULL | employee/indirect/direct |
| `ref_detail_id` | bigint | FK → goal_detail | 上级审批行引用 |
| `status` | enum | NOT NULL | active/voided |
| `flow_instance_id` | bigint | | 流程实例ID |
| `modules` | JSON | NOT NULL | 目标数据 |
| `total_weight` | decimal(5,2) | | 总权重 |
| `approval_action` | enum | | approve/reject |
| `approval_comment` | text | | 审批意见 |
| `submitted_at` | timestamp | NOT NULL | 提交时间 |

**索引**：
- `idx_goal_activity` (activity_id)
- `idx_goal_employee` (employee_id)
- `idx_goal_status` (status)

### 5.2 eval_detail（考核明细表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `employee_id` | bigint | FK → employee | 员工ID |
| `submitter_id` | bigint | FK → employee | 处理人 |
| `submitter_role` | enum | NOT NULL | self/indirect/direct |
| `status` | enum | NOT NULL | active/voided |
| `flow_instance_id` | bigint | | 流程实例ID |
| `score_data` | JSON | NOT NULL | 评分数据 |
| `total_eval_result` | varchar(10) | | 总评价结果（直接上级行） |
| `total_score` | decimal(6,2) | | 总分（直接上级行） |
| `submitted_at` | timestamp | NOT NULL | 提交时间 |

**索引**：
- `idx_eval_activity` (activity_id)
- `idx_eval_employee` (employee_id)
- `idx_eval_status` (status)

### 5.3 ratification_detail（审定明细表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `employee_id` | bigint | FK → employee | 员工ID |
| `submitter_id` | bigint | FK → employee | 处理人 |
| `submitter_role` | enum | NOT NULL | direct/indirect/hierarchy/hrbp |
| `status` | enum | NOT NULL | active/voided |
| `flow_instance_id` | bigint | | 流程实例ID |
| `pre_score` | decimal(6,2) | | 审定前总分 |
| `pre_grade` | varchar(10) | | 审定前等级 |
| `adjusted_grade` | varchar(10) | | 调整后等级 |
| `adjust_reason` | text | | 调整原因 |
| `submitted_at` | timestamp | NOT NULL | 提交时间 |

**索引**：
- `idx_ratify_activity` (activity_id)
- `idx_ratify_employee` (employee_id)
- `idx_ratify_status` (status)

### 5.4 interview_detail（面谈明细表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `employee_id` | bigint | FK → employee | 员工ID |
| `submitter_id` | bigint | FK → employee | 处理人 |
| `submitter_role` | enum | NOT NULL | employee/direct |
| `ref_detail_id` | bigint | FK → interview_detail | 上级审批行引用 |
| `status` | enum | NOT NULL | active/voided |
| `flow_instance_id` | bigint | | 流程实例ID |
| `interview_type` | varchar(50) | | 面谈类型 |
| `highlights` | JSON | | 亮点数组 |
| `shortcomings` | JSON | | 不足数组 |
| `next_plan` | text | | 下阶段规划 |
| `needs` | JSON | | 需求数组 |
| `attachments` | JSON | | 附件列表 |
| `leader_comment` | text | | 上级评语（上级行） |
| `approval_action` | enum | | approve/reject |
| `submitted_at` | timestamp | NOT NULL | 提交时间 |

**索引**：
- `idx_interview_activity` (activity_id)
- `idx_interview_employee` (employee_id)
- `idx_interview_status` (status)

### 5.5 confirmation（结果确认表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `employee_id` | bigint | FK → employee | 员工ID |
| `status` | enum | NOT NULL | pending/confirmed/pending_hrbp_ack/completed |
| `confirm_action` | enum | | agree/disagree/auto |
| `hrbp_ack_at` | timestamp | | HRBP知悉时间 |
| `completed_at` | timestamp | | 完成时间 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**索引**：
- `idx_confirm_activity` (activity_id)
- `idx_confirm_employee` (employee_id)
- `idx_confirm_status` (status)

---

## 6. 结果汇总表

### 6.1 final_result（绩效结果表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `employee_id` | bigint | FK → employee | 员工ID |
| `final_grade` | varchar(10) | NOT NULL | 最终等级 |
| `final_score` | decimal(6,2) | | 最终得分 |
| `confirmed_at` | timestamp | | 确认时间 |
| `confirm_action` | enum | NOT NULL | agree/disagree/auto |
| `locked` | boolean | NOT NULL DEFAULT TRUE | 结果锁定 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |

**索引**：
- `idx_final_activity` (activity_id)
- `idx_final_employee` (employee_id)
- `idx_final_grade` (final_grade)

### 6.2 dist_snapshot（分布快照表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `group_id` | bigint | FK → perf_assessment_group | 考核组 |
| `grade` | varchar(10) | NOT NULL | 等级 |
| `required_pct` | decimal(5,2) | | 要求比例% |
| `required_count` | int | | 要求人数 |
| `current_count` | int | NOT NULL DEFAULT 0 | 当前人数 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**索引**：
- `idx_dist_activity` (activity_id)
- `idx_dist_group` (group_id)

---

## 7. 版本管理表

### 7.1 perf_scheme_version（方案版本历史表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `scheme_id` | bigint | FK → perf_scheme | 所属方案 |
| `version` | int | NOT NULL | 版本号 |
| `snapshot` | JSON | NOT NULL | 配置快照 |
| `change_log` | text | | 变更说明 |
| `operator_id` | bigint | FK → employee | 操作人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |

**约束**：
- `UNIQUE KEY uk_scheme_version (scheme_id, version)`

**索引**：
- `idx_version_scheme` (scheme_id)
- `idx_version_created` (created_at)

**触发器**：方案保存时自动写入版本历史

```sql
-- 方案保存后触发（方案有周期类型但不绑定具体周期，审定模式由流程引擎管理）
CREATE TRIGGER trg_scheme_version_insert
AFTER UPDATE ON perf_scheme
FOR EACH ROW
BEGIN
  IF NEW.version > OLD.version THEN
    INSERT INTO perf_scheme_version (scheme_id, version, snapshot, operator_id, created_at)
    SELECT NEW.id, NEW.version,
      JSON_OBJECT(
        'name', NEW.name,
        'cycle_type', NEW.cycle_type,
        'dept_id', NEW.dept_id,
        'is_public', NEW.is_public,
        'grade_rule_id', NEW.grade_rule_id,
        'dynamic_assessment', NEW.dynamic_assessment,
        'config_mode', NEW.config_mode,
        'rule_desc', NEW.rule_desc,
        'groups', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', g.id, 'name', g.name, 'priority', g.priority, 'rule_type', g.rule_type, 'rule_config', g.rule_config, 'exclude_employees', g.exclude_employees, 'eval_rule_id', g.eval_rule_id)) FROM perf_assessment_group g WHERE g.scheme_id = NEW.id),
        'stages', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', s.id, 'stage_type', s.stage_type, 'enabled', s.enabled, 'start_method', s.start_method, 'end_method', s.end_method, 'timeout_days', s.timeout_days, 'flow_template_id', s.flow_template_id, 'form_template_id', s.form_template_id, 'forced_end_grade', s.forced_end_grade, 'node_weights', s.node_weights, 'eval_rule_id', s.eval_rule_id, 'dist_rule_id', s.dist_rule_id, 'control_mode', s.control_mode)) FROM perf_stage_config s WHERE s.scheme_id = NEW.id)
      ),
      NEW.modified_by, NOW();
  END IF;
END;
```

---

## 8. 配置覆盖表

### 8.1 perf_activity_config_override（活动配置覆盖表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `config_type` | varchar(50) | NOT NULL | 配置类型（stage/notification/dist） |
| `config_key` | varchar(100) | NOT NULL | 配置键 |
| `config_value` | JSON | NOT NULL | 配置值 |
| `operator_id` | bigint | FK → employee | 操作人 |
| `created_at` | timestamp | DEFAULT NOW() | 创建时间 |
| `updated_at` | timestamp | ON UPDATE NOW() | 更新时间 |

**约束**：
- `UNIQUE KEY uk_activity_config (activity_id, config_type, config_key)`

**索引**：
- `idx_override_activity` (activity_id)
- `idx_override_type` (config_type)

**配置类型示例**：

| config_type | config_key | config_value |
|-------------|------------|--------------|
| `stage` | `goal_start_method` | `{"value": "manual"}` |
| `stage` | `goal_end_method` | `{"value": "timed", "timeout_days": 7}` |
| `notification` | `todo_notification` | `{"enabled": true, "channels": ["internal", "feishu"]}` |
| `dist` | `control_mode` | `{"value": "strong"}` |

---

## 9. 操作日志表

### 9.1 perf_operation_log（操作日志表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | bigint | PK | 主键 |
| `activity_id` | bigint | FK → perf_activity | 所属活动 |
| `employee_id` | bigint | | 被操作员工（可空） |
| `stage_type` | enum | | 环节类型（可空） |
| `operator_id` | bigint | NOT NULL | 操作人 |
| `action` | varchar(50) | NOT NULL | 操作类型 |
| `before_data` | JSON | | 操作前数据 |
| `after_data` | JSON | | 操作后数据 |
| `reason` | text | | 操作原因（可空） |
| `created_at` | timestamp | DEFAULT NOW() | 操作时间 |

**索引**：
- `idx_log_activity` (activity_id)
- `idx_log_operator` (operator_id)
- `idx_log_created` (created_at)

**操作类型枚举**：

| action | 说明 |
|--------|------|
| `activity_create` | 创建活动 |
| `activity_start` | 启动活动 |
| `activity_complete` | 完成活动 |
| `activity_terminate` | 终止活动 |
| `stage_open` | 开启环节 |
| `stage_close` | 结束环节 |
| `config_override` | 配置覆盖 |
| `participant_add` | 添加参与者 |
| `participant_remove` | 移除参与者 |

---

## 10. 索引设计

### 10.1 索引策略

| 表 | 索引类型 | 说明 |
|----|----------|------|
| perf_scheme | B-tree | status, cycle_type, created_at |
| perf_assessment_group | B-tree | scheme_id |
| perf_stage_config | B-tree | scheme_id, group_id |
| perf_activity | B-tree | scheme_id, status, start_date |
| perf_activity_participant | B-tree | activity_id, employee_id, group_id |
| perf_scheme_version | B-tree | scheme_id, version |
| perf_activity_config_override | B-tree | activity_id, config_type |

### 10.2 复合索引

| 表 | 索引字段 | 说明 |
|----|----------|------|
| perf_activity_participant | (activity_id, group_id) | 查询活动下某考核组的参与者 |
| perf_activity_participant | (activity_id, status) | 查询活动下某状态的参与者 |
| perf_scheme_version | (scheme_id, version) | 查询方案某版本的快照 |
| perf_activity_config_override | (activity_id, config_type, config_key) | 查询活动某项配置 |

### 10.3 JSON 索引

| 表 | JSON字段 | 索引方式 | 说明 |
|----|----------|----------|------|
| perf_activity.scheme_snapshot | — | 虚拟列 + B-tree | 查询快照中的配置 |
| perf_activity_participant.stage_status | goal | 虚拟列 + B-tree | 查询目标环节状态 |
| perf_activity_participant.stage_status | eval | 虚拟列 + B-tree | 查询考核环节状态 |

---

## 11. 数据字典

### 11.1 状态枚举

| 枚举值 | 说明 |
|--------|------|
| `draft` | 草稿 |
| `enabled` | 已启用 |
| `disabled` | 已停用 |
| `active` | 进行中 |
| `completed` | 已完成 |
| `terminated` | 已终止 |
| `voided` | 已作废 |
| `pending` | 待处理 |
| `confirmed` | 已确认 |

### 11.2 环节类型枚举

| 枚举值 | 说明 |
|--------|------|
| `goal` | 目标制定 |
| `eval` | 绩效考核 |
| `ratify` | 结果审定 |
| `confirm` | 结果确认 |
| `interview` | 绩效面谈 |

### 11.3 处理人角色枚举

| 枚举值 | 说明 |
|--------|------|
| `employee` | 员工 |
| `self` | 自评（员工） |
| `indirect` | 间接上级 |
| `direct` | 直接上级 |
| `hierarchy` | 逐级上级 |
| `hrbp` | HRBP |

---

## 12. ER 图

```
┌──────────────────────┐
│    perf_cycle        │
│  (不可变，被活动引用) │
└──────────────────────┘
           │
           │ 1:N（活动绑定周期）
           ▼
┌──────────────────────┐      ┌──────────────────────┐
│    perf_scheme       │◄─────│  perf_grade_rule     │
│  (不含周期，纯模板)  │◄─┐   └──────────────────────┘
└──────────────────────┘  │            ▲
           │              │            │ FK
           │ 1:N          │            │
           ▼              │   ┌──────────────────────┐
┌──────────────────────┐  │   │  perf_dist_rule      │
│ perf_assessment_group│  │   │  (强制分布绑定等级)  │
└──────────────────────┘  │   └──────────────────────┘
           │              │            ▲
           │ 1:N          │            │ FK
           ▼              │            │
┌──────────────────────┐  │   ┌──────────────────────┐
│  perf_stage_config   │◄─┘   │  perf_flow_template  │
└──────────────────────┘      └──────────────────────┘
           │
           │ 1:N
           ▼
┌──────────────────────┐      ┌──────────────────────┐
│    perf_activity     │◄─────│  perf_scheme_version │
│  (scheme_snapshot    │      └──────────────────────┘
│   + cycle_snapshot)  │
│  绑定周期+方案快照   │
└──────────────────────┘
           │
           │ 1:N
           ▼
┌──────────────────────┐      ┌──────────────────────┐
│perf_activity_participant│◄───│perf_activity_config_override│
└──────────────────────┘      └──────────────────────┘
           │
           │ 1:N
           ▼
┌──────────────────────┐
│    goal_detail       │
│    eval_detail       │
│    ratification_detail│
│    interview_detail  │
│    confirmation      │
└──────────────────────┘
           │
           │ 1:1
           ▼
┌──────────────────────┐
│    final_result      │
└──────────────────────┘
```
