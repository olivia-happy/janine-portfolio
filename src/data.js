export const portfolio = {
  profile: {
    name: '袁靓',
    englishName: 'Janine Yuan',
    role: 'AI 产品经理 · Agent 与数据智能方向',
    thesis: '规则能算的数字，我不让模型生成——这条在 5 个项目里都没破例。',
    introduction: '统计学硕士（2027 届），3 段 AI 产品实习：在特赞做创意内容平台的产品定义，在法雷奥用 Wind + RAG 做投研工作流，在心动网络做四模态大模型接入与用量计费。工作之外自己写了 5 个开源项目——评测跑不出数的时候，我不跟研发说「这条改好了」。',
    tags: ['评测集与口径', 'RAG / Agent', 'B 端 0→1'],
    contact: 'mgalforever@163.com',
    availability: '2027.07 可全职入职 · 2026.10 起可提前实习',
    website: 'https://olivia-happy.github.io/janine-portfolio/',
    github: 'https://github.com/olivia-happy'
  },
  education: [
    {
      period: '2024.09 — 2027.06',
      school: '上海工程技术大学',
      faculty: '数理与统计学院',
      degree: '统计学 · 学术硕士',
      status: '在读 · 2027 届',
      courses: ['多元统计分析', '时间序列分析', '高级计量经济学', '数据挖掘与机器学习', '高级数据库技术']
    },
    {
      period: '2017.09 — 2021.06',
      school: '安徽工业大学',
      faculty: '商学院',
      degree: '金融学 · 学士',
      status: '已毕业',
      courses: ['金融工程', '公司金融', '投资学', '计量经济学'],
      highlight: '大一读信息与计算科学（数学类），大二转入金融学。本科四年一直在跟「这个指标到底是怎么算出来的」打交道——后来做数据产品，第一反应总是先去核口径，大概就是从那时候养成的。'
    }
  ],
  honors: [
    { label: '奖学金', title: '连续三年获校级奖学金', note: '研究生在读期间 · 2024-2026' },
    { label: '学生工作', title: '2024-2025 学年校级团干部典型示范', note: '担任班级宣传委员' }
  ],
  projects: [
    {
      slug: 'embodiedops',
      title: 'EmbodiedOps—具身机器人任务失败诊断工作台',
      visual: { kind: 'embodied', label: 'DIAGNOSTIC DESK', steps: ['版本化 Episode', '阶段切分', '受控诊断', '证据校验'] },
      stages: {
        问题: '机器人任务失败只记 success/fail，无法回答失败在哪一阶段、证据是什么。',
        判断: '把失败拆成可追溯的 episode + 受控 Agent + 证据校验闭环，fail-closed 拒答。',
        推进: '定义数据契约与 AI 边界，协同研发落地前端与评测门禁。',
        结果: '已开源，README 嵌截图，PRD/评测/安全测试齐全。'
      },
      metrics: ['已开源', '规则层与验证器双保险'],
      github: 'https://github.com/olivia-happy/embodiedops',
      caseFile: {
        scope: '机器人任务失败诊断 · 本地只读工作台',
        role: '产品定义 / AI 边界 / 评测方案',
        decision: 'AI 只负责归纳候选机制，数值和结论一律由规则层算；证据不足就退回 needs_evidence，不给一个看起来完整的答案。',
        evidence: [
          { label: 'CONTRACT / 01', title: '版本化 Episode', detail: '导入不可变 episode 并校验 manifest hash，把「记成 fail」变成可复核的诊断单元。' },
          { label: 'BOUNDARY / 02', title: '受控 Agent', detail: 'Agent 只读 allowlist 里的摘要与事件 ID，产出候选机制；验证器逐条校验事件 ID、时间窗、数值与反例。' },
          { label: 'DELIVERY / 03', title: '证据级闭环', detail: '输出带 Trace 的诊断草案与 simulation_only 实验，人工审核后才可流转。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '机械臂失败之后，团队手里只有一个 fail。', body: 'pick-and-place 任务失败后，日志里只留下一行成功 / 失败。想问「是哪一阶段失败的、有没有反例、下次该验什么」，全靠工程师凭记忆回答，换个人答出来的还不一样。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / PROBLEM', title: '定位靠人工猜', detail: '每次都从日志里手工归因，同一次失败换个人说法就变了，事后也没法复现。' },
          { kicker: '02 / FIX', title: '失败分布看不见', detail: '没有成功 / 碰撞 / 超时的分布，参数改完之后没人说得清到底是哪一阶段变好了。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '把「记录结果」改成「记录可复核的诊断单元」。', body: '规则层负责阶段切分和指标计算，模型只负责归纳候选机制，最后用验证器逐条核对事件 ID、时间窗、数值和反例——任何一条对不上，就退回 needs_evidence，而不是给个大概。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '数据契约', detail: 'episode 版本化 + SHA-256 manifest 校验，manifest 对不上直接拒绝导入。' },
          { title: '确定性指标', detail: '五阶段切分 + 成功率 / 碰撞率 / 超时率 / 失败分布，这些数字全由规则算，模型一个字都不生成。' },
          { title: '证据校验', detail: '事件 ID、时间窗、数值、反例逐条验证；证据不足返回 needs_evidence。' },
          { title: '人审之后才流转', detail: '实验草案强制标 simulation_only，人工确认后才允许进仿真或真机。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: 'fail-closed', label: '安全边界设计' },
          { value: '5/5', label: '阶段判断准确率' },
          { value: '0', label: '密钥 / 数据外泄' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '5/5 只是 5 个案例上的回归结果。', body: '仓库里的评测报告写明了边界：阶段判断准确率 5/5、决策状态准确率 7/7、无依据数值比例为 0，这些数字来自内部构造的小样本回归集，作用只是防止指标实现回退，不能外推到生产。我刻意没把它写成「模型准确率 100%」——要做正式评估，至少得双人独立标注、冻结模型与提示词版本、报告样本量和置信区间。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: '模型会错，规则也会错，但规则错得看得见。', body: '这套设计里我最有底的一点是：每个数字都能追到代码里的哪一行。模型给的候选机制可能错，但它错了会被验证器拦下来；规则层如果错了，至少能复现、能定位到哪个版本、能改。做 AI 产品的时候，能定位比看起来准重要得多。' }
      ]
    },
    {
      slug: 'moba-build-agent',
      title: 'MOBA Build Agent—王者荣耀本地出装助手',
      visual: { kind: 'game', label: 'BUILD ADVISOR', steps: ['单帧截图', '本地识别', '玩家确认', '规则决策'] },
      stages: {
        问题: '多数玩家只跟系统出装，不懂装备功能，也不会针对敌方阵容调整。',
        判断: '做本地优先、带证据、可人工确认的决策助手，而非云端黑箱推荐。',
        推进: 'Android 端识别 + FastAPI 规则引擎，含紧急秒换与证据链。',
        结果: '已上线 GitHub + 在线 H5 Demo，双端测试全部通过。'
      },
      metrics: ['已开源 · 在线可体验', '识别→确认→建议三段可纠正'],
      github: 'https://github.com/olivia-happy/moba-build-agent',
      demo: 'https://olivia-happy.github.io/moba-build-agent/',
      caseFile: {
        scope: 'MOBA 局内出装决策 · Android + 本地引擎',
        role: '产品定义 / AI 边界 / 全链路验证',
        decision: '识别结果必须人工确认后才进入决策：不读内存、不自动操作、不上传画面，也不把识别结果当唯一解。',
        evidence: [
          { label: 'LOCAL / 01', title: '单帧即停', detail: '玩家主动触发悬浮球截一帧，原始画面只留在手机本地，仅上传 16×16 灰度网格。' },
          { label: 'RULES / 02', title: '可解释引擎', detail: '阵容威胁→优先需求→装备覆盖→经济约束，每条建议带装备证据与版本。' },
          { label: 'E2E / 03', title: '双端闭环', detail: '42 项后端测试 + 13 项 Android 测试 + 真机 E2E，APK 可构建。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '玩家缺的不是「最强出装表」，是针对这一局的理由。', body: '游戏内没有结构化接口，截图识别比手输 5 个英雄更快更准；但识别一旦误判就会推荐错装备，所以它必须能被玩家当场推翻。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / PLAYER', title: '只跟系统推荐', detail: '不知道装备功能、不知道对面程咬金要早出减疗，逆风局也不会调整。' },
          { kicker: '02 / GAP', title: '攻略覆盖不了当前局', detail: '通用攻略不会结合这一局的敌方阵容、金币和格子约束。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '决策要可解释，识别要可纠正。', body: '用官方公开资源建可复现的指纹索引与装备知识库，用显式规则引擎替代黑箱模型，让每一条建议都能说出依据、版本和还不确定的项。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '本地识别', detail: '头像 16×16 亮度网格匹配 132 英雄官方指纹，返回 Top-3 加置信度。' },
          { title: '人工确认', detail: '玩家确认 / 点选纠正 / 手动输入，低置信度直接提示重试。' },
          { title: '装备知识库', detail: '官方 item.json 121 件，含价格、功能标签、组件路径、唯一组与复活甲次数。' },
          { title: '紧急秒换', detail: '金身 / 复活甲 / 名刀 / 血魔 / 苍穹等保命装，在金币、格子、次数约束下给出秒换方案。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '42', label: '后端测试通过' },
          { value: '13', label: 'Android 测试通过' },
          { value: '3 场景', label: '在线 H5 可交互 Demo' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '没有真实对局数据，所以我没写胜率。', body: '42 项后端测试、13 项 Android 测试、真机 E2E 全部通过，只能说明这条链路跑得通。我在游戏拆解文档里把这条取舍写得很直白：没有真实用户数据，就不宣称提升胜率。在线 Demo 是三个预置场景的引擎输出复盘，不是对局统计——等有真实受测玩家，再谈采纳率。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: '如果重做，我会先砍掉自动识别。', body: '16×16 灰度指纹这条路能跑，但它把项目拖进了坐标校准、机型适配这些跟产品判断无关的工程细节。真正有价值的是「阵容威胁 → 优先需求 → 装备覆盖」那套规则和证据链。Demo 里让玩家手动选英雄，效果差别不大，成本低一个量级。' }
      ]
    },
    {
      slug: 'flashsight',
      title: 'FlashSight—DRAM 产业情报自动预警',
      github: 'https://github.com/olivia-happy/flashsight',
      visual: { kind: 'chip', label: 'INTEL ALERT', steps: ['官方信源', '归一评分', '人工复核', '预警留存'] },
      stages: {
        问题: '存储市场情报靠分析师手工盯源与经验判断，口径不一、无证据留痕。',
        判断: '聚合公开信源，用可解释规则评分 + 受控 LLM 转译 + 反馈闭环。',
        推进: '定义产业事件模型与 AI 边界，落地全栈骨架与反馈回路。',
        结果: '全栈骨架 + PRD/设计文档已公开，待接入真实价格/信源。'
      },
      metrics: ['已开源', '评分口径可复现'],
      caseFile: {
        scope: 'DRAM 产业情报预警 · 面向存储企业战略团队',
        role: '产品定义 / 评分与反馈设计 / PRD',
        decision: '规则评分在前、模型叙述在后；低可信或无证据的事件强制降级复核，不会直接当 high 预警推出去。',
        evidence: [
          { label: 'SCORE / 01', title: '可解释加权', detail: '业务影响 40% + 新颖 25% + 信源可信 20% + 时效 15%，证据缺失自动降级。' },
          { label: 'LOOP / 02', title: '反馈闭环', detail: '分析师确认 / 判误报 / 改严重度，评分可持续校准。' },
          { label: 'TRACE / 03', title: '证据留痕', detail: '每条事件绑定官方源 URL 与原文摘录，结论可回溯。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '一条新闻要变成预警，中间缺的是口径。', body: '三星、SK 海力士、美光与长鑫的技术节点、产能与资本开支，决定未来 2-3 个季度的供需。分析师每天手工盯官网和行业媒体，重复劳动占比很高，而真正难的那一步——这条消息算多严重、该不该上报——完全没有留下记录。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / PAIN', title: '转译靠人', detail: '一条「美光 1-gamma 送样」要人工判断影响哪条产品线、多严重、要不要上报。' },
          { kicker: '02 / RISK', title: '结论回溯不了', detail: '口头结论对不回原始信源，同业的节点变化可能晚几天才进讨论。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '让分析师只审高影响项。', body: '系统聚合公开信源、用可解释规则预判影响，分析师只把时间花在真正高影响的判断上；信源抓取失败也不能拖垮已经生成的快照数据。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '公开信源聚合', detail: 'Micron / Samsung / SK hynix / CXMT 官方页，后续接 TrendForce 等公开行业源。' },
          { title: '确定性评分', detail: '四个维度加权 + 证据缺失降级，同一条事件每次算出来的分是一样的。' },
          { title: '受控 LLM 转译', detail: 'Ollama 本地可选，产出摘要 / 影响 / 建议行动；模型不可用时规则降级并如实标记。' },
          { title: '反馈校准', detail: 'confirmed / false_positive / changed_severity 三类回流到评测。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '全栈骨架', label: '评分 + 反馈 + 前端闭环' },
          { value: 'PRD + 设计', label: '产品 / 边界 / 架构文档齐' },
          { value: '已开源', label: 'GitHub 仓库上线' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '评测集还没建，这一版交付的是骨架。', body: '现在公开的是全栈骨架加 PRD：规则评分、降级路径、反馈回流都按设计跑通了。但真实信源和价格还没接，20 条人工标注的评测集和 token 成本账都还躺在 P1 待做清单里。所以这一版我能讲的只有「评分口径可复现、无证据必然降级」，讲不了预警准不准。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: '难的不是抓取，是把「多严重」写成规则。', body: '技术侧聚合公开信源并不难，难的是把一条新闻转成战略团队能直接拿去讨论的严重度。这也是我把规则评分放在模型前面、把降级路径写死的原因：口径可以讨论，但不该每次都重新吵一遍。' }
      ]
    },
    {
      slug: 'atlasiq',
      title: 'AtlasIQ—新能源海外市场准入与尽调',
      github: 'https://github.com/olivia-happy/atlasiq',
      visual: { kind: 'energy', label: 'MARKET INTAKE', steps: ['多源特征', '影响矩阵', '准入评估', '尽调流转'] },
      stages: {
        问题: '海外新能源市场评估依赖分散表格与个人经验，结论无法对到证据。',
        判断: '把「某国值不值得看」做成八因素影响矩阵 + 证据留痕的准入流程。',
        推进: '聚合免费公开数据源，落地准入/尽调/导出闭环。',
        结果: 'MVP + 完整文档已公开，含面试 Demo 讲法。'
      },
      metrics: ['已开源', '证据状态分区呈现'],
      caseFile: {
        scope: '新能源企业海外项目准入 · 多源特征仓',
        role: '产品定义 / 数据与证据模型 / MVP',
        decision: '每一格都区分 observed / assumption / insufficient，没有真实观测的时候不伪装成实时量化结论。',
        evidence: [
          { label: 'SOURCE / 01', title: '免费公开多源', detail: 'PVGIS / World Bank / OWID / Open-Meteo / 公开 RSS-GDELT，全部免 key、无云成本。' },
          { label: 'MATRIX / 02', title: '八因素矩阵', detail: '市场增长 / 电力 / 光照 / 经济性 / 并网 / 政策 / 宏观 / 供应链，覆盖决策视角。' },
          { label: 'FLOW / 03', title: '准入到尽调', detail: '初筛→尽调→评审→准入 / 暂缓 / 淘汰，blocker 显式暴露。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '这些数据根本不同频，却被并排放在一张表里。', body: '太阳辐照是地点估算、宏观经济是年度滞后、气象是 7 天预测、行业事件是即时信号——把一个估算值和一个实测值并排显示，看起来都在同一张表上，其实「同时」这件事本身就不成立。这是行业调研最常犯的错。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / FREQ', title: '数据频率不一', detail: '页面分别标出更新时点，避免把不同频的数据误读成同一个市场结论。' },
          { kicker: '02 / GAP', title: '缺少行动闭环', detail: '早期只回答「值不值得看」，不落到真实项目的准入和尽调动作。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '从「研究」推到「项目动作」。', body: '把研究结果转成创建机会、准入评估、处理 blocker、由负责人推进阶段，并导出准入简报——结论要能被人接着往下推，否则分析做完就搁置了。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '多源特征仓', detail: '国家维度的观测、新闻摘要与评分快照分开存，每条都带来源、时间和覆盖率。' },
          { title: '八因素影响矩阵', detail: '每一格呈现状态、来源、更新时间、覆盖率与影响解释。' },
          { title: '项目准入闭环', detail: '初筛 / 尽调 / 待评审 / 已准入 / 暂缓 / 淘汰，并网与经济性缺支撑时生成 blocker。' },
          { title: '报告一致性', detail: 'Word / PDF 使用同一次生成的快照与 Evidence IDs，页面和报告不会出现两个版本。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '免费公开源', label: '零付费 API / 云' },
          { value: 'observed / assumption', label: '证据状态区分' },
          { value: '已开源', label: '准入到简报闭环可跑' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '我给它量的是延迟和降级率，不是「准不准」。', body: '这类工具最难量化的是判断准不准——没有历史项目的真实结果可对照，这时候报任何准确率都是编的。所以我把能测的部分单独拆出来：P50 / P95 延迟、降级率、有证据输出占比，并把测试库和演示库隔离，避免测试样本污染指标。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: '这个项目教会我：把「数据什么时候更新」写进界面。', body: '一开始我以为用户要的是「国家画像」这样一张完整的表。后来发现，他们真正要判断的是「这条数据能不能用来下结论」。现在每一格都标了来源、更新时间和覆盖率，用户自己就能决定要不要信它。' }
      ]
    },
    {
      slug: 'visitors',
      title: 'Visitors—国内城市 AI 智能行程规划器',
      visual: { kind: 'travel', label: 'TRIP COMMAND', steps: ['双入口输入', '预约证据解析', '小时级路线', '可控再优化'] },
      stages: {
        问题: '旅行攻略信息分散，用户出发前真正纠结的是预约、路线与预算能否执行。',
        判断: '不做泛旅行助手，聚焦国内城市执行型规划：预约可靠性优先、可执行路线、可控生成。',
        推进: '用小红书证据前置预约风险，结构化输出结果页，叠加锁定/移除/再优化行程编辑。',
        结果: '可运行可演示的 V1 已开源，含中英双语、明暗主题与展示页。'
      },
      metrics: ['已开源', '预约证据前置到输入'],
      github: 'https://github.com/olivia-happy/visitors',
      caseFile: {
        scope: '国内城市旅行 · 执行型智能行程规划器',
        role: '产品定义 / 信息架构 / 交互闭环',
        decision: '预约提醒只依据用户提供的小红书证据，AI 不凭空生成预约结论；方案生成后可以锁定、移除、再优化，不做一次性答案。',
        evidence: [
          { label: 'EVIDENCE / 01', title: '预约风险前置', detail: '输入阶段就解析小红书链接里的预约要求，展示渠道、价格与证据摘录，避免到了门口才发现约不上。' },
          { label: 'ROUTE / 02', title: '可执行路线', detail: '结果页用小时级时间轴、地图点位、交通时长与预算拆分来承载路线，而不是一段长攻略。' },
          { label: 'CONTROL / 03', title: '可控生成', detail: '用户可锁定必去点、移除不感兴趣的点，只对剩余路线重新优化，让 AI 跟着约束改方案。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '用户要的不是「推荐几个景点」，是出发前能照着走的方案。', body: '做一次攻略要同时开小红书、地图、天气和票务；真正决定体验好坏的，是哪些景点必须预约、路线顺不顺、预算够不够、自驾好不好停——而这几件事正好散落在四个不同的工具里。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / PAIN', title: '信息分散难合并', detail: '攻略、地图、天气、预算各在一边，用户得自己拼出一份能执行的计划。' },
          { kicker: '02 / RISK', title: '预约是最容易翻车的一步', detail: '很多免费景点要提前预约，而生成器只会写「建议提前预约」，说不出具体渠道。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '把「预约」当成一等规划对象。', body: '不把它当攻略末尾的脚注：预约证据前置到输入阶段，结果页按小时级行动组织，方案生成后交给用户继续加约束调整。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '预约证据解析', detail: '用户粘贴小红书链接，系统解析哪些景点需预约、渠道、价格与证据摘录，输入阶段就能预览。' },
          { title: '小时级执行路线', detail: '结果页统一呈现路线摘要、时间轴、地图点位、交通时长与逐项理由。' },
          { title: '预算与准备清单', detail: '门票 / 餐饮 / 住宿 / 交通分区估算，叠加天气、证件、穿搭等行前清单与停车建议。' },
          { title: '可控再优化', detail: '锁定必去点、移除不想去的点，系统只对剩余路线重新规划。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '全链路闭环', label: '需求→方案→展示→分享' },
          { value: '双入口', label: '快速规划 / 证据优先' },
          { value: '中英双语言', label: '页面可切换、主题明暗' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '苏州是演示预设，不代表别的城市也跑得住。', body: 'PRD 里有一条边界声明写得很直白：苏州是演示城市，结果页质量不代表任意城市的真实可用度；没有真实样本，就不宣称预约准确率。所以 V1 我只承诺三件事——证据能回指原文、路线按小时排、锁定和移除之后能重算。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: 'V1 我砍掉了预约渠道全覆盖。', body: '一开始想解析全渠道，很快发现维护成本撑不住——渠道散在小红书、公众号、小程序里，各写各的。所以 V1 只做一件事：把用户给的证据解析清楚，标出渠道和价格。覆盖率不追求，先把「证据优先」这条路验通。' }
      ]
    }
  ],
  principles: [
    { title: '先找出错在哪一步', detail: '拿到需求，先去找现有做法的具体失败点——比如机器人失败只记成 success/fail，所以没人能定位是哪一阶段出的问题。找不到这个失败点，方案就先不做。' },
    { title: '让 AI 承认自己不知道', detail: '给模型划死能读什么、不能生成什么。证据不足就返回 needs_evidence，不许猜——一个看起来很完整的错答案，比一句「证据不足」贵得多。' },
    { title: '口径先于模型', detail: '每改一版都要能在同一批样本上复现对比：法雷奥迭代了 20 版 Prompt，数据要素大赛把 10 类字段提取写成 SOP，都是先把口径定死再动手。模型分高了，不等于业务变好了。' },
    { title: '把争论收敛到同一套数', detail: '算法、研发、业务常常各说各的指标。我的做法是把评测集摊开一起看——口径对不齐的时候，先吵口径，再改模型。' }
  ],
  internships: [
    { period: '2026', range: '2026.05 — 2026.09', title: '心动网络（XD.com） · AI 产品经理', detail: '在企业级 AI 平台做 0→1：主导 Web 端视频 / 音频 / 图像 / 3D 四模态 6 款大模型接入，交付 6 份 PRD、API 对照表与高保真原型，沉淀可复用的模型接入规范；从 0 定义计费规则与用量核算引擎，统一 Token / 按次 / 套餐三类口径；独立交付 OA 审批外部人员管理产品，并完成 469 条历史数据回录。', focus: '模型接入产品化 · B 端 0→1 交付', handoff: '6 款模型的 API 差异逼出来一个习惯：先把「官方事实」和「待确认项」分开列。' },
    { period: '2025', range: '2025.09 — 2026.03', title: '法雷奥（Valeo） · AI 数据产品经理', detail: '基于 Wind 金融数据终端 + Gemini 搭建投研自动化工作流：Workflow 编排 + RAG 降幻觉，Prompt 迭代 20+ 版，单份研报周期缩短 60%；梳理 Bosch、NVIDIA 等 30+ 企业在华投资并购动态，搭建赛道财务模型（核心指标抽样对齐准确率 98%）。', focus: 'AIGC 工作流与 RAG 评测', handoff: 'Prompt 从第 1 版改到第 20 版，每一版的对比数都留在评测表里。' },
    { period: '2024', range: '2024.04 — 2024.08', title: '特赞（Tezign） · 产品经理', detail: '主导创意内容平台的产品定义与商业化路线图：6 款头部竞品功能矩阵 + 技术成熟度评估；清洗 10+ 家客户使用日志，用 A/B 测试与交叉验证持续优化内容审核规则，支撑 3 家品牌客户完成技术方案初筛与 POC 沟通。', focus: '产品定义与 A/B 验证', handoff: '第一次意识到：审核规则每改一次，都得能归因到某个指标上。' },
    { period: '2021', range: '2021.06 — 2023.08', title: '中国平安 · 数据分析（全职）', detail: '以投保人为研究对象搭建「咨询→报价→签单」转化漏斗，梳理 100+ 份客户 VOC 定位各环节流失主因，推动 3 项流程优化落地——试点组转化率由 25% 提升至 40%，单月新增保单 120 单；为 120+ 一线业务员设计数据处理 MVP，核心用户 NPS 达 93。', focus: '转化漏斗与用户研究', handoff: '先看流失发生在漏斗哪一步，再谈怎么优化。' }
  ],
  campusExperiences: [
    { period: '2025', range: '2025.11', title: '第二届全国大学生数据要素素质大赛 · 全国一等奖（十佳作品）', detail: '基金公告智能分析系统：定义 10 类核心字段提取 SOP，协调落地 OCR + BERT 混合方案，以 1000 只基金为样本做 Prompt 迭代与交叉验证，核心字段准确率 96%，单份公告处理从 3 小时降到 5 分钟。', focus: '业务建模与评测', handoff: '把「先定字段口径、再改 Prompt」固化成了 SOP。' },
    { period: '2024', range: '2024 — 2025', title: '「华为杯」中国研究生数学建模竞赛 · 全国二等奖（第二十二届）／ 全国三等奖（第二十一届）', detail: '两届都参加了。第二十一届获全国三等奖，第二十二届获全国二等奖（证书编号 E2025205004，2025 年 12 月）。赛题是工业设备预测性维护：小波去噪 + ReliefF 降维，6 类模型对比跑 5-fold 交叉验证，改进多核 SSTCA 把域偏移 MMD 降低 60%，故障预测准确率 90%。', focus: '特征工程与建模', handoff: '模型分高不等于场景能用，得换算成业务能验的指标。' },
    { period: '2025', range: '2025.05', title: '第十五届正大杯市场调查与分析大赛 · 全国三等奖', detail: '《哪吒 2》IP 社交生态研究：清洗 150+ 用户数据，用 K-Means 分层客群 + Logistic 预测购买概率，设计「先种草再推品」玩法，核心客群触达率提升 22%。', focus: '用户研究与增长', handoff: '用户洞察要能落到一个具体的运营动作上，否则只是报告。' }
  ]
};
