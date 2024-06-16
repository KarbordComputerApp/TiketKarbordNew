var ViewModel = function () {
    var self = this;
    self.ErjDocXHList = ko.observableArray([]); // لیست گزارش  

    var ErjDocXHUri = server + '/api/KarbordData/Web_ErjDocXH/'; // آدرس تیکت ها  
    var TicketStatusUri = server + '/api/KarbordData/Web_TicketStatus/'; // آدرس وضعیت تیکت ها 
    var ErjStatusUri = server + '/api/KarbordData/ErjStatus/'; // آدرس وضعیت 
    var GetTokenUri = server + '/api/Data/Token/'; // آدرس دریافت توکن 
    var ErjUsersUri = server + '/api/KarbordData/Web_ErjUsers/'; // آدرس کاربران زمان ارجاع
    var ErjDocXErjaUri = server + '/api/KarbordData/Web_ErjDocXErja/'; // آدرس ریز ارجاعات
    var ErjSaveTicket_BSaveUri = server + '/api/KarbordData/ErjSaveTicket_BSave/'; //آدرس ذخیره ارجاع
    var ErjSaveTicket_DocReadUri = server + '/api/KarbordData/ErjSaveTicket_DocRead/'; //آدرس دیده شدن تیکت

    var ChatCountTiketUri = server + '/api/Data/ChatCountTiket/';

    var showHideResult = false;

    if (activeAction == false) {
        $("#P_Action").hide();
    }

    $("#saveDocXK").hide();
    $("#SendDocXK").hide();
    var CHG_DOCX = localStorage.getItem("CHG_DOCX_SERVICE")

    if (CHG_DOCX == "true") {
        $("#saveDocXK").show();
        $("#SendDocXK").show();
    }


    function getErjDocXH(log) {
        var ErjDocXHObject = {
            UserCode: userName,
            ModeCode: '204',
            FlagLog: log,
            IP: "",
            CallProg: 'Tik',
            LoginLink: false,
            top: null,
            Status: "فعال",
            ChatMode : 1
        }

        ajaxFunction(ErjDocXHUri, 'Post', ErjDocXHObject).done(function (dataDocXK) {
            var Object_TicketStatus = {
                SerialNumber: '',
                LockNumber: lockNumber,
                IP: "",
                CallProg: 'Web'
            }
            ajaxFunction(TicketStatusUri, 'Post', Object_TicketStatus, false).done(function (dataTicketStatus) {
                for (var i = 0; i < dataDocXK.length; i++) {
                    dataDocXK[i].ChatCount = 0;
                    dataDocXK[i].StatusTiket = "";
                    for (var j = 0; j < dataTicketStatus.length; j++) {
                        if (dataDocXK[i].SerialNumber == dataTicketStatus[j].SerialNumber)
                            dataDocXK[i].StatusTiket = dataTicketStatus[j].TicketStatusSt;
                    }
                }
            });

            var ChatCountTiketObject = {
                LockNumber: lockNumber,
            }
            ajaxFunction(ChatCountTiketUri, 'Post', ChatCountTiketObject, false).done(function (dataChatCount) {

                for (var i = 0; i < dataDocXK.length; i++) {
                    for (var j = 0; j < dataChatCount.length; j++) {
                        if (dataDocXK[i].SerialNumber == dataChatCount[j].SerialNumber)
                            dataDocXK[i].ChatCount = dataChatCount[j].ChatCount;
                    }
                }

            });
            $("#CountList").text(dataDocXK.length);
            self.ErjDocXHList(dataDocXK);
        });
    }

    getErjDocXH(true);




    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.p_Status = ko.observable();

    function getErjStatusList() {
        list = localStorage.getItem('ErjStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('ErjStatus'));
            self.ErjStatusList(list)
        }
        else {
            ajaxFunction(ErjStatusUri, 'GET').done(function (data) {
                self.ErjStatusList(data);
                localStorage.setItem("ErjStatus", JSON.stringify(data));
            });
        }
    }
    getErjStatusList();



    var serialTiket;
    var lockNoTiket;
    var chatMode = 0;
    self.UpdateTiket = function (item) {
        $('#OpenChat').hide();
        serialTiket = item["SerialNumber"];
        lockNoTiket = item["LockNo"];
        $('#p_docno').val(item["DocNo"]);
        $('#p_EghdamName').val(item["EghdamName"]);
        $('#p_TanzimName').val(item["TanzimName"]);
        $('#p_DocDate').val(item["DocDate"]);
        $('#p_NameCust').val(item["CustName"]);
        $('#p_Motaghazi').val(item["Motaghazi"]);
        $('#p_Status').val(item["Status"]);
        $('#p_Spec').val(item["Spec"]);
        $('#Result').val(item["Text"]);
        chatMode = item["ChatMode"];
        $('#ActiveChat').prop('checked', item["ChatActive"]);
        if (item["ChatActive"] == true) {
            $('#OpenChat').show();
        }
        getErjUsersList(serialTiket);
        getErjDocXErja(serialTiket);
        ReadTiket(serialTiket);
        $('#modal-DocXK').modal('show');
    }

    $('#ActiveChat').change(function () {
        var check = $('#ActiveChat').is(':checked');
        if (check == true) {
            $('#OpenChat').show();
        }
        else {
            $('#OpenChat').hide();
        }

    });

    $("#modal-DocXK").on('shown.bs.modal', function () {
        showHideResult = false;
    })

    $("#modal-DocXK").on('hidden.bs.modal', function () {
        getErjDocXH(false);
    })

    self.currentPageIndexErjDocXH = ko.observable(0);

    $('#refreshErjDocXH').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست تیکت ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getErjDocXH(false);
            }
        })
    })

    $("#Close_ModalDocXK").click(function (e) {
        $('#modal-DocXK').modal('hide');
    })




    $('#ShowHideResult').click(function () {
        if (showHideResult) {
            showHideResult = false;
            $('#Result').css("height", "24px");
            $('#imgResult').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        }
        else {
            showHideResult = true;
            $('#imgResult').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
            autosize.update($('#Result'));
        }

    })

    $('#ShowResult').click(function () {
        $('#codeComm').text('Natijeh');
        $('#titleComm').text(translate('نتیجه'));
        $('#commPublic').attr("style", "");
        $('#commPublic').attr('readonly', false);
        $('#commPublic').val($('#Result').val());
        $('#modal-Comm').modal('show');
    });


    function SaveDocXK() {

        docDate = $("#p_DocDate").val().toEnglishDigit();
        natijeh = $("#Result").val();
        p_NameCust = $("#p_NameCust").val();
        p_Motaghazi = $("#p_Motaghazi").val();
        p_Status = $("#p_Status").val();
        p_Spec = $("#p_Spec").val();
        p_ActiveChat = $('#ActiveChat').is(':checked');

        var ErjSaveTicketUri = server + '/api/KarbordData/ErjSaveTicket_HI/'; // آدرس ذخیره تیکت 
        var ErjSaveTicket_HI = {
            SerialNumber: serialTiket,
            DocDate: docDate,
            UserCode: userName,
            Status: p_Status,
            Spec: p_Spec,
            LockNo: lockNoTiket,
            Text: natijeh,
            F01: '',
            F02: '',
            F03: '',
            F04: '',
            F05: '',
            F06: '',
            F07: '',
            F08: '',
            F09: '',
            F10: '',
            F11: '',
            F12: '',
            F13: '',
            F14: '',
            F15: '',
            F16: '',
            F17: '',
            F18: '',
            F19: '',
            F20: '',
            Motaghazi: p_Motaghazi,
            IP: ipw,
            CallProg: 'Web',
            LoginLink: false,
            ChatMode: chatMode,
            ChatActive: p_ActiveChat
        }

        ajaxFunction(ErjSaveTicketUri, 'POST', ErjSaveTicket_HI).done(function (data) {
            //getErjDocXH(false);
            $('#modal-DocXK').modal('hide');
        });
    }


    $('#saveDocXK').click(function () {
        SaveDocXK();
    });


    $('#Close_ModalErj').click(function () {
        $('#modal-Erja').modal('hide');
    })

    $('#SendDocXK').click(function () {
        $('#modal-Erja').modal('show');
        $("#RjTime_H").val("");
        $("#RjTime_M").val("");
        $('#e_Result').val($('#Result').val());
    })

    $('#OpenChat').click(function () {
        ajaxFunction(GetTokenUri + '/' + lockNoTiket, 'GET').done(function (data) {
            urlChat = server + 'Home/ChatUser?UserCode=' + userName + '&&ChatId=' + serialTiket + ' &&Token=' + data;
            window.open(urlChat, '_blank');
        });
    })




    self.ErjUsersList = ko.observableArray([]); // لیست کاربران  
    self.p_ErjUser = ko.observable();

    function getErjUsersList(serial) {
        list = localStorage.getItem('ErjUsers');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('ErjUsers'));
            self.ErjUsersList(list)
        }
        else {
            var ErjUsersObject = {
                userCode: userName,
                SerialNumber: serial,
            }
            ajaxFunction(ErjUsersUri, 'Post', ErjUsersObject).done(function (data) {
                self.ErjUsersList(data);
                localStorage.setItem("ErjUsers", JSON.stringify(data));
            });
        }
    }


    function SaveErja() {
        toUserCode = $("#p_ErjUser").val();
        if (toUserCode == null && toUserCode == "") {
            return showNotification(translate('ارجاع شونده را انتخاب کنید'), 0);
        }


        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();

        rjTime_H = rjTime_H == "" ? 0 : parseInt(rjTime_H);
        rjTime_M = rjTime_M == "" ? 0 : parseInt(rjTime_M);

        rjTime_M = rjTime_M > 0 ? rjTime_M / 60 : 0;

        rjTime = rjTime_H + rjTime_M;

        if (rjTime <= 0) {
            rjTime_H = 0;
            rjTime_M = 0;
            return showNotification(translate('زمان صرف شده را وارد کنید'), 0);
        }

        natijeh = $("#e_Result").val();

        if (natijeh == '') {
            return showNotification(translate('متن ارجاع را وارد کنید'), 0);
        }

        SaveDocXK();

        ErjSaveTicket_BSaveObject = {
            SerialNumber: serialTiket,
            Natijeh: natijeh,
            FromUserCode: userName,
            ToUserCode: toUserCode,
            RjDate: '',//rjDate,
            RjTime: rjTime,
            RjMhltDate: "",
            BandNo: 0,
            SrMode: 0,
            RjStatus: "",
            FarayandCode: "",
        };

        ajaxFunction(ErjSaveTicket_BSaveUri, 'POST', ErjSaveTicket_BSaveObject).done(function (response) {
            $('#modal-Erja').modal('hide');
            $('#modal-DocXK').modal('hide');
            //getErjDocXH(false);
        });

    }



    $('#saveErja').click(function () {
        SaveErja();
    })



    self.ErjDocXErja = ko.observableArray([]); // لیست پرونده  

    function getErjDocXErja(serialNumber) {
        var ErjDocXErjaObject = {
            SerialNumber: serialNumber,
        };
        ajaxFunction(ErjDocXErjaUri, 'POST', ErjDocXErjaObject).done(function (response) {
            self.ErjDocXErja(response);
            SetDataErjDocXErja();
        });
    }

    var lastBand = 0;



    function SetDataErjDocXErja() {
        list = self.ErjDocXErja();
        textLastBand = '';
        $("#BodyErjDocXErja").empty();
        $("#P_BodyErjDocXErja").show();

        if (list.length > 0) {
            countBand = list[list.length - 1].BandNo;


            /*listLastBand = self.ErjResultList();
     
             for (var j = 0; j < listLastBand.length; j++) {
                 if (listLastBand[j].DocBMode == 0 && listLastBand[j].RjResult != '') {
                }
                 else if (listLastBand[j].DocBMode == 1) {
                     lastBand = listLastBand[j].BandNo;
     
                     textLastBand +=
                         '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                     textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('رونوشت به :') + '</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div >'
     
                     if (listLastBand[j].ToUserCode == sessionStorage.userName) {
                         $('#Result').val(listLastBand[j].RjResult);
                         old_RjResult = $("#Result").val();
                     }
     
                 }
     
     
                 if (listLastBand[j].RjResult == '') {
                     if (listLastBand[j].DocBMode > 0) {
                         textLastBand += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">' + "‍‍";
                         textLastBand += ' </div> ';
                     }
                 }
                 else if (listLastBand[j].DocBMode != 0) {
                     textLastBand += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                     textLastBand += ConvertComm(listLastBand[j].RjResult);
                     textLastBand += ' </div> ';
                 }
     
     
             }*/

            for (var i = 1; i <= countBand; i++) {

                //for (var i = countBand; i >= 1; i--) {
                self.FilterErjValue(i);
                listBand = self.FilterErj();
                text = ConvertComm(listBand[0].RjComm);

                countRonevesht = listBand.length

                if (countRonevesht > 1) {
                    text += ' <br\> '
                }

                for (var j = 1; j < countRonevesht; j++) {
                    text +=
                        '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                        + '   <div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('نتیجه رونوشت از :') + '</h6> <h6>' + listBand[j].FromUserName + '</h6>'
                        + '   </div>'
                        + '</div > '
                    if (listBand[j].RjComm == '')
                        text += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">' + "‍‍";
                    else {
                        text += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                        text += ConvertComm(listBand[j].RjComm);
                    }
                    text += ' </div> ';
                }



                if (listBand[0].RooneveshtUsers != '' && i < countBand) {

                    text += '</br>'
                        + '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #d9d9d9 !important;color: #555555;border-radius: 10px;">'
                        + '   <div class=" form-inline" > <h6> ' + translate('رونوشت به : ')
                        + listBand[0].RooneveshtUsers
                        + '</h6>'
                        + '</div > '
                    text += ' </div> ';
                }


                textBody =
                    '<div style="border-top: 0px solid #fff !important;">'
                    + '    <div>'
                    + '        <div class="cardErj">'
                    + '            <div class="header" style="background-color: #f5d3b4;">'
                    + '<div class="form-inline"> '
                    + '     <div class= "col-md-8 form-inline" > '
                    + '         <h6 style="font-size: 11px;">' + i + ' ) ' + listBand[0].FromUserName + '</h6>'
                    + '         <img src="/Content/img/new item/arrow-back-svgrepo-com.svg" style="width: 11px;margin-left: 0px; margin-right: 0px;" /> '
                    + '         <h6 style="font-size: 11px;">' + listBand[0].ToUserName + '</h6> '
                    + '     </div>'
                    + '     <div class="col-md-4 form-inline"> '
                    + '         <h6 style="padding-left: 5px;font-size: 11px;">' + listBand[0].RjTimeSt + '</h6> '
                    + '         <h6 style="font-size: 11px;">' + listBand[0].RjDate + '</h6> '
                    + '     </div> '
                    + '</div>';


                if (listBand[0].FarayandName != "") {
                    textBody += '<div class="form-inline" style = "margin-top: 5px;"> '
                        + '     <div class= "col-md-12 form-inline" > '
                        + '         <h6>' + translate('فرایند : ') + listBand[0].FarayandName + '</h6>'
                        + '     </div>'
                        + '</div>';
                }





                textBody += '</div>'
                    + '<div class="body" style="padding:10px;">';

                textBody += text
                if (i == countBand)
                    textBody += textLastBand

                textBody += '</div>'
                    + '        </div>'
                    + '    </div>'
                    + '</div>'


                $('#BodyErjDocXErja').append(textBody);
            }
            lastUserErjCode = listBand[0].FromUserCode;
            lastUserErjName = listBand[0].FromUserName;
        }
        else {
            $("#P_BodyErjDocXErja").hide();
        }
        // updateScroll();
    }


    self.FilterErjValue = ko.observable("");
    self.FilterErj = ko.computed(function () {
        var filter = self.FilterErjValue();
        return ko.utils.arrayFilter(self.ErjDocXErja(), function (item) {
            return item.BandNo == filter;
        });
    });

    function ConvertComm(comm) {
        var res = comm.replaceAll("\r\n", '<br>');
        return '<p>' + res + '</p>';
    }

    function ReadTiket(serial) {
        DocReadObject = {
            SerialNumber: serial,
            DocReadSt: "F",
        };
        ajaxFunction(ErjSaveTicket_DocReadUri, 'POST', DocReadObject).done(function (response) {
            
        });
    }



    var DocAttachUri = server + '/api/KarbordData/DocAttach/'; // آدرس لیست پیوست 
    self.DocAttachList = ko.observableArray([]); // ليست پیوست
    self.AddAttachList = ko.observableArray([]);

    function getDocAttachList(serial) {
        var DocAttachObject = {
            ProgName: 'ERJ1',
            ModeCode: '102',
            Year: '0000',
            SerialNumber: serial,
            BandNo: 0,
            ByData: 0,
            IP: ipw,
            CallProg: 'Web'
        }

        ajaxFunction(DocAttachUri, 'POST', DocAttachObject).done(function (data) {
            self.DocAttachList(data);
        });
    }


    $('#refreshDocAttach').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "پیوست ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getDocAttachList(serialTiket);
            }
        })
    })


    $('#attachFile').click(function () {
        getDocAttachList(serialTiket);
    });


    self.selectDocAttach = function (item) {
        Swal.fire({
            title: 'تایید دانلود',
            text: "آیا پیوست انتخابی دانلود شود ؟",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                var fileName = item.FName.split(".");
                var DownloadAttachObject = {
                    ProgName: 'ERJ1',
                    ModeCode: '102',
                    //Group: group_Tiket,
                    Year: '0000',
                    SerialNumber: item.SerialNumber,
                    BandNo: item.BandNo,
                    ByData: 1,
                    IP: ipw,
                    CallProg: 'Web'
                }
                ajaxFunction(DocAttachUri, 'POST', DownloadAttachObject).done(function (data) {
                    var sampleArr = base64ToArrayBuffer(data[0].Atch);
                    saveByteArray(fileName[0] + ".zip", sampleArr);
                });
            }
        });

    }



};






ko.applyBindings(new ViewModel());

