// made by Costache Madalin (lllll llll)
// discord: costache madalin#8472
// UI redesigned to embedded style (inspired by Shinko to Kuma)


var countApiKey = "res_sender";
var countNameSpace="madalinoTribalWarsScripts"
let url=window.location.href

var units=game_data.units;
var unitsLength=units.length;
if(units.includes("snob"))
    unitsLength--;
if(units.includes("militia"))
    unitsLength--;
if(units.includes("knight"))
    unitsLength--;

var headerWood="#001a33"
var headerWoodEven="#002e5a"
var headerStone="#3b3b00"
var headerStoneEven="#626200"
var headerIron="#1e003b"
var headerIronEven="#3c0076"

var defaultTheme= '[["theme1",["#E0E0E0","#000000","#C5979D","#2B193D","#2C365E","#484D6D","#4B8F8C","50"]],["currentTheme","theme1"],["theme2",["#E0E0E0","#000000","#F76F8E","#113537","#37505C","#445552","#294D4A","50"]],["theme3",["#E0E0E0","#000000","#ACFCD9","#190933","#665687","#7C77B9","#623B5A","50"]],["theme4",["#E0E0E0","#000000","#181F1C","#60712F","#274029","#315C2B","#214F4B","50"]],["theme5",["#E0E0E0","#000000","#9AD1D4","#007EA7","#003249","#1F5673","#1C448E","50"]],["theme6",["#E0E0E0","#000000","#EA8C55","#81171B","#540804","#710627","#9E1946","50"]],["theme7",["#E0E0E0","#000000","#754043","#37423D","#171614","#3A2618","#523A34","50"]],["theme8",["#E0E0E0","#000000","#9E0031","#8E0045","#44001A","#600047","#770058","50"]],["theme9",["#E0E0E0","#000000","#C1BDB3","#5F5B6B","#323031","#3D3B3C","#575366","50"]],["theme10",["#E0E0E0","#000000","#E6BCCD","#29274C","#012A36","#14453D","#7E52A0","50"]]]'
var localStorageThemeName = "resSenderTheme"
if(localStorage.getItem(localStorageThemeName)!=undefined){
    let mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)))
    Array.from(mapTheme.keys()).forEach((key)=>{
        if(key!="currentTheme"){   
            let listColors=mapTheme.get(key);
            if(listColors.length == 7){
                listColors.push(50);
                mapTheme.set(key,listColors)
            }
        }
    })
    localStorage.setItem(localStorageThemeName, JSON.stringify(Array.from(mapTheme.entries())))
}

var textColor="#ffffff"
var backgroundInput="#000000"
var borderColor = "#C5979D";
var backgroundContainer="#2B193D"
var backgroundHeader="#2C365E"
var backgroundMainTable="#484D6D"
var backgroundInnerTable="#4B8F8C"

if((typeof widthInterface === 'undefined'))
    var widthInterface=50;

var headerColorDarken=-50
var headerColorAlternateTable=-30;
var headerColorAlternateHover=30;

var backgroundAlternateTableEven=backgroundContainer;
var backgroundAlternateTableOdd=getColorDarker(backgroundContainer,headerColorAlternateTable);

// ===================== EMBEDDED CSS (Shinko style) =====================
var embeddedCSS = `
<style id="resSenderCSS">
#resSenderWrap * { box-sizing: border-box; }
#resSenderWrap {
    width: 100%;
    margin-bottom: 18px;
    font-family: Verdana, sans-serif;
    font-size: 13px;
}
#resSenderWrap .rs-header {
    background-color: #202225;
    color: #ffffdf;
    font-weight: bold;
    font-size: 15px;
    padding: 8px 14px;
    border-bottom: 2px solid #3e4147;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#resSenderWrap .rs-header span { font-size:12px; color:#aaa; font-weight:normal; }
#resSenderWrap .rs-section {
    background-color: #36393f;
    border: 1px solid #3e4147;
    margin-bottom: 6px;
    padding: 8px 10px;
}
#resSenderWrap .rs-row-a { background-color: #32353b; color: #e0e0e0; }
#resSenderWrap .rs-row-b { background-color: #36393f; color: #e0e0e0; }
#resSenderWrap .rs-th {
    background-color: #202225;
    color: #fff;
    font-weight: bold;
    padding: 5px 8px;
    text-align: center;
    border: 1px solid #3e4147;
}
#resSenderWrap .rs-td {
    padding: 4px 8px;
    border: 1px solid #3e4147;
    color: #e0e0e0;
    text-align: center;
}
#resSenderWrap table { border-collapse: collapse; width: 100%; }
#resSenderWrap input[type=number],
#resSenderWrap textarea,
#resSenderWrap select {
    background: #202225;
    color: #e0e0e0;
    border: 1px solid #555;
    border-radius: 3px;
    padding: 3px 6px;
}
#resSenderWrap input[type=button], #resSenderWrap .rs-btn {
    background: #4f545c;
    color: #fff;
    border: 1px solid #3e4147;
    border-radius: 3px;
    padding: 4px 12px;
    cursor: pointer;
    font-size: 12px;
}
#resSenderWrap input[type=button]:hover, #resSenderWrap .rs-btn:hover {
    background: #5865f2;
    border-color: #5865f2;
}
#resSenderWrap .btn-confirm-yes {
    background: #3a7d44;
    color:#fff;
    border:1px solid #2d6135;
    border-radius:3px;
    padding:4px 12px;
    cursor:pointer;
}
#resSenderWrap .btn-confirm-yes:hover { background:#2d6135; }
#resSenderWrap .tab-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    background: #202225;
    padding: 6px 10px 0 10px;
    border-bottom: 2px solid #3e4147;
    align-items: center;
}
#resSenderWrap .rs-tab {
    padding: 5px 14px;
    background: #36393f;
    color: #ccc;
    border: 1px solid #3e4147;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
}
#resSenderWrap .rs-tab.active {
    background: #2B193D;
    color: #fff;
    border-color: #C5979D;
}
#resSenderWrap .rs-tab img { width:13px; height:13px; }
#resSenderWrap .rs-tab-add {
    padding: 4px 10px;
    background: transparent;
    color: #aaa;
    cursor: pointer;
    border: 1px dashed #555;
    border-radius: 4px;
    font-size:18px;
    line-height:1;
}
#resSenderWrap .rs-panel { display:none; }
#resSenderWrap .rs-panel.active { display:block; }
#resSenderWrap .rs-coords-wrap {
    display: flex;
    gap: 16px;
    margin-top: 8px;
    flex-wrap: wrap;
}
#resSenderWrap .rs-coords-wrap > div { flex: 1; min-width: 180px; }
#resSenderWrap .rs-coords-wrap textarea { width:100%; }
#resSenderWrap .rs-label {
    color: #ffffdf;
    font-weight: bold;
    margin-bottom: 4px;
    display: block;
    font-size: 12px;
}
#resSenderWrap #table_view { overflow-x: auto; margin-top: 10px; }
#resSenderWrap .rs-settings-wrap { display:none; margin-top:6px; }
#resSenderWrap .rs-footer {
    background:#202225;
    color:#888;
    font-size:11px;
    text-align:right;
    padding:4px 10px;
    border-top:1px solid #3e4147;
}
#resSenderWrap .div_results { display:none; }
#resSenderWrap .hideMobile { }
@media (max-width: 600px) {
    #resSenderWrap .hideMobile { display:none; }
    #resSenderWrap .rs-coords-wrap { flex-direction: column; }
}
</style>
`;

