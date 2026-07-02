# 变更记录

## 2026-07-02 审定等级控件统一为评星

**改造** `manager/demo-ratify-direct.html` — 7级审定按钮组 → 7星评星组件
**改造** `manager/demo-ratify-indirect.html` — 同上
**改造** `manager/demo-ratify-hierarchy.html` — 同上
**改造** `manager/demo-ratify-hrbp.html` — 审定等级只读文本 → 带颜色标签

等级-星级-颜色映射：
- 7级审定（ratify 页面）：远低预期(c5) → 低于预期(ro) → 符合预期-(ac700) → 符合预期(em700) → 符合预期+(pr700) → 超出预期(vi) → 远超预期(ac)
- 5级考核（eval 页面）：不变，已有5星评星

交互：hover 黄色高亮+浮动提示，点击第N颗星选中1-N颗，下方标签显示等级名称+颜色
图表联动：setRatifyStar 末尾调用 updateChart()/updateStats() 实时刷新

---

每条记录包含：日期、类型、页面/组件、变更内容、原因

类型：新增 / 改造 / 删除 / 修复

---

## 2026-07-01 绩效考核评分页面优化
- 改动文件: employee/demo-eval-self.html, manager/demo-eval-indirect.html, manager/demo-eval-direct.html
- 改动内容: 自评页表格优化（类型列加宽/nowrap/overflow-x/sticky后两列/文案修正）；双线+直线评分页历史卡片重布局（年度卡片+月度网格）、表格新增类型列+重构列名、全部定性目标统一评星组件（hover预览+tip）、初评等级改评星、mock数据补充完成值
- 回滚路径: prototype/perf/confirmed/backups/20260701_1823/

---

## 2026-07-01 方案配置六项优化

### 优化 1：活动管理员支持搜索 + 多选
- 改动文件: perf-scheme-wizard.html, perf-activity.html
- 改动内容: ADMIN_LIST 改为对象数组（id+name）；form.admins 存储 ID 数组；管理员选择区增加搜索框+实时过滤+已选计数；活动页同步改造（搜索+ID匹配+name映射展示）
- 回滚路径: prototype/perf/confirmed/backups/20260701_1803/

### 优化 2：自动创建活动样式完善（按周期类型四条规则）
- 改动文件: perf-scheme-wizard.html
- 改动内容: autoCreate.timing 拆分为四种周期类型独立配置（monthly/quarterly/semiannual/annual）；UI 改为四条规则行（当前周期高亮+pr50背景，非当前置灰）；预览只显示最近一条；月度用数字input替代下拉
- 回滚路径: prototype/perf/confirmed/backups/20260701_1803/

### 优化 3：隐藏版本/编码/启用停用
- 改动文件: perf-scheme-wizard.html
- 改动内容: 删除基本信息区中的方案编号行、是否启用radio行、方案版本字段；保留名称+周期类型作为第一行
- 回滚路径: prototype/perf/confirmed/backups/20260701_1803/

### 优化 4：目录不显示"自动创建活动"
- 改动文件: perf-scheme-wizard.html
- 改动内容: 侧边栏删除 autoCreate 条目；导航列表从 ['basic','autoCreate','groups'] 改为 ['basic','groups']；renderContent 删除 autoCreate 分支；保留 renderAutoCreate 函数不删
- 回滚路径: prototype/perf/confirmed/backups/20260701_1803/

### 优化 5：考核组规则结构重组（三区）
- 改动文件: perf-scheme-wizard.html, perf-scheme-detail.html
- 改动内容: excluded 字段合并进 autoRemove.manualExclude；编辑区拆分为三区（名称/添加人员规则/移除人员规则）用分隔线+序号标题；移除人员规则区包含条件checkbox+手动排除输入框；详情页同步改造
- 回滚路径: prototype/perf/confirmed/backups/20260701_1803/

### 优化 6：环节自动规则重构（相对/固定双模式+冲突检测）
- 改动文件: perf-scheme-wizard.html, perf-scheme-detail.html
- 改动内容: autoStart/autoEnd 增加 mode 字段（relative/fixed）；renderTimeRulePanel 支持双模式radio切换；相对模式：参考点+偏移天数；固定模式：TIME_RULES下拉+偏移；新增 calcStageDate 和 checkStageConflict；冲突时红色警告条；详情页显示简化描述
- 回滚路径: prototype/perf/confirmed/backups/20260701_1803/

---

## 2026-07-01 活动管理员下沉方案 + 活动继承覆盖
- 改动文件: perf-scheme-wizard.html, perf-scheme-detail.html, perf-activity.html
- 改动内容: 方案增加活动管理员预设（多选 checkbox）；创建活动时从方案继承管理员并支持覆盖；活动详情展示管理员列表
- 回滚路径: prototype/perf/confirmed/backups/20260701_1730/

