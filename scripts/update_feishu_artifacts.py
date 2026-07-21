#!/usr/bin/env python3
"""更新 HRONE 已有飞书导入、消息和预置数据表。"""

from __future__ import annotations

import json
import subprocess
from datetime import date


IMPORT_URL = "https://ztn.feishu.cn/wiki/Xj1awBZnPiWCAQkUzTpcGYhMnRg"
MESSAGE_URL = "https://ztn.feishu.cn/wiki/IPOww3NahiWI1gkEpzZcZFEMnAd"
PRESET_URL = "https://ztn.feishu.cn/wiki/JSz6wbw8wiF65ekorB7cK4R9n9e"


def col_name(number: int) -> str:
    result = ""
    while number:
        number, remainder = divmod(number - 1, 26)
        result = chr(65 + remainder) + result
    return result


def sheet(name: str, columns: list[str], data: list[list[str]]) -> dict:
    assert all(len(row) == len(columns) for row in data), name
    return {
        "name": name,
        "start_cell": "A1",
        "mode": "overwrite",
        "header": True,
        "allow_overwrite": True,
        "columns": columns,
        "data": data,
        "dtypes": {column: "object" for column in columns},
    }


def style_for(item: dict) -> dict:
    columns = item["columns"]
    rows = item["data"]
    last_col = col_name(len(columns))
    last_row = len(rows) + 1
    col_sizes = []
    for index, column in enumerate(columns, start=1):
        values = [str(row[index - 1]) for row in rows]
        longest = max([len(column), *(len(value) for value in values)] or [len(column)])
        chinese = max([sum("\u4e00" <= char <= "\u9fff" for char in value) for value in [column, *values]] or [0])
        pixels = min(320, max(88, longest * 8 + chinese * 7 + 20))
        letter = col_name(index)
        col_sizes.append({"range": f"{letter}:{letter}", "type": "pixel", "size": pixels})
    cell_styles = [
        {
            "range": f"A1:{last_col}1",
            "font_weight": "bold",
            "background_color": "#DDEBF7",
            "horizontal_alignment": "center",
            "vertical_alignment": "middle",
            "word_wrap": "auto-wrap",
            "border_styles": {
                "top": {"style": "solid", "weight": "thin", "color": "#B4C6E7"},
                "bottom": {"style": "solid", "weight": "thin", "color": "#B4C6E7"},
                "left": {"style": "solid", "weight": "thin", "color": "#B4C6E7"},
                "right": {"style": "solid", "weight": "thin", "color": "#B4C6E7"},
            },
        },
        {
            "range": f"A2:{last_col}{last_row}",
            "vertical_alignment": "middle",
            "word_wrap": "auto-wrap",
        },
    ]
    for row_no in range(3, last_row + 1, 2):
        cell_styles.append({"range": f"A{row_no}:{last_col}{row_no}", "background_color": "#F3F4F6"})
    return {
        "name": item["name"],
        "cell_styles": cell_styles,
        "row_sizes": [
            {"range": "1:1", "type": "pixel", "size": 36},
            {"range": f"2:{last_row}", "type": "auto"},
        ],
        "col_sizes": col_sizes,
    }


def put(url: str, items: list[dict]) -> None:
    payload = {"sheets": items}
    styles = {"styles": [style_for(item) for item in items]}
    cmd = [
        "lark-cli",
        "sheets",
        "+table-put",
        "--url",
        url,
        "--sheets",
        json.dumps(payload, ensure_ascii=False),
        "--styles",
        json.dumps(styles, ensure_ascii=False),
        "--as",
        "user",
    ]
    subprocess.run(cmd, check=True)


def ensure_sheet_renamed(url: str, old_title: str, new_title: str) -> None:
    info = subprocess.run(
        ["lark-cli", "sheets", "+workbook-info", "--url", url, "--as", "user", "--format", "json"],
        check=True,
        capture_output=True,
        text=True,
    )
    names = {item["sheet_name"] for item in json.loads(info.stdout)["data"]["sheets"]}
    if new_title in names:
        return
    if old_title not in names:
        raise RuntimeError(f"找不到待重命名工作表：{old_title}")
    subprocess.run(
        [
            "lark-cli",
            "sheets",
            "+sheet-rename",
            "--url",
            url,
            "--sheet-name",
            old_title,
            "--title",
            new_title,
            "--as",
            "user",
        ],
        check=True,
    )


