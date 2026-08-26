export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderProductUi(project, index) {
  if (index === 0) {
    return `<div class="product-ui knowledge-ui" aria-hidden="true">
      <div class="ui-bar"><span>KNOWLEDGE DESK</span><i></i><i></i></div>
      <div class="ui-search">如何申请跨部门权限？ <b>→</b></div>
      <div class="ui-results"><div><span>01</span><strong>权限申请流程</strong><em>HR · 2026.04</em></div><div><span>02</span><strong>审批节点与时限</strong><em>IT · 2026.03</em></div><div><span>03</span><strong>例外处理说明</strong><em>Admin · 2026.01</em></div></div>
      <div class="ui-trust"><span>3 sources cited</span><strong>可信回答</strong></div>
    </div>`;
  }
  return `<div class="product-ui copilot-ui" aria-hidden="true">
    <div class="ui-bar"><span>CONTENT COPILOT</span><i></i><i></i></div>
    <div class="copilot-brief"><span>Campaign brief</span><strong>新品预热 · 社群触达</strong></div>
    <div class="copilot-flow"><div>策略模板</div><i>→</i><div>AI 初稿</div><i>→</i><div>人工编辑</div></div>
    <div class="copilot-cards"><span>目标人群</span><span>核心卖点</span><span>语气限制</span></div>
    <div class="copilot-status"><b></b> Draft ready for review</div>
  </div>`;
}

function renderProjectIndex(projects) {
  const controls = projects.map((project, index) => `
    <li><button class="project-index-control${index === 0 ? ' is-active' : ''}" type="button" data-project-index-control="${index}" aria-pressed="${String(index === 0)}" aria-controls="project-preview-${index + 1}"><span>0${index + 1}</span><strong>${escapeHtml(project.title.split('—')[0])}</strong><em>${escapeHtml(project.visual.label)}</em><i aria-hidden="true">→</i></button></li>
  `).join('');
  const previews = projects.map((project, index) => {
    const [primaryMetric] = project.metrics;
    return `<article class="project-preview${index === 0 ? ' is-active' : ''}" id="project-preview-${index + 1}" data-project-preview="${index}" ${index ? 'hidden' : ''} aria-labelledby="project-preview-title-${index + 1}">
      <div class="preview-copy"><p>SELECTED CASE / 0${index + 1}</p><h3 id="project-preview-title-${index + 1}">${escapeHtml(project.title)}</h3><p>${escapeHtml(project.caseFile.decision)}</p><dl><div><dt>ROLE</dt><dd>${escapeHtml(project.caseFile.role)}</dd></div><div><dt>OUTCOME</dt><dd>${escapeHtml(primaryMetric)}</dd></div></dl><button class="project-open" type="button" data-project-open="${escapeHtml(project.slug)}">阅读案例 <span aria-hidden="true">→</span></button></div>${renderProductUi(project, index)}</article>`;
  }).join('');
  return `<div class="project-index-gallery reveal"><div class="project-index-list"><p>WORK INDEX</p><ol>${controls}</ol><span>Hover / click to explore</span></div><div class="project-preview-stage">${previews}</div></div>`;
}

function renderCaseSection(section) {
  if (section.type === 'evidence') return `<div class="case-evidence-grid">${section.items.map((item) => `<article><p>${escapeHtml(item.kicker)}</p><h3>${escapeHtml(item.title)}</h3><span>${escapeHtml(item.detail)}</span></article>`).join('')}</div>`;
  if (section.type === 'steps') return `<ol class="case-steps">${section.items.map((item, index) => `<li><span>0${index + 1}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.detail)}</p></div></li>`).join('')}</ol>`;
  if (section.type === 'metrics') return `<div class="case-metrics">${section.items.map((item) => `<article><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></article>`).join('')}</div>`;
  return `<div class="case-copy"><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></div>`;
}

function renderCaseReader(projects) {
  return `<section class="case-reader" data-case-reader hidden aria-live="polite">${projects.map((project, index) => `
    <article class="case-reader-project" data-case-reader-project="${escapeHtml(project.slug)}" ${index ? 'hidden' : ''}>
      <header class="case-reader-hero"><a class="case-reader-back" href="#top">← 返回主页</a><p>CASE STUDY / 0${index + 1}</p><h1>${escapeHtml(project.title)}</h1><span>${escapeHtml(project.caseFile.scope)}</span></header>
      <div class="case-reader-layout"><aside class="case-reader-toc" aria-label="案例目录"><p>CASE INDEX</p><ol>${project.caseSections.map((section, sectionIndex) => `<li><a href="#case=${escapeHtml(project.slug)}&section=${escapeHtml(section.id)}" data-case-reader-toc="${escapeHtml(section.id)}"><span>0${sectionIndex + 1}</span>${escapeHtml(section.label)}</a></li>`).join('')}</ol></aside><div class="case-reader-content">${project.caseSections.map((section, sectionIndex) => `<section class="case-section case-section--${escapeHtml(section.type)}" id="case-${escapeHtml(project.slug)}-${escapeHtml(section.id)}" data-case-reader-section="${escapeHtml(section.id)}"><p>0${sectionIndex + 1} / ${escapeHtml(section.label)}</p>${renderCaseSection(section)}</section>`).join('')}</div></div>
    </article>`).join('')}</section>`;
}

function getGrowthEntries(internships, campusExperiences) {
  return [...campusExperiences.map((entry) => ({ ...entry, type: '校园经历' })), ...internships.map((entry) => ({ ...entry, type: '实习经历' }))]
    .sort((left, right) => Number(left.period) - Number(right.period));
}