---

## 2026-07-01 周期类型+月度自动创建 + 环节定时开启/结束

### 优化 1：绩效方案增加周期类型 + 月度自动创建活动规则
- 改动文件: perf-scheme-wizard.html, perf-scheme-detail.html
- 改动内容: 基本信息新增周期类型下拉框（月度/季度/半年度/年度）；自动创建活动卡片根据周期类型切换模式（月度显示每月N号创建+未来3期预览 / 非月度显示周期开始前/后N天）；autoCreate 数据模型增加 monthlyDay 字段
- 回滚路径: prototype/perf/confirmed/backups/20260701_1721/

### 优化 2：所有环节支持自动开启+自动结束，时间基于考核周期绝对日期规则
- 改动文件: perf-scheme-wizard.html, perf-scheme-detail.html
- 改动内容: 新增 TIME_RULES 绝对日期规则表（13条规则按周期类型过滤）；STAGES 数据模型重构 autoStart/autoEnd（rule+offsetDays 替代 ref+days）；新增 renderTimeRulePanel 统一时间规则面板组件；5个环节配置函数均支持自动开启+自动结束面板；结束方式从"超时自动结束"升级为"定时自动结束"；详情页展示自动开启/结束规则标签
- 回滚路径: prototype/perf/confirmed/backups/20260701_1721/

---

## 2026-07-01 活动管理优化
- 改动文件: perf-activity.html
- 改动内容: 进行中活动增加修改考核关系弹窗（单人与批量）；创建活动增加活动管理员字段；列表页与详情页展示活动管理员
- 回滚路径: prototype/perf/confirmed/backups/20260701_1657/

---

## 2026-07-01 方案配置三项优化

### 优化 1：考核组支持自动移除人员规则
- 改动文件: perf-scheme-wizard.html, perf-scheme-detail.html
- 改动内容: 考核组数据模型新增 autoRemove 字段（enabled + conditions），编辑区新增 toggle + 多选条件（离职/调岗/组织架构变更），折叠头部显示自动移除标记，详情页展示已配置规则
- 回滚路径: prototype/perf/confirmed/backups/20260701_1651/

### 优化 2：绩效方案支持自动创建每期活动
- 改动文件: perf-scheme-wizard.html, perf-scheme-detail.html
- 改动内容: form 新增 autoCreate 字段，基本信息区增加自动创建活动卡片（toggle + 方向/天数 + 预览），侧边栏新增"自动创建活动"导航节点，详情页展示自动创建配置
- 回滚路径: prototype/perf/confirmed/backups/20260701_1651/

### 优化 3：考核环节支持定时自动开启
- 改动文件: perf-scheme-wizard.html, perf-scheme-detail.html
- 改动内容: STAGES 新增 autoStart 字段（enabled + ref + days），5 个环节配置函数均新增定时开启规则面板（参考点 + 延迟天数 + 预览），目标制定环节参考点仅显示"周期开始后"，详情页环节行显示定时标记
- 回滚路径: prototype/perf/confirmed/backups/20260701_1651/

---

## 2026-06-29 原型整改第二轮：导航补漏 + 描述修正 + 审批人统一 + 流程顺序

### 一、导航修复 (navigation.js)
- subdirs 补上 `/manager-agent/`，manager-agent/ 目录下页面 basePath 修正为 `../`

### 二、入口页 (demo-index.html)
- 去掉「字段只读」描述，改为「审批员工目标内容」等业务动作描述

### 三、审批人统一
- **demo-goal-employee.html**：「李总」→「王总监」（直属上级），「王总监」→「刘VP」（间接上级），统一使用 王总监 / 刘VP / 赵敏
- **demo-workbench-approval.html**：同上统一，取消「李总」「王总」旧名称

### 四、审批流程顺序修正 (demo-workbench-approval.html)
- 目标制定流程调整为：员工提交 → 间接上级审批 → 直接上级审批 → 目标生效
- 节点4「HR确认」改为系统状态「目标生效」

## 2026-06-29 原型整改：流程统一 + 数据连贯 + 导航修复

### 一、导航系统修复 (navigation.js)
- basePath 计算：从仅支持 `/employee/` 扩展为支持所有一级子目录（employee/manager/employee-mobile/manager-mobile/employee-agent）
- 新增模块别名 `_aliases: { workbench: 'perf' }`，解决 demo-workbench-my-goal / demo-workbench-my-result 调用 `GHR_NAV.init('workbench',...)` 时侧栏为空的问题
- `enter()` / `go()` / `sel()` 方法统一通过别名解析模块，保证侧栏在所有页面正常工作

