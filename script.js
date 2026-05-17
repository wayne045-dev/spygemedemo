(function () {
  "use strict";

  const STORAGE_KEY = "blackout-signal-save-v1";
  const MAX_STAT = 10;
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
    date: document.getElementById("scene-date"),
    location: document.getElementById("scene-location"),
    nodeKicker: document.getElementById("node-kicker"),
    nodeTitle: document.getElementById("node-title"),
    storyText: document.getElementById("story-text"),
    choices: document.getElementById("choices"),
    historyList: document.getElementById("history-list"),
    saveStatus: document.getElementById("save-status"),
    routeHint: document.getElementById("route-hint"),
    endingTitle: document.getElementById("ending-title"),
    endingText: document.getElementById("ending-text")
  };

  const statElements = {
    cover: {
      meter: document.getElementById("stat-cover"),
      value: document.getElementById("stat-cover-value")
    },
    intel: {
      meter: document.getElementById("stat-intel"),
      value: document.getElementById("stat-intel-value")
    },
    conscience: {
      meter: document.getElementById("stat-conscience"),
      value: document.getElementById("stat-conscience-value")
    },
    suspicion: {
      meter: document.getElementById("stat-suspicion"),
      value: document.getElementById("stat-suspicion-value")
    }
  };

  let state = createInitialState();

  function createInitialState() {
    return {
      nodeId: STORY.startNode,
      stats: { ...STORY.initialStats },
      flags: {},
      history: [],
      savedAt: null
    };
  }

  function clamp(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return MIN_STAT;
    }
    return Math.min(MAX_STAT, Math.max(MIN_STAT, numeric));
  }

  function showScreen(name) {
    Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
    screens[name].classList.remove("hidden");
  }

  function getNode(nodeId) {
    return STORY.nodes[nodeId] || STORY.nodes[STORY.startNode];
  }

  function splitText(lines) {
    return lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function updateStartScreen() {
    elements.continueGame.disabled = !loadState();
  }

  function render() {
    const node = getNode(state.nodeId);

    if (node.ending) {
      renderEnding(node);
      return;
    }

    showScreen("game");
    elements.date.textContent = node.date;
    elements.location.textContent = node.location;
    elements.nodeKicker.textContent = `${node.date} / ${node.location}`;
    elements.nodeTitle.textContent = node.title;
    elements.storyText.innerHTML = splitText(node.text);
    renderStats();
    renderChoices(node);
    renderHistory();
    renderRouteHint();
    updateSaveStatus();
  }

  function renderStats() {
    Object.entries(statElements).forEach(([key, refs]) => {
      const value = clamp(state.stats[key]);
      refs.meter.value = value;
      refs.value.textContent = value;
    });
  }

  function renderChoices(node) {
    elements.choices.innerHTML = "";
    const visibleChoices = node.choices.filter((choice) => meetsRequirements(choice.requires));

    if (visibleChoices.length === 0) {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.textContent = "沉默已经替你做出选择。";
      button.addEventListener("click", () => moveTo("ending_arrest"));
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

  function renderHistory() {
    elements.historyList.innerHTML = "";
    const entries = state.history.slice(-8).reverse();

    if (entries.length === 0) {
      const empty = document.createElement("li");
      empty.textContent = "暂无记录。";
      elements.historyList.append(empty);
      return;
    }

    entries.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = `${entry.title}：${entry.choice}`;
      elements.historyList.append(item);
    });
  }

  function renderRouteHint() {
    const { cover, intel, conscience, suspicion } = state.stats;
    let hint = "尚未定局";

    if (suspicion >= 8 || cover <= 2) {
      hint = "Harris 正在收网";
    } else if (conscience >= 7) {
      hint = "变节的念头成形";
    } else if (intel >= 7 && conscience <= 5) {
      hint = "情报已接近完整";
    } else if (intel >= 4) {
      hint = "线索逐渐拼合";
    }

    elements.routeHint.textContent = hint;
  }

  function renderEnding(node) {
    showScreen("ending");
    elements.endingTitle.textContent = node.title;
    elements.endingText.innerHTML = splitText(node.text);
    clearSavedState();
  }

  function choose(choice) {
    const currentNode = getNode(state.nodeId);
    state.history.push({
      title: currentNode.title,
      choice: choice.label
    });
    state.history = state.history.slice(-16);

    applyEffects(choice.effects);

    if (choice.flag) {
      state.flags[choice.flag] = true;
    }

    const nextId = resolveAfterChoice(choice.next);
    moveTo(nextId);
  }

  function applyEffects(effects = {}) {
    Object.entries(effects).forEach(([key, delta]) => {
      if (!Object.prototype.hasOwnProperty.call(state.stats, key)) {
        return;
      }
      state.stats[key] = clamp(state.stats[key] + Number(delta));
    });
  }

  function resolveAfterChoice(nextId) {
    if (nextId && nextId.startsWith("ending_")) {
      return nextId;
    }

    if (state.stats.suspicion >= 10 || state.stats.cover <= 0) {
      return "ending_arrest";
    }

    return nextId;
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
    if (!requirements) {
      return true;
    }

    if (requirements.stats) {
      const statChecks = Object.entries(requirements.stats);
      const statsPass = statChecks.every(([key, rule]) => {
        const value = state.stats[key] ?? 0;
        if (typeof rule.gte === "number" && value < rule.gte) {
          return false;
        }
        if (typeof rule.lte === "number" && value > rule.lte) {
          return false;
        }
        return true;
      });

      if (!statsPass) {
        return false;
      }
    }

    if (requirements.flags) {
      const flagsPass = requirements.flags.every((flag) => state.flags[flag]);
      if (!flagsPass) {
        return false;
      }
    }

    if (requirements.notFlags) {
      const blocked = requirements.notFlags.some((flag) => state.flags[flag]);
      if (blocked) {
        return false;
      }
    }

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
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !STORY.nodes[parsed.nodeId]) {
        return null;
      }
      return {
        ...createInitialState(),
        ...parsed,
        stats: { ...STORY.initialStats, ...parsed.stats },
        flags: parsed.flags || {},
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
    if (!state.savedAt) {
      elements.saveStatus.textContent = "未保存";
      return;
    }
    elements.saveStatus.textContent = "已保存";
  }

  function startNewGame() {
    state = createInitialState();
    saveState(false);
    render();
  }

  function continueGame() {
    const saved = loadState();
    if (!saved) {
      return;
    }
    state = saved;
    render();
  }

  function restartGame() {
    clearSavedState();
    state = createInitialState();
    showScreen("start");
    updateStartScreen();
  }

  elements.newGame.addEventListener("click", startNewGame);
  elements.continueGame.addEventListener("click", continueGame);
  elements.saveGame.addEventListener("click", () => saveState(true));
  elements.restartGame.addEventListener("click", restartGame);
  elements.endingRestart.addEventListener("click", restartGame);

  updateStartScreen();
})();
