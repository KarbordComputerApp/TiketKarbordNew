﻿var server = localStorage.getItem("ApiAddress");
$('#TextUserName').text(sessionStorage.userName);
var access = JSON.parse(localStorage.getItem("Access"));
var accessReport = JSON.parse(localStorage.getItem("AccessReport"));

var accessErj = JSON.parse(localStorage.getItem("AccessErj"));
var accessReportErj = JSON.parse(localStorage.getItem("AccessReportErj"));

const MODECODE_ADOC_A = 1;
const MODECODE_ADOC_EFT = 2;
const MODECODE_ADOC_EKH = 3;
const MODECODE_ADOC_SODZYN = 4;

var ParamUri = server + '/api/Web_Data/Param/'; // آدرس پارامتر
var DatabseSalUrl = server + '/api/Web_Data/DatabseSal/'; // آدرس دیتابیس های سال
var AccessUri = server + '/api/Web_Data/AccessUser/'; // آدرس سطح دسترسی
var AccessReportUri = server + '/api/Web_Data/AccessUserReport/'; // آدرس سطح دسترسی گزارشات
var AccessReportErjUri = server + '/api/Web_Data/AccessUserReportErj/'; // آدرس سطح دسترسی گزارشات
var CountTableUri = server + '/api/Web_Data/CountTable/'; // تعداد رکورد ها 
var RprtColsSaveUri = server + '/api/Web_Data/RprtColsSave/'; // آدرس ذخیره ستون ها 

var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها
var RprtColsDefultUri = server + '/api/Web_Data/RprtColsDefult/'; // آدرس مشخصات ستون های پیش فرض


ParamList = ko.observableArray([]); // پارامتر ها
DatabseSalList = ko.observableArray([]); // دیتابیس های سال
AccessList = ko.observableArray([]); // سطح دسترسی
AccessListReport = ko.observableArray([]); // سطح دسترسی گزارشات

$('#userNameFa').text(sessionStorage.userNameFa);
$('#userNameHome').text(sessionStorage.userNameFa + ' ');



if (sessionStorage.ace == 'Web1') {
    sessionStorage.MODECODE_FDOC_SO = 0;
    sessionStorage.MODECODE_FDOC_SP = 51;
    sessionStorage.MODECODE_FDOC_S = 52;
    sessionStorage.MODECODE_FDOC_SR = 53;
    sessionStorage.MODECODE_FDOC_SH = 0;
    sessionStorage.MODECODE_FDOC_SE = 0;
    sessionStorage.MODECODE_FDOC_PO = 0;
    sessionStorage.MODECODE_FDOC_PP = 54;
    sessionStorage.MODECODE_FDOC_P = 55;
    sessionStorage.MODECODE_FDOC_PR = 56;
    $('#FDOC_SO').attr('hidden', '');
    $('#FDOC_SH').attr('hidden', '');
    $('#FDOC_SE').attr('hidden', '');
    $('#FDOC_PO').attr('hidden', '');
} else {
    sessionStorage.MODECODE_FDOC_SO = 'SORD';
    sessionStorage.MODECODE_FDOC_SP = 'SPFCT';
    sessionStorage.MODECODE_FDOC_S = 'SFCT';
    sessionStorage.MODECODE_FDOC_SR = 'SRFCT';
    sessionStorage.MODECODE_FDOC_SH = 'SHVL';
    sessionStorage.MODECODE_FDOC_SE = 'SEXT';
    sessionStorage.MODECODE_FDOC_PO = 'PORD';
    sessionStorage.MODECODE_FDOC_PP = 'PPFCT';
    sessionStorage.MODECODE_FDOC_P = 'PFCT';
    sessionStorage.MODECODE_FDOC_PR = 'PRFCT';
    $('#FDOC_SO').removeAttr('hidden', '');
    $('#FDOC_SH').removeAttr('hidden', '');
    $('#FDOC_SE').removeAttr('hidden', '');
    $('#FDOC_PO').removeAttr('hidden', '');
}


const MODECODE_FDOC_SandSR = 81;
const MODECODE_FDOC_PandPR = 82;

const MODECODE_IDOC_AVAL = 101;
const MODECODE_IDOC_I = 102;
const MODECODE_IDOC_ISR = 103;
const MODECODE_IDOC_O = 104;
const MODECODE_IDOC_OPR = 105;
const MODECODE_IDOC_IMOVE = 106;
const MODECODE_IDOC_OMOVE = 107;
const MODECODE_IDOC_IP = 108;
const MODECODE_IDOC_OS = 109;
const MODECODE_IDOC_IMAHSOOL = 110;
const MODECODE_IDOC_OMAVAD = 111;

//if (localStorage.getItem("ApiAddress");  == null || sessionStorage.ApiAddress == "") {
//    sessionStorage.ApiAddress = $("#serverTest").text();
//    server = sessionStorage.ApiAddress;
//}
//else
//    server = sessionStorage.ApiAddress;

//$("#aceTest").text('نام نرم افزار' + sessionStorage.ace);
//$("#groupTest").text('نام گروه' + sessionStorage.group);
//$("#salTest").text('سال مالی' + sessionStorage.sal);

//  $("#ace").val(sessionStorage.ace);
//  $("#group").val(sessionStorage.group);
//  $("#sal").val(sessionStorage.sal);

//تنظیمات هشدار ها

var afiAccessApi;
var erjAccessApi;
var erjGroupApi;



//access = JSON.parse(localStorage.getItem("Access"));
tempAccess = localStorage.getItem("afi1Access");
if (tempAccess == "null" || tempAccess == "" || tempAccess == null) {
    afiAccessApi = localStorage.getItem("afi8Access").split("*")
}
else {
    afiAccessApi = localStorage.getItem("afi1Access").split("*")
}


if (localStorage.getItem("erjAccess") != null && localStorage.getItem("erjAccess") != "") {
    erjAccessApi = localStorage.getItem("erjAccess").split("*")
    erjGroupApi = localStorage.getItem("erjList").split("-")
}



afiaccess = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

for (var i = 0; i <= 27; i++) {
    afiAccessApi[i] == 'SFCT' ? afiaccess[0] = true : null;
    afiAccessApi[i] == 'SPFCT' ? afiaccess[1] = true : null;
    afiAccessApi[i] == 'SRFCT' ? afiaccess[2] = true : null;
    afiAccessApi[i] == 'PFCT' ? afiaccess[3] = true : null;
    afiAccessApi[i] == 'PPFCT' ? afiaccess[4] = true : null;
    afiAccessApi[i] == 'PRFCT' ? afiaccess[5] = true : null;

    afiAccessApi[i] == 'IIDOC' ? afiaccess[6] = true : null;
    afiAccessApi[i] == 'IODOC' ? afiaccess[7] = true : null;
    afiAccessApi[i] == 'TrzIKala' ? afiaccess[8] = true : null;
    afiAccessApi[i] == 'TrzIKalaExf' ? afiaccess[9] = true : null;
    afiAccessApi[i] == 'IDocR' ? afiaccess[10] = true : null;
    afiAccessApi[i] == 'FDocR_S' ? afiaccess[11] = true : null;
    afiAccessApi[i] == 'FDocR_P' ? afiaccess[12] = true : null;
    afiAccessApi[i] == 'TrzAcc' ? afiaccess[13] = true : null;
    afiAccessApi[i] == 'Dftr' ? afiaccess[14] = true : null;
    afiAccessApi[i] == 'ADocR' ? afiaccess[15] = true : null;
    afiAccessApi[i] == 'TChk' ? afiaccess[16] = true : null;
    afiAccessApi[i] == 'TrzFKala_S' ? afiaccess[17] = true : null;
    afiAccessApi[i] == 'TrzFKala_P' ? afiaccess[18] = true : null;
    afiAccessApi[i] == 'TrzFCust_S' ? afiaccess[19] = true : null;
    afiAccessApi[i] == 'TrzFCust_P' ? afiaccess[20] = true : null;
    afiAccessApi[i] == 'ADOC' ? afiaccess[21] = true : null;
    afiAccessApi[i] == 'SFORD' ? afiaccess[22] = true : null;
    afiAccessApi[i] == 'SHVL' ? afiaccess[23] = true : null;
    afiAccessApi[i] == 'SEXT' ? afiaccess[24] = true : null;
    afiAccessApi[i] == 'PFORD' ? afiaccess[25] = true : null;
    afiAccessApi[i] == 'Krdx' ? afiaccess[26] = true : null;
}

function CheckGroupErj(GroupName) {
    if (GroupName == '') {
        return false;
    }
    else {
        if (erjGroupApi != null) {
            for (var i = 0; i < erjGroupApi.length; i++) {
                if (erjGroupApi[i] == GroupName)
                    return true;
            }
        }
        else
            return false;
    }
    return false;
}


erjaccess = [false, false]

