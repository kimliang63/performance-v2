# 变更记录

## 2026-09-23 年度 TR：九宫格格名恢复普通数字序号

- `current/manager/demo-yearly-tr.html`：格子标题前加回 1–9 普通数字（非 emoji），与格名同行 14px/600、间距 6px，序号色 `--c5`；映射仍用原 `BOX_NUM`。

## 2026-09-23 年度 TR：九宫格格名标题加大

- `current/manager/demo-yearly-tr.html`：九宫格格子去掉 emoji 序号；格名 14px/600/`--c9` 单行标题，标题行左名右人数，与人名区间距 8px；人名 chip 可换行 gap 6px。

## 2026-09-23 年度 TR：步骤条作标题 + 异常标识 + 只看异常 + 默认收起列表 + 默认待提交

- `current/manager/demo-yearly-tr.html`：页头去掉「年度盘点…」标题，`#stepper` 占标题位；第2步「人才盘点」→「能力审定」。柱左人数右加减、折线无圆点。调整记录仅「从→到」+「异常标识」chips；「只看异常」chip 只筛名单。右侧看板默认收起（`listViewMode=detail` / `statsGroupsExpanded=false`）；「图表|列表」默认列表。提交状态默认「待提交」（只筛名单，统计全量；第2步仍切已提交）。

## 2026-09-23 年度 TR：组卡图高自适应 + 校准能力分段加宽

- `current/manager/demo-yearly-tr.html`：去掉 `.group-panel-chart` / 收起 body 的偏高 min-height，图高按行数撑开无底留白；`.cap-opt` 最小宽 36px、校准能力列 132px，高/中/低不再裁字。

## 2026-09-23 年度 TR：统计表列头「目标」改为「要求」

- `current/manager/demo-yearly-tr.html`：考核组统计表 `th.col-req` 文案「目标」→「要求」（绩效 `renderGradeTableHtml`、能力 `renderCapTableHtml` 各 1 处；第1/3步共用）。

## 2026-09-23 年度 TR：操作统一 icon + 组卡图表铺满宽度

- `current/manager/demo-yearly-tr.html`：九宫格列表操作列收起/展开均用 icon（title 保留「调整/调整记录」）；修收起态 `align-items:start` 继承导致 `.group-panel-chart` 宽塌窄，图表/横轴/`cap-bar-track` 铺满卡片可用宽度；卡内仍不滚动。

## 2026-09-23 年度 TR：考核组看板去掉卡片内滚动

- `current/manager/demo-yearly-tr.html`：第1/3步右侧组卡取消卡内 `overflow:auto`（`.stats-group-charts` / `.group-panel-body` / `.group-panel-table` 等），卡片随内容撑开；滚动仅留在 `#groupPanelsScroll` / `#boxGroupPanelsScroll`。

## 2026-09-23 年度 TR：九宫格列表收起全列 / 展开三列

- `current/manager/demo-yearly-tr.html`：右侧看板收起时名单恢复完整列+文字操作；展开 2×2 时才 compact 为「被考核人/格子/操作」+ icon。九宫格仍隐藏右栏；审定看板样式与折线无圆点、表行高保持。

## 2026-09-23 年度 TR：九宫格列表看板对齐审定 + 折线去圆点

- `current/manager/demo-yearly-tr.html`：第3步九宫格视图隐藏右侧统计（`#boxGroupPanelsRail`）；列表视图右侧改为审定同款看板（左收起/展开、右「图表|列表」，展开 2×2 组卡）；列表仅「被考核人/格子/操作」且操作为 icon；展开表行高够显示「符合预期」等；审定与九宫格柱折线去掉坐标圆点，只留线。

## 2026-09-23 年度 TR：收起纵向组卡 · 全局图表/列表 · 灰线

- `current/manager/demo-yearly-tr.html`：收起去掉「合并统计」，四组纵向；卡头去掉独立切换，上方全局「图表|列表」（默认图表，四组同步）；列表=统计表（等级|要求|当前|实际）非名单；图表蓝线标准+灰线调整前+红绿柱；组名+人数单行 nowrap；去掉 `#box9DistHint`。

## 2026-09-22 年度 TR：筛选只控列表、统计按全量

- `current/manager/demo-yearly-tr.html`：右侧考核组卡/合并统计/柱折线/达标与强制分布校验一律按组内未筛选全量；列表仍吃考核组·部门·提交·填写·搜索。

## 2026-09-22 年度 TR：强制分布提示卡限高可滚

- `current/manager/demo-yearly-tr.html`：宽 notice card `max-height:80vh`，头/「知道了」固定，`#toastMsg` 中间区可滚，强制分布表头 sticky。

## 2026-09-22 年度 TR：柱色按达标绿红 + 柱折线同显

- `current/manager/demo-yearly-tr.html`：考核组卡/合并统计柱色按「当前 vs 目标区间」绿/红；去掉曲线/条形互斥，默认柱+灰/蓝折线同显。

## 2026-09-22 年度 TR：条形分布按等级上色

- `current/manager/demo-yearly-tr.html`：考核组卡/合并统计条形态彩条按等级色（绿/黄/橙/粉/红），轨道不再画满宽灰条；曲线态仅细引导线+灰/蓝点。

## 2026-09-22 年度 TR：默认列表可见 + 统计卡人数与列表同源

- `current/manager/demo-yearly-tr.html`：默认提交状态改为「全部」（首屏 87 条）；考核组卡片标题人数改用与左侧列表同一筛选口径（不再用组内已到达全量冒充）；按组视图左侧名单 flex 优先级修好，避免被右侧挤没。

## 2026-09-22 年度 TR：待提交 mock 补齐四组七档非 0

- `current/manager/demo-yearly-tr.html`：默认「待提交+全部」下四组各补待提交人员，使 7 档当前人数均 ≥1（调整前尽量 ≥1），合并统计与能力「高」档同步非 0。

## 2026-09-22 年度 TR：展开/收起组图分两套 DOM + 柱宽按人数

- `current/manager/demo-yearly-tr.html`：展开考核组卡 `renderGroupCardBarsHtml`（右图无等级名，仅刻度/柱曲线/人数）；收起合并统计 `renderMergedBarsHtml`（行内保留等级名）；去掉展开卡行内标签后轨道可按当前人数出柱宽，灰/蓝点与左表「当前」一致。

## 2026-09-22 年度 TR：组图曲线/条形切换 + 合并统计上表下图 + 调整记录工号格式

- `current/manager/demo-yearly-tr.html`：考核组卡片与收起「合并统计」共用曲线/条形切换（默认曲线，点图切换，状态全局一致）；收起合并统计改回上表下图；调整记录 `.ratify-last` 人员改为「姓名(工号)」。

## 2026-09-22 年度 TR：展开考核组改为 2×2 表+条卡片

- `current/manager/demo-yearly-tr.html`：展开态 `#groupPanels` 四组改为 2×2 白卡片（顶栏图例 + 左表「等级|目标|当前|调整」+ 右横向条/灰蓝点）；收起合并统计复用同组件且无目标列。

## 2026-09-22 年度 TR：筛选并入列表标题行

- `current/manager/demo-yearly-tr.html`：`#distFilters` 移入 `.eval-list-hd` / `.box9-hd`，去掉「团队成员审定/盘点」「九宫格分布」标题；搜索+考核组+部门+提交/填写状态单行紧凑展示，不再单独占一行。

## 2026-09-22 年度 TR：收起改为右侧合并统计

- `current/manager/demo-yearly-tr.html`：`#evalSplitToggle` 收起后右侧改为一列「合并统计」（各组实际人数相加、无要求列），左侧恢复完整明细；展开仍为按考核组多列。

## 2026-09-22 年度 TR：填写状态三段筛选 + 组图展开收起 icon

- `current/manager/demo-yearly-tr.html`：「只看未填写」改为填写状态 chip（全部/未填写/已调整，默认全部）；标题栏「明细/按考核组」改为列表与右侧组图之间的 chevron，展开=窄表+组图，收起=完整明细、无右侧图。

## 2026-09-22 年度 TR：考核组「全部」筛选 + 去掉区域/演示切换 + 选中联动

- `current/manager/demo-yearly-tr.html`：`#groupFilter` 增加「全部」（默认；仅列表筛选，右侧仍四列按组）；去掉「划分区域」筛选；更多菜单去掉控制范围/控制模式切换（固定按组+强控）；待提交四组各 ≥6 人；统计表 `tr.active` 左侧 3px 主色条+12% 底+字重 600，仅当前选中组列高亮等级行。

## 2026-09-22 年度 TR：要求列按列数自动显隐 + 按组表头对齐

- `current/manager/demo-yearly-tr.html`：删除「收起要求」按钮与 toggle；单列统计（明细右侧 / 按组仅一列）表无「要求」，多列横排保留；按组视图左表头与右组标题统一 44px 行高对齐。

## 2026-09-22 年度 TR：按考核组列改为表上图下

- `current/manager/demo-yearly-tr.html`：按考核组视图 `.group-panel` 内顺序改为组头 → 等级统计表 → 分布图；收起「要求」列逻辑不变。

## 2026-09-22 年度 TR：提交状态筛选改为下拉

- `current/manager/demo-yearly-tr.html`：筛选条「提交状态」由 chip（未到达/待提交/已提交）改为 select（全部 + 三档），默认「待提交」；切换仍走 `filterStatus`，「只看未填写」等其它筛选不变。

## 2026-09-22 年度 TR：按考核组列改为竖线分隔紧挨布局

- `current/manager/demo-yearly-tr.html`：按考核组视图 `.group-panel` 去掉列间距/圆角卡片/阴影，列紧挨排列、相邻 1px 竖线分隔；选中仅淡底高亮，收起要求与横向滚动逻辑不变。

## 2026-09-22 年度 TR：审定列表增加「按考核组」列表+图表视图

- `current/manager/demo-yearly-tr.html`：`.eval-list-hd` 增加「明细 / 按考核组」切换（默认按考核组）；按组视图左侧仅「被考核人+调整等级/校准能力」，右侧 4 列考核组面板（专员/主管、基层干部、中层、高层）横向滚动，列内为紧凑分布条+「等级|要求|实际|调整」小表；点列头或筛选 chip 同步高亮、滚动定位并过滤左侧；「收起要求」去掉要求列并缩窄列宽。

## 2026-09-22 年度 TR：强制分布未达标改列表 + 去掉右侧提交状态条

- `current/manager/demo-yearly-tr.html`：强制分布校验改为结构化行 `[{group,grade,actual,limit,direction,delta}]`；强控 notice 卡 / 弱控确认弹窗均用表「考核组 | 等级 | 调整建议」；缺等级等必填提示仍走原文案卡片。去掉右侧 `#submitStrip`（未到达/待提交/已提交 metric），筛选条提交状态 chip 保留。

## 2026-09-22 年度 TR：筛选条「只看未填写」独立 chip

- `current/manager/demo-yearly-tr.html`：`#distFilters` 增加可切换 chip「只看未填写」（独立于提交状态）；步骤1筛绩效等级未填、步骤2筛能力未填（与必填提示同一判定）；列表与右侧分布「当前」同步过滤。

## 2026-09-22 方案向导：盘点强制分布改为按考核组配置

- `current/perf-scheme-wizard.html`：去掉环节顶「配置模式」条（固定合并配置）；强制分布去掉控制范围/提交方式/主行控制模式，绩效与能力均只平铺考核组表（考核组 | 强制分布规则 | 控制模式 | 规则详情）；`forcedDistGroups`/`capForcedDistGroups` 每项含 `controlMode`（强控/弱控）。

## 2026-09-22 方案向导：盘点能力规则改名为能力等级

- `current/perf-scheme-wizard.html`：基础信息区能力规则下拉 label「盘点能力规则」改为「能力等级」（保留必填 *）；色条区仍为「包含能力」，无标题冲突。

## 2026-09-22 年度 TR：顶部轻 toast 改为居中提示卡片

- `current/manager/demo-yearly-tr.html`：`#toast` / `showToast` 由扁长条改为居中偏上 notice card（白底圆角阴影 + 标题/正文/「知道了」）；校验类（warn）需点确认，成功类可自动关闭；调用点不变。

## 2026-09-22 年度 TR：控制范围=考核组时按组分布与提交校验

- `current/manager/demo-yearly-tr.html`：方案 mock `SCHEME_CFG.ctrlScope='group'`（默认可演示）；无「全部」考核组 chip，默认首组；右侧统计/图表按当前组人数 + 该组绑定规则（标准/宽松）重算；下一步/提交逐组校验强制分布——强控 toast 阻断，弱控弹窗可继续。更多菜单可切换控制范围/控制模式；`?ctrlScope=all` / `?controlMode=weak` 可直达。

## 2026-09-22 强制分布规则列精简：窄下拉 + 多行文本详情