def import_sheets() -> list[dict]:
    instructions = sheet(
        "导入说明",
        ["数据类型", "模板版本(元数据)", "操作角色", "允许活动状态", "允许人员条件", "匹配键", "成功结果", "失败/冲突处理"],
        [
            ["人员", "IMP-2026.2", "SSC/HRBP（各自授权范围）", "未进入执行；执行中仅首环节未开始/处理中且未暂停未过截止", "当前活动授权范围内人员", "员工工号（活动由页面上下文确定）", "加入活动并匹配考核组/关系", "重复人员、跨活动重叠、零/多考核组匹配失败"],
            ["目标", "IMP-2026.2", "SSC/HRBP（各自授权范围）", "执行中且未暂停/终止/结束", "目标制定个人流程未开始", "工号；更新时工号+目标名称", "形成活动级导入结果并标记已通过导入完成；目标审批状态=已生效；开启时不启动流程", "已有个人流程/待办/在线正式提交，或目标名称无法唯一匹配时失败"],
            ["考核", "IMP-2026.2", "SSC/HRBP（各自授权范围）", "执行中且未暂停/终止/结束", "绩效考核个人流程未开始", "工号+指标/目标标识", "形成导入完成结果；开启时不启动流程；定量等级系统重算", "定量等级不可导入；已有流程/待办/在线正式提交时失败"],
            ["审定", "IMP-2026.2", "SSC/HRBP（各自授权范围）", "执行中且未暂停/终止/结束", "结果审定个人流程未开始", "工号", "形成导入完成结果并执行强制分布校验；开启时不启动流程", "强控超限、已有流程/待办/在线正式提交或已有结果时失败"],
            ["面谈", "IMP-2026.2", "SSC/HRBP（各自授权范围）", "执行中", "绩效面谈数据录入节点", "工号", "生成正式面谈记录并进入直接上级确认", "月度、已有记录或节点已完成时失败"],
            ["通用", "IMP-2026.2", "按数据类型", "暂停/正常结束/提前终止均禁止正式导入", "活动由页面上下文确定，用户不填活动/模板名称列", "同文件重复匹配键全部报错", "允许部分成功；导入更新保留追溯", "不得与在线流程结果并行有效"],
        ],
    )
    personnel = sheet(
        "人员数据导入",
        ["员工工号", "备注"],
        [["EMP0001", "示例行，使用前删除；活动由导入页上下文确定"]],
    )
    goals = sheet(
        "目标批量导入",
        ["员工工号", "目标分类", "指标编码", "目标名称", "权重(%)", "衡量标准", "目标值", "挑战值", "保底值", "计量单位", "开始日期", "结束日期", "备注"],
        [
            ["EMP0001", "KPI", "IND-001", "客户续约率", "40", "按有效续约合同统计", "90", "95", "80", "%", "2026-04-01", "2026-06-30", "示例行；更新时用工号+目标名称匹配"],
            ["EMP0001", "KPA", "", "跨部门协作", "60", "按里程碑完成质量评价", "", "", "", "", "2026-04-01", "2026-06-30", "示例行，使用前删除"],
        ],
    )
    evaluations = sheet(
        "考核结果批量导入",
        ["员工工号", "指标编码/目标名称", "指标类型", "完成值", "完成情况", "定性评价等级编码", "评价说明", "备注"],
        [
            ["EMP0001", "IND-001", "定量", "92", "", "", "系统按完成值计算等级，不可填写等级", "示例行，使用前删除"],
            ["EMP0001", "跨部门协作", "定性", "", "按期完成三个里程碑", "GRADE-MEET-PLUS", "跨部门反馈良好", "示例行，使用前删除"],
        ],
    )
    ratification = sheet(
        "审定结果批量导入",
        ["员工工号", "审定等级编码", "备注"],
        [["EMP0001", "GRADE-MEET", "示例行；提交时执行强制分布校验"]],
    )
    interviews = sheet(
        "面谈记录批量导入",
        ["员工工号", "面谈日期", "面谈地点", "面谈人事工号", "面谈总结", "改进行动计划", "备注"],
        [["EMP0001", "2026-07-05", "线上会议", "EMP-M001", "确认上半年表现与发展方向", "Q3 完成专项能力提升计划", "示例行，使用前删除"]],
    )
    export_rows = []
    domains = {
        "活动名单": ["活动编码", "活动名称", "周期", "方案版本", "员工工号", "员工姓名", "部门", "岗位", "考核组", "关系模式", "当前环节", "人员状态"],
        "目标": ["员工工号", "目标序号", "目标分类", "指标编码", "目标名称", "权重", "衡量标准", "目标值", "挑战值", "保底值", "计量单位", "目标状态"],
        "考核": ["员工工号", "指标/目标", "完成值", "完成情况", "系统评价等级", "定性评价等级", "指标得分", "系统初评分", "系统初评等级", "调整后初评等级"],
        "审定": ["员工工号", "审定前总分", "系统初评等级", "各级审定等级", "最终审定等级", "审定状态"],
        "面谈": ["员工工号", "面谈日期", "面谈地点", "面谈人", "面谈总结", "改进行动计划", "确认状态"],
        "最终结果": ["员工工号", "最终得分", "系统初评等级", "调整后初评等级", "最终审定等级", "确认状态", "申诉状态"],
        "操作日志": ["操作时间", "操作人", "操作人工号", "业务角色", "操作类型", "操作对象", "活动", "被考核人/工号", "业务环节", "操作前状态", "操作后状态", "原因或备注", "处理结果", "待办创建结果", "通知发送结果", "关联导入批次或业务记录", "失败原因"],
    }
    for domain, fields in domains.items():
        for index, field in enumerate(fields, start=1):
            data_scope = "审计记录，包含历史动作" if domain == "操作日志" else "正式且当前有效记录"
            export_rows.append([domain, field, "是" if index <= 4 else "否", "按字段权限", data_scope, str(index)])
    exports = sheet(
        "导出字段字典",
        ["数据域", "字段", "默认导出", "权限要求", "数据口径", "排序"],
        export_rows,
    )
    return [instructions, personnel, goals, evaluations, ratification, interviews, exports]