### 二、入口页 (demo-index.html)
- 卡片描述全部改为业务语言：移除「Split布局」「复用XX结构」等实现术语
- 员工端 subtitle 修正为「工作台 → 目标制定 → 考核自评 → 查看审定结果 → 结果确认 → 面谈 → 我的结果」
- 管理者端 subtitle 页数修正 12→13，补充「→ 批量导入」
- AI Agent 分区从 1 页扩展为 5 页：新增 manager-agent/ 下 4 个已有页面（活动监控/绩效分析/申诉处理/智能算分）
- 总页数 badge 更新为 35 页
- 所有卡片描述统一为「角色 + 业务动作 + 下一步」格式

### 三、Mock 数据统一
- **主线统一**：张明 / 产品部 / 高级产品经理 / 2026年Q2（2026年4-6月）
- **管理者**：王总监（直接上级）/ 刘VP（间接上级）
- **HRBP**：全局统一为「赵敏」——替换所有「李HR」「赵HR」引用（覆盖 employee/、manager/、employee-mobile/、manager-mobile/ 四个目录）
- **周期**：主流程页面统一为「2026年Q2 / 2026年4-6月」，月度视图示例保留「2026年6月」
- **demo-confirm-employee.html**：「张伟」→「张明」
- **demo-goal-employee.html**：「发起日期」→「2026年4月1日」，「考核周期」→「2026年Q2 / 2026年4-6月」

### 四、审定表格溢出修复
- demo-ratify-direct / demo-ratify-indirect / demo-ratify-hierarchy：`.grade-btn-group` 从 `flex-wrap:nowrap` 改为 `flex-wrap:wrap`，新增 `max-width:360px`
- 等级按钮在列宽不够时自动换行，不再撑破容器或横向溢出

### 五、管理者名称统一
- goal-direct / goal-indirect：header 和审批流中「王总」→「王总监」、「李总」→「刘VP」
- interview-direct：审批流「李HR」→「赵敏」，文本区保留员工自然语言「王总」

### 六、移动端数据统一
- employee-mobile/、manager-mobile/：所有「李HR」→「赵敏」
- demo-mobile-home：「王总」→「王总监」

### 七、Manager-agent 页面纳入入口
- demo-index.html AI Agent 分区新增 4 张卡片（均为已有页面，无新增页面）
- manager-agent/demo-agent-activity-monitor.html
- manager-agent/demo-agent-analytics.html
- manager-agent/demo-agent-appeal-handle.html
- manager-agent/demo-agent-score-calc.html

---

## 2026-06-27 绩效方案+绩效活动原型改造

### 改造页面（5个）

**绩效方案列表 (perf-scheme-list.html)**
- 增加草稿状态（STATUS_MAP 新增 draft）
- 模拟数据增加草稿方案 S007
- 状态筛选器增加"草稿"选项
- 操作列：草稿状态下显示编辑/删除，与已停用类似

**绩效方案向导 (perf-scheme-wizard.html)**
- 环节详情底部增加上一步/下一步导航按钮
- 上一步跳转到前一个已启用的环节，下一步跳转到下一个
- 第一个环节无上一步，最后一个环节无下一步

**绩效方案详情 (perf-scheme-detail.html)**
- 已支持草稿状态展示（renderBasicInfo 中已有 draft 判断）

**活动管理列表 (perf-activity.html)**
- 状态简化为 3 种：未开始、进行中、已结束（去掉草稿/已发布）
- 创建弹窗去掉"发布时间"字段
- 考核周期改为按配置项分组显示（年度/半年度/季度/月度）
- 创建活动默认状态为"未开始"
- 批量操作去掉"批量发布"

**活动详情 (perf-activity-detail.html)**
- 去掉周期切换下拉框（act-switch）
- 考核过程：环节操作改为开启/结束/暂停
- 考核过程：双列卡片布局展示环节进度
- 考核过程：导入/导出按钮样式统一为 btn-s
- 考核人：操作按钮改为催办/暂停/继续/转交/终止
- 异常列表：增加 10 条全场景 mock 数据（人员异常/超时/提交率预警/进度滞后）
- 操作日志：增加 14 条全场景 mock 数据（开启/结束/暂停/继续/催办/转交/终止/导入/导出/人员异常/超时）
- 操作日志筛选器增加所有操作类型选项

---

## 2026-06-04 V4 考核活动原型

### 新增页面
- `perf-activity.html` — 活动列表 + 发起/编辑弹窗
- `perf-activity-detail.html` — 活动详情（4个Tab + 考核人详情视图）

