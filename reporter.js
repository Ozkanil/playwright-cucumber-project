const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, 'reports');
const jsonPath = path.join(reportDir, 'cucumber-report.json');
const htmlDir = path.join(reportDir, 'html');
const htmlPath = path.join(htmlDir, 'index.html');

fs.mkdirSync(htmlDir, { recursive: true });

function readReport() {
  try {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function getStatus(step) {
  const status = step.result ? step.result.status : 'skipped';
  return status;
}

function renderStatusBadge(status) {
  const colors = {
    passed: '#2e7d32',
    failed: '#d32f2f',
    skipped: '#f9a825',
    pending: '#0288d1',
    undefined: '#607d8b',
  };

  return `<span style="background:${colors[status] || '#607d8b'}; color:white; padding:4px 8px; border-radius:12px; font-size:12px;">${status}</span>`;
}

function renderStep(step) {
  const status = getStatus(step);
  return `
    <li>
      <div>${step.keyword || ''}${step.name || ''}</div>
      <div>${renderStatusBadge(status)}</div>
    </li>
  `;
}

function renderScenario(scenario) {
  const steps = (scenario.steps || []).map(renderStep).join('');
  const status = (scenario.steps || []).some((step) => getStatus(step) === 'failed') ? 'failed' : 'passed';

  return `
    <section style="margin-bottom:24px; border:1px solid #ddd; border-radius:8px; padding:16px;">
      <h3>${scenario.name}</h3>
      ${renderStatusBadge(status)}
      <ul style="padding-left:20px; margin-top:12px;">${steps}</ul>
    </section>
  `;
}

function renderFeature(feature) {
  const scenarios = (feature.elements || []).map(renderScenario).join('');
  return `
    <section style="margin-bottom:32px;">
      <h2>${feature.name}</h2>
      ${scenarios}
    </section>
  `;
}

const report = readReport();
const features = Array.isArray(report) ? report : [];

const summary = {
  total: features.reduce((total, feature) => total + (feature.elements ? feature.elements.length : 0), 0),
  passed: 0,
  failed: 0,
  skipped: 0,
};

features.forEach((feature) => {
  (feature.elements || []).forEach((scenario) => {
    const statuses = (scenario.steps || []).map(getStatus);
    if (statuses.includes('failed')) summary.failed += 1;
    else if (statuses.includes('skipped') || statuses.includes('pending')) summary.skipped += 1;
    else summary.passed += 1;
  });
});

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cucumber HTML Report</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 24px; background: #f5f5f5; color: #222; }
      .summary { display: flex; gap: 16px; margin: 24px 0; }
      .card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 16px; min-width: 120px; }
      h1, h2, h3 { margin-top: 0; }
      ul { line-height: 1.7; }
      li { margin-bottom: 8px; }
      .status { display: inline-block; }
    </style>
  </head>
  <body>
    <h1>OrangeHRM Cucumber Report</h1>

    <div class="summary">
      <div class="card"><strong>Total</strong><br>${summary.total}</div>
      <div class="card"><strong>Passed</strong><br>${summary.passed}</div>
      <div class="card"><strong>Failed</strong><br>${summary.failed}</div>
      <div class="card"><strong>Skipped</strong><br>${summary.skipped}</div>
    </div>

    ${features.map(renderFeature).join('')}
  </body>
</html>`;

fs.writeFileSync(htmlPath, html, 'utf8');
console.log(`HTML report created at: ${htmlPath}`);
