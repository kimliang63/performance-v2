---
type: project-review
created: 2026-06-24
updated: 2026-06-24
tags:
  - project-review
  - project-sync
  - second-brain
projects:
  - HROne-performance
related:
  - ../progress
  - ../architecture
  - ../config-activity-logic
  - ../v2v3-prd-issues
  - ../review-issues
---

# 最新项目回顾

更新日期：2026-06-24

## 当前状态

- 这是一个 HROne/GHR 绩效管理系统的系统设计文档与纯 HTML 原型项目，不是框架型应用代码仓库。`AGENTS.md` 明确技术栈为 HTML + CSS + JS，Mock 数据内置，不使用 React、Vue、Ant Design。
- 产品架构已经稳定在三层模型：V1 基础配置层、V2 方案配置层、V4 活动执行层。该结论同时见于 `AGENTS.md` 和 `memory/architecture.md`。
- 绩效业务范围围绕五个考核环节组织：目标制定、绩效考核、结果审定、结果确认、绩效面谈。该范围见于 `AGENTS.md`，并已体现在交付物目录中。
- 当前 `prototype/perf/current` 下有 86 个 HTML 原型页面，`docs/deliverables` 下有 36 个 Markdown 交付文档。
- 根据 `memory/progress.md`：V1 已评审并配置锁定，V2/V3 已于 2026-06-11 评审，V4 考核活动开发中，V5 预留，V6 AI 智能应用原型已完成但等待基础能力就绪后集成。

## 近期决策

- 提交模型由后端负责，`submit` 是原子操作：校验、计算、存储、提交流程。前端原型应保持展示层定位，不承载真实业务逻辑。证据：`AGENTS.md`、`docs/deliverables/prd-backend-logic.md`。
- 活动执行采用不可变快照：活动启动时将方案配置复制到 `perf_activity.scheme_snapshot`，进行中活动读取快照，不读取方案最新配置。证据：`memory/config-activity-logic.md`、`docs/deliverables/prd-config-scheme-update.md`、`docs/deliverables/prd-database-design.md`。
- 方案版本管理和活动级覆盖已经成为显式设计：`perf_scheme_version` 保存版本历史，`perf_activity_config_override` 保存活动级覆盖，且活动级覆盖优先级高于方案快照配置。证据：`memory/config-activity-logic.md`。
- 已确认的流程规则包括：审批人为空自动跳过、HRBP 为空跳过、结果确认永远最后、员工不同意后 HRBP 知悉并线下处理、跳过审定员工使用方案中固定绩效结果等级。证据：`docs/deliverables/README.md`、`memory/review-issues.md`。

## 近期进展

- 2026-06-04 新增 V4 考核活动原型：`perf-activity.html` 和 `perf-activity-detail.html`，覆盖活动管理、过程操作、导入导出、监控、异常提醒、操作日志。证据：`prototype/perf/CHANGELOG.md`。
- 2026-06-02 新增 V1/V1.1 基础配置原型页面：绩效周期、单位、等级规则、计算规则、衡量标准、指标库、评价规则、公式编辑器。证据：`prototype/perf/CHANGELOG.md`。
- 2026-05-29 保存 v4 快照，统一共享导航、布局容器和表单操作按钮位置。证据：`prototype/perf/CHANGELOG.md`。
- 最近 git 记录显示，CHANGELOG 之后又发生了 AI 页面合并、移动端 AI 助手集成、批量导入页面修复等原型工作，但这些变更尚未同步到 `prototype/perf/CHANGELOG.md`。证据：`git log --oneline -n 10`。

## 认知变化

- 推断：项目已经越过“是否有原型/文档”的启动阶段，当前主战场是 PRD、原型、功能清单、项目记忆之间的一致性治理。
- 推断：如果引入 Codex + Claude Code 双 agent 协作，最有价值的不是自动化启动，而是建立 issue、handoff、review 的稳定信息链，避免两个 agent 基于不同上下文各自改动。
- 推断：`memory/features.md` 不能再作为唯一功能状态来源，因为其中大量条目仍标记为“待开发”，但实际原型目录和 CHANGELOG 已显示对应页面存在。

