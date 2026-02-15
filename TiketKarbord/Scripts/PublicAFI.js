var lockNumber = 10000;
//var server = "http://localhost:52798/";
//var server = 'http://192.168.0.106:1000/';  
var server = 'http://185.208.174.64:8001/';

var userName = localStorage.getItem('userNameTiket');
var userNameFa = localStorage.getItem('userNameFaTiket');

var SendMessageSorenaUri = server + '/api/KarbordData/SendMessageSorena/';

$('#userNameFa').text(userNameFa);

//var pass = localStorage.getItem('password');

var dateNow;
var timeNow;
var activeAction = true;

var key_F1 = 112;
var key_F2 = 113;
var key_F3 = 114;
var key_F4 = 115;
var key_F5 = 116;
var key_F6 = 117;
var key_F7 = 118;
var key_F8 = 119;
var key_F9 = 120;
var key_F10 = 121;
var key_F11 = 122;
var key_F12 = 123;

var key_Space = 32;
var key_BackSpace = 8;
var key_Enter = 13;
var key_Esc = 27;
var key_Insert = 45;
var key_Delete = 46;
var key_R = 82;
var key_O = 79;
var key_P = 80;

var key_a = 97;
var key_b = 98;



text_Add = 'جدید';
text_Update = 'ویرایش';
text_Delete = 'حذف';
text_SettingColumn = 'تنظیم ستون ها';
text_Refresh = 'به روز رسانی';
text_Select = 'انتخاب';
text_OtherField = 'مشخصات اضافی';
text_LinkSanad = 'لینک اسناد';
text_Date = 'انتخاب تاریخ';
text_Image = 'تصویر';
text_Location = 'موقعیت مکانی';


text_FirstPage = 'اولین';
text_PreviousPage = 'قبلی';
text_NextPage = 'بعدی';
text_LastPage = 'آخرین';
text_Close = 'بستن';


function translate(text) {
    return text;
}


function showNotification(text, colorNumber, From, Align, time) {

    placementFrom = From == null ? sessionStorage.placementFrom : From;
    placementAlign = Align == null ? sessionStorage.placementAlign : Align;
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
            timer: time = null ? 1000 : time,
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



function ajaxFunction(uri, method, data, sync, error) {

    //if (method != "GET") {
    //    var json = JSON.stringify(data);
    //}

    return $.ajax({
        type: method,
        async: sync == null ? false : sync,
        encoding: 'UTF-8',
        beforeSend: function () {
            if (sync == true) {
                $('#loadingsite').attr('class', 'page-proccess-wrapper');
                $('#loadingsite').css('display', 'block');
            }
        },
        url: uri,
        dataType: 'json',
        cache: false,
        timeout: 300000,
        headers: {
            'userName': "afi8test3",
            'password': "1",
            'userKarbord': "ace",
            'device': "Web",
        },
        complete: function () {
            var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                $('#loadingsite').css('display', 'none');
                $('#loadingsite').attr('class', 'page-loader-wrapper');
            }
        },
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        error != false ?
            showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3)
            : null;
    });
}





function ajaxFunctionUpload(uri, data, sync) {

    return $.ajax({
        url: uri,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,

        async: sync == null ? false : sync,
        beforeSend: function () {
            if (sync == true) {
                $('#loadingsite').attr('class', 'page-proccess-wrapper');
                $('#loadingsite').css('display', 'block');
            }
        },

        success: function (fileName) {
        },
        complete: function () {
            var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                $('#loadingsite').css('display', 'none');
                $('#loadingsite').attr('class', 'page-loader-wrapper');
            }
        },
        xhr: function () {
            var fileXhr = $.ajaxSettings.xhr();
            if (fileXhr.upload) {
                $("progress").show();
                fileXhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        $("#fileProgress").attr({
                            value: e.loaded,
                            max: e.total
                        });
                    }
                }, false);
            }
            return fileXhr;
        }
    });
}

function ajaxFunctionUploadTiket(uri, data, sync) {

    return $.ajax({
        url: uri,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,

        async: sync == null ? false : sync,
        beforeSend: function () {
            if (sync == true) {
                $('#loadingsite').attr('class', 'page-proccess-wrapper');
                $('#loadingsite').css('display', 'block');
            }
        },

        success: function (fileName) {
        },
        complete: function () {
            var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                $('#loadingsite').css('display', 'none');
                $('#loadingsite').attr('class', 'page-loader-wrapper');
            }
        },
        xhr: function () {
            var fileXhr = $.ajaxSettings.xhr();
            if (fileXhr.upload) {
                $("progress").show();
                fileXhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        $("#fileProgress").attr({
                            value: e.loaded,
                            max: e.total
                        });
                    }
                }, false);
            }
            return fileXhr;
        }
    });
}



