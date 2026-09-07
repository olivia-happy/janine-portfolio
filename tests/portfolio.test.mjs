import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { portfolio } from '../src/data.js';
import { renderPortfolio } from '../src/templates.js';

test('portfolio data keeps four technical cases and separate experience records', () => {
  assert.equal(portfolio.projects.length, 4);
  assert.equal(portfolio.internships.length, 3);
  assert.equal(portfolio.campusExperiences.length, 3);
  assert.match(portfolio.profile.name, /袁靓/);
  assert.match(portfolio.profile.englishName, /Janine/);
  assert.ok(portfolio.projects.every((project) => project.slug && project.caseSections?.length));
});

test('real profile renders hero identity and animated flower stage', async () => {
  const [html, css, app, shell] = await Promise.all([
    renderPortfolio(portfolio),
    readFile('src/styles.css', 'utf8'),
    readFile('src/app.js', 'utf8'),
    readFile('index.html', 'utf8')
  ]);

  assert.match(html, /class="hero-flower-stage"/);
  assert.match(html, /class="flower-bloom"/);
  assert.match(html, /class="hero-proof-strip"/);
  assert.match(html, /class="hero-ai-method"/);
  assert.match(html, /data-flower-stage/);
  assert.match(html, /SELECTED CASE/);
  assert.match(css, /--paper:\s*#FCFCFA;/);
  assert.match(css, /\.hero-flower-stage/);
  assert.match(css, /\.hero-proof-strip/);
  assert.match(css, /\.hero-ai-method/);
  assert.match(css, /@keyframes petal-drift/);
  assert.match(app, /function initFlowerBloom\(\)/);
  assert.match(app, /flowerStage\.addEventListener\('pointermove'/);
  assert.match(app, /initFlowerBloom\(\);/);
  assert.doesNotMatch(shell, /虚构样稿/);
});

test('portfolio uses an explorable project index with four cases', async () => {
  const [html, css] = await Promise.all([renderPortfolio(portfolio), readFile('src/styles.css', 'utf8')]);

  assert.ok(html.indexOf('id="projects"') < html.indexOf('id="journey"'));
  assert.equal((html.match(/data-project-index-control/g) || []).length, 4);
  assert.match(html, /class="project-index-gallery reveal"/);
  assert.match(html, /class="project-preview-stage"/);
  assert.match(html, /product-ui product-ui--embodied/);
  assert.match(html, /product-ui product-ui--energy/);
  assert.match(css, /\.project-index-gallery/);
  assert.match(css, /\.project-preview-stage/);
});

test('project index and growth interaction controls remain accessible', async () => {
  const [html, app] = await Promise.all([renderPortfolio(portfolio), readFile('src/app.js', 'utf8')]);

  assert.equal((html.match(/data-project-index-control/g) || []).length, 4);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /id="growth-dossier" aria-live="polite"/);
  assert.match(app, /function initProjectIndex\(\)/);
  assert.match(app, /function initGrowthControls\(\)/);
  assert.match(app, /ArrowRight/);
  assert.match(app, /ArrowDown/);
});

test('case previews expose code / demo links for published projects', async () => {
  const html = renderPortfolio(portfolio);
  assert.match(html, /github\.com\/olivia-happy\/embodiedops/);
  assert.match(html, /github\.com\/olivia-happy\/moba-build-agent/);
  assert.match(html, /class="project-link project-link--code"/);
  assert.ok(html.indexOf('class="project-open"') > -1);
});

test('navigation follows the current section and supports mobile access', async () => {
  const [css, app] = await Promise.all([readFile('src/styles.css', 'utf8'), readFile('src/app.js', 'utf8')]);

  assert.match(css, /@media \(min-width: 960px\)[\s\S]*?\.site-nav \{ position: fixed;/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.menu-button \{ display: inline-flex;/);
  assert.match(app, /function initActiveNavigation\(\)/);
  assert.match(app, /link\.setAttribute\('aria-current', 'page'\)/);
  assert.match(app, /function initReadingProgress\(\)/);
  assert.match(css, /\.page-progress/);
});

test('floral motion respects reduced-motion and keyboard focus preferences', async () => {
  const css = await readFile('src/styles.css', 'utf8');

  assert.match(css, /a:focus-visible, button:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.flower-bloom \{ display: none; \}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.flower-petal \{ animation: none; \}/);
});

test('case reader routes by slug for all four projects', async () => {
  const [html, app, css] = await Promise.all([
    renderPortfolio(portfolio),
    readFile('src/app.js', 'utf8'),
    readFile('src/styles.css', 'utf8')
  ]);

  assert.equal((html.match(/data-project-open/g) || []).length, 4);
  assert.equal((html.match(/data-case-reader-project/g) || []).length, 4);
  for (const slug of ['embodiedops', 'moba-build-agent', 'flashsight', 'atlasiq']) {
    assert.match(html, new RegExp(`data-project-open="${slug}"`));
    assert.match(html, new RegExp(`data-case-reader-project="${slug}"`));
  }
  assert.match(app, /function initProjectIndex\(\)/);
  assert.match(app, /window\.location\.hash/);
  assert.match(app, /#case=\$\{button\.dataset\.projectOpen\}/);
  assert.match(css, /\.case-reader/);
  assert.match(css, /\.product-ui--energy/);
});

test('case reader is data-driven with route-ready long-form sections', async () => {
  const [html, app, css] = await Promise.all([
    renderPortfolio(portfolio),
    readFile('src/app.js', 'utf8'),
    readFile('src/styles.css', 'utf8')
  ]);

  assert.equal(portfolio.projects.every((project) => project.slug && project.caseSections?.length), true);
  assert.match(html, /class="case-reader"/);
  assert.match(html, /data-case-reader/);
  assert.match(html, /data-case-reader-section/);
  assert.match(html, /class="case-reader-toc"/);
  assert.match(app, /function initCaseReaderRouter\(\)/);
  assert.match(app, /hashchange/);
  assert.match(app, /#case=/);
  assert.match(css, /\.case-reader/);
  assert.match(css, /\.case-reader-toc/);
  assert.match(css, /\.case-section/);
});