## 工作模式

- `prototype/perf/current` 是当前工作区；`prototype/perf/confirmed/v3` 和 `prototype/perf/confirmed/v4` 应视为只读快照，除非明确要求修改。
- `memory/` 是项目当前 second brain，用于记录架构、进度、复核问题、版本规划和项目回顾。
- `prototype/perf/CHANGELOG.md` 仍应作为原型变更记录入口；近期 commit 说明该文件需要更及时更新。
- 多 agent 协作建议采用持久化工件流：Issue 作为任务契约，Claude worktree 作为实现隔离，handoff 作为实现交接，Codex review 作为验收闸门，`memory`/`CHANGELOG` 作为主线记忆。

## 风险与开放问题

- 高风险：`memory/v2v3-prd-issues.md` 记录了 24 个 PRD 对齐问题，其中 7 个高优先级问题涉及评价结果应由公式引擎计算、驳回路径缺失、强制分布分母定义、submit 原子操作、追加式数据模型等。
- 高风险：`memory/features.md` 与实际原型状态不一致。它将许多功能标为“待开发”，但原型文件和 CHANGELOG 已显示部分页面存在；如果直接用它拆 issue，容易误判任务范围。
- 中风险：流程引擎兼容性仍有 P0 问题，包括 HRBP 批量处理节点呈现方式、批量节点通知平衡。证据：`docs/deliverables/README.md`。
- 中风险：流程引擎能力说明仍未接收，V3 中流程引擎 25 项功能仍是后续梳理项。证据：`memory/progress.md`。
- 中风险：当前工作区存在未提交修改 `prototype/perf/current/manager/demo-ratify-direct.html`。本次回顾没有检查或修改该文件。
- 未知项：项目没有正式 Obsidian 风格的 `KnowledgeMap/GraphIndex.md` 或 tag registry，因此本次回顾沿用现有 `memory/` second brain 约定，没有引入新的图谱体系。

## 下一步行动

1. 对齐 `memory/features.md`、实际原型文件和 `prototype/perf/CHANGELOG.md`，明确每个功能是已实现、部分实现还是缺失。
2. 将 `memory/v2v3-prd-issues.md` 中 7 个高优先级问题拆成 issue，优先处理 submit 原子操作和追加式数据模型在 PRD 中的传播。
3. 补写 `prototype/perf/CHANGELOG.md`，覆盖 2026-06-04 之后的批量导入修复、移动端 AI 助手集成、AI 页面合并等 commit。
4. 只有当 Codex + Claude Code 协作正式开始时，再创建 `.agents/` 工作流目录；不要在未使用前迁移现有 memory。
5. 在开始大范围 review 或合并前，先解决或记录当前 `demo-ratify-direct.html` 的未提交改动。

## 证据

- `AGENTS.md`：项目定义、技术栈、架构、版本规划、开发规则。
- `memory/architecture.md`：产品架构、三层配置模型、流程引擎概念、目标用户。
- `memory/progress.md`：当前版本状态、里程碑、待办事项、来源文档。
- `memory/config-activity-logic.md`：快照、版本管理、活动级覆盖决策。
- `memory/v2v3-prd-issues.md`：24 个 PRD 对齐问题和高优先级风险。
- `memory/review-issues.md`：已确认的需求复核问题和推迟项。
- `docs/deliverables/README.md`：流程交付物索引、已确认结论、流程引擎兼容问题。
- `prototype/perf/CHANGELOG.md`：V4 活动、V1/V1.1 基础配置等原型变更记录。
- `git log --oneline -n 10`：近期 AI 集成和批量导入修复相关提交。
- `git status --short`：当前 `prototype/perf/current/manager/demo-ratify-direct.html` 存在未提交修改。
