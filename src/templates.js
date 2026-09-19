export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderProductUi(project, index) {
  const kind = project.visual?.kind || 'generic';
  const uiClass = `product-ui product-ui--${kind}`;
  const steps = project.visual?.steps || [];
  const stepRow = steps.map((step, stepIndex) => `<span>0${stepIndex + 1}</span><strong>${escapeHtml(step)}</strong>`).join('');
  const [primaryMetric] = project.metrics || [];
  return `<div class="${uiClass}" aria-hidden="true">
    <div class="ui-bar"><span>${escapeHtml(project.visual?.label || 'CASE')}</span><i></i><i></i></div>
    <div class="ui-flow">${stepRow}</div>
    <div class="ui-metric"><small>KEY OUTCOME</small><strong>${escapeHtml(primaryMetric || '')}</strong></div>
    <div class="ui-trust"><span>${escapeHtml(project.caseFile?.role || '')}</span><strong>证据可核验</strong></div>
  </div>`;
}

function renderProjectLinks(project) {
  const links = [];
  if (project.github) links.push(`<a class="project-link project-link--code" href="${escapeHtml(project.github)}" target="_blank" rel="noreferrer">查看代码 ↗</a>`);
  if (project.demo) links.push(`<a class="project-link project-link--demo" href="${escapeHtml(project.demo)}" target="_blank" rel="noreferrer">在线 Demo ↗</a>`);
  if (!links.length) return '';
  return `<div class="project-links">${links.join('')}</div>`;
}