- `current/perf-scheme-wizard.html`：`.fd-rule-pick` 去掉 select 旁完整规则名 span，只保留窄下拉（option 用缩略名）；「规则详情」列由 chip 网格改为紧凑多行纯文本（`名称 · 规则 上限%`）；绩效/能力、「全部」/「考核组」共用。

## 2026-09-22 修复 GitHub Pages 旧跳转目标 404

- 根目录 `index.html`：改用站点绝对路径 `/performance-v2/prototype/perf/current/index.html` + JS `location.replace`，避免缓存旧相对跳转。
- 补回 `perf-index.html` 与 `prototype/perf/current/perf-index.html` 兼容桩页，把旧书签/CDN 缓存跳转落到现存总览。
- 新增根目录 `.nojekyll`，避免 Jekyll 误处理静态资源。

## 2026-09-22 修复 GitHub Pages 根入口 404

- 根目录 `index.html`：跳转目标从已删除的 `perf-index.html` 改为 `prototype/perf/current/index.html`，并补充方案向导、年度 TR、演示索引等直达链接。

## 2026-09-22 九宫格区块标题改名

- `current/perf-scheme-wizard.html`：盘点配置区块标题「九宫格格子命名与绑定」改为「九宫格规则」。

## 2026-09-22 初评能力开关旁增加说明文案

- `current/perf-scheme-wizard.html`：「是否系统计算初评能力」开关右侧增加次要说明「按照考核组计算360/测评排名后加权换算当前强制分布比例归属等级」。

## 2026-09-22 控制范围=全部也走考核组规则表

- `current/perf-scheme-wizard.html`：绩效/能力主行固定三列（控制范围 | 控制模式 | 提交方式），不再插「关联强制分布规则」；其下始终 `.fd-group-panel`——全部=单行「全部」+规则选择（写 `forcedDistRule`/`capForcedDistRule`）；考核组=多行组名（写 `forcedDistGroups`）。

## 2026-09-22 强制分布规则改为窄下拉+后方完整名

- `current/perf-scheme-wizard.html`：绩效/能力按考核组表、以及控制范围=「全部」的「关联强制分布规则」，统一为窄 select（约 132px，选项缩略）+ 右侧只读完整规则名；去掉全部模式规则下方比例摘要行。

## 2026-09-22 盘点强制分布「提交方式」移至主行末列

- `current/perf-scheme-wizard.html`：`.fd-block` 绩效/能力主配置行字段顺序改为末列「提交方式」——考核组三列：控制范围 | 控制模式 | 提交方式；全部四列：控制范围 | 关联强制分布规则 | 控制模式 | 提交方式。

## 2026-09-22 盘点强制分布主行+按组区重排

- `current/perf-scheme-wizard.html`：绩效/能力改为「主配置行 + 条件展开按组区」；=全部仅下拉+一行规则摘要（去掉大预览表）；=考核组紧贴主行左线浅底两列表；去掉重复说明文案；保留状态字段与 ensure*/set* 逻辑。

## 2026-09-22 强制分布去掉外链与按组「查看明细」

- `current/perf-scheme-wizard.html`：去掉「查看分布规则 →」及空占位；按考核组配置表（绩效/能力）删除「操作」列与「查看明细」展开逻辑，仅保留考核组 | 强制分布规则。

## 2026-09-22 控制范围=考核组时隐藏「关联强制分布规则」格

- `current/perf-scheme-wizard.html`：绩效/能力侧控制范围=「考核组」时整格隐藏「关联强制分布规则」（含 label），行布局 quad→tri；表上方用次要说明「为每个考核组选择强制分布规则」；=「全部」恢复四列与全局下拉。

## 2026-09-22 盘点强制分布支持按考核组分别配置

- `current/perf-scheme-wizard.html`：控制范围=「考核组」时，绩效/能力预览区改为「考核组 × 强制分布规则」配置表（每组独立下拉 + 查看明细）；=「全部」仍为全局关联规则 + 单表预览。状态写入 `forcedDistGroups` / `capForcedDistGroups`。

## 2026-09-22 强制分布预览去代码列 + 控制范围

- `current/perf-scheme-wizard.html`：绩效/能力预览表去掉「等级」「档位」代码列；能力「比例区间」改为「比例上限」仅显示上限；盘点绩效侧与能力侧强制分布行改为四列（提交方式 | 控制范围 | 关联规则 | 控制模式），默认「考核组」。

## 2026-09-22 盘点强制分布「提交方式」移至三联最左

- `current/perf-scheme-wizard.html`：绩效盘点强制分布绩效侧 / 能力侧 `form-row.tri` 字段顺序改为 **提交方式 → 关联强制分布规则 → 控制模式**（`#inventorySubmitMode`、`#capForcedDistSubmit` 居左）。

## 2026-09-21 年度 TR 步骤条演示用可点击切步

- `current/manager/demo-yearly-tr.html`：`#stepper` 三步（绩效审定 / 人才盘点 / 九宫格校准）改为可点击切换（含回退），调用 `demoGoStep` → `goStep`，**不跑**主按钮必填校验；去掉此前「不可回退」禁点/`goStep` 禁回退；主按钮仍无「上一步」。可点态 cursor/hover，当前步高亮保持。

## 2026-09-21 初评等级导入表头去掉「等级规则枚举」hint

- `current/manager/demo-grade-batch-import.html`：初评等级列 `th` 下删除 `div.hint`「等级规则枚举」；校验文案未改。

## 2026-09-21 批量导入页头摘要只保留活动名

- `current/manager/demo-grade-batch-import.html`、`demo-assess-batch-import.html`：`pg-hd-summary` 去掉「| 页面名」后缀，仅保留活动名（如「2026年度盘点与绩效审定」）。

## 2026-09-21 九宫格绩效绑定改为多选

- `current/perf-scheme-wizard.html`：九宫格格内「绩效」由单选下拉改为与同页假种一致的 **多选**（`leave-ms` 标签+勾选菜单）；`nineBox.perfGrade` 改为等级名数组（旧单值自动包成单元素数组）；能力侧仍单选高/中/低；同能力下等级互斥。

## 2026-09-21 能力强制分布补「提交方式」（仅全部提交）

- `current/perf-scheme-wizard.html`：绩效盘点能力侧强制分布由双列改为与绩效侧一致的 **三联**（关联规则 / 控制模式 / 提交方式）；提交方式固定「全部提交」（disabled 单选项），写入 stage `capForcedDistSubmit`。

## 2026-09-21 盘点初评能力开关去卡片 + 去掉九宫格轴说明

- `current/perf-scheme-wizard.html`：绩效盘点「是否系统计算初评能力」改为与同页「自动创建活动」一致的标签+开关行（去掉灰底边框大卡片与说明文案）；九宫格标题下删除 `form-hint`（「纵轴绩效…」）。

## 2026-09-21 去掉盘点强制分布标题下说明文案

- `current/perf-scheme-wizard.html`：绩效盘点「强制分布规则」标题下删除 `form-hint`（「绩效侧对齐结果审定…」）。

## 2026-09-21 盘点强制分布对齐审定骨架（绩效+能力双套）

- `current/perf-scheme-wizard.html`：绩效盘点「盘点强制分布规则绑定」双下拉改为对齐结果审定的 **强制分布规则** 骨架——**绩效侧**：关联强制分布规则 / 控制模式 / 提交方式 + 比例预览表；**能力侧**平行：关联规则 / 控制模式 + 区间预览表（口径沿用 `CAP_FORCE`，不演算）。
- state：`perfForcedDistRule` → stage `forcedDistRule` + `forcedDistControl` + `inventorySubmitMode`；保留 `capForcedDistRule`，新增 `capForcedDistControl`；旧字段兼容迁移后删除。

## 2026-09-21 年度模板：结果审定与绩效盘点互斥（不再隐藏审定）

- `current/perf-scheme-wizard.html`：设置弹窗恢复展示「结果审定」；与「绩效盘点」互斥——开启其一则关闭另一项并 toast 提示；年度默认仍为面谈→盘点→确认（审定默认关）；侧栏/表单区随勾选显隐同步。

## 2026-09-21 九宫格看板名称旁展示系统默认序号

- `current/perf-scheme-wizard.html`：九宫格看板每格名称 input 旁增加只读 **系统默认序号 1–9**（与 `BOX_KEYS_ORDER` / `nineBox` 顺序一致，如「老黄牛」=4），不参与名称编辑。

## 2026-09-21 方案向导九宫格改为 3×3 看板

- `current/perf-scheme-wizard.html`：绩效盘点「九宫格格子命名与绑定」由表格改为可编辑 **3×3 看板**（色块/轴标签对齐 `demo-yearly-tr`：纵轴绩效上高→下低，横轴能力左低→右高）；格内改名与绑定绩效等级×能力，仍写入 `nineBox`；换绩效等级规则时选项同步。

## 2026-09-21 九宫格绑定改为具体绩效等级名

- `current/perf-scheme-wizard.html`：盘点九宫格表「绩效档」改为 **绩效等级** 下拉（选项=方案所选「绩效等级」规则的包含等级）；能力侧仍为高/中/低。state 字段 `perf` → `perfGrade`（`key`=`perfGrade-capability`）。默认九格按坐标轴映射：高→远超预期/超出预期、中→符合预期±、低→低于/远低预期（对齐 `demo-yearly-tr` `gradesForBand`）；切换绩效等级规则时重建默认九格。

## 2026-09-21 方案向导：绩效/能力等级 + 盘点强制分布与九宫格

- `current/perf-scheme-wizard.html`：基本信息区原「强制分布规则」区块标题改为 **绩效/能力等级**（其下仍为绩效等级 / 盘点能力规则）。
- 绩效盘点环节配置新增 **盘点强制分布规则绑定**（绩效强制分布、能力强制分布下拉 + 说明，写入 stage `perfForcedDistRule` / `capForcedDistRule`）与 **九宫格**（九格命名 + 绩效等级×能力高/中/低绑定，默认格名复用 `demo-yearly-tr.html` 的 `BOX_NAMES`，写入 `nineBox`；绩效侧字段见同日「九宫格绑定改为具体绩效等级名」）。

## 2026-09-21 方案向导去掉「系统计算初评等级」

- `current/perf-scheme-wizard.html`：绩效盘点环节配置移除「是否系统计算初评等级」开关及 `calcInitialGrade` 默认值/归一化/`toggleInventoryCalc` 分支；保留「是否系统计算初评能力」。

## 2026-09-21 方案向导：盘点能力规则 + 年度无审定

- `current/perf-scheme-wizard.html`：年度绩效模板默认环节 **面谈 → 盘点 → 确认**（设置弹窗隐藏独立「结果审定」；月度仍保留审定）。
- 基本信息「强制分布规则」区：标签「等级规则 *」改为「绩效等级 *」；开启「绩效盘点」时其下增加「盘点能力规则」下拉（mock「标准三档能力」）+「包含能力」高/中/低 chips；关闭盘点则隐藏（仅规则选择与档位展示，无强制分布比例算法）。

## 2026-09-21 审定「调整等级」补回等级说明文案

- `current/manager/demo-yearly-tr.html`：右冻结「调整等级」列取消隐藏 `.star-desc`；文案沿用月度逐级审定 `STAR_DESC_RATIFY`（同源 `demo-ratify-direct.html` / `demo-ratify-hierarchy.html`）；列宽 148→180px 以容纳说明换行。星级逻辑与等级枚举未改。

## 2026-09-21 年度 TR：去掉上一步 + 下一步必填点名

- `current/manager/demo-yearly-tr.html`：删除 `#prevBtn`「上一步」及显示逻辑；步骤条改为不可点击（三步不可回退，仅经主按钮前进）。
- 同页 `#primaryBtn`/`requestPrimary`：切步/提交前必填校验并 toast 点名未填人（审定=`ratifyGrade`+跨两档原因；盘点/九宫格=`capability`；提交另加强制分布强控）；Mock 审定仅留秦明涛/许恒勇/王波蝶未填等级便于演示。

## 2026-09-21 页头摘要去掉环节文案

- `current/manager/demo-yearly-tr.html`：`pg-hd-summary` 移除 `#stepSummary`（「逐级上级 · 绩效审定」等）及分隔符 `|`；同步删除切步/审批模式中对 `stepSummary` 的赋值；保留「2026年度」。

## 2026-09-21 审定/盘点列表增加「部门」列

- `current/manager/demo-yearly-tr.html`：`#memberHead` 在 `th.col-status`「提交状态」左侧增加「部门」；`#memberBody` 展示 `MEMBERS.dept`；不冻结，随滚动区与 status 同区；`renderHead` / `renderMembers` 审定与盘点同源同步。

## 2026-09-21 能力分布图补充 ECharts 数据结构