function renderFlowerPetals() {
  return Array.from({ length: 34 }, (_, index) => {
    const angle = (index * 137.5) % 360;
    const radius = 16 + (index % 8) * 9;
    const scale = 0.64 + (index % 5) * .13;
    return `<i class="flower-petal" style="--angle:${angle}deg;--radius:${radius}%;--scale:${scale};--delay:-${(index * .31).toFixed(2)}s" aria-hidden="true"></i>`;
  }).join('');
}

export function renderPortfolio({ notice, profile, projects, principles, internships, campusExperiences }) {
  const entries = getGrowthEntries(internships, campusExperiences);
  const initialGrowth = entries[0];
  const tags = profile.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('');
  const growthItems = entries.map((entry, index) => `<li class="growth-item${index === 0 ? ' is-active' : ''}"><button class="growth-control" type="button" data-growth-index="${index}" data-growth-period="${escapeHtml(entry.period)}" data-growth-type="${escapeHtml(entry.type)}" data-growth-title="${escapeHtml(entry.title)}" data-growth-detail="${escapeHtml(entry.detail)}" data-growth-focus="${escapeHtml(entry.focus)}" data-growth-handoff="${escapeHtml(entry.handoff)}" aria-pressed="${String(index === 0)}" aria-controls="growth-dossier"><span>${escapeHtml(entry.period)}</span><strong>${escapeHtml(entry.title)}</strong><em>${escapeHtml(entry.type)}</em></button></li>`).join('');
  const principleItems = principles.map(({ title, detail }) => `<li><strong>${escapeHtml(title)}</strong><p>${escapeHtml(detail)}</p></li>`).join('');
  return `<main id="content" data-portfolio-home><div class="pointer-light" aria-hidden="true"></div><p class="sample-notice">${escapeHtml(notice)}</p>
    <section id="top" class="hero-docket" aria-labelledby="hero-title"><div class="hero-summary"><p class="eyebrow">AI PRODUCT MANAGER · PORTFOLIO</p><h1 id="hero-title">${escapeHtml(profile.name)}<span>${escapeHtml(profile.englishName)}</span></h1><p class="hero-role">${escapeHtml(profile.role)}</p><p class="hero-statement">${escapeHtml(profile.thesis)}</p><p class="hero-introduction">${escapeHtml(profile.introduction)}</p><ul class="hero-counts"><li>${internships.length} 段实习</li><li>${projects.length} 个代表项目</li><li>${campusExperiences.length} 段校园经历</li></ul><a class="hero-link" href="#projects">浏览代表项目 <span aria-hidden="true">→</span></a><div class="hero-proof-strip" aria-label="核心能力"><span>用户研究</span><span>AI 评测</span><span>跨团队推进</span></div></div><aside class="hero-flower-stage" data-flower-stage aria-label="蓝粉银动态花团"><p>SELECTED WORK</p><div class="flower-bloom">${renderFlowerPetals()}<b aria-hidden="true"></b></div><div class="flower-caption"><span>2026 / AI PM</span><strong>从洞察到可落地的判断</strong><ul>${tags}</ul></div></aside></section>
    <section class="hero-ai-method" aria-label="AI 产品工作方式"><p>AI PRODUCT PRACTICE</p><strong>场景拆解 <i>→</i> 能力边界 <i>→</i> 评测口径 <i>→</i> 灰度反馈</strong><span>不把 AI 当作功能点，而是把它做成可验证、可迭代的产品体验。</span></section>
    <section id="projects" class="section projects-section" aria-labelledby="projects-title"><div class="section-heading"><p class="eyebrow">01 / SELECTED CASES</p><h2 id="projects-title">先看我如何把问题推进到结果。</h2></div>${renderProjectIndex(projects)}</section>
    <section id="principles" class="section principles-section" aria-labelledby="principles-title"><div class="section-heading"><p class="eyebrow">02 / HOW I WORK</p><h2 id="principles-title">每一次推进，都回到真正的问题。</h2></div><ol class="principle-list">${principleItems}</ol></section>
    <section id="journey" class="section journey-section" aria-labelledby="journey-title"><div class="section-heading"><p class="eyebrow">03 / EXPERIENCE</p><h2 id="journey-title">实习与校园经历，是能力逐步成形的过程。</h2></div><div class="growth-archive"><div class="growth-progress" aria-hidden="true"><span></span></div><ol class="growth-track">${growthItems}</ol><aside id="growth-dossier" aria-live="polite" class="growth-dossier"><p data-growth-dossier-meta>${escapeHtml(initialGrowth.period)} / ${escapeHtml(initialGrowth.type)}</p><h3 data-growth-dossier-title>${escapeHtml(initialGrowth.title)}</h3><p class="growth-detail" data-growth-dossier-detail>${escapeHtml(initialGrowth.detail)}</p><dl><div><dt>本阶段沉淀</dt><dd data-growth-dossier-focus>${escapeHtml(initialGrowth.focus)}</dd></div><div><dt>带往下一阶段</dt><dd data-growth-dossier-handoff>${escapeHtml(initialGrowth.handoff)}</dd></div></dl></aside></div></section>
    <section id="contact" class="contact-section" aria-labelledby="contact-title"><p class="eyebrow">04 / CONTACT</p><h2 id="contact-title">期待一次有价值的产品讨论。</h2><a href="mailto:${escapeHtml(profile.contact)}">${escapeHtml(profile.contact)}</a></section></main>${renderCaseReader(projects)}`;
}
