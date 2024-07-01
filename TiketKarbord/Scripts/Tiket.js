var ViewModel = function () {
    var self = this;
    var bandNo = 0;
    var ErjDocXB_LastUri = server + '/api/KarbordData/ErjDocXB_Last/'; // آدرس گزارش
    var ErjXResultUri = server + '/api/KarbordData/ErjXResult/'; // آدرس نتیجه

    var ErjDocXHUri = server + '/api/KarbordData/Web_ErjDocXH/'; // آدرس تیکت ها  
    var DocXUsersUri = server + '/api/KarbordData/Web_DocXUsers/'; // آدرس کاربران زمان ارجاع
    var ErjDocXErjaUri = server + '/api/KarbordData/Web_ErjDocXErja/'; // آدرس ریز ارجاعات
    var ErjSaveTicket_BSaveUri = server + '/api/KarbordData/ErjSaveTicket_BSave/'; //آدرس ذخیره ارجاع
    var ErjSaveTicket_RjReadUri = server + '/api/KarbordData/ErjSaveTicket_RjRead/'; //آدرس دیده شدن تیکت

    if (activeAction == false) {
        $("#P_Action").hide();
    }

    self.DocXB_LastList = ko.observableArray([]); // لیست گزارش  
    self.ErjXResultList = ko.observableArray([]); // لیست نتیجه 
    self.ErjDocTiket = ko.observableArray([]); // لیست پرونده  

    var serialTiket = 0;
    var lockNoTiket = 0;
    var TiketMode = sessionStorage.ModeCodeTiket;


    TiketMode = TiketMode == null ? "1" : TiketMode;

    if (TiketMode == "1") {
        $("#title_Tiket").text(translate('تیکت دریافتی'));
        $("#titlePage").text(translate('تیکت دریافتی'));
        $("#titleSaveTiket").text(translate('ارجاع جدید'));
        $('#showDocBMode').css('display', 'block');
    }
    else {
        $("#title_Tiket").text(translate('تیکت ارسالی'));
        $("#titlePage").text(translate('تیکت ارسالی'));
        $("#titleSaveTiket").text(translate('تغییر ارجاع'));
        $('#showDocBMode').css('display', 'none');
    }


    function getDocXB_Last() {
        var DocXB_LastObject = {
            erjaMode: TiketMode,
            docBMode: 4,
            fromUserCode: TiketMode == 1 ? '' : userName,
            toUserCode: TiketMode == 1 ? userName : '',
            azDocDate: '',
            taDocDate: '',
            azRjDate: '',
            taRjDate: '',
            azMhltDate: '',
            taMhltDate: '',
            status: 'فعال',
            custCode: '',
            khdtCode: '',
            srchSt: '',
        };
        ajaxFunction(ErjDocXB_LastUri, 'POST', DocXB_LastObject, false).done(function (response) {
            self.DocXB_LastList(response);
            $("#CountList").text(response.length);
        });
    }

    getDocXB_Last();


    $('#refreshTiket').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ارجاعات ") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getDocXB_Last();
            }
        })
    })


    $("#Close_ErjDocTiket").click(function (e) {
        lockNoTiket = 0;
        $('#modal-ErjDocTiket').modal('hide');
    })



    self.DocXUsersList = ko.observableArray([]); // لیست کاربران  
    self.p_ErjUser = ko.observable();

    function getDocXUsersList() {
        list = localStorage.getItem('DocXUsers');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('DocXUsers'));
            self.DocXUsersList(list)
        }
        else {
            var DocXUsersObject = {
                UserCode: userName,
                TrsId: 1,
            }
            ajaxFunction(DocXUsersUri, 'Post', DocXUsersObject).done(function (data) {
                self.DocXUsersList(data);
                localStorage.setItem("DocXUsers", JSON.stringify(data));
            });
        }
    }

    getDocXUsersList();


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




    self.ViewErjDocTiket = function (Band) {
        serialTiket = Band.SerialNumber;
        docBMode = Band.DocBMode;

        var ErjDocXHObject = {
            SerialNumber: serialTiket,
            UserCode: userName,
            ModeCode: '204',
            FlagLog: false,
            IP: "",
            CallProg: 'Tik',
            LoginLink: false,
            top: null,
            Status: "فعال",
        }

        ajaxFunction(ErjDocXHUri, 'Post', ErjDocXHObject).done(function (data) {
            item = data[0];
            $('#OpenChat').hide();
            $('#p_docno').val(item["DocNo"]);
            $('#p_EghdamName').val(item["EghdamName"]);
            $('#p_TanzimName').val(item["TanzimName"]);
            $('#p_DocDate').val(item["DocDate"]);
            $('#p_NameCust').val(item["CustName"]);
            $('#p_Motaghazi').val(item["Motaghazi"]);
            $('#p_Status').val(item["Status"]);
            $('#p_Spec').val(item["Spec"]);
            $('#Result').val(item["Text"]);
            $('#ActiveChat').prop('checked', item["ChatActive"]);
            if (item["ChatActive"] == true) {
                $('#OpenChat').show();
            }
            lockNoTiket = item["LockNo"];
            getErjDocXErja(serialTiket);
            getErjXResultList(serialTiket, null, null, null)
            if (TiketMode == "1" && Band.RjReadSt == "T") {
                RjReadObject = {
                    SerialNumber: serialTiket,
                    DocBMode: docBMode,
                    BandNo: Band.BandNo,
                    RjReadSt: "F",

                };
                ajaxFunction(ErjSaveTicket_RjReadUri, 'POST', RjReadObject).done(function (response) {

                });
            }

            $('#modal-ErjDocTiket').modal('show');
        });
    }

    function getErjXResultList(serialNumber, bMode, toUser, band) {
        var ErjXResultObject = {
            SerialNumber: serialNumber,
            BandNo: band,
            DocBMode: bMode,
            ToUserCode: toUser,
        }
        ajaxFunction(ErjXResultUri, 'Post', ErjXResultObject).done(function (data) {
            if (data.length > 0) {
                if (bMode == null)
                    self.ErjXResultList(data);
                item = data[0];
                bandNo = item.BandNo;
            }
        });
    }


    var lastResult = ""; 
    var lastToUserCode = ""; 
    var lastUserErjCode = ""; 


    function SetDataErjDocXErja() {
        list = self.ErjDocXErja();
        $("#BodyErjDocXErja").empty();
        $("#P_BodyErjDocXErja").show();
        if (list.length > 0) {
            listLastBand = self.ErjXResultList();
            textLastBand = '';
            for (var j = 0; j < listLastBand.length; j++) {
                if (listLastBand[j].DocBMode == 0 && listLastBand[j].RjResult != '') {
                    /* textLastBand +=
                         '  <div style="padding: 3px;margin: 0px 10px 0px 0px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                     textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('نتیجه ثبت شده توسط :') + '</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div > '*/
                }
                else if (listLastBand[j].DocBMode == 1) {
                    textLastBand +=
                        '  <div style="padding: 3px;margin: 0px 10px 0px 0px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                    textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('رونوشت به :') + '</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div >'

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


            }

            countBand = list[list.length - 1].BandNo;
            for (var i = 1; i <= countBand; i++) {
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
                    + '     <div class= "col-md-9 form-inline" > '
                    + '         <h6 >' + i + ' ) ' + listBand[0].FromUserName + '</h6>'
                    + '         <img src="/Content/img/new item/arrow-back-svgrepo-com.svg" style="width: 11px;margin-left: 0px; margin-right: 0px;" /> '
                    + '         <h6 >' + listBand[0].ToUserName + '</h6> '
                    + '     </div>'
                    + '     <div class="col-md-3 form-inline"> '
                    + '         <h6 style="padding-left: 5px;">' + listBand[0].RjTimeSt + '</h6> '
                    + '         <h6 >' + listBand[0].RjDate + '</h6> '
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
            lastUserErjCode = listBand[0].FromUserCode.toUpperCase();
            lastUserErjName = listBand[0].FromUserName;

            if (TiketMode != "1") {
                lastResult = listBand[0].RjComm;
                lastToUserCode = listBand[0].ToUserCode;
            }

        }
        else {
            $("#P_BodyErjDocXErja").hide();
        }
        // updateScroll();
    }


    $('#SendDocXK').click(function () {
        $('#modal-Erja').modal('show');
        $("#RjTime_H").val("");
        $("#RjTime_M").val("");

        if (TiketMode != "1") {
            $('#e_Result').val(lastResult);
            $('#p_ErjUser').val(lastToUserCode);
        }
        else {
            $('#p_ErjUser').val(lastUserErjCode); 
        }

    })

    $('#OpenChat').click(function () {
        var GetTokenUri = server + '/api/Data/Token/'; // آدرس دریافت توکن 
        ajaxFunction(GetTokenUri + '/' + lockNoTiket, 'GET').done(function (data) {
            urlChat = server + 'Home/ChatUser?UserCode=' + userName + '&&ChatId=' + serialTiket + ' &&Token=' + data;
            window.open(urlChat, '_blank');
        });
    })


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

        getTimeServer();
        ErjSaveTicket_BSaveObject = {
            SerialNumber: serialTiket,
            Natijeh: natijeh,
            FromUserCode: userName,
            ToUserCode: toUserCode,
            RjDate: '',//rjDate,
            RjTime: rjTime,
            RjMhltDate: "",
            BandNo: TiketMode == 1 ? 0 : bandNo,
            SrMode: TiketMode == 1 ? 0 : 1, 
            RjStatus: "",
            FarayandCode: "",
            RjHour: timeNow
        };

        ajaxFunction(ErjSaveTicket_BSaveUri, 'POST', ErjSaveTicket_BSaveObject).done(function (response) {
            $('#modal-Erja').modal('hide');
            $('#modal-ErjDocTiket').modal('hide');
            //getDocXB_Last();


            var SendMessageSorenaObject = {
                UserCode: toUserCode,
                Message: "دریافت چت از " + userNameFa,
            }
            ajaxFunction(SendMessageSorenaUri, 'POST', SendMessageSorenaObject).done(function (sorena) {
                sorena = sorena;
            });

        });

    }



    $('#saveErja').click(function () {
        SaveErja();
    })

    $('#Close_ModalErj').click(function () {
        $('#modal-Erja').modal('hide');
    })

    $("#modal-ErjDocTiket").on('hidden.bs.modal', function () {
        lockNoTiket = 0;
        getDocXB_Last();
    })





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