- 新增 `current/manager/cap-bars-echarts-data.js`：`buildCapBarsEchartsOption(stats)` 从 `getCapDistData()` 组装 bar+调整前/标准折线（区间用 min–max markArea，标准点用 mid）；不改现有 `#capBars` 自定义渲染。

## 2026-09-21 审定列表去掉「考核得分」；司龄改名

- `current/manager/demo-yearly-tr.html`：团队成员审定列表删除 `th.col-score`「考核得分」及对应单元格；清理仅服务该列的宽度 CSS。盘点列表 / 九宫格未改。
- 同表被考核人 hover 标签「司龄」改为「累计司龄(年)」（仅展示文案，字段与取值不变）。

## 2026-09-20 九宫格列表增加「提交状态」列

- `current/manager/demo-yearly-tr.html`：`#boxListView` / 全屏格子列表在「绩效等级」左侧增加「提交状态」列，复用 `submitTagHtml`（未到达/待提交/已提交）。

## 2026-09-20 审定/盘点列表「调整记录」列拆分

- `current/manager/demo-yearly-tr.html`：审定列表 `th.col-level`「最近审定」改为「调整记录」（单元格结构不变）。
- 人才盘点列表：`th.col-init-cap`「初评能力」仅保留能力 chip；右侧新增「能力调整记录」列（节点｜姓名｜工号 + from→to，跨 2 档展示原因）。

## 2026-09-20 最近审定展示跨两档调整原因

- `current/manager/demo-yearly-tr.html`：「最近审定」`div.ratify-last` 在跨 2 档且有 `adjustReason` / `lastRatifyAdj.reason` 时增加第三行「原因：xxx」；跨档弹窗确认写入同源字段；Mock 若干人预置原因便于演示。

## 2026-09-20 测评结果导入页头对齐初评等级导入

- `current/manager/demo-assess-batch-import.html`：去掉 `#activityContext` 长说明；页头改为 `pg-hd-top`（标题 + 活动摘要 + 下载模板/导入Excel/提交）；标题 / document.title / 面包屑 / GHR_NAV 统一为「测评结果导入」。
- `current/perf-scenario-nav.html`、`current/demo-index.html`：入口文案同步为「测评结果导入」。

## 2026-09-20 初评等级导入页标题精简

- `current/manager/demo-grade-batch-import.html`：页标题 / document.title / 面包屑 / GHR_NAV 统一为「初评等级导入」。
- `current/perf-scenario-nav.html`、`current/demo-index.html`：入口卡片标题同步为「初评等级导入」。

## 2026-09-20 初评等级批量导入页头对齐通用表头

- `current/manager/demo-grade-batch-import.html`：去掉 `#activityContext` 长说明；页头改为与表单页一致的 `pg-hd-top`（标题 + 活动摘要 + 下载模板/导入Excel/提交）。

## 2026-09-20 年度绩效面谈页头精简

- `current/employee/demo-interview-employee.html`：标题改为「年度绩效面谈」（同步 document.title / 面包屑 / GHR_NAV）；去掉 `pg-hd-info`；去掉「•••」更多与保存草稿；摘要改为「周期｜被考核人姓名」；仅保留提交。

## 2026-09-20 绩效面谈表页头对齐目标制定

- `current/employee/demo-interview-employee.html`：页头改为与目标制定页一致的吸顶标题栏；周期/面谈类型/填写中并入摘要；提交主按钮 + 「•••」更多（保存草稿）；考核方案等 6 项信息栅格保留在标题栏下方、随滚动收起。

## 2026-09-20 跨档调整必填原因 + 九宫格操作列横排

- `current/manager/demo-yearly-tr.html`：调整等级 / 校准能力当 `|新档-旧档|>=2` 时复用校准 Modal 强制填写调整原因；确认后写入 `adjustReason` / `adjHist`，取消不落档。
- 九宫格列表与全屏列表操作列：「调整」「调整记录」统一 `btn btn-s btn-sm`，`action-stack` 改为横向排列。

## 2026-09-20 确认页面谈内容去掉月度结果展示

- `current/employee/demo-confirm-employee.html`：只读「面谈内容」去掉「月度绩效结果展示」12 个月卡片；保留标题、飞书链接、飞书总结截图；员工填写页不动。

## 2026-09-20 结果确认页：得分明细 → 面谈内容；清理面谈上级/移动确认入口

- `current/employee/demo-confirm-employee.html`：去掉「得分明细」表，同位置改为只读「面谈内容」（飞书链接、飞书总结截图），对齐员工面谈页结构。
- 删除「确认面谈结果」入口与 `manager/demo-interview-direct.html`（得分明细不在该页，按原计划删页）。
- 删除「移动端确认结果」入口与 `employee-mobile/mobile-confirm.html`。
- 同步清理 `perf-scenario-nav.html`、`demo-index.html`、`demo-feishu-notify.html` 残留链接。

## 2026-09-20 申诉弹窗去掉指标勾选

- `current/employee/demo-confirm-employee.html`：绩效结果申诉弹窗删除 `#appealItemList` KPI/KPA 勾选列表与「已选 N 项」；提交仅校验申诉原因（≥10 字）；异议按钮提示改为「请填写申诉原因」（不再提异议项）。
- 不以移动端确认页同步（该页已按删除意图移除）。

## 2026-09-20 员工面谈表字段调整（飞书纪要）

- `current/employee/demo-interview-employee.html`：去掉面谈确认、点三个赞、拍三个转、下阶段规划、需要的支持、附件；保留月度绩效结果展示与审批流程；在月度结果下方新增必填「飞书链接」「飞书总结截图」（含 Mock 预览与提交校验）。

## 2026-09-20 场景导航清理：面谈移动端 + HRBP + 逐级校准/COE审批

- 删除「HRBP 审批」入口与 `manager/demo-ratify-hrbp.html`。
- 年度「逐级上级审批」改名为「逐级校准」；其下新增「COE/CHO 审批」→ `manager/demo-yearly-tr-approve.html`（`demo-yearly-tr.html?mode=approve`，九宫格只读 + 通过/驳回）。
- 删除「移动端确认面谈」与 `manager-mobile/mobile-interview-direct.html`。
- 删除「移动端填写面谈」与 `employee-mobile/mobile-interview.html`。

## 2026-09-20 九宫格列表「调整记录」

- `current/manager/demo-yearly-tr.html`：操作列在「调整」下增加「调整记录」，弹窗展示该员工历次调整（时间/操作人/类型/从→到/原因）；无记录空态；全屏格子列表共用。

## 2026-09-20 导入年度绩效初评等级

- `current/manager/demo-grade-batch-import.html`：新建初评等级批量导入页（工号/姓名核对 + 初评等级枚举校验，结构对齐测评导入）。
- `current/perf-scenario-nav.html`：年度视角「管理者/上级」列在「导入测评结果」上方增加「导入年度绩效初评等级」。
- `current/demo-index.html`：补初评等级批量导入入口。

## 2026-09-20 盘点结果报表精简

- `current/perf-report-inventory-result.html`：去掉顶部统计卡片、页头说明、「只看异常」、tbl-head 右侧数据截止说明与提交状态筛选；考核组左侧加年份/周期/绩效活动；去掉提交状态、考核得分、初评等级、最近审定、本节点是否调整、异常类型、上年盘点结果列。

## 2026-09-20 测评结果报表精简

- `current/perf-report-assessment-result.html`：去掉顶部卡片统计、页头说明与「去导入」；考核组左侧加年份/周期/活动名称；去掉测评工具/批次/360得分排名/测评等级/导入状态列；导入时间改为更新时间；仅展示已导入数据；tbl-head 只留「测评结果明细」。

## 2026-09-20 九宫格分布达标提示 + 列表列合并

- `current/manager/demo-yearly-tr.html`：`box9-hd` 增加绩效/能力是否符合强制分布提示（按筛选人数对照 `FORCE_DIST`/`CAP_FORCE`，拖人后刷新）；列表「调整历史」「调整原因」合并为「调整历史/原因」。

## 2026-09-20 侧栏「盘点/测评结果」可见性复核

- 根因：截图来自旧版 `navigation.js`（GitHub Pages / 浏览器缓存仍是 4 项：目标中心→绩效报表）；工作区 `navigation.js` 早已含两项，但未部署时线上侧栏不会出现。
- `current/navigation.js`：`绩效报表` 分组 children 在「绩效报表」下为「盘点结果」「测评结果」（`perf-report-inventory-result.html` / `perf-report-assessment-result.html`）。
- `current/perf-report-*.html`：`navigation.js?v=20260920-inv-assess` 强制刷新侧栏脚本，避免缓存旧菜单。
- 本地实测：等级分布 / 盘点结果 / 测评结果三页侧栏均渲染 6 项，当前页高亮正确。

## 2026-09-20 报表导航补全场景导航与总览入口

- `current/perf-scenario-nav.html`：绩效报表区增加「盘点结果」「测评结果」入口。
- `current/index.html`：V5 区增加盘点结果 / 测评结果卡片。

## 2026-09-20 侧栏新增盘点结果 / 测评结果报表

- `current/navigation.js`：绩效报表组在「绩效报表」下增加「盘点结果」「测评结果」。
- `current/perf-report-inventory-result.html`：盘点结果报表（审定/能力/九宫格闭环字段）。
- `current/perf-report-assessment-result.html`：测评结果报表（360/测评导入字段）。

## 2026-09-20 提交状态统一三档

- `current/manager/demo-yearly-tr.html`：提交状态全步骤统一为「未到达 / 待提交 / 已提交」（去掉「已到达」）；`#statusFilter`、列表 chip、统计 strip/图例与 Mock `status` 字段对齐人才盘点写法；原已到达按 `PENDING_SUBMIT` 映射为待提交或已提交。

## 2026-09-20 状态列改名「提交状态」

- `current/manager/demo-yearly-tr.html`：列表 `th.col-status`、筛选 `#statusFilterLabel`、统计 strip `aria-label` 中「状态/到达状态」统一为「提交状态」；枚举值（已到达/未到达/已提交等）不变。

## 2026-09-20 最近审定/初评能力调整历史

- `current/manager/demo-yearly-tr.html`：「最近审定」改为两行（节点｜姓名｜工号 + 等级 from→to）；「初评能力」保留 chip，有调整时下方同结构展示能力调整历史。

## 2026-09-20 chip tip 增加上年盘点结果

- `current/manager/demo-yearly-tr.html`：九宫格人员芯片 hover 卡片增加「上年盘点结果」列（格子序号 1–9）；成员 Mock 增加 `prevBox`。

## 2026-09-20 已调 icon + 能力选中分色 + 原格数字标

- `current/manager/demo-yearly-tr.html`：姓名旁「已调」改为红色编辑 icon（title 保留）；校准能力选中高绿/中橙/低红；九宫格芯片「原N」改为灰底白字数字标（拖回原格仍隐藏）。

## 2026-09-20 本节点已调标识 + 下一步确认 + 原格角标

- `current/manager/demo-yearly-tr.html`：被考核人列「已调」pill；校准能力/等级/九宫格调整写入 `nodeAdjusted`；下一步二次确认列出已调人员；芯片显示「原N」（本节点进入时格子）；`.cap-opt.on` 红底白字；逐级审定合并为「最近审定」单列。

## 2026-09-20 九宫格全屏 + 按空间铺满

- `current/manager/demo-yearly-tr.html`：九宫格标题栏增加整图全屏；每格标题旁可单格全屏；收起态按格子可放空间尽量展示人员，放不下才出 `+N`，点击进入该格全屏看完整名单；筛选栏增加「只看异常」开关（步骤3）；列表/单格全屏右侧「调整」与拖拽共用校准弹窗（目标格子+等级+原因）；去掉 chip 点击卡片，异常信息在 hover 展示，「调整格子…」在 hover 卡片触发。

## 2026-09-20 方案向导增加「绩效盘点」环节

- `current/perf-scheme-wizard.html`：考核阶段新增「绩效盘点」（能力评价与九宫格校准）；侧栏导航随启用状态出现；环节配置含绑定流程模型、自动开始、结束规则，以及「是否系统计算初评等级 / 初评能力」开关；年度绩效模板默认包含该环节（在结果审定与结果确认之间）。

## 2026-09-18 九宫格真正撑满视口

- `current/manager/demo-yearly-tr.html`：根因是 `#ct > .ct` 为 block，stepWork 的 flex:1 失效；改为 flex 列高度链 + `#boxGrid` `1fr 1fr 1fr`，底行贴齐右栏底；去掉写死 px 高度。
- `current/manager/demo-assess-batch-import.html`：测评结果批量导入（360/测评字段）已就绪。

## 2026-09-18 测评结果批量导入 + 九宫格撑满

