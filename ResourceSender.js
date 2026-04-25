javascript:
/* 
 * Script: Resource Sender
 * Version: 1.0
 * Author: ABu 6L8
 */

(function() {
    if ($("#ABu6L8_Panel").length > 0) return;

    var ui = `
    <div id="ABu6L8_Panel" style="position:fixed; top:15%; left:30%; width:450px; background:#f4e4bc; border:2px solid #804000; z-index:10001; font-family:Verdana; box-shadow: 5px 5px 15px rgba(0,0,0,0.5); border-radius:5px;">
        <div style="background:#804000; color:white; padding:8px; font-weight:bold; text-align:center; border-top-left-radius:3px; border-top-right-radius:3px;">
            Resource Sender - <span style="color:#ffa500;">ABu 6L8</span> Edition
        </div>
        <div style="padding:15px;">
            <div id="tabs" style="display:flex; margin-bottom:10px;">
                <button onclick="$('.tab-content').hide(); $('#target-tab').show();" style="flex:1; padding:5px; cursor:pointer; background:#e2c28d; border:1px solid #804000;">Targets</button>
                <button onclick="$('.tab-content').hide(); $('#settings-tab').show();" style="flex:1; padding:5px; cursor:pointer; background:#e2c28d; border:1px solid #804000; border-left:none;">Settings</button>
            </div>
            
            <div id="target-tab" class="tab-content">
                <label style="font-weight:bold;">Target Coordinates:</label><br>
                <textarea id="target_coords" style="width:100%; height:100px; margin-top:5px; border:1px solid #804000; font-size:11px;" placeholder="500|500 501|501..."></textarea>
            </div>

            <div id="settings-tab" class="tab-content" style="display:none;">
                <div style="margin-bottom:5px;">
                    <label>Min Resources:</label> 
                    <input type="number" id="min_res" value="5000" style="width:70px; float:right;">
                </div>
                <div style="margin-bottom:5px;">
                    <label>Reserve Merchants:</label> 
                    <input type="number" id="res_merch" value="0" style="width:70px; float:right;">
                </div>
            </div>

            <hr style="border:0.5px solid #804000; margin:15px 0;">
            <button id="execute_btn" style="width:100%; padding:10px; background:#218838; color:white; font-weight:bold; border:none; border-radius:3px; cursor:pointer;">
                PREPARE (PRESS ENTER)
            </button>
            <div style="text-align:center; font-size:10px; margin-top:10px; color:#804000;">
                Modified by: <b style="color:#000;">ABu 6L8</b> | Logic: ResSender
            </div>
        </div>
        <div style="position:absolute; top:5px; right:8px; color:white; cursor:pointer; font-weight:bold;" onclick="$('#ABu6L8_Panel').remove();">X</div>
    </div>`;

    $('body').append(ui);

    $('#execute_btn').click(function() {
        var coords = $('#target_coords').val();
        if(!coords) {
            UI.ErrorMessage('Please enter coordinates!', 3000);
            return;
        }
        
        // Loading the core logic from the original source
        $.getScript("https://dropboxusercontent.com")
        .done(function() {
            console.log("Core Logic Loaded. Version by ABu 6L8");
            UI.SuccessMessage('Logic Loaded! Ready to send.', 2000);
        });
    });
})();
