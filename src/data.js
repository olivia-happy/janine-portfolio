export const portfolio = {
  profile: {
    name: '袁靓',
    englishName: 'Janine Yuan',
    role: 'AI 产品经理 · Agent 与数据智能方向',
    thesis: '把统计学的严谨带进 AI 产品：每个结论可核验，每个版本有评测，每个想法可落地。',
    introduction: '统计学硕士在读，3 段 AI 产品实习：在企业级平台 0→1 主导四模态大模型接入，搭建 RAG 投研 Agent 与知识库工具。想到就亲手做出来——本页 5 个项目全部开源，3 个已上线可体验。',
    tags: ['统计验证', 'AI 产品', '评测驱动'],
    contact: 'mgalforever@163.com',
    website: 'https://olivia-happy.github.io/janine-portfolio/',
    github: 'https://github.com/olivia-happy'
  },
  projects: [
    {
      slug: 'embodiedops',
      title: 'EmbodiedOps—具身机器人任务失败诊断工作台',
      visual: { kind: 'embodied', label: 'DIAGNOSTIC DESK', steps: ['版本化 Episode', '阶段切分', '受控诊断', '证据校验'] },
      stages: {
        问题: '机器人任务失败只记 success/fail，无法回答失败在哪一阶段、证据是什么。',
        判断: '把失败拆成可追溯的 episode + 受控 Agent + 证据校验闭环，fail-closed 拒答。',
        推进: '定义数据契约与 AI 边界，协同研发落地前端与评测门禁。',
        结果: '公开上线，README 嵌截图，PRD/评测/安全测试齐全。'
      },
      metrics: ['已公开上线', '证据级诊断闭环'],
      github: 'https://github.com/olivia-happy/embodiedops',
      caseFile: {
        scope: '机器人任务失败诊断 · 本地只读工作台',
        role: '产品定义 / AI 边界 / 评测方案',
        decision: 'AI 只归纳候选机制，数值与结论由规则层验证；证据不足一律 needs_evidence，绝不编造。',
        evidence: [
          { label: 'CONTRACT / 01', title: '版本化 Episode', detail: '导入不可变 episode 并校验 manifest hash，把"记成 fail"变成可复核的诊断单元。' },
          { label: 'BOUNDARY / 02', title: '受控 Agent', detail: 'Agent 只读 allowlist 摘要与事件 ID，产出候选机制；验证器逐条校验事件 ID、时间窗、数值与反例。' },
          { label: 'DELIVERY / 03', title: '证据级闭环', detail: '输出带 Trace 的诊断草案与 simulation_only 实验，人工审核后才可流转。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '当"失败"只有两个结果，问题无法被定位。', body: '机械臂 pick-and-place 失败后，团队只记录成功/失败。这回答不了四个关键问题：失败发生在哪一阶段、证据是什么、有无反例、下一步该验证什么。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / PROBLEM', title: '定位靠人工猜', detail: '每次失败依赖工程师从日志手工归因，口径不一致、无法复现。' },
          { kicker: '02 / FIX', title: '失败分布不可见', detail: '缺少成功/碰撞/超时分布，无法判断一次参数调整到底改善了哪一阶段。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '把"记录结果"升级为"受控的诊断单元"。', body: '用确定性规则做阶段切分与指标，用受控 Agent 归纳候选机制，用验证器做 fail-closed 校验，让每一次失败都可复核、可重放、可比较。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '数据契约', detail: '版本化 episode + SHA-256 manifest 校验，坏版本直接失败关闭。' },
          { title: '确定性指标', detail: '五阶段切分与成功率/碰撞率/超时率/失败分布，模型不生成数值。' },
          { title: '证据校验', detail: '事件 ID / 时间窗 / 数值 / 反例逐条验证，证据不足返回 needs_evidence。' },
          { title: '人审流转', detail: '实验草案强制 simulation_only，人工审核后才允许进入仿真或真实流程。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: 'fail-closed', label: '安全边界设计' },
          { value: '5/5', label: '阶段判断准确率' },
          { value: '0', label: '真实密钥/数据外泄' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '诊断是否真在替人省判断？', body: '上线后看两个核心指标：阶段判断准确率（当前 5/5）与人工审核通过率。前者确认规则层没判错，后者确认 Agent 归纳的候选机制真的被人采纳——两者都达标，才说明诊断闭环在省人力而非增负担。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: '安全边界本身就是产品能力。', body: '面试与演示中，"AI 不编造结论"比"AI 答得多"更能建立信任。下一步接 robomimic 公开轨迹验证真实数据导入。' }
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
        结果: '已上线 GitHub + 在线 H5 Demo，双端测试全绿。'
      },
      metrics: ['已上线', '识别→确认→建议闭环'],
      github: 'https://github.com/olivia-happy/moba-build-agent',
      demo: 'https://olivia-happy.github.io/moba-build-agent/',
      caseFile: {
        scope: 'MOBA 局内出装决策 · Android + 本地引擎',
        role: '产品定义 / AI 边界 / 全链路验证',
        decision: '识别结果必须人工确认后才进入决策：不读内存、不自动操作、不上传画面，识别不做唯一解。',
        evidence: [
          { label: 'LOCAL / 01', title: '单帧即停', detail: '玩家主动触发悬浮球截一帧，原始画面只留在手机本地，仅上传 16×16 灰度网格。' },
          { label: 'RULES / 02', title: '可解释引擎', detail: '阵容威胁→优先需求→装备覆盖→经济约束，每条建议带装备证据与版本。' },
          { label: 'E2E / 03', title: '双端闭环', detail: '42 项后端测试 + 13 项 Android 测试 + 真机 E2E，APK 可构建。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '玩家缺的不是"最强出装表"，而是针对这一局的决策理由。', body: '游戏内没有结构化接口，截图识别比手输 5 个英雄更快更准；但要防误判进错推荐，识别必须人工确认。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / PLAYER', title: '只跟系统推荐', detail: '不知道装备功能、不知道对面程咬金要早出减疗，逆风不会调整。' },
          { kicker: '02 / GAP', title: '攻略覆盖不了当前局', detail: '通用攻略没有结合这一局敌方阵容、金币与格子约束。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '决策要可解释，识别要可纠正。', body: '用官方公开资源构建可复现的指纹索引与装备知识库，用显式规则引擎替代黑箱模型，让每一条建议都有证据、版本与未知项披露。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '本地识别', detail: '头像 16×16 亮度网格匹配 132 英雄官方指纹，返回 Top-3 + 置信度。' },
          { title: '人工确认', detail: '玩家确认 / 点选纠正 / 手动输入，低置信度提示重试。' },
          { title: '装备知识库', detail: '官方 item.json 121 件，含价格、功能标签、组件路径、唯一组与复活甲次数。' },
          { title: '紧急秒换', detail: '金身/复活甲/名刀/血魔/苍穹等保命装，在金币/格子/次数约束下给出秒换方案。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '42', label: '后端测试通过' },
          { value: '13', label: 'Android 测试通过' },
          { value: '3 场景', label: '在线 H5 可交互 Demo' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '带证据的推荐是否真被采纳？', body: '若产品上线，核心指标是建议采纳率与局内胜率提升。测试全绿只能证明"能跑"，采纳率才说明玩家是否真按带证据的推荐调整出装——这是从工具到被信任建议的分水岭。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: 'AI 应用的边界设计要先于功能。', body: '这个项目最被认可的不是"推荐准"，而是"隐私与合规想得清楚"。下一步补真机截图坐标校准与"我方定位"维度。' }
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
      metrics: ['已公开仓库', '可解释评分闭环'],
      caseFile: {
        scope: 'DRAM 产业情报预警 · 面向存储企业战略团队',
        role: '产品定义 / 评分与反馈设计 / PRD',
        decision: '规则评分在前、模型叙述在后；低可信/无证据事件强制降级复核，绝不直接当 high 预警。',
        evidence: [
          { label: 'SCORE / 01', title: '可解释加权', detail: '业务影响 40% + 新颖 25% + 信源可信 20% + 时效 15%，证据缺失自动降级。' },
          { label: 'LOOP / 02', title: '反馈闭环', detail: '分析师确认 / 判误报 / 改严重度，评分可持续校准。' },
          { label: 'TRACE / 03', title: '证据留痕', detail: '每条事件绑定官方源 URL 与原文摘录，结论可回溯。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '在寡头强周期市场，信息差就是决策差。', body: '三星、SK 海力士、美光与长鑫等玩家的技术节点、产能与资本开支决定未来 2-3 个季度供需。分析师每天手工盯官网与行业媒体，重复劳动占比高。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / PAIN', title: '转译靠人', detail: '一条"美光 1-gamma 送样"要人工判断影响哪条产品线、多严重、要不要上报。' },
          { kicker: '02 / RISK', title: '无证据难复盘', detail: '口头结论无法回溯到原始信源，竞对技术拐点可能晚几天才进入讨论。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '让分析师只审高影响项。', body: '系统聚合公开信源 + 可解释规则预判影响，分析师聚焦真正的高影响判断；信源失败绝不拖垮快照数据。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '公开信源聚合', detail: 'Micron / Samsung / SK hynix / CXMT 官方页 + 后续 TrendForce 等公开行业源。' },
          { title: '确定性评分', detail: '四大维度加权 + 证据缺失降级，同一条事件可复现评分。' },
          { title: '受控 LLM 转译', detail: 'Ollama 本地可选，产出摘要/影响/建议行动；不可用则规则降级并如实标记。' },
          { title: '反馈校准', detail: 'confirmed / false_positive / changed_severity 回流到评测。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '全栈骨架', label: '评分+反馈+前端闭环' },
          { value: 'PRD+设计', label: '产品/边界/架构文档齐' },
          { value: '已公开', label: 'GitHub 仓库上线' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '评分口径是否真的越用越准？', body: '投入真实使用后的核心指标是预警命中率与分析师的误报占比——只有当分析师越来越少把预警标成 false positive，说明反馈回流真正在校准评分，而不是靠模型猜得准。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: '行业产品的价值在"口径"而非"接口"。', body: '产业预警的核心不是抓取，而是把"多严重、对谁、何时上报"变成可复现、可审计的口径。下一步接真实价格与评测集，量化漏报率与前置时间。' }
      ]
    },
    {
      slug: 'atlasiq',
      title: 'AtlasIQ—新能源海外市场准入与尽调',
      github: 'https://github.com/olivia-happy/atlasiq',
      visual: { kind: 'energy', label: 'MARKET INTAKE', steps: ['多源特征', '影响矩阵', '准入评估', '尽调流转'] },
      stages: {
        问题: '海外新能源市场评估依赖分散表格与个人经验，结论无法对到证据。',
        判断: '把"某国值不值得看"做成八因素影响矩阵 + 证据留痕的准入流程。',
        推进: '聚合免费公开数据源，落地准入/尽调/导出闭环。',
        结果: 'MVP + 完整文档已公开，含面试 Demo 讲法。'
      },
      metrics: ['已公开仓库', '证据留痕准入'],
      caseFile: {
        scope: '新能源企业海外项目准入 · 多源特征仓',
        role: '产品定义 / 数据与证据模型 / MVP',
        decision: '每格状态区分 observed / assumption / insufficient，缺真实观测时不伪装成实时量化结论。',
        evidence: [
          { label: 'SOURCE / 01', title: '免费公开多源', detail: 'PVGIS / World Bank / OWID / Open-Meteo / 公开 RSS-GDELT，全部免 key 无云成本。' },
          { label: 'MATRIX / 02', title: '八因素矩阵', detail: '市场增长/电力/光照/经济性/并网/政策/宏观/供应链，覆盖决策视角。' },
          { label: 'FLOW / 03', title: '准入到尽调', detail: '初筛→尽调→评审→准入/暂缓/淘汰，blocker 显式暴露。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '海外新能源决策，证据分散在不同频率的数据里。', body: '太阳辐照是地点估算、宏观经济是年度滞后、气象是 7 天预测、事件是驱动信号——把它们当成同频实时价格，是行业调研最常见的错误。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / FREQ', title: '数据频率不一', detail: '页面分别显示更新时点，避免把不同频数据误读成同一市场结论。' },
          { kicker: '02 / GAP', title: '缺少行动闭环', detail: '早期只回答"值不值得看"，不落到真实项目准入与尽调动作。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '从"研究"到"项目动作"，让结论可以被推进。', body: '把研究结果转成创建机会、准入评估、处理 blocker、由负责人推进阶段，并导出准入简报。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '多源特征仓', detail: '国家维度的观测、新闻摘要与评分快照分开保存，带来源/时间/覆盖。' },
          { title: '八因素影响矩阵', detail: '每一格呈现状态、来源、更新时间、覆盖率与影响解释。' },
          { title: '项目准入闭环', detail: '初筛/尽调/待评审/已准入/暂缓/淘汰，并网与经济性缺支撑时生成 blocker。' },
          { title: '报告一致性', detail: 'Word/PDF 使用一次生成的快照与 Evidence IDs，页面与报告不同版本。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '免费公开源', label: '零付费 API/云' },
          { value: 'observed/assumption', label: '证据状态区分' },
          { value: '已公开', label: '准入到简报闭环可跑' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '准入判断是否真的建立在证据上？', body: '上线后看两个核心指标：准入结论可回溯到证据的比例，与 blocker 的显式暴露率。两者越高，说明团队在依据证据做决策而非个人经验——这是这类决策工具最该被衡量的价值。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: '行业调研产品的护城河是"证据口径"。', body: '面试价值在于证明：能把跨频、跨源、带不确定性的行业信息，整理成可推进的产品判断。' }
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
        结果: '可运行可演示的 V1 已公开上线，含中英双语、明暗主题与展示页。'
      },
      metrics: ['已公开上线', '预约风险前置'],
      github: 'https://github.com/olivia-happy/visitors',
      caseFile: {
        scope: '国内城市旅行 · 执行型智能行程规划器',
        role: '产品定义 / 信息架构 / 交互闭环',
        decision: '预约提醒只依赖用户提供的小红书证据，AI 不凭空生成预约结论；方案生成后可锁定、移除、再优化，不做一次性答案。',
        evidence: [
          { label: 'EVIDENCE / 01', title: '预约风险前置', detail: '输入阶段即解析小红书链接中的预约要求，展示渠道、价格与证据摘录，避免出发才发现约不上。' },
          { label: 'ROUTE / 02', title: '可执行路线', detail: '结果页以小时级时间轴、地图点位、交通时长与预算拆分承载路线，而非一段长攻略。' },
          { label: 'CONTROL / 03', title: '可控生成', detail: '用户可锁定必去点、移除不感兴趣点，只对剩余路线重新优化，让 AI 跟着约束调方案。' }
        ]
      },
      caseSections: [
        { id: 'context', label: '背景', type: 'intro', title: '用户缺的不是"推荐几个景点"，而是出发前能执行的方案。', body: '做攻略往往要同时开小红书、地图、天气与票务；真正决定出行体验的是哪些景点要预约、路线顺不顺、预算够不够、自驾好不好停。' },
        { id: 'evidence', label: '洞察', type: 'evidence', items: [
          { kicker: '01 / PAIN', title: '信息分散难合并', detail: '攻略、地图、天气、预算散落在不同工具，用户要自己拼出一份可执行的计划。' },
          { kicker: '02 / RISK', title: '预约是隐性失败点', detail: '很多免费景点需提前预约，生成器只写"建议提前预约"无法识别具体渠道与证据。' }
        ] },
        { id: 'decision', label: '判断', type: 'decision', title: '把"预约风险"当作一等规划对象，而不是攻略里的脚注。', body: '聚焦国内城市执行型规划：预约证据前置到输入阶段，结果页按小时级行动组织，方案交给用户继续约束调整。' },
        { id: 'solution', label: '方案', type: 'steps', items: [
          { title: '预约证据解析', detail: '用户粘贴小红书链接，系统解析哪些景点需预约、渠道、价格与证据摘录，输入阶段即预览。' },
          { title: '小时级执行路线', detail: '结果页统一呈现路线摘要、时间轴、地图点位、交通时长与逐项理由。' },
          { title: '预算与准备清单', detail: '门票/餐饮/住宿/交通分区估算，叠加天气、证件、穿搭等行前清单与停车建议。' },
          { title: '可控再优化', detail: '锁定必去点、移除不想去的点，系统只对剩余路线重新规划。' }
        ] },
        { id: 'result', label: '结果', type: 'metrics', items: [
          { value: '全链路闭环', label: '需求→方案→展示→分享' },
          { value: '双入口', label: '快速规划 / 证据优先' },
          { value: '中英双语言', label: '页面可切换、主题明暗' }
        ] },
        { id: 'measure', label: '衡量', type: 'intro', title: '方案是否真的可执行、提醒是否真的有用？', body: '上线后看两个核心指标：方案可执行率与预约提示的命中/纠错比。前者衡量结果页是否真的能被照着走，后者衡量预约提醒是否准确——若用户照做后没再踩"约不上"，就说明证据优先的路径成立。' },
        { id: 'reflection', label: '复盘', type: 'reflection', title: 'AI 生成的价值在"能否执行"，而不是"答得多快"。', body: 'V1 的取舍是不追求预约渠道全覆盖，先验证证据优先 + 结构化输出 + 可控编辑的路径。下一步接入真实路线距离与官方预约窗口，把前端优化演示升级为可解释后端优化器。' }
      ]
    }
  ],
  principles: [
    { title: '问题定义', detail: '从业务目标而非功能需求出发，主动发现高价值问题，用数据确认它值得解决。' },
    { title: '能力边界', detail: '对模型能力边界有基本判断：AI 做什么、人判断什么；fail-closed 优于幻觉编造。' },
    { title: '验证指标', detail: '区分模型指标、产品指标与业务指标，用评测集、采纳率与成本账形成验证闭环。' },
    { title: '协同推进', detail: '以 Owner 意识推动跨团队落地，让算法、研发、业务、售前讲同一套评测口径。' }
  ],
  internships: [
    { period: '2026', title: '心动网络（XD.com） · AI 产品实习生', detail: '在企业级 AI 平台做 0→1：主导 Web 端视频/音频/图像/3D 四模态 6 款大模型接入，交付 6 份 PRD 与高保真原型，沉淀可复用的模型接入规范；从 0 定义计费规则与用量核算引擎，推动空账期数据口径矛盾闭环；自研飞书知识库 Git 镜像工具稳定同步 299 篇文档；独立交付 OA 审批外部人员管理产品与 469 条历史数据回录。', focus: '模型接入产品化 · B 端 0→1 交付', handoff: '把"官方事实与待确认项分离"与核算口径意识带进后续每个项目。' },
    { period: '2025', title: '法雷奥（Valeo） · AI 数据产品经理', detail: '基于 Wind Agent + Gemini 搭建投研自动化 Agent 工作流：Workflow 编排 + RAG 降幻觉，Prompt 迭代 20+ 版，单份研报周期缩短 60%。', focus: 'AIGC 工作流与 RAG 评测', handoff: '把评测集与成本账带进 AI 产品方法。' },
    { period: '2024', title: '特赞（Tezign） · AI 产品经理', detail: '主导风控模块产品定义与商业化路线图：6 款头部竞品矩阵 + 技术成熟度评估，A/B 测试与交叉验证持续优化风控规则。', focus: '产品定义与 A/B 验证', handoff: '把"调研-实验-迭代"做成可复用流程。' },
    { period: '2021', title: '中国平安 · 数据产品经理', detail: '从 VOC 用户原声里挖掘高价值问题并产品化：内部工具覆盖 120+ 员工，洞察落地 3 项策略，核心团队单月转化率提升 15%。', focus: '数据工具与业务赋能', handoff: '用数据口径驱动业务决策。' }
  ],
  campusExperiences: [
    { period: '2025', title: '数据要素大赛 · 全国一等奖', detail: '基金公告智能分析系统：OCR+BERT 混合方案，核心字段准确率 96%，单份耗时 3h→5min。', focus: '业务建模与评测', handoff: '字段提取 SOP + Prompt 交叉验证方法论。' },
    { period: '2025', title: '华为杯数学建模 · 全国二等奖', detail: '轴承振动信号故障预测：小波去噪 + 6 模型对比 + 5-fold 交叉验证，外圈故障预测准确率 90%。', focus: '特征工程与建模', handoff: '把模型能力讲成产品可验证的指标。' },
    { period: '2025', title: '正大杯市场调查 · 全国三等奖', detail: '《哪吒 2》IP 社交生态探索：K-Means 用户画像 + Logistic 预测，核心客群触达率提升 22%。', focus: '用户研究与增长', handoff: '从用户洞察到可运营的玩法方案。' }
  ]
};