function ajaxFunctionAccount(uri, method, sync, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        async: sync == null ? false : sync,
        beforeSend: function () {
            if (sync == true) {
                $('#loadingsite').attr('class', 'page-proccess-wrapper');
                $('#loadingsite').css('display', 'block');
            }
        },
        cache: false,
        timeout: 30000,
        complete: function () {
            if (sync == true) {
                $('#loadingsite').css('display', 'none');
                $('#loadingsite').attr('class', 'page-loader-wrapper');
            }
        },
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showNotification('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید' + '</br>' + textStatus + ' : ' + errorThrown, 3);
    });
}



var mes_Refresh = 'تایید به روز رسانی';
var mes_Delete = 'تایید حذف';
var text_Yes = 'بله';
var text_No = 'خیر';


href = window.location.href;
sp = href.split('/');
hrefPage = '/' + sp[3] + '/' + sp[4];


const titlePrice = ' ریال ';

var colorRadif = '#d9d9d9';


var MachineId = localStorage.getItem("MachineIdKarbord");
if (MachineId == null || MachineId == '') {
    var d = new Date();
    id = d.getDate() + d.getTime();
    localStorage.setItem("MachineIdKarbord", id);
}


function getDateServer() {
    if (server != null) {
        var DateUri = server + '/api/KarbordData/Date/'; // آدرس  تاریخ سرور
        ajaxFunction(DateUri, 'GET').done(function (data) {
            listDate = data[0].split("/");
            dateNow = data[0];
            hourNow = data[0];
            SalNow = listDate[0];
        });
    }
}

function getTimeServer() {
    if (server != null) {
        var TimeUri = server + '/api/KarbordData/Time/'; // آدرس  ساعت سرور
        ajaxFunction(TimeUri, 'GET').done(function (data) {
            timeNow = data[0];
        });
    }
}

//getDateServer();



$('#minMaxComm').click(function () {
    var images = $('#imgComm').attr('src');

    if (images == '/Content/img/new item/minus-svgrepo-com.svg') {
        $('#imgComm').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        $("#modal-dialogComm").removeClass("modal-entesab");

    }
    else {
        $('#imgComm').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
        $("#modal-dialogComm").addClass("modal-entesab");
    }
})


var ipw;
ipw = localStorage.getItem("IPW");

if (ipw == "" || ipw == "null" || ipw == null) {
    getIP();
}



function getIP() {
    localStorage.setItem("IPW", "Error Get IP");
    sessionStorage.IPW = "Error Get IP";
    ipw = "Error Get IP";

    ajaxFunctionAccount('http://ip-api.com/json/', 'GET', true).done(function (data) {
        localStorage.setItem("IPW", data.query);
        ipw = data.query;
    });
}





function CountPage(list, pageSize, item) {
    allPage = Math.ceil(list.length / pageSize);
    allPage = allPage < 1 ? 1 : allPage;
    return item + ' از ' + allPage;
}



$("#Erj_Resive").click(function () {
    sessionStorage.ModeCodeErja = 1;
});


$("#Erj_Send").click(function () {
    sessionStorage.ModeCodeErja = 2;
});


$('#Erj_Menu').click(function () {
    sessionStorage.SelectMenu = 0;
});

$('#Tiket_Menu').click(function () {
    sessionStorage.SelectMenu = 1;
});

$('#Dayjob_Menu').click(function () {
    sessionStorage.SelectMenu = 2;
});


$('#Erj_Menu').removeAttr('class');
$('#Tiket_Menu').removeAttr('class');
$('#Dayjob_Menu').removeAttr('class');

if (sessionStorage.SelectMenu == 0) {
    $('#Erj_Menu').attr('class', 'active');
}

if (sessionStorage.SelectMenu == 1) {
    $('#Tiket_Menu').attr('class', 'active');
}

if (sessionStorage.SelectMenu == 2) {
    $('#Dayjob_Menu').attr('class', 'active');
}


$("#Tiket_Resive").click(function () {
    sessionStorage.ModeCodeTiket = 1;
});


$("#Tiket_Send").click(function () {
    sessionStorage.ModeCodeTiket = 2;
});




function ConvertComm(comm) {
    var res = comm.replaceAll("\r\n", '<br>');
    return '<p>' + res + '</p>';
}















var AccessUri = server + '/api/KarbordData/AccessUser/'; // آدرس سطح دسترسی
var accessErj;
AccessList = ko.observableArray([]); // سطح دسترسی


function getAccessUser() {

    userName = localStorage.getItem('userNameTiket');
    ajaxFunction(AccessUri + 'Web2/' + userName, 'Get', true).done(function (data) {

        self.AccessList(data);
        admin = data.filter(s => s.TrsName == 'ADMIN');
        admin_Erj1 = 0
        for (var i = 0; i < admin.length; i++) {
            if (admin[i].OrgProgName == 'Erj1') admin_Erj1 = 1;
        }
        localStorage.setItem('admin_Erj1', admin_Erj1);

        if (self.AccessList().length > 0) {
            localStorage.setItem('AccessErj', JSON.stringify(data));
            SetValidationErj(data);
        }
    })
}

