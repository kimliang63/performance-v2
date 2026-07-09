---
name: v2-repo-rule
description: v2 独立仓库规则——只维护 performance-v2，旧仓库不再更新
metadata:
  type: project
  updated: 2026-07-09
---

## 仓库规则

- **旧仓库**：`kimliang63/performance`（main 分支）— 线上保留不变，不再维护
- **新仓库**：`kimliang63/performance-v2`（main 分支）— 唯一维护目标
- **本地路径**：`/Users/masc/projects/HRONE-v2/`
- **线上地址**：https://kimliang63.github.io/performance-v2/
- **推送命令**：`git push v2 v2:main`

## 注意事项

- 所有改动只改 v2 工作树，不改 `/Users/masc/projects/HRONE/`（旧 main）
- 端口 8788 = 旧版（main），端口 8789 = v2
- `v2/prototype/perf/current/` 是 v2 代码根目录
