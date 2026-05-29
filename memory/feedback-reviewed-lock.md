---
name: reviewed-lock
description: 已评审功能不可修改，确认后锁定原型到 confirmed 目录
metadata:
  type: feedback
---

已评审的文档/功能不能修改。

**Why:** 用户明确要求，已评审内容属于锁定状态，改动需要走变更流程。

**How to apply:**
- 标记"已评审"的功能点，原型实现后快照到 `confirmed/vN/`，不再改动
- 需要改造已评审功能时，必须在 CHANGELOG.md 记录变更原因
- 新版本开发在 `current/` 目录进行