- `current/manager/demo-assess-batch-import.html`：新建测评结果批量导入页（360 0–5 / 测评 0–10，排名重算，门禁与提交校验）。
- `current/perf-scenario-nav.html`、`current/demo-index.html`：在「逐级上级审批」上方增加「导入测评结果」入口。
- `current/manager/demo-yearly-tr.html`：九宫格 `#boxGridView` 用 grid 行 `1fr` 撑满左栏剩余高度，底行贴底无大块留白。

## 2026-09-18 审定「调整等级」列收窄

- `current/manager/demo-yearly-tr.html`：绩效审定右冻结列由 22% 改为约 148px，贴合星级+等级文案。

## 2026-09-18 统计切换互斥 + 柱行加高 + 右栏底色撑满

- `current/manager/demo-yearly-tr.html`：表格/图表切换改为真正互斥；`.cap-bar-row` 加高左对齐；`.list-stats-col` 底色占满右列。

## 2026-09-18 年度盘点页撑满内容区

- `current/manager/demo-yearly-tr.html`：压缩 `.ct` 四周留白（约 8–10px），内容区高度吃满壳内主工作区；名单/九宫格高度跟视口收紧。

## 2026-09-18 九宫格右栏双域切换 + 柱色 + 阶段更名

- `current/perf-scenario-nav.html`：年度视角阶段 5 标题改为「绩效&盘点逐级审定」。
- `current/manager/demo-yearly-tr.html`：九宫格右栏同时展示绩效+能力，表格/图表一键切换；7 档柱按符合/不符合绿红；高中低柱按是否落入标准区间绿红；盘点规则弹层保留。

## 2026-09-18 盘点规则查阅弹层

- `current/manager/demo-yearly-tr.html`：页头增加「盘点规则」按钮；弹层展示 `yearly-tr-rules-2026.jpg`（2026年度人才盘点说明），支持滚动/遮罩/Esc 关闭。

## 2026-09-18 审定「被考核人」表头双轴固定

- `current/manager/demo-yearly-tr.html`：`#evalScroll` 为唯一滚动容器；`th.col-freeze-l` sticky left+top、不透明底与更高 z-index，竖滚横滚标题均固定。

## 2026-09-18 异常状态四枚举对齐

- `current/manager/demo-yearly-tr.html`：异常状态仅保留「绩效跨2档调整 / 能力跨2档调整 / 校准次数≥2次 / 九宫格校准调整」。

## 2026-09-18 审定改为多列逐级审定

- `current/manager/demo-yearly-tr.html`：去掉「双线上级逐级调整等级」单列；改为动态「逐级审定1…N」（最多8，N=筛选集最大深度）；原双线意见并入第1级；「调整等级」星级列保留并维持约148px。

## 2026-09-18 九宫格异常改用指定告警 SVG

- `current/manager/demo-yearly-tr.html`：异常 chip 前置图标换成用户提供的橙色告警灯 SVG（#f5a623）；边框改为浅琥珀。

## 2026-09-18 九宫格异常改用警告图标

- `current/manager/demo-yearly-tr.html`：chip 前置「异」字改为红色警告三角 SVG；弹层同步；列表异常状态仍用文字类型。

## 2026-09-18 九宫格 chip 异常前置、去掉头像

- `current/manager/demo-yearly-tr.html`：异常「异」改为姓名前内联标记；九宫格 person-chip 去掉姓名字头像圆标。

## 2026-09-18 九宫格异常人员标识

- `current/manager/demo-yearly-tr.html`：mock 增加 `abnormalType`/`abnormalReason`；九宫格 chip 右上角「异」红标；列表在格子旁增加异常状态/异常原因列；悬停 tip 与点击弹层同步展示。

## 2026-09-18 九宫格格子序号展示

- `current/manager/demo-yearly-tr.html`：格子标题与列表「格子」列统一为「1️⃣ 领头羊」…「9️⃣ 寄居蟹」格式，右侧人数不变。

## 2026-09-18 九宫格增加列表视图

- `current/manager/demo-yearly-tr.html`：九宫格标题栏增加「九宫格 | 列表」切换；列表展示筛选范围内被考核人/绩效等级/能力/格子/调整历史/调整原因，人名 hover 同盘点；拖放仍仅九宫格视图。

## 2026-09-18 内容卡标题栏高度统一

- `current/manager/demo-yearly-tr.html`：`.eval-list-hd` 与 `.box9-hd` 统一为 44px 高、同内边距/字号/底边，三步标题栏一致。

## 2026-09-18 能力图收紧高度

- `current/manager/demo-yearly-tr.html`：3 档能力图按内容高度（不吃满剩余空白）；7 档等级图仍可撑满。等级表行距保持加大；折线随布局重测对齐。

## 2026-09-18 等级表行距加大

- `current/manager/demo-yearly-tr.html`：右栏 `dist-status-table` 行上下间距加大；分布图仍吃满剩余高度，折线随布局重测对齐。

## 2026-09-18 右栏撑满高度并校正折线对齐

- `current/manager/demo-yearly-tr.html`：右栏 `#capBars` / `.cap-bars-plot` 吃满剩余高度、无滚动；折线按条轨 DOM 重测（双 rAF + ResizeObserver），对齐各行中心。

## 2026-09-18 审定星级请选择 / 右栏无滚动 / 九宫格调整弹窗

- `current/manager/demo-yearly-tr.html`：未选调整等级显示「请选择」且星全灰；已选按星级点亮并显示对应等级色文案。右栏 `.list-stats-col` 压紧条/表/分布，默认无纵向滚动。九宫格拖放先弹窗必填调整原因；跨绩效档另必填调整后绩效等级，取消则不落格。

## 2026-09-17 右栏统计浅底色

- `current/manager/demo-yearly-tr.html`：三步右侧 `.list-stats-col` / `#distExpanded` 使用 `--pr50` 浅蓝底（非灰），与左侧白底列表轻微分隔，保留竖线。

## 2026-09-17 九宫格轴标签高中低配色

- `current/manager/demo-yearly-tr.html`：九宫格「能力 ·」「绩效 ·」前缀保持中性色；仅「高/中/低」分别用绿（`--em`）/橙（`--ac`）/红（`--ro`）。

## 2026-09-17 远超/超出预期改为绿色

- `current/manager/demo-yearly-tr.html`：「远超预期」「超出预期」配色改为 `--em` 绿系（与能力「高」一致），覆盖列表、星标、右栏标签与分布条。

## 2026-09-17 审定名单精简与九宫格一屏铺满

- `current/manager/demo-yearly-tr.html`：审定名单仅保留被考核人/状态/考核得分/初评等级/双线上级逐级调整等级/调整等级，其余信息进 hover；九宫格固定填满左栏一屏，人多显示前 6 人 +「+N」展开。

## 2026-09-17 三步统一左右分栏布局

- `current/manager/demo-yearly-tr.html`：审定 / 盘点 / 九宫格均为「左内容 | 右统计」同壳；右栏约 300px。审定右栏为等级分布（调整前/标准全局、当前随筛选）；九宫格右栏复用能力分布条与表。

## 2026-09-17 三步筛选与内容卡布局统一

- `current/manager/demo-yearly-tr.html`：审定 / 盘点 / 九宫格共用独立 `#distFilters` 白卡（在内容卡上方）；九宫格改为与名单一致的标题栏+内容区内边距；去掉嵌入式筛选样式。

## 2026-09-17 盘点统计全局基准与未填写联动

- `current/manager/demo-yearly-tr.html`：灰线「调整前」/蓝线「标准」与表「要求」按全量已到达固定；实心条「当前」与「实际/调整」随筛选变。「只看未填写」挪到筛选栏，筛无校准能力者；待提交拆未填写/已填写 mock；已提交锁定校准能力。

## 2026-09-17 图例改圆点并加只看未填写

- `current/manager/demo-yearly-tr.html`：能力图例改为灰/蓝圆点 + 三色小条；名单标题栏右侧增加「只看未填写」开关（默认关，开则筛「待提交」），mock 待提交增至 8 人便于演示。

## 2026-09-17 能力图例改色标且虚线更疏

- `current/manager/demo-yearly-tr.html`：灰/蓝虚线改为 `1 5`；图例改为灰虚线样/蓝虚线样/三色小条 +「调整前·标准·当前」，不再写「灰」「蓝」字。

## 2026-09-17 能力虚线更疏

- `current/manager/demo-yearly-tr.html`：右栏灰/蓝虚线改为更疏的 `1.5 4.5`（短划长大间隔）。

## 2026-09-17 能力灰蓝曲线改为虚线

- `current/manager/demo-yearly-tr.html`：右栏灰（调整前）/蓝（标准）平滑曲线改为虚线（`stroke-dasharray`）；圆点与实心条不变。

## 2026-09-17 能力灰蓝线改为平滑曲线

- `current/manager/demo-yearly-tr.html`：右栏灰（调整前）/蓝（标准）由折线改为 Catmull-Rom→三次贝塞尔平滑曲线，仍过高等级点；圆点与实心条不变。

## 2026-09-17 能力条叠加灰/蓝折线

- `current/manager/demo-yearly-tr.html`：右栏分布改为实心条=当前，SVG 灰折线串高→中→低「调整前」、蓝折线串「标准」（要求区间中点）；小圆点标注；图例「灰=调整前 · 蓝=标准 · 实心条=当前」；无 Chart.js。

## 2026-09-17 能力条同时呈现要求与调整前

- `current/manager/demo-yearly-tr.html`：右栏横向条增强——浅蓝要求区间（两端刻度）、空心条=调整前（`initCapability`）、实心色条=当前（`capability`）；右侧淡字/粗字对照人数；一行极简图例；无 Chart.js。

## 2026-09-17 右栏加回简洁能力分布条

- `current/manager/demo-yearly-tr.html`：表格下方恢复高/中/低横向条（实际人数着色 + 淡色要求区间），无 Chart.js、无图例，适配约 300px 右栏。

## 2026-09-17 360与测评得分区间校正

- `current/manager/demo-yearly-tr.html`：360 得分 mock 改为 0–5（一位小数），测评得分改为 0–10；排名仍按分值排序。考核组与调整列 +N/−N/— 保持。

## 2026-09-17 考核组改为专员主管与基层干部

- `current/manager/demo-yearly-tr.html`：考核组筛选仅保留「全部 / 专员/主管 / 基层干部」；名单 mock 的 `group` 同步；右栏「调整」列继续按要求显示 +N/−N/—。

## 2026-09-17 能力表调整列改为调入调出差

- `current/manager/demo-yearly-tr.html`：右栏「调整」列按要求区间显示 +N（调入）/ −N（调出）/ —（已符合），随筛选与校准实时更新。

## 2026-09-17 修复盘点右栏宽度并去重

- `current/manager/demo-yearly-tr.html`：右栏改为独立 `list-side-panel`（固定约 300px），避免 `dist-grid` 4fr/6fr 把内容压成约 128px；去掉与能力表重复的横向条，仅保留提交状态三格 + 能力表。

## 2026-09-17 提交状态并入右栏统计

- `current/manager/demo-yearly-tr.html`：去掉名单标题旁摘要；右栏自上而下为提交状态三格（可点筛选）→ 能力表 → 横向分布条，形成「人到哪了 → 能力怎么调 → 分布怎样」一条叙事。

## 2026-09-17 盘点右栏改为横向能力条

- `current/manager/demo-yearly-tr.html`：第二步去掉 Chart.js 混搭柱线图，改为高/中/低横向条（当前人数着色 + 要求文案 + 较初评差值），高度跟内容走，与上方能力表同源数据。

## 2026-09-17 盘点名单列均分并与标题左对齐

- `current/manager/demo-yearly-tr.html`：第二步 8 列按名单区宽度均分（去掉 88px 定宽）；「被考核人」文字与「团队成员盘点」同左缘；校准能力列够放下高/中/低，左右仍冻结。

## 2026-09-17 盘点左右冻结列等宽

- `current/manager/demo-yearly-tr.html`：第二步「被考核人 / 校准能力」冻结列统一 88px，收紧高/中/低分段按钮内边距，去掉右侧多余空白。

## 2026-09-17 人才盘点提交状态文案对齐

- `current/manager/demo-yearly-tr.html`：`#statusFilter` 改为由 `syncStatusFilter` 按步骤注入（第二步固定未到达/待提交/已提交，默认已提交）；名单摘要按提交状态计数；九宫格弹层「调整能力」改为「校准能力」。

## 2026-09-17 人才盘点名单与右栏精简

- `current/manager/demo-yearly-tr.html`：第二步去掉「列表统计 / 盘点分布」kicker、到达 pill 与较初评说明；右表保留能力|要求|实际|调整；`#chartCap` 柱更窄；名单仅保留被考核人（工号）/提交状态/360/测评/初评与校准能力，其余信息悬停卡片；筛选改为提交状态（未到达/待提交/已提交）；左右冻结与隐藏滚动条、单卡竖线布局保持。