function SetValidationErj(data) {
    accessErj = data;
    var ShowMenuErj = [false, false];
    if (accessErj == null) return false;
    if (accessErj.length == 0) return false;

    if (userName.toUpperCase() == 'ACE')
        accessErj[0].TrsName = 'ADMIN';

    // ErjDoc  NEW_ErjDOC  CHG_ErjDOC  DEL_ErjDOC  OTHERUSER_ErjDOC
    validation = CheckAccessErj('ErjDoc');
    validation == true ? localStorage.setItem("ErjDoc", "true") : localStorage.setItem("ErjDoc", "false")

    validation = CheckAccessErj('NEW_ErjDOC');
    validation == true ? localStorage.setItem("NEW_ErjDOC", "true") : localStorage.setItem("NEW_ErjDOC", "false")

    validation = CheckAccessErj('CHG_ErjDOC');
    validation == true ? localStorage.setItem("CHG_ErjDOC", "true") : localStorage.setItem("CHG_ErjDOC", "false")

    validation = CheckAccessErj('DEL_ErjDOC');
    validation == true ? localStorage.setItem("DEL_ErjDOC", "true") : localStorage.setItem("DEL_ErjDOC", "false")

    validation = CheckAccessErj('OTHERUSER_ErjDOC');
    validation == true ? localStorage.setItem("AccessSanadErj", "true") : localStorage.setItem("AccessSanadErj", "false")



    //NEW_DAYR CHG_DAYR DEL_DAYR PRN_DAYR
    validation = CheckAccessErj('DAYR');
    /*validation = false
    if (userName.toUpperCase() == "ACE" || userName.toUpperCase() == "HRH" || userName.toUpperCase() == "AFSHAR")
        validation = true*/
    validation == true ? localStorage.setItem("DAYR", "true") : localStorage.setItem("DAYR", "false")

    validation = CheckAccessErj('NEW_DAYR');
    validation == true ? localStorage.setItem("NEW_DAYR", "true") : localStorage.setItem("NEW_DAYR", "false")

    validation = CheckAccessErj('CHG_DAYR');
    validation == true ? localStorage.setItem("CHG_DAYR", "true") : localStorage.setItem("CHG_DAYR", "false")

    validation = CheckAccessErj('DEL_DAYR');
    validation == true ? localStorage.setItem("DEL_DAYR", "true") : localStorage.setItem("DEL_DAYR", "false")

    validation = CheckAccessErj('PRN_DAYR');
    validation == true ? localStorage.setItem("PRN_DAYR", "true") : localStorage.setItem("PRN_DAYR", "false")




    //NEW_DOCX_TICKET CHG_DOCX_TICKET   DEL_DOCX_TICKET  PRN_DOCX_TICKET  OTHERUSER_DOCX_TICKET
    validation = CheckAccessErj('DOCX_TICKET');
    validation == true ? localStorage.setItem("DOCX_TICKET", "true") : localStorage.setItem("DOCX_TICKET", "false")

    validation = CheckAccessErj('NEW_DOCX_TICKET');
    validation == true ? localStorage.setItem("NEW_DOCX_TICKET", "true") : localStorage.setItem("NEW_DOCX_TICKET", "false")

    validation = CheckAccessErj('CHG_DOCX_TICKET');
    validation == true ? localStorage.setItem("CHG_DOCX_TICKET", "true") : localStorage.setItem("CHG_DOCX_TICKET", "false")

    validation = CheckAccessErj('DEL_DOCX_TICKET');
    validation == true ? localStorage.setItem("DEL_DOCX_TICKET", "true") : localStorage.setItem("DEL_DOCX_TICKET", "false")

    validation = CheckAccessErj('PRN_DOCX_TICKET');
    validation == true ? localStorage.setItem("PRN_DOCX_TICKET", "true") : localStorage.setItem("PRN_DOCX_TICKET", "false")

    validation = CheckAccessErj('OTHERUSER_DOCX_TICKET');
    validation == true ? localStorage.setItem("OTHERUSER_DOCX_TICKET", "true") : localStorage.setItem("OTHERUSER_DOCX_TICKET", "false")

}


function CheckAccessErj(TrsName) {
    if (localStorage.getItem('admin_Erj1') == '1')
        return true;
    else {
        for (var i = 0; i < accessErj.length; i++) {
            if (accessErj[i].TrsName == TrsName)
                return true;
        }
    }
    return false
}


$('#LogOut').click(function () {
    LogOut();
})


function LogOut() {
    window.location.href = localStorage.getItem("urlLogin");
}


localStorage.getItem("ErjDoc") == "true" ? $("#ErjDOC").show() : $("#ErjDOC").hide();
localStorage.getItem("DAYR") == "true" ? $("#Dayjob").show() : $("#Dayjob").hide();
localStorage.getItem("DOCX_TICKET") == "true" ? $("#TiketDOC").show() : $("#TiketDOC").hide();


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: 'octet/stream' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};
