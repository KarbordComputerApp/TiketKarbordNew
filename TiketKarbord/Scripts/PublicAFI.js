var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

window.addEventListener("pageshow", function (event) {
    var historyTraversal = event.persisted ||
        (typeof window.performance != "undefined" &&
            window.performance.navigation.type === 2);
    if (historyTraversal && isFirefox == false) {
        // Handle page restore.
        window.location.reload();
    }
});

var server = localStorage.getItem('ApiAddress');

var lockNumber = 10000;
server = 'http://localhost:52798';



var userName = localStorage.getItem('userName');
var pass = localStorage.getItem('password');

Master_ProgName = localStorage.getItem('Master_ProgName');

var apiKeyMap = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3N2VlOGUyMmFlZTVhZjQ4YzJjNmVlNDg1MTBmMTQ4MmE0MTcyOGE2N2Y3ZDg5MmYyMmNkMzQ0MGUwNWVkYjQ0NTQwYTkxYjIyMzdhMzFjIn0.eyJhdWQiOiIxOTQxOCIsImp0aSI6ImE3N2VlOGUyMmFlZTVhZjQ4YzJjNmVlNDg1MTBmMTQ4MmE0MTcyOGE2N2Y3ZDg5MmYyMmNkMzQ0MGUwNWVkYjQ0NTQwYTkxYjIyMzdhMzFjIiwiaWF0IjoxNjYyODk3ODA5LCJuYmYiOjE2NjI4OTc4MDksImV4cCI6MTY2NTU3OTgwOSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.qdEbX0m4jziLci0rpJVVgqFre-z9z2AjopNmAW8RmKJq4qBaLyUMa81YzTby7-GD9enq_G_-598xDnZup3H5yR2XbxmaT4QhZoOz6lDfY68t-_fffH8AQja-VdY0OBpkiTUg4AP4Ta-lexE5LLINqNbJCvwJV0sHyBPHTkbv1pb1Ax5nU_lLAbFwDJZ_5l9_H6mNVwR5d4xQGCKWPnVYQQG6Vukqh_iajIJ-YGDNIuP3fOQlBz4XPdUwzAzNIibW_yioMcRIm38kfxqFqePc6ZpI4zyb4HWx4maIWYYx2GRf4uFNZiB7gcWtyksNZppTKav8f9Rlv6D7xWqsntLUKA";

//if (Master_ProgName == 'AFI1') Master_ProgName = 'Afi1';
//if (Master_ProgName == 'ACC5') Master_ProgName = 'Acc5';
//if (Master_ProgName == 'FCT5') Master_ProgName = 'Fct5';
//if (Master_ProgName == 'INV5') Master_ProgName = 'Inv5';
//if (Master_ProgName == 'ERJ1') Master_ProgName = 'Erj1';

var notAccess = "Not access to the method";

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

// دسترسی های ادمین پنل
const AP_SFCT = 0;
const AP_SPFCT = 1;
const AP_SRFCT = 2;
const AP_PFCT = 3;
const AP_PPFCT = 4;
const AP_PRFCT = 5;
const AP_IIDOC = 6;
const AP_IODOC = 7;
const AP_TrzIKala = 8;
const AP_TrzIKalaExf = 9;
const AP_IDocR = 10;
const AP_FDocR_S = 11;
const AP_FDocR_P = 12;
const AP_TrzAcc = 13;
const AP_Dftr = 14;
const AP_ADocR = 15;
const AP_TChk = 16;
const AP_TrzFKala_S = 17;
const AP_TrzFKala_P = 18;
const AP_TrzFCust_S = 19;
const AP_TrzFCust_P = 20;
const AP_ADOC = 21;
const AP_SFORD = 22;
const AP_SHVL = 23;
const AP_SEXT = 24;
const AP_PFORD = 25;
const AP_Krdx = 26;
const AP_Kala = 27;
const AP_Cust = 28;
const AP_Acc = 29;
const AP_Mkz = 30;
const AP_Opr = 31;
const AP_AGMkz = 32;
const AP_AGOpr = 33;
const AP_Arz = 34;
const AP_ZAcc = 35;

// دسترسی های  ویندوزی
const AC_DOC = 0;
const AC_FSDOC = 1;
const AC_FPDOC = 2;
const AC_SPDOC = 3;
const AC_SFDOC = 4;
const AC_SRDOC = 5;
const AC_PPDOC = 6;
const AC_PFDOC = 7;
const AC_PRDOC = 8;
const AC_IIDOC = 9;
const AC_IODOC = 10;
const AC_RPRT = 11;
const AC_TrzIKala = 12;
const AC_TrzIKalaExf = 13;
const AC_IDocR = 14;
const AC_FDocR_S = 15;
const AC_FDocR_P = 16;
const AC_TrzAcc = 17;
const AC_Dftr = 18;
const AC_ADocR = 19;
const AC_TChk = 20;
const AC_TrzFKala_S = 21;
const AC_TrzFKala_P = 22;
const AC_TrzFCust_S = 23;
const AC_TrzFCust_P = 24;
const AC_ADOC = 25;
const AC_SFORD = 26;
const AC_SHVL = 27;
const AC_SEXT = 28;
const AC_PFORD = 29;
const AC_Krdx = 30;
const AC_KALA = 31;
const AC_CUST = 32;
const AC_ACC = 33;
const AC_MKZ = 34;
const AC_OPR = 35;
const AC_AGMkz = 36;
const AC_AGOpr = 37;
const AC_ARZ = 38;
const AC_ZACC = 39;

var ShowMenu = [false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false];

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

//data-bind="attr: {title:text_Date}"

text_FirstPage = 'اولین';
text_PreviousPage = 'قبلی';
text_NextPage = 'بعدی';
text_LastPage = 'آخرین';

text_Close = 'بستن';
//text_ = 'aaa';


Fct_or_Inv = localStorage.getItem('Fct_or_Inv');

$("#AccessRefresh").hide();
//$("#AddNewSanad_New").hide();

if (sessionStorage.versionTitle == "ورژن تست") {
    $("#AccessRefresh").show();
    // $("#AddNewSanad_New").show();

}

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

    if (method != "GET") {
        var json = JSON.stringify(data);
    }

    return $.ajax({
        type: method,
        async: sync == null ? false : sync,
        encoding: 'UTF-8',
        beforeSend: function () {
            /*if (sync == true) {
                $('#loadingsite').attr('class', 'page-proccess-wrapper');
                $('#loadingsite').css('display', 'block');
            }*/
        },
        url: uri,
        dataType: 'json',

        cache: false,
        timeout: 300000,
        onLoading: showLoad(),
        headers: {
            'userName': userNameAccount,
            'password': passAccount,
            'userKarbord': sessionStorage.userName,
            'device': "Web"
        },
        complete: function () {
           /* var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                $('#loadingsite').css('display', 'none');
                $('#loadingsite').attr('class', 'page-loader-wrapper');
            }*/
        },
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        error != false ?
            showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3)
            : null;
    });
}



function ajaxFunction(uri, method, data, sync, error) {
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
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "Origin",
           
        },
        crossDomain: false,


        cache: false,
        timeout: 300000,

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
            showNotification('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید' + '</br>' + textStatus + ' : ' + errorThrown, 3)
            : null;
    });
}


/*
function ajaxFunction(uri, method, data, sync, error) {
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
        //onLoading: showLoad(),

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
            showNotification('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید' + '</br>' + textStatus + ' : ' + errorThrown, 3)
            : null;
    });
}
*/


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

