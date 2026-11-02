(() => {
  const data = window.CSTW_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = { sector: "Catholic", metric: "salary", support: "mentoring" };

  const formats = {
    salary: { label: "Average base salary", format: value => `$${value.toLocaleString()}` },
    schoolEarnings: { label: "School-related earnings", format: value => `$${value.toLocaleString()}` },
    totalEarnings: { label: "Total annual earnings", format: value => `$${value.toLocaleString()}` },
    hours: { label: "Total weekly work", format: value => `${value.toFixed(1)} hrs` },
    instruction: { label: "Weekly instruction", format: value => `${value.toFixed(1)} hrs` },
    classSize: { label: "Average class size", format: value => value.toFixed(1) },
    students: { label: "Students taught", format: value => value.toFixed(1) },
    pupilFte: { label: "Students per FTE teacher", format: value => value.toFixed(1) },
    supplies: { label: "Personal spending on supplies", format: value => `$${value.toLocaleString()}` }
  };

  function renderMetrics() {
    const sector = data.sectors[state.sector];
    const age = $("#metric-age");
    const experience = $("#metric-experience");
    const salary = $("#metric-salary");
    const hours = $("#metric-hours");
    if (age) age.textContent = sector.age.toFixed(1);
    if (experience) experience.textContent = sector.experience.toFixed(1);
    if (salary) salary.textContent = `$${sector.salary.toLocaleString()}`;
    if (hours) hours.textContent = sector.hours.toFixed(1);
    $$("[data-current-sector]").forEach(node => node.textContent = state.sector);
  }

  function renderBars(container, rows, max, formatter, gold = false) {
    container.innerHTML = "";
    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML = `
        <div class="bar-label">${label}</div>
        <div class="bar-track" role="img" aria-label="${label}: ${formatter(value)}"><div class="bar-fill${gold ? " gold" : ""}" style="width:${Math.max(0, value / max * 100)}%"></div></div>
        <div class="bar-value">${formatter(value)}</div>`;
      container.appendChild(row);
    });
  }

  function renderProfile() {
    const rows = Object.entries(data.sectors[state.sector].profile);
    renderBars($("#profile-chart"), rows, 100, value => `${value.toFixed(1)}%`);
  }

  function renderWorkload() {
    const meta = formats[state.metric];
    const rows = Object.entries(data.sectors).map(([sector, values]) => [sector, values[state.metric]]);
    const max = Math.max(...rows.map(row => row[1])) * 1.15;
    $("#workload-title").textContent = meta.label;
    renderBars($("#workload-chart"), rows, max, meta.format, true);
  }

  function renderRetention() {
    const entries = Object.entries(data.sectors[state.sector].retention);
    const bar = $("#retention-bar");
    const key = $("#retention-key");
    bar.innerHTML = "";
    key.innerHTML = "";
    entries.forEach(([label, value]) => {
      const segment = document.createElement("div");
      segment.className = "retention-segment";
      segment.style.flexBasis = `${value}%`;
      segment.title = `${label}: ${value.toFixed(1)}%`;
      segment.setAttribute("aria-label", segment.title);
      segment.innerHTML = value >= 8 ? `<span>${value.toFixed(1)}%</span>` : "";
      bar.appendChild(segment);

      const item = document.createElement("div");
      item.className = "retention-key-item";
      item.innerHTML = `<span>${label}</span><strong>${value.toFixed(1)}%</strong>`;
      key.appendChild(item);
    });
  }

  function renderSupports() {
    const group = data.supportGroups[state.support];
    const chart = $("#support-chart");
    if (!chart) return;
    const title = $("#support-title");
    if (title) title.textContent = group.label;
    chart.innerHTML = "";
    group.rows.forEach(([label, stay, undecided]) => {
      const wrapper = document.createElement("div");
      wrapper.className = "support-pair";
      wrapper.innerHTML = `<div class="bar-label" style="margin-bottom:8px;font-weight:700">${label}</div>`;
      const bars = document.createElement("div");
      bars.className = "bar-chart";
      bars.style.gap = "7px";
      renderBars(bars, [["Remain", stay], ["Undecided", undecided]], 70, value => `${value.toFixed(1)}%`);
      bars.querySelector(".bar-row:nth-child(2) .bar-fill")?.classList.add("gold");
      wrapper.appendChild(bars);
      chart.appendChild(wrapper);
    });
  }

  function renderDemographicTrends() {
    const container = $("#demographic-trends");
    if (!container) return;
    container.innerHTML = "";
    data.trends.demographics.forEach(item => {
      const row = document.createElement("div");
      row.className = "slope-row";
      const start = item.start / item.max * 100;
      const end = item.end / item.max * 100;
      row.innerHTML = `
        <div class="slope-label"><strong>${item.label}</strong><span>Share of Catholic teachers</span></div>
        <div class="slope-track" role="img" aria-label="${item.label}: ${item.start.toFixed(1)} percent in ${item.startYear} and ${item.end.toFixed(1)} percent in ${item.endYear}">
          <span class="slope-value" style="left:${start}%">${item.start.toFixed(1)}%</span>
          <i class="slope-point" style="left:${start}%"></i>
          <small class="slope-year" style="left:${start}%">${item.startYear}</small>
          <span class="slope-value" style="left:${end}%">${item.end.toFixed(1)}%</span>
          <i class="slope-point later" style="left:${end}%"></i>
          <small class="slope-year" style="left:${end}%">${item.endYear}</small>
        </div>`;
      container.appendChild(row);
    });
  }

  function renderAutonomyTrends() {
    const container = $("#autonomy-trends");
    if (!container) return;
    const { years, rows } = data.trends.autonomy;
    container.innerHTML = `<div class="series-legend"><span><i></i>Teaching techniques</span><span><i class="alt"></i>Student discipline</span></div>`;
    years.forEach((year, yearIndex) => {
      const row = document.createElement("div");
      row.className = "series-row";
      const values = rows.map(series => series.values[yearIndex]);
      row.innerHTML = `<span>${year}</span><i aria-hidden="true"><b style="width:${values[0]}%"></b></i><strong>${values[0].toFixed(1)}%</strong>`;
      container.appendChild(row);
      const second = document.createElement("div");
      second.className = "series-row";
      second.innerHTML = `<span aria-hidden="true"></span><i aria-hidden="true"><b class="alt" style="width:${values[1]}%"></b></i><strong>${values[1].toFixed(1)}%</strong>`;
      second.setAttribute("aria-label", `${year}: ${values[0].toFixed(1)} percent great control over teaching techniques and ${values[1].toFixed(1)} percent great control over student discipline`);
      container.appendChild(second);
    });
  }

  function renderPreparation() {
    const container = $("#preparation-chart");
    if (!container) return;
    container.innerHTML = "";
    data.trends.preparation.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "mini-bar";
      row.innerHTML = `<span>${label}</span><i role="img" aria-label="${label}: ${value.toFixed(1)} percent"><b style="width:${value}%"></b></i><strong>${value.toFixed(1)}%</strong>`;
      container.appendChild(row);
    });
  }

  function renderAutonomySplit() {
    const container = $("#autonomy-split-chart");
    if (!container) return;
    container.innerHTML = `<div class="ranked-key"><span><i></i>Classroom control</span><span><i class="influence"></i>School-level influence</span></div>`;
    data.trends.autonomySplit.forEach(([label, value, type]) => {
      const row = document.createElement("div");
      row.className = `ranked-row ${type}`;
      row.innerHTML = `<span>${label}</span><i role="img" aria-label="${label}: ${value.toFixed(1)} percent reporting a great deal"><b style="width:${value}%"></b></i><strong>${value.toFixed(1)}%</strong>`;
      container.appendChild(row);
    });
  }

  function renderTimeline() {
    const container = $("#timeline");
    container.innerHTML = "";
    const statusLabels = {
      available: "Estimates available",
      pilot: "Pilot point estimates",
      partial: "Partial estimates",
      unavailable: "No private-school sample"
    };
    data.waves.forEach(wave => {
      const article = document.createElement("article");
      article.className = `wave ${wave.status}`;
      article.innerHTML = `
        <div class="wave-year">${wave.year}</div>
        <div class="wave-survey">${wave.survey}</div>
        <div class="wave-status"><span class="status-dot"></span>${statusLabels[wave.status]}</div>`;
      container.appendChild(article);
    });
  }

  function activateTab(tab) {
    $$(".tab").forEach(button => {
      const active = button === tab;
      button.setAttribute("aria-selected", String(active));
      $(`#${button.getAttribute("aria-controls")}`).hidden = !active;
    });
  }

  const menuButton = $(".menu-button");
  const navigation = $("#main-nav");
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    navigation.classList.toggle("open", !open);
  });
  $$("#main-nav a").forEach(link => link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
  }));

  $$(".tab").forEach((tab, index, tabs) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);
    });
  });
  $("#sector-select")?.addEventListener("change", event => {
    state.sector = event.target.value;
    renderMetrics();
    renderProfile();
    renderRetention();
  });
  $("#metric-select")?.addEventListener("change", event => {
    state.metric = event.target.value;
    renderWorkload();
  });
  $("#support-select")?.addEventListener("change", event => {
    state.support = event.target.value;
    renderSupports();
  });

  renderMetrics();
  renderProfile();
  renderWorkload();
  renderRetention();
  renderSupports();
  renderDemographicTrends();
  renderAutonomyTrends();
  renderPreparation();
  renderAutonomySplit();
  renderTimeline();
})();