if (CheckGroupErj(sessionStorage.group) == true) {
    for (var i = 0; i < 2; i++) {
        erjAccessApi[i] == 'ErjDocK' ? erjaccess[1] = true : null;
        erjAccessApi[i] == 'ErjDocErja' ? erjaccess[2] = true : null;

    }
}

sessionStorage.placementFrom = 'top';
sessionStorage.placementAlign = 'right';
sessionStorage.animateEnter = '';
sessionStorage.animateExit = '';
sessionStorage.colorName = 'alert-danger';

/*afiaccess[0] == 0 ? $("#FDOC_SP").hide() : $("#FDOC_SP").show();
afiaccess[1] == 0 ? $("#FDOC_S").hide() : $("#FDOC_S").show();
afiaccess[2] == 0 ? $("#FDOC_SR").hide() : $("#FDOC_SR").show();
afiaccess[3] == 0 ? $("#FDOC_PP").hide() : $("#FDOC_PP").show();
afiaccess[4] == 0 ? $("#FDOC_P").hide() : $("#FDOC_P").show();
afiaccess[5] == 0 ? $("#FDOC_PR").hide() : $("#FDOC_PR").show();
afiaccess[6] == 0 ? $("#IDOC_I").hide() : $("#IDOC_I").show();
afiaccess[7] == 0 ? $("#IDOC_O").hide() : $("#IDOC_O").show();*/

$("#FDOC_SP").hide();
$("#FDOC_S").hide();
$("#FDOC_SR").hide();
$("#FDOC_PP").hide();
$("#FDOC_P").hide();
$("#FDOC_PR").hide();

$("#IDOC_I").hide();
$("#IDOC_O").hide();

$("#TrzIKala").hide();
$("#TrzIKalaExf").hide();
$("#IDocR").hide();
$("#Krdx").hide();
$("#ADOC_Menu").hide();
$("#FDOC_Menu").hide();
$("#IDOC_Menu").hide();
$("#AReport_Menu").hide();
$("#FReport_Menu").hide();
$("#IReport_Menu").hide();
$("#EReport_Menu").hide();

/*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
    afiaccess[2] == 0 && afiaccess[3] == 0 &&
    afiaccess[4] == 0 && afiaccess[5] == 0)
    $("#FDOC_Menu").hide();
else
    $("#FDOC_Menu").show();

if (afiaccess[6] == 0 && afiaccess[7] == 0)
    $("#IDOC_Menu").hide();
else
    $("#IDOC_Menu").show();*/



//function ajaxFunction(uri, method, data) {
//    return $.ajax({
//        type: method,
//        url: uri,
//        dataType: 'json',
//        contentType: 'application/json',
//        data: data ? JSON.stringify(data) : null
//    }).fail(function (jqXHR, textStatus, errorThrown) {
//        Swal.fire({ type: 'danger', title: 'خطای دیباگ', text: errorThrown });
//    });
//}

function ajaxFunctionAccount(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        async: false,
        cache: false,
        timeout: 30000,
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showNotification('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید' + '</br>' + textStatus + ' : ' + errorThrown, 3);
    });
}

function ajaxFunction(uri, method, data) {

    var userNameAccount = localStorage.getItem("userNameAccount");
    var passAccount = localStorage.getItem("passAccount");

    return $.ajax({
        type: method,
        url: uri,//+ '/' + userNameAccount + '/' + passAccount,
        dataType: 'json',
        async: false,
        cache: false,
        timeout: 30000,
        headers: {
            'userName': userNameAccount,
            'password': passAccount
        },
        //async: true,
        //crossDomain: true,
        //cache: false,
        contentType: 'application/json',
        //contentType: 'application/x-www-form-urlencoded',
        // xhrFields: { withCredentials: true },
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showNotification('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید' + '</br>' + textStatus + ' : ' + errorThrown, 3);
        // Swal.fire({ type: 'danger', title: 'اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید', text: errorThrown });
    });
}


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function GetDataApi(Url, localStorageName) { // دریافت اطلاعات از ای پی ای
    $.ajax({
        url: Url,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            sessionStorage.setItem(localStorageName, JSON.stringify(data));
            //showNotification(' دیتای ' + localStorageName + ' دریافت شد ');
        },
        error: function (xhr, textStatus, errorThrown) {
            //showNotification('خطا در دریافت اطلاعات از سرور' + '(' + errorThrown + ')');
        }
    });
}

function CountTable(tableName, ModeCode, InOut) {
    ajaxFunction(CountTableUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + tableName + '/' + ModeCode + '/' + InOut, 'GET').done(function (dataCount) {
        count = dataCount;
    });
    return count;
}



function SearchArry(Node, Key, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Node === Node && myArray[i].Key === Key) {
            return myArray[i].Param;
        }
    }
    return '';
}

function SearchMode(name, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Name === name) {
            return myArray[i].Code;
        }
    }
    return '';
}


function SetSelectProgram() {
    var ace = sessionStorage.ace;
    var group = $("#DropGroup").val();
    var sal = $("#DropSal").val();

    if (server == '' || server == null) {
        Swal.fire({ type: 'info', title: 'خطا در ورود به نرم افزار', text: 'دوباره لاگین کنید' });
        return false;
    }

    if (ace == '0' || ace == null) {
        Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'نرم افزار را انتخاب کنید' });
        return false;
    }
    if (group == '0' || group == null) {
        Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'گروه را انتخاب کنید' });
        return false;
    }
    if (sal == '0' || sal == null) {
        Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'سال را انتخاب کنید' });
        return false;
    }
    try {
        //sessionStorage.ace = ace;
        sessionStorage.group = group;
        sessionStorage.sal = sal;

        localStorage.setItem('ace', ace);
        localStorage.setItem('group', group);
        localStorage.setItem('sal', sal);

        //sessionStorage.url = server + '/api/'; 
        $('#SaveParam').attr('disabled', 'disabled');
        getParamList();
        getAccessList();
        $('#SaveParam').removeAttr('disabled');

        sessionStorage.ModeCode = '';

        return true;
    } catch (e) {
        $('#SaveParam').removeAttr('disabled');
        Swal.fire({ type: 'danger', title: 'خطای ورود', text: e });
        return false;
    }
}

//if ($("#DropAce").val() != '0' && $("#DropGroup").val() != '0' && $("#DropSal").val() != '0') {
//    SetSelectProgram();
//}

$("#SaveParam").click(function () {
    SetSelectProgram();
});

function getProgName(value) {
    if (sessionStorage.ace == 'Web8') {
        if (value == 'A')
            return 'Acc5';
        else if (value == 'S')
            return 'Fct5';
        else if (value == 'P')
            return 'Inv5';
    }
    else if (sessionStorage.ace == 'Web1')
        return 'Afi1';
    else
        return 'نامشخص';
}

//Get Param List
function getParamList() {
    ajaxFunction(ParamUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group, 'GET').done(function (data) {
        ParamList(data);
        $('#information').hide();
        if (self.ParamList().length > 0) {
            sessionStorage.BeginDate = SearchArry("SalMali", "BeginDate", self.ParamList());
            sessionStorage.EndDate = SearchArry("SalMali", "EndDate", self.ParamList());
            sessionStorage.Deghat = SearchArry("Deghat", "Deghat", self.ParamList());
            sessionStorage.InvDefult = SearchArry("Inv", "Default", self.ParamList());
            sessionStorage.GPriceDefultS = SearchArry("KalaPriceS", "Default", self.ParamList());
            sessionStorage.GPriceDefultP = SearchArry("KalaPriceP", "Default", self.ParamList());
            sessionStorage.GPriceDefultI = SearchArry("KalaPriceI", "Default", self.ParamList());

            if (sessionStorage.ace == 'Web8') {
                sessionStorage.Move_SCONT = SearchArry("MoveTo", "SCONT", self.ParamList());
                sessionStorage.Move_SORD = SearchArry("MoveTo", "SORD", self.ParamList());
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "SPFCT", self.ParamList());
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "SFCT", self.ParamList());
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "SRFCT", self.ParamList());
                sessionStorage.Move_SHVL = SearchArry("MoveTo", "SHVL", self.ParamList());
                sessionStorage.Move_SEXT = SearchArry("MoveTo", "SEXT", self.ParamList());
                sessionStorage.Move_PCONT = SearchArry("MoveTo", "PCONT", self.ParamList());
                sessionStorage.Move_PORD = SearchArry("MoveTo", "PORD", self.ParamList());
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "PPFCT", self.ParamList());
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "PFCT", self.ParamList());
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "PRFCT", self.ParamList());
            }
            else {
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "51", self.ParamList());
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "52", self.ParamList());
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "53", self.ParamList());
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "54", self.ParamList());
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "55", self.ParamList());
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "56", self.ParamList());
            }


            sessionStorage.invSelect = "";
            $('#param1').text(sessionStorage.ace == "null" ? "انتخاب نشده است" : sessionStorage.ace);
            $('#param2').text(sessionStorage.group == "null" ? "انتخاب نشده است" : sessionStorage.group);
            $('#param3').text(sessionStorage.sal == "null" ? "انتخاب نشده است" : sessionStorage.sal);
            $('#param4').text(sessionStorage.BeginDate == "null" ? "انتخاب نشده است" : sessionStorage.BeginDate);
            $('#param5').text(sessionStorage.EndDate == "null" ? "انتخاب نشده است" : sessionStorage.EndDate);
            $('#param6').text(sessionStorage.Deghat == "null" ? "انتخاب نشده است" : sessionStorage.Deghat);
            $('#param7').text(sessionStorage.InvDefult == '' ? "انتخاب نشده است" : sessionStorage.InvDefult);
            $('#param8').text(sessionStorage.GPriceDefultS == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultS);
            $('#param9').text(sessionStorage.GPriceDefultP == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultP);
            $('#param10').text(sessionStorage.GPriceDefultI == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultI);

            //sessionStorage.GPriceDefultS == 0 ? sessionStorage.GPriceDefultS = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultS
            //sessionStorage.GPriceDefultP == 0 ? sessionStorage.GPriceDefultP = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultP
            //sessionStorage.GPriceDefultI == 0 ? sessionStorage.GPriceDefultI = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultI
        }
    });
}



