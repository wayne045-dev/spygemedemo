(function () {
  "use strict";

  const STORAGE_KEY = "blackout-signal-save-v2";
  const OLD_STORAGE_KEY = "blackout-signal-save-v1";
  const MAX_STAT = 12;
  const MIN_STAT = 0;
  const STORY = window.GAME_STORY;

  const screens = {
    start: document.getElementById("start-screen"),
    game: document.getElementById("game-screen"),
    ending: document.getElementById("ending-screen")
  };

  const elements = {
    newGame: document.getElementById("new-game"),
    continueGame: document.getElementById("continue-game"),
    saveGame: document.getElementById("save-game"),
    restartGame: document.getElementById("restart-game"),
    endingRestart: document.getElementById("ending-restart"),
    chapter: document.getElementById("scene-chapter"),
    date: document.getElementById("scene-date"),
    location: document.getElementById("scene-location"),
    nodeKicker: document.getElementById("node-kicker"),
    nodeTitle: document.getElementById("node-title"),
    storyText: document.getElementById("story-text"),
    choices: document.getElementById("choices"),
    historyList: document.getElementById("history-list"),
    clueList: document.getElementById("clue-list"),
    saveStatus: document.getElementById("save-status"),
    dossierNote: document.getElementById("dossier-note"),
    pressureNote: document.getElementById("pressure-note"),
    impressionList: document.getElementById("impression-list"),
    historyTab: document.getElementById("history-tab"),
    cluesTab: document.getElementById("clues-tab"),
    sceneFigure: document.getElementById("scene-figure"),
    sceneImage: document.getElementById("scene-image"),
    sceneCaption: document.getElementById("scene-caption"),
    endingTitle: document.getElementById("ending-title"),
    endingText: document.getElementById("ending-text")
  };

  let state = createInitialState();

  function createInitialState() {
    return {
      version: 2,
      nodeId: STORY.startNode,
      stats: { ...STORY.initialStats },
      relations: { ...STORY.initialRelations },
      flags: {},
      clues: [],
      pending: [],
      history: [],
      savedAt: null
    };
  }

  function clamp(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return MIN_STAT;
    return Math.min(MAX_STAT, Math.max(MIN_STAT, numeric));
  }

  function showScreen(name) {
    Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
    screens[name].classList.remove("hidden");
  }

  function getNode(nodeId) {
    return STORY.nodes[nodeId] || STORY.nodes[STORY.startNode];
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function splitText(lines) {
    return (lines || []).map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  }

  function updateStartScreen() {
    localStorage.removeItem(OLD_STORAGE_KEY);
    elements.continueGame.disabled = !loadState();
  }

  function render() {
    const node = getNode(state.nodeId);

    if (node.ending) {
      renderEnding(node);
      return;
    }

    showScreen("game");
    elements.chapter.textContent = STORY.chapters[node.chapter - 1] || `第${node.chapter}章`;
    elements.date.textContent = node.date;
    elements.location.textContent = node.location;
    elements.nodeKicker.textContent = `${elements.chapter.textContent} / ${node.date} / ${node.location}`;
    elements.nodeTitle.textContent = node.title;
    elements.storyText.innerHTML = splitText(node.text);
    renderImage(node);
    renderChoices(node);
    renderJournal();
    renderStatusNotes(node);
    renderImpressions();
    updateSaveStatus();
  }

  function renderImage(node) {
    if (!node.image) {
      elements.sceneFigure.classList.add("hidden");
      elements.sceneImage.removeAttribute("src");
      return;
    }
    elements.sceneFigure.classList.remove("hidden");
    elements.sceneImage.src = node.image.src;
    elements.sceneImage.alt = node.image.alt || "";
    elements.sceneCaption.textContent = node.image.caption || "";
  }

  function renderChoices(node) {
    elements.choices.innerHTML = "";
    const visibleChoices = (node.choices || []).filter((choice) => meetsRequirements(choice.requires));

    if (visibleChoices.length === 0) {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.textContent = "把沉默留在桌面上。";
      button.addEventListener("click", () => moveTo(resolveEnding()));
      elements.choices.append(button);
      return;
    }

    visibleChoices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.textContent = choice.label;
      button.addEventListener("click", () => choose(choice));
      elements.choices.append(button);
    });
  }

  function renderJournal() {
    renderList(elements.historyList, state.history.slice(-10).reverse(), (entry) => `${entry.title}：${entry.choice}`);
    renderList(elements.clueList, state.clues, (clue) => clue);
  }

  function renderList(list, items, formatter) {
    list.innerHTML = "";
    if (!items.length) {
      const empty = document.createElement("li");
      empty.textContent = "暂无记录。";
      list.append(empty);
      return;
    }
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = formatter(item);
      list.append(li);
    });
  }

  function renderStatusNotes(node) {
    const { cover, intel, conscience, suspicion } = state.stats;
    const coverText = cover >= 9 ? "身份纸面干净，连你自己都快相信它。" : cover >= 5 ? "身份尚稳，但某些停顿已经被记下。" : "身份外壳出现裂纹，街角的目光变得更久。";
    const intelText = intel >= 9 ? "碎片正在接近一张完整地图。" : intel >= 5 ? "线索散在口袋里，还不能拼成答案。" : "你知道的仍比你假装知道的少。";
    const conscienceText = conscience >= 9 ? "有些名字开始重过命令。" : conscience >= 5 ? "你会在句子中间停下，像听见另一个自己。" : "任务仍然占据纸面最上方。";
    const suspicionText = suspicion >= 9 ? "Harris 的影子已经落到门缝里。" : suspicion >= 5 ? "有人在整理与你有关的细节。" : "雨声盖住了许多脚步。";

    elements.dossierNote.textContent = [coverText, intelText, conscienceText][Math.min(2, Math.floor((node.chapter - 1) / 2))];
    elements.pressureNote.textContent = suspicionText;
  }

  function renderImpressions() {
    const entries = [
      ["Evelyn", relationLabel("evelyn", ["疏离", "谨慎", "迟疑地信任", "愿意冒险"])],
      ["Harris", relationLabel("harris", ["未露声色", "试探", "逼近", "准备收网"])],
      ["灰鸦", relationLabel("raven", ["遥远", "催促", "施压", "失去耐心"])]
    ];
    elements.impressionList.innerHTML = "";
    entries.forEach(([name, label]) => {
      const wrap = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = name;
      dd.textContent = label;
      wrap.append(dt, dd);
      elements.impressionList.append(wrap);
    });
  }

  function relationLabel(key, labels) {
    const value = state.relations[key] || 0;
    if (value >= 8) return labels[3];
    if (value >= 5) return labels[2];
    if (value >= 2) return labels[1];
    return labels[0];
  }

  function choose(choice) {
    const currentNode = getNode(state.nodeId);
    state.history.push({ title: currentNode.title, choice: choice.label });
    state.history = state.history.slice(-24);

    applyEffects(choice.effects);
    applyRelations(choice.relations);
    addClues(choice.clues || currentNode.clues);
    applyFlags(choice.flags || currentNode.flags);
    addPending(choice.delayedEffects || currentNode.delayedEffects);
    applyPendingFor(choice.next);

    moveTo(resolveAfterChoice(choice.next));
  }

  function applyEffects(effects = {}) {
    Object.entries(effects).forEach(([key, delta]) => {
      if (Object.prototype.hasOwnProperty.call(state.stats, key)) {
        state.stats[key] = clamp(state.stats[key] + Number(delta));
      }
    });
  }

  function applyRelations(relations = {}) {
    Object.entries(relations).forEach(([key, delta]) => {
      state.relations[key] = clamp((state.relations[key] || 0) + Number(delta));
    });
  }

  function addClues(clues = []) {
    clues.forEach((clue) => {
      if (clue && !state.clues.includes(clue)) state.clues.push(clue);
    });
  }

  function applyFlags(flags = []) {
    flags.forEach((flag) => {
      state.flags[flag] = true;
    });
  }

  function addPending(items = []) {
    items.forEach((item) => state.pending.push(item));
  }

  function applyPendingFor(nextId) {
    const remaining = [];
    state.pending.forEach((item) => {
      if (item.at === nextId || (item.chapter && getNode(nextId).chapter >= item.chapter)) {
        applyEffects(item.effects);
        applyRelations(item.relations);
        addClues(item.clues);
        applyFlags(item.flags);
      } else {
        remaining.push(item);
      }
    });
    state.pending = remaining;
  }

  function resolveAfterChoice(nextId) {
    if (nextId === "resolve_ending") return resolveEnding();
    if (nextId && nextId.startsWith("ending_")) return nextId;
    if (state.stats.suspicion >= 12 || state.stats.cover <= 0) return "ending_arrest_silent";
    return nextId;
  }

  function resolveEnding() {
    const { cover, intel, conscience, suspicion } = state.stats;
    if (conscience >= 9 && state.relations.harris >= 5) return state.relations.evelyn >= 6 ? "ending_defect_costly" : "ending_defect_lonely";
    if (intel >= 10 && cover >= 4 && suspicion <= 10 && conscience <= 7) return conscience <= 3 ? "ending_success_cold" : "ending_success_hollow";
    if (suspicion >= 9 || cover <= 3) return "ending_arrest_silent";
    if (conscience >= 7) return "ending_defect_lonely";
    return "ending_arrest_failed";
  }

  function moveTo(nodeId) {
    state.nodeId = nodeId;
    if (getNode(nodeId).ending) {
      render();
      return;
    }
    saveState(false);
    render();
  }

  function meetsRequirements(requirements) {
    if (!requirements) return true;
    if (requirements.stats) {
      for (const [key, rule] of Object.entries(requirements.stats)) {
        const value = state.stats[key] ?? 0;
        if (typeof rule.gte === "number" && value < rule.gte) return false;
        if (typeof rule.lte === "number" && value > rule.lte) return false;
      }
    }
    if (requirements.flags && !requirements.flags.every((flag) => state.flags[flag])) return false;
    if (requirements.notFlags && requirements.notFlags.some((flag) => state.flags[flag])) return false;
    return true;
  }

  function saveState(showFeedback = true) {
    state.savedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (showFeedback) {
      elements.saveStatus.textContent = "已保存";
      window.setTimeout(updateSaveStatus, 1200);
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 2 || !STORY.nodes[parsed.nodeId]) return null;
      return {
        ...createInitialState(),
        ...parsed,
        stats: { ...STORY.initialStats, ...parsed.stats },
        relations: { ...STORY.initialRelations, ...parsed.relations },
        flags: parsed.flags || {},
        clues: Array.isArray(parsed.clues) ? parsed.clues : [],
        pending: Array.isArray(parsed.pending) ? parsed.pending : [],
        history: Array.isArray(parsed.history) ? parsed.history : []
      };
    } catch (error) {
      return null;
    }
  }

  function clearSavedState() {
    localStorage.removeItem(STORAGE_KEY);
    updateSaveStatus();
  }

  function updateSaveStatus() {
    elements.saveStatus.textContent = state.savedAt ? "已保存" : "未保存";
  }

  function startNewGame() {
    clearSavedState();
    state = createInitialState();
    saveState(false);
    render();
  }

  function continueGame() {
    const saved = loadState();
    if (!saved) return;
    state = saved;
    render();
  }

  function restartGame() {
    clearSavedState();
    state = createInitialState();
    showScreen("start");
    updateStartScreen();
  }

  function showJournal(which) {
    const showClues = which === "clues";
    elements.historyTab.classList.toggle("active", !showClues);
    elements.cluesTab.classList.toggle("active", showClues);
    elements.historyList.classList.toggle("hidden", showClues);
    elements.clueList.classList.toggle("hidden", !showClues);
  }

  elements.newGame.addEventListener("click", startNewGame);
  elements.continueGame.addEventListener("click", continueGame);
  elements.saveGame.addEventListener("click", () => saveState(true));
  elements.restartGame.addEventListener("click", restartGame);
  elements.endingRestart.addEventListener("click", restartGame);
  elements.historyTab.addEventListener("click", () => showJournal("history"));
  elements.cluesTab.addEventListener("click", () => showJournal("clues"));

  window.validateBlackoutStory = function validateBlackoutStory() {
    const ids = new Set(Object.keys(STORY.nodes));
    const missing = [];
    Object.entries(STORY.nodes).forEach(([id, node]) => {
      (node.choices || []).forEach((choice) => {
        if (choice.next !== "resolve_ending" && !ids.has(choice.next)) missing.push(`${id} -> ${choice.next}`);
      });
    });
    return { nodes: ids.size, missing };
  };

  updateStartScreen();
})();