## 2026-09-17 盘点名单滚动条隐藏

- `current/manager/demo-yearly-tr.html`：第二步名单区 `#evalScroll` 横竖滚动条不再显示，触控板/滚轮仍可滚动，左右冻结列保持。

## 2026-09-17 修复列表统计被名单表宽撑破

- `current/manager/demo-yearly-tr.html`：第二步右栏「列表统计」不再套用名单表 `min-width:1080px`。已到达/未到达并排小卡，调整能力初评/调整人数和「较初评」都收在约 320px 列内。

## 2026-09-17 盘点名单与统计合成一张卡

- `current/manager/demo-yearly-tr.html`：第二步「团队成员盘点」与盘点统计合成一张白卡片，中间只留 1px 竖线，只保留一个标题；右栏仍是上列表统计、下盘点分布。冻结列与名单撑满保持。

## 2026-09-17 盘点右侧改为列表统计+分布图

- `current/manager/demo-yearly-tr.html`：第二步右侧上方改为当前名单的列表统计（到达人数、能力初评/调整、较初评升降），下方保留盘点分布图；面板标题改为「盘点统计」。名单每页 20 人撑满高度，「被考核人」左冻、「调整能力」右冻。

## 2026-09-17 盘点名单撑满并左右冻结列

- `current/manager/demo-yearly-tr.html`：第二步名单每页 20 人，撑满列表高度。横向滚动时「被考核人」钉在左侧、「调整能力」钉在右侧，高/中/低仍可点。

## 2026-09-17 系统底色改浅暖白

- `memory/conventions.md`、`current/navigation.js`、`current/` 各页：页面底色 `--bg` 从 #F5F5F4 改为 #FAFAF9，卡片仍为白底，减少发灰感。

## 2026-09-17 人才盘点改为左名单右图

- `current/manager/demo-yearly-tr.html`：第二步「人才盘点」改为左右结构——左侧团队成员盘点名单（列不变，仅调整能力可改），右侧上下排列绩效分布、盘点分布两图；筛选仍在名单上方。第一步、第三步布局不变。

## 2026-09-16 九宫格人员悬停看信息

- `current/manager/demo-yearly-tr.html`：九宫格人名悬停即看姓名、工号、部门、职位、职级、司龄、考核组、绩效等级、能力、九宫格，卡片贴在人名旁不挡视口；不挡拖拽，点选仍改能力。已去掉格子图例，第三步筛选在「九宫格分布」标题下方。

## 2026-09-16 去掉九宫格图例并把筛选放到标题下

- `current/manager/demo-yearly-tr.html`：去掉「九宫格分布」下的格子图例。第三步把考核组/部门/划分区域/到达状态筛选挪到标题和九宫格之间；前两步筛选仍在名单上方。

## 2026-09-16 寄居蟹格子改为红色

- `current/manager/demo-yearly-tr.html`：九宫格「寄居蟹」（绩效低·能力低）与空心竹、老爷车同为红底红边。

## 2026-09-16 第三步分布改为绩效+盘点两图

- `current/manager/demo-yearly-tr.html`：九宫格步骤顶部「绩效与能力分布」改为并排两张图（绩效分布、盘点分布），不再做绩效×能力交叉图。其余九宫格命名/配色、盘点列、侧栏收起保持。

## 2026-09-16 年度九宫格命名配色、盘点列与侧栏收起

- `current/manager/demo-yearly-tr.html`：九宫格仍为 3×3。格名改为领头羊 / 穿山甲 / 老黄牛 / 白龙马 / 工蜜蜂 / 空心竹 / 水上漂 / 老爷车 / 寄居蟹。绿：领头羊、穿山甲、白龙马；蓝：工蜜蜂、老黄牛、水上漂；红：空心竹、老爷车。面板标题「九宫格分布」，去掉说明。能力图为当前柱（高绿中橙低红）+调整前折线+要求折线；左表为能力｜要求｜实际｜是否符合。人才盘点列为被考核人｜部门｜职位｜职级｜考核组｜到达状态｜360得分｜360排名｜测评得分｜测评排名｜初评能力｜调整能力，仅调整能力可改。
- `current/navigation.js`：左侧栏增加收起/展开，收成图标轨，状态写入 localStorage。

## 2026-09-16 年度盘点改为审定+能力+九宫格

- `current/manager/demo-yearly-tr.html`：年度逐级审定改为独立三步页。第一步沿用原审定表单；第二步同样布局，评价改为能力高/中/低；第三步九宫格按绩效×能力校准，可拖动或点选改能力，分布默认收起。
- `current/perf-scenario-nav.html`：年度视角「逐级上级审批」入口改指新页。

## 2026-09-16 业务场景员工视角拆开半年度和年度

- `current/perf-scenario-nav.html`：员工视角顶栏由「半年度/年度」拆成两个独立 tab。半年度只展示前置准备→面谈；年度展示面谈→审定→确认。下方周期条改为当前周期说明，不再互相切换。

## 2026-09-14 公式标题栏增加复制粘贴

- `current/perf-base-calc.html`：公式编辑器标题右侧增加「复制」「粘贴」。复制整段当前公式；粘贴覆盖编辑区内容。无内容时给出提示。

## 2026-09-14 计算规则改为独立编辑页并增加试算

- `current/perf-base-calc.html`：新增/编辑由弹窗改为独立页面，按现网计算规则结构提供可折叠的基本信息、公式设置、左侧字段/函数区、右侧公式编辑器及底部返回/保存操作。
- 公式编辑器增加试算链路：按当前公式自动识别参数，输入后可计算并显示结果；补齐空参数、除数为零、未知字段/函数及无效表达式提示，公式变化时同步清理旧试算状态。

## 2026-09-11 活动详情人员统计并入当前环节

- `current/perf-activity-detail.html`：去掉工具栏旁独立五段人数统计；并入「当前环节」卡片，默认只显示考核人数与完成率。悬停整块只出一张白底卡：上半人员统计为考核人数 / 进行中 / 已完成 / 流程异常 / 未开始，下半全局环节进度。

## 2026-09-10 考核进度视图 tab 改为活动

- `current/perf-report-progress.html`：第三个视图 tab 文案由「绩效活动」改为「活动」。

## 2026-09-10 考核进度去掉顶部统计卡片

- `current/perf-report-progress.html`：去掉目标提交率、目标完成率、自评提交率、审定完成率、结果确认完成率五张统计卡片。表格、筛选、视图 tab、看板设置保留。

## 2026-09-10 看板设置绑定流程改下拉多选

- `current/perf-report-progress.html`：五个环节的流程勾选改为下拉多选，未选显示「请选择流程」。选中后才展开该流程的节点设置（目标制定、绩效考核分流程各一块；面谈/审定/确认无节点）。默认不预选流程。

## 2026-09-10 看板设置第二节标题改为绑定流程

- `current/perf-report-progress.html`：看板设置弹窗第二节标题由「流程绑定规则」改为「绑定流程」。

## 2026-09-10 看板设置第一节标题改为列显示设置

- `current/perf-report-progress.html`：看板设置弹窗第一节标题由「列」改为「列显示设置」。

## 2026-09-09 看板设置节点改下拉多选

- `current/perf-report-progress.html`：制定中/审批中、自评/考核人评分的节点绑定改为下拉多选。关闭时显示已选节点名（两项内用顿号，三项及以上显示已选 N 项），未选显示「请选择节点」；点开列出该流程全部节点，点外部关闭。取消勾选流程后下拉隐藏。

## 2026-09-09 看板设置由用户勾选列绑定节点

- `current/perf-report-progress.html`：节点不再预分到列。已勾选流程下，目标制定的制定中/审批中、绩效考核的自评/考核人评分各出一块，块内列出该流程全部节点，由用户勾选计入该列；默认全不勾，可一列不绑或同节点绑多列。取消勾选流程后绑定块隐藏。

## 2026-09-09 看板设置列横排、节点按流程分块双列

- `current/perf-report-progress.html`：「列」勾选改为横向排列。流程绑定规则里每个流程下方只列该流程自己的节点，按制定中/审批中或自评/考核人评分分组；取消勾选流程后节点块隐藏。节点块双列，文案只显示节点名。

## 2026-09-09 考核进度看板设置增加流程绑定

- `current/perf-report-progress.html`：设置弹窗改名为「看板设置」。上半是「列」勾选；下半是「流程绑定规则」，按环节勾选预置流程。仅目标制定的制定中/审批中、绩效考核的自评/考核人评分显示节点勾选，其它列不绑节点。流程/节点名称对齐飞书《预置表单字段&权限》。

## 2026-09-08 V6 AI 表单浮球对话重做

- 按飞书《AI 表单增强》重做目标制定、绩效自评、上级评分、结果审定的浮球对话框。
- 共用组件：`current/shared/ai-form-assistant.{css,js}` + 各场景 `ai-scene-*.js`。
- 交互：预置场景 / 键盘 / 文件上传；结果区按模块→目标（审定按考核组→人员）完整展示待填入明细；确认后「填入表单」。
- 说明：`docs/v6/ai-form-assistant-prototype.md`。本改动不进入 V1–V5 Scope。

## 2026-09-07 考核进度活动视图按考核组展开

- `current/perf-report-progress.html`：绩效活动视图活动行可展开考核组；组内人数和完成率只计该活动该组人员，活动行等于各组合计。无考核组的活动不显示箭头。点人数仍按当前活动或考核组打开名单。

## 2026-09-07 考核进度导出下拉与 tab 文案

- `current/perf-report-progress.html`：主表「导出」改为下拉，含「导出视图明细」「导出人员明细」；视图明细导出当前 tab 可见汇总表，人员明细导出当前筛选名单（12 列与弹窗一致）。名单弹窗内导出仍只出当前名单。
- 三个 tab 文案改为「部门 / 划分区域 / 绩效活动」，第一列表头不变。

## 2026-09-07 考核进度分组表头去掉序号

- `current/perf-report-progress.html`：五个环节分组表头和设置弹窗只显示名称，去掉 1–5 序号；箭头仍可收起人数列。

## 2026-09-07 考核进度只冻结第一列

- `current/perf-report-progress.html`：横向滚动只冻结第一列（部门名称 / 划分区域 / 活动名称）；考核人数及后续分组列随表格滚走，不再 sticky。

## 2026-09-07 考核进度筛选控件与三视图

- `current/perf-report-progress.html`：筛选栏去掉活动搜索框，改为漏斗图标加「筛选」浮层；浮层内搜索绩效活动，输入即时生效，确定关闭，已选时按钮显示数量角标。周期、组织、划分区域仍外露，不进浮层。
- 表格增加部门 / 划分区域 / 绩效活动三种视图，只换第一列维度；划分区域可展开下级，绩效活动扁平无箭头。
- 列显隐入口改为齿轮加「设置」，放在导出左侧；表头无勾选，分组显隐仍在设置弹窗。

## 2026-09-07 考核进度列设置与划分区域筛选

- `current/perf-report-progress.html`：表头去掉勾选框，分组显隐改到导出左侧「列设置」弹窗，不勾选则整组不出现。
- 筛选栏在组织旁增加「划分区域」，表格、统计卡和名单按区域过滤，重置一并清空。

## 2026-09-07 考核进度分组勾选与名单弹窗收口

- `current/perf-report-progress.html`：五个环节及考核人数可勾选显隐，默认全选，至少保留一组；箭头仍只收起人数列。
- 各环节组首列增加「参与」；考核人数下「参与考核」改为「参与」。
- 名单弹窗标题固定「考核进度明细」，底栏只留人数，搜索行右侧可导出当前名单。

## 2026-09-07 考核进度考核人数列收窄

- `current/perf-report-progress.html`：考核人数分组下「参与考核 / 未参与」列宽收紧、数字居中；部门列和各环节列不变。

## 2026-09-07 考核进度人数单元格可开名单弹窗

- `current/perf-report-progress.html`：合计行和各部门人数格（含 0、参与/未参与）点击打开同一套名单弹窗；12 列字段补进现有 mock；完成率列不可点。

## 2026-09-07 考核进度人数列改为考核人数分组

- `current/perf-report-progress.html`：参与考核与未参与收成「考核人数」分组；部门名和合计行去掉括号人数。

## 2026-09-07 考核进度筛选栏去掉组织人数统计

- `current/perf-report-progress.html`：筛选栏右侧去掉「X 个组织 · Y 人」，只保留重置。

## 2026-09-07 考核进度增加参与考核列并配色统计卡

- `current/perf-report-progress.html`：部门名称与未参与之间增加「参与考核」列；未参与表头保持「未参与」。统计卡按 0% 灰、低于 60% 橙、60–99% 蓝、100% 绿配色，Q2 mock 与合计行同一口径。目标制定/绩效考核按交错顺序渲染，面谈已完成后有已终止。