function CheckAccess(TrsName) {
    //access = JSON.parse(localStorage.getItem("Access"));//localStorage.getItem("Access");
    if (access[0].TrsName == 'ADMIN') {
        return true;
    }
    else {
        for (var i = 0; i < access.length; i++) {
            if (access[i].TrsName == TrsName)
                return true;
        }
    }
    return false
}


function CheckAccessReport(Code) {
    if (access[0].TrsName == 'ADMIN') {
        return true;
    }
    else {
        for (var i = 0; i < accessReport.length; i++) {
            if (accessReport[i].Code == Code)
                return accessReport[i].Trs;
        }
    }
    return false;
}


function CheckAccessReportErj(Code) {
    if (access[0].TrsName == 'ADMIN') {
        return true;
    }
    else {
        for (var i = 0; i < accessReportErj.length; i++) {
            if (accessReportErj[i].Code == Code)
                return accessReportErj[i].Trs;
        }
    }
    return false;
}


function FindTextField(field, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].Code == field && data[i].Visible == 1) {
            return data[i].Name;
        }
    }
    return 0;
}

/*
function GetNameField(Code, InOut) {
    for (var i = 0; i < FldNames.length; i++) {
        if (FldNames[i].Code == Code && FldNames[i].InOut == InOut ) {
            return FldNames[i].Name;
        }
    }
    return '';
}
 
function GetShowField(Code, InOut) {
    for (var i = 0; i < FldNames.length; i++) {
        if (FldNames[i].Code == Code && FldNames[i].InOut == InOut) {
            return FldNames[i].Visible;
        }
    }
    return 0;
}
*/

//Get Access List
function getAccessList() {

    AccountUri = sessionStorage.serverAccount + 'Account/'; // آدرس حساب
    ajaxFunctionAccount(AccountUri + localStorage.getItem("userNameAccount") + '/' +
        localStorage.getItem("passAccount"), 'GET').done(function (data) {
            if (data === null) {
                return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
            }
            else {
                serverAddress = data.AddressApi;

                afi1List = data.AFI1_Group;
                afi8List = data.AFI8_Group;
                erjList = data.ERJ_Group;

                afi1Access = data.AFI1_Access;
                afi8Access = data.AFI8_Access;
                erjAccess = data.ERJ_Access;

                localStorage.setItem('afi1List', afi1List);
                localStorage.setItem('afi8List', afi8List);
                localStorage.setItem('erjList', erjList);

                localStorage.setItem('afi1Access', afi1Access);
                localStorage.setItem('afi8Access', afi8Access);
                localStorage.setItem('erjAccess', erjAccess);





                if (sessionStorage.ace == 'Web1') {
                    afi1Access != null ? afiAccessApi = afi1Access.split("*") : afiAccessApi = null
                }
                else {
                    afi8Access != null ? afiAccessApi = afi8Access.split("*") : afiAccessApi = null
                }

                afiaccess = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

                for (var i = 0; i <= 27; i++) {
                    afiAccessApi[i] == 'SFCT' ? afiaccess[0] = true : null;
                    afiAccessApi[i] == 'SPFCT' ? afiaccess[1] = true : null;
                    afiAccessApi[i] == 'SRFCT' ? afiaccess[2] = true : null;
                    afiAccessApi[i] == 'PFCT' ? afiaccess[3] = true : null;

                    afiAccessApi[i] == 'PPFCT' ? afiaccess[4] = true : null;
                    afiAccessApi[i] == 'PRFCT' ? afiaccess[5] = true : null;
                    afiAccessApi[i] == 'IIDOC' ? afiaccess[6] = true : null;
                    afiAccessApi[i] == 'IODOC' ? afiaccess[7] = true : null;
                    afiAccessApi[i] == 'TrzIKala' ? afiaccess[8] = true : null;
                    afiAccessApi[i] == 'TrzIKalaExf' ? afiaccess[9] = true : null;
                    afiAccessApi[i] == 'IDocR' ? afiaccess[10] = true : null;
                    afiAccessApi[i] == 'FDocR_S' ? afiaccess[11] = true : null;
                    afiAccessApi[i] == 'FDocR_P' ? afiaccess[12] = true : null;
                    afiAccessApi[i] == 'TrzAcc' ? afiaccess[13] = true : null;
                    afiAccessApi[i] == 'Dftr' ? afiaccess[14] = true : null;
                    afiAccessApi[i] == 'ADocR' ? afiaccess[15] = true : null;
                    afiAccessApi[i] == 'TChk' ? afiaccess[16] = true : null;
                    afiAccessApi[i] == 'TrzFKala_S' ? afiaccess[17] = true : null;
                    afiAccessApi[i] == 'TrzFKala_P' ? afiaccess[18] = true : null;
                    afiAccessApi[i] == 'TrzFCust_S' ? afiaccess[19] = true : null;
                    afiAccessApi[i] == 'TrzFCust_P' ? afiaccess[20] = true : null;
                    afiAccessApi[i] == 'ADOC' ? afiaccess[21] = true : null;
                    afiAccessApi[i] == 'SFORD' ? afiaccess[22] = true : null;
                    afiAccessApi[i] == 'SHVL' ? afiaccess[23] = true : null;
                    afiAccessApi[i] == 'SEXT' ? afiaccess[24] = true : null;
                    afiAccessApi[i] == 'PFORD' ? afiaccess[25] = true : null;
                    afiAccessApi[i] == 'Krdx' ? afiaccess[26] = true : null;
                }

                erjaccess = [false, false]

                if (CheckGroupErj(sessionStorage.group) == true) {
                    for (var i = 0; i < 2; i++) {
                        erjAccessApi[i] == 'ErjDocK' ? erjaccess[1] = true : null;
                        erjAccessApi[i] == 'ErjDocB_Last' ? erjaccess[1] = true : null;
                    }

                    ajaxFunction(AccessUri + 'Web2' + '/' + sessionStorage.group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                        self.AccessList(data);
                        if (self.AccessList().length > 0) {
                            localStorage.setItem('AccessErj', JSON.stringify(data));
                            accssErj = JSON.parse(localStorage.getItem("AccessErj"));

                            ajaxFunction(AccessReportErjUri + 'Web2' + '/' + sessionStorage.group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                                self.AccessListReport(data);
                                if (self.AccessListReport().length > 0) {
                                    localStorage.setItem('AccessReportErj', JSON.stringify(data));
                                    accessReportErj = JSON.parse(localStorage.getItem("AccessReportErj"));
                                    SetValidationErj();
                                }
                            });
                        }
                    });


                }

                ajaxFunction(AccessUri + sessionStorage.ace + '/' + sessionStorage.group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                    self.AccessList(data);
                    if (self.AccessList().length > 0) {
                        localStorage.setItem('Access', JSON.stringify(data));
                        //if (sessionStorage.userName == 'ACE') {
                        //    localStorage.setItem('Access', 1);
                        //} else {
                        access = JSON.parse(localStorage.getItem("Access"));
                        //}


                        ajaxFunction(AccessReportUri + sessionStorage.ace + '/' + sessionStorage.group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                            self.AccessListReport(data);
                            if (self.AccessListReport().length > 0) {
                                localStorage.setItem('AccessReport', JSON.stringify(data));
                                accessReport = JSON.parse(localStorage.getItem("AccessReport"));
                                SetValidation();
                                window.location.href = sessionStorage.urlIndex;
                            }
                        });
                    }
                });


            }
        });
}

SetValidation();
SetValidationErj();

