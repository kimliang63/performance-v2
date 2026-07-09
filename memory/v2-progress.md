---
name: v2-progress
description: v2 当前进度——已完成的模块和功能
metadata:
  type: project
  updated: 2026-07-09
---

## v2 已完成

### 审定页面（4 页）
- 等级分布卡片：总体结论 + Chart.js 图表 3:7 并排，可收起/展开
- 收起态紧凑条：7 级简况（名/数/✓❌/调整提示）
- 7 星评等：替换旧 select 下拉
- 等级颜色三档：红（远低/低于/符合-）· 琥珀（符合/符合+）· 绿（超出/远超）
- 筛选栏重排：搜索 | 部门下拉 | 考核组 | 到达状态
- sticky 浮动条：滚动时顶部浮现等级简况
- 四个页面统一：direct / indirect / hierarchy / hrbp

### 移动端（多页）
- mobile-confirm：三按钮布局 + 底部弹出申诉面板
- mobile-eval：去抽屉全平铺，目标卡片内联编辑
- mobile-goal：去抽屉全平铺，只读展示目标数据
- mobile-interview：WeUI cell 列表 + section 卡片化 + 面谈选项平铺
- mobile-ratify：50 人数据 + 分布表筛选 + 手风琴展开评星 + 详情面板
- mobile-goal-approve：复用 mobile-goal 卡片样式，只读审批

### PC 端
- demo-confirm-employee：三按钮横排 + 申诉弹窗 + 自动确认提示
- demo-eval-direct/indirect：标题 no-wrap + 星级列宽缩减
- demo-feishu-notify：16 条飞书通知卡片（员工 8 + 管理者 8）
- demo-index：去移动端工作台入口，badge 30 页
- perf-scenario-nav：业务场景全景图，按角色/阶段分列
- navigation.js：侧边栏新增"📋 业务场景全景"入口（蓝色高亮）

### 报表页面
- 4 个报表页：目标中心 / 绩效结果 / 考核进度 / 绩效报表
- 按 perf-scheme-list 样式统一筛选栏和表格

### 数据
- 飞书表格：16 条通知场景表，已写入 https://ztn.feishu.cn/sheets/UxqFsmjRih7wPptnTt8cjivUnkb

## 待处理
- mobile-ratify 分布表点击筛选后的成员列表可视优化
- 各移动端页面 Design Spec 细节打磨