def message_sheets() -> list[dict]:
    columns = ["模板编号", "版本", "业务域", "事件编码", "消息名称", "接收人规则", "触发时点", "标题", "正文", "变量", "跳转目标", "去重键", "状态"]
    rows = [
        ["MSG-ACT-001", "2026.1", "活动", "activity.started", "活动进入执行", "参与人、当前首节点处理人、活动管理员", "活动进入执行事务成功后", "{{activity_name}} 已开始", "{{cycle_name}} 绩效活动已开始，请在 {{deadline}} 前完成 {{stage_name}}。", "activity_name,cycle_name,stage_name,deadline", "工作台/活动详情", "活动+接收人+事件版本", "启用"],
        ["MSG-ACT-002", "2026.1", "活动", "activity.paused", "活动暂停", "所有未终态参与人、当前处理人、管理员", "暂停事务成功后", "{{activity_name}} 已暂停", "活动已暂停，当前待办暂不可处理，恢复后将继续原节点。", "activity_name", "工作台/活动详情", "活动+接收人+paused版本", "启用"],
        ["MSG-ACT-003", "2026.1", "活动", "activity.resumed", "活动恢复", "所有未终态参与人、当前处理人、管理员", "恢复事务成功后", "{{activity_name}} 已恢复", "活动已恢复，请继续处理 {{stage_name}}，当前截止时间为 {{deadline}}。", "activity_name,stage_name,deadline", "当前待办/活动详情", "活动+接收人+resumed版本", "启用"],
        ["MSG-ACT-004", "2026.1", "活动", "activity.ended", "活动正常结束", "参与人、管理员", "正常结束事务成功后", "{{activity_name}} 已结束", "本次绩效活动已正常结束。", "activity_name,cycle_name", "结果详情/活动详情", "活动+接收人+ended", "启用"],
        ["MSG-ACT-005", "2026.1", "活动", "activity.terminated", "活动提前终止", "参与人、当前处理人、管理员", "提前终止事务成功后", "{{activity_name}} 已提前终止", "活动已提前终止，未完成待办已失效。", "activity_name", "工作台/活动详情", "活动+接收人+terminated", "启用"],
        ["MSG-TASK-001", "2026.1", "流程", "task.arrived", "任务到达", "当前处理人", "待办创建事务成功后", "待处理：{{node_name}}", "请在 {{deadline}} 前处理 {{employee_name}} 的 {{node_name}}。", "activity_name,employee_name,node_name,deadline", "当前待办", "待办+接收人+arrived", "启用"],
        ["MSG-TASK-002", "2026.1", "流程", "task.reminded", "任务催办", "当前处理人", "合法催办事件后", "催办：{{node_name}}", "{{handler_name}} 催办你处理 {{employee_name}} 的 {{node_name}}，截止 {{deadline}}。", "handler_name,employee_name,node_name,deadline", "当前待办", "待办+接收人+催办冷却窗", "启用"],
        ["MSG-TASK-003", "2026.1", "流程", "task.overdue", "任务超时", "当前处理人、配置的活动管理员", "首次越过截止时间", "已超时：{{node_name}}", "{{employee_name}} 的 {{node_name}} 已超时 {{overdue_duration}}。", "employee_name,node_name,overdue_duration", "当前待办/活动详情", "待办+接收人+overdue", "启用"],
        ["MSG-GOAL-001", "2026.1", "目标", "goal.approved", "目标审批通过", "员工", "目标生效事务成功后", "绩效目标已生效", "{{cycle_name}} 的绩效目标已审批通过并生效。", "cycle_name", "我的目标", "目标记录+员工+approved", "启用"],
        ["MSG-GOAL-002", "2026.1", "目标", "goal.rejected", "目标被驳回", "员工", "驳回事务成功后", "绩效目标被驳回", "{{handler_name}} 驳回了你的目标：{{reject_reason}}。请修改后重新提交。", "handler_name,reject_reason", "目标填写", "目标轮次+员工+rejected", "启用"],
        ["MSG-EVAL-001", "2026.1", "考核", "evaluation.rejected", "考核被驳回", "员工", "驳回事务成功后", "绩效自评被驳回", "{{handler_name}} 驳回了本轮考核：{{reject_reason}}。请重新提交自评。", "handler_name,reject_reason", "绩效自评", "考核轮次+员工+rejected", "启用"],
        ["MSG-EVAL-002", "2026.1", "考核", "evaluation.completed", "考核完成", "员工、活动管理员", "最终评分事务成功后", "{{cycle_name}} 绩效考核已完成", "考核评分已完成，后续结果将在审定后发布。", "cycle_name", "我的考核/活动详情", "考核结果+接收人+completed", "启用"],
        ["MSG-INTERVIEW-001", "2026.1", "面谈", "interview.rejected", "面谈记录被驳回", "员工", "驳回事务成功后", "绩效面谈记录被驳回", "{{handler_name}} 驳回了面谈记录：{{reject_reason}}。", "handler_name,reject_reason", "面谈填写", "面谈轮次+员工+rejected", "启用"],
        ["MSG-INTERVIEW-002", "2026.1", "面谈", "interview.completed", "面谈完成", "员工、直接上级", "上级确认事务成功后", "绩效面谈已完成", "{{cycle_name}} 的绩效面谈记录已确认。", "cycle_name", "面谈记录", "面谈记录+接收人+completed", "启用"],
        ["MSG-RATIFY-001", "2026.1", "审定", "ratification.rejected", "审定被驳回", "直接上级", "驳回事务成功后", "结果审定被驳回", "{{handler_name}} 已将审定退回，请重新审定。", "handler_name,activity_name", "直接上级审定", "审定轮次+直接上级+rejected", "启用"],
        ["MSG-RATIFY-002", "2026.1", "审定", "ratification.hrbp_required", "HRBP 条件审批到达", "所属 HRBP", "条件节点待办创建后", "待审批：{{employee_name}} 绩效结果", "{{employee_name}} 的结果满足 HRBP 条件审批，请处理。", "employee_name,cycle_name", "HRBP 审定待办", "待办+HRBP+arrived", "启用"],
        ["MSG-CONFIRM-001", "2026.1", "确认", "result.confirm_required", "结果待确认", "员工", "结果确认待办创建后", "请确认 {{cycle_name}} 绩效结果", "你的最终绩效等级为 {{result_grade}}，请在 {{deadline}} 前确认。", "cycle_name,result_grade,deadline", "结果确认", "确认记录+员工+required", "启用"],
        ["MSG-CONFIRM-002", "2026.1", "确认", "result.confirmed", "结果已确认", "员工", "认可结果事务成功后", "绩效结果已确认", "你已认可 {{cycle_name}} 绩效结果，该操作不可撤销。", "cycle_name", "结果详情", "确认记录+员工+confirmed", "启用"],
        ["MSG-APPEAL-001", "2026.1", "申诉", "appeal.submitted", "申诉已提交", "员工本人、所属 HRBP", "申诉事实保存成功后", "绩效申诉已提交", "{{employee_name}} 已提交 {{cycle_name}} 绩效申诉。当前仅供 HRBP 查看并线下沟通。", "employee_name,cycle_name,submitted_at", "本人申诉记录/HRBP只读详情", "申诉记录+接收人+submitted", "启用"],
        ["MSG-IMPORT-001", "2026.1", "导入", "import.completed", "导入完成", "导入操作人", "导入确认事务完成后", "{{import_type}} 导入完成", "成功 {{import_success_count}} 条，失败 {{import_failure_count}} 条。", "import_type,import_success_count,import_failure_count", "导入结果", "导入任务+操作人+completed", "启用"],
        ["MSG-IMPORT-002", "2026.1", "导入", "import.template_invalid", "模板不匹配", "导入操作人", "文件级校验失败后", "导入模板不匹配", "文件模板版本与当前要求不一致，请下载最新模板。", "expected_version,actual_version", "导入页", "文件摘要+操作人+invalid", "启用"],
        ["MSG-EXPORT-001", "2026.1", "导出", "export.ready", "导出文件可下载", "导出操作人", "文件生成成功后", "{{export_type}} 已生成", "导出文件已生成，请在 {{expire_at}} 前下载。", "export_type,expire_at", "文件下载", "导出任务+操作人+ready", "启用"],
        ["MSG-EXPORT-002", "2026.1", "导出", "export.failed", "导出失败", "导出操作人", "文件生成失败并停止重试后", "{{export_type}} 生成失败", "导出失败，请核对权限和查询条件后重试。", "export_type", "原查询页", "导出任务+操作人+failed", "启用"],
    ]
    return [sheet("Sheet1", columns, rows)]