function SetValidation() {
    var ShowMenu = [false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false];
    if (access == null) return false;
    if (access.length == 0) return false;
    sessionStorage.userName == 'ACE' ? access[0].TrsName = 'ADMIN' : null
    //sessionStorage.userName == 'ACE' ? access[0].TrsName = 'ADMIN' : null
    if (access[0].TrsName == 'ADMIN') {
        if (sessionStorage.userName == 'ACE')
            $('#TextNoUser').text('مدیر سیستم');
        else
            $('#TextNoUser').text('مدیر');
    }
    else
        $('#TextNoUser').text('کاربر');

    $('#persionUserName').text(sessionStorage.userName);

    /*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
        afiaccess[2] == 0 && afiaccess[3] == 0 &&
        afiaccess[4] == 0 && afiaccess[5] == 0)
        $("#FDOC_Menu").hide();
    else
        $("#FDOC_Menu").show();
 
 
    if (afiaccess[6] == 0 && afiaccess[7] == 0)
        $("#IDOC_Menu").hide();
    else
        $("#IDOC_Menu").show();*/

    validation = CheckAccess('DOC'); //ثبت اسناد
    ShowMenu[0] = validation;

    validation = CheckAccess('ADOC'); //اسناد حسابداری
    ShowMenu[25] = validation;

    validation = CheckAccess('FSDOC'); //اسناد فروش
    ShowMenu[1] = validation;

    validation = CheckAccess('FPDOC'); // اسناد خرید
    ShowMenu[2] = validation;

    validation = CheckAccess('RPRT'); // گزارشات
    ShowMenu[11] = validation;

    validation = CheckAccessReport('TrzIKala');
    ShowMenu[12] = validation;  // گزارش موجودی کالا

    validation = CheckAccessReport('TrzIKalaExf');
    ShowMenu[13] = validation;  // گزارش موجودی کالا به تفکیک ویژگیها

    validation = CheckAccessReport('IDocR');
    ShowMenu[14] = validation;  // گزارش ريز گردش اسناد انبارداری 

    validation = CheckAccessReport('FDocR_S');
    ShowMenu[15] = validation;  // گزارش ريز گردش خرید و فروش

    validation = CheckAccessReport('FDocR_P');
    ShowMenu[16] = validation;  // گزارش ريز گردش خرید و فروش

    validation = CheckAccessReport('TrzAcc');
    ShowMenu[17] = validation;  // تراز دفاتر حسابداری

    validation = CheckAccessReport('Dftr');
    ShowMenu[18] = validation;  // دفتر حساب حسابداری 

    validation = CheckAccessReport('ADocR');
    ShowMenu[19] = validation;  // دفتر حساب روزنامه

    validation = CheckAccessReport('TChk');
    ShowMenu[20] = validation;  // صورت ریز چک  

    validation = CheckAccessReport('TrzFKala_S');
    ShowMenu[21] = validation;  // صورت ریز چک   

    validation = CheckAccessReport('TrzFKala_P');
    ShowMenu[22] = validation;  // صورت ریز چک 

    validation = CheckAccessReport('TrzFCust_S');
    ShowMenu[23] = validation;  // تراز فروش به خریداران 

    validation = CheckAccessReport('TrzFCust_P');
    ShowMenu[24] = validation;  // تراز خرید از فروشندگان

    validation = CheckAccessReport('Krdx');
    ShowMenu[30] = validation;  // گزارش کاردکس



    /*  if (accessReport[i].Code == 'TrzIKala') {
          return accessReport[i].Trs;
      }
      else if (accessReport[i].Code == 'TrzIKalaExf') {
          return accessReport[i].Trs;
      }
      else if (accessReport[i].Code == 'IDocR') {
          return accessReport[i].Trs;
      }
      else if (accessReport[i].Code == 'FDocR') {
          return accessReport[i].Trs;
      }*/


    // سند حسابداری
    if (sessionStorage.ModeCode == 'ADOC') {
        validation = CheckAccess('NEW_ADOC');// new Sanad Hesab
        validation == true ? $("#AddNewSanad").show() : $("#AddNewSanad").hide()
        sessionStorage.moveSanad = validation;

        validation = CheckAccess('CHG_ADOC');// edit Sanad Hesab
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
        validation == true ? $("#UpdateSanad").show() : $("#UpdateSanad").hide()

        validation = CheckAccess('DEL_ADOC'); // delete Sanad Hesab
        validation == true ? $("#DeleteSanad").show() : $("#DeleteSanad").hide()
        validation == true ? sessionStorage.DEL_ADOC = true : sessionStorage.DEL_ADOC = false


        validation = CheckAccess('OTHERUSER_VIEW_ADOC');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        //validation = CheckAccess('PRN_ADOC'); // Print Sanad Hesab
        //validation == true ? $("#").show() : $("#").hide()

        validation = CheckAccess('OTHERUSER_CHG_ADOC');// AccessViewADoc
        if (validation == true) {
            sessionStorage.AccessViewSanad = true;
        }
        else {
            sessionStorage.AccessViewSanad = false;
        }
    }



    validation = CheckAccess('SFORD');
    ShowMenu[26] = validation;  // سفارش فروش

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SO) {
        validation = CheckAccess('NEW_SFORD');// new sefaresh forosh
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_SFORD');// edit sefaresh forosh
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation = CheckAccess('DEL_SFORD'); // delete sefaresh forosh
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SFORD = true : sessionStorage.DEL_SFORD = false

        validation = CheckAccess('OTHERUSER_VIEW_SFORD');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_SFORD');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewSefareshForosh = true;
        }
        else {
            sessionStorage.AccessViewSefareshForosh = false;
        }
    }



    validation = CheckAccess('SPDOC');
    ShowMenu[3] = validation;  // پیش فاکتور قروش
    //sessionStorage.AccessSanad = true; // بعد از ایجاد دسترسی پاک شود

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SP) {
        validation = CheckAccess('NEW_SPDOC');// new pish Factor forosh
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_SPDOC');// edit pish Factor forosh
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_SPDOC'); // delete pish Factor forosh
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SPDOC = true : sessionStorage.DEL_SPDOC = false

        validation = CheckAccess('OTHERUSER_VIEW_SPDOC');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        //validation = CheckAccess('PRN_SPDOC'); // Print pish Factor forosh
        //validation == true ? $("#").show() : $("#").hide()

        //validation = CheckAccess('AccessSanad_SPDOC');// AccessSanad
        //validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_SPDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewPishFactorForosh = true;
        }
        else {
            sessionStorage.AccessViewPishFactorForosh = false;
        }
    }

    // OTHERUSER_SDOC

    validation = CheckAccess('SDOC_');
    ShowMenu[4] = validation;  //  فاکتور قروش

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_S) {
        validation = CheckAccess('NEW_SDOC');// new Factor forosh
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_SDOC');// edit Factor forosh
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()


        validation = CheckAccess('DEL_SDOC'); // delete Factor forosh
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SDOC = true : sessionStorage.DEL_SDOC = false

        //validation = CheckAccess('PRN_SDOC'); // Print Factor forosh
        //validation == true ? $("#").show() : $("#").hide()

        validation = CheckAccess('OTHERUSER_VIEW_SDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        //sessionStorage.AccessSanad = true;

        validation = CheckAccess('OTHERUSER_CHG_SDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewFactorForosh = true;
        }
        else {
            sessionStorage.AccessViewFactorForosh = false;
        }
    }

    validation = CheckAccess('SRDOC');
    ShowMenu[5] = validation;  // برگشت فاکتور قروش

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR) {
        validation = CheckAccess('NEW_SRDOC');// new back Factor forosh
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_SRDOC');// edit back Factor forosh
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_SRDOC'); // delete back Factor forosh
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SRDOC = true : sessionStorage.DEL_SRDOC = false
        //validation = CheckAccess('PRN_SRDOC'); // Print back Factor forosh
        //validation == true ? $("#").show() : $("#").hide()
        validation = CheckAccess('OTHERUSER_VIEW_SRDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false


        validation = CheckAccess('OTHERUSER_CHG_SRDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewBackFactorForosh = true;
        }
        else {
            sessionStorage.AccessViewBackFactorForosh = false;
        }
    }


    validation = CheckAccess('SHVL');
    ShowMenu[27] = validation;  // حواله فروش

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SH) {
        validation = CheckAccess('NEW_SHVL');// new 
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_SHVL');// edit
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_SHVL'); // delete 
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SHVL = true : sessionStorage.DEL_SHVL = false

        validation = CheckAccess('OTHERUSER_VIEW_SHVL');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_SHVL');
        if (validation == true) {
            sessionStorage.AccessViewHavaleForosh = true;
        }
        else {
            sessionStorage.AccessViewHavaleForosh = false;
        }
    }


    validation = CheckAccess('SEXT');
    ShowMenu[28] = validation;  //برگه خروج 

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SE) {
        validation = CheckAccess('NEW_SEXT');// new 
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_SEXT');// edit 
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_SEXT'); // delete 
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_SEXT = true : sessionStorage.DEL_SEXT = false

        validation = CheckAccess('OTHERUSER_VIEW_SEXT');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_SEXT');
        if (validation == true) {
            sessionStorage.AccessViewBargeKhoroj = true;
        }
        else {
            sessionStorage.AccessViewBargeKhoroj = false;
        }
    }


    validation = CheckAccess('PFORD');
    ShowMenu[29] = validation;  // سفارش خرید

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PO) {
        validation = CheckAccess('NEW_PFORD');// new
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_PFORD');// edit
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_PFORD'); // delete
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_PFORD = true : sessionStorage.DEL_PFORD = false

        validation = CheckAccess('OTHERUSER_VIEW_PFORD');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_PFORD');
        if (validation == true) {
            sessionStorage.AccessViewSefareshKharid = true;
        }
        else {
            sessionStorage.AccessViewSefareshKharid = false;
        }
    }



    validation = CheckAccess('PPDOC');
    ShowMenu[6] = validation;  // پیش فاکتور خرید

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PP) {
        validation = CheckAccess('NEW_PPDOC');// new pish Factor kharid
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_PPDOC');// edit pish Factor kharid
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_PPDOC'); // delete pish Factor kharid
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_PPDOC = true : sessionStorage.DEL_PPDOC = false
        //validation = CheckAccess('PRN_PPDOC'); // Print pish Factor kharid
        //validation == true ? $("#").show() : $("#").hide()
        //validation = CheckAccess('OTHERUSER_PPDOC');// AccessSanad
        //validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_VIEW_SRDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_PPDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewPishFactorKharid = true;
        }
        else {
            sessionStorage.AccessViewPishFactorKharid = false;
        }
    }

    validation = CheckAccess('PDOC_');
    ShowMenu[7] = validation;  //  فاکتور خرید

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_P) {
        validation = CheckAccess('NEW_PDOC');// new Factor kharid
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_PDOC');// edit Factor kharid
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_PDOC'); // delete Factor kharid
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_PDOC = true : sessionStorage.DEL_PDOC = false
        //validation = CheckAccess('PRN_PDOC'); // Print Factor kharid
        //validation == true ? $("#").show() : $("#").hide()

        validation = CheckAccess('OTHERUSER_VIEW_PDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_PDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewFactorKharid = true;
        }
        else {
            sessionStorage.AccessViewFactorKharid = false;
        }
    }


    validation = CheckAccess('PRDOC');
    ShowMenu[8] = validation;  // برگشت فاکتور خرید

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PR) {
        validation = CheckAccess('NEW_PRDOC');// new back Factor kharid
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        sessionStorage.moveFactor = validation;

        validation = CheckAccess('CHG_PRDOC');// edit back Factor kharid
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false


        validation = CheckAccess('DEL_PRDOC'); // delete back Factor kharid
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        validation == true ? sessionStorage.DEL_PRDOC = true : sessionStorage.DEL_PRDOC = false

        //validation = CheckAccess('PRN_PRDOC'); // Print back Factor kharid
        //validation == true ? $("#").show() : $("#").hide()
        validation = CheckAccess('OTHERUSER_VIEW_PRDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_PRDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewBackFactorKharid = true;
        }
        else {
            sessionStorage.AccessViewBackFactorKharid = false;
        }
    }



    validation = CheckAccess('IIDOC');
    ShowMenu[9] = validation;  // وارده انبار

    if (sessionStorage.ModeCode == '' && sessionStorage.InOut == 1) {
        validation = CheckAccess('NEW_IIDOC');// new varedae anbar
        validation == true ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide()
        sessionStorage.moveSanadAnbar = validation;

        validation = CheckAccess('CHG_IIDOC');// edit varedae anbar
        validation == true ? $("#UpdateSanadAnbar").show() : $("#UpdateSanadAnbar").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_IIDOC'); // delete varedae anbar
        validation == true ? $("#DeleteSanadAnbar").show() : $("#DeleteSanadAnbar").hide()
        validation == true ? sessionStorage.DEL_IIDOC = true : sessionStorage.DEL_IIDOC = false
        //validation = CheckAccess('PRN_IIDOC'); // Print varedae anbar
        //validation == true ? $("#").show() : $("#").hide()


        validation = CheckAccess('OTHERUSER_VIEW_IIDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_IIDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewSanadAnbarVarede = true;
        }
        else {
            sessionStorage.AccessViewSanadAnbarVarede = false;
        }
    }

    validation = CheckAccess('IODOC');
    ShowMenu[10] = validation;  // صادره انبار

    if (sessionStorage.ModeCode == '' && sessionStorage.InOut == 2) {
        validation = CheckAccess('NEW_IODOC');// new sadere anbar
        validation == true ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide()
        sessionStorage.moveSanadAnbar = validation;


        validation = CheckAccess('CHG_IODOC');// edit sadere anbar
        validation == true ? $("#UpdateSanadAnbar").show() : $("#UpdateSanadAnbar").hide()
        validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false

        validation = CheckAccess('DEL_IODOC'); // delete sadere anbar
        validation == true ? $("#DeleteSanadAnbar").show() : $("#DeleteSanadAnbar").hide()
        validation == true ? sessionStorage.DEL_IODOC = true : sessionStorage.DEL_IODOC = false
        //validation = CheckAccess('PRN_IODOC'); // print sadere anbar
        // validation == true ? $("#").show() : $("#").hide()

        validation = CheckAccess('OTHERUSER_VIEW_IODOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('OTHERUSER_CHG_IODOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewSanadAnbarSadere = true;
        }
        else {
            sessionStorage.AccessViewSanadAnbarSadere = false;
        }

    }

    if (access[0].TrsName == 'ADMIN') {
        sessionStorage.AccessSanad = true;
        //sessionStorage.AccessViewSanadAnbarVarede = true;
    }

    if (ShowMenu[0]) {
        if (afiaccess[21] == true) {
            if (ShowMenu[25]) {
                $("#ADOC_Menu").show();
                (ShowMenu[25] == true) && (afiaccess[21] == true) ? $("#ADOC").show() : $("#ADOC").hide();
            }
            else {
                $("#ADOC_Menu").hide();
            }
        }
        else {
            $("#ADOC_Menu").hide();
        }




        if (afiaccess[0] == true || afiaccess[1] == true || afiaccess[2] == true || afiaccess[3] == true || afiaccess[4] == true || afiaccess[5] == true
            || afiaccess[22] == true || afiaccess[23] == true || afiaccess[24] == true || afiaccess[25] == true) {
            if (ShowMenu[1] || ShowMenu[2]) {
                if (ShowMenu[3] || ShowMenu[4] || ShowMenu[5] || ShowMenu[6] || ShowMenu[7] || ShowMenu[8] || ShowMenu[26] || ShowMenu[27] || ShowMenu[28] || ShowMenu[29]) {
                    $("#FDOC_Menu").show();
                    (ShowMenu[3] == true) && (afiaccess[0] == true) ? $("#FDOC_SP").show() : $("#FDOC_SP").hide();
                    (ShowMenu[4] == true) && (afiaccess[1] == true) ? $("#FDOC_S").show() : $("#FDOC_S").hide();
                    (ShowMenu[5] == true) && (afiaccess[2] == true) ? $("#FDOC_SR").show() : $("#FDOC_SR").hide();
                    (ShowMenu[6] == true) && (afiaccess[3] == true) ? $("#FDOC_PP").show() : $("#FDOC_PP").hide();
                    (ShowMenu[7] == true) && (afiaccess[4] == true) ? $("#FDOC_P").show() : $("#FDOC_P").hide();
                    (ShowMenu[8] == true) && (afiaccess[5] == true) ? $("#FDOC_PR").show() : $("#FDOC_PR").hide();

                    (ShowMenu[26] == true) && (afiaccess[22] == true) ? $("#FDOC_SO").show() : $("#FDOC_SO").hide(); //سفارش فروش
                    (ShowMenu[27] == true) && (afiaccess[23] == true) ? $("#FDOC_SH").show() : $("#FDOC_SH").hide(); //حواله فروش
                    (ShowMenu[28] == true) && (afiaccess[24] == true) ? $("#FDOC_SE").show() : $("#FDOC_SE").hide(); //برگه خروج
                    (ShowMenu[29] == true) && (afiaccess[25] == true) ? $("#FDOC_PO").show() : $("#FDOC_PO").hide();// سفارش خرید 
                }
                else {
                    $("#FDOC_Menu").hide();
                }
            }
            else {
                $("#FDOC_Menu").hide();
            }
        }
        else {
            $("#FDOC_Menu").hide();
        }


        if (afiaccess[6] == true || afiaccess[7] == true) {
            if (ShowMenu[9] || ShowMenu[10]) {
                $("#IDOC_Menu").show();
                (ShowMenu[9] == true) && (afiaccess[6] == true) ? $("#IDOC_I").show() : $("#IDOC_I").hide();
                (ShowMenu[10] == true) && (afiaccess[7] == true) ? $("#IDOC_O").show() : $("#IDOC_O").hide();
            }
            else {
                $("#IDOC_Menu").hide();
            }
        }
        else {
            $("#IDOC_Menu").hide();
        }
    }
    else {
        $("#ADOC_Menu").hide();
        $("#FDOC_Menu").hide();
        $("#IDOC_Menu").hide();
    }

    if (ShowMenu[11]) {    // گزارشات
        if (afiaccess[8] || afiaccess[9] || afiaccess[10] || afiaccess[26]) {
            $("#IReport_Menu").show();
            afiaccess[8] && ShowMenu[12] ? $("#TrzIKala").show() : $("#TrzIKala").hide();
            afiaccess[9] && ShowMenu[13] ? $("#TrzIKalaExf").show() : $("#TrzIKalaExf").hide();
            afiaccess[10] && ShowMenu[14] ? $("#IDocR").show() : $("#IDocR").hide();
            afiaccess[26] && ShowMenu[30] ? $("#Krdx").show() : $("#Krdx").hide();

            if (ShowMenu[12] == false && ShowMenu[13] == false && ShowMenu[14] == false && ShowMenu[30] == false)
                $("#IReport_Menu").hide();
        }
        else {
            $("#IReport_Menu").hide();
        }

        if (afiaccess[11] || afiaccess[12]) {
            $("#FReport_Menu").show();
            afiaccess[11] && ShowMenu[15] ? $("#FDocR_S").show() : $("#FDocR_S").hide();
            afiaccess[12] && ShowMenu[16] ? $("#FDocR_P").show() : $("#FDocR_P").hide();
            afiaccess[17] && ShowMenu[21] ? $("#TrzFKala_S").show() : $("#TrzFKala_S").hide();
            afiaccess[18] && ShowMenu[22] ? $("#TrzFKala_P").show() : $("#TrzFKala_P").hide();
            afiaccess[19] && ShowMenu[23] ? $("#TrzFCust_S").show() : $("#TrzFCust_S").hide();
            afiaccess[20] && ShowMenu[24] ? $("#TrzFCust_P").show() : $("#TrzFCust_P").hide();


            if (ShowMenu[15] == false && ShowMenu[16] == false)
                $("#FReport_Menu").hide();
        }
        else {
            $("#FReport_Menu").hide();
        }

        if (afiaccess[13] || afiaccess[14] || afiaccess[15] || afiaccess[16]) {
            $("#AReport_Menu").show();
            afiaccess[13] && ShowMenu[17] == true ? $("#TrzAcc").show() : $("#TrzAcc").hide();
            afiaccess[14] && ShowMenu[18] == true ? $("#Dftr").show() : $("#Dftr").hide();
            afiaccess[15] && ShowMenu[19] == true ? $("#ADocR").show() : $("#ADocR").hide();
            afiaccess[16] && ShowMenu[20] == true ? $("#TChk").show() : $("#TChk").hide();

            if (ShowMenu[17] == false && ShowMenu[18] == false && ShowMenu[19] == false)
                $("#AReport_Menu").hide();
        }
        else {
            $("#AReport_Menu").hide();
        }
    }

    // window.location.href = sessionStorage.urlIndex;

    /*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
   afiaccess[2] == 0 && afiaccess[3] == 0 &&
   afiaccess[4] == 0 && afiaccess[5] == 0)
   $("#FDOC_Menu").hide();
else
   $("#FDOC_Menu").show();
 
 
if (afiaccess[6] == 0 && afiaccess[7] == 0)
   $("#IDOC_Menu").hide();
else
   $("#IDOC_Menu").show();*/

}