var listGroups
async function main(){
    initializationTheme()
    await $.getScript("https://dl.dropboxusercontent.com/s/i5c0so9hwsizogm/styleCSSGlobal.js?dl=0");
    listGroups = await getGroups()
    await createMainInterface()
    createTableSettings()
    addNewPanel();
    addEventPanel();
    getCoordsEvent()
    initializationOwnTabs()
    insertCoordsFromGroups(0)
    insertCoordsFromGroups(1)
    hitCountApi()
}
main()

function getColorDarker(hexInput, percent) {
    let hex = hexInput;
    hex = hex.replace(/^\s*#|\s*$/g, "");
    if (hex.length === 3) { hex = hex.replace(/(.)/g, "$1$1"); }
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    const calculatedPercent = (100 + percent) / 100;
    r = Math.round(Math.min(255, Math.max(0, r * calculatedPercent)));
    g = Math.round(Math.min(255, Math.max(0, g * calculatedPercent)));
    b = Math.round(Math.min(255, Math.max(0, b * calculatedPercent)));
    return `#${("00"+r.toString(16)).slice(-2).toUpperCase()}${("00"+g.toString(16)).slice(-2).toUpperCase()}${("00"+b.toString(16)).slice(-2).toUpperCase()}`
}

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// ===================== MAIN INTERFACE (Embedded, Shinko style) =====================
async function createMainInterface(){
    let rows = (game_data.device == 'desktop') ? 8 : 3
    let widthSelect = (game_data.device == 'desktop') ? "100%" : "80%"

    // Inject CSS once
    if(!document.getElementById("resSenderCSS")){
        $("head").append(embeddedCSS);
    }

    let groupOptions = `<option value="none">none</option>`;
    for(let i=0;i<listGroups.length;i++){
        groupOptions += `<option value="${listGroups[i].href}">${listGroups[i].groupName}</option>`;
    }

    let html_info = `
    <div id="resSenderWrap">
        <div class="rs-header">
            <span style="color:#ffffdf;font-size:15px;font-weight:bold;">&#9654; Resources Sender</span>
            <span>made by Costache &nbsp;|&nbsp;
                <a href="#" onclick="$('#resSenderWrap').remove();return false;" style="color:#f04747;font-size:12px;">&#10006; Close</a>
                &nbsp;&nbsp;
                <a href="#" onclick="$('#rs-settings-btn').click();return false;" style="color:#aaa;font-size:12px;">&#9881; Settings</a>
            </span>
        </div>

        <div class="rs-section" style="padding:6px 10px;">
            <button class="rs-btn" id="rs-settings-btn" onclick="$('.rs-settings-wrap').toggle()">&#9881; Settings</button>
            <div class="rs-settings-wrap" id="div_settings"></div>
        </div>

        <div class="tab-row" id="rs-tab-row">
            <div class="rs-tab active" data-panel="rspanel1">
                <font class="rs-tab-label">panel1</font>
                <img class="rs-remove-tab" src="https://img.icons8.com/doodle/16/000000/delete-sign.png"/>
            </div>
            <div class="rs-tab-add" id="rs-add-tab" title="Add tab">+</div>
        </div>

        <div id="rs-all-panels">
            <div id="rspanel1" class="rs-panel active">
                <div class="rs-section">
                    <table style="width:auto;margin:0 auto;">
                        <tr>
                            <td colspan="3" style="text-align:center;padding-bottom:6px;">
                                <input class="btn-confirm-yes" type="button" onclick="calculateLaunches(event)" value="&#9654; Calculate">
                                <div class="div_results" style="display:inline;">
                                    <input class="btn-confirm-yes" type="button" value="Results">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:center;padding:4px 10px;">
                                <span class="icon header wood"></span><br>
                                <input type="number" class="input_wood" style="width:100px;text-align:center;" placeholder="140000" value="140000">
                            </td>
                            <td style="text-align:center;padding:4px 10px;">
                                <span class="icon header stone"></span><br>
                                <input type="number" class="input_stone" style="width:100px;text-align:center;" placeholder="150000" value="150000">
                            </td>
                            <td style="text-align:center;padding:4px 10px;">
                                <span class="icon header iron"></span><br>
                                <input type="number" class="input_iron" style="width:100px;text-align:center;" placeholder="125000" value="125000">
                            </td>
                        </tr>
                    </table>

                    <div class="rs-coords-wrap">
                        <div>
                            <span class="rs-label">&#128204; Origin coords:</span>
                            <textarea id="input_origin1" rows="${rows}" style="width:100%;">origin coords1</textarea>
                            <select class="select_origin_coord" onchange="insertCoordsFromGroups(0)" style="width:${widthSelect};margin-top:4px;">
                                ${groupOptions}
                            </select>
                            <p style="color:#aaa;font-size:11px;margin:2px 0 0 0;"></p>
                        </div>
                        <div>
                            <span class="rs-label">&#127919; Target coords:</span>
                            <textarea id="input_target1" rows="${rows}" style="width:100%;">target coords1</textarea>
                            <select class="select_target_coord" onchange="insertCoordsFromGroups(1)" style="width:${widthSelect};margin-top:4px;">
                                ${groupOptions}
                            </select>
                            <p style="color:#aaa;font-size:11px;margin:2px 0 0 0;"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="table_view" style="overflow-x:auto;"></div>

        <div class="rs-footer">made by Costache</div>
    </div>
    `;

    $("#resSenderWrap").remove();
    // Insert at TOP of page, embedded (not floating)
    $("#contentContainer").eq(0).prepend(html_info);
    $("#mobileContent").eq(0).prepend(html_info);
}

// ===================== SETTINGS TABLE =====================
function createTableSettings(){
    let html_table=`
    <table id="settings_table" style="width:100%;border-collapse:collapse;margin-top:6px;">
        <tr>
            <td class="rs-th">Setting</td>
            <td class="rs-th">Value</td>
        </tr>
        <tr class="rs-row-a">
            <td class="rs-td">Reserve merchants</td>
            <td class="rs-td"><input type="number" id="reserve_merchants" style="width:80px;" placeholder="0" value="0">
            <a href="#" onclick="UI.InfoMessage('how many merchants you want to keep home as reserve',3000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:13px;height:13px"/></a></td>
        </tr>
        <tr class="rs-row-b">
            <td class="rs-td">Min resources</td>
            <td class="rs-td"><input type="number" id="min_resources" style="width:80px;" placeholder="0" value="0">
            <a href="#" onclick="UI.InfoMessage('send resources if resources available are above min resources value',3000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:13px;height:13px"/></a></td>
        </tr>
        <tr class="rs-row-a">
            <td class="rs-td">Max distance (fields)</td>
            <td class="rs-td"><input type="number" id="max_distance" style="width:80px;" placeholder="500" value="500">
            <a href="#" onclick="UI.InfoMessage('send resources if travel distance is smaller than maximum distance value',3000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:13px;height:13px"/></a></td>
        </tr>
        <tr class="rs-row-b" id="tr_merchant_capacity" hidden>
            <td class="rs-td">Merchants capacity</td>
            <td class="rs-td"><input type="number" id="merchant_capacity" style="width:80px;" placeholder="1000" value="1000"></td>
        </tr>
        <tr class="rs-row-a">
            <td class="rs-td">Overflow protection</td>
            <td class="rs-td"><input type="checkbox" id="overflow_wh" checked>
            <a href="#" style="margin-left:8px" onclick="UI.InfoMessage('it will not send resources more than 95% from your warehouse capacity',3000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width:13px;height:13px"/></a></td>
        </tr>
    </table>`;

    if(document.getElementById("settings_table")==null){
        document.getElementById("div_settings").innerHTML = html_table;

        let twServers = ["pt_PT","de_DE"];
        if(twServers.includes(game_data.locale)){
            $("#tr_merchant_capacity").show();
        }

        let list_input = JSON.parse(localStorage.getItem(game_data.world+"res_sender_settings"));
        if(list_input!=null){
            let index=0;
            $('#div_settings input[type=number]').each(function(){
                this.value=list_input[index]; index++;
            });
            $('#div_settings input[type=checkbox]').each(function(){
                this.checked=list_input[index]; index++;
            });
        }

        $("#div_settings input[type=number], #div_settings input[type=checkbox]").off("click input change");
        $("#div_settings input[type=number], #div_settings input[type=checkbox]").on("click input change",()=>{
            let list_input=[];
            $('#div_settings input[type=number]').each(function(){ list_input.push(this.value); });
            $('#div_settings input[type=checkbox]').each(function(){ list_input.push(this.checked); });
            localStorage.setItem(game_data.world+"res_sender_settings", JSON.stringify(list_input));
        });
    }
}

// ===================== TABS =====================
function addEventPanel(){
    $('#rs-tab-row .rs-tab').off('click');
    $('#rs-tab-row .rs-tab').on('click', function(event){
        if(event.target.classList && event.target.classList.contains('rs-remove-tab')) return;
        let panelId = $(this).data('panel');
        if($(this).hasClass('active')){
            let value = window.prompt("Change tab name:");
            if(value && value.trim()!=""){
                $(this).find('.rs-tab-label').text(value);
                saveOwnData();
            }
            return;
        }
        $("#table_view, .div_results").hide();
        $('#rs-tab-row .rs-tab').removeClass('active');
        $(this).addClass('active');
        $('.rs-panel').removeClass('active').hide();
        $('#'+panelId).addClass('active').show();
        insertCoordsFromGroups(0);
        insertCoordsFromGroups(1);
    });
}

function addNewPanel(){
    let rows = (game_data.device == 'desktop') ? 8 : 3;
    let widthSelect = (game_data.device == 'desktop') ? "100%" : "80%";

    let groupOptions = `<option value="none">none</option>`;
    for(let i=0;i<listGroups.length;i++){
        groupOptions += `<option value="${listGroups[i].href}">${listGroups[i].groupName}</option>`;
    }

    $("#rs-add-tab").off("click").on("click", function(){
        let existingPanels = $('#rs-tab-row .rs-tab').length;
        let idNewPanel = existingPanels + 1;
        // make unique
        while(document.getElementById('rspanel'+idNewPanel)) idNewPanel++;

        let tabHtml = `<div class="rs-tab" data-panel="rspanel${idNewPanel}">
            <font class="rs-tab-label">panel${idNewPanel}</font>
            <img class="rs-remove-tab" src="https://img.icons8.com/doodle/16/000000/delete-sign.png" style="width:13px;cursor:pointer;"/>
        </div>`;
        $("#rs-add-tab").before(tabHtml);

        let panelHtml = `
        <div id="rspanel${idNewPanel}" class="rs-panel" style="display:none;">
            <div class="rs-section">
                <table style="width:auto;margin:0 auto;">
                <tr>
                    <td colspan="3" style="text-align:center;padding-bottom:6px;">
                        <input class="btn-confirm-yes" type="button" onclick="calculateLaunches(event)" value="&#9654; Calculate">
                        <div class="div_results" style="display:inline;">
                            <input class="btn-confirm-yes" type="button" value="Results">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center;padding:4px 10px;">
                        <span class="icon header wood"></span><br>
                        <input type="number" class="input_wood" style="width:100px;text-align:center;" placeholder="140000" value="140000">
                    </td>
                    <td style="text-align:center;padding:4px 10px;">
                        <span class="icon header stone"></span><br>
                        <input type="number" class="input_stone" style="width:100px;text-align:center;" placeholder="150000" value="150000">
                    </td>
                    <td style="text-align:center;padding:4px 10px;">
                        <span class="icon header iron"></span><br>
                        <input type="number" class="input_iron" style="width:100px;text-align:center;" placeholder="125000" value="125000">
                    </td>
                </tr>
                </table>
                <div class="rs-coords-wrap">
                    <div>
                        <span class="rs-label">&#128204; Origin coords:</span>
                        <textarea id="input_origin${idNewPanel}" rows="${rows}" style="width:100%;">origin coords${idNewPanel}</textarea>
                        <select class="select_origin_coord" onchange="insertCoordsFromGroups(0)" style="width:${widthSelect};margin-top:4px;">
                            ${groupOptions}
                        </select>
                        <p style="color:#aaa;font-size:11px;margin:2px 0 0 0;"></p>
                    </div>
                    <div>
                        <span class="rs-label">&#127919; Target coords:</span>
                        <textarea id="input_target${idNewPanel}" rows="${rows}" style="width:100%;">target coords${idNewPanel}</textarea>
                        <select class="select_target_coord" onchange="insertCoordsFromGroups(1)" style="width:${widthSelect};margin-top:4px;">
                            ${groupOptions}
                        </select>
                        <p style="color:#aaa;font-size:11px;margin:2px 0 0 0;"></p>
                    </div>
                </div>
            </div>
        </div>`;
        $("#rs-all-panels").append(panelHtml);

        // activate new tab
        $('#rs-tab-row .rs-tab').removeClass('active');
        $(`[data-panel="rspanel${idNewPanel}"]`).addClass('active');
        $('.rs-panel').removeClass('active').hide();
        $(`#rspanel${idNewPanel}`).addClass('active').show();

        addEventPanel();
        removePanel();
        getCoordsEvent();
        saveOwnData();
    });
}

function removePanel(){
    $('.rs-remove-tab').off('click');
    $('.rs-remove-tab').on('click', function(){
        let tabCount = $('#rs-tab-row .rs-tab').length;
        if(tabCount <= 1) return;
        if(!window.confirm("Are you sure?")) return;
        let panelId = $(this).closest('.rs-tab').data('panel');
        $(this).closest('.rs-tab').remove();
        $('#'+panelId).remove();
        // activate last tab
        let lastTab = $('#rs-tab-row .rs-tab').last();
        if(lastTab.length && !$('#rs-tab-row .rs-tab.active').length){
            lastTab.addClass('active');
            let pid = lastTab.data('panel');
            $('#'+pid).addClass('active').show();
        }
        saveOwnData();
    });
}

function saveOwnData(){
    let list_name_tabs = Array.from($('#rs-tab-row .rs-tab')).map(e=>$(e).find('.rs-tab-label').text().trim());
    localStorage.setItem(game_data.world+"res_sender_tabs_name", JSON.stringify(list_name_tabs));

    let list_input = [];
    $('#rs-all-panels input[type=number], #rs-all-panels textarea, #rs-all-panels select').each(function(){
        list_input.push(this.value);
    });
    localStorage.setItem(game_data.world+"res_sender_tabs2", JSON.stringify(list_input));

    $('#rs-all-panels input[type=number], #rs-all-panels textarea, #rs-all-panels select').off("click input change");
    $('#rs-all-panels input[type=number], #rs-all-panels textarea, #rs-all-panels select').on("click input change", ()=>{
        let list_input=[];
        $('#rs-all-panels input[type=number], #rs-all-panels textarea, #rs-all-panels select').each(function(){
            list_input.push(this.value);
        });
        localStorage.setItem(game_data.world+"res_sender_tabs2", JSON.stringify(list_input));
        let list_name_tabs = Array.from($('#rs-tab-row .rs-tab')).map(e=>$(e).find('.rs-tab-label').text().trim());
        localStorage.setItem(game_data.world+"res_sender_tabs_name", JSON.stringify(list_name_tabs));
    });
}

function getCoordsEvent(){
    $("textarea").off("mouseout");
    $("textarea").mouseout(function(){
        let current_value = this.value;
        if(current_value.match(/[0-9]{3}\|[0-9]{3}/)!=null){
            let coords = current_value.match(/[0-9]{3}\|[0-9]{3}/g);
            let set = new Set(coords);
            coords = [...set];
            this.value = Array.from(coords).join(" ");
            let paragraph = $(this).parent().find("p").last();
            let text = paragraph.text().replace(/\d+/g,"");
            paragraph.text(text+coords.length);
        }
        saveOwnData();
    });
}

function initializationOwnTabs(){
    if(localStorage.getItem(game_data.world+"res_sender_tabs2")!=null){
        let list_input = JSON.parse(localStorage.getItem(game_data.world+"res_sender_tabs2"));
        let list_name_tabs = JSON.parse(localStorage.getItem(game_data.world+"res_sender_tabs_name"));
        if(list_name_tabs!=undefined){
            for(let i=0;i<list_name_tabs.length-1;i++){
                document.getElementById("rs-add-tab").click();
            }
            let index=0;
            $('#rs-all-panels input[type=number], #rs-all-panels textarea, #rs-all-panels select').each(function(){
                this.value = list_input[index]; index++;
            });
            Array.from($('#rs-tab-row .rs-tab')).forEach((elem,index)=>{
                $(elem).find('.rs-tab-label').text(list_name_tabs[index]);
            });
        }
        saveOwnData();
    }
}

function initializationTheme(){
    if(localStorage.getItem(localStorageThemeName) != undefined){
        let mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)));
        let currentTheme = mapTheme.get("currentTheme");
        let colours = mapTheme.get(currentTheme);
        textColor=colours[0]; backgroundInput=colours[1]; borderColor=colours[2];
        backgroundContainer=colours[3]; backgroundHeader=colours[4];
        backgroundMainTable=colours[5]; backgroundInnerTable=colours[6];
        widthInterface=colours[7];
        if(game_data.device != "desktop") widthInterface=98;
        backgroundAlternateTableEven=backgroundContainer;
        backgroundAlternateTableOdd=getColorDarker(backgroundContainer,headerColorAlternateTable);
    } else {
        localStorage.setItem(localStorageThemeName, defaultTheme);
        let mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)));
        let currentTheme = mapTheme.get("currentTheme");
        let colours = mapTheme.get(currentTheme);
        textColor=colours[0]; backgroundInput=colours[1]; borderColor=colours[2];
        backgroundContainer=colours[3]; backgroundHeader=colours[4];
        backgroundMainTable=colours[5]; backgroundInnerTable=colours[6];
        widthInterface=colours[7];
        if(game_data.device != "desktop") widthInterface=98;
        backgroundAlternateTableEven=backgroundContainer;
        backgroundAlternateTableOdd=getColorDarker(backgroundContainer,headerColorAlternateTable);
    }
}