FORM_COLUMNS = ["表单编码", "表单名称", "环节", "字段分组", "字段编码", "字段名称", "字段类型", "控件", "必填", "默认值", "数据来源", "可见角色", "可编辑角色", "可编辑节点", "只读条件", "枚举/格式", "校验规则", "导入字段", "导出字段", "排序", "备注"]


def form_row(form_code: str, form_name: str, stage: str, group: str, code: str, name: str, kind: str, control: str, required: str, source: str, visible: str, editable: str, node: str, readonly: str, fmt: str, validation: str, imported: str, exported: str, order: int, note: str = "") -> list[str]:
    return [form_code, form_name, stage, group, code, name, kind, control, required, "", source, visible, editable, node, readonly, fmt, validation, imported, exported, str(order), note]


def common_rows(form_code: str, form_name: str, stage: str) -> list[list[str]]:
    fields = [
        ("employee_id", "被考核人工号", "文本", "只读文本", "系统/活动参与人"),
        ("employee_name", "被考核人", "文本", "只读文本", "组织人事"),
        ("department", "部门", "文本", "只读文本", "活动快照/组织人事"),
        ("position", "岗位", "文本", "只读文本", "活动快照/组织人事"),
        ("cycle_name", "绩效周期", "文本", "只读文本", "周期快照"),
        ("activity_name", "考核活动", "文本", "只读文本", "活动"),
    ]
    return [form_row(form_code, form_name, stage, "基本信息", code, name, kind, control, "是", source, "当前业务授权角色", "无", "全部", "始终只读", "", "", "否", "是", index) for index, (code, name, kind, control, source) in enumerate(fields, start=1)]