function SetValidationErj() {
    var ShowMenuErj = [false, false];
    if (accessErj == null) return false;
    if (accessErj.length == 0) return false;


    if (sessionStorage.userName == 'ACE')
        accessErj[0].TrsName = 'ADMIN';

    if (access[0].TrsName == 'ADMIN')
        sessionStorage.userModeErj = 'ADMIN';
    else
        sessionStorage.userModeErj = 'USER';



    if (accessErj[0].Trs == 0) {
        sessionStorage.AccessSanadErj = true;
    }

    validation = CheckAccessReportErj('ErjDocK');
    ShowMenuErj[1] = validation;  // گزارش فهرست پرونده


    validation = CheckAccessReportErj('ErjDocErja');
    ShowMenuErj[2] = validation;  // گزارش فهرست ارجاعات


    if (ShowMenuErj[1] || ShowMenuErj[2]) {
        $("#EReport_Menu").show();
        ShowMenuErj[1] == true ? $("#ErjDocK").show() : $("#ErjDocK").hide();
        ShowMenuErj[2] == true ? $("#ErjDocB_Last").show() : $("#ErjDocB_Last").hide();
    }
    else {
        $("#EReport_Menu").hide();
    }


}


$("#ADOC").click(function () {
    sessionStorage.ModeCode = 'ADOC';
});

