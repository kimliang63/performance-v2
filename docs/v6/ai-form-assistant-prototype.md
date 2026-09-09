# V6 AI 表单增强（原型分支）

> 分支：`v6`  
> 依据：[HRONE【绩效管理】AI 表单增强](https://ztn.larkenterprise.com/wiki/UFcDwc0YtiNVttkSpXEcKRwgnnZ)  
> 说明：本分支只定原型交互，不把 V6 写入当前 V1–V5 Scope。

## 信息结构

| 区域 | 承载内容 |
|---|---|
| 左侧表单 | 填写结果：目标字段、完成值/评价、上级评价、审定等级 |
| 右侧对话框 | 任务处理结果与总结：进度、统计、检查结论、可解释依据 |

确认动作统一为「填入表单 / 写入表单」，不在对话框堆字段明细稿。

## 场景页面

| 场景 | 原型 |
|---|---|
| 员工制定目标 | [demo-goal-employee.html](file:///Users/masc/projects/HRONE/prototype/perf/current/employee/demo-goal-employee.html) |
| 员工绩效自评 | [demo-eval-self.html](file:///Users/masc/projects/HRONE/prototype/perf/current/employee/demo-eval-self.html) |
| 上级绩效评分（直线） | [demo-eval-direct.html](file:///Users/masc/projects/HRONE/prototype/perf/current/manager/demo-eval-direct.html) |
| 上级绩效评分（双线） | [demo-eval-indirect.html](file:///Users/masc/projects/HRONE/prototype/perf/current/manager/demo-eval-indirect.html) |
| 结果审定（直接上级） | [demo-ratify-direct.html](file:///Users/masc/projects/HRONE/prototype/perf/current/manager/demo-ratify-direct.html) |
| 结果审定（逐级） | [demo-ratify-hierarchy.html](file:///Users/masc/projects/HRONE/prototype/perf/current/manager/demo-ratify-hierarchy.html) |

本地 `prototype/perf/current` 起服后：

- http://127.0.0.1:8765/employee/demo-goal-employee.html
- http://127.0.0.1:8765/employee/demo-eval-self.html
- http://127.0.0.1:8765/manager/demo-eval-direct.html
- http://127.0.0.1:8765/manager/demo-ratify-direct.html

## 交互能力

1. 浮球打开右侧抽屉对话框  
2. 预置场景卡片点击输入  
3. 键盘输入  
4. 文件上传（word / xlsx / xls 等）  
5. 处理后输出任务摘要  
6. 「填入表单」写回当前页可编辑字段，并高亮反馈  

## 共用代码

- `prototype/perf/current/shared/ai-form-assistant.css`
- `prototype/perf/current/shared/ai-form-assistant.js`
- `prototype/perf/current/shared/ai-scene-*.js`
