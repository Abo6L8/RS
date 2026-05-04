// made by Abu 6L8

var countApiKey = "res_sender";
var countNameSpace = "madalinoTribalWarsScripts";
let url = window.location.href;

var units = game_data.units;
var unitsLength = units.length;
if (units.includes("snob")) unitsLength--;
if (units.includes("militia")) unitsLength--;
if (units.includes("knight")) unitsLength--;

var defaultTheme = '[["theme1",["#E0E0E0","#000000","#C5979D","#2B193D","#2C365E","#484D6D","#4B8F8C","50"]],["currentTheme","theme1"],["theme2",["#E0E0E0","#000000","#F76F8E","#113537","#37505C","#445552","#294D4A","50"]],["theme3",["#E0E0E0","#000000","#ACFCD9","#190933","#665687","#7C77B9","#623B5A","50"]],["theme4",["#E0E0E0","#000000","#181F1C","#60712F","#274029","#315C2B","#214F4B","50"]],["theme5",["#E0E0E0","#000000","#9AD1D4","#007EA7","#003249","#1F5673","#1C448E","50"]],["theme6",["#E0E0E0","#000000","#EA8C55","#81171B","#540804","#710627","#9E1946","50"]],["theme7",["#E0E0E0","#000000","#754043","#37423D","#171614","#3A2618","#523A34","50"]],["theme8",["#E0E0E0","#000000","#9E0031","#8E0045","#44001A","#600047","#770058","50"]],["theme9",["#E0E0E0","#000000","#C1BDB3","#5F5B6B","#323031","#3D3B3C","#575366","50"]],["theme10",["#E0E0E0","#000000","#E6BCCD","#29274C","#012A36","#14453D","#7E52A0","50"]]]';
var localStorageThemeName = "resSenderTheme";

if (localStorage.getItem(localStorageThemeName) != undefined) {
    let mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)));
    Array.from(mapTheme.keys()).forEach((key) => {
        if (key != "currentTheme") {
            let listColors = mapTheme.get(key);
            if (listColors.length == 7) { listColors.push(50); mapTheme.set(key, listColors); }
        }
    });
    localStorage.setItem(localStorageThemeName, JSON.stringify(Array.from(mapTheme.entries())));
}

// ── New UI CSS ──────────────────────────────────────────────────────────────
var newUICSS = `
<style id="rs-style">
#rs-wrap *{box-sizing:border-box;margin:0;padding:0}
#rs-wrap{background:#202225;border:1px solid #4a4d54;border-radius:8px;overflow:hidden;font-size:13px;color:#fff;font-family:sans-serif;position:fixed;top:60px;left:20px;z-index:99999;width:520px}
#rs-header{background:#202225;padding:8px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #4a4d54;cursor:move}
#rs-header h2{font-size:14px;font-weight:500;letter-spacing:.3px}
.rs-hdr-actions{display:flex;gap:8px;align-items:center}
.rs-icon-btn{background:none;border:none;cursor:pointer;padding:2px 5px;border-radius:4px;color:#aaa;font-size:14px;line-height:1}
.rs-icon-btn:hover{background:#36393f;color:#fff}
#rs-body{padding:10px 12px}
#rs-inputs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px}
.rs-res-block{background:#32353b;border:1px solid #4a4d54;border-radius:6px;padding:6px 8px;display:flex;align-items:center;gap:6px}
.rs-res-icon{width:16px;height:16px;border-radius:3px;flex-shrink:0}
.wood-icon{background:#6b3a12}.stone-icon{background:#777}.iron-icon{background:#2a4a7a}
.rs-res-block input{background:none;border:none;color:#fff;font-size:13px;width:100%;outline:none;font-family:inherit}
.rs-res-block input::placeholder{color:#666}
#rs-coords{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}
.rs-coord-box label{display:block;font-size:10px;color:#aaa;margin-bottom:4px;font-weight:500;text-transform:uppercase;letter-spacing:.5px}
.rs-coord-box textarea{width:100%;background:#32353b;border:1px solid #4a4d54;border-radius:6px;color:#fff;font-size:12px;padding:6px 8px;resize:none;font-family:monospace;outline:none;min-height:54px}
.rs-coord-box textarea:focus{border-color:#40D0E0}
.rs-coord-footer{display:flex;align-items:center;justify-content:space-between;margin-top:4px}
.rs-coord-count{font-size:11px;color:#40D0E0}
.rs-group-select{background:#32353b;border:1px solid #4a4d54;border-radius:5px;color:#ccc;font-size:11px;padding:3px 6px;outline:none;cursor:pointer;font-family:inherit;max-width:150px}
.rs-group-select:focus{border-color:#40D0E0}
.rs-group-select option{background:#32353b}
#rs-actions{display:flex;gap:8px;margin-bottom:10px}
.rs-btn{padding:6px 16px;border-radius:5px;border:none;cursor:pointer;font-size:12px;font-weight:500;font-family:inherit;background:linear-gradient(to bottom,#6e7178,#000);color:#fff;transition:opacity .15s}
.rs-btn:hover{opacity:.82}.rs-btn:active{transform:scale(.97)}
.rs-btn-send{background:linear-gradient(to bottom,#3a7a3a,#1a4a1a);padding:4px 12px;font-size:11px}
.rs-btn-send:disabled{opacity:.35;cursor:not-allowed;transform:none}
#rs-stats-bar{display:none;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px}
.rs-stat{background:#32353b;border:1px solid #4a4d54;border-radius:6px;padding:6px 8px;text-align:center}
.rs-stat-label{font-size:10px;color:#aaa;margin-bottom:2px}
.rs-stat-value{font-size:14px;font-weight:500}
#rs-table-wrap{display:none;background:#32353b;border:1px solid #4a4d54;border-radius:6px;overflow:hidden;max-height:260px;overflow-y:auto}
#rs-table-wrap table{width:100%;border-collapse:collapse}
#rs-table-wrap thead tr{background:#202225;position:sticky;top:0;z-index:1}
#rs-table-wrap thead th{padding:6px 8px;font-size:10px;font-weight:500;color:#aaa;text-align:left;text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid #4a4d54}
#rs-table-wrap tbody tr{border-bottom:1px solid #2e3035;transition:background .1s,opacity .2s}
#rs-table-wrap tbody tr:last-child{border-bottom:none}
#rs-table-wrap tbody tr:nth-child(odd){background:#32353b}
#rs-table-wrap tbody tr:nth-child(even){background:#36393f}
#rs-table-wrap tbody tr:hover{background:#3e4249}
#rs-table-wrap tbody td{padding:6px 8px;font-size:12px;vertical-align:middle}
.td-village a{color:#40D0E0;text-decoration:none;font-size:11px}
.td-village a:hover{text-decoration:underline}
.td-dist{color:#888;font-size:11px}
.res-wood{color:#c8834a}.res-stone{color:#aaa}.res-iron{color:#7abaff}
.td-total{font-weight:500;font-size:12px}
.rs-empty{padding:18px;text-align:center;color:#666;font-size:12px}
.rs-footer{padding:6px 12px;border-top:1px solid #4a4d54;display:flex;justify-content:space-between;align-items:center}
.rs-footer-credit{font-size:10px;color:#555}
.rs-footer-sent{font-size:11px;color:#4CAF50;font-weight:500}
#rs-settings-panel{display:none;background:#2a2d33;border-bottom:1px solid #4a4d54;padding:10px 12px}
#rs-settings-panel table{width:100%;border-collapse:collapse}
#rs-settings-panel td{padding:4px 6px;font-size:12px;color:#ccc}
#rs-settings-panel input[type=number]{background:#32353b;border:1px solid #4a4d54;border-radius:4px;color:#fff;font-size:12px;padding:3px 6px;width:80px;outline:none}
#rs-settings-panel input[type=checkbox]{cursor:pointer}
</style>`;