$("#FDOC_SO").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SO;
    sessionStorage.InOut = 2; // فروش
});

$("#FDOC_SP").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SP;
    sessionStorage.InOut = 2; // فروش
});

$("#FDOC_S").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_S;
    sessionStorage.InOut = 2;// فروش
});

$("#FDOC_SR").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SR;
    sessionStorage.InOut = 2;// فروش
});

$("#FDOC_SH").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SH;
    sessionStorage.InOut = 2;// فروش
});

$("#FDOC_SE").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SE;
    sessionStorage.InOut = 2;// فروش
});

$("#FDOC_PO").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PO;
    sessionStorage.InOut = 1;// خرید
});

$("#FDOC_PP").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PP;
    sessionStorage.InOut = 1;// خرید
});

$("#FDOC_P").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_P;
    sessionStorage.InOut = 1;// خرید
});

$("#FDOC_PR").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PR;
    sessionStorage.InOut = 1;// خرید
});

$("#IDOC_I").click(function () {
    sessionStorage.ModeCode = '';
    sessionStorage.InOut = 1;
});

$("#IDOC_O").click(function () {
    sessionStorage.ModeCode = '';
    sessionStorage.InOut = 2;
});


//MODECODE_IDOC_AVAL = 101 'موجودي اول دوره';
//MODECODE_IDOC_I: 102 'رسيد ورود به انبار';
//MODECODE_IDOC_ISR: 103 'برگشت فروش به انبار';
//MODECODE_IDOC_IMOVE: 106  'انتقال به انبار';
//MODECODE_IDOC_IP: 108 'رسيد خريد';
//MODECODE_IDOC_IMAHSOOL: 110 'رسيد محصول';

//MODECODE_IDOC_O: 104 'حواله خروج از انبار';
//MODECODE_IDOC_OPR: 105 'برگشت خريد از انبار';
//MODECODE_IDOC_OMOVE: 107 'انتقال از انبار';
//MODECODE_IDOC_OS: 109 'حواله فروش';
//MODECODE_IDOC_OMAVAD: 111 'حواله مواد';
var DateNow;
function ShamsiDate() {
    d = new Date();
    date = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate(), 'Short');
    date.jm <= 9 ? mah = '0' + date.jm : mah = date.jm;
    date.jd <= 9 ? day = '0' + date.jd : day = date.jd;
    temp = date.jy + '/' + mah + '/' + day;
    DateNow = temp;
    return temp;
}



function showNotification(text, colorNumber) {

    placementFrom = sessionStorage.placementFrom;
    placementAlign = sessionStorage.placementAlign;
    animateEnter = sessionStorage.animateEnter;
    animateExit = sessionStorage.animateExit;
    if (colorNumber == 0)
        colorName = 'alert-danger';
    else if (colorNumber == 1)
        colorName = 'alert-success';
    else if (colorNumber == 2)
        colorName = 'alert-warning';
    else if (colorNumber == 3)
        colorName = 'alert-info';


    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'خطای برنامه نویسی : متن هشدار وارد نشده است'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;

    $.notify({
        message: text
    },
        {
            type: colorName,
            allow_dismiss: allowDismiss,
            newest_on_top: true,
            timer: 1000,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            animate: {
                enter: animateEnter,
                exit: animateExit
            },
            template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
}

/*$(function () {
    //Textare auto growth
    autosize($('textarea.auto-growth'));
 
    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY - HH:mm',
        clearButton: true,
        rtl: true,
        weekStart: 1
    });
 
    $('.datepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('.datepicker2').bootstrapMaterialDatePicker({
        format: 'DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        rtl: true,
        time: false
    });
 
    $('.timepicker').bootstrapMaterialDatePicker({
        format: 'HH:mm',
        clearButton: true,
        rtl: true,
        date: false
    });
 
    $('input#input_text, textarea#textarea2').characterCounter();
});*/


/*
 
$("#ace0").click(function () {
    $("#group").empty();
    $("#sal").empty();
    $.ajax({
        type: 'POST',
        url: '/Home/GetGroup',//'@Url.Action("GetGroup")',//نام تابع با خروجی جیسون
        dataType: 'json',
        data: { ace: $("#ace").val() },
        success: function (mems) {
            $.each(mems, function (i, member) {
                $("#group").append('<option value="'
                    + member.Value + '">'
                    + member.Text + '</option>');
            });
        },
        error: function (ex) {
            Swal.fire({ type: 'info', title: 'توجه', text: 'انتخاب نرم افزار اجباری است' });
        }
    });
});
 
 
$("#group0").click(function () {
    var ace = $("#ace").val();
    var group = $("#group").val();
    $("#sal").empty();
    ajaxFunction(DatabseSalUrl + ace + '/' + group, 'GET').done(function (data) {
        self.DatabseSalList(data);
        if (self.DatabseSalList().length > 0) {
 
            for (var i = 1; i < self.DatabseSalList().length + 1; i++) {
                var sal = self.DatabseSalList()[i - 1];
                $("#sal").append('<option value="'
                    + sal.Name + '">'
                    + sal.Name + '</option>');
            }
 
        }//else{
        //    Swal.fire({ type: 'info', title: 'توجه', text: 'انتخاب نرم افزار اجباری است' });
        //}
    });
});
*/



$('#ADOC_Menu').click(function () {
    sessionStorage.SelectMenu = 0;
});

$('#FDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 1;
});

$('#IDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 2;
});