// ===================== CALCULATE (unchanged logic) =====================
async function calculateLaunches(event){
    let reserve_merchants=parseInt(document.getElementById("reserve_merchants").value)
    let min_resources=parseInt(document.getElementById("min_resources").value)
    let max_distance=parseInt(document.getElementById("max_distance").value)
    let merchant_capacity=parseInt(document.getElementById("merchant_capacity").value)
    let overflow_protection=document.getElementById("overflow_wh").checked

    let map_production = await getDataProduction().catch(err=>alert(err))
    let map_villageInfo= await getInfoVIllages().catch(err=>alert(err))
    let map_incoming = await getDataIncoming().catch(err=>alert(err))
    let map_production_home=new Map()
    Array.from(map_production.keys()).forEach(key=>{
        let obj=JSON.parse(JSON.stringify(map_production.get(key)))
        map_production_home.set(key,obj)
    })

    reserve_merchants=(Number.isNaN(reserve_merchants)==true || reserve_merchants<0)?0:reserve_merchants
    min_resources=(Number.isNaN(min_resources)==true || min_resources<0)?0:min_resources
    max_distance=(Number.isNaN(max_distance)==true || max_distance<0)?0:max_distance
    merchant_capacity=(Number.isNaN(merchant_capacity)==true)?1000:(merchant_capacity<1000)?1000:(merchant_capacity>1500)?1500:merchant_capacity

    let wood_send=parseInt($(event.target).closest("div").find(".input_wood").val())
    let stone_send=parseInt($(event.target).closest("div").find(".input_stone").val())
    let iron_send=parseInt($(event.target).closest("div").find(".input_iron").val())
    let origin_coord=$(event.target).closest("div").find("textarea").eq(0).val().match(/[0-9]{3}\|[0-9]{3}/g)
    let target_coord=$(event.target).closest("div").find("textarea").eq(1).val().match(/[0-9]{3}\|[0-9]{3}/g)

    origin_coord = origin_coord.filter(e=>!target_coord.includes(e))

    Array.from(map_production.keys()).forEach(key=>{
        let object = map_production.get(key)
        if(map_incoming.has(key)){
            object.wood = object.wood + map_incoming.get(key).wood
            object.stone = object.stone + map_incoming.get(key).stone
            object.iron = object.iron + map_incoming.get(key).iron
            map_production.set(key,object)
        }
    })

    let list_launches=[]
    if(origin_coord!=null && target_coord!=null){
        let set=new Set(origin_coord); origin_coord=[...set];
        set=new Set(target_coord); target_coord=[...set];

        let list_res_send=[],list_res_get=[]
        let wood_total=0,stone_total=0,iron_total=0
        for(let i=0;i<origin_coord.length;i++){
            let obj=map_production_home.get(origin_coord[i])
            if(obj==undefined){ UI.ErrorMessage("origin coords are not found in the current group",2000); throw new Error("origin coord doesn't exist in the current group") }
            obj.merchants-=reserve_merchants
            let capacitiy_available=obj.merchants*merchant_capacity
            let wood_available=(obj.wood>min_resources)?Math.min(obj.wood-min_resources,wood_send):0
            let stone_available=(obj.stone>min_resources)?Math.min(obj.stone-min_resources,stone_send):0
            let iron_available=(obj.iron>min_resources)?Math.min(obj.iron-min_resources,iron_send):0
            let factor_available_wood=wood_available/wood_send
            let factor_available_stone=stone_available/stone_send
            let factor_available_iron=iron_available/iron_send
            let min_factor_available=Math.min(factor_available_wood,factor_available_stone,factor_available_iron)
            if(min_factor_available<1){
                if(min_factor_available==factor_available_wood){ stone_available=Math.round(Math.max(stone_send,stone_available)*min_factor_available); iron_available=Math.round(Math.max(iron_send,iron_available)*min_factor_available); }
                if(min_factor_available==factor_available_stone){ wood_available=Math.round(Math.max(wood_send,wood_available)*min_factor_available); iron_available=Math.round(Math.max(iron_send,iron_available)*min_factor_available); }
                if(min_factor_available==factor_available_iron){ wood_available=Math.round(Math.max(wood_send,wood_available)*min_factor_available); stone_available=Math.round(Math.max(stone_send,stone_available)*min_factor_available); }
            }
            let total_res=wood_available+stone_available+iron_available
            let factor_capacity=(total_res>capacitiy_available)?capacitiy_available/total_res:1
            wood_available=Math.round(wood_available*factor_capacity)
            stone_available=Math.round(stone_available*factor_capacity)
            iron_available=Math.round(iron_available*factor_capacity)
            list_res_send.push({ coord_origin:obj.coord, id_origin:obj.id, wood:wood_available, stone:stone_available, iron:iron_available })
            wood_total+=wood_available; stone_total+=stone_available; iron_total+=iron_available;
        }

        let mapTargets=new Map()
        let maxResource=Math.max(wood_total,stone_total,iron_total)
        let sortedResources=[{value:wood_total,type:"wood"},{value:stone_total,type:"stone"},{value:iron_total,type:"iron"}].sort((o1,o2)=>(o1.value>o2.value)?1:(o1.value<o2.value)?-1:0)
        let factorResources={}
        factorResources[sortedResources[0].type]=sortedResources[0].value/sortedResources[2].value
        factorResources[sortedResources[1].type]=sortedResources[1].value/sortedResources[2].value
        factorResources[sortedResources[2].type]=1
        let minRes=1000
        let minResWood=Math.round(minRes*factorResources["wood"])
        let minResStone=Math.round(minRes*factorResources["stone"])
        let minResIron=Math.round(minRes*factorResources["iron"])
        let safetyBreak=Math.round(maxResource/minRes)+1
        let indexSafetyBreak=0

        while(wood_total>minResWood||stone_total>minResStone||iron_total>minResIron){
            let breakLoop=true
            for(let i=0;i<target_coord.length;i++){
                if(mapTargets.has(target_coord[i])){
                    let obj=mapTargets.get(target_coord[i])
                    let final_wood=obj.wood+minResWood
                    let final_stone=obj.stone+minResStone
                    let final_iron=obj.iron+minResIron
                    if(overflow_protection==true&&map_production.has(target_coord[i])){
                        let whCapacity=map_production.get(target_coord[i]).capacity*0.95
                        let existentWood=map_production.get(target_coord[i]).wood
                        let existentStone=map_production.get(target_coord[i]).stone
                        let existentIron=map_production.get(target_coord[i]).iron
                        final_wood=(final_wood+existentWood<whCapacity)?final_wood:Math.max((whCapacity-existentWood),0)
                        final_stone=(final_stone+existentStone<whCapacity)?final_stone:Math.max((whCapacity-existentStone),0)
                        final_iron=(final_iron+existentIron<whCapacity)?final_iron:Math.max((whCapacity-existentIron),0)
                        final_wood=Math.round(final_wood); final_stone=Math.round(final_stone); final_iron=Math.round(final_iron)
                    }
                    if(final_wood>obj.wood&&wood_total>minResWood){ wood_total-=1000; breakLoop=false; }
                    if(final_stone>obj.stone&&stone_total>minResStone){ stone_total-=1000; breakLoop=false; }
                    if(final_iron>obj.iron&&iron_total>minResIron){ iron_total-=1000; breakLoop=false; }
                    mapTargets.set(target_coord[i],{ coord_target:target_coord[i], id_target:map_villageInfo.get(target_coord[i]), wood:final_wood, stone:final_stone, iron:final_iron })
                } else {
                    mapTargets.set(target_coord[i],{ coord_target:target_coord[i], id_target:map_villageInfo.get(target_coord[i]), wood:0, stone:0, iron:0 })
                    breakLoop=false
                }
            }
            if(breakLoop==true) break;
            indexSafetyBreak++
            if(indexSafetyBreak>safetyBreak) break;
        }

        list_res_get=[...mapTargets.values()]

        for(let i=0;i<list_res_get.length;i++){
            let id_target=list_res_get[i].id_target
            let coord_target=list_res_get[i].coord_target
            for(let j=0;j<list_res_send.length;j++){
                let distance=calcDistance(list_res_get[i].coord_target,list_res_send[j].coord_origin)
                list_res_send[j].distance=distance
            }
            list_res_send.sort((o1,o2)=>(o1.distance>o2.distance)?1:(o1.distance<o2.distance)?-1:0)
            let obj_launch={wood:0,stone:0,iron:0}
            for(let j=0;j<list_res_send.length;j++){
                if(list_res_send[j].distance<=max_distance&&list_res_get[i].coord_target!=list_res_send[j].coord_origin){
                    let coord_origin=list_res_send[j].coord_origin
                    let id_origin=list_res_send[j].id_origin
                    let send_wood=(list_res_send[j].wood>0)?Math.min(list_res_get[i].wood,list_res_send[j].wood):0
                    let send_stone=(list_res_send[j].stone>0)?Math.min(list_res_get[i].stone,list_res_send[j].stone):0
                    let send_iron=(list_res_send[j].iron>0)?Math.min(list_res_get[i].iron,list_res_send[j].iron):0
                    obj_launch.wood+=send_wood; obj_launch.stone+=send_stone; obj_launch.iron+=send_iron
                    list_res_get[i].wood-=send_wood; list_res_get[i].stone-=send_stone; list_res_get[i].iron-=send_iron
                    list_res_send[j].wood-=send_wood; list_res_send[j].stone-=send_stone; list_res_send[j].iron-=send_iron
                    let total_send=send_wood+send_stone+send_iron
                    let restDivision=total_send%merchant_capacity
                    let minim_resources=(merchant_capacity==1000)?700:1200
                    if(restDivision<minim_resources){
                        if(send_wood>restDivision){ send_wood-=restDivision; total_send-=restDivision; }
                        else if(send_stone>restDivision){ send_stone-=restDivision; total_send-=restDivision; }
                        else if(send_iron>restDivision){ send_iron-=restDivision; total_send-=restDivision; }
                    }
                    let own_village=false
                    if(map_production.has(coord_target)) own_village=true
                    if(total_send>=minim_resources)
                        list_launches.push({ total_send:total_send, wood:send_wood, stone:send_stone, iron:send_iron, coord_target:coord_target, coord_origin:coord_origin, id_origin:id_origin, id_target:id_target, distance:list_res_send[j].distance, own_village:own_village })
                    let total_get=list_res_get[i].wood+list_res_get[i].stone+list_res_get[i].iron
                    if(total_get<minim_resources) break;
                }
            }
        }

        let map_launches_mass=new Map()
        for(let i=0;i<list_launches.length;i++){
            let target_id=list_launches[i].id_target
            let origin_id=list_launches[i].id_origin
            let woodKey=`resource[${origin_id}][wood]`
            let stoneKey=`resource[${origin_id}][stone]`
            let ironKey=`resource[${origin_id}][iron]`
            let send_resources={}
            if(map_production.has(list_launches[i].coord_target)){
                if(map_launches_mass.has(target_id)){
                    let obj_update=map_launches_mass.get(target_id)
                    obj_update.send_resources[woodKey]=list_launches[i].wood
                    obj_update.send_resources[stoneKey]=list_launches[i].stone
                    obj_update.send_resources[ironKey]=list_launches[i].iron
                    obj_update.total_send+=list_launches[i].total_send
                    obj_update.total_wood+=list_launches[i].wood
                    obj_update.total_stone+=list_launches[i].stone
                    obj_update.total_iron+=list_launches[i].iron
                    obj_update.distance=Math.max(obj_update.distance,list_launches[i].distance)
                    map_launches_mass.set(target_id,obj_update)
                } else {
                    send_resources[woodKey]=list_launches[i].wood
                    send_resources[stoneKey]=list_launches[i].stone
                    send_resources[ironKey]=list_launches[i].iron
                    map_launches_mass.set(target_id,{ target_id:target_id, coord_target:list_launches[i].coord_target, send_resources:send_resources, total_send:list_launches[i].total_send, total_wood:list_launches[i].wood, total_stone:list_launches[i].stone, total_iron:list_launches[i].iron, distance:list_launches[i].distance })
                }
            }
        }
        createTable(list_launches,map_launches_mass)
    }
}

