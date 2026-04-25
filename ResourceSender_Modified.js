// made by Costache Madalin (lllll llll)
// discord: costache madalin#8472
// Modified UI to match balance res style

var countApiKey = "res_sender";
var countNameSpace="madalinoTribalWarsScripts"
let url=window.location.href

var units=game_data.units;
var unitsLength=units.length;
if(units.includes("snob")) unitsLength--;
if(units.includes("militia")) unitsLength--;
if(units.includes("knight")) unitsLength--;

// ============= UI STYLING =============
var headerWood="#001a33"
var headerWoodEven="#002e5a"
var headerStone="#3b3b00"
var headerStoneEven="#626200"
var headerIron="#1e003b"
var headerIronEven="#3c0076"

var textColor="#ffffff"
var backgroundInput="#000000"
var borderColor = "#C5979D"
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

var listGroups
async function main(){
    await $.getScript("https://dl.dropboxusercontent.com/s/i5c0so9hwsizogm/styleCSSGlobal.js?dl=0");
    listGroups = await getGroups()
    await createMainInterface()
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
    if (hex.length === 3) {
        hex = hex.replace(/(.)/g, "$1$1");
    }
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    const calculatedPercent = (100 + percent) / 100;
    r = Math.round(Math.min(255, Math.max(0, r * calculatedPercent)));
    g = Math.round(Math.min(255, Math.max(0, g * calculatedPercent)));
    b = Math.round(Math.min(255, Math.max(0, b * calculatedPercent)));
    return `#${("00"+r.toString(16)).slice(-2).toUpperCase()}${("00"+g.toString(16)).slice(-2).toUpperCase()}${("00"+b.toString(16)).slice(-2).toUpperCase()}`
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// ============= MAIN INTERFACE =============
async function createMainInterface(){
    let rows = (game_data.device == 'desktop')?10:3
    let distanceTextarea = (game_data.device == 'desktop')?"30px":"5px"
    let widthSelect = (game_data.device == 'desktop')?"100%":"80%"

    let html_info=`
    <div id="div_container" class="scriptContainer">
        <div class="scriptHeader">
            <div style="margin-top:10px;"><h2>Resources Sender Pro</h2></div>
            <div style="position:absolute;top:10px;right: 10px;"><a href="#" onclick="$('#div_container').remove()"><img src="https://img.icons8.com/emoji/24/000000/cross-mark-button-emoji.png"/></a></div>
            <div style="position:absolute;top:8px;right: 35px;" id="div_minimize"><a href="#"><img src="https://img.icons8.com/plasticine/28/000000/minimize-window.png"/></a></div>
        </div>
        <div id="div_body" style="height:600px;overflow:auto">
            <input class="btn evt-confirm-btn btn-confirm-yes" type="button" onclick="createTableSettings()" style="margin:10px" value="settings">
            <center style="margin:10px"><div id="div_settings" hidden></div></center>

            <div class="tab-panels" id="tabs_coord">
                <ul class="tabs">
                    <li class="update_tab own active" rel="panel1"><font>panel1</font><img class="remove_tab" src="https://img.icons8.com/doodle/16/000000/delete-sign.png"/></li>
                    <li id="add_tab"><img src="https://img.icons8.com/color/16/000000/add-tab.png"/></li>
                </ul>
                <div id="all_tabs">
                    <div id="panel1" class="panel own active">
                        <center>
                            <table class="scriptTableInner">
                                <tr>
                                    <td colspan="3">
                                        <input class="btn evt-confirm-btn btn-confirm-yes" type="button" style="margin:5px" onclick="calculateLaunches(event)" value="Calculate">
                                        <div hidden class="div_results"><input class="btn evt-confirm-btn btn-confirm-yes" type="button" style="margin:5px" value="Send All"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="icon header wood"></span>
                                        <center style="margin:5px"><input type="number" class="input_wood scriptInput" placeholder="140000" value="140000"></center>
                                    </td>
                                    <td>
                                        <span class="icon header stone"></span>
                                        <center style="margin:5px"><input type="number" class="input_stone scriptInput" placeholder="150000" value="150000"></center>
                                    </td>
                                    <td>
                                        <span class="icon header iron"></span>
                                        <center style="margin:5px"><input type="number" class="input_iron scriptInput" placeholder="125000" value="125000"></center>
                                    </td>
                                </tr>
                            </table>
                        </center>
                        <br>
                        <div style="display:flex;align-items: center;justify-content: center">
                            <div style="margin-right:${distanceTextarea}">
                                <center><p style="color:${textColor};font-weight: bold;">origin coords:</p></center>
                                <textarea id="input_origin1" class="scriptInput" style="width:100%" rows="${rows}">origin coords</textarea>
                                <center>
                                    <select class="select_origin_coord" onchange="insertCoordsFromGroups(0)" style="width:${widthSelect}">
                                        <option value="none">none</option>`
                                        for(let i=0;i<listGroups.length;i++){
                                            html_info+=`<option value="${listGroups[i].href}">${listGroups[i].groupName}</option>`
                                        }
                html_info+=`</select>
                                </center>
                            </div>
                            <div style="margin-left:${distanceTextarea}">
                                <center><p style="color:${textColor};font-weight: bold;">target coords:</p></center>
                                <textarea id="input_target1" class="scriptInput" style="width:100%" rows="${rows}">target coords</textarea>
                                <center>
                                    <select class="select_target_coord" onchange="insertCoordsFromGroups(1)" style="width:${widthSelect}">
                                        <option value="none">none</option>`
                                        for(let i=0;i<listGroups.length;i++){
                                            html_info+=`<option value="${listGroups[i].href}">${listGroups[i].groupName}</option>`
                                        }
                html_info+=`</select>
                                </center>
                            </div>
                        </div>
                    </div>
                    <center><div id="table_view" style="height:300px;width:100%;overflow:auto"></div></center>
                </div>
            </div>
        </div>
        <div class="scriptFooter">
            <div style="margin-top:5px;"><h5>Shipments Queue</h5></div>
        </div>
    </div>`

    $("#div_container").remove()
    $("#contentContainer").eq(0).prepend(html_info);
    $("#mobileContent").eq(0).prepend(html_info);

    $("#div_container").css("position","fixed");
    $("#div_container").draggable();
    
    if(game_data.device != "desktop"){
        $("#div_body").css("height","500px")
    }
    
    $("#div_minimize").on("click",()=>{
        let currentWidthPercentage=Math.ceil($('#div_container').width() / $('body').width() * 100);
        if(currentWidthPercentage >=widthInterface ){
            $('#div_container').css({'width' : '10%'});
            $('#div_body').hide();
        }
        else{
            $('#div_container').css({'width' : `${widthInterface}%`});
            $('#div_body').show();
        }
    })
}

function createTableSettings(){
    let html_table=`
    <table id="settings_table" class="scriptTable">
        <tr>
            <td>setting name</td>
            <td>setting value</td>
        </tr>
        <tr>
            <td>reserve merchants</td>
            <td><input type="number" id="reserve_merchants" class="scriptInput" placeholder="0" value="0"></td>
        </tr>
        <tr>
            <td>min resources</td>
            <td><input type="number" id="min_resources" class="scriptInput" placeholder="0" value="0"></td>
        </tr>
        <tr>
            <td>max distance(fields)</td>
            <td><input type="number" id="max_distance" class="scriptInput" placeholder="0" value="500"></td>
        </tr>
        <tr>
            <td>overflow protection</td>
            <td><input type="checkbox" id="overflow_wh" checked="false"></td>
        </tr>
    </table>`
    
    if(document.getElementById("settings_table")==null){
        document.getElementById("div_settings").innerHTML=html_table
        let list_input=JSON.parse(localStorage.getItem(game_data.world+"res_sender_settings"))
        if(list_input!=null){
            let index = 0
            $('#div_settings input[type=number]').each(function (elem) {
                this.value=list_input[index]
                index++
            });
            $('#div_settings input[type=checkbox]').each(function (elem) {
                this.checked=list_input[index]
                index++
            });
        }
        $("#div_settings input[type=number], #div_settings input[type=checkbox]").on("click input change",()=>{
            let list_input=[]
            $('#div_settings input[type=number]').each(function () {
                list_input.push(this.value)
            });
            $('#div_settings input[type=checkbox]').each(function () {
                list_input.push(this.checked)
            });
            let data=JSON.stringify(list_input)
            localStorage.setItem(game_data.world+"res_sender_settings",data)
        })
    }
    else{
        $("#div_settings").toggle(500)
    }
}

function addEventPanel(){
    $('.tab-panels .tabs li').not("#add_tab").on('click', function(event) {
        if(event.target.src==undefined){
            if($(this).hasClass("active")==false ){
                $("#table_view").hide()
                var $panel = $(this).closest('.tab-panels');
                $panel.find('.tabs li.active').removeClass('active');
                $(this).addClass('active');
                var panelToShow = $(this).attr('rel');
                if(panelToShow!=undefined){
                    $panel.find('.panel.active').slideUp(300, function() {
                        $(this).removeClass('active');
                        $('#'+panelToShow).slideDown(300, function() {
                            $(this).addClass('active');
                        });
                    });
                }
                insertCoordsFromGroups(0)
                insertCoordsFromGroups(1)
            }
        }
    });
}

function addNewPanel(){
    let rows = (game_data.device == 'desktop')?10:3
    let distanceTextarea = (game_data.device == 'desktop')?"30px":"5px"
    let widthSelect = (game_data.device == 'desktop')?"100%":"80%"

    $("#add_tab").on("click",function(){
        let idNewPanel=parseInt($(".tabs").eq(0).find("li").last().prev().attr("rel").replace("panel",""))+1
        let htmlLI=`<li class="update_tab own" rel="panel${idNewPanel}"><font>panel${idNewPanel}</font><img class="remove_tab" src="https://img.icons8.com/doodle/16/000000/delete-sign.png"/></li>`;
        $("#add_tab").before(htmlLI);

        let htmlDIV=`
        <div id="panel${idNewPanel}" class="panel">
            <center>
                <table class="scriptTableInner">
                    <tr>
                        <td colspan="3">
                            <input class="btn evt-confirm-btn btn-confirm-yes" type="button" style="margin:5px" onclick="calculateLaunches(event)" value="Calculate">
                            <div hidden class="div_results"><input class="btn evt-confirm-btn btn-confirm-yes" type="button" style="margin:5px" value="Send All"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="icon header wood"></span>
                            <center style="margin:5px"><input type="number" class="input_wood scriptInput" placeholder="140000" value="140000"></center>
                        </td>
                        <td>
                            <span class="icon header stone"></span>
                            <center style="margin:5px"><input type="number" class="input_stone scriptInput" placeholder="150000" value="150000"></center>
                        </td>
                        <td>
                            <span class="icon header iron"></span>
                            <center style="margin:5px"><input type="number" class="input_iron scriptInput" placeholder="125000" value="125000"></center>
                        </td>
                    </tr>
                </table>
            </center>
            <br>
            <div style="display:flex;align-items: center;justify-content: center">
                <div style="margin-right:${distanceTextarea}">
                    <center><p style="color:${textColor};font-weight: bold;">origin coords:</p></center>
                    <textarea id="input_origin${idNewPanel}" class="scriptInput" style="width:100%" rows="${rows}">origin coords${idNewPanel}</textarea>
                    <center>
                        <select class="select_origin_coord" onchange="insertCoordsFromGroups(0)" style="width:${widthSelect}">
                            <option value="none">none</option>`
                            for(let i=0;i<listGroups.length;i++){
                                htmlDIV+=`<option value="${listGroups[i].href}">${listGroups[i].groupName}</option>`
                            }
            htmlDIV+=`</select>
                    </center>
                </div>
                <div style="margin-left:${distanceTextarea}">
                    <center><p style="color:${textColor};font-weight: bold;">target coords:</p></center>
                    <textarea id="input_target${idNewPanel}" class="scriptInput" style="width:100%" rows="${rows}">target coords${idNewPanel}</textarea>
                    <center>
                        <select class="select_target_coord" onchange="insertCoordsFromGroups(1)" style="width:${widthSelect}">
                            <option value="none">none</option>`
                            for(let i=0;i<listGroups.length;i++){
                                htmlDIV+=`<option value="${listGroups[i].href}">${listGroups[i].groupName}</option>`
                            }
            htmlDIV+=`</select>
                    </center>
                </div>
            </div>
        </div>`
        $("#all_tabs").append(htmlDIV)
        addEventPanel();
        removePanel()
        getCoordsEvent();
        saveOwnData()
    })
}

function removePanel(){
    $('.remove_tab').off('click');
    $(".remove_tab").on("click",function(){
        var confirm=window.confirm("are you sure?")
        if(confirm==true && $('.remove_tab').length>1){
            let removePanel=$(this).parent().attr('rel')
            $(this).parent().remove();
            $("#"+removePanel).remove();
            if($(".active").length==0){
                let lastTab=$(".update_tab").last()
                lastTab.addClass("active");
                let panelId=lastTab.attr("rel")
                $("#"+panelId).addClass("active");
                $("#"+panelId).slideDown(300);
            }
        }
        saveOwnData()
    })
}

function saveOwnData(){
    let list_name_tabs=Array.from($(".tabs").eq(0).find(".own")).map(e=>e.innerText.trim())
    localStorage.setItem(game_data.world+"res_sender_tabs_name",JSON.stringify(list_name_tabs))
    let list_input=[]
    $('#tabs_coord input[type=number],#tabs_coord textarea, #tabs_coord select').each(function () {
        list_input.push(this.value)
    });
    let data=JSON.stringify(list_input)
    localStorage.setItem(game_data.world+"res_sender_tabs2",data)
}

function getCoordsEvent(){
    $("textarea").off("mouseout");
    $("textarea").mouseout(function(){
        let current_value=this.value
        if(current_value.match(/[0-9]{3}\|[0-9]{3}/)!=null){
            let coords=current_value.match(/[0-9]{3}\|[0-9]{3}/g)
            let set=new Set(coords)
            coords=[...set]
            this.value=Array.from(coords).join(" ")
        }
        saveOwnData();
    })
}

function initializationOwnTabs(){
    if(localStorage.getItem(game_data.world+"res_sender_tabs2")!=null){
        let list_input=JSON.parse(localStorage.getItem(game_data.world+"res_sender_tabs2"))
        let list_name_tabs=JSON.parse(localStorage.getItem(game_data.world+"res_sender_tabs_name"))
        if(list_name_tabs!=undefined){
            for(let i=0;i<list_name_tabs.length-1;i++){
                document.getElementById("add_tab").click()
            }
            let index = 0;
            $('#tabs_coord input[type=number],#tabs_coord textarea, #tabs_coord select').each(function (elem) {
                this.value=list_input[index]
                index++
            });
            Array.from($(".tabs").eq(0).find(".own")).forEach((elem,index)=>{
                elem.getElementsByTagName("font")[0].innerText=list_name_tabs[index]
            })
        }
        saveOwnData();
    }
}

// ============= MAIN CALCULATION =============
async function calculateLaunches(event){
    let reserve_merchants=parseInt(document.getElementById("reserve_merchants").value) || 0
    let min_resources=parseInt(document.getElementById("min_resources").value) || 0
    let max_distance=parseInt(document.getElementById("max_distance").value) || 500
    let overflow_protection=document.getElementById("overflow_wh").checked

    let map_production = await getDataProduction().catch(err=>{UI.ErrorMessage(err,2000); return new Map()})
    let map_villageInfo = await getInfoVIllages().catch(err=>{UI.ErrorMessage(err,2000); return new Map()})
    let map_incoming = await getDataIncoming().catch(err=>{UI.ErrorMessage(err,2000); return new Map()})

    let wood_send=parseInt($(event.target).closest("div").find(".input_wood").val())
    let stone_send=parseInt($(event.target).closest("div").find(".input_stone").val())
    let iron_send=parseInt($(event.target).closest("div").find(".input_iron").val())
    let origin_coord=$(event.target).closest("div").find("textarea").eq(0).val().match(/[0-9]{3}\|[0-9]{3}/g)
    let target_coord=$(event.target).closest("div").find("textarea").eq(1).val().match(/[0-9]{3}\|[0-9]{3}/g)

    if(!origin_coord || !target_coord){
        UI.ErrorMessage("Please enter valid coordinates",2000)
        return
    }

    origin_coord = origin_coord.filter(e=>!target_coord.includes(e))

    // Add incoming resources
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
    let set=new Set(origin_coord)
    origin_coord=[...set]
    set=new Set(target_coord)
    target_coord=[...set]

    let list_res_send=[]
    for(let i=0;i<origin_coord.length;i++){
        let obj=map_productionködget(origin_coord[i])
        if(obj==undefined){
            UI.ErrorMessage("origin coords not found: "+origin_coord[i],2000)
            continue
        }

        obj.merchants-=reserve_merchants
        let wood_available=(obj.wood>min_resources)?Math.min(obj.wood-min_resources,wood_send):0
        let stone_available=(obj.stone>min_resources)?Math.min(obj.stone-min_resources,stone_send):0
        let iron_available=(obj.iron>min_resources)?Math.min(obj.iron-min_resources,iron_send):0

        let factor_wood=wood_available/wood_send
        let factor_stone=stone_available/stone_send
        let factor_iron=iron_available/iron_send
        let min_factor=Math.min(factor_wood,factor_stone,factor_iron)

        if(min_factor<1){
            wood_available=Math.round(wood_available*min_factor)
            stone_available=Math.round(stone_available*min_factor)
            iron_available=Math.round(iron_available*min_factor)
        }

        let total_res=wood_available+stone_available+iron_available
        let capacitiy_available=obj.merchants*1000
        let factor_capacity=(total_res > capacitiy_available)?capacitiy_available/total_res:1
        
        list_res_send.push({
            coord_origin:obj.coord,
            id_origin:obj.id,
            wood:Math.round(wood_available*factor_capacity),
            stone:Math.round(stone_available*factor_capacity),
            iron:Math.round(iron_available*factor_capacity),
            merchants:obj.merchants
        })
    }

    // Match origins to targets
    for(let i=0;i<target_coord.length;i++){
        let id_target=map_villageInfo.get(target_coord[i])
        
        for(let j=0;j<list_res_send.length;j++){
            let distance=calcDistance(target_coord[i],list_res_send[j].coord_origin)
            
            if(distance <= max_distance && target_coord[i] != list_res_send[j].coord_origin){
                let send_wood=Math.min(list_res_send[j].wood, wood_send)
                let send_stone=Math.min(list_res_send[j].stone, stone_send)
                let send_iron=Math.min(list_res_send[j].iron, iron_send)
                let total_send=send_wood+send_stone+send_iron

                if(total_send >= 700){
                    list_launches.push({
                        coord_from: list_res_send[j].coord_origin,
                        id_from: list_res_send[j].id_origin,
                        coord_to: target_coord[i],
                        id_to: id_target,
                        wood: send_wood,
                        stone: send_stone,
                        iron: send_iron,
                        total: total_send,
                        distance: distance
                    })
                    
                    list_res_send[j].wood -= send_wood
                    list_res_send[j].stone -= send_stone
                    list_res_send[j].iron -= send_iron
                }
            }
        }
    }

    createShipmentsTable(list_launches)
}

// ============= DISPLAY SHIPMENTS =============
function createShipmentsTable(list_launches){
    let html_table=`
    <table class="scriptTableAlternate">
        <tr>
            <td><b>From Village</b></td>
            <td><b>To Village</b></td>
            <td><b>Distance</b></td>
            <td class="hideMobile"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/wood.png" style="width:20px"/></td>
            <td class="hideMobile"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/stone.png" style="width:20px"/></td>
            <td class="hideMobile"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/iron.png" style="width:20px"/></td>
            <td><b>Total</b></td>
            <td><b>Send</b></td>
        </tr>`

    let counter=0
    list_launches.forEach(launch => {
        counter++
        html_table+=`
        <tr>
            <td><a href="${game_data.link_base_pure}info_village&id=${launch.id_from}"><center><font color="${textColor}">${launch.coord_from}</font></center></a></td>
            <td><a href="${game_data.link_base_pure}info_village&id=${launch.id_to}"><center><font color="${textColor}">${launch.coord_to}</font></center></a></td>
            <td><center>${launch.distance.toFixed(1)}</center></td>
            <td class="hideMobile"><center>${formatNumber(launch.wood)}</center></td>
            <td class="hideMobile"><center>${formatNumber(launch.stone)}</center></td>
            <td class="hideMobile"><center>${formatNumber(launch.iron)}</center></td>
            <td><center><b>${formatNumber(launch.total)}</b></center></td>
            <td><button class="btn evt-confirm-btn btn-confirm-yes btn_send_shipment" 
                data-from="${launch.id_from}" 
                data-to="${launch.id_to}" 
                data-wood="${launch.wood}" 
                data-stone="${launch.stone}" 
                data-iron="${launch.iron}">Send</button></td>
        </tr>`
    })
    
    html_table+=`</table>`
    document.getElementById("table_view").innerHTML=html_table
    $("#table_view").show()

    // Add send event listeners
    $(".btn_send_shipment").on("click",function(){
        let id_from=$(this).data("from")
        let id_to=$(this).data("to")
        let wood=$(this).data("wood")
        let stone=$(this).data("stone")
        let iron=$(this).data("iron")

        sendResources(id_to, id_from, wood, stone, iron)
        $(this).closest("tr").fadeOut(300, function(){
            $(this).remove()
        })
    })
}

function formatNumber(number){
    return new Intl.NumberFormat().format(number)
}

function calcDistance(coord1,coord2){
    let x1=parseInt(coord1.split("|")[0])
    let y1=parseInt(coord1.split("|")[1])
    let x2=parseInt(coord2.split("|")[0])
    let y2=parseInt(coord2.split("|")[1])
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

// ============= DATA FETCHING =============
function getDataProduction(){
    return new Promise((resolve,reject)=>{
        let link=game_data.link_base_pure+"overview_villages&mode=prod&group=0"
        let datePage = httpGet(link)
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(datePage, 'text/html');
        let map_production=new Map()

        if(game_data.device == "desktop"){
            let table=Array.from($(htmlDoc).find(".row_a, .row_b"))
            table.forEach(row=>{
                let coord=row.getElementsByClassName("quickedit-vn")[0].innerText.match(/[0-9]{3}\|[0-9]{3}/)[0]
                let id=row.getElementsByClassName("quickedit-vn")[0].getAttribute("data-id")
                let wood=parseInt(row.getElementsByClassName("wood")[0].innerText.replace(/\./g,""))
                let stone=parseInt(row.getElementsByClassName("stone")[0].innerText.replace(/\./g,""))
                let iron=parseInt(row.getElementsByClassName("iron")[0].innerText.replace(/\./g,""))
                let merchants=parseInt(row.querySelector("a[href*='market']").innerText.split("/")[0])
                let capacity=parseInt(row.children[4].innerText)

                map_production.set(coord,{coord:coord, id:id, wood:wood, stone:stone, iron:iron, merchants:merchants, capacity:capacity})
            })
        }
        resolve(map_production)
    })
}

function getInfoVIllages(){
    return new Promise((resolve)=>{
        let mapVillage=new Map();
        let url=window.location.href.split("/game.php")[0]
        let dataVillage=httpGet(url+"/map/village.txt").split(/\r?\n/);

        for(let i=0;i<dataVillage.length;i++){
            let coord=dataVillage[i].split(",")[2]+"|"+dataVillage[i].split(",")[3]
            let id=dataVillage[i].split(",")[0]
            mapVillage.set(coord,id)
        }
        resolve(mapVillage)
    })
}

function getDataIncoming(){
    return new Promise((resolve)=>{
        resolve(new Map())
    })
}

function getGroups(){
    return new Promise((resolve)=>{
        let urlSnobPage=game_data.link_base_pure+"overview_villages&mode=groups&type=static&group=0"
        let dataPage = httpGet(urlSnobPage)
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(dataPage, 'text/html');
        let listGroups = []

        if(game_data.device == "desktop"){
            listGroups = Array.from($(htmlDoc).find(".group-menu-item")).map(e => ({
               href: game_data.link_base_pure + `overview_villages&mode=combined&group=${e.getAttribute("data-group-id")}&page=-1`,
               groupName: e.innerText.trim()
           }))
        }
        resolve(listGroups)
    })
}

function getGroupCoords(url){
    return new Promise((resolve)=>{
        let dataPage = httpGet(url)
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(dataPage, 'text/html');
        let listCoords = []

        if(game_data.device == "desktop")
            listCoords = Array.from($(htmlDoc).find(".row_a, .row_b")).map(e=>e.children[1].innerText.match(/\d+\|\d+/)[0])

        resolve(listCoords.join(" "))
    })
}

async function insertCoordsFromGroups(index){
    let idPanel = "#"+$(".active").attr("rel")
    let hrefs = Array.from($(idPanel).find("select")).map(e=>e.value)
    let inputCoords = Array.from($(idPanel).find("textarea"))

    if(hrefs[index] !="none"){
        let coords = await getGroupCoords(hrefs[index])
        inputCoords[index].value = coords
    }
}

function sendResources(target_id, origin_id, wood, stone, iron){
    var form = {
        "target_id": target_id,
        "wood": wood,
        "stone": stone,
        "iron": iron
    };
    TribalWars.post("market", {
        "ajaxaction": "map_send",
        "village": origin_id
    }, form, function(data) {
        UI.SuccessMessage("Sent "+formatNumber(wood+stone+iron)+" resources",1000)
    }, false);
}

function hitCountApi(){
    $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}/up`, response=>{
        console.log(`Script runs: ${response.count} times`);
    });
}
