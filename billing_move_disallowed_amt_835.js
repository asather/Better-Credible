// ==UserScript==
// @name         Better Credible: Move Disallowed Amt (835)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  For APA payments only, moves the amount in Disallowed Amount column to Paid Amount column.
// @author       Andrew Sather
// @match        https://*.crediblebh.com/billing/ins_835_reconcile.asp?load835_id=*
// @run-at       context-menu
// @icon         https://www.google.com/s2/favicons?domain=crediblebh.com
// @grant        none
// ==/UserScript==

(function() {

    //TEST TEST TEST

    /// This is a demo

    
    'use strict';
    var flds_paid_amt, flds_dis_amt
    var fld_dis_amt_name, fld_adj_type_name, fld_return_codes_name, fld_paid_name
    var val_dis_amt
    var element_id

    //Get every paid_amount field.
    flds_paid_amt = $('input[name^=paid_amount]')

    //Loop through every paid_amount field that exists...
    for(var i = 0; i < flds_paid_amt.length; i++){

        //Get the names of the form fields based on the names of the paid_amount field.
        fld_dis_amt_name = flds_paid_amt[i].name.replace("paid_amount","disallowed_amount")
        fld_adj_type_name = flds_paid_amt[i].name.replace("paid_amount","adj_type")
        fld_return_codes_name = flds_paid_amt[i].name.replace("paid_amount","return_codes")
        fld_paid_name = flds_paid_amt[i].name.replace("paid_amount","Paid")
        element_id = flds_paid_amt[i].name.replace("paid_amount","")

        //Do a bunch of checks to make sure that we should be moving this data...
        if(flds_paid_amt[i].value != "0.00"){continue} //paid amount must be 0.00
        console.log("Paid Amnt 835" + element_id + " == 0.00. PASS")
        if($('select[name=' + fld_adj_type_name + ']').find(":selected").text() != "CO"){continue} //adjustment type must be CO
        console.log("Adjustment Type" + element_id + " == CO. PASS")
        if($('select[name=' + fld_return_codes_name + ']').find(":selected").text().substring(0,2) != "45"){continue} //First 2 characters of drop down must be 45
        console.log("Return Codes " + element_id + " starts with 45. PASS")
        if(document.getElementsByName(fld_paid_name)[0].checked != true){continue} //The value checkbox must be checked.
        console.log("Paid checkbox " + element_id + " is checked. PASS")

        //Get the field and value of the disallowed amount.
        flds_dis_amt = $('input[name=' + fld_dis_amt_name + ']')
        val_dis_amt = flds_dis_amt[0].value

        //Set the value of the paid amount....
        flds_paid_amt[i].value = val_dis_amt

        //Set the value of the disallowed amount to zero...
        flds_dis_amt[0].value = "0.00"

    }

})();