### 功能（31项）
- 活动管理：列表、发起、人员选择、人员导入导出
- 过程管理：环节开关、暂停、重开、批量操作、强制终止、退回、转交、催办、挂起
- 数据导入导出：目标/评分/审定/面谈导入 + 结果导出 + 模板下载 + 校验
- 监控：流程实例监控、环节进度跟踪、异常监控、活动干预
- 异常提醒：人员异常、超时、提交率预警、进度滞后
- 操作日志

---

## 2026-06-02 — 新增 V1/V1.1 基础配置原型页面

### 新增页面（8个）

| 页面 | 文件 | 模块 |
|------|------|------|
| 绩效周期 | perf-base-cycle.html | V1 基础配置 |
| 单位 | perf-base-unit.html | V1 基础配置 |
| 等级规则 | perf-base-grade.html | V1 基础配置 |
| 计算规则 | perf-base-calc.html | V1 基础配置 |
| 衡量标准 | perf-base-standard.html | V1 基础配置 |
| 指标库 | perf-base-indicator.html | V1 基础配置 |
| 评价规则 | perf-base-evaluation.html | V1 基础配置 |
| 公式编辑器 | perf-formula-editor.html | V1.1 公式编辑器 |

### 导航更新
- `navigation.js`：V1 基础配置 7 项添加 `file` 属性，链接到对应页面
- `navigation.js`：新增「公式工具」分组，包含公式编辑器入口

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

---

## 2026-06-29 业务评审整改（五、绩效首页 + 评分 + 结果 + 审定）

### 一、绩效首页布局改造 (demo-workbench-home.html)
- Row 2 改为双列布局：左侧"我的目标"，右侧"我的绩效评分"
- 卡片间距收紧至 12px，body padding 16px 20px
- 分区标题加大至 18px/700 + 彩色左边框（待办=蓝、目标=绿、评分=紫）+ 副标题
- 移除旧的分数展示（4.10 + 超出预期 badge），等级/周期移至卡片 header
- 绩效历史拆分为：年度绩效（最近5年）+ 月度绩效（近12个月）
- 2026年标注为"—"（进行中），其余年份展示对应等级 badge

### 二、评分系统改造：五颗星 (demo-eval-self / demo-eval-direct / demo-eval-indirect)
- 指标评分统一改为横排五颗星（★/☆），仅支持 1-5 整星
- 每颗星下方列出对应衡量标准描述
- KPA 补充 3 分、4 分标准；3 分标注"需人工维护"
- 移除旧的等级按钮（超出预期/符合预期+/符合预期/符合预期-/低于预期）

### 三、结果页去分数 (demo-workbench-my-result / demo-confirm-employee / perf-result-view / demo-workbench-team-result)
- 移除所有数字得分：加权总分、得分明细、指标得分、87.5、100分/80分
- 最终结果只展示周期 + 等级
- 指标维度不展示初评等级或总等级
- 多方评价展示：自评 / 上级评 / 双线评（文本标签）
- 明细保留：目标、完成情况、衡量标准、评价结论（不含数字）

### 四、审定页改造 (demo-ratify-direct / demo-ratify-indirect / demo-ratify-hierarchy / demo-ratify-hrbp)
- 新增部门筛选控件（静态 mock）
- 提交审定提示：当前范围生效人数 + 提交后锁定/撤回可改
- 提交/撤回状态标签：已提交·名额已锁定 / 已撤回·可重新编辑 / 编辑中
- 新增正态分布校验区域：分布对比 + "与正态分布接近方可提交"静态提示
- 初评等级标注为"由当前节点处理人自行评定"

### 术语统一
- 全局「申诉」→「不同意」、「不确认」→「不同意」、「有异议」→「不同意」
- V6 AI 面板添加「V6 预留 · 当前版本不可用」标识（11 个页面）

### 附件修复
- demo-index.html：页数修正 35→23，补挂 3 页，移除 AI 措辞
- 批量导入流程：员工确认/HRBP确认节点删除，改为直线上级审批
- V4 活动状态：not_started→草稿、ended→已完成，新增已挂起/已终止
- perf-scheme-wizard：补充 cycle/dept/downward 字段及 UI
- 等级规则库与 perf-base-grade.html 同步

---

## 2026-06-29 Codex 复验收 · 返修记录

### 一、首页布局修正 (demo-workbench-home.html)
- 改为真正的两列主布局：左列=待办任务，右列=我的目标+我的绩效评分（纵向堆叠）
- 1280 宽度首屏可同时看到待办和目标，消除空白

