# 实体状态机定义

> 版本 v3 | 基于 7 份业务流程文档 + 逻辑确认清单

---

## 目录

1. [Scheme（绩效方案）](#1-scheme绩效方案)
2. [PBC Goal（目标制定表单）](#2-pbc-goal目标制定表单)
3. [Evaluation（绩效考核表单）](#3-evaluation绩效考核表单)
4. [Ratification（结果审定表单）](#4-ratification结果审定表单)
5. [Confirmation（员工确认表单）](#5-confirmation员工确认表单)
6. [Interview（绩效面谈表单）](#6-interview绩效面谈表单)
7. [通用规则](#7-通用规则)
8. [跨实体状态联动](#8-跨实体状态联动)

---

## 1. Scheme（绩效方案）

### 1.1 状态图

```
                 ┌──────────┐
                 │  draft   │
                 └────┬─────┘
           enable │        │ delete
                  ▼        ▼
           ┌──────────┐  [已删除]
           │ enabled  │
           └────┬─────┘
      disable │     │ delete
             ▼     ▼
      ┌──────────┐  [已删除]
      │ disabled │
      └────┬─────┘
    enable │     │ delete
           ▼     ▼
    ┌──────────┐  [已删除]
    │ enabled  │
    └──────────┘
```

### 1.2 状态表

| 状态 | 描述 | 入口动作 | 出口动作 |
|------|------|----------|----------|
| `draft` | 草稿，未启用 | 创建方案 | — |
| `enabled` | 已启用，可发起活动 | 激活方案配置 | 校验所有必填配置 |
| `disabled` | 已停用，不可发起新活动 | 停用方案 | 已有活动不受影响 |

### 1.3 转换表

| 来源 | 事件 + 守卫条件 | 目标 | 动作 |
|------|-----------------|------|------|
| `draft` | `enable` | `enabled` | 校验必填项（名称/周期/考核组/至少1个环节） |
| `draft` | `delete` | — | 删除方案（仅草稿可删除） |
| `enabled` | `disable` | `disabled` | 停用方案；已有活动独立运行 |
| `enabled` | `delete` | — | **禁止**：已启用方案不可删除 |
| `disabled` | `enable` | `enabled` | 重新启用，校验必填项 |
| `disabled` | `delete` | — | 删除方案；已有活动不受影响 |

---

## 2. PBC Goal（目标制定表单）

两个流程变体共用同一状态机，通过 `flowType` 区分。

### 2.1 状态图

```
                     ┌──────────────┐
                     │ not_started  │
                     └──────┬───────┘
              start(通用) │       │ start(导入)
                          ▼       ▼
                 ┌────────────┐  ┌────────────┐
                 │goal_setting│  │goal_import  │
                 └─────┬──────┘  └──────┬──────┘
                       │                │
                       │          employee_confirm
                       │                │
                       │     ┌──────────┤
                       │     │ agree    │ disagree
                       │     ▼          ▼
                       │  [继续]   [退回HRBP]
                       │               │
                       │          re_import
                       │               │
                       │     ┌─────────┘
                       ▼     ▼
              ┌─────────────────────────┐
              │ pending_indirect_approval│ ← 可跳过
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │ pending_direct_approval  │ ← 可跳过
              └────────────┬────────────┘
                     ┌─────┴─────┐
                approve     reject
                     ▼          ▼
              ┌──────────┐  ┌──────────┐
              │ approved │  │ rejected │
              └──────────┘  └────┬─────┘
                                 │ resubmit
                                 ▼
                          [回到发起节点]
```

### 2.2 状态表

| 状态 | 描述 | 入口动作 | 出口动作 |
|------|------|----------|----------|
| `not_started` | 未开始 | 活动启动 | — |
| `goal_setting` | 员工填写目标（通用流程） | 发起填写 | 保存目标数据 |
| `goal_import` | HRBP批量导入目标 | 导入操作 | 写入目标数据 |
| `pending_employee_confirm` | 等待员工确认导入目标 | 导入完成 | — |
| `pending_indirect_approval` | 等待间接上级审批 | 上一节点完成/跳过 | — |
| `pending_direct_approval` | 等待直接上级审批 | 上一节点完成/跳过 | — |
| `approved` | 审批通过 | 审批同意 | 写入目标数据到考核表单 |
| `rejected` | 审批驳回 | 审批不同意 | 通知发起人 |

### 2.3 转换表

| 来源 | 事件 + 守卫条件 | 目标 | 动作 |
|------|-----------------|------|------|
| `not_started` | `start` + `flowType=general` | `goal_setting` | 发起员工填写流程 |
| `not_started` | `start` + `flowType=import` | `goal_import` | HRBP执行批量导入 |
| `goal_import` | `employee_confirm` + `agree` | `pending_indirect_approval` | 员工确认目标 |
| `goal_import` | `employee_confirm` + `disagree` | `goal_import` | 退回HRBP重新导入 |
| `goal_setting` | `submit` | `pending_indirect_approval` | 员工提交目标 |
| `pending_indirect_approval` | `approve` | `pending_direct_approval` | 间接上级同意 |
| `pending_indirect_approval` | `approve` + `indirect为空` | `pending_direct_approval` | 自动跳过（流程引擎） |
| `pending_indirect_approval` | `reject` | `rejected` | 驳回到发起人 |
| `pending_direct_approval` | `approve` | `approved` | 直接上级同意，写入目标数据 |
| `pending_direct_approval` | `approve` + `direct为空` | `approved` | 自动跳过（流程引擎） |
| `pending_direct_approval` | `reject` | `rejected` | 驳回到发起人 |
| `rejected` | `resubmit` | `goal_setting` / `goal_import` | 发起人修改后重新提交 |

---

## 3. Evaluation（绩效考核表单）

### 3.1 状态图

```
                    ┌──────────────┐
                    │ not_started  │
                    └──────┬───────┘
                           │ start
                           ▼
                  ┌────────────────┐
                  │ self_scoring   │
                  └───────┬────────┘
                          │ submit
                          ▼
              ┌─────────────────────────┐
              │ pending_indirect_scoring │ ← 可跳过
              └────────────┬────────────┘
                    ┌──────┴──────┐
               submit         reject
                    ▼              ▼
              ┌────────────────┐  ┌──────────┐
              │ pending_direct │  │ rejected │
              │ _scoring       │  └────┬─────┘
              └───────┬────────┘       │ resubmit
                 ┌────┴────┐           ▼
            submit     (无驳回)  [回到self_scoring]
                 ▼
              ┌──────────────┐
              │  completed   │
              └──────────────┘
```

### 3.2 状态表

| 状态 | 描述 | 入口动作 | 出口动作 |
|------|------|----------|----------|
| `not_started` | 未开始 | 活动启动 | — |
| `self_scoring` | 员工自评 | 发起自评 | 保存自评数据 |
| `pending_indirect_scoring` | 等待间接上级评分 | 自评提交 | — |
| `pending_direct_scoring` | 等待直接上级评分 | 上一节点完成/跳过 | — |
| `completed` | 考核完成 | 直接上级提交 | 计算总评价结果，写入审定表单 |
| `rejected` | 驳回到员工 | 间接上级驳回 | 该员工所有 active 行 voided，通知员工 |

### 3.3 转换表

| 来源 | 事件 + 守卫条件 | 目标 | 动作 |
|------|-----------------|------|------|
| `not_started` | `start` | `self_scoring` | 发起员工自评流程 |
| `self_scoring` | `submit` | `pending_indirect_scoring` | 员工提交自评，保存完成值+评价+评语 |
| `pending_indirect_scoring` | `submit` | `pending_direct_scoring` | 间接上级提交评分 |
| `pending_indirect_scoring` | `submit` + `indirect为空` | `pending_direct_scoring` | 自动跳过（流程引擎） |
| `pending_indirect_scoring` | `reject` | `rejected` | 间接上级驳回，该员工所有 active 行 voided |
| `pending_direct_scoring` | `submit` | `completed` | 直接上级提交评分，按节点权重计算总评价结果 |
| `rejected` | `resubmit` | `self_scoring` | 员工修改完成值后重新提交 |

### 3.4 总评价结果计算规则

```
if 节点权重已配置:
    总评价结果 = Σ(各节点评价结果 × 节点权重) / Σ(节点权重)
else:
    总评价结果 = 最后一个填写节点的评价结果
```

> 与 BR-034 一致。节点权重以百分比存储，除以权重之和归一化。

---

## 4. Ratification（结果审定表单）

### 4.1 状态图

```
                      ┌──────────────┐
                      │ not_started  │
                      └──────┬───────┘
                             │ start
                             ▼
                ┌────────────────────────┐
                │ pending_direct_rate    │
                └───────────┬────────────┘
                            │ submit
                            ▼
                ┌────────────────────────┐
                │ pending_indirect_rate  │ ← 可跳过
                └───────────┬────────────┘
                            │
                            ▼
                ┌────────────────────────┐
                │ pending_hierarchy_rate │
                └───────────┬────────────┘
                       ┌────┴────┐
                  (grade≠A)   (grade=A)
                       │         │
                       │         ▼
                       │  ┌─────────────────────┐
                       │  │ pending_hrbp_approval│
                       │  └──────────┬──────────┘
                       │        ┌────┴────┐
                       │   approve    reject
                       │        ▼         ▼
                       │  [completed]  [回到direct_rate]
                       │
                       ▼
                 ┌──────────────┐
                 │  completed   │
                 └──────────────┘
```

### 4.2 状态表

| 状态 | 描述 | 入口动作 | 出口动作 |
|------|------|----------|----------|
| `not_started` | 未开始 | 活动启动 | — |
| `pending_direct_rate` | 等待直接上级评级 | 发起审定 | 加载考核数据（只读） |
| `pending_indirect_rate` | 等待间接上级评级 | 直接上级提交 | — |
| `pending_hierarchy_rate` | 等待逐级上级评级 | 间接上级提交/跳过 | 按模式选择汇报线或组织架构 |
| `pending_hrbp_approval` | 等待HRBP审批（仅远超预期） | 调整后等级=A | 通知HRBP |
| `completed` | 审定完成 | 审批通过/跳过 | 写入审定结果到确认表单 |

### 4.3 转换表

| 来源 | 事件 + 守卫条件 | 目标 | 动作 |
|------|-----------------|------|------|
| `not_started` | `start` | `pending_direct_rate` | 加载考核表单数据（只读） |
| `pending_direct_rate` | `submit` + `强控超限` | `pending_direct_rate` | **阻断**：禁止提交 |
| `pending_direct_rate` | `submit` + `弱控超限` | `pending_indirect_rate` | 提交并附带警告 |
| `pending_direct_rate` | `submit` + `校验通过` | `pending_indirect_rate` | 直接上级评级完成 |
| `pending_indirect_rate` | `submit` | `pending_hierarchy_rate` | 间接上级评级完成 |
| `pending_indirect_rate` | `submit` + `indirect为空` | `pending_hierarchy_rate` | 自动跳过（流程引擎） |
| `pending_hierarchy_rate` | `submit` + `到达停止人员` | `completed` | 汇报线模式：到特定高管结束 |
| `pending_hierarchy_rate` | `submit` + `到达顶层` | `completed` | 组织架构模式：到顶层组织结束 |
| `pending_hierarchy_rate` | `submit` + `调整后等级=A` | `pending_hrbp_approval` | 触发HRBP审批 |
| `pending_hierarchy_rate` | `submit` + `调整后等级≠A` | `completed` | 跳过HRBP审批 |
| `pending_hrbp_approval` | `approve` | `completed` | HRBP同意 |
| `pending_hrbp_approval` | `reject` | `pending_direct_rate` | HRBP驳回，重新审定 |

### 4.4 审定模式差异

| 差异项 | 汇报线逐级 | 组织架构逐级 |
|--------|-----------|-------------|
| 逐级上级来源 | 汇报关系 | 组织架构 |
| 停止规则 | 到特定高管结束（用户配置） | 无停止规则（到顶层自动结束） |
| 停止人员 | 支持配置 | 不适用 |

---

## 5. Confirmation（员工确认表单）

### 5.1 状态图

```
              ┌──────────────┐
              │   pending    │
              └──────┬───────┘
                ┌────┴────────────┐
           agree     disagree    timeout
                ▼          ▼          ▼
         ┌──────────┐  ┌──────────────────┐  ┌──────────┐
         │confirmed │  │ pending_hrbp_ack │  │confirmed │
         └────┬─────┘  └────────┬─────────┘  └────┬─────┘
              │             ack │                  │
              │                 ▼                  │
              │          ┌──────────────┐          │
              │          │  completed   │          │
              │          └──────────────┘          │
              ▼                                   ▼
         ┌──────────────┐                  ┌──────────────┐
         │  completed   │                  │  completed   │
         └──────────────┘                  └──────────────┘
```

### 5.2 状态表

| 状态 | 描述 | 入口动作 | 出口动作 |
|------|------|----------|----------|
| `pending` | 等待员工确认 | 审定完成 | 加载审定结果+面谈结果（只读） |
| `confirmed` | 员工同意 | 点击"同意" | 写入确认结果 |
| `pending_hrbp_ack` | 等待HRBP知悉 | 员工点击"不同意" | 通知HRBP |
| `completed` | 确认流程结束 | HRBP知悉/员工同意 | 结束流程 |

### 5.3 转换表

| 来源 | 事件 + 守卫条件 | 目标 | 动作 |
|------|-----------------|------|------|
| `pending` | `confirm` + `agree` | `completed` | 员工同意，流程结束 |
| `pending` | `confirm` + `disagree` | `pending_hrbp_ack` | 员工不同意，触发HRBP知悉 |
| `pending` | `timeout` | `completed` | 超时自动确认为"同意" |
| `pending_hrbp_ack` | `ack` | `completed` | HRBP知悉，流程结束 |

### 5.4 关键业务规则

- 员工不同意 → **不驳回**，不重新确认，线下处理
- HRBP角色仅为"知悉"，不审批不驳回
- 确认表单数据全部只读：审定结果 + 面谈结果 + 考核结果

---

## 6. Interview（绩效面谈表单）

### 6.1 状态图

```
                    ┌──────────────┐
                    │ not_started  │
                    └──────┬───────┘
                           │ start
                           ▼
              ┌────────────────────────┐
              │ pending_employee_fill  │
              └───────────┬────────────┘
                          │ submit
                          ▼
              ┌────────────────────────┐
              │ pending_leader_review  │
              └───────────┬────────────┘
                     ┌────┴────┐
                approve     reject
                     ▼          ▼
              ┌──────────┐  ┌──────────────────────────┐
              │completed │  │ pending_employee_fill     │
              └──────────┘  │ (驳回重新填写)             │
                            └──────────────────────────┘
```

### 6.2 状态表

| 状态 | 描述 | 入口动作 | 出口动作 |
|------|------|----------|----------|
| `not_started` | 未开始 | 活动启动 | — |
| `pending_employee_fill` | 等待员工填写面谈记录 | 发起面谈 | — |
| `pending_leader_review` | 等待直接上级审批 | 员工提交 | — |
| `completed` | 面谈完成 | 上级同意 | 写入面谈数据到确认表单 |
| `rejected` | 驳回到员工 | 上级不同意 | 通知员工重新填写 |

### 6.3 转换表

| 来源 | 事件 + 守卫条件 | 目标 | 动作 |
|------|-----------------|------|------|
| `not_started` | `start` | `pending_employee_fill` | 发起员工填写流程 |
| `pending_employee_fill` | `submit` | `pending_leader_review` | 员工提交面谈记录 |
| `pending_leader_review` | `approve` | `completed` | 上级同意，写入面谈数据 |
| `pending_leader_review` | `reject` | `pending_employee_fill` | 驳回，员工重新填写 |

### 6.4 员工填写必填项

| 字段 | 必填 | 说明 |
|------|------|------|
| 面谈类型 | 是 | |
| 亮点 | 是 | ≥ 3 项 |
| 不足 | 是 | ≥ 3 项 |
| 下阶段规划 | 是 | |
| 需求 | 是 | ≥ 1 项 |
| 附件 | 否 | |

---

## 7. 通用规则

### 7.1 空审批人跳过

所有实体的审批节点，当审批人为空时，流程引擎自动跳过该节点。这是流程引擎标准能力，非业务逻辑。

| 角色 | 人数约束 | 空值处理 |
|------|----------|----------|
| 间接上级 | 1人或为空 | 自动跳过 |
| 直接上级 | 1人或为空 | 自动跳过 |
| 逐级上级 | 每级1人 | 自动跳过 |
| HRBP | 1人或为空 | 自动跳过 |

### 7.2 驳回规则

| 流程 | 驳回目标 | 说明 |
|------|----------|------|
| 目标制定 | 发起人（员工/HRBP） | 间接/直接上级均可驳回 |
| 绩效考核 | 发起人（员工） | 间接上级可驳回，该员工所有 active 行 voided，员工重新提交后全流程重来 |
| 结果审定 | HRBP驳回 → 重新审定 | 仅HRBP可驳回 |
| 员工确认 | **无驳回** | 不同意走HRBP知悉，不回流 |
| 绩效面谈 | 员工 | 上级驳回 → 员工重新填写 |

### 7.3 终态不可逆

所有实体的终态（`approved` / `completed` / `confirmed`）一旦到达，不可回退。如需修正，需发起新的流程实例。

---

## 8. 跨实体状态联动

### 8.1 环节触发顺序

| 考核场景 | 触发顺序 |
|----------|----------|
| 月度考核 | 目标制定 → 绩效考核 → 结果审定 → 结果确认 |
| 年度考核 | 绩效面谈 → 结果审定 → 结果确认 |

### 8.2 数据级联规则

| 上游实体 | 下游实体 | 级联数据 | 触发时机 |
|----------|----------|----------|----------|
| PBC Goal `approved` | Evaluation | 目标数据（只读） | 审批通过时写入 |
| Evaluation `completed` | Ratification | 考核数据（只读） | 考核完成时写入 |
| Ratification `completed` | Confirmation | 审定结果（只读） | 审定完成时写入 |
| Interview `completed` | Confirmation | 面谈结果（直接引用） | 实时读取 |

### 8.3 状态依赖

```
Confirmation.pending 依赖:
  ├─ Ratification.completed（审定必须完成）
  └─ Interview.completed（年度考核时面谈必须完成）

Ratification.pending_direct_rate 依赖:
  └─ Evaluation.completed（考核必须完成，月度考核场景）

Evaluation.self_scoring 依赖:
  └─ PBC Goal.approved（目标必须审批通过，月度考核场景）
```