## 2026-09-07 考核进度目标提交率移到制定中右侧

- `current/perf-report-progress.html`：目标制定列改为「未开始 / 制定中 / 目标提交率 / 审批中 / 已完成 / 已终止 / 完成率」；收起仍只留完成率类列。已通过映射为已完成，已终止用风险色，未参与列表头保持「未参与」。

## 2026-09-07 考核进度目标制定改为已完成并增加已终止

- `current/perf-report-progress.html`：目标制定「已通过」改为「已完成」，右侧增加「已终止」（风险色）；目标提交率分子为审批中+已完成，完成率分子为已完成；未参与列表头保持「未参与」。

## 2026-09-07 考核进度未参与列表头改名

- `current/perf-report-progress.html`：独立列与弹窗标题「未参与考核」改为「未参与」；计算、mock 和完成率分母不变。

## 2026-09-07 考核进度增加未参与考核列

- `current/perf-report-progress.html`：部门名称与五环节之间增加独立「未参与考核」列（rowspan=2，不进目标制定分组）；完成率分母改为参与考核人数，括号仍为总人数；Q2 五个一级部门各有 1 名未参与人员。

## 2026-09-07 考核进度分组改为绩效考核

- `current/perf-report-progress.html`：分组表头「3 考核进度」改为「3 绩效考核」；页面标题、组 id 和计算不变。

## 2026-09-07 考核进度环节去色、颜色只表示状态

- `current/perf-report-progress.html`：五个环节表头改为中性底，用 1–5 序号和加粗组间分割线区分，不再用蓝/紫/绿/橙/红。
- 颜色只表示状态：未开始 `--c4`、进行中 `--ac`、完成 `--em`、风险/申诉 `--ro`。完成率进度条统一 `--em`，顶部统计卡去掉环节彩边。

## 2026-09-07 考核进度列名整理与一行统计卡

- `current/perf-report-progress.html`：五项统计收进一张横向卡片，项间分割线分隔。
- 目标制定：列「制定中 / 目标提交率 / 完成率」；考核进度去掉评分完成率，绩效完成率改为完成率；结果审定去掉审批中，审定人评级改为进行中（审批中并入），审定完成率改为完成率；结果确认去掉申诉率列，保留申诉人数列。分组与卡片为结果确认 / 结果确认完成率。口径仍按原公式，各环节完成率互不覆盖。

## 2026-09-07 考核进度分组改为结果确认

- `current/perf-report-progress.html`：表格分组表头「员工确认」改为「结果确认」；卡片「员工确认完成率」改为「结果确认完成率」。列名和计算不变。

## 2026-09-07 考核进度增加审定完成率卡片

- `current/perf-report-progress.html`：统计卡增加「审定完成率」，口径与合计行一致（已完成 / 当前筛选人数），放在自评提交率与员工确认完成率之间。

## 2026-09-07 考核进度卡片文案调整

- `current/perf-report-progress.html`：统计卡「完成率」改为「目标完成率」，「绩效自评完成率」改为「自评提交率」；口径不变。

## 2026-09-07 考核进度卡片改名为目标提交率

- `current/perf-report-progress.html`：第一张统计卡文案由「总体目标提交率」改为「目标提交率」，口径仍对应制定完成率。

## 2026-09-07 回退考核进度配置页

- 已删除 `current/perf-report-progress-config.html`，并去掉进度页「配置」入口及完成率正常/关注/风险标记。组织树、统计卡片、进度条和表格样式保持上一版。

## 2026-09-04 考核进度人数格对齐修正

- `current/perf-report-progress.html`：人数格去掉左右对称内边距，数字与表头左对齐；人数、完成率进度条和部门名称在行高内垂直居中，避免进度条撑高后数字贴顶。
- 本次只改原型样式，不修改 Scope、Spec 或 PRD。

## 2026-09-04 考核进度增加四张完成率卡片

- `current/perf-report-progress.html`：筛选栏和表格之间增加一行四张统计卡：总体目标提交率、完成率、绩效自评完成率、员工确认完成率。
- 口径与合计行一致，分母为当前筛选后人数：总体目标提交率=制定完成率（审批中+已通过）；完成率=审批通过率（已通过）；绩效自评完成率=自评完成率（考核人评分+已完成）；员工确认完成率=确认完成率（已确认）。人数为 0 时显示 0%。
- 本次只改原型交互，不修改 Scope、Spec 或 PRD。

## 2026-09-04 考核进度表头改为目标制定

- `current/perf-report-progress.html`：分组表头「目标进度」改为「目标制定」；列名和计算逻辑不变，组 id 仍为 `goal`。
- 分组表头、列名、人数和完成率数据格统一左对齐；部门名称列保持左对齐。
- 部门名称与人数改为一行：`产品部（8）`、`合计（34）`，展开下级同样；人数仍为该节点含子级合计，左侧展开箭头保留。
- 本次只改原型样式，不修改 Scope、Spec 或 PRD。

## 2026-09-04 考核进度完成率改为进度条

- `current/perf-report-progress.html`：所有完成率/通过率/申诉率列由纯文字百分比改为「进度条 + 整数百分比」。人数列仍为可点击数字，进度条不可点、不弹名单。
- 进度条按该格 0–100% 填充；填充色沿用各环节分组已有色（目标 `--pr`、面谈 `--vi`、考核 `--em`、审定 `--ac`、确认 `--ro`），申诉率与同组完成率同一组件。合计行、部门行和展开下级共用此样式。
- 本次只改原型交互，不修改 Scope、Spec 或 PRD。

## 2026-09-04 考核进度组织树筛选与部门行展开

- `current/perf-report-progress.html`：筛选栏「全部组织」由原生 select 改为自定义组织树。选中节点后筛选该节点及其全部下级人员，再按部门表汇总；根节点为全部组织。点面板外关闭，重置回到全部组织。
- 组织树与表格行展开共用同一棵 `ORG_TREE`（全部组织 → 中国区 → 产品研发中心/市场中心 → 部门 → 组）。人员挂在末级组织；上级行人数含子级，叶子人数之和等于上级。
- 表格默认只显示一级部门，合计在第一行且不展开；部门左侧 chevron，点击名称或箭头展开下级。空下级不显示箭头。展开状态与列分组收起、筛选独立。
- 本次只改原型交互，不修改 Scope、Spec 或 PRD。

## 2026-09-04 考核进度改为部门环节人数看板

- `current/perf-report-progress.html`：筛选栏在周期、组织旁增加绩效活动搜索（沿用 `.fl-search`）。按活动名称包含匹配过滤人员后再按部门汇总；空值不过滤。重置同时清空活动搜索，周期默认仍为 2026 年 Q2。
- `current/perf-report-progress.html`：点击分组表头可收起/展开。收起后隐藏该组人数列，只保留完成率类列（含审批通过率、申诉率、自评/评分/绩效完成率）。收起状态与筛选独立，表格宽度随可见列变化。
- `current/perf-report-progress.html`：目标进度后增加绩效面谈分组（未开始、进行中、已完成、完成率）。目标未通过为面谈未开始；目标已通过且考核未开始为进行中；已进入考核及后续环节为已完成。完成率 = 已完成 / 部门人数。
- `current/perf-report-progress.html`：目标进度增加制定完成率、审批通过率；考核进度增加自评完成率、评分完成率、绩效完成率；结果审定增加审定完成率；员工确认增加完成率、申诉率。完成率列均为人数/部门人数，只展示百分比。
- `current/perf-report-progress.html`：合计行从表格底部移到部门列表第一行。
- `current/perf-report-progress.html`：从人员明细列表改为按部门汇总。一行一个部门，列分为目标进度、考核进度、结果审定、员工确认四组，每组展示未开始到完成/申诉的当前人数；点击非零人数弹出该格子人员名单。
- 筛选保留周期和组织/部门，去掉姓名搜索和人员状态筛选；默认查看 2026 年 Q2。导出仍为原型占位。
- 本次只改原型交互，不修改 Scope、Spec 或 PRD。该页在正式资料中仍属非当前 Scope；PF-347 部门进度统计目前仍是「不需要」。

## 2026-09-03 目标审批与直线上级审定布局收紧

- `current/manager/demo-goal-direct.html`：定性目标衡量标准紧贴目标名称行，压缩目标标题行下边距与详情区上边距；KPI/KPA 模块标题移除折叠箭头、分隔线与点击收起，内容始终展开，移除模块展开状态与 `toggleMod` 逻辑，权重与目标数继续显示。
- `current/manager/demo-ratify-direct.html`：筛选顺序固定为“员工姓名/工号搜索 → 部门 → 划分区域 → 考核组 → 是否到达”，到达筛选标签由“到达状态”改为“是否到达”，选项与默认值不变；团队成员表“调整等级”列收紧为内容自适应宽度，多余空间分配给前面信息列，7 颗星、等级文案与说明不裁切。
- 本次为纯交互/样式调整，不改 Scope、Spec 或 PRD。

## 2026-09-03 直线上级目标审批页对齐目标制定页

- `current/manager/demo-goal-direct.html`：页头改为与目标制定页一致的独立吸顶标题栏，标题收敛为“目标审批”；考核周期、当前节点、总权重、总目标数并入标题栏摘要，总权重与总目标数不再在人员信息区下方单独占行。人员信息区仅保留姓名、部门、职位，去掉考核方案、考核周期、被评人。
- 标题栏操作收敛为“提交 + 更多”，驳回收进更多菜单，菜单支持点击外部与 Esc 关闭；提交仍打开审批意见弹窗，驳回仍打开退回弹窗。
- 目标明细固定展开，移除每条目标的折叠箭头与点击收起入口；KPI/KPA 模块级展开/收起保持不变；定性目标详情去掉“衡量标准”字段名，仅保留文本框式只读内容。
- 本次为纯交互调整，不改 Scope、Spec 或 PRD。

## 2026-09-02 目标审批、结果审定与确认页面评审对齐

- `current/employee/demo-goal-employee.html`：移除 KPI“新增”入口；指标库关联或复制历史形成的定量指标名称统一只读，保留指标库选择和复制历史入口。
- `current/manager/demo-goal-direct.html`、`current/manager/demo-goal-indirect.html`：双线上级审批页完整沿用直线上级审批页结构；定量目标改为“字段名：值”的横向布局，定性目标的衡量标准合并为一个文本框式区域，目标行移除定量/定性标签；审批意见改为点击提交后在弹窗中必填，审批流程按目标制定页样式和实际节点顺序展示。
- `current/employee/demo-eval-self.html`：审批流程字段调整为“节点、处理人、原因、流入时间、流出时间”，移除状态列。
- `current/manager/demo-ratify-hierarchy.html`、`current/manager/demo-ratify-direct.html`、`current/manager/demo-ratify-indirect.html`：三类审定页面统一逐级审定版式；标题栏增加吸顶，等级差异摘要并入“等级分布”标题行；筛选区固定放在图表下、成员列表上，收起图表时仍保留。新增部门和划分区域组织树多选筛选，筛选只影响成员列表，不改变分布统计。
- `current/employee/demo-confirm-employee.html`：结果卡下新增本年度历史月度绩效等级卡片；同步移除原型中“超时自动认可”的错误承诺，申诉提示对齐当前 HRBP 线下处理规则。
- 本次属于既有 V3/V5 页面样式和交互补齐，不新增业务范围，不修改 Scope、Spec 或 PRD。

## 2026-08-28 绩效自评填写页交互对齐