// ── Colour helpers (kept from original) ────────────────────────────────────
function getColorDarker(hexInput, percent) {
    let hex = hexInput.replace(/^\s*#|\s*$/g, "");
    if (hex.length === 3) hex = hex.replace(/(.)/g, "$1$1");
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    const p = (100 + percent) / 100;
    r = Math.round(Math.min(255, Math.max(0, r * p)));
    g = Math.round(Math.min(255, Math.max(0, g * p)));
    b = Math.round(Math.min(255, Math.max(0, b * p)));
    return `#${("00"+r.toString(16)).slice(-2).toUpperCase()}${("00"+g.toString(16)).slice(-2).toUpperCase()}${("00"+b.toString(16)).slice(-2).toUpperCase()}`;
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// ── Globals ─────────────────────────────────────────────────────────────────
var listGroups = [];
var rs_sentWood = 0, rs_sentStone = 0, rs_sentIron = 0, rs_sentCount = 0;
var rs_tableRows = [];

// ── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
    await $.getScript("https://dl.dropboxusercontent.com/s/i5c0so9hwsizogm/styleCSSGlobal.js?dl=0");
    listGroups = await getGroups();
    buildUI();
    makeDraggable();
    initCoordEvents();
    insertCoordsFromGroups(0);
    insertCoordsFromGroups(1);
    restoreSettings();
    hitCountApi();
}
main();

// ── Build UI ─────────────────────────────────────────────────────────────────
function buildUI() {
    $("#rs-wrap").remove();
    $("head").append(newUICSS);

    var groupOptions = '<option value="none">— group —</option>';
    listGroups.forEach(function(g) {
        groupOptions += `<option value="${g.href}">${g.groupName}</option>`;
    });

    var html = `
    <div id="rs-wrap">
      <div id="rs-header">
        <h2>Resources sender</h2>
        <div class="rs-hdr-actions">
          <button class="rs-icon-btn" title="settings" onclick="rsToggleSettings()">⚙</button>
          <button class="rs-icon-btn" title="minimize" onclick="rsToggleBody()">—</button>
          <button class="rs-icon-btn" title="close" onclick="$('#rs-wrap').remove()">✕</button>
        </div>
      </div>

      <div id="rs-settings-panel">
        <table>
          <tr>
            <td>reserve merchants</td>
            <td><input type="number" id="rs-reserve" value="0" min="0"></td>
            <td><a href="#" onclick="UI.InfoMessage('Merchants kept at home as reserve',2000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:12px;height:12px"/></a></td>
          </tr>
          <tr>
            <td>min resources</td>
            <td><input type="number" id="rs-minres" value="0" min="0"></td>
            <td><a href="#" onclick="UI.InfoMessage('Only send if resources exceed this value',2000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:12px;height:12px"/></a></td>
          </tr>
          <tr>
            <td>max distance</td>
            <td><input type="number" id="rs-maxdist" value="500" min="0"></td>
            <td><a href="#" onclick="UI.InfoMessage('Skip if distance exceeds this value',2000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:12px;height:12px"/></a></td>
          </tr>
          <tr>
            <td>overflow protection</td>
            <td><input type="checkbox" id="rs-overflow" checked></td>
            <td><a href="#" onclick="UI.InfoMessage('Will not send more than 95% of warehouse capacity',2000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:12px;height:12px"/></a></td>
          </tr>
          <tr>
            <td>max for each target</td>
            <td><input type="number" id="rs-maxpertarget" value="0" min="0" placeholder="0 = off"></td>
            <td><a href="#" onclick="UI.InfoMessage('Max per resource type per target village (wood/stone/iron each). Only applies to non-own villages. 0 = disabled.',3000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:12px;height:12px"/></a></td>
          </tr>
        </table>
      </div>

      <div id="rs-body">
        <div id="rs-inputs">
          <div class="rs-res-block">
            <div class="rs-res-icon wood-icon"></div>
            <input type="number" id="rs-wood" placeholder="140000" value="140000">
          </div>
          <div class="rs-res-block">
            <div class="rs-res-icon stone-icon"></div>
            <input type="number" id="rs-stone" placeholder="150000" value="150000">
          </div>
          <div class="rs-res-block">
            <div class="rs-res-icon iron-icon"></div>
            <input type="number" id="rs-iron" placeholder="125000" value="125000">
          </div>
        </div>

        <div id="rs-coords">
          <div class="rs-coord-box">
            <label>Origin coords</label>
            <textarea id="rs-ta-origin" rows="3" placeholder="500|500 501|502 ..."></textarea>
            <div class="rs-coord-footer">
              <span class="rs-coord-count" id="rs-cnt-origin">0 villages</span>
              <select class="rs-group-select" id="rs-sel-origin" onchange="rsSelectGroup('origin')">
                ${groupOptions}
              </select>
            </div>
          </div>
          <div class="rs-coord-box">
            <label>Target coords</label>
            <textarea id="rs-ta-target" rows="3" placeholder="503|504 505|506 ..."></textarea>
            <div class="rs-coord-footer">
              <span class="rs-coord-count" id="rs-cnt-target">0 villages</span>
              <select class="rs-group-select" id="rs-sel-target" onchange="rsSelectGroup('target')">
                ${groupOptions}
              </select>
            </div>
          </div>
        </div>

        <div id="rs-actions">
          <button class="rs-btn" onclick="calculateLaunches()">calculate</button>
        </div>

        <div id="rs-stats-bar">
          <div class="rs-stat">
            <div class="rs-stat-label">sent total</div>
            <div class="rs-stat-value" style="color:#4CAF50" id="rs-stat-total">0</div>
          </div>
          <div class="rs-stat">
            <div class="rs-stat-label" style="color:#c8834a">wood</div>
            <div class="rs-stat-value" style="color:#c8834a" id="rs-stat-wood">0</div>
          </div>
          <div class="rs-stat">
            <div class="rs-stat-label" style="color:#aaa">stone</div>
            <div class="rs-stat-value" style="color:#aaa" id="rs-stat-stone">0</div>
          </div>
          <div class="rs-stat">
            <div class="rs-stat-label" style="color:#7abaff">iron</div>
            <div class="rs-stat-value" style="color:#7abaff" id="rs-stat-iron">0</div>
          </div>
        </div>

        <div id="rs-table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>origin</th>
                <th>target</th>
                <th>dist</th>
                <th>wood</th>
                <th>stone</th>
                <th>iron</th>
                <th>total</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="rs-tbody"></tbody>
          </table>
          <div id="rs-empty" class="rs-empty" style="display:none">✓ All sent!</div>
        </div>
      </div>

      <div class="rs-footer">
        <span class="rs-footer-credit">made by Abu 6L8</span>
        <span class="rs-footer-sent" id="rs-footer-sent"></span>
      </div>
    </div>`;

    $("body").append(html);
}

// ── Draggable ────────────────────────────────────────────────────────────────
function makeDraggable() {
    var el = document.getElementById("rs-wrap");
    var hdr = document.getElementById("rs-header");
    var ox = 0, oy = 0, mx = 0, my = 0;
    hdr.onmousedown = function(e) {
        e.preventDefault();
        mx = e.clientX; my = e.clientY;
        document.onmouseup = function() { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = function(e) {
            ox = mx - e.clientX; oy = my - e.clientY;
            mx = e.clientX; my = e.clientY;
            el.style.top  = (el.offsetTop  - oy) + "px";
            el.style.left = (el.offsetLeft - ox) + "px";
        };
    };
}

// ── UI helpers ───────────────────────────────────────────────────────────────
function rsToggleBody() {
    var b = document.getElementById("rs-body");
    b.style.display = b.style.display === "none" ? "" : "none";
}
function rsToggleSettings() {
    var p = document.getElementById("rs-settings-panel");
    p.style.display = p.style.display === "none" ? "" : "none";
}

function fmtNum(n) { return new Intl.NumberFormat().format(Math.round(n)); }
function fmtShort(n) { return n >= 1000 ? Math.round(n / 1000) + "k" : String(Math.round(n)); }

function countCoords(txt) {
    var m = txt.match(/\d{3}\|\d{3}/g);
    return m ? [...new Set(m)].length : 0;
}

function initCoordEvents() {
    $("#rs-ta-origin").on("input", function() {
        $("#rs-cnt-origin").text(countCoords(this.value) + " villages");
        $("#rs-sel-origin").val("none");
        rsSaveData();
    });
    $("#rs-ta-target").on("input", function() {
        $("#rs-cnt-target").text(countCoords(this.value) + " villages");
        $("#rs-sel-target").val("none");
        rsSaveData();
    });
    $("#rs-wood, #rs-stone, #rs-iron").on("input", rsSaveData);
}

async function rsSelectGroup(side) {
    var sel = document.getElementById("rs-sel-" + side);
    var ta  = document.getElementById("rs-ta-" + side);
    var cnt = document.getElementById("rs-cnt-" + side);
    var val = sel.value;
    if (val === "none") { ta.value = ""; cnt.textContent = "0 villages"; return; }
    var coords = await getGroupCoords(val);
    ta.value = coords;
    cnt.textContent = countCoords(coords) + " villages";
    rsSaveData();
}

// ── Stat bar update ───────────────────────────────────────────────────────────
function rsUpdateStats(dw, ds, di) {
    rs_sentWood  += dw;
    rs_sentStone += ds;
    rs_sentIron  += di;
    var tot = rs_sentWood + rs_sentStone + rs_sentIron;
    document.getElementById("rs-stat-total").textContent = fmtNum(tot);
    document.getElementById("rs-stat-wood").textContent  = fmtNum(rs_sentWood);
    document.getElementById("rs-stat-stone").textContent = fmtNum(rs_sentStone);
    document.getElementById("rs-stat-iron").textContent  = fmtNum(rs_sentIron);
    document.getElementById("rs-footer-sent").textContent =
        rs_sentCount + " sent · " + fmtNum(tot) + " res";
}

// ── Render table ──────────────────────────────────────────────────────────────
function rsRenderTable() {
    var tbody = document.getElementById("rs-tbody");
    tbody.innerHTML = "";
    rs_tableRows.forEach(function(row, i) {
        var tr = document.createElement("tr");
        tr.id = "rs-row-" + row.idx;
        var tot = row.wood + row.stone + row.iron;
        tr.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td class='td-village'><a href='" + game_data.link_base_pure + "info_village&id=" + row.id_origin + "'>" + row.coord_origin + "</a></td>" +
            "<td class='td-village'><a href='" + game_data.link_base_pure + "info_village&id=" + row.id_target + "'>" + row.coord_target + "</a></td>" +
            "<td class='td-dist'>" + row.distance.toFixed(1) + "</td>" +
            "<td class='td-res res-wood'>" + fmtShort(row.wood) + "</td>" +
            "<td class='td-res res-stone'>" + fmtShort(row.stone) + "</td>" +
            "<td class='td-res res-iron'>" + fmtShort(row.iron) + "</td>" +
            "<td class='td-total'>" + fmtShort(tot) + "</td>" +
            "<td><button class='rs-btn rs-btn-send' onclick='rsSendRow(" + row.idx + ")'>send</button></td>";
        tbody.appendChild(tr);
    });
}

function rsRenumber() {
    var rows = document.querySelectorAll("#rs-tbody tr");
    rows.forEach(function(r, i) { r.cells[0].textContent = i + 1; });
}

function rsCheckEmpty() {
    if (rs_tableRows.length === 0) {
        document.getElementById("rs-empty").style.display = "block";
        var tbl = document.querySelector("#rs-table-wrap table");
        if (tbl) tbl.style.display = "none";
    }
}

// ── Send single row ───────────────────────────────────────────────────────────
function rsSendRow(idx) {
    var row = rs_tableRows.find(function(r) { return r.idx === idx; });
    if (!row) return;

    rs_sentCount++;
    rsUpdateStats(row.wood, row.stone, row.iron);

    if (row.own_village === false) {
        sendResources(row.id_target, row.id_origin, row.wood, row.stone, row.iron);
    } else {
        massSendResources(row.id_target, row.mass_data);
    }

    var rowEl = document.getElementById("rs-row-" + idx);
    if (rowEl) {
        rowEl.style.opacity = "0";
        rowEl.style.transition = "opacity 0.2s";
        setTimeout(function() {
            rowEl.remove();
            rs_tableRows = rs_tableRows.filter(function(r) { return r.idx !== idx; });
            rsRenumber();
            rsCheckEmpty();
        }, 200);
    }
}

// ── Calculate ────────────────────────────────────────────────────────────────
async function calculateLaunches() {
    rs_sentWood = 0; rs_sentStone = 0; rs_sentIron = 0; rs_sentCount = 0;
    rs_tableRows = [];
    document.getElementById("rs-footer-sent").textContent = "";
    document.getElementById("rs-stat-total").textContent = "0";
    document.getElementById("rs-stat-wood").textContent  = "0";
    document.getElementById("rs-stat-stone").textContent = "0";
    document.getElementById("rs-stat-iron").textContent  = "0";

    var reserve_merchants   = parseInt(document.getElementById("rs-reserve").value)  || 0;
    var min_resources       = parseInt(document.getElementById("rs-minres").value)   || 0;
    var max_distance        = parseInt(document.getElementById("rs-maxdist").value)  || 500;
    var overflow_protection = document.getElementById("rs-overflow").checked;
    var max_per_target      = parseInt(document.getElementById("rs-maxpertarget").value) || 0;
    var merchant_capacity   = 1000;

    // PT server uses 1500
    if (game_data.locale === "pt_PT" || game_data.locale === "de_DE") merchant_capacity = 1500;

    var wood_send  = parseInt(document.getElementById("rs-wood").value)  || 140000;
    var stone_send = parseInt(document.getElementById("rs-stone").value) || 150000;
    var iron_send  = parseInt(document.getElementById("rs-iron").value)  || 125000;

    var origin_raw = document.getElementById("rs-ta-origin").value.match(/\d{3}\|\d{3}/g);
    var target_raw = document.getElementById("rs-ta-target").value.match(/\d{3}\|\d{3}/g);

    if (!origin_raw || !target_raw) { UI.ErrorMessage("Please enter origin and target coords", 2000); return; }

    var origin_coord = [...new Set(origin_raw)];
    var target_coord = [...new Set(target_raw)];
    origin_coord = origin_coord.filter(e => !target_coord.includes(e));

    var map_production = await getDataProduction().catch(err => { alert(err); return null; });
    if (!map_production) return;
    var map_villageInfo = await getInfoVIllages().catch(err => { alert(err); return null; });
    if (!map_villageInfo) return;
    var map_incoming = await getDataIncoming().catch(err => { alert(err); return null; });
    if (!map_incoming) return;

    var map_production_home = new Map();
    Array.from(map_production.keys()).forEach(key => {
        map_production_home.set(key, JSON.parse(JSON.stringify(map_production.get(key))));
    });

    // Add incoming to production
    Array.from(map_production.keys()).forEach(key => {
        let obj = map_production.get(key);
        if (map_incoming.has(key)) {
            obj.wood  += map_incoming.get(key).wood;
            obj.stone += map_incoming.get(key).stone;
            obj.iron  += map_incoming.get(key).iron;
            map_production.set(key, obj);
        }
    });

    var list_launches = [];
    var list_res_send = [];
    var list_res_get  = [];

    // ── Calculate what each origin can send ──
    for (let i = 0; i < origin_coord.length; i++) {
        let obj = map_production_home.get(origin_coord[i]);
        if (obj == undefined) { UI.ErrorMessage("Origin coord not found in current group", 2000); return; }

        obj.merchants -= reserve_merchants;
        let capacity_available = obj.merchants * merchant_capacity;

        let wood_available  = (obj.wood  > min_resources) ? Math.min(obj.wood  - min_resources, wood_send)  : 0;
        let stone_available = (obj.stone > min_resources) ? Math.min(obj.stone - min_resources, stone_send) : 0;
        let iron_available  = (obj.iron  > min_resources) ? Math.min(obj.iron  - min_resources, iron_send)  : 0;

        let fw = wood_available  / wood_send;
        let fs = stone_available / stone_send;
        let fi = iron_available  / iron_send;
        let min_f = Math.min(fw, fs, fi);

        if (min_f < 1) {
            if (min_f === fw) { stone_available = Math.round(Math.max(stone_send, stone_available) * min_f); iron_available  = Math.round(Math.max(iron_send,  iron_available)  * min_f); }
            if (min_f === fs) { wood_available  = Math.round(Math.max(wood_send,  wood_available)  * min_f); iron_available  = Math.round(Math.max(iron_send,  iron_available)  * min_f); }
            if (min_f === fi) { wood_available  = Math.round(Math.max(wood_send,  wood_available)  * min_f); stone_available = Math.round(Math.max(stone_send, stone_available) * min_f); }
        }

        let total_res   = wood_available + stone_available + iron_available;
        let factor_cap  = (total_res > capacity_available) ? capacity_available / total_res : 1;
        wood_available  = Math.round(wood_available  * factor_cap);
        stone_available = Math.round(stone_available * factor_cap);
        iron_available  = Math.round(iron_available  * factor_cap);

        list_res_send.push({ coord_origin: obj.coord, id_origin: obj.id, wood: wood_available, stone: stone_available, iron: iron_available });
    }

    // ── Distribute to targets ──
    let wood_total  = list_res_send.reduce((a, b) => a + b.wood,  0);
    let stone_total = list_res_send.reduce((a, b) => a + b.stone, 0);
    let iron_total  = list_res_send.reduce((a, b) => a + b.iron,  0);

    let maxResource = Math.max(wood_total, stone_total, iron_total);
    let sorted = [{value:wood_total,type:"wood"},{value:stone_total,type:"stone"},{value:iron_total,type:"iron"}]
        .sort((a,b) => a.value - b.value);
    let fRes = {};
    fRes[sorted[0].type] = sorted[0].value / sorted[2].value;
    fRes[sorted[1].type] = sorted[1].value / sorted[2].value;
    fRes[sorted[2].type] = 1;

    let minRes = 1000;
    let minResW = Math.round(minRes * fRes["wood"]);
    let minResS = Math.round(minRes * fRes["stone"]);
    let minResI = Math.round(minRes * fRes["iron"]);
    let safetyBreak = Math.round(maxResource / minRes) + 1;
    let idx_safety  = 0;

    let mapTargets = new Map();
    while (wood_total > minResW || stone_total > minResS || iron_total > minResI) {
        let breakLoop = true;
        for (let i = 0; i < target_coord.length; i++) {
            if (mapTargets.has(target_coord[i])) {
                let obj = mapTargets.get(target_coord[i]);
                let fw = obj.wood  + minResW;
                let fs = obj.stone + minResS;
                let fi = obj.iron  + minResI;

                if (overflow_protection && map_production.has(target_coord[i])) {
                    let whCap = map_production.get(target_coord[i]).capacity * 0.95;
                    let ew = map_production.get(target_coord[i]).wood;
                    let es = map_production.get(target_coord[i]).stone;
                    let ei = map_production.get(target_coord[i]).iron;
                    fw = Math.round((fw + ew < whCap) ? fw : Math.max(whCap - ew, 0));
                    fs = Math.round((fs + es < whCap) ? fs : Math.max(whCap - es, 0));
                    fi = Math.round((fi + ei < whCap) ? fi : Math.max(whCap - ei, 0));
                }
                // max per target: cap each resource type individually (for non-own villages)
                if (max_per_target > 0 && !map_production.has(target_coord[i])) {
                    fw = Math.min(fw, max_per_target);
                    fs = Math.min(fs, max_per_target);
                    fi = Math.min(fi, max_per_target);
                }
                if (fw > obj.wood  && wood_total  > minResW) { wood_total  -= 1000; breakLoop = false; }
                if (fs > obj.stone && stone_total > minResS) { stone_total -= 1000; breakLoop = false; }
                if (fi > obj.iron  && iron_total  > minResI) { iron_total  -= 1000; breakLoop = false; }

                mapTargets.set(target_coord[i], { coord_target: target_coord[i], id_target: map_villageInfo.get(target_coord[i]), wood: fw, stone: fs, iron: fi });
            } else {
                mapTargets.set(target_coord[i], { coord_target: target_coord[i], id_target: map_villageInfo.get(target_coord[i]), wood: 0, stone: 0, iron: 0 });
                breakLoop = false;
            }
        }
        if (breakLoop) break;
        if (++idx_safety > safetyBreak) break;
    }
    list_res_get = [...mapTargets.values()];

    // ── Match sources to targets ──
    for (let i = 0; i < list_res_get.length; i++) {
        let id_target    = list_res_get[i].id_target;
        let coord_target = list_res_get[i].coord_target;

        list_res_send.forEach(s => s.distance = calcDistance(coord_target, s.coord_origin));
        list_res_send.sort((a, b) => a.distance - b.distance);

        for (let j = 0; j < list_res_send.length; j++) {
            if (list_res_send[j].distance > max_distance) continue;
            if (coord_target === list_res_send[j].coord_origin) continue;

            let send_wood  = (list_res_send[j].wood  > 0) ? Math.min(list_res_get[i].wood,  list_res_send[j].wood)  : 0;
            let send_stone = (list_res_send[j].stone > 0) ? Math.min(list_res_get[i].stone, list_res_send[j].stone) : 0;
            let send_iron  = (list_res_send[j].iron  > 0) ? Math.min(list_res_get[i].iron,  list_res_send[j].iron)  : 0;

            list_res_get[i].wood  -= send_wood;
            list_res_get[i].stone -= send_stone;
            list_res_get[i].iron  -= send_iron;
            list_res_send[j].wood  -= send_wood;
            list_res_send[j].stone -= send_stone;
            list_res_send[j].iron  -= send_iron;

            let total_send = send_wood + send_stone + send_iron;
            let minim = (merchant_capacity === 1000) ? 700 : 1200;
            let rest  = total_send % merchant_capacity;
            if (rest < minim) {
                if      (send_wood  > rest) { send_wood  -= rest; total_send -= rest; }
                else if (send_stone > rest) { send_stone -= rest; total_send -= rest; }
                else if (send_iron  > rest) { send_iron  -= rest; total_send -= rest; }
            }

            let own_village = map_production.has(coord_target);

            if (total_send >= minim) {
                list_launches.push({
                    total_send, wood: send_wood, stone: send_stone, iron: send_iron,
                    coord_target, coord_origin: list_res_send[j].coord_origin,
                    id_origin: list_res_send[j].id_origin, id_target,
                    distance: list_res_send[j].distance, own_village
                });
            }

            let total_get = list_res_get[i].wood + list_res_get[i].stone + list_res_get[i].iron;
            if (total_get < minim) break;
        }
    }

    // ── Build mass-send map for own villages ──
    let map_launches_mass = new Map();
    list_launches.forEach(function(launch) {
        if (!map_production.has(launch.coord_target)) return;
        let tid = launch.id_target;
        let wk  = `resource[${launch.id_origin}][wood]`;
        let sk  = `resource[${launch.id_origin}][stone]`;
        let ik  = `resource[${launch.id_origin}][iron]`;
        if (map_launches_mass.has(tid)) {
            let o = map_launches_mass.get(tid);
            o.send_resources[wk] = launch.wood;
            o.send_resources[sk] = launch.stone;
            o.send_resources[ik] = launch.iron;
            o.total_send  += launch.total_send;
            o.total_wood  += launch.wood;
            o.total_stone += launch.stone;
            o.total_iron  += launch.iron;
            o.distance = Math.max(o.distance, launch.distance);
            map_launches_mass.set(tid, o);
        } else {
            let sr = {}; sr[wk] = launch.wood; sr[sk] = launch.stone; sr[ik] = launch.iron;
            map_launches_mass.set(tid, { target_id: tid, coord_target: launch.coord_target, send_resources: sr, total_send: launch.total_send, total_wood: launch.wood, total_stone: launch.stone, total_iron: launch.iron, distance: launch.distance });
        }
    });

    // ── Populate rs_tableRows ──
    rs_tableRows = [];
    let rowIdx = 0;
    list_launches.forEach(function(launch) {
        let hasInfo = true;
        let r = {};
        if (launch.own_village === false) {
            r = { idx: rowIdx, coord_origin: launch.coord_origin, coord_target: launch.coord_target, id_origin: launch.id_origin, id_target: launch.id_target, wood: launch.wood, stone: launch.stone, iron: launch.iron, distance: launch.distance, own_village: false };
        } else {
            let obj = map_launches_mass.get(launch.id_target);
            if (!obj) { hasInfo = false; }
            else {
                r = { idx: rowIdx, coord_origin: "multiple", coord_target: obj.coord_target, id_origin: "", id_target: obj.target_id, wood: obj.total_wood, stone: obj.total_stone, iron: obj.total_iron, distance: obj.distance, own_village: true, mass_data: obj.send_resources };
                map_launches_mass.delete(launch.id_target);
            }
        }
        if (hasInfo) { rs_tableRows.push(r); rowIdx++; }
    });

    rsRenderTable();
    document.getElementById("rs-stats-bar").style.display   = "grid";
    document.getElementById("rs-table-wrap").style.display  = "block";
    document.getElementById("rs-empty").style.display       = "none";
    var tbl = document.querySelector("#rs-table-wrap table");
    if (tbl) tbl.style.display = "";

    // Enter key to send first row
    window.onkeydown = function(e) {
        if (e.which === 13 && rs_tableRows.length > 0) rsSendRow(rs_tableRows[0].idx);
    };
}

// ── Send helpers ─────────────────────────────────────────────────────────────
function sendResources(target_id, origin_id, wood, stone, iron) {
    TribalWars.post("market", { ajaxaction: "map_send", village: origin_id },
        { target_id, wood, stone, iron },
        function(data) { UI.SuccessMessage(data.message, 1000); }, false);
}

function massSendResources(target_id, data) {
    TribalWars.post("market", { village: target_id, ajaxaction: "call", h: window.csrf_token }, data,
        function(res) { UI.SuccessMessage(res.success, 1000); },
        function(err) { console.log(err); });
}

// ── Data fetching (original logic, unchanged) ─────────────────────────────────
function getDataProduction() {
    return new Promise((resolve, reject) => {
        let link = game_data.link_base_pure + "overview_villages&mode=prod&mode=prod&group=0";
        let datePage = httpGet(link);
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(datePage, "text/html");
        let list_pages = [];

        if ($(htmlDoc).find(".paged-nav-item").parent().find("select").length > 0) {
            Array.from($(htmlDoc).find(".paged-nav-item").parent().find("select").find("option")).forEach(item => list_pages.push(item.value));
            list_pages.pop();
        } else if (htmlDoc.getElementsByClassName("paged-nav-item").length > 0) {
            let nr = 0;
            Array.from(htmlDoc.getElementsByClassName("paged-nav-item")).forEach(item => {
                let cur = item.href.split("page=")[0] + "page=" + nr++;
                list_pages.push(cur);
            });
        } else { list_pages.push(link); }
        list_pages = list_pages.reverse();

        let map_production = new Map();
        function ajaxRequest(urls) {
            let cur = urls.length > 0 ? urls.pop() : "stop";
            if (urls.length >= 0 && cur !== "stop") {
                let t0 = new Date().getTime();
                $.ajax({ url: cur, method: "get",
                    success: (data) => {
                        const doc = new DOMParser().parseFromString(data, "text/html");
                        if (game_data.device === "desktop") {
                            Array.from($(doc).find(".row_a, .row_b")).forEach(row => {
                                let coord    = row.getElementsByClassName("quickedit-vn")[0].innerText.match(/\d{3}\|\d{3}/)[0];
                                let id       = row.getElementsByClassName("quickedit-vn")[0].getAttribute("data-id");
                                let wood     = parseInt(row.getElementsByClassName("wood")[0].innerText.replace(".", ""));
                                let stone    = parseInt(row.getElementsByClassName("stone")[0].innerText.replace(".", ""));
                                let iron     = parseInt(row.getElementsByClassName("iron")[0].innerText.replace(".", ""));
                                let merchants= parseInt(row.querySelector("a[href*='market']").innerText.split("/")[0]);
                                let capacity = parseInt(row.children[4].innerText);
                                map_production.set(coord, { coord, id, wood, stone, iron, merchants, capacity });
                            });
                        } else {
                            Array.from($(doc).find(".overview-container").find(".overview-container-item")).forEach(row => {
                                let name     = $(row).find(".quickedit-label").text().trim();
                                let coord    = name.match(/\d+\|\d+/)[0];
                                let id       = $(row).find(".quickedit-vn").attr("data-id");
                                let wood     = parseInt(row.getElementsByClassName("mwood")[0].innerText.replace(".", ""));
                                let stone    = parseInt(row.getElementsByClassName("mstone")[0].innerText.replace(".", ""));
                                let iron     = parseInt(row.getElementsByClassName("miron")[0].innerText.replace(".", ""));
                                let merchants= parseInt($(row).find(".vertical_center").text().trim());
                                let capacity = parseInt(row.getElementsByClassName("ressources")[0].parentElement.innerText);
                                map_production.set(coord, { coord, id, wood, stone, iron, merchants, capacity });
                            });
                        }
                        let diff = new Date().getTime() - t0;
                        setTimeout(() => { ajaxRequest(urls); UI.SuccessMessage("get production page: " + urls.length); }, Math.max(0, 200 - diff));
                    },
                    error: (err) => reject(err)
                });
            } else { UI.SuccessMessage("done"); resolve(map_production); }
        }
        ajaxRequest(list_pages);
    });
}

function calcDistance(coord1, coord2) {
    let x1 = parseInt(coord1.split("|")[0]), y1 = parseInt(coord1.split("|")[1]);
    let x2 = parseInt(coord2.split("|")[0]), y2 = parseInt(coord2.split("|")[1]);
    return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
}

function getInfoVIllages() {
    return new Promise((resolve, reject) => {
        let mapVillage = new Map();
        let server_date = document.getElementById("serverDate").innerText.split("/");
        let server_time = document.getElementById("serverTime").innerText;
        let current_date = new Date(server_date[1]+"/"+server_date[0]+"/"+server_date[2]+" "+server_time);
        let base_url = window.location.href.split("/game.php")[0];

        if (localStorage.getItem(game_data.world + "inno_coords") == null) {
            httpGet(base_url + "/map/village.txt").split(/\r?\n/).forEach(line => {
                let parts = line.split(",");
                if (parts.length > 3) mapVillage.set(parts[2]+"|"+parts[3], parts[0]);
            });
            let obj = { datetime: current_date, data: Array.from(mapVillage.entries()) };
            localStorage.setItem(game_data.world + "inno_coords", lzw_encode(JSON.stringify(obj)));
        } else {
            let db = JSON.parse(lzw_decode(localStorage.getItem(game_data.world + "inno_coords")));
            mapVillage = new Map(db.data);
            if (new Date(current_date).getTime() - new Date(db.datetime) > 3600*1000) {
                httpGet(base_url + "/map/village.txt").split(/\r?\n/).forEach(line => {
                    let parts = line.split(",");
                    if (parts.length > 3) mapVillage.set(parts[2]+"|"+parts[3], parts[0]);
                });
                let obj = { datetime: current_date, data: Array.from(mapVillage.entries()) };
                localStorage.setItem(game_data.world + "inno_coords", lzw_encode(JSON.stringify(obj)));
            }
        }
        resolve(mapVillage);
    });
}

function getDataIncoming() {
    return new Promise((resolve, reject) => {
        let link = game_data.link_base_pure + "overview_villages&mode=trader&type=inc";
        let datePage = httpGet(link);
        const htmlDoc = new DOMParser().parseFromString(datePage, "text/html");
        let list_pages = [];

        if ($(htmlDoc).find(".paged-nav-item").parent().find("select").length > 0) {
            Array.from($(htmlDoc).find(".paged-nav-item").parent().find("select").find("option")).forEach(item => list_pages.push(item.value));
            list_pages.pop();
        } else if (htmlDoc.getElementsByClassName("paged-nav-item").length > 0) {
            let nr = 0;
            Array.from(htmlDoc.getElementsByClassName("paged-nav-item")).forEach(item => {
                list_pages.push(item.href.split("page=")[0] + "page=" + nr++);
            });
        } else { list_pages.push(link); }
        list_pages = list_pages.reverse();

        let map_incoming = new Map();
        function ajaxRequest(urls) {
            let cur = urls.length > 0 ? urls.pop() : "stop";
            if (urls.length >= 0 && cur !== "stop") {
                let t0 = new Date().getTime();
                $.ajax({ url: cur, method: "get",
                    success: (data) => {
                        const doc = new DOMParser().parseFromString(data, "text/html");
                        Array.from($(doc).find(".row_a, .row_b")).forEach(row => {
                            let coord = game_data.device === "desktop"
                                ? row.children[4].innerText.match(/\d{3}\|\d{3}/)[0]
                                : row.children[3].innerText.match(/\d{3}\|\d{3}/g)[1];
                            let wood  = parseInt($(row).find(".wood").parent().text().replace(".", ""))  || 0;
                            let stone = parseInt($(row).find(".stone").parent().text().replace(".", "")) || 0;
                            let iron  = parseInt($(row).find(".iron").parent().text().replace(".", ""))  || 0;
                            if (map_incoming.has(coord)) {
                                let o = map_incoming.get(coord);
                                o.wood += wood; o.stone += stone; o.iron += iron;
                                map_incoming.set(coord, o);
                            } else { map_incoming.set(coord, { wood, stone, iron }); }
                        });
                        let diff = new Date().getTime() - t0;
                        setTimeout(() => { ajaxRequest(urls); UI.SuccessMessage("get incoming page: " + urls.length); }, Math.max(0, 200 - diff));
                    },
                    error: (err) => reject(err)
                });
            } else { UI.SuccessMessage("done"); resolve(map_incoming); }
        }
        ajaxRequest(list_pages);
    });
}

function getGroups() {
    return new Promise((resolve) => {
        let urlPage = game_data.link_base_pure + "overview_villages&mode=groups&type=static&group=0";
        let dataPage = httpGet(urlPage);
        const htmlDoc = new DOMParser().parseFromString(dataPage, "text/html");
        let groups = [];
        if (game_data.device === "desktop") {
            groups = Array.from($(htmlDoc).find(".group-menu-item")).map(e => ({
                href: game_data.link_base_pure + `overview_villages&mode=combined&group=${e.getAttribute("data-group-id")}&page=-1`,
                groupName: e.innerText.trim().replace(/[\[\]<>]/g, "")
            }));
        } else {
            groups = Array.from($(htmlDoc).find(".vis_item select option")).map(e => ({
                href: e.value + "&page=-1",
                groupName: e.innerText.trim().replace(/[\[\]<>]/g, "")
            }));
        }
        resolve(groups);
    });
}

function getGroupCoords(url) {
    return new Promise((resolve) => {
        let dataPage = httpGet(url);
        const htmlDoc = new DOMParser().parseFromString(dataPage, "text/html");
        let coords = [];
        if (game_data.device === "desktop")
            coords = Array.from($(htmlDoc).find(".row_a, .row_b")).map(e => e.children[1].innerText.match(/\d+\|\d+/)[0]);
        else
            coords = Array.from($(htmlDoc).find(".quickedit-vn")).map(e => e.innerText.match(/\d+\|\d+/)[0]);
        resolve(coords.join(" "));
    });
}

// ── LZW compression (original, unchanged) ────────────────────────────────────
function lzw_encode(s) {
    if (!s) return s;
    var dict = new Map(), data = (s+"").split(""), out = [], phrase = data[0], code = 256;
    for (var i = 1; i < data.length; i++) {
        var c = data[i];
        if (dict.has(phrase+c)) { phrase += c; }
        else {
            out.push(phrase.length > 1 ? dict.get(phrase) : phrase.codePointAt(0));
            dict.set(phrase+c, code++);
            if (code === 0xd800) code = 0xe000;
            phrase = c;
        }
    }
    out.push(phrase.length > 1 ? dict.get(phrase) : phrase.codePointAt(0));
    return out.map(c => String.fromCodePoint(c)).join("");
}
function lzw_decode(s) {
    var dict = new Map(), data = Array.from(s+""), currChar = data[0], oldPhrase = currChar, out = [currChar], code = 256, phrase;
    for (var i = 1; i < data.length; i++) {
        var currCode = data[i].codePointAt(0);
        phrase = currCode < 256 ? data[i] : (dict.has(currCode) ? dict.get(currCode) : oldPhrase + currChar);
        out.push(phrase);
        currChar = String.fromCodePoint(phrase.codePointAt(0));
        dict.set(code++, oldPhrase + currChar);
        if (code === 0xd800) code = 0xe000;
        oldPhrase = phrase;
    }
    return out.join("");
}

// ── Save / restore settings ───────────────────────────────────────────────────
function rsSaveData() {
    let data = {
        wood:    document.getElementById("rs-wood")  ? document.getElementById("rs-wood").value  : "140000",
        stone:   document.getElementById("rs-stone") ? document.getElementById("rs-stone").value : "150000",
        iron:    document.getElementById("rs-iron")  ? document.getElementById("rs-iron").value  : "125000",
        origin:  document.getElementById("rs-ta-origin") ? document.getElementById("rs-ta-origin").value : "",
        target:  document.getElementById("rs-ta-target") ? document.getElementById("rs-ta-target").value : "",
        reserve: document.getElementById("rs-reserve") ? document.getElementById("rs-reserve").value : "0",
        minres:  document.getElementById("rs-minres")  ? document.getElementById("rs-minres").value  : "0",
        maxdist: document.getElementById("rs-maxdist") ? document.getElementById("rs-maxdist").value : "500",
        overflow: document.getElementById("rs-overflow") ? document.getElementById("rs-overflow").checked : true,
        maxpertarget: document.getElementById("rs-maxpertarget") ? document.getElementById("rs-maxpertarget").value : "0"
    };
    localStorage.setItem(game_data.world + "_resSender_data", JSON.stringify(data));
}
function restoreSettings() {
    let raw = localStorage.getItem(game_data.world + "_resSender_data");
    if (!raw) return;
    let d = JSON.parse(raw);
    if (d.wood    && document.getElementById("rs-wood"))       document.getElementById("rs-wood").value       = d.wood;
    if (d.stone   && document.getElementById("rs-stone"))      document.getElementById("rs-stone").value      = d.stone;
    if (d.iron    && document.getElementById("rs-iron"))       document.getElementById("rs-iron").value       = d.iron;
    if (d.origin  && document.getElementById("rs-ta-origin"))  { document.getElementById("rs-ta-origin").value  = d.origin;  document.getElementById("rs-cnt-origin").textContent  = countCoords(d.origin)  + " villages"; }
    if (d.target  && document.getElementById("rs-ta-target"))  { document.getElementById("rs-ta-target").value  = d.target;  document.getElementById("rs-cnt-target").textContent  = countCoords(d.target)  + " villages"; }
    if (d.reserve && document.getElementById("rs-reserve"))    document.getElementById("rs-reserve").value    = d.reserve;
    if (d.minres  && document.getElementById("rs-minres"))     document.getElementById("rs-minres").value     = d.minres;
    if (d.maxdist && document.getElementById("rs-maxdist"))    document.getElementById("rs-maxdist").value    = d.maxdist;
    if (document.getElementById("rs-overflow"))                document.getElementById("rs-overflow").checked = d.overflow;
    if (d.maxpertarget && document.getElementById("rs-maxpertarget")) document.getElementById("rs-maxpertarget").value = d.maxpertarget;

    // auto-save on any change
    $("#rs-wood, #rs-stone, #rs-iron, #rs-ta-origin, #rs-ta-target, #rs-reserve, #rs-minres, #rs-maxdist, #rs-overflow, #rs-maxpertarget").on("change input", rsSaveData);
}

// ── Hit counter (original) ────────────────────────────────────────────────────
function hitCountApi() {
    $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}/up`, res => {
        console.log(`This script has been run: ${res.count} times`);
    });
    if (game_data.device !== "desktop") {
        $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_phone/up`, () => {});
    }
    $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_id2${game_data.player.id}/up`, res => {
        if (res.count === 1) $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_scriptUsers/up`, () => {});
    });
}