$('#AReport_Menu').click(function () {
    sessionStorage.SelectMenu = 3;
});

$('#FReport_Menu').click(function () {
    sessionStorage.SelectMenu = 4;
});

$('#IReport_Menu').click(function () {
    sessionStorage.SelectMenu = 5;
});


$('#EReport_Menu').click(function () {
    sessionStorage.SelectMenu = 6;
});

$('#ADOC_Menu').removeAttr('class');
$('#FDOC_Menu').removeAttr('class');
$('#IDOC_Menu').removeAttr('class');
$('#AReport_Menu').removeAttr('class');
$('#IReport_Menu').removeAttr('class');
$('#FReport_Menu').removeAttr('class');
$('#EReport_Menu').removeAttr('class');

if (sessionStorage.SelectMenu == 0) {
    $('#ADOC_Menu').attr('class', 'active');
}

if (sessionStorage.SelectMenu == 1) {
    $('#FDOC_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 2) {
    $('#IDOC_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 3) {
    $('#AReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 4) {
    $('#FReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 5) {
    $('#IReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 6) {
    $('#EReport_Menu').attr('class', 'active');
}


$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
    });
};






var counterColumn;

function CreateTableColumn(data) {
    var cols = '';
    $("#TableColumn").empty();

    for (var i = 1; i <= data.length; i++) {
        cols += ' <tr id="PanelColumns' + i + '"> ' +
            '    <td id="RowColumns' + i + '"></td> ' +
            '    <td id="TextColumns' + i + '"></td> ' +
            '    <td style="padding: 0px 10px;text-align: left;"> ' +
            '        <input id = "SettingColumns' + i + '" type = "checkbox" />' +
            '    </td > ' +
            '</tr> '
    }

    $('#TableColumn').append(
        cols
    );
}


/*function CreateTableColumn(data) {
    var cols = '';
    $("#TableColumn").empty();

    for (var i = 1; i <= data.length; i++) {
        cols += ' <tr id="PanelColumns' + i + '"> ' +
            '    <td id="RowColumns' + i + '"></td> ' +
            '    <td id="TextColumns' + i + '"></td> ' +
            '    <td style="padding: 0px 10px;text-align: left;"> ' +
            '        <input id = "SettingColumns' + i + '" type = "checkbox" />' +
            '    </td > ' +
            '</tr> '
    }

    $('#TableColumn').append(
        ' <table class="table table-addmin">' +
        '   <thead style="cursor: pointer;">' +
        '       <tr>' +
        '           <td>ردیف</td>' +
        '           <td style="width:250px;"> نام ستون</td>' +
        '           <td style="text-align: left;padding: 0px 10px 0px 10px;"> ' +
        '                <label for="AllSettingColumns">انتخاب همه</label> ' +
        '                <input id="AllSettingColumns" type="checkbox" /> ' +
        '           </td> ' +
        '      </tr>' +
        '   </thead >' +
        ' <tbody>' +
        cols +
        ' </tbody>' +
        '</table >'
    );
}*/

function SetColumn(code, indexId, data) {
    var index = -1;
    var name = '';
    var user = '';
    for (i = 0; i < data.length; i++) {
        item = data[i];
        user = item.UserCode;
        if (item.Code == code) {
            index = i;
        }
    }
    if (index >= 0) {
        counterColumn++;
        name = data[index].Name;
        visible = data[index].Visible;
        findCode = code.search("Code");
        if (user == "*Default*" &&
            (
                (code.lastIndexOf("Code") > 0 && code != "AccCode" && code != "AccFullCode") ||
                code.lastIndexOf("Amount2") > 0 ||
                code.lastIndexOf("Amount3") > 0 ||
                code.lastIndexOf("UnitPrice2") > 0 ||
                code.lastIndexOf("UnitPrice3") > 0 ||

                code.lastIndexOf("UnitName2") > 0 ||
                code.lastIndexOf("UnitName3") > 0 ||

                code == "iAddMin1" ||
                code == "iAddMin2" ||
                code == "iAddMin3" ||

                code == "DimX" ||
                code == "DimY" ||
                code == "DimZ" ||

                code == "Amount" ||
                code == "Amount2" ||
                code == "Amount3" ||

                code == "UnitPrice2" ||
                code == "UnitPrice3" ||

                code == "CheckRadif" ||
                code == "CheckComm" ||
                code == "CheckVosoolDate" ||

                code == "Shobe" ||
                code == "Jari" ||
                code == "F01" ||
                code == "F02" ||
                code == "F03" ||
                code == "F04" ||
                code == "F05" ||
                code == "F06" ||
                code == "F07" ||
                code == "F08" ||
                code == "F09" ||
                code == "F10" ||
                code == "F11" ||
                code == "F12" ||
                code == "F13" ||
                code == "F14" ||
                code == "F15" ||
                code == "F16" ||
                code == "F17" ||
                code == "F18" ||
                code == "F19" ||
                code == "F20" ||

                code == "CustF01" ||
                code == "CustF02" ||
                code == "CustF03" ||
                code == "CustF04" ||
                code == "CustF05" ||
                code == "CustF06" ||
                code == "CustF07" ||
                code == "CustF08" ||
                code == "CustF09" ||
                code == "CustF10" ||
                code == "CustF11" ||
                code == "CustF12" ||
                code == "CustF13" ||
                code == "CustF14" ||
                code == "CustF15" ||
                code == "CustF16" ||
                code == "CustF17" ||
                code == "CustF18" ||
                code == "CustF19" ||
                code == "CustF20" ||

                code == "KalaF01" ||
                code == "KalaF02" ||
                code == "KalaF03" ||
                code == "KalaF04" ||
                code == "KalaF05" ||
                code == "KalaF06" ||
                code == "KalaF07" ||
                code == "KalaF08" ||
                code == "KalaF09" ||
                code == "KalaF10" ||
                code == "KalaF11" ||
                code == "KalaF12" ||
                code == "KalaF13" ||
                code == "KalaF14" ||
                code == "KalaF15" ||
                code == "KalaF16" ||
                code == "KalaF17" ||
                code == "KalaF18" ||
                code == "KalaF19" ||
                code == "KalaF20"
            )
        ) {
            visible = 0;
        }
        $('#RowColumns' + indexId).text(counterColumn);
        $('#TextColumns' + indexId).text(name);
        $('#SettingColumns' + indexId).prop('checked', visible == 1 ? true : false);
        $('#PanelColumns1').removeAttr('hidden', '');
    }
    else {
        $('#PanelColumns' + indexId).attr('hidden', '');
        $('#TextColumns' + indexId).text('تعریف نشده');
        $('#SettingColumns' + indexId).prop('checked', false);
        $('#RowColumns' + indexId).text(-1);
    }
}

function SaveColumn(ace, sal, group, rprtId, route, columns, data) {
    var obj = [];
    for (i = 1; i <= columns.length; i++) {
        item = data[i];
        $('#SettingColumns' + (i)).is(':checked') == true ? Visible = 1 : Visible = 0;
        tmp = {
            'UserCode': sessionStorage.userName,
            'RprtId': rprtId,
            'Code': columns[i - 1],
            'Visible': Visible,
        };
        obj.push(tmp);
    }

    $('#modal-SettingColumn').modal('hide');
    showNotification('در حال ذخیره تنظیمات ستون ها ...', 1);
    ajaxFunction(RprtColsSaveUri + ace + '/' + sal + '/' + group, 'POST', obj).done(function (response) {
    });
    window.location.href = route;
}

$('#LogOut').click(function () {
    sessionStorage.userName = '';
    sessionStorage.pass = '';

    localStorage.setItem("userName", '');
    localStorage.setItem('password', '');
    window.location.href = sessionStorage.urlLogin;
});

//report

var viewer = null;
var designer = null;
var options = null;
var report = null;
var dataSet = null;

function createViewer() {
    // var Stimulsoft = require('stimulsoft-reports-js');
    Stimulsoft.Base.Localization.StiLocalization.addLocalizationFile("/Content/Report/Lang/fa.xml", true, "persion (fa)");
    //Stimulsoft.Base.StiFontCollection(Stimulsoft.Base.StiFontCollection.getFontFamilies());

    /*Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BARABICS.ttf", "Karbord_ARABICS");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BArash.ttf", "Karbord_Arash");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BAria.ttf", "Karbord_Aria");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BARSHIA.ttf", "Karbord_ARSHIA");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BBadkonk.ttf", "Karbord_Badkonk");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BBADR.ttf", "Karbord_BADR");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BBADRBD.ttf", "Karbord_BADRBD");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BChini.ttf", "Karbord_Chini");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BChshmeh.ttf", "Karbord_Chshmeh");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BChshmhB.ttf", "Karbord_ChshmhB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BCOMPSET.ttf", "Karbord_COMPSET");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BCOMSETB.ttf", "Karbord_COMSETB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BDAVAT.ttf", "Karbord_DAVAT");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BELHAM.ttf", "Karbord_ELHAM");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BESFHNBD.ttf", "Karbord_ESFHNBD");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BFANTEZY.ttf", "Karbord_FANTEZY");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BFARNAZ.ttf", "Karbord_FARNAZ");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BFERDOSI.ttf", "Karbord_FERDOSI");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BHaleh.ttf", "Karbord_Haleh");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BHalehBd.ttf", "Karbord_HalehBd");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BHOMA.ttf", "Karbord_HOMA");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BJADIDBD.ttf", "Karbord_JADIDBD");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BJalal.ttf", "Karbord_Jalal");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BJalalBd.ttf", "Karbord_JalalBd");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BJohar.ttf", "Karbord_Johar");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKAMRAN.ttf", "Karbord_KAMRAN");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKAMRANB.ttf", "Karbord_KAMRANB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKAMRANO.ttf", "Karbord_KAMRANO");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKaveh.ttf", "Karbord_Kaveh");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKOODAKO.ttf", "Karbord_KOODAKO");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKOODB.ttf", "Karbord_KOODB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BKourosh.ttf", "Karbord_Kourosh");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BLOTUS.ttf", "Karbord_LOTUS");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BLOTUSB.ttf", "Karbord_LOTUSB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMahsa.ttf", "Karbord_Mahsa");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMAJIDSH.ttf", "Karbord_MAJIDSH");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMasjed.ttf", "Karbord_Masjed");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMedad.ttf", "Karbord_Medad");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMITRA.ttf", "Karbord_MITRA");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMITRABD.ttf", "Karbord_MITRABD");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMoj.ttf", "Karbord_Moj");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BMorvard.ttf", "Karbord_Morvard");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNarm.ttf", "Karbord_Narm");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNASIMB.ttf", "Karbord_NASIMB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNAZANB.ttf", "Karbord_NAZANB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BPaatcBd.ttf", "Karbord_PaatcBd");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BPaatch.ttf", "Karbord_Paatch");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BROYA.ttf", "Karbord_ROYA");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BROYABD.ttf", "Karbord_ROYABD");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSahra.ttf", "Karbord_Sahra");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSiavash.ttf", "Karbord_Siavash");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSINABD.ttf", "Karbord_SINABD");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSooreh.ttf", "Karbord_Sooreh");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSoorehB.ttf", "Karbord_SoorehB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BSorkhpu.ttf", "Karbord_Sorkhpu");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTABASSO.ttf", "Karbord_TABASSO");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTAWFIGO.ttf", "Karbord_TAWFIGO");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTRAFB.ttf", "Karbord_TRAFB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTRAFFIC.ttf", "Karbord_TRAFFIC");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BVahidBd.ttf", "Karbord_VahidBd");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BVosta.ttf", "Karbord_Vosta");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BVostaI.ttf", "Karbord_VostaI");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYAGB.ttf", "Karbord_YAGB");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYAGUT.ttf", "Karbord_YAGUT");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYas.ttf", "Karbord_Yas");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYasBd.ttf", "Karbord_YasBd");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTir.ttf", "Karbord_Tir");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZARBOLD.ttf", "Karbord_ZARBOLD");*/

    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZiba.ttf", "Karbord_Ziba");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZAR.ttf", "Karbord_ZAR");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYEKAN.ttf", "Karbord_YEKAN");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTITRBD.ttf", "Karbord_TITRBD");
    Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNAZANIN.ttf", "Karbord_NAZANIN");
    //Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("Vazir-FD-WOL.ttf", "Vazir-FD-WOL");

    options = new Stimulsoft.Viewer.StiViewerOptions();
    viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);



    options.appearance.showSystemFonts = false;
    options.height = "100%";
    options.appearance.fullScreenMode = true;
    options.appearance.scrollbarsMode = true;
    options.toolbar.showSaveButton = true;
    options.toolbar.showDesignButton = true;

    options.toolbar.showFullScreenButton = false;

    options.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Direct;
    options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;
    options.toolbar.zoom = 100;
    options.toolbar.showCloseButton = true;





    report = new Stimulsoft.Report.StiReport();
    viewer.onDesignReport = function (e) {
        this.visible = false;
        if (designer == null) createDesigner();
        //report.synchronize();
        designer.report = report;
        designer.visible = true;
    };
    viewer.renderHtml("viewerContent");

    var userButton = viewer.jsObject.SmallButton("userButton", "خروج", "emptyImage");

    userButton.action = function () {
        $("#modal-Report").modal('hide');
    }

    var toolbarTable = viewer.jsObject.controls.toolbar.firstChild.firstChild;
    var buttonsTable = toolbarTable.rows[0].firstChild.firstChild;
    var userButtonCell = buttonsTable.rows[0].insertCell(0);
    userButtonCell.className = "stiJsViewerClearAllStyles";
    userButtonCell.appendChild(userButton);
}