function getDataProduction(){
    return new Promise((resolve,reject)=>{
        let link_combined_production=game_data.link_base_pure+"overview_villages&mode=prod&mode=prod&group=0"
        let datePage=httpGet(link_combined_production)
        const parser=new DOMParser()
        const htmlDoc=parser.parseFromString(datePage,'text/html')
        let list_pages=[]
        if($(htmlDoc).find(".paged-nav-item").parent().find("select").length>0){
            Array.from($(htmlDoc).find(".paged-nav-item").parent().find("select").find("option")).forEach(function(item){ list_pages.push(item.value) })
            list_pages.pop()
        } else if(htmlDoc.getElementsByClassName("paged-nav-item").length>0){
            let nr=0
            Array.from(htmlDoc.getElementsByClassName("paged-nav-item")).forEach(function(item){ let current=item.href; current=current.split("page=")[0]+"page="+nr; nr++; list_pages.push(current) })
        } else { list_pages.push(link_combined_production) }
        list_pages=list_pages.reverse()
        let map_production=new Map()
        function ajaxRequest(urls){
            let current_url
            if(urls.length>0) current_url=urls.pop()
            else current_url="stop"
            let start_ajax=new Date().getTime()
            if(urls.length>=0&&current_url!="stop"){
                $.ajax({ url:current_url, method:'get',
                    success:(data)=>{
                        const parser=new DOMParser()
                        const htmlDoc=parser.parseFromString(data,'text/html')
                        if(game_data.device=="desktop"){
                            let table_production=Array.from($(htmlDoc).find(".row_a, .row_b"))
                            for(let i=0;i<table_production.length;i++){
                                let name=table_production[i].getElementsByClassName("quickedit-vn")[0].innerText.trim()
                                let coord=table_production[i].getElementsByClassName("quickedit-vn")[0].innerText.match(/[0-9]{3}\|[0-9]{3}/)[0]
                                let id=table_production[i].getElementsByClassName("quickedit-vn")[0].getAttribute("data-id")
                                let wood=parseInt(table_production[i].getElementsByClassName("wood")[0].innerText.replace(".",""))
                                let stone=parseInt(table_production[i].getElementsByClassName("stone")[0].innerText.replace(".",""))
                                let iron=parseInt(table_production[i].getElementsByClassName("iron")[0].innerText.replace(".",""))
                                let merchants=parseInt(table_production[i].querySelector("a[href*='market']").innerText.split("/")[0])
                                let merchants_total=parseInt(table_production[i].querySelector("a[href*='market']").innerText.split("/")[1])
                                let capacity=parseInt(table_production[i].children[4].innerText)
                                let points=parseInt(table_production[i].children[2].innerText.replace(".",""))
                                map_production.set(coord,{ coord,id,wood,stone,iron,name,merchants,merchants_total,capacity,points })
                            }
                        } else {
                            let table_production=Array.from($(htmlDoc).find(".overview-container").find(".overview-container-item"))
                            for(let i=0;i<table_production.length;i++){
                                let name=$(table_production[i]).find(".quickedit-label").text().trim()
                                let coord=name.match(/\d+\|\d+/)[0]
                                let id=$(table_production[i]).find(".quickedit-vn").attr("data-id")
                                let wood=parseInt(table_production[i].getElementsByClassName("mwood")[0].innerText.replace(".",""))
                                let stone=parseInt(table_production[i].getElementsByClassName("mstone")[0].innerText.replace(".",""))
                                let iron=parseInt(table_production[i].getElementsByClassName("miron")[0].innerText.replace(".",""))
                                let merchants=parseInt($(table_production[i]).find(".vertical_center").text().trim())
                                let merchants_total=500
                                let capacity=parseInt(table_production[i].getElementsByClassName("ressources")[0].parentElement.innerText)
                                let points=parseInt($(table_production[i]).find(".grey").parent().text().replace(".",""))
                                map_production.set(coord,{ coord,id,wood,stone,iron,name,merchants,merchants_total,capacity,points })
                            }
                        }
                        let stop_ajax=new Date().getTime()
                        let diff=stop_ajax-start_ajax
                        window.setTimeout(function(){ ajaxRequest(list_pages); UI.SuccessMessage("get production page: "+urls.length) },200-diff)
                    },
                    error:(err)=>{ reject(err) }
                })
            } else { UI.SuccessMessage("done"); resolve(map_production) }
        }
        ajaxRequest(list_pages)
    })
}

function calcDistance(coord1,coord2){
    let x1=parseInt(coord1.split("|")[0]); let y1=parseInt(coord1.split("|")[1])
    let x2=parseInt(coord2.split("|")[0]); let y2=parseInt(coord2.split("|")[1])
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))
}

function getInfoVIllages(){
    return new Promise((resolve,reject)=>{
        var mapVillage=new Map()
        let obj={}
        let server_date=document.getElementById("serverDate").innerText.split("/")
        let server_time=document.getElementById("serverTime").innerText
        let current_date=new Date(server_date[1]+"/"+server_date[0]+"/"+server_date[2]+" "+server_time)
        let url=window.location.href.split("/game.php")[0]
        if(localStorage.getItem(game_data.world+"inno_coords")==null){
            let dataVillage=httpGet(url+"/map/village.txt").split(/\r?\n/)
            for(let i=0;i<dataVillage.length;i++){
                let coord=dataVillage[i].split(",")[2]+"|"+dataVillage[i].split(",")[3]
                let id=dataVillage[i].split(",")[0]
                mapVillage.set(coord,id)
            }
            obj.datetime=current_date; obj.data=Array.from(mapVillage.entries())
            var data=lzw_encode(JSON.stringify(obj))
            localStorage.setItem(game_data.world+"inno_coords",data)
        } else {
            let inno_db=JSON.parse(lzw_decode(localStorage.getItem(game_data.world+"inno_coords")))
            let db_date=inno_db.datetime
            mapVillage=new Map(inno_db.data)
            if(new Date(current_date).getTime()-new Date(db_date)>3600*1000){
                let dataVillage=httpGet(url+"/map/village.txt").split(/\r?\n/)
                for(let i=0;i<dataVillage.length;i++){
                    let coord=dataVillage[i].split(",")[2]+"|"+dataVillage[i].split(",")[3]
                    let id=dataVillage[i].split(",")[0]
                    mapVillage.set(coord,id)
                }
                obj.datetime=current_date; obj.data=Array.from(mapVillage.entries())
                var data=lzw_encode(JSON.stringify(obj))
                localStorage.setItem(game_data.world+"inno_coords",data)
            }
        }
        resolve(mapVillage)
    })
}

function lzw_encode(s){
    if(!s)return s
    var dict=new Map(),data=(s+"").split(""),out=[],currChar,phrase=data[0],code=256
    for(var i=1;i<data.length;i++){
        currChar=data[i]
        if(dict.has(phrase+currChar)){ phrase+=currChar }
        else{ out.push(phrase.length>1?dict.get(phrase):phrase.codePointAt(0)); dict.set(phrase+currChar,code); code++; if(code===0xd800){code=0xe000} phrase=currChar }
    }
    out.push(phrase.length>1?dict.get(phrase):phrase.codePointAt(0))
    for(var i=0;i<out.length;i++){ out[i]=String.fromCodePoint(out[i]) }
    return out.join("")
}

function lzw_decode(s){
    var dict=new Map(),data=Array.from(s+""),currChar=data[0],oldPhrase=currChar,out=[currChar],code=256,phrase
    for(var i=1;i<data.length;i++){
        var currCode=data[i].codePointAt(0)
        if(currCode<256){ phrase=data[i] }
        else{ phrase=dict.has(currCode)?dict.get(currCode):(oldPhrase+currChar) }
        out.push(phrase)
        var cp=phrase.codePointAt(0)
        currChar=String.fromCodePoint(cp)
        dict.set(code,oldPhrase+currChar)
        code++
        if(code===0xd800){code=0xe000}
        oldPhrase=phrase
    }
    return out.join("")
}

// ===================== CREATE TABLE (Shinko style rows) =====================
async function createTable(list_launches,map_launches_mass){
    let html_prod_table=`
    <table style="width:100%;border-collapse:collapse;">
        <tr>
            <td class="rs-th">#</td>
            <td class="rs-th">Target</td>
            <td class="rs-th">Distance</td>
            <td class="rs-th">Total</td>
            <td class="rs-th hideMobile"><span class="icon header wood"></span></td>
            <td class="rs-th hideMobile"><span class="icon header stone"></span></td>
            <td class="rs-th hideMobile"><span class="icon header iron"></span></td>
            <td class="rs-th">Send</td>
        </tr>`

    let counter=0
    let map_total_send=new Map()

    for(let i=0;i<list_launches.length;i++){
        let target_id,origin_id,coord_target,wood,stone,iron,id_origin,data,distance,total_send
        let hasInfo=true
        let rowClass = (counter%2==0)?"rs-row-a":"rs-row-b"

        if(list_launches[i].own_village==false){
            target_id=list_launches[i].id_target; origin_id=list_launches[i].id_origin
            coord_target=list_launches[i].coord_target; wood=list_launches[i].wood
            stone=list_launches[i].stone; iron=list_launches[i].iron
            id_origin=list_launches[i].id_origin; distance=list_launches[i].distance
            total_send=list_launches[i].total_send
        } else {
            let obj=map_launches_mass.get(list_launches[i].id_target)
            if(obj==undefined) hasInfo=false
            else {
                target_id=obj.target_id; coord_target=obj.coord_target
                wood=obj.total_wood; stone=obj.total_stone; iron=obj.total_iron
                data=JSON.stringify(obj.send_resources); distance=obj.distance
                total_send=obj.total_send
                map_launches_mass.delete(list_launches[i].id_target)
            }
        }

        if(hasInfo==true){
            counter++
            html_prod_table+=`
            <tr class="${rowClass}" id="delete_row">
                <td class="rs-td">${counter}</td>
                <td class="rs-td"><a href="${game_data.link_base_pure}info_village&id=${target_id}" style="color:#40D0E0;">${coord_target}</a></td>
                <td class="rs-td">${distance.toFixed(1)}</td>
                <td class="rs-td">${formatNumber(total_send)}</td>
                <td class="rs-td hideMobile">${formatNumber(wood)}</td>
                <td class="rs-td hideMobile">${formatNumber(stone)}</td>
                <td class="rs-td hideMobile">${formatNumber(iron)}</td>`

            if(list_launches[i].own_village==false){
                html_prod_table+=`<td class="rs-td"><input class="btn-confirm-yes btn_send" target_id="${target_id}" origin_id="${origin_id}" wood="${wood}" stone="${stone}" iron="${iron}" type="button" value="Send"></td></tr>`
            } else {
                html_prod_table+=`<td class="rs-td"><input class="btn-confirm-yes btn_send" target_id="${target_id}" data='${data}' type="button" value="Send"></td></tr>`
            }
        }

        if(map_total_send.has(target_id)){
            let obj_update=map_total_send.get(target_id)
            obj_update.wood+=wood; obj_update.stone+=stone; obj_update.iron+=iron
            obj_update.total+=wood+stone+iron
            map_total_send.set(target_id,obj_update)
        } else {
            if(target_id!=undefined){
                map_total_send.set(target_id,{ coord_target:coord_target, wood:wood, stone:stone, iron:iron, total:wood+stone+iron, coord:coord_target })
            }
        }
    }
    html_prod_table+=`</table>`
    document.getElementById("table_view").innerHTML=html_prod_table
    $("#table_view").show()

    if(game_data.device!="desktop") $(".hideMobile").hide()

    // Results popup
    let html_end_result=`<center><div id="table_results" style="height:800px;width:600px;overflow:auto">
    <table style="width:100%;border-collapse:collapse;">
    <tr>
        <td class="rs-th">#</td><td class="rs-th">Coord</td><td class="rs-th">Total</td>
        <td class="rs-th"><span class="icon header wood"></span></td>
        <td class="rs-th"><span class="icon header stone"></span></td>
        <td class="rs-th"><span class="icon header iron"></span></td>
    </tr>`
    Array.from(map_total_send.keys()).forEach((key,index)=>{
        let obj=map_total_send.get(key)
        let rc=(index%2==0)?"rs-row-a":"rs-row-b"
        html_end_result+=`<tr class="${rc}"><td class="rs-td">${index+1}</td><td class="rs-td">${obj.coord}</td><td class="rs-td">${formatNumber(obj.total)}</td><td class="rs-td">${formatNumber(obj.wood)}</td><td class="rs-td">${formatNumber(obj.stone)}</td><td class="rs-td">${formatNumber(obj.iron)}</td></tr>`
    })
    html_end_result+=`</table></div></center>`

    $(".active div input[type=button]:not(.btn_send)").off('click')
    $(".active div input[type=button]:not(.btn_send)").on('click',()=>{ Dialog.show("content",html_end_result) })
    $(".active .div_results").show()

    $(".btn_send").on("click",async(event)=>{
        if($(event.target).is(":disabled")==false){
            let target_id=$(event.target).attr("target_id")
            let origin_id=$(event.target).attr("origin_id")
            let wood=$(event.target).attr("wood")
            let stone=$(event.target).attr("stone")
            let iron=$(event.target).attr("iron")
            $(".btn_send").attr("disabled",true)
            let start=new Date().getTime()
            if(origin_id!=undefined){ sendResources(target_id,origin_id,wood,stone,iron) }
            else { let data=JSON.parse($(event.target).attr("data")); massSendResources(target_id,data) }
            let stop=new Date().getTime()
            let diff_time=stop-start
            window.setTimeout(()=>{ $(event.target).closest("#delete_row").remove(); $(".btn_send").attr("disabled",false) },200-diff_time)
        }
    })

    window.onkeydown=function(e){
        if(e.which==13){
            if(document.getElementsByClassName("btn_send").length>0) document.getElementsByClassName("btn_send")[0].click()
        }
    }
}

