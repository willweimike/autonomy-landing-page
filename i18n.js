/* ================================================================
   Autonomy i18n — Bilingual Translation System
   Author: Bill Liu
   Languages: zh-TW (default), en
   ================================================================ */

'use strict';

/* ── 1. Translations Object ─────────────────────────────────── */
const I18N = {
  zh: {
    nav: {
      about: '設計理念',
      features: '核心模組',
      arch: '系統架構',
      toolsets: '工具集',
      author: '作者',
    },
    hero: {
      badge: 'Python 3.13 · 自律執行中',
      title2: '自律型 AI',
      title3: '代理人框架',
      subtitle: '以 <strong>Beam Search 排序</strong>與<strong>程序技能學習</strong>為核心，打造真正可控、可稽核的 AI 代理人。',
      explore: '探索核心模組',
      github: '查看原始碼',
      stat1: '內建 Procedure Skills',
      stat2: '+ 內建工具',
      stat3: '支援 AI Provider',
      stat4: 'Beam Width',
    },
    about: {
      tag: '設計理念',
      h2: 'AgentLoop：自導向任務迴圈',
      desc: '固定的五步循環，直到目標達成或受阻。',
      lead: '<mark>AgentLoop</mark> 是核心迴圈，賦予 AI 自主規劃、工具調用與事後學習的能力。',
      body1: '流程：選取技能 → LLM/Recipe 提案 → 5 維評分 (Beam=3) → 閘道授權執行 → 結果評估與學習。',
      body2: '具備明確的終止條件，確保系統不會陷入無限循環。',
    },
    tf: {
      s1: '選取相關技能',
      s2: 'LLM 提案 + Recipe Engine',
      s3: '5 維評分 · Beam Width=3',
      s4: 'ApprovalPolicy 授權 · 受管執行',
      s5: '結果評估 · Recipe 學習',
    },
    feat: {
      tag: '核心模組',
      h2: '十二大技術特點',
      desc: '每個特點都直接對應 Autonomy 原始碼中的具體實作',
      f1t: '自導向代理人迴圈',
      f1d: '<code>AgentLoop</code> 完全自主執行，支援互動與批次模式。',
      f2t: '受管行動閘道',
      f2d: '所有工具呼叫須經 <code>ApprovalPolicy</code> 授權，防範高風險指令。',
      f3t: '5 維 Beam Search 評分',
      f3d: '<code>CandidateSelector</code> 依據證據、風險等 5 個維度進行候選動作排序。',
      f4t: '混合結果評估',
      f4d: '確定性規則優先，必要時才呼叫 LLM 判斷，節省運算成本。',
      f5t: '程序技能庫（16 內建）',
      f5d: '16 種 bundled 技能，含新增的 repository-orientation、test-diagnosis、implementation-status-audit，並可安裝 ClawHub / Hermes 技能。',
      f6t: '後執行學習（人工審核）',
      f6d: '任務成功後自動起草技能，需人工透過 <code>autonomy skills approve</code> 審核後才正式啟用。',
      f7t: 'Action Recipe 引擎',
      f7d: '<code>RecipeEngine</code> 記憶重複的成功動作，下次直接執行，跳過 LLM 推理。',
      f8t: '技能策展守護程序',
      f8d: '後台 <code>CuratorDaemon</code> 自動整併重複技能，維持庫的精簡。',
      f9t: '工具集目錄（7 已實作）',
      f9d: '預設啟用 7 工具集（assistant / browser / file / terminal / search / skills / memory），並支援 database、MCP 等擴展。',
      f10t: '完整事件溯源稽核',
      f10d: '透過 Event Sourcing 完整記錄生命週期，可隨時回放。',
      f11t: 'TUI 終端互動介面',
      f11d: '<code>autonomy tui</code> 提供即時狀態總覽與互動。',
      f12t: '多 Provider 支援',
      f12d: '支援 Ollama 及 8 個 OpenAI 相容的 API Provider。',
    },
    score: {
      tag: 'CandidateSelector',
      h2: '5 維候選評分系統',
      desc: '每個候選動作路徑依以下公式計算總分，選出前 3 名送往執行',
      b1: '動作有充分依據與證據加分',
      b2: '有明確目的說明加分',
      b3: 'HIGH risk 扣最多，LOW 不扣分',
      b4: '有副作用的動作扣分',
      b5: '已執行過或工具不可用，大量扣分',
    },
    arch: {
      tag: '系統架構',
      h2: '真實模組關係圖',
      desc: '每個方塊對應 Autonomy 原始碼中的實際類別或模組',
      techtitle: 'TOOLSET_CATALOG — 工具集 & AI Providers',
      providertitle: '支援 AI Provider（9 個）',
      memorySub: '持久化工作區記憶與上下文自動注入',
    },
    toolsets: {
      tag: '內建技能',
      h2: '16 個 Bundled Procedure Skills',
      desc: '每個技能以 SKILL.md 格式定義，可安裝 ClawHub 或 Hermes 技能進一步擴展',
      note: '人機協作機制：技能草稿不會自動啟用，必須由使用者透過 <code>autonomy skills approve</code> 審核後，才能正式進入技能庫。',
    },
    demo: {
      tag: '真實事件序列',
      h2: 'AgentLoop 執行日誌',
      desc: '以下事件序列直接對應 AutonomyStore.record_event() 的實際呼叫順序',
      terminaltitle: 'autonomy · AgentLoop · run_id: a3f9c2e1',
    },
    author: {
      tag: '作者介紹',
      h2: '關於作者',
      role: 'Autonomy 框架設計者 &amp; AI Agent 系統工程師',
      bio1: '設計並實作了 Autonomy 自律型 AI 代理人框架。',
      bio2: '致力於打造在真實工程環境中可靠運行的 AI 系統，透過嚴謹架構實現完全的可審計性。',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    cta: {
      h2: '準備好打造你的自律型 AI 代理人了嗎？',
      desc: 'Fork Autonomy，添加你的工具集、訓練專屬技能庫，讓代理人在你的領域自主作業。',
      github: '前往 GitHub',
      contact: '聯絡作者',
    },
    footer: {
      tagline: '自律型 AI 代理人框架 · 由 Bill Liu 設計與實作',
      copy: '© 2025 Bill Liu · Autonomy Framework · AgentLoop · ProcedureSkillLibrary · CuratorDaemon',
    },
  },

  en: {
    nav: {
      about: 'Philosophy',
      features: 'Core Modules',
      arch: 'Architecture',
      toolsets: 'Toolsets',
      author: 'Author',
    },
    hero: {
      badge: 'Python 3.13 · Running Autonomously',
      title2: 'Autonomous AI',
      title3: 'Agent Framework',
      subtitle: 'Built around <strong>Beam Search ranking</strong> and <strong>procedural learning</strong> — a controllable and auditable AI agent framework.',
      explore: 'Explore Core Modules',
      github: 'View Source Code',
      stat1: 'Built-in Procedure Skills',
      stat2: '+ Built-in Tools',
      stat3: 'AI Providers Supported',
      stat4: 'Beam Width',
    },
    about: {
      tag: 'Design Philosophy',
      h2: 'AgentLoop: Self-Directed Task Loop',
      desc: 'A fixed 5-step loop until the goal is met or blocked.',
      lead: '<mark>AgentLoop</mark> is the core engine, enabling autonomous planning, execution, and continuous learning.',
      body1: 'Flow: Select skills → Propose actions → Rank (Beam=3) → Execute via Gateway → Evaluate & Learn.',
      body2: 'Clear termination conditions ensure the system never enters an infinite loop.',
    },
    tf: {
      s1: 'Select relevant skills',
      s2: 'LLM proposals + Recipe Engine',
      s3: '5-dim scoring · Beam Width=3',
      s4: 'ApprovalPolicy auth · Governed exec',
      s5: 'Outcome evaluation · Recipe learning',
    },
    feat: {
      tag: 'Core Modules',
      h2: '12 Technical Highlights',
      desc: 'Every feature maps directly to a concrete implementation in the Autonomy source code',
      f1t: 'Self-Directed Agent Loop',
      f1d: '<code>AgentLoop</code> runs autonomously with interactive and batch modes.',
      f2t: 'Governed Action Gateway',
      f2d: '<code>ApprovalPolicy</code> intercepts tool calls to govern high-risk commands.',
      f3t: '5-Dimensional Beam Search',
      f3d: '<code>CandidateSelector</code> scores actions across 5 dimensions to find the best path.',
      f4t: 'Hybrid Outcome Evaluation',
      f4d: 'Rule-based validation first, LLM-assisted only when necessary.',
      f5t: 'Procedure Skill Library (16 built-in)',
      f5d: '16 bundled skills including new repository-orientation, test-diagnosis, and implementation-status-audit. Install more from ClawHub or the Hermes skill hub.',
      f6t: 'Human-in-the-Loop Learning',
      f6d: 'Auto-drafts new skills from successful runs. Candidates require human approval via <code>autonomy skills approve</code> before activation.',
      f7t: 'Action Recipe Engine',
      f7d: 'Memoizes successful actions to bypass future LLM inference.',
      f8t: 'Skill Curator Daemon',
      f8d: 'Background <code>CuratorDaemon</code> auto-merges duplicate skills.',
      f9t: 'Toolset Catalog (7 implemented)',
      f9d: '7 default-enabled toolsets (assistant / browser / file / terminal / search / skills / memory) plus opt-in database (SQLGlot), MCP (external servers), and project toolsets.',
      f10t: 'Full Event Sourcing Audit',
      f10d: 'Complete execution lifecycle recorded for full replayability.',
      f11t: 'TUI Terminal Interface',
      f11d: 'Rich terminal UI for session overview and interaction.',
      f12t: 'Multi-Provider Support',
      f12d: 'Supports Ollama and 8 OpenAI-compatible providers.',
    },
    score: {
      tag: 'CandidateSelector',
      h2: '5-Dimensional Candidate Scoring',
      desc: 'Each candidate action path is scored by the formula below; the top 3 are sent for execution',
      b1: 'Evidence-backed actions score higher',
      b2: 'Clear purpose statement adds score',
      b3: 'HIGH risk penalized most; LOW has zero penalty',
      b4: 'Actions with side effects are penalized',
      b5: 'Already-executed or unavailable tools are heavily penalized',
    },
    arch: {
      tag: 'Architecture',
      h2: 'Real Module Relationship Diagram',
      desc: 'Each block corresponds to an actual class or module in the Autonomy source code',
      techtitle: 'TOOLSET_CATALOG — Toolsets & AI Providers',
      providertitle: 'Supported AI Providers (9)',
      memorySub: 'Persistent Workspace Memory & Context Injection',
    },
    toolsets: {
      tag: 'Built-in Skills',
      h2: '16 Bundled Procedure Skills',
      desc: 'Each skill is SKILL.md-defined. Extend further via ClawHub or the Hermes skill hub.',
      note: 'Human-in-the-loop: skill candidates are never auto-activated. Users must run <code>autonomy skills approve</code> to promote a draft into the formal skill library.',
    },
    demo: {
      tag: 'Real Event Sequence',
      h2: 'AgentLoop Execution Log',
      desc: 'The event sequence below directly corresponds to the actual call order of AutonomyStore.record_event()',
      terminaltitle: 'autonomy · AgentLoop · run_id: a3f9c2e1',
    },
    author: {
      tag: 'About the Author',
      h2: 'Author',
      role: 'Autonomy Framework Designer &amp; AI Agent Systems Engineer',
      bio1: 'Designed and implemented the Autonomy AI agent framework.',
      bio2: 'Dedicated to building reliable AI systems for real engineering environments with full auditability.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    cta: {
      h2: 'Ready to Build Your Autonomous AI Agent?',
      desc: 'Fork Autonomy, add your toolsets, train your skill library, and let the agent operate autonomously in your domain.',
      github: 'Go to GitHub',
      contact: 'Contact Author',
    },
    footer: {
      tagline: 'Autonomous AI Agent Framework · Designed & Implemented by Bill Liu',
      copy: '© 2025 Bill Liu · Autonomy Framework · AgentLoop · ProcedureSkillLibrary · CuratorDaemon',
    },
  },
};

/* ── 2. Resolution helper (dot-path) ─────────────────────────── */
function t(key, lang) {
  const parts = key.split('.');
  let node = I18N[lang];
  for (const p of parts) {
    if (node == null) return undefined;
    node = node[p];
  }
  return node;
}

/* ── 3. Apply Language ───────────────────────────────────────── */
function applyLanguage(lang) {
  // Update <html lang>
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

  // textContent elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n, lang);
    if (val != null) el.textContent = val;
  });

  // innerHTML elements (contain <code>, <strong>, <mark> etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = t(el.dataset.i18nHtml, lang);
    if (val != null) el.innerHTML = val;
  });

  // aria-label elements
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const val = t(el.dataset.i18nLabel, lang);
    if (val != null) el.setAttribute('aria-label', val);
  });

  // Update switcher appearance
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    const zhEl = btn.querySelector('.lang-toggle__zh');
    const enEl = btn.querySelector('.lang-toggle__en');
    if (zhEl) zhEl.classList.toggle('lang-toggle__active', lang === 'zh');
    if (enEl) enEl.classList.toggle('lang-toggle__active', lang === 'en');
    btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切換至中文');
  }

  // Persist
  try { localStorage.setItem('autonomy-lang', lang); } catch (_) {}

  // Dispatch event so main.js can react (e.g., restart terminal)
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/* ── 4. Init ─────────────────────────────────────────────────── */
function initI18n() {
  let lang = 'en';
  try {
    const saved = localStorage.getItem('autonomy-lang');
    if (saved === 'en' || saved === 'zh') lang = saved;
  } catch (_) {}

  // Wire up toggle button
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.lang === 'zh-TW' ? 'zh' : 'en';
      applyLanguage(current === 'zh' ? 'en' : 'zh');
    });
  }

  applyLanguage(lang);
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
