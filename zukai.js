(function () {
  "use strict";

  const css = `
.zk {
  --zk-primary: var(--text-primary, #1f1e1d);
  --zk-secondary: var(--text-secondary, #595855);
  --zk-muted: var(--text-muted, #68665f);
  --zk-surface: var(--surface-2, #fcfcfb);
  --zk-neutral: var(--bg-neutral, #f4f3f0);
  --zk-border: var(--border, #deddd9);
  --zk-border-strong: var(--border-strong, #a5a39c);
  --zk-accent: var(--text-accent, #195e9e);
  --zk-accent-bg: var(--bg-accent, #e5effa);
  --zk-accent-border: var(--border-accent, #378add);
  --zk-danger: var(--text-danger, #a82929);
  --zk-danger-bg: var(--bg-danger, #fcebea);
  --zk-success: var(--text-success, #366624);
  --zk-warning: var(--text-warning, #854e0d);
  box-sizing: border-box;
  min-width: 0;
  padding: 4px 0;
  container-type: inline-size;
  color: var(--zk-primary);
  background: transparent;
  font: inherit;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.55;
  overflow-wrap: anywhere;
}
.zk *, .zk *::before, .zk *::after { box-sizing: border-box; }
.zk .zk-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.zk-eye { color: var(--zk-muted); font-size: 13px; }
.zk-title { margin: 2px 0 14px; font-size: 20px; font-weight: 500; line-height: 1.4; }
.zk-title:empty { display: none; }
.zk-cap:not(:empty) { margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--zk-border); }
.zk-cap-lead { font-size: 16px; font-weight: 500; }
.zk-cap-detail { color: var(--zk-secondary); }
.zk-cap-detail:not(:first-child) { margin-top: 3px; }
.zk-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--zk-card-min, 160px)), 1fr)); gap: 10px; }
.zk-kpis { --zk-card-min: 125px; }
.zk-content { display: grid; gap: 12px; }
.zk-card, .zk-kpi, .zk-layer {
  min-width: 0;
  padding: 12px;
  border: 1px solid var(--zk-border);
  border-radius: 10px;
  background: var(--zk-surface);
}
.zk-hot { border: 2px solid var(--zk-accent-border); padding: 11px; }
.zk-dashed { border-style: dashed; }
.zk-card-top, .zk-name, .zk-value, .zk-bar-label, .zk-pill, .zk-legend-item {
  display: flex;
  gap: 6px;
  align-items: baseline;
  min-width: 0;
}
.zk-card-top, .zk-name, .zk-bar-label { flex-wrap: wrap; }
.zk-card-top { justify-content: space-between; margin-bottom: 7px; }
.zk-name { font-size: 17px; font-weight: 500; }
.zk-name > .ti { color: var(--zk-secondary); }
.zk-hot .zk-name > .ti { color: var(--zk-accent); }
.zk-sub { color: var(--zk-secondary); font-size: 13px; }
.zk-tag {
  display: inline-block;
  max-width: 100%;
  padding: 1px 8px;
  border-radius: 999px;
  color: var(--zk-secondary);
  background: var(--zk-neutral);
  font-size: 13px;
}
.zk-hot .zk-tag { color: var(--zk-accent); background: var(--zk-accent-bg); font-weight: 500; }
.zk-card-sub { margin: -3px 0 8px; }
.zk-pair, .zk-lane-item { padding: 6px 0; border-top: 1px solid var(--zk-border); font-size: 14px; }
.zk-pair {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  align-items: baseline;
  gap: 8px;
}
.zk-pair-label, .zk-lane-item > .ti { color: var(--zk-secondary); }
.zk-pair .zk-value { justify-content: flex-end; text-align: right; }
.zk-lane-item { display: flex; align-items: baseline; gap: 7px; }
.zk-pair:last-child, .zk-lane-item:last-child { padding-bottom: 0; }
.zk-mark { flex: none; display: inline-flex; }
.zk-mark-ok { color: var(--zk-success); }
.zk-mark-warn, .zk-mark-q, .zk-mark-lock { color: var(--zk-warning); }
.zk-mark-ng { color: var(--zk-danger); }
.zk-kpi { background: var(--zk-neutral); }
.zk-kpi.zk-danger { color: var(--zk-danger); background: var(--zk-danger-bg); }
.zk-kpi.zk-accent { color: var(--zk-accent); background: var(--zk-accent-bg); }
.zk-kpi-label, .zk-bar-label { font-size: 14px; }
.zk-kpi-number { font-size: 28px; font-weight: 500; line-height: 1.3; font-variant-numeric: tabular-nums; }
.zk-bar-row {
  display: grid;
  grid-template-columns: minmax(0, min(36%, 9em)) minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding-block: 5px;
}
.zk-bar-meter {
  --zk-value-space: min(42%, 6em);
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.zk-bar {
  flex: none;
  width: calc((100% - var(--zk-value-space) - 6px) * var(--zk-ratio));
  height: 16px;
  border-radius: 0 4px 4px 0;
  background: #B4B2A9;
}
.zk-bar.zk-danger { background: #E24B4A; }
.zk-bar.zk-accent { background: #378ADD; }
.zk-bar-text {
  max-width: var(--zk-value-space);
  font-size: 14px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.zk-chips, .zk-flow-controls, .zk-pills, .zk-legend { display: flex; gap: 6px; flex-wrap: wrap; }
.zk-chips, .zk-flow-controls { margin-top: 12px; }
.zk-chip, .zk-step-control {
  padding: 4px 12px;
  border: 1px solid var(--zk-border-strong);
  border-radius: 999px;
  background: var(--zk-surface);
  color: inherit;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}
.zk-chip[aria-pressed="true"] {
  border-color: var(--zk-primary);
  background: var(--zk-primary);
  color: var(--zk-surface);
  font-weight: 500;
}
.zk button:focus-visible, .zk input:focus-visible { outline: 2px solid var(--zk-accent-border); outline-offset: 2px; }
.zk-dim { opacity: 0.45; }
.zk-stage { padding: 10px; border-radius: 10px; background: var(--zk-neutral); }
.zk-layer {
  display: grid;
  grid-template-columns: minmax(0, 6.5em) minmax(0, 1fr);
  align-items: center;
  gap: 10px;
}
.zk-layer + .zk-layer { margin-top: 8px; }
.zk-pill { padding: 3px 8px; border-radius: 10px; background: var(--zk-neutral); font-size: 14px; }
.zk-legend { gap: 4px 12px; color: var(--zk-secondary); font-size: 13px; }
.zk-steps {
  display: grid;
  grid-template-columns: repeat(var(--zk-step-count), minmax(0, 1fr));
  gap: 8px;
  margin: 0;
  padding: 6px 0;
  list-style: none;
}
.zk-step { position: relative; min-width: 0; }
.zk-step:not(:last-child)::after {
  position: absolute;
  top: 19px;
  left: calc(50% + 20px);
  width: calc(100% + 8px - 40px);
  height: 2px;
  background: var(--zk-border-strong);
  content: "";
  pointer-events: none;
}
.zk-step-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  color: inherit;
  font: inherit;
  font-size: 14px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}
button.zk-step-body { border: 0; background: none; border-radius: 8px; cursor: pointer; }
.zk-dot {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--zk-border-strong);
  color: var(--zk-secondary);
  background: var(--zk-surface);
  font-size: 19px;
}
.zk-step-body[aria-pressed="true"] { color: var(--zk-accent); font-weight: 500; }
.zk-step-body[aria-pressed="true"] .zk-dot { border-color: var(--zk-accent-border); color: var(--zk-accent); background: var(--zk-accent-bg); }
.zk-flow-controls { align-items: center; gap: 8px; }
.zk-step-count { color: var(--zk-secondary); font-size: 13px; font-variant-numeric: tabular-nums; }
.zk-sliders {
  display: grid;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--zk-neutral);
}
.zk-slider {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(5.5em, max-content);
  gap: 8px;
  align-items: center;
  font-size: 14px;
}
.zk-slider-label {
  display: grid;
  grid-template-columns: minmax(0, 8em) minmax(0, 1fr);
  gap: 8px;
  align-items: center;
}
.zk-slider input { width: 100%; min-width: 0; margin: 0; accent-color: var(--zk-accent); }
.zk-slider-value { text-align: right; font-weight: 500; font-variant-numeric: tabular-nums; white-space: nowrap; }
@container (max-width: 360px) {
  .zk-steps-many { grid-template-columns: minmax(0, 1fr); }
  .zk-steps-many .zk-step-body { display: grid; grid-template-columns: 40px minmax(0, 1fr); text-align: left; }
  .zk-steps-many .zk-step:not(:last-child)::after {
    top: 40px;
    left: 19px;
    width: 2px;
    height: calc(100% + 8px - 40px);
  }
  .zk-steps-many .zk-step-body .zk-sub { grid-column: 2; }
  .zk-steps-many .zk-dot { grid-row: 1 / span 2; align-self: start; }
  .zk-slider-label { grid-template-columns: minmax(0, 1fr); gap: 4px; }
}
@container (max-width: 245px) {
  .zk-layer, .zk-bar-row { grid-template-columns: minmax(0, 1fr); gap: 4px; }
}
`;

  const marks = {
    ok: ["circle-check", "良い"],
    warn: ["alert-triangle", "注意"],
    ng: ["circle-x", "不可"],
    q: ["help-circle", "未確認"],
    lock: ["lock", "制限あり"],
  };

  function add(parent, tag, className, text) {
    const element = parent.ownerDocument.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    parent.append(element);
    return element;
  }

  function addIcon(parent, name) {
    if (typeof name !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) return;
    const icon = add(parent, "i", "ti ti-" + name);
    icon.setAttribute("aria-hidden", "true");
    return icon;
  }

  function addMark(parent, name) {
    if (!Object.prototype.hasOwnProperty.call(marks, name)) return;
    const [icon, label] = marks[name];
    const mark = add(parent, "span", "zk-mark zk-mark-" + name);
    addIcon(mark, icon);
    add(mark, "span", "sr-only zk-sr-only", label);
  }

  function addButton(parent, className, text) {
    const button = add(parent, "button", className, text);
    button.type = "button";
    return button;
  }

  function addName(parent, name, icon) {
    const heading = add(parent, "div", "zk-name");
    addIcon(heading, icon);
    add(heading, "span", "", name);
  }

  function setTone(element, tone) {
    if (tone === "danger" || tone === "accent") element.classList.add("zk-" + tone);
  }

  function drawBars(parent, bars) {
    parent.replaceChildren();
    const magnitude = (value) => Number.isFinite(value) && value > 0 ? value : 0;
    const max = bars.reduce((highest, bar) => Math.max(highest, magnitude(bar.value)), 0) || 1;

    return bars.map(({ label, sub, value, text, tone, tag, group }) => {
      const row = add(parent, "div", "zk-bar-row");
      const labels = add(row, "div");
      const labelLine = add(labels, "div", "zk-bar-label");
      add(labelLine, "span", "", label);
      if (tag) add(labelLine, "span", "zk-tag", tag);
      if (sub) add(labels, "div", "zk-sub", sub);

      const meter = add(row, "div", "zk-bar-meter");
      const bar = add(meter, "div", "zk-bar");
      bar.setAttribute("aria-hidden", "true");
      bar.style.setProperty("--zk-ratio", magnitude(value) / max);
      setTone(bar, tone);
      add(meter, "span", "zk-bar-text", text ?? value);
      return { element: row, key: group };
    });
  }

  function addChips(root, options, entries, spec, setCaption, allCap) {
    if (spec.static || !options.length) return;

    const group = add(root, "div", "zk-chips");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "表示する項目");
    const choices = [{ label: "全部", cap: allCap }, ...options];
    const buttons = choices.map(({ label }) => addButton(group, "zk-chip", label));

    function select(index) {
      const { key, cap } = choices[index];
      buttons.forEach((button, i) => button.setAttribute("aria-pressed", i === index));
      entries.forEach(({ element, key: entryKey }) => {
        element.classList.toggle("zk-dim", index !== 0 && entryKey !== key);
      });
      setCaption(cap ?? spec.cap);
    }

    buttons.forEach((button, index) => button.addEventListener("click", () => select(index)));
    select(0);
  }

  function numbers(root, spec, { setCaption }) {
    const content = add(root, "div", "zk-content");
    if (spec.kpis?.length) {
      const grid = add(content, "div", "zk-grid zk-kpis");
      for (const { label, value, note, tone } of spec.kpis.filter(Boolean)) {
        const kpi = add(grid, "div", "zk-kpi");
        setTone(kpi, tone);
        add(kpi, "div", "zk-kpi-label", label);
        add(kpi, "div", "zk-kpi-number", value);
        if (note) add(kpi, "div", "zk-sub", note);
      }
    }

    const entries = drawBars(add(content, "div"), (spec.bars ?? []).filter(Boolean));
    const chips = (spec.chips ?? []).filter(Boolean);
    const all = chips.find(({ key }) => key === "all");
    const options = chips.filter(({ key }) => key != null && key !== "all");
    if (all) setCaption(all.cap ?? spec.cap);
    addChips(root, options, entries, spec, setCaption, all?.cap);
  }

  function compare(root, spec) {
    const grid = add(root, "div", "zk-grid");
    for (const { name, icon, tag, pick, rows } of (spec.cards ?? []).filter(Boolean)) {
      const card = add(grid, "div", pick ? "zk-card zk-hot" : "zk-card");
      const top = add(card, "div", "zk-card-top");
      addName(top, name, icon);
      if (tag) add(top, "span", "zk-tag", tag);

      for (const [label, text, mark] of (rows ?? []).filter(Array.isArray)) {
        const pair = add(card, "div", "zk-pair");
        add(pair, "span", "zk-pair-label", label);
        const value = add(pair, "span", "zk-value");
        addMark(value, mark);
        add(value, "span", "", text);
      }
    }
  }

  function flow(root, spec, { setCaption }) {
    const steps = (spec.steps ?? []).filter(Boolean);
    if (!steps.length) return;

    const stage = add(root, "div", "zk-stage");
    const list = add(stage, "ol", steps.length > 4 ? "zk-steps zk-steps-many" : "zk-steps");
    list.style.setProperty("--zk-step-count", steps.length);
    const stepElements = steps.map(({ icon, label, sub }, index) => {
      const item = add(list, "li", "zk-step");
      const body = spec.static
        ? add(item, "div", "zk-step-body")
        : addButton(item, "zk-step-body");
      const dot = add(body, "span", "zk-dot");
      dot.setAttribute("aria-hidden", "true");
      if (!addIcon(dot, icon)) dot.textContent = index + 1;
      add(body, "span", "", label);
      if (spec.static && sub) add(body, "span", "zk-sub", sub);
      return body;
    });

    if (spec.static) return;
    const controls = add(root, "div", "zk-flow-controls");
    const previous = addButton(controls, "zk-step-control", "前へ");
    const count = add(controls, "span", "zk-step-count");
    const next = addButton(controls, "zk-step-control", "次へ");
    previous.disabled = next.disabled = steps.length === 1;

    let index = 0;
    function select(nextIndex) {
      index = (nextIndex + steps.length) % steps.length;
      stepElements.forEach((step, i) => step.setAttribute("aria-pressed", i === index));
      count.textContent = (index + 1) + " / " + steps.length;
      setCaption(steps[index].cap ?? spec.cap);
    }

    stepElements.forEach((step, i) => step.addEventListener("click", () => select(i)));
    previous.addEventListener("click", () => select(index - 1));
    next.addEventListener("click", () => select(index + 1));
    select(0);
  }

  function layers(root, spec, { setCaption }) {
    const data = (spec.layers ?? []).filter(Boolean);
    const content = add(root, "div", "zk-content");
    const stage = add(content, "div", "zk-stage");
    const entries = data.filter(Boolean).map(({ key, name, sub, items, hot, dashed }) => {
      const classes = ["zk-layer"];
      if (hot) classes.push("zk-hot");
      if (dashed) classes.push("zk-dashed");
      const layer = add(stage, "div", classes.join(" "));
      const heading = add(layer, "div");
      addName(heading, name);
      if (sub) add(heading, "div", "zk-sub", sub);

      const pills = add(layer, "div", "zk-pills");
      for (const item of (items ?? []).filter((x) => x != null)) {
        const { text, mark } = typeof item === "object" ? item : { text: String(item) };
        const pill = add(pills, "span", "zk-pill");
        addMark(pill, mark);
        add(pill, "span", "", text);
      }
      return { element: layer, key };
    });

    if (spec.legend?.length) {
      const legend = add(content, "div", "zk-legend");
      for (const [mark, text] of spec.legend.filter(Array.isArray)) {
        const entry = add(legend, "span", "zk-legend-item");
        addMark(entry, mark);
        add(entry, "span", "", text);
      }
    }
    addNamedChips(root, data, entries, spec, setCaption);
  }

  function lanes(root, spec, { setCaption }) {
    const data = (spec.lanes ?? []).filter(Boolean);
    const grid = add(root, "div", "zk-grid");
    const entries = data.filter(Boolean).map(({ key, name, sub, icon, items, hot }) => {
      const lane = add(grid, "div", hot ? "zk-card zk-hot" : "zk-card");
      addName(add(lane, "div", "zk-card-top"), name, icon);
      if (sub) add(lane, "div", "zk-sub zk-card-sub", sub);

      for (const item of (items ?? []).filter((x) => x != null)) {
        const [icon, text] = Array.isArray(item) ? item : [null, item];
        const row = add(lane, "div", "zk-lane-item");
        addIcon(row, icon);
        add(row, "span", "", text);
      }
      return { element: lane, key };
    });
    addNamedChips(root, data, entries, spec, setCaption);
  }

  function addNamedChips(root, data, entries, spec, setCaption) {
    const options = data
      .filter(({ key }) => key != null)
      .map(({ key, name, cap }) => ({ key, label: name, cap }));
    addChips(root, options, entries, spec, setCaption);
  }

  function whatif(root, spec, { setTitle, setCaption }) {
    if (typeof spec.calc !== "function") throw new TypeError("zukai: whatif には calc が必要です");

    const sliders = (spec.sliders ?? []).filter(Boolean);
    const bars = add(root, "div");
    const controls = spec.static ? null : add(root, "div", "zk-sliders");
    const fields = sliders.map(({ key, label, min, max, step, value, unit = "" }) => {
      const input = root.ownerDocument.createElement("input");
      input.type = "range";
      if (min != null) input.min = min;
      if (max != null) input.max = max;
      if (step != null) input.step = step;
      if (value != null) input.value = value;

      if (controls) {
        const row = add(controls, "div", "zk-slider");
        const wrapper = add(row, "label", "zk-slider-label");
        add(wrapper, "span", "", label);
        wrapper.append(input);
        const display = add(row, "span", "zk-slider-value");
        display.setAttribute("aria-hidden", "true");

        function showValue() {
          display.textContent = input.value + unit;
          input.setAttribute("aria-valuetext", display.textContent);
        }

        showValue();
        input.addEventListener("input", () => {
          showValue();
          update();
        });
      }
      return { key, input };
    });

    function update() {
      const values = Object.fromEntries(fields.map(({ key, input }) => [key, input.valueAsNumber]));
      const result = (typeof spec.calc === "function" ? spec.calc(values) : null) ?? {};
      setTitle(result.title ?? spec.title);
      drawBars(bars, (result.bars ?? []).filter(Boolean));
      setCaption(result.cap ?? spec.cap);
    }

    update();
  }

  const renderers = { numbers, compare, flow, layers, lanes, whatif };

  function zukai(target, spec) {
    const mount = typeof target === "string" ? document.querySelector(target) : target;
    if (mount?.nodeType !== 1) throw new TypeError("zukai: 描画先の要素が見つかりません");
    if (!Object.hasOwn(renderers, spec?.type)) throw new TypeError("zukai: type が正しくありません");

    const doc = mount.ownerDocument;
    const root = doc.createElement("div");
    root.className = "zk";
    const summary = add(root, "h2", "sr-only zk-sr-only");
    if (spec.eye) add(root, "div", "zk-eye", spec.eye);
    const title = add(root, "div", "zk-title");
    const caption = add(root, "div", "zk-cap");
    if (!spec.static) {
      caption.setAttribute("aria-live", "polite");
      caption.setAttribute("aria-atomic", "true");
    }

    function setTitle(text) {
      title.textContent = text ?? "";
      summary.textContent = spec.summary ?? title.textContent;
      title.setAttribute("aria-hidden", title.textContent === summary.textContent);
    }

    function setCaption(cap) {
      const [lead, detail] = typeof cap === "string" ? [cap] : (Array.isArray(cap) ? cap : []);
      caption.replaceChildren();
      if (lead) add(caption, "div", "zk-cap-lead", lead);
      if (detail) add(caption, "div", "zk-cap-detail", detail);
    }

    setTitle(spec.title);
    setCaption(spec.cap);
    renderers[spec.type](root, spec, { setTitle, setCaption });
    root.append(caption);

    if (!doc.getElementById("zukai-css")) {
      const style = add(doc.head, "style", "", css);
      style.id = "zukai-css";
    }
    mount.replaceChildren(root);
  }

  zukai.version = "1.0.0";
  window.zukai = zukai;
})();
