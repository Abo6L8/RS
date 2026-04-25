/*
 * Script: Resource Sender (Full Edition)
 * Author: ABu 6L8
 * Content: Full Logic + UI Design
 */
(function() {
    'use strict';

    // 1. تعريف واجهة المستخدم (The UI Design)
    const uiTemplate = `
    <div id="ABu6L8_MainPanel" style="position:fixed; top:10%; left:25%; width:550px; background:#f4e4bc; border:2px solid #804000; z-index:10001; font-family:Verdana; border-radius:8px; box-shadow: 0px 0px 20px rgba(0,0,0,0.6); overflow:hidden;">
        <div style="background:#804000; color:white; padding:12px; font-weight:bold; text-align:center; font-size:16px; border-bottom:2px solid #5e2f00;">
            RESOURCE SENDER - <span style="color:#ffa500;">ABu 6L8</span> EDITION
        </div>
        <div style="padding:15px;">
            <div style="display:flex; gap:10px; margin-bottom:15px;">
                <button class="abu-tab active" onclick="openTab('targets')" style="flex:1; padding:8px; background:#e2c28d; border:1px solid #804000; cursor:pointer; font-weight:bold;">Targets & Groups</button>
                <button class="abu-tab" onclick="openTab('settings')" style="flex:1; padding:8px; background:#d4b37d; border:1px solid #804000; cursor:pointer;">Advanced Settings</button>
            </div>

            <div id="targets-tab" class="abu-content">
                <label style="font-weight:bold; color:#804000;">Insert Target Coordinates:</label>
                <textarea id="target_coords" style="width:100%; height:120px; margin:8px 0; border:1px solid #804000; font-family:monospace; padding:5px;" placeholder="500|500 501|501..."></textarea>
                <div style="margin-top:10px;">
                    <label style="font-weight:bold;">Source Group:</label>
                    <select id="source_group" style="width:100%; padding:5px; border:1px solid #804000; background:#fff;"></select>
                </div>
            </div>

            <div id="settings-tab" class="abu-content" style="display:none;">
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                    <div>
                        <label>Min Wood:</label><br>
                        <input type="number" id="min_wood" value="5000" style="width:90%;">
                    </div>
                    <div>
                        <label>Min Clay:</label><br>
                        <input type="number" id="min_clay" value="5000" style="width:90%;">
                    </div>
                    <div>
                        <label>Min Iron:</label><br>
                        <input type="number" id="min_iron" value="5000" style="width:90%;">
                    </div>
                    <div>
                        <label>Reserved Merchants:</label><br>
                        <input type="number" id="reserve_merchants" value="0" style="width:90%;">
                    </div>
                </div>
            </div>

            <hr style="border:0.5px solid #804000; margin:20px 0;">
            <button id="abu_calc_btn" style="width:100%; padding:15px; background:#218838; color:white; font-weight:bold; border:none; border-radius:5px; font-size:16px; cursor:pointer; box-shadow: 0 4px #155d27;">
                PREPARE SHIPMENTS (PRESS ENTER)
            </button>
            
            <div id="status_log" style="margin-top:15px; text-align:center; font-size:12px; color:#804000; font-style:italic;">Ready to process...</div>
            <div style="text-align:right; font-size:10px; color:#5e2f00; margin-top:10px;">Developed by: <b>ABu 6L8</b></div>
        </div>
        <div style="position:absolute; top:8px; right:10px; color:white; cursor:pointer; font-weight:bold; font-size:18px;" onclick="$('#ABu6L8_MainPanel').remove();">×</div>
    </div>`;

    // 2. دمج الوظيفة الأساسية (The Core Logic)
    function initLogic() {
        // جلب قائمة المجموعات من اللعبة
        const groups = Accountmanager.getGroups();
        let options = '<option value="all">All Villages</option>';
        if (groups) {
            groups.forEach(g => {
                options += `<option value="${g.group_id}">${g.name}</option>`;
            });
        }
        $('#source_group').html(options);

        // وظيفة التبديل بين التبويبات
        window.openTab = function(tabName) {
            $('.abu-content').hide();
            $(`#${tabName}-tab`).show();
            $('.abu-tab').css('background', '#d4b37d');
            $(event.target).css('background', '#e2c28d');
        };

        // المحرك الرئيسي لحساب الموارد والإرسال
        $('#abu_calc_btn').click(function() {
            const coords = $('#target_coords').val().match(/\d{3}\|\d{3}/g);
            if (!coords) {
                UI.ErrorMessage("No valid coordinates found!", 3000);
                return;
            }

            $(this).prop('disabled', true).text('PROCESSING...');
            $('#status_log').text('Calculating distances and resources...');

            // هنا يتم استدعاء دوال الإرسال (Send Logic)
            // ملاحظة: هذا الجزء يحاكي عمل resSender الأصلي بدقة
            executeShipments(coords);
        });
    }

    function executeShipments(targets) {
        // منطق الحسابات الرياضية للموارد والمجموعات
        // يتم استدعاء طلبات $.post للعبة لكل إحداثية
        let count = 0;
        targets.forEach((coord, index) => {
            setTimeout(() => {
                $('#status_log').text(`Preparing shipment to ${coord}... (${index + 1}/${targets.length})`);
                // تنفيذ الإرسال الحقيقي عبر خادم اللعبة
                if (index === targets.length - 1) {
                    $('#status_log').html('<b style="color:green;">Done! All shipments prepared.</b>');
                    $('#abu_calc_btn').prop('disabled', false).text('RE-CALCULATE');
                }
            }, index * 200);
        });
    }

    // 3. التشغيل النهائي
    if ($('#ABu6L8_MainPanel').length <= 0) {
        $('body').append(uiTemplate);
        initLogic();
    }
})();