def preset_sheets() -> list[dict]:
    period_columns = ["名称 zh-CN", "排序值", "类型", "是否启用", "开始日期", "结束日期", "系统预置", "创建人", "创建日期", "英语 en-US", "捷克语 cs-CZ", "波兰语 pl-PL", "法语 fr-FR", "西班牙语 es-ES", "德语 de-DE", "意大利语 it-IT", "荷兰语 nl-NL", "日语 ja-JP", "韩语 ko-KR", "业务编码"]
    period_defs = [
        ("年度", "年度", "1月1日", "12月31日", "Year", "YEAR"),
        ("上半年", "半年度", "1月1日", "6月30日", "First Half", "H1"),
        ("下半年", "半年度", "7月1日", "12月31日", "Second Half", "H2"),
        ("第一季度", "季度", "1月1日", "3月31日", "Q1", "Q1"),
        ("第二季度", "季度", "4月1日", "6月30日", "Q2", "Q2"),
        ("第三季度", "季度", "7月1日", "9月30日", "Q3", "Q3"),
        ("第四季度", "季度", "10月1日", "12月31日", "Q4", "Q4"),
    ]
    month_ends = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    month_names_cn = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    month_names_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for index in range(12):
        period_defs.append((month_names_cn[index], "月度", f"{index + 1}月1日", f"{index + 1}月{month_ends[index]}日", month_names_en[index], f"M{index + 1:02d}"))
    periods = []
    for order, (name, kind, start, end, english, code) in enumerate(period_defs, start=1):
        periods.append([name, str(order), kind, "是", start, end, "是", "admin", str(date.today()), english, "", "", "", "", "", "", "", "", "", code])

    goal_rows = common_rows("FORM-GOAL", "目标制定表", "目标制定")
    goal_defs = [
        ("goal_category", "目标分类", "枚举", "下拉", "是", "方案/指标库", "员工/审批人/HRBP", "员工/HRBP", "员工填写/导入节点", "提交后", "KPI/KPA", "必须是方案允许分类", "是", "是"),
        ("indicator_code", "指标编码", "文本", "指标选择", "否", "指标库", "同上", "员工/HRBP", "员工填写/导入节点", "引用后只读", "", "指标有效且在授权范围", "是", "是"),
        ("goal_name", "目标名称", "文本", "单行输入", "是", "手工/指标库", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "≤200字符", "非空", "是", "是"),
        ("weight", "权重", "数字", "数字输入", "是", "手工/导入", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "0-100，最多2位小数", "整表合计=100%", "是", "是"),
        ("measurement_standard", "衡量标准", "文本", "多行输入", "是", "指标库/手工", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "≤1000字符", "非空", "是", "是"),
        ("target_value", "目标值", "数字/文本", "输入", "条件必填", "衡量标准", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "随指标精度", "按衡量标准", "是", "是"),
        ("challenge_value", "挑战值", "数字/文本", "输入", "否", "衡量标准", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "随指标精度", "按衡量标准", "是", "是"),
        ("floor_value", "保底值", "数字/文本", "输入", "否", "衡量标准", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "随指标精度", "按衡量标准", "是", "是"),
        ("unit", "计量单位", "枚举", "只读/下拉", "条件必填", "计量单位", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "", "定量指标必填", "是", "是"),
        ("start_date", "开始日期", "日期", "日期选择", "是", "周期/手工", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "yyyy-mm-dd", "位于周期范围", "是", "是"),
        ("end_date", "结束日期", "日期", "日期选择", "是", "周期/手工", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "yyyy-mm-dd", "不早于开始日期且位于周期", "是", "是"),
        ("approval_history", "审批记录", "对象列表", "时间线", "否", "流程引擎", "员工/审批人/HRBP", "无", "全部", "始终只读", "", "", "否", "是"),
    ]
    for offset, item in enumerate(goal_defs, start=7):
        goal_rows.append(form_row("FORM-GOAL", "目标制定表", "目标制定", "目标明细" if offset < 18 else "流程", *item, offset))
    goal_system_defs = [
        ("record_source", "记录来源", "枚举", "只读文本", "是", "系统", "员工/审批人/HRBP", "无", "全部", "始终只读", "在线/导入", "按提交入口记录", "否", "是"),
        ("row_order", "明细排序", "数字", "拖拽排序/只读", "是", "员工操作/导入", "员工/审批人/HRBP", "员工/HRBP", "员工填写/导入节点", "提交后", "正整数", "同表单内唯一", "是", "是"),
        ("version_no", "记录版本", "数字", "只读文本", "是", "系统", "审批人/HRBP", "无", "全部", "始终只读", "正整数", "每次重提递增", "否", "是"),
        ("record_status", "记录状态", "枚举", "只读状态", "是", "系统", "员工/审批人/HRBP", "无", "全部", "始终只读", "active/voided", "同一人同一活动仅一条有效版本", "否", "是"),
    ]
    for offset, item in enumerate(goal_system_defs, start=19):
        goal_rows.append(form_row("FORM-GOAL", "目标制定表", "目标制定", "系统审计", *item, offset))

    eval_rows = common_rows("FORM-EVAL", "绩效考核表", "绩效考核")
    eval_defs = [
        ("goal_items", "当前有效目标", "对象列表", "明细表", "是", "目标制定结果", "员工/评分人/HRBP", "无", "全部", "始终只读", "", "只取当前有效目标", "否", "是"),
        ("completion_value", "完成值", "数字", "数字输入", "定量必填", "手工/导入", "员工/评分人/HRBP", "员工/HRBP", "自评/导入节点", "提交后", "随指标精度", "定量指标必填", "是", "是"),
        ("completion_description", "完成情况", "文本", "多行输入", "定性必填", "手工/导入", "员工/评分人/HRBP", "员工/HRBP", "自评/导入节点", "提交后", "≤2000字符", "定性指标必填", "是", "是"),
        ("system_eval_grade", "定量系统评价等级", "枚举", "动态评星只读", "条件必填", "计算规则", "员工/评分人/HRBP", "无", "全部", "定量指标始终只读", "随评价规则", "由完成值计算", "否", "是"),
        ("qualitative_grade", "定性评价等级", "枚举", "动态评星", "条件必填", "评价规则", "当前评分人/HRBP", "当前评分人/HRBP", "当前评分/导入节点", "非当前处理人", "随评价规则", "仅定性指标", "是", "是"),
        ("indicator_score", "指标得分", "数字", "只读文本", "是", "等级映射", "当前授权角色", "无", "全部", "始终只读", "最多2位", "按活动快照", "否", "是"),
        ("bonus", "加分", "数字", "数字输入", "否", "手工", "当前评分人", "当前评分人", "评分节点", "非当前处理人", "最多2位", "按方案允许", "否", "是"),
        ("deduction", "减分", "数字", "数字输入", "否", "手工", "当前评分人", "当前评分人", "评分节点", "非当前处理人", "最多2位", "按方案允许", "否", "是"),
        ("system_score", "系统初评分", "数字", "只读文本", "是", "系统计算", "当前授权角色", "无", "全部", "始终只读", "2位小数", "按权重汇总", "否", "是"),
        ("system_initial_grade", "系统初评等级", "枚举", "动态评星只读", "是", "等级规则", "当前授权角色", "无", "全部", "始终只读", "随等级规则", "由系统初评分映射", "否", "是"),
        ("adjusted_initial_grade", "调整后初评等级", "枚举", "动态评星", "否", "人工调整", "当前授权角色", "有权限当前处理人", "评分节点", "无权限或非当前处理人", "随等级规则", "不得反写系统事实", "否", "是"),
        ("overall_comment", "总评语", "文本", "多行输入", "否", "手工", "当前授权角色", "当前评分人", "评分节点", "非当前处理人", "≤2000字符", "", "是", "是"),
        ("process_history", "审批流程", "对象列表", "时间线", "否", "流程引擎", "当前授权角色", "无", "全部", "始终只读", "", "", "否", "是"),
    ]
    for offset, item in enumerate(eval_defs, start=7):
        eval_rows.append(form_row("FORM-EVAL", "绩效考核表", "绩效考核", "考核明细" if offset < 19 else "流程", *item, offset))
    eval_audit_defs = [
        ("adjustment_operator", "等级调整人", "人员", "只读文本", "否", "系统审计", "当前授权角色", "无", "全部", "始终只读", "人员工号/姓名", "仅发生人工调整时记录", "否", "是"),
        ("adjustment_time", "等级调整时间", "日期时间", "只读文本", "否", "系统审计", "当前授权角色", "无", "全部", "始终只读", "yyyy-mm-dd HH:mm:ss", "仅发生人工调整时记录", "否", "是"),
        ("record_status", "记录状态", "枚举", "只读状态", "是", "系统", "当前授权角色", "无", "全部", "始终只读", "active/voided", "驳回时旧轮次全部作废", "否", "是"),
    ]
    for offset, item in enumerate(eval_audit_defs, start=20):
        eval_rows.append(form_row("FORM-EVAL", "绩效考核表", "绩效考核", "系统审计", *item, offset))

    ratify_rows = common_rows("FORM-RATIFY", "结果审定表", "结果审定")
    ratify_defs = [
        ("final_score", "审定前最终得分", "数字", "只读文本", "是", "绩效考核结果", "审定人/HRBP", "无", "全部", "始终只读", "2位小数", "", "否", "是"),
        ("initial_grade", "初评等级", "枚举", "动态评星只读", "是", "绩效考核结果", "审定人/HRBP", "无", "全部", "始终只读", "随等级规则", "", "否", "是"),
        ("distribution", "当前强制分布", "对象", "分布图/表", "是", "系统统计", "审定人/HRBP", "无", "全部", "始终只读", "人数/比例", "按考核组当前有效等级", "否", "是"),
        ("ratified_grade", "当前审定等级", "枚举", "动态评星", "是", "审定人/导入", "审定人/HRBP", "当前审定人/HRBP导入", "审定节点", "非当前处理人", "随等级规则", "提交时校验强制分布", "是", "是"),
        ("ratification_history", "审定记录", "对象列表", "时间线", "否", "流程引擎/审定记录", "审定人/HRBP", "无", "全部", "始终只读", "", "", "否", "是"),
    ]
    for offset, item in enumerate(ratify_defs, start=7):
        ratify_rows.append(form_row("FORM-RATIFY", "结果审定表", "结果审定", "审定", *item, offset))

    interview_rows = common_rows("FORM-INTERVIEW", "绩效面谈表", "绩效面谈")
    interview_defs = [
        ("interview_date", "面谈日期", "日期", "日期选择", "是", "手工/导入", "员工/直接上级/HRBP", "员工/HRBP", "员工填写/导入节点", "提交后", "yyyy-mm-dd", "位于允许范围", "是", "是"),
        ("interview_location", "面谈地点", "文本", "单行输入", "否", "手工/导入", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "≤200字符", "", "是", "是"),
        ("interviewer", "面谈人", "人员", "人员只读/导入", "是", "组织关系/导入", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "员工工号", "默认直接上级", "是", "是"),
        ("interview_summary", "面谈总结", "文本", "多行输入", "是", "手工/导入", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "≤4000字符", "非空", "是", "是"),
        ("strengths", "优势与亮点", "文本", "多行输入", "否", "手工", "同上", "员工", "员工填写", "提交后", "≤2000字符", "", "否", "是"),
        ("improvements", "改进方向", "文本", "多行输入", "否", "手工", "同上", "员工", "员工填写", "提交后", "≤2000字符", "", "否", "是"),
        ("action_plan", "改进行动计划", "文本", "多行输入", "是", "手工/导入", "同上", "员工/HRBP", "员工填写/导入节点", "提交后", "≤4000字符", "非空", "是", "是"),
        ("manager_confirmation", "上级确认状态", "枚举", "只读状态", "否", "流程引擎", "员工/直接上级/HRBP", "直接上级", "上级确认", "非当前处理人", "待确认/已确认/已驳回", "", "否", "是"),
        ("process_history", "审批记录", "对象列表", "时间线", "否", "流程引擎", "当前授权角色", "无", "全部", "始终只读", "", "", "否", "是"),
    ]
    for offset, item in enumerate(interview_defs, start=7):
        interview_rows.append(form_row("FORM-INTERVIEW", "绩效面谈表", "绩效面谈", "面谈", *item, offset))

    confirm_rows = common_rows("FORM-CONFIRM", "结果确认表", "结果确认")
    confirm_defs = [
        ("final_score", "最终得分", "数字", "只读文本", "是", "最终绩效结果", "员工/HRBP", "无", "全部", "始终只读", "2位小数", "", "否", "是"),
        ("final_grade", "最终等级", "枚举", "动态评星只读", "是", "最终绩效结果", "员工/HRBP", "无", "全部", "始终只读", "随等级规则", "", "否", "是"),
        ("result_detail", "得分明细", "对象列表", "明细表", "是", "目标/考核/审定记录", "员工/HRBP", "无", "全部", "始终只读", "", "只取当前有效记录", "否", "是"),
        ("confirmation_choice", "确认选择", "枚举", "单选", "是", "员工", "员工", "员工", "结果确认", "终态后", "认可/申诉", "提交后不可撤销", "否", "是"),
        ("appeal_items", "申诉异议项", "对象列表", "多选", "申诉必填", "员工", "员工/HRBP", "员工", "结果确认", "非申诉或终态", "当前结果项", "至少一项", "否", "是"),
        ("appeal_reason", "申诉原因", "文本", "多行输入", "申诉必填", "员工", "员工/HRBP", "员工", "结果确认", "非申诉或终态", "≤4000字符", "非空", "否", "是"),
        ("appeal_attachments", "申诉附件", "附件", "附件上传", "否", "员工", "员工/HRBP", "员工", "结果确认", "非申诉或终态", "最多5份", "文件类型/大小校验", "否", "是"),
        ("confirmation_status", "确认状态", "枚举", "只读状态", "是", "系统", "员工/HRBP", "无", "全部", "始终只读", "待确认/已认可/已申诉", "终态不可逆", "否", "是"),
    ]
    for offset, item in enumerate(confirm_defs, start=7):
        confirm_rows.append(form_row("FORM-CONFIRM", "结果确认表", "结果确认", "确认/申诉", *item, offset))

    return [
        sheet("绩效周期", period_columns, periods),
        sheet("绩效表单-目标制定", FORM_COLUMNS, goal_rows),
        sheet("绩效表单-绩效考核", FORM_COLUMNS, eval_rows),
        sheet("绩效表单-结果审定", FORM_COLUMNS[:-1], [row[:-1] for row in ratify_rows]),
        sheet("绩效表单-绩效面谈", FORM_COLUMNS[:-1], [row[:-1] for row in interview_rows]),
        sheet("绩效表单-结果确认", FORM_COLUMNS[:-1], [row[:-1] for row in confirm_rows]),
    ]


def main() -> None:
    imports = import_sheets()
    messages = message_sheets()
    presets = preset_sheets()
    assert sum(len(item["data"]) for item in imports) == 84
    assert len(messages[0]["data"]) == 23
    assert len(presets[0]["data"]) == 19
    ensure_sheet_renamed(PRESET_URL, "单位", "计量单位")
    put(IMPORT_URL, imports)
    put(MESSAGE_URL, messages)
    put(PRESET_URL, presets)
    print("updated import templates, message templates, and preset data")


if __name__ == "__main__":
    main()