### 二、评分页历史绩效修补 (demo-eval-direct / demo-eval-indirect)
- 将"上年年度绩效结果 + 今年月度绩效结果"改为两段：年度绩效（最近5年）+ 月度绩效（近12个月）
- 年度：2022-2026 年，2026 年标注"—"；月度：25年7月-26年6月
- 只展示周期+等级，无数字分数

### 三、自评页五星全量覆盖 (demo-eval-self.html)
- 7 个指标全部改为五星评分（3 定量 + 4 定性），共 35 颗星
- 定量指标保留完成值输入，评价入口改为 1-5 星，移除自动得分
- 每颗星列出衡量标准，3 星保留"需人工复核"

### 前置整改保留
- 审定页部门筛选/分布校验/锁定提示（4 文件）
- 结果页去分数（4 文件）
- V6 AI 标识（11 文件）
- 等级规则同步、活动状态统一、术语统一、批量导入流程修正

---

## 2026-06-29 样式统一整改（七、工作台+表单+评星+确认）

### 一、工作台样式优化 (demo-workbench-home / demo-workbench-team)
- 顶部改为 workbench-top 两列：左 0.8fr 待办 / 右 1.6fr 目标
- 绩效历史移至下方 performance-section 全宽展示
- 卡片统一：border 1px #E5E7EB / border-radius 8px / 轻阴影
- 标题层级：页面 20px / 卡片 15px 600 / 正文 13px / 辅助 12px
- 团队页增加底部三列管理者看板：风险提醒 / 待跟进 / 等级分布

### 二、目标表单统一 (5 页面)
- demo-goal-employee / demo-goal-employee-new / demo-workbench-my-goal / demo-goal-direct / demo-goal-indirect
- 统一 goal-field-grid 两列网格、goal-field.full 跨列
- 统一 field label 12px #64748B / input 36px / textarea 72px / readonly #F8FAFC
- 按钮 34px / border-radius 6px
- 卡片白底，3px 主题色左边框标题

### 三、评星布局修正 (demo-eval-self / demo-eval-direct / demo-eval-indirect)
- 星星改为横向 star-row 单行排列
- star-legend 统一在星行下方单行展示衡量标准
- score-cell min-width 260px 防挤压
- 星型样式：22×22 / font-size 20px / 未选 #D1D5DB / 选中 #F59E0B

### 四、确认页样式优化 (demo-confirm-employee)
- 新增结果摘要卡片：左"待员工确认"状态 + 右"优秀"等级
- 新增确认意见卡片：两个 radio-card 选项（认可/有异议）
- 选中态蓝边框 + 浅蓝底色，未选白底灰边框
- 保留原提交/不同意流程逻辑

---

## 2026-06-29 工作台左列空白修补 (demo-workbench-home / demo-workbench-team)
- 左列改为 flex column 容器，待办卡片下方增加"本期状态/团队状态"卡片（flex:1 填充）
- 我的绩效页：当前周期 / 待办数量 / 即将截止 / 本周已完成
- 团队绩效页：当前周期 / 团队待办 / 待跟进人数 / 目标提交率
- 内容均来自页面已有信息，不新增业务逻辑
- 左右两列视觉重量接近，消除 150px+ 空白

---

## 2026-06-29 业务评审第五轮整改

### 工作台 (demo-workbench-home / demo-workbench-team)
- 去掉硬编码 Header，由 navigation.js 统一管理
- 去掉本期/团队状态卡片，待办任务高度与目标区对齐
- 新增 mock 任务填充左列（共 5 项）
- 目标行字段：名称 | 权重% | 定量/性 | 审批状态 | 衡量标准（长文本截断+title）
- 团队页目标数据 enriched，含 status/standard 字段

### 目标表单 (demo-goal-employee / demo-goal-employee-new)
- 新增导出按钮（btn-o 样式）
- 字段排序改为：名称 → 权重（带%后缀） → 定量/性

### 绩效考核 (demo-eval-self / demo-eval-direct / demo-eval-indirect)
- 评星并入"评价/得分"列（score-cell min-width 260px）
- 定量指标自动计算得分：≥挑战 100分 / ≥目标 80分 / ≥保底 60分 / 否则 0分
- 定性指标保留五颗星评价
- eval-indirect 全定性指标，无需修改

### 结果确认 (demo-confirm-employee)
- 改为单卡片三列布局：结果等级 | 员工信息 | 确认选项
- 提交按钮放右上角
- 紧凑 radio 选项：认可/有异议

### 业务演示入口 (demo-index.html)
- 去掉审批待办、团队目标总览、团队绩效结果 3 卡片
- 页数 20 页（员工 7 + 管理者 13）