function renderProjectIndex(projects) {
  const controls = projects.map((project, index) => `
    <li><button class="project-index-control${index === 0 ? ' is-active' : ''}" type="button" data-project-index-control="${index}" aria-pressed="${String(index === 0)}" aria-controls="project-preview-${index + 1}"><span>0${index + 1}</span><strong>${escapeHtml(project.title.split('—')[0])}</strong><em>${escapeHtml(project.visual.label)}</em><i aria-hidden="true">→</i></button></li>
  `).join('');
  const previews = projects.map((project, index) => {
    const [primaryMetric] = project.metrics;
    return `<article class="project-preview${index === 0 ? ' is-active' : ''}" id="project-preview-${index + 1}" data-project-preview="${index}" ${index ? 'hidden' : ''} aria-labelledby="project-preview-title-${index + 1}">
      <div class="preview-copy"><p>SELECTED CASE / 0${index + 1}</p><h3 id="project-preview-title-${index + 1}">${escapeHtml(project.title)}</h3><p>${escapeHtml(project.caseFile.decision)}</p><dl><div><dt>ROLE</dt><dd>${escapeHtml(project.caseFile.role)}</dd></div><div><dt>OUTCOME</dt><dd>${escapeHtml(primaryMetric)}</dd></div></dl><div class="preview-actions">${renderProjectLinks(project)}<button class="project-open" type="button" data-project-open="${escapeHtml(project.slug)}">阅读案例 <span aria-hidden="true">→</span></button></div></div>${renderProductUi(project, index)}</article>`;
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
      <header class="case-reader-hero"><a class="case-reader-back" href="#top">← 返回主页</a><p>CASE STUDY / 0${index + 1}</p><h1>${escapeHtml(project.title)}</h1><span>${escapeHtml(project.caseFile.scope)}</span><div class="case-reader-links">${renderProjectLinks(project)}</div></header>
      <div class="case-reader-layout"><aside class="case-reader-toc" aria-label="案例目录"><p>CASE INDEX</p><ol>${project.caseSections.map((section, sectionIndex) => `<li><a href="#case=${escapeHtml(project.slug)}&section=${escapeHtml(section.id)}" data-case-reader-toc="${escapeHtml(section.id)}"><span>0${sectionIndex + 1}</span>${escapeHtml(section.label)}</a></li>`).join('')}</ol></aside><div class="case-reader-content">${project.caseSections.map((section, sectionIndex) => `<section class="case-section case-section--${escapeHtml(section.type)}" id="case-${escapeHtml(project.slug)}-${escapeHtml(section.id)}" data-case-reader-section="${escapeHtml(section.id)}"><p>0${sectionIndex + 1} / ${escapeHtml(section.label)}</p>${renderCaseSection(section)}</section>`).join('')}</div></div>
    </article>`).join('')}</section>`;
}

function renderPortraitStage(profile) {
  const tags = profile.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('');
  return `<aside class="hero-flower-stage" data-flower-stage aria-label="${escapeHtml(profile.name)}的个人照片">
    <div class="flower-bloom" aria-hidden="true">${renderFlowerPetals()}<b></b></div>
    <figure class="hero-portrait">
      <img src="./assets/janine-portrait.jpg" alt="${escapeHtml(profile.name)}（${escapeHtml(profile.englishName)}）个人照片" width="900" height="1200" decoding="async" />
      <figcaption>
        <strong>${escapeHtml(profile.name)} · ${escapeHtml(profile.englishName)}</strong>
        <em>统计学硕士（2027 届）· 上海</em>
        <ul aria-label="个人关键词">${tags}</ul>
      </figcaption>
    </figure>
  </aside>`;
}

function renderEducation(education, honors) {
  const cards = education.map((item) => `
    <article class="edu-card">
      <p class="edu-period">${escapeHtml(item.period)}</p>
      <h3>${escapeHtml(item.school)}</h3>
      <p class="edu-meta">${escapeHtml(item.faculty)} ｜ ${escapeHtml(item.degree)}<span>${escapeHtml(item.status)}</span></p>
      <ul class="edu-courses">${item.courses.map((course) => `<li>${escapeHtml(course)}</li>`).join('')}</ul>
      ${item.highlight ? `<p class="edu-highlight">${escapeHtml(item.highlight)}</p>` : ''}
    </article>`).join('');
  const honorItems = honors.map((honor) => `
    <li><span>${escapeHtml(honor.label)}</span><strong>${escapeHtml(honor.title)}</strong><em>${escapeHtml(honor.note)}</em></li>`).join('');
  return `<section id="education" class="section education-section" aria-labelledby="education-title"><div class="section-heading"><p class="eyebrow">04 / EDUCATION</p><h2 id="education-title">教育背景与获奖情况。</h2></div><div class="edu-grid reveal">${cards}</div><ul class="honor-list reveal">${honorItems}</ul></section>`;
}

function renderGrowthArchive(entries, typeLabel, dossierId) {
  const growthItems = entries.map((entry, index) => `<li class="growth-item${index === 0 ? ' is-active' : ''}"><button class="growth-control" type="button" data-growth-index="${index}" data-growth-period="${escapeHtml(entry.range || entry.period)}" data-growth-type="${escapeHtml(typeLabel)}" data-growth-title="${escapeHtml(entry.title)}" data-growth-detail="${escapeHtml(entry.detail)}" data-growth-focus="${escapeHtml(entry.focus)}" data-growth-handoff="${escapeHtml(entry.handoff)}" aria-pressed="${String(index === 0)}" aria-controls="${dossierId}"><span>${escapeHtml(entry.period)}</span><strong>${escapeHtml(entry.title)}</strong><em>${escapeHtml(typeLabel)}</em></button></li>`).join('');
  const initialGrowth = entries[0];
  return `<div class="growth-archive"><div class="growth-progress" aria-hidden="true"><span></span></div><ol class="growth-track">${growthItems}</ol><aside id="${dossierId}" aria-live="polite" class="growth-dossier"><p data-growth-dossier-meta>${escapeHtml(initialGrowth.range || initialGrowth.period)} / ${escapeHtml(typeLabel)}</p><h3 data-growth-dossier-title>${escapeHtml(initialGrowth.title)}</h3><p class="growth-detail" data-growth-dossier-detail>${escapeHtml(initialGrowth.detail)}</p><dl><div><dt>本阶段沉淀</dt><dd data-growth-dossier-focus>${escapeHtml(initialGrowth.focus)}</dd></div><div><dt>带往下一阶段</dt><dd data-growth-dossier-handoff>${escapeHtml(initialGrowth.handoff)}</dd></div></dl></aside></div>`;
}

function renderFlowerPetals() {
  return Array.from({ length: 34 }, (_, index) => {
    const angle = (index * 137.5) % 360;
    const radius = 92 + (index % 8) * 8;
    const scale = 0.58 + (index % 5) * .12;
    return `<i class="flower-petal" style="--angle:${angle}deg;--radius:${radius}%;--scale:${scale};--delay:-${(index * .31).toFixed(2)}s" aria-hidden="true"></i>`;
  }).join('');
}

export function renderPortfolio({ profile, projects, principles, internships, campusExperiences, education, honors }) {
  const workArchive = renderGrowthArchive(internships, '实际经历', 'growth-dossier-work');
  const campusArchive = renderGrowthArchive(campusExperiences, '校园经历', 'growth-dossier-campus');
  const principleItems = principles.map(({ title, detail }) => `<li><strong>${escapeHtml(title)}</strong><p>${escapeHtml(detail)}</p></li>`).join('');
  return `<main id="content" data-portfolio-home><div class="pointer-light" aria-hidden="true"></div>
    <section id="top" class="hero-docket" aria-labelledby="hero-title"><div class="hero-summary"><p class="eyebrow">AI PRODUCT MANAGER · PORTFOLIO</p><h1 id="hero-title">${escapeHtml(profile.name)}<span>${escapeHtml(profile.englishName)}</span></h1><p class="hero-role">${escapeHtml(profile.role)}</p><p class="hero-statement">${escapeHtml(profile.thesis)}</p><p class="hero-introduction">${escapeHtml(profile.introduction)}</p><ul class="hero-counts"><li>${projects.length} 个代表项目</li><li>${internships.length} 段实际经历</li><li>${campusExperiences.length} 段校园经历</li></ul><a class="hero-link" href="#projects">浏览代表项目 <span aria-hidden="true">→</span></a><div class="hero-proof-strip" aria-label="核心能力"><span>评测集与口径</span><span>RAG / Agent 编排</span><span>四模态模型接入</span><span>用量计费规则</span></div></div>${renderPortraitStage(profile)}</section>
    <section class="hero-ai-method" aria-label="AI 产品工作方式"><p>AI PRODUCT PRACTICE</p><strong>先定口径 <i>→</i> 再做方案 <i>→</i> 跑评测 <i>→</i> 才下结论</strong><span>顺序倒过来，方案会更好看，但到了业务那边一问数字就站不住。</span></section>
    <section id="projects" class="section projects-section" aria-labelledby="projects-title"><div class="section-heading"><p class="eyebrow">01 / SELECTED CASES</p><h2 id="projects-title">5 个项目，源码和文档都公开。</h2></div>${renderProjectIndex(projects)}</section>
    <section id="principles" class="section principles-section" aria-labelledby="principles-title"><div class="section-heading"><p class="eyebrow">02 / HOW I WORK</p><h2 id="principles-title">我判断一个 AI 功能该不该做，看这四条。</h2></div><ol class="principle-list">${principleItems}</ol></section>
    <section id="journey" class="section journey-section" aria-labelledby="journey-title"><div class="section-heading"><p class="eyebrow">03 / EXPERIENCE</p><h2 id="journey-title">每一段经历留下了什么，我写在右边。</h2></div><div class="growth-groups"><div class="growth-group" id="journey-work"><div class="growth-group-heading"><p class="eyebrow">WORK / INTERNSHIP</p><h3>实际经历</h3><span>把需求推进成可交付的产品与数据方案</span></div>${workArchive}</div><div class="growth-group" id="journey-campus"><div class="growth-group-heading"><p class="eyebrow">CAMPUS</p><h3>校园经历</h3><span>竞赛与学术场里练出的方法与判断</span></div>${campusArchive}</div></div></section>
    ${renderEducation(education, honors)}
    <section id="contact" class="contact-section" aria-labelledby="contact-title"><p class="eyebrow">05 / CONTACT</p><h2 id="contact-title">想聊哪个项目，或者直接发我 JD。</h2><p class="contact-availability">${escapeHtml(profile.availability)}</p><div class="contact-links"><a href="mailto:${escapeHtml(profile.contact)}">✉️ ${escapeHtml(profile.contact)}</a><a href="${escapeHtml(profile.github)}" target="_blank" rel="noreferrer">🐙 GitHub 主页 <span aria-hidden="true">↗</span></a></div></section></main>${renderCaseReader(projects)}`;
}