function formatNumber(number){ return new Intl.NumberFormat().format(number) }

function massSendResources(target_id,data){
    let options={ "village":target_id, "ajaxaction":"call", "h":window.csrf_token }
    TribalWars.post("market",options,data,function(response){ UI.SuccessMessage(response.success,1000) },function(error){ console.log(error) })
}

function sendResources(target_id,origin_id,wood,stone,iron){
    var form={ "target_id":target_id, "wood":wood, "stone":stone, "iron":iron }
    TribalWars.post("market",{ "ajaxaction":"map_send", "village":origin_id },form,function(data){ UI.SuccessMessage(data.message,1000) },false)
}

function hitCountApi(){
    $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}/up`,response=>{ console.log(`This script has been run: ${response.count} times`) })
    if(game_data.device!="desktop"){ $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_phone/up`,response=>{ console.log(`This script has been run on mobile: ${response.count} times`) }) }
    $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_id2${game_data.player.id}/up`,response=>{ if(response.count==1){ $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_scriptUsers/up`,response=>{}) } })
    try { $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_scriptUsers`,response=>{ console.log(`Total number of users: ${response.count}`) }) } catch(error){}
}

function getGroups(){
    return new Promise((resolve,reject)=>{
        let urlSnobPage=game_data.link_base_pure+"overview_villages&mode=groups&type=static&group=0"
        let dataPage=httpGet(urlSnobPage)
        const parser=new DOMParser()
        const htmlDoc=parser.parseFromString(dataPage,'text/html')
        let listGroups=[]
        if(game_data.device=="desktop"){
            listGroups=Array.from($(htmlDoc).find(".group-menu-item")).map(e=>({ href:game_data.link_base_pure+`overview_villages&mode=combined&group=${e.getAttribute("data-group-id")}&page=-1`, groupName:e.innerText.trim().replace("[","").replace("]","").replace("<","").replace(">","") }))
        } else {
            listGroups=Array.from($(htmlDoc).find(".vis_item").find("select").find("option")).map(e=>({ href:`${e.value}&page=-1`, groupName:e.innerText.trim().replace("[","").replace("]","").replace("<","").replace(">","") }))
        }
        resolve(listGroups)
    })
}

function getGroupCoords(url){
    return new Promise((resolve,reject)=>{
        let dataPage=httpGet(url)
        const parser=new DOMParser()
        const htmlDoc=parser.parseFromString(dataPage,'text/html')
        let listCoords=[]
        if(game_data.device=="desktop")
            listCoords=Array.from($(htmlDoc).find(".row_a, .row_b")).map(e=>e.children[1].innerText.match(/\d+\|\d+/)[0])
        else
            listCoords=Array.from($(htmlDoc).find(".quickedit-vn")).map(e=>e.innerText.match(/\d+\|\d+/)[0])
        resolve(listCoords.join(" "))
    })
}

async function insertCoordsFromGroups(index){
    let activePanel = "#"+$('.rs-panel.active').attr('id')
    let hrefs=Array.from($(activePanel).find("select")).map(e=>e.value)
    let inputCoords=Array.from($(activePanel).find("textarea"))
    let paragraphCoords=Array.from($(activePanel).find("p"))
    if(hrefs[index]!="none"&&index==0){ let coords=await getGroupCoords(hrefs[index]); inputCoords[index].value=coords; paragraphCoords[index].innerText="Origin: "+coords.split(" ").length+" villages" }
    if(hrefs[index]!="none"&&index==1){ let coords=await getGroupCoords(hrefs[index]); inputCoords[index].value=coords; paragraphCoords[index].innerText="Target: "+coords.split(" ").length+" villages" }
}

function getDataIncoming(){
    return new Promise((resolve,reject)=>{
        let link_combined_production=game_data.link_base_pure+"overview_villages&mode=trader&type=inc"
        let dataPage=httpGet(link_combined_production)
        const parser=new DOMParser()
        const htmlDoc=parser.parseFromString(dataPage,'text/html')
        let list_pages=[]
        if($(htmlDoc).find(".paged-nav-item").parent().find("select").length>0){
            Array.from($(htmlDoc).find(".paged-nav-item").parent().find("select").find("option")).forEach(function(item){ list_pages.push(item.value) })
            list_pages.pop()
        } else if(htmlDoc.getElementsByClassName("paged-nav-item").length>0){
            let nr=0
            Array.from(htmlDoc.getElementsByClassName("paged-nav-item")).forEach(function(item){ let current=item.href; current=current.split("page=")[0]+"page="+nr; nr++; list_pages.push(current) })
        } else { list_pages.push(link_combined_production) }
        list_pages=list_pages.reverse()
        let map_incoming=new Map()
        function ajaxRequest(urls){
            let current_url
            if(urls.length>0) current_url=urls.pop()
            else current_url="stop"
            let start_ajax=new Date().getTime()
            if(urls.length>=0&&current_url!="stop"){
                $.ajax({ url:current_url, method:'get',
                    success:(data)=>{
                        const parser=new DOMParser()
                        const htmlDoc=parser.parseFromString(data,'text/html')
                        let table_incoming=Array.from($(htmlDoc).find(".row_a, .row_b"))
                        for(let i=0;i<table_incoming.length;i++){
                            let coord=""
                            if(game_data.device=="desktop") coord=table_incoming[i].children[4].innerText.match(/[0-9]{3}\|[0-9]{3}/)[0]
                            else coord=table_incoming[i].children[3].innerText.match(/[0-9]{3}\|[0-9]{3}/g)[1]
                            let wood=parseInt($(table_incoming[i]).find(".wood").parent().text().replace(".",""))
                            let stone=parseInt($(table_incoming[i]).find(".stone").parent().text().replace(".",""))
                            let iron=parseInt($(table_incoming[i]).find(".iron").parent().text().replace(".",""))
                            wood=(Number.isNaN(wood)==true)?0:wood; stone=(Number.isNaN(stone)==true)?0:stone; iron=(Number.isNaN(iron)==true)?0:iron
                            let obj={wood,stone,iron}
                            if(map_incoming.has(coord)){ let obj_update=map_incoming.get(coord); obj_update.wood+=wood; obj_update.stone+=stone; obj_update.iron+=iron; map_incoming.set(coord,obj_update) }
                            else { map_incoming.set(coord,obj) }
                        }
                        let stop_ajax=new Date().getTime()
                        let diff=stop_ajax-start_ajax
                        window.setTimeout(function(){ ajaxRequest(list_pages); UI.SuccessMessage("get incoming page: "+urls.length) },200-diff)
                    },
                    error:(err)=>{ reject(err) }
                })
            } else { UI.SuccessMessage("done"); resolve(map_incoming) }
        }
        ajaxRequest(list_pages)
    })
}