- `current/employee/demo-eval-self.html`：移除页面信息卡、填写中状态和目标类型列；考核周期与当前节点压缩进标题操作栏。
- 标题操作栏改为吸顶，并统一为“提交 + 更多”结构；保存草稿和导出收进更多下拉，草稿仅写入浏览器本地存储。
- 定量完成值输入框收窄为五位数字宽度；表格列数、模块分组跨列和导出字段同步调整。
- 后续复核移除目标表格字段名表头，并在 KPI 与 KPA 模块之间增加 12px 分隔间距。
- KPI/KPA 模块标题进一步沿用目标制定页样式，采用左侧图标与名称、右侧“权重 / N 个目标”布局，但不增加吸顶或收起交互；衡量标准与完成情况统一为等宽列，评分列右侧留白同步压缩。
- 定量目标评价结果改为五分制得分，不再展示星级和评价等级；原型按“完成值 ÷ 20”换算并限制为 0–5 分，80 显示 4 分、100 显示 5 分，导出字段同步改为评价结果。该口径与当前 Spec、REQ-001 存在冲突，正式资料待确认后同步。
- 定量完成值输入框右对齐至完成值列末端，与右侧得分保持 16px 紧凑间距；得分及导出结果去掉“分”字，仅展示数值。
- 按评审选定的方案二将 KPI、KPA 拆为独立模块卡片，并在各模块内分别展示适用字段表头；列宽调整为指标名称 20%、权重 8%、目标/评价标准 32%、填写区 22%、结果区 18%，保留静态模块头和纯数字定量得分。
- KPI 完成值列收窄为与 72px 输入框匹配的 88px 固定列，得分列收窄为 64px，释放空间全部并入目标/评价标准列；员工自评文本框去掉输入提示。顶部移除“更多”菜单，将单一“驳回”操作直接展示。
- KPI/KPA 第三列表头统一为“衡量标准”，KPA 填写列改为“完成情况”；KPI 完成值单位移至输入框右侧，完成值列调整为 104px。KPA 评价结果列按五颗星及内边距固定为 150px，衡量标准列自适应占满剩余宽度。
- KPA 结果列表头进一步统一为“自评结果”；直线上级、双线上级评分页对齐员工自评页的吸顶标题栏与 KPI/KPA 独立模块卡片，保留历史绩效、初评、评语、驳回和转交能力。
- `current/manager/demo-ratify-hierarchy.html`：顶部对齐自评页标题栏，筛选区移至标题栏下方；等级符合情况改为“等级 / 要求 / 实际 / 是否符合”表格。收起操作统一进入标题栏，收起后隐藏筛选、结论与图表，只展示各等级的符合或人数差值摘要；到达状态筛选不再改变强制分布结论，人数上限按向下取整计算。
- `current/manager/demo-eval-indirect.html`、`current/manager/demo-eval-direct.html`：顶部操作收敛为“提交评分 + 更多”，驳回和转交进入更多菜单。定量 KPI 沿用自评页五列结构，只读展示完成值计算得分；定性 KPA 按评分节点展示评价结果，双线上级页为“员工自评 / 双线上级评价”，直线上级页增加“直线上级评价”，当前节点保留评星操作。
- `current/manager/demo-ratify-hierarchy.html`：左右分布区域合并为同一卡片并共用“等级分布”标题，统计数据右对齐到标题行，收起/展开移至该标题最右侧；移除总体结论、规则状态与人数说明，只保留等级分布表格。筛选区最左侧新增员工姓名/工号搜索，到达状态仅保留“已到达 / 未到达”且默认已到达，搜索和状态筛选只影响成员列表，不改变当前考核组的分布统计。页面操作收敛为“提交 + 更多”，导出和驳回进入更多菜单。
- 本次仅调整既有 V3 绩效考核与结果审定原型交互，不修改 Scope、Spec 或 V3 PRD。

## 2026-08-28 目标制定填写页交互新版本

- `current/employee/demo-goal-employee.html`：移除页面员工信息栏与目标行“定量/定性”标签；页面标题和保存草稿/导出/提交操作区改为顶部吸附。
- KPI、KPA 模块标题行采用第二层吸附，长模块滚动时固定在页面操作区下方；两模块交互一致，模块切换时不互相遮挡。
- KPI 的新增、指标库选择、复制历史仅允许定量目标；新增定量目标填写名称、权重、挑战值、目标值、保底值和指标描述。KPA 的三类入口仅允许定性目标，新增时填写名称、权重和衡量标准。
- 定量目标的挑战值、目标值、保底值改为“字段名：控件”的横向结构；原明细“指标描述”位置改为“计算规则”。
- 总权重、目标数和权重校验状态收进顶部标题操作栏；KPA 明细去掉“衡量标准”可见字段名，以输入提示承接填写说明并压缩与目标名称的间距。
- 标题摘要右对齐；模块吸顶与页面标题间保留 8px 间距；定量数值输入框收窄为五位数字宽度。“新增”改为在对应模块末尾直接插入并定位展开项，KPI 新增项填写“计算规则”且不再打开弹窗。
- 标题摘要补充周期和当前节点；权重异常仅保留红色数值，不再显示“需为 100%”。KPI/KPA 模块和单个目标均改为固定展开，移除箭头、点击收起及其可点击样式。
- 顶部摘要进一步收敛为“周期值｜节点值｜权重和”，不展示字段名、目标数和校验文案；权重和等于 100% 时显示绿色，否则显示红色。操作区改为“提交 + 更多”，保存草稿和导出收进更多下拉；模块标题统计改为更大字号的“xx% / N 个目标”。
- 审批流程字段顺序统一为节点、处理人、状态、原因/备注、流入时间、流出时间。
- 本次新口径先进入独立原型版本；不修改 Scope、Spec 或 V3 PRD，待后续产品资料确认同步。

## 2026-08-26 绩效考核系统计算范围改为可选配置

- `current/perf-scheme-wizard.html`：在绩效考核环节新增“是否系统计算考核总分与初评等级”开关，默认关闭。开启后单选“仅计算考核总分”或“计算总分与初评等级”；只有选中计算方式后才显示节点权重分配，原节点权重表及其交互保持不变。
- 关闭开关时隐藏计算方式和节点权重；关闭后再次开启会保留已选计算方式。开启但未选择计算方式时仅展示选择提示，不提前展示节点权重。
- `current/perf-scheme-detail.html`：绩效考核环节同步展示系统计算配置状态。
- 本次仅更新原型与变更记录，不修改 Scope、Spec 或 V2 PRD。

## 2026-08-25 考核组移除人员规则改为三类可配置规则

- `current/perf-scheme-wizard.html`：保留“移除人员规则”总开关，关闭时整块禁用但保留已配值；删除旧引导句和“暂不支持调岗或组织架构变更”说明。改为员工离职、开始休假、结束休假三条纵向规则，勾选后显示附属配置。离职/开始休假为“周期开始后 N 天内有效”，结束休假为“周期结束前 N 天内有效”；N 为 1–365，默认 7。休假规则支持假种多选下拉（年假、病假、事假、婚假、产假、陪产假、育儿假、工伤假、无薪假），选择结果以标签展示。
- `current/perf-scheme-detail.html`：总开关关闭时不展示规则区；开启时按新结构展示已启用规则的假种和有效窗口摘要。
- 默认考核组演示开启三条规则：离职 7 天，开始/结束休假均选产假、育儿假且 7 天；仓储特殊组总开关关闭；新增考核组三条均未勾选、days=7。autoRemove 以 structured enabled / leaveTypes / days 为准，并保留 conditions 兼容。
- 本次仅改方案向导、方案详情和本变更记录，不修改 Scope、Spec 或 PRD。

## 2026-08-19 工作台绩效等级颜色与团队 Mock 数据调整

- `current/employee/demo-workbench-home.html`、`current/employee/demo-workbench-team.html`：绩效等级颜色统一为“超出预期/远超预期”绿色、“符合预期+／符合预期／符合预期-”橙色、“低于预期／远低预期”红色。
- `current/employee/demo-workbench-team.html`：绩效等级分布与团队绩效趋势 Mock 数据由 4 人扩充为 10 人，七级制与五级制同步补齐。
- `current/employee/demo-workbench-home.html`：修复周期切换时“我的目标”标题更新路径失效导致的脚本报错。
- 本次仅调整既有 V5 工作台视觉口径与 Mock 数据，不修改 Scope、Spec 或 V5 PRD。

## 2026-08-15 目标与结果报表人员字段补齐

- `current/perf-report-goals.html`、`current/perf-report-results.html`：统一补齐姓名、工号、人员状态、用工形式、划分区域、岗位、职级和入职日期。
- 部门字段统一拆分为当前部门、全路径部门、二级部门至八级部门；不存在的组织层级显示“—”。
- `current/perf-report-results.html` 的导出设置同步增加全部人员与部门层级字段。
- 同步更新 Spec 1.10 与 V5 PRD；V5 Scope 项数不变。

## 2026-08-15 工作台入口补齐

- `current/employee/demo-workbench-team.html`：绩效等级分布和团队绩效趋势两个模块的“更多”统一跳转到绩效结果报表 `current/perf-report-results.html`。
- `current/employee/demo-workbench-home.html`：“我的目标”模块的“更多”跳转到正式员工“我的目标”页面 `current/employee/demo-workbench-my-goal.html`。
- 本次仅补齐既有 V5 工作台入口，不修改 Scope、Spec 或 V5 PRD。

## 2026-08-14 团队绩效工作台图表口径调整

- `current/employee/demo-workbench-team.html` 以线上 `performance-v2` 当前版本为基线增量修改，保留周期切换、待办、等级分布和趋势图结构；不恢复已移除的成员目标、团队总览和统计卡片。
- `current/employee/demo-workbench-team.html` 与 `current/employee/demo-workbench-home.html` 的待办区统一替换为 3 条流程待办，采用彩色员工图标、流程名称、提交时间和右侧“去处理”的紧凑卡片结构。
- `current/employee/demo-workbench-team.html`：绩效等级分布改为按员工展示当前周期绩效结果，纵轴使用绩效结果等级，员工按等级从低到高排序。
- 等级分布右上角新增结果等级规则下拉，可在七级制与五级制之间切换，图表等级刻度、颜色和人员结果同步刷新。
- 团队绩效趋势改为按绩效周期升序展示的分组人数柱状图，同一周期内每个等级一根独立柱子并使用独立图例；悬停柱子展示等级名称、人数和团队成员名单。
- 本次仅调整既有 V5 管理者工作台图表展示与交互，不修改 Scope、Spec 或 V5 PRD。

## 2026-08-11 绩效结果报表对齐飞书 PRD

- `current/perf-report-results.html`：按飞书 PRD 补齐“员工 × 周期 × 活动”结果粒度、完整查询条件、结果字段、数据来源和更新时间。
- 按评审反馈移除统计卡片；系统初评与调整后初评合并为单一“初评等级”；移除操作列与结果详情入口。
- 保留报表导入、导出设置、空数据和数据截止时间反馈。
- 本次不扩展进度报表、分析报表或 V6 AI；Scope、Spec 与 V5 PRD 范围不变。

## 2026-08-11 目标报表改为目标项明细列表

- `current/perf-report-goals.html`：取消目标详情入口，列表粒度调整为“员工 × 活动 × 当前有效目标项”，同一员工的多个目标分别展示；`current/perf-scenario-nav.html` 同步移除独立员工目标详情入口。
- 列表核心字段统一为姓名、工号、部门、周期、活动名称、目标名称、权重、类型、衡量标准和衡量标准梯度值；移除独立单位列、活动状态、当前节点、当前处理人和操作列。
- 衡量标准的多个梯度值合并为一个字段，按配置顺序分行展示“梯度名称：值+单位”，不再为每个梯度单独占列。
- 查询条件同步改为姓名/工号/目标名称、周期、活动、部门和目标类型；本次同步更新 Spec 1.9 与 V5 PRD，Scope 项数不变。

## 2026-08-03 原型公共导航与通知跳转 404 修复

- `current/perf-report-results.html`、`perf-report-progress.html`、`perf-report-distribution.html`、`perf-report-goal-detail.html`：修正根目录页面错误使用上一级 `navigation.js` 的路径，恢复公共导航、页面初始化和报表内容渲染。
- `current/demo-feishu-notify.html`：修正面包屑、员工通知卡片和管理者通知卡片的页面路径，并把两个已失效的旧文件名对齐当前目标审批、面谈确认页面。
- 本次仅修复既有原型的资源和页面跳转，不修改 Scope、Spec 或 PRD。
- 验证：对 `current/` 下 63 个非归档 HTML 页面逐页检查，修复后控制台无错误、页面无空白；公共导航 19 个页面入口和通知卡片跳转均可访问；`git diff --check` 通过。

## 2026-07-30 目标报表空白修复

- `current/perf-report-goals.html`：修正导航脚本路径，恢复页面初始化与目标 Mock 数据渲染。
- 本次仅修复既有原型脚本引用，不修改 Scope、Spec 或 V5 PRD。

## 2026-07-30 活动手动添加人员弹窗

- `current/perf-activity-detail.html`：在“添加人员”菜单新增可操作的“手动添加”弹窗，支持按考核组筛选并多选人员；考核组只用于筛选系统按活动快照唯一匹配的人员，不支持人工调整归组。
- 已参加当前活动的人员在候选列表中禁用并标记所在考核组；确认添加时再次校验重复参与，防止重复提交。添加成功后同步刷新参与人列表、人数统计和操作日志；首环节进行中时同步创建个人流程和待办，未开始活动则等待首环节开启。
- 本次仅修改活动详情原型和变更记录，不修改 Scope、Spec 或 PRD。

## 2026-07-30 活动列表与活动详情操作补齐

