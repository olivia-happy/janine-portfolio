import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { portfolio } from '../src/data.js';
import { renderPortfolio } from '../src/templates.js';

test('fictional portfolio data retains two projects and separate internship and campus records', () => {
  assert.match(portfolio.notice, /虚构|示例/);
  assert.equal(portfolio.projects.length, 2);
  assert.equal(portfolio.internships.length, 2);
  assert.equal(portfolio.campusExperiences.length, 2);
});

test('white portfolio hero presents identity and an animated flower bouquet', async () => {
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
  assert.doesNotMatch(shell, /page-river-canvas/);
});

test('portfolio uses an explorable project index instead of stacked case cards', async () => {
  const [html, css] = await Promise.all([renderPortfolio(portfolio), readFile('src/styles.css', 'utf8')]);

  assert.ok(html.indexOf('id="projects"') < html.indexOf('id="journey"'));
  assert.equal((html.match(/data-project-index-control/g) || []).length, 2);
  assert.match(html, /class="project-index-gallery reveal"/);
  assert.match(html, /class="project-preview-stage"/);
  assert.match(html, /class="product-ui knowledge-ui"/);
  assert.match(html, /class="product-ui copilot-ui"/);
  assert.match(css, /\.project-index-gallery/);
  assert.match(css, /\.project-preview-stage/);
});

test('project index and growth interaction controls remain accessible', async () => {
  const [html, app] = await Promise.all([renderPortfolio(portfolio), readFile('src/app.js', 'utf8')]);

  assert.equal((html.match(/data-project-index-control/g) || []).length, 2);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /id="growth-dossier" aria-live="polite"/);
  assert.match(app, /function initProjectIndex\(\)/);
  assert.match(app, /function initGrowthControls\(\)/);
  assert.match(app, /ArrowRight/);
  assert.match(app, /ArrowDown/);
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

test('white floral motion respects reduced-motion and keyboard focus preferences', async () => {
  const css = await readFile('src/styles.css', 'utf8');

  assert.match(css, /a:focus-visible, button:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.flower-bloom \{ display: none; \}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.flower-petal \{ animation: none; \}/);
});

test('project index opens route-driven case readers and keeps distinct product interfaces', async () => {
  const [html, app, css] = await Promise.all([
    renderPortfolio(portfolio),
    readFile('src/app.js', 'utf8'),
    readFile('src/styles.css', 'utf8')
  ]);

  assert.equal((html.match(/data-project-open/g) || []).length, 2);
  assert.equal((html.match(/data-case-reader-project/g) || []).length, 2);
  assert.match(html, /data-project-open="knowledge-assistant"/);
  assert.match(html, /data-project-open="content-copilot"/);
  assert.match(html, /class="product-ui knowledge-ui/);
  assert.match(html, /class="product-ui copilot-ui/);
  assert.match(app, /function initProjectIndex\(\)/);
  assert.match(app, /window\.location\.hash/);
  assert.match(app, /#case=\$\{button\.dataset\.projectOpen\}/);
  assert.match(css, /\.case-reader/);
  assert.match(css, /\.knowledge-ui/);
  assert.match(css, /\.copilot-ui/);
});

test('interactive gallery has no stale visual selectors', async () => {
  const [app, css] = await Promise.all([
    readFile('src/app.js', 'utf8'),
    readFile('src/styles.css', 'utf8')
  ]);

  assert.doesNotMatch(app, /\.method-loop/);
  assert.doesNotMatch(css, /\.project-visual/);
});

test('pointer interactions expose a soft light field and timeline progress', async () => {
  const [html, app, css] = await Promise.all([
    renderPortfolio(portfolio),
    readFile('src/app.js', 'utf8'),
    readFile('src/styles.css', 'utf8')
  ]);

  assert.match(html, /class="growth-progress"/);
  assert.match(app, /function initPointerLight\(\)/);
  assert.match(app, /function initGrowthProgress\(\)/);
  assert.match(css, /\.pointer-light/);
  assert.match(css, /\.growth-progress/);
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
