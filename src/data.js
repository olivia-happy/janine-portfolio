export const portfolio = {
  notice: '以下内容为虚构样稿，展示结构与表达方式；请替换为真实、可核验的信息。',
  profile: {
    name: '林砚', englishName: 'YAN LIN', role: 'AI 产品经理',
    thesis: '把复杂的 AI 能力，收束为可被验证的产品体验。',
    introduction: '关注企业智能化场景中的需求判断、产品闭环与跨团队推进。',
    tags: ['用户洞察', 'AI 产品设计', '结果导向'], contact: 'linyan.sample@example.com'
  },
  projects: [
    {
      slug: 'knowledge-assistant',
      title: '企业知识助手—从“检索可用”到“答案可信”',
      visual: { kind: 'evidence', label: 'TRUST LOOP', steps: ['语义检索', '引用溯源', '可信回答'] },
      stages: {
        问题: '员工跨系统检索效率低，答案可信度不足。',
        判断: '以引用溯源、追问澄清和高频知识优先级建立体验闭环。',
        推进: '主导访谈、PRD、评测口径与研发联调。',
        结果: '检索任务完成时长 -38%，有效回答率 +21%。'
      },
      metrics: ['-38% 检索时长', '+21% 有效回答率'],
      caseFile: {
        scope: '企业内部知识检索 · 3 周 · 12 位一线员工',
        role: 'AI 产品实习生 · 用户访谈 / 场景拆解 / 评测设计',
        decision: '不把首发做成“万能问答”，优先解决答案是否可追溯。',
        evidence: [
          { label: 'INSIGHT / 01', title: '12 位一线员工', detail: '围绕 4 类检索任务访谈并回看 168 条检索记录，定位跨系统查找与答案不敢用两个核心阻塞点。' },
          { label: 'EVALUATION / 02', title: '50 道评测题', detail: '用高频知识、跨文档检索与追问澄清组成评测集，和研发对齐“引用正确、可继续追问”的验收口径。' },
          { label: 'DELIVERY / 03', title: '引用溯源首发', detail: '输出场景优先级、PRD 与失败回答样本；灰度后将引用入口前置，缩短核验路径。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '当答案不能被验证，搜索再快也不会真正被采用。', body: '一线员工需要在 HR、IT 和行政规则之间反复确认。原有检索能找到文档，却无法说明答案来自哪里、是否仍然有效，因此用户仍会回到人工询问。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / RESEARCH', title: '“不敢用”比“找不到”更常见', detail: '访谈 12 位一线员工，并回看 168 条检索记录。跨系统查找和不确定答案是否可信，是最高频的两类阻塞。' },
          { kicker: '02 / EVALUATION', title: '用高频任务定义验收', detail: '将高频知识、跨文档检索和追问澄清整理为 50 道评测题，和研发统一“引用正确、可继续追问”的验收口径。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '首发不做“万能问答”，优先缩短用户核验路径。', body: '我把答案可信度作为主线：引用来源前置、对低置信度回答主动澄清，并让高频知识优先被维护。产品的目标不是让模型多说，而是让用户敢据此行动。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '语义检索', detail: '先给出最相关的制度与流程，保留文档来源和更新时间。' },
          { title: '引用溯源', detail: '每个关键结论都能回到原文位置，降低二次确认成本。' },
          { title: '追问澄清', detail: '面对权限、地区等条件差异，先补全上下文再回答。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '-38%', label: '检索任务完成时长' }, { value: '+21%', label: '有效回答率' }, { value: '50', label: '上线前评测题' }
        ] },
        { id: 'reflection', label: '复盘', type: 'reflection', title: '可信不是一个功能，而是一套持续运营的体验。', body: '下一轮会把失效引用、低置信问题与人工转接记录放入知识维护闭环，让“可追溯”继续成为系统可学习的信号。' }
      ]
    },
    {
      slug: 'content-copilot',
      title: '运营内容 Copilot—把策略沉淀为可复用工作流',
      visual: { kind: 'workflow', label: 'CONTENT FLOW', steps: ['策略模板', 'AI 生成', '人工编辑'] },
      stages: {
        问题: '运营产出依赖个人经验，质量波动大。',
        判断: '先定义可编辑策略模板，再由 AI 辅助生成。',
        推进: '拆解内容工作流，完成灰度和反馈迭代。',
        结果: '单次策划耗时 -46%，模板复用率 67%。'
      },
      metrics: ['-46% 策划耗时', '67% 模板复用率'],
      caseFile: {
        scope: '运营内容工作流 · 4 周 · 8 位运营同学',
        role: '产品运营实习生 · 流程梳理 / 模板设计 / 灰度跟进',
        decision: '不直接提供空白生成框，而是先把成熟策略固化为可编辑模板。',
        evidence: [
          { label: 'WORKFLOW / 01', title: '6 步工作流', detail: '跟走 8 位运营同学的选题、提纲、生成、审核、发布和复盘，找出最容易反复修改的策略环节。' },
          { label: 'TEMPLATE / 02', title: '3 类策略模板', detail: '将活动预热、内容复盘和社群触达拆成变量化模板，明确 AI 生成与人工编辑的责任边界。' },
          { label: 'VALIDATION / 03', title: '灰度反馈单', detail: '按“可直接采用 / 需编辑 / 不可用”归因，推动模板字段与提示语迭代。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '内容产出慢，不是因为不会写，而是策略总要从零开始。', body: '运营同学的选题、提纲、生成和审核高度依赖个人经验。同样的活动策略每次都被重新解释，内容质量与交付节奏都难以稳定。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / WORKFLOW', title: '返工集中在策略交接', detail: '跟走 8 位运营同学的 6 步工作流后发现，反复修改并不发生在文案，而发生在目标、卖点和语气没有被明确的阶段。' },
          { kicker: '02 / TEMPLATE', title: '成熟策略可以被编辑，而非被复制', detail: '活动预热、内容复盘、社群触达的共性可被拆成变量，保留业务语境，同时让不同场景有可控的差异。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '先固定策略输入，再让 AI 参与内容生成。', body: '我没有直接提供空白输入框，而是将成熟策略沉淀为可编辑模板。AI 负责初稿与替代建议，人负责语气、事实与发布判断。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '策略模板', detail: '将目标人群、核心卖点、语气限制变成结构化输入。' },
          { title: 'AI 初稿', detail: '根据模板生成可编辑内容，并保留每一项策略来源。' },
          { title: '灰度反馈', detail: '按可直接采用、需编辑、不可用归因，持续校准字段与提示。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '-46%', label: '单次策划耗时' }, { value: '67%', label: '模板复用率' }, { value: '3', label: '首批策略模板' }
        ] },
        { id: 'reflection', label: '复盘', type: 'reflection', title: 'Copilot 的价值在于把个人判断变成团队资产。', body: '下一步会将模板表现与实际内容效果关联起来，让团队既能看见哪些策略被复用，也能持续改进什么样的输入最有效。' }
      ]
    }
  ],
  principles: [
    { title: '问题定义', detail: '先确认用户要完成的任务，再讨论功能形态。' },
    { title: '能力边界', detail: '明确模型能做什么、不能替代什么，以及何时需要人工判断。' },
    { title: '验证指标', detail: '用任务完成效率、采纳率和质量反馈判断价值。' },
    { title: '协同推进', detail: '将业务语言转译成可交付的产品与评测口径。' }
  ],
  internships: [
    { period: '2026', title: '澄见智能 · AI 产品实习生', detail: '参与企业知识助手的调研、评测与体验迭代，沉淀需求访谈和回答质量评估口径。', focus: 'AI 场景拆解与回答质量评测', handoff: '把体验判断沉淀为可复用的 AI 产品评测口径。' },
    { period: '2025', title: '未名互动 · 产品运营实习生', detail: '将内容策略整理为可复用的运营工作流，协同设计与研发完成灰度验证。', focus: '工作流拆解与跨团队灰度推进', handoff: '从校园原型进入真实业务流程，开始以交付与反馈驱动迭代。' }
  ],
  campusExperiences: [
    { period: '2024', title: '智创产品挑战赛 · 项目负责人', detail: '带领四人团队完成校园知识问答助手，从 36 份访谈中提炼高频问题并迭代原型。', focus: '用户访谈与问题优先级判断', handoff: '将校园场景中的洞察，推进为可被验证的原型与团队协作。' },
    { period: '2023', title: '校园服务体验改造 · 产品负责人', detail: '围绕活动报名与信息触达设计服务流程，完成需求梳理、可用性测试和学生社群推广。', focus: '服务流程与可用性验证', handoff: '建立从问题梳理到测试反馈的第一套产品工作方式。' }
  ]
};
