(function(){
  var TAG = "[VLM_P00_MENU]";
  var VERSION = "F27-p00-premium-menu-remote-1.0.0";

  function log(msg, obj) {
    try {
      if (obj !== undefined) console.error(TAG + " " + msg + " " + JSON.stringify(obj));
      else console.error(TAG + " " + msg);
    } catch(e) {}
  }

  function tip(msg) {
    try {
      if (typeof MessageView !== "undefined" && MessageView) {}
    } catch(e) {}

    try {
      if (typeof IS !== "undefined" && typeof ISInclude !== "undefined" && ISInclude.MessageView) {
        var m = IS(ISInclude.MessageView);
        if (m && typeof m.showFlyTip === "function") {
          m.showFlyTip(msg);
          return;
        }
        if (m && typeof m.ShowFlyTip === "function") {
          m.ShowFlyTip(msg);
          return;
        }
      }
    } catch(e) {}

    log("TIP", { message: msg });
  }

  function isP01Loaded() {
    try {
      return !!(
        globalThis.__VLM_F24D_P01_LOADED ||
        globalThis.VLM_P01_F25_STATUS ||
        globalThis.__VLM_P01_F25_INSTALLED
      );
    } catch(e) {
      return false;
    }
  }

  function getP01Status() {
    try {
      return globalThis.VLM_P01_F25_STATUS || {};
    } catch(e) {
      return {};
    }
  }

  globalThis.VLM_RENDER_PREMIUM_MENU = function(ctx, root, state) {
    try {
      state = state || {};

      var roleId = String(state.roleId || globalThis.VLM_CURRENT_ROLE_ID || "");
      var p01 = isP01Loaded();
      var st = getP01Status();

      ctx.vlmText(root, "p00_title", "ViciousLom Premium", -20, 235, 30, "#9dff3c", 500);
      ctx.vlmText(root, "p00_s1", "✅ Acesso premium ativo", 0, 178, 24, "#9dff3c", 520);
      ctx.vlmText(root, "p00_role", "RoleId: " + roleId, 0, 138, 18, "#ffffff", 520);

      ctx.vlmText(
        root,
        "p00_pack",
        p01 ? "✅ p01 ativo: Horse / Wing / Artifact" : "⏳ p01 ainda carregando...",
        0,
        98,
        20,
        p01 ? "#9dff3c" : "#ffd54a",
        530
      );

      ctx.vlmButton(root, "p00_tab_cosmetic", "🐎 VISUAIS / P01", -145, 36, 245, 48, function(){
        try {
          var msg =
            "p01 status: " +
            "Horse=" + !!(st.horse && st.horse.hasApply) +
            " Wing=" + !!(st.wing && st.wing.hasApply) +
            " Artifact=" + !!(st.artifact && st.artifact.hasApply);

          tip("<color=#00ff00>" + msg + "</color>");
        } catch(e) {}
      }, true);

      ctx.vlmButton(root, "p00_tab_combat", "⚔️ COMBATE / P02", 145, 36, 245, 48, function(){
        tip("<color=#ffff00>Bloco p02 ainda não carregado nesta versão.</color>");
      }, true);

      ctx.vlmButton(root, "p00_tab_speed", "⚡ VELOCIDADE / P03", -145, -28, 245, 48, function(){
        tip("<color=#ffff00>Bloco p03 ainda não carregado nesta versão.</color>");
      }, true);

      ctx.vlmButton(root, "p00_tab_util", "🔧 UTILIDADES / P04", 145, -28, 245, 48, function(){
        tip("<color=#ffff00>Bloco p04 ainda não carregado nesta versão.</color>");
      }, true);

      ctx.vlmText(root, "p00_line1", "Arquitetura ativa:", 0, -96, 18, "#93c5fd", 520);
      ctx.vlmText(root, "p00_line2", "index limpo + key + packs remotos .vlm", 0, -126, 18, "#ffffff", 520);

      ctx.vlmText(root, "p00_footer", "Menu carregado por p00.vlm remoto.", 0, -218, 17, "#9dff3c", 520);

      log("RENDER_OK", {
        version: VERSION,
        roleId: roleId,
        p01Loaded: p01,
        hasP01Status: !!globalThis.VLM_P01_F25_STATUS
      });

      return true;
    } catch(e) {
      log("RENDER_ERROR", { error: String(e && e.message ? e.message : e) });
      return false;
    }
  };

  globalThis.VLM_P00_MENU_VERSION = VERSION;

  log("INSTALLED", { version: VERSION });
})();