- `current/perf-activity.html`：活动状态筛选和列表状态按状态机统一为未开始、进行中、已结束；底层暂停归入进行中，正常结束和提前终止归入已结束，删除活动不在列表展示。关联方案名称增加方案详情跳转，活动管理员统一显示为“名称（工号）”。
- `current/perf-activity-detail.html`：参与人统计增加“正常进行人数”和“流程异常人数”；非月度活动的导入菜单增加面谈结果入口；批量操作增加开启、移除；操作日志增加 CSV 导出按钮并按当前筛选结果导出。
- 本次仅修改活动列表、活动详情和原型变更记录，不修改 Scope、Spec 或 PRD。

## 2026-07-30 活动参与人状态与环节进度收敛

- `current/perf-activity-detail.html`：参与人列表业务字段收敛为姓名、工号、部门、考核组、当前处理人、当前进度-当前环节名称、进度明细、考核总分、初评等级、审定等级、异常状态、更新时间、操作；当前环节名称动态拼接在“当前进度”列表头中，例如“当前进度-结果确认”，不再单独占用一列。
- 被考核人状态与“当前进度”筛选枚举统一为未开始、进行中、已暂停、已完成、已终止、导入完成；原“环节明细状态”改名为“进度明细”，继续使用分段进度条逐一展示该员工全部适用环节及各环节状态，月度活动不展示绩效面谈。
- “异常状态”筛选与列表展示枚举收敛为“正常考核、终止考核、无需考核”，移除原型中的“超时、逾期、缺少操作”；“异常”统计仅计算后两种非正常状态。
- 导入下拉提示改为“仅可导入当前环节数据，仅可导入状态为未开始/已终止的被考核人”。
- 环节开启入口按活动动态展示下一环节名称；未启动活动展示“开启目标制定环节”，月度目标制定后的下一环节展示“开启绩效考核环节”。
- 本次按用户确认的原型文案保留“考核总分”；当前 V4 PRD 仍使用“最终考核得分”，本次不直接改写 Scope、Spec 或 PRD。
- 验证：本地静态服务打开 `?id=1`、`?id=5`、`?id=6`；核对“当前进度-当前环节名称”动态表头、独立环节名称列已移除、6 个当前进度枚举、3 个异常状态枚举、全环节进度条、导入提示、动态环节名称；控制台无错误；内联脚本语法检查与 `git diff --check` 通过。

## 2026-07-28 活动信息与操作日志字段收敛

- `current/perf-activity-detail.html`：活动详情只保留活动信息，不再内嵌方案配置明细；字段统一为活动名称、创建方式、考核周期、考核关系、关联方案&版本、活动管理员、活动说明、创建人、创建时间、最近修改人、最近修改时间。
- 关联方案名称改为可点击链接，当前活动 `?id=1` 跳转至标准季度考核方案 `v2` 的方案详情页面；`current/perf-scheme-detail.html` 基本信息同步展示方案版本，便于核对跳转结果。
- 操作日志列表收敛为时间、操作人、操作类型、操作对象四列。
- 本次仅修改原型与变更记录，不同步 Scope、Spec、V4 PRD。

## 2026-07-27 活动详情参与人筛选与列表字段调整

- `current/perf-activity-detail.html`：参与人筛选去掉「当前流程节点」，改为「流程状态」（未开始/进行中/已暂停/已完成）；工具栏移除「查看考核关系」及 `showViewRelationModal`/`relModalOv`；列表新增考核组、当前流程状态、绩效面谈、绩效考核、结果审定；「目标审批状态」改为「目标制定」，「确认状态」改为「绩效结果确认」并收敛枚举；业务列顺序按确认口径重排；强制结束事实改用内部 `forceEnded` 字段，不污染列表枚举。
- 本次仅改活动详情参与人筛选/字段/枚举/列顺序和移除查看考核关系按钮，不改 Scope/Spec/PRD。
- 验证：本地打开 `?id=5`；流程状态筛选与重置；表头顺序与枚举；`git diff --check`；残留检索 `empNodeFilter`/`empFilter.node`/`showViewRelationModal`/`relModalOv`。

## 2026-07-27 方案环节时间控件统一、提交方式与活动单人开启补齐

- `current/perf-scheme-wizard.html`：五环节自动开启/结束统一为与「自动创建活动」一致的单行控件（周期开始 + 前/后 + 天数 + 天）；去掉周期相对/固定双模式、上一环节结束后、TIME_RULES 固定日期规则；天数范围随周期类型（月 1–15 / 季 1–90 / 半年 1–180 / 年 1–365）并在切换周期类型时钳制；保留日期预览与环节冲突检查。结果审定「提交方式」必填，枚举顺序为全部提交 / 单个提交 / 按部门提交 / 按层级提交 / 按区域提交，默认空值为「请选择」。
- `current/perf-scheme-detail.html`：环节自动开启/结束文案统一为「周期开始前/后 N 天」；结果审定同步展示提交方式。
- `current/perf-activity-detail.html`：参与人更多操作入口统一为「手动开启」；补齐执行中/环节状态/未开始/导入完成/待办幂等门禁与成功提示「个人流程已开启，待办已发送」；确认无「修改考核关系」可执行入口，保留查看考核关系与转交、批量开启当前环节。
- 依据：既有 Scope PF-114/120/131/141/146、REQ-031/032/034；本次仅原型增量，不改 Scope/Spec/PRD。
- 验证：本地静态服务打开方案向导、方案详情、活动详情 `?id=1`；`git diff --check`；残留文案检索。

## 2026-07-23 结果审定统计卡片收起交互恢复

- `current/manager/demo-ratify-direct.html`、`demo-ratify-indirect.html`、`demo-ratify-hierarchy.html`、`demo-ratify-hrbp.html`：恢复等级分布统计卡片的收起/展开入口。
- 收起后保留各等级的当前人数、按考核组人数换算后的要求人数和需增减人数；再次展开后完整结论与图表恢复显示并重新适配宽度。
- 依据：V3 主 PRD「结果审定页面 / 统计卡片收起」既有交互；本次不增加 Scope，不修改 Spec 与 PRD。
- 验证：四类审定页面均通过本地浏览器收起、摘要字段、重新展开和控制台错误检查。

## 2026-07-21 结果审定提交方式补齐

- `current/perf-scheme-wizard.html`：在结果审定的强制分布配置中新增必填单选“审定提交方式”，选项为单个提交、按部门提交、按区域提交、按层级规则、全部提交。
- 新增下一步与保存校验；未选择时停留在结果审定配置并提示补全，选择结果在页面重渲染后保持。
- 依据：V2 PRD 4.7「考核环节设计 — 结果审定」既有配置项；本次不增加 Scope 数量。

## 2026-07-21 导入门禁与环节级导入完成增量修复
- 依据：工号匹配、工号+目标名称更新、个人流程状态门禁、按环节 importCompletedStages、开启环节状态校验、操作日志导出字段对齐。
- `current/manager/demo-goal-batch-import.html`：Mock 全部带 employeeId；去掉 reached；筛选/统计/handleImport/提交统一个人流程状态口径；同名员工与重名目标逐行失败。
- `current/manager/demo-eval-batch-import.html`：同上；handleImport 逐人门禁、部分成功与失败原因；正式提交同口径校验。
- `current/perf-activity-detail.html`：importCompletedStages 按环节；结果确认不可导入完成；单人/批量开启校验 stageStatus；无可处理人员幂等拒绝且不写日志。
- `scripts/update_feishu_artifacts.py`：操作日志导出字段对齐模板。

## 2026-07-21 活动命名、列表操作、单人开启与导入门禁对齐 Spec 1.6

| 文件 | 动作 | 说明 |
|------|------|------|
| `current/perf-activity.html` | 增量 | 自动创建 Mock 名称改为「年份+周期名称+方案名称」；列表行仅查看/删除；删除门禁+二次确认 |
| `current/perf-activity-detail.html` | 增量 | 目标审批状态列；单人开启个人流程（待办+通知+日志+幂等）；去掉修改考核关系；查看考核关系；操作日志文案与 Mock；导入完成跳过 |
| `current/manager/demo-goal-batch-import.html` | 增量 | 明确当前活动上下文；模板无活动/模板编号列说明 |
| `current/manager/demo-eval-batch-import.html` | 增量 | 同上 |

- 业务依据：Spec 1.6、decisions REQ-028～036、V3.1/V4 PRD。
- 未改 `perf-activity-new.html`、`perf-activity-launch.html`、confirmed、archive。
- 验证：本地静态服务浏览器验收列表删除、单人开启、导入入口与操作日志；`git diff --check` 与残留文案检索。

## 2026-07-17 活动混合进度、强制结束与导入提交口径对齐

| 文件 | 动作 | 说明 |
|------|------|------|
| `current/perf-activity-detail.html` | 重构口径 | 活动只展示一个全局业务环节；个人差异改为当前环节内的流程节点，补齐批量环节操作、首环节补加门禁、强制结束结果、离职异常、确认/申诉终态和 HRBP 只读 |
| `current/perf-scheme-detail.html` | 修正 | 五环节顺序统一为目标制定 → 绩效面谈 → 绩效考核 → 结果审定 → 结果确认 |
| `current/manager/demo-goal-batch-import.html` | 闭环 | 单条删除只影响暂存区；正式提交时按员工校验目标数、必填、唯一键和权重，失败员工不提交，其他员工可成功；草稿仅存浏览器 |

- 原型规则依据为 Spec 1.5、V2.1、V3.1 和 V4 PRD，不再根据个人最早节点反推活动当前业务环节。
- 强制结束不会补造表单、审批、员工确认或申诉记录；系统只撤销待办、写入配置等级并终结个人流程。
- 本次不增加 Scope 功能数量。

## 2026-07-17 目标表单与人员移除规则修正

| 文件 | 动作 | 说明 |
|------|------|------|
| `current/employee/demo-goal-employee.html` | 修正 | 定性目标填写仅保留一个必填“衡量标准”输入框，并同步修正保存与校验逻辑 |
| `current/manager/demo-goal-batch-import.html` | 增强 | 目标导入列表增加单条目标删除操作、删除确认、空目标状态和目标条数汇总 |
| `current/perf-scheme-wizard.html` | 收缩范围 | 移除人员规则仅支持员工离职，调岗和组织架构变更不再作为可选项 |
| `current/perf-scheme-detail.html` | 同步 | 方案详情按同一范围展示移除人员规则及暂不支持说明 |

- V3 PRD 已将“衡量标准-衡量值”定义为单个必填输入，本次修正原型偏差。
- V2.1、V3.1 和 V4 PRD 已明确：当前版本仅处理离职异常，不支持调岗或组织变化自动调整参与人、考核组或当前处理人。
- 本次不修改 Scope 数量和版本归属。

## 2026-07-15 活动管理原型统一

**改造理由**: 保留下"一个活动一行"的传统活动列表方案，以 perf-activity.html 作为正式活动管理入口。不保留 perf-activity-new.html 的左右分栏结构，吸收其方案周期、自动创建和当前环节信息。

### 修改文件

| 文件 | 动作 | 说明 |
|------|------|------|
| `perf-activity.html` | 重写 | 纯列表页，12条活动（9自动+3手动），7筛选条件+sessionStorage持久化，组合列+列设置，手动补充弹窗 |
| `perf-activity-detail.html` | 新建 | 独立详情页：覆盖列表全部12个活动，活动信息+环节进度+14条参与人场景（5筛选）+环节管理+导入导出+批量操作+操作记录 |
| `perf-scheme-detail.html` | 修改 | 新增"关联活动"卡片：当前/历史/未来三Tab，"待自动创建"占位 |
| `navigation.js` | 复核 | 当前版本已是单一"活动管理"入口→perf-activity.html，本次无需修改 |

### 核心变化
- 活动状态严格对应 Spec SM-002：未进入执行/执行中/已暂停/已正常结束/已提前终止
- 手动补充入口为次级按钮，校验方案启用、周期匹配、不可重复创建
- 详情页保留旧版参与人、操作记录、环节管理等核心能力，并补齐考核组筛选和全部活动数据映射
- 方案详情"未来活动"区分"已创建待执行"与"待自动创建"，无虚假 activityId
- 页面角色以 Spec 1.2 为准（SSC 主管理，HRBP 授权录入）

### 未修改
- confirmed/、archive/、perf-activity-new.html、perf-activity-launch.html、v2 目录

---

### 2026-07-15 评审修正

- 活动列表操作恢复为紧凑文字按钮，避免 1280px 下换行和错位。
- 活动详情恢复提交前已确认的页面设计，仅保留独立详情 URL、12 条活动映射和新版状态定义。

---

## 2026-07-02 新增 4 个绩效报表页面
- 新建: perf-report-goals.html, perf-report-results.html, perf-report-progress.html, perf-report-distribution.html
- 内容: 目标中心/绩效结果/考核进度/绩效报表，跨周期查询+Chart.js图表
- 导航: navigation.js 报表分组更新文件引用

---

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