var DataReport;
function createDesigner() {
    var options = new Stimulsoft.Designer.StiDesignerOptions();
    options.appearance.fullScreenMode = true;
    options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;
    designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);
    designer.renderHtml("designerContent");

    designer.onExit = function (e) {
        this.visible = false;
        viewer.visible = true;
    }
}

function setReport(reportObject, mrtFileName, FromDate, ToDate) {
    DataReport = reportObject;
    if (DataReport.length == 0 || DataReport == null || DataReport == "") {
        return showNotification('ابتدا گزارش گیری کنید', 0);
    }

    addressMrt = '/Content/Report/Report_' + mrtFileName + '.mrt';

    if (mrtFileName != "Free") {
        report.loadFile(addressMrt);
    }
    report.dictionary.databases.clear();
    dataSet = new Stimulsoft.System.Data.DataSet("Database");
    DataReport = '{"Data":' + JSON.stringify(DataReport) + '}';
    dataSet.readJson(DataReport);
    report.regData(dataSet.dataSetName, "", dataSet);

    ShamsiDate();
    var variablesReportDate = null;
    variablesReportDate = new Stimulsoft.Report.Dictionary.StiVariable();
    variablesReportDate.name = "ReportDate";
    variablesReportDate.value = DateNow;
    report.dictionary.variables.add(variablesReportDate);

    var variablesFromDate = new Stimulsoft.Report.Dictionary.StiVariable();
    variablesFromDate.name = "FromDate";
    variablesFromDate.value = FromDate;
    report.dictionary.variables.add(variablesFromDate);

    var variablesToDate = new Stimulsoft.Report.Dictionary.StiVariable();
    variablesToDate.name = "ToDate";
    variablesToDate.value = ToDate;
    report.dictionary.variables.add(variablesToDate);


    // report.getDictionary().getVariables().get("var1").setValue("your value");
    //report.getVariables().put(paramName, value);

    // report.dictionary.synchronize();

    /* var variables = new Stimulsoft.Report.Dictionary.StiVariable();
       variables.name = "Address";
       variables.alias = "Address";
       variables.Type = Stimulsoft.System.StimulsoftType;
       variables.requestFromUser = false;
       variables.value = "1234 Address ";
       report.dictionary.variables.add(variables);
   */

    /*   var di = new Stimulsoft.Report.Dictionary.StiDialogInfo();
       di.allowUserValues = false;
        di.keys = ["1", "2", "3", "4"];
        di.values = ["1", "2", "3", "4"];
        newVariable.dialogInfo = di;
        report.dictionary.variables.add(newVariable);
    */

    report.dictionary.synchronize();

    viewer.report = report;
    report.render();

    $('#modal-Report').modal('show');
}