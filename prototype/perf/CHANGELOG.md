# 变更记录

## 格式说明
每条记录包含：日期、类型、页面/组件、变更内容、原因

类型：新增 / 改造 / 删除 / 修复

---

## v4 快照 — 2026-05-29

快照路径：`confirmed/v4/`

### 快照内容
包含 V2 方案设计 + V3 考核表单全部原型页面，新增共享导航系统：

| 页面 | 文件 |
|------|------|
| 共享导航组件 | navigation.js |
| 绩效首页 | perf-index.html |
| 绩效方案列表 | perf-scheme-list.html |
| 方案新增/编辑向导 | perf-scheme-wizard.html |
| 方案详情 | perf-scheme-detail.html |
| 预置考核表单 | perf-form-templates.html |
| PBC目标制定 | perf-form-goal.html / perf-form-pbc.html |
| 绩效考核 | perf-form-evaluation.html |
| 结果审定 | perf-form-ratification.html |
| 员工确认 | perf-form-confirmation.html |
| 结果面谈 | perf-form-interview.html |
| 强制分布 | perf-forced-distribution.html |

### 本次迭代主要变更（v4相对v3）

**共享导航系统 (navigation.js) — 新增**
- 新增全局共享导航组件，所有页面统一引用
- 顶部 Mega Menu：按模块分组（绩效方案、绩效表单、基础配置等），点击跳转对应页面
- 左侧 Sidebar：当前模块下的子页面列表，支持展开/折叠子页签
- 绩效表单下新增子页签：目标填写、PBC制定、绩效考核、结果审定、员工确认、结果面谈
- 无原型页面点击显示 Toast 提示（"该页面暂无原型"）
- 页面初始化顺序：`GHR_NAV.init()` 必须在 `render()` 之前调用

**全局布局统一 — 改造**
- 所有页面移除与 navigation.js 冲突的 CSS（`.main`、`.ct`、`.hdr`、`.pg{max-width}`、`body{height:100vh;overflow:hidden}`）
- 所有表单页面 `.pg` 统一使用 `width:100%` 自适应宽度，移除 max-width 限制
- 页面结构统一：移除手动包裹的 `<div class="main">` 和 `<div class="ct">`，由 navigation.js 统一管理布局容器
- 修复所有页面白屏问题（`render()` 在 `GHR_NAV.init()` 之前调用导致 DOM 容器不存在）

**表单操作按钮统一 — 改造**
- 结果审定、员工确认、目标填写、结果面谈 4 个表单的操作按钮统一移至页面顶部 header 区域
- 结果审定：header 新增模板导出、批量导入、重置、提交审定按钮，移除底部重复按钮
- 员工确认：header 新增不同意、确认无误按钮，移除底部"请确认以上绩效结果"区块
- 目标填写：新增 pg-hd header（含总权重显示、保存草稿、提交），移除底部 action-bar
- 结果面谈：header 新增保存草稿/提交（待填写）、驳回/同意（待审批）、已完成徽章

**绩效方案列表 (perf-scheme-list.html) — 改造**
- 移除统计卡片区域（方案总数、启用中、进行中活动、待配置）

**结果审定 (perf-form-ratification.html) — 改造**
- header 新增操作按钮：模板导出、批量导入、重置、提交审定

**员工确认 (perf-form-confirmation.html) — 改造**
- 考核目标与结果表格新增"审定等级"列（colspan 7→8）
- 每行新增审定等级数据单元格

**结果面谈 (perf-form-interview.html) — 改造**
- 操作按钮从表单内容底部移至 pg-hd header 右侧
- 状态徽章与按钮统一放在 pg-a 容器内

快照路径：`confirmed/v3/`

### 快照内容
包含 V2 方案设计 + V3 考核表单全部原型页面：

| 页面 | 文件 |
|------|------|
| 原型导航 | perf-shell.html |
| 绩效方案列表 | perf-scheme-list.html |
| 方案新增/编辑向导 | perf-scheme-wizard.html |
| 方案详情 | perf-scheme-detail.html |
| 预置考核表单 | perf-form-templates.html |
| PBC目标制定 | perf-form-pbc.html |
| 绩效考核 | perf-form-evaluation.html |
| 结果审定 | perf-form-ratification.html |
| 员工确认 | perf-form-confirmation.html |
| 强制分布 | perf-forced-distribution.html |

### 本次迭代主要变更（v3相对v2新增/改造）

**PBC目标制定 (perf-form-pbc.html)**
- 总权重改为按实际目标权重求和，不再用模块预设权重
- 总分计算修正：`score * (g.weight/100)`，不再乘模块权重
- 加减分改为独立区域，按需添加

**绩效考核 (perf-form-evaluation.html)**
- 加减分改为内联编辑，默认一项，不可删除
- 定量输入改为数字输入 + 单位后置
- 加权总分统一显示在总评语上方（单人/批量一致）
- 新增模板导出功能

**结果审定 (perf-form-ratification.html)**
- 新增模板导出、批量导入、批量确认按钮

**员工确认 (perf-form-confirmation.html)**
- 重构为双模板：月度（目标→考核→审定）/ 年度（面谈→审定）
- 目标+考核合并为层级表（模块→目标）
- 评语按处理人角色分色显示
- 移除"综合评价"（考核不产生总等级）

**方案向导 (perf-scheme-wizard.html)**
- 新增引用绩效等级：下拉选择等级规则，自动展示等级
- 考核阶段配置移至设置弹窗（侧边栏齿轮按钮）
- 新增预置模板：月度/半年度/年度，选择周期自动配置阶段
- 目标/考核环节新增强制结束规则（处理规则 + 评价结果）
- 考核组移除"共用环节"
- 审定环节按考核组模式只显示当前组配置
