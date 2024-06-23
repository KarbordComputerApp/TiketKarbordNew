var ViewModel = function () {
    var self = this;

    var ErjDocB_LastUri = server + '/api/KarbordData/ErjDocB_Last/'; // آدرس گزارش
    var DocKUri = server + '/api/KarbordData/ErjDocK/'; // آدرس گزارش پرونده
    var ErjResultUri = server + '/api/KarbordData/ErjResult/'; // آدرس نتیجه
    var ErjDocErjaUri = server + '/api/KarbordData/ErjDocErja/'; // آدرس  ارجاع
    var ErjSaveDoc_RjRead_Uri = server + '/api/KarbordData/ErjSaveDoc_RjRead/'; // آدرس ذخیره دیدن ارجاع
    var ErjSaveDoc_BSaveUri = server + '/api/KarbordData/ErjSaveDoc_BSave/'; // آدرس ذخیره ارجاع
    var Web_ErjSaveDoc_HUUri = server + '/api/KarbordData/ErjSaveDoc_HU/'; // آدرس ویرایش پرونده


    self.DocB_LastList = ko.observableArray([]); // لیست گزارش  
    self.ErjResultList = ko.observableArray([]); // لیست نتیجه 
    self.ErjDocErja = ko.observableArray([]); // لیست پرونده  

    if (dateNow == null) {
        getDateServer();
    }
   


    var serialErja = 0;
    var docBMode = 0;
    var bandNo = 0;

    var erjaMode = sessionStorage.ModeCodeErja;

    var showHideInformation = false;
    var showHideSpec = false;

    erjaMode = erjaMode == null ? "1" : erjaMode;

    if (erjaMode == "1") {
        $("#title_erja").text(translate('ارجاعات پرونده دریافتی'));
        $("#titlePage").text(translate('ارجاعات پرونده دریافتی'));
        $("#titleSaveErja").text(translate('ارجاع جدید'));
        AddDocBMode();
        $('#showDocBMode').css('display', 'block');
    }
    else {
        $("#title_erja").text(translate('ارجاعات پرونده ارسالی'));
        $("#titlePage").text(translate('ارجاعات پرونده ارسالی'));
        $("#titleSaveErja").text(translate('تغییر ارجاع'));
        $('#showDocBMode').css('display', 'none');
    }

    function AddDocBMode() {
        select = document.getElementById('DocBMode');
        for (var i = 1; i <= 3; i++) {
            opt = document.createElement('option');
            if (i == 1) {
                opt.value = 4;
                opt.innerHTML = translate('کلیه ارجاعات');
            }
            if (i == 2) {
                opt.value = 5;
                opt.innerHTML = translate('فقط ارجاعات اصلی');
                opt.selected = true;
            }
            if (i == 3) {
                opt.value = 6;
                opt.innerHTML = translate('فقط رونوشت ها');
            }
            select.appendChild(opt);
        }
    }



    function getDocB_Last() {
        DocBMode = $("#DocBMode").val();
        if (DocBMode == null) DocBMode = -1;

        var DocB_LastObject = {
            erjaMode: erjaMode,
            docBMode: erjaMode == 1 ? DocBMode : "5",
            fromUserCode: erjaMode == 1 ? '' : userName,
            toUserCode: erjaMode == 1 ? userName : '',
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
        ajaxFunction(ErjDocB_LastUri, 'POST', DocB_LastObject, false).done(function (response) {
            self.DocB_LastList(response);
            $("#CountList").text(response.length);
        });
    }

    getDocB_Last();

    self.DocBModeChange = function () {
        getDocB_Last();
    }

    $('#refreshErja').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ارجاعات") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getDocB_Last();
            }
        })
    })


    $("#Close_ModalErjDocErja").click(function (e) {
        $('#modal-ErjDocErja').modal('hide');
    })

    function getDocK(serialnumber) {

        var DocKObject = {
            userName: '',
            userMode: '',
            azTarikh: '',
            taTarikh: '',
            Status: '',
            CustCode: '',
            KhdtCode: '',
            SrchSt: '',
            SerialNumber: serialnumber,
        };
        ajaxFunction(DocKUri , 'POST', DocKObject).done(function (response) {
            item = response[0];
            $("#m_docno").val(item.DocNo);

            $("#m_DocDate").val(item.DocDate);
            $("#m_MhltDate").val(item.MhltDate);
            $("#m_Eghdam").val(item.Eghdam);
            $("#m_Mahramaneh").val(item.Mahramaneh);
            $("#m_Tanzim").val(item.Tanzim);
            doc_KhdtCode = item.KhdtCode;
            $("#m_CustName").val(item.CustName);
            $("#m_KhdtName").val(item.KhdtName);
            $("#m_Spec").val(item.Spec);
            $("#m_MahramanehName").val(item.MahramanehName);

            related = item.RelatedDocs.split('-');
            $('#m_RelatedDocs').empty();
            if (related[0] != "") {
                temp = '';
                for (var i = 0; i < related.length; i++) {
                    temp += '<button type="button" class="related" id="' + related[i] +
                        '" style="background-color: white !important;color: black !important;border: 1px solid #bdb8b8;/* padding-left: 10px; */padding-right: 10px;font-size: 10px;border-radius: 10px;height: 24px;margin-right: 10px;padding-top: 3px;width: 70px;">'
                        + related[i] +
                        '</button>'
                }

                $('#m_RelatedDocs').append(temp);
            }

            $("#eghdamComm").val(item.EghdamComm);
            $('#eghdamComm').attr('readonly', true);
            $('#docDesc').attr('readonly', true);
            $("#docDesc").val(item.DocDesc);
            specialComm = item.SpecialComm;
            SpecialCommTrs = item.SpecialCommTrs;
            $("#specialComm").val(translate('برای نمایش کلیک کنید'));
            $("#specialComm").attr('readonly', true);

            TextHighlight("#specialComm");
            $("#finalComm").val(item.FinalComm);
            $("#ExtraFields01").val(item.F01);
            $("#ExtraFields02").val(item.F02);
            $("#ExtraFields03").val(item.F03);
            $("#ExtraFields04").val(item.F04);
            $("#ExtraFields05").val(item.F05);
            $("#ExtraFields06").val(item.F06);
            $("#ExtraFields07").val(item.F07);
            $("#ExtraFields08").val(item.F08);
            $("#ExtraFields09").val(item.F09);
            $("#ExtraFields10").val(item.F10);
            $("#ExtraFields11").val(item.F11);
            $("#ExtraFields12").val(item.F12);
            $("#ExtraFields13").val(item.F13);
            $("#ExtraFields14").val(item.F14);
            $("#ExtraFields15").val(item.F15);
            $("#ExtraFields16").val(item.F16);
            $("#ExtraFields17").val(item.F17);
            $("#ExtraFields18").val(item.F18);
            $("#ExtraFields19").val(item.F19);
            $("#ExtraFields20").val(item.F20);
           
        });
    }


    function getErjResultList(serialNumber, bMode, toUser, band) {
        var ErjResultObject = {
            SerialNumber: serialNumber,
            BandNo: band,
            DocBMode: bMode,
            ToUserCode: toUser,
        }
        ajaxFunction(ErjResultUri, 'Post', ErjResultObject).done(function (data) {
            if (data.length > 0) {
                if (bMode == null)
                    self.ErjResultList(data);
                item = data[0];
                bandNo = item.BandNo;
            }
        });
    }



    function getErjDocErja(serialNumber) {
        var ErjDocErjaObject = {
            SerialNumber: serialNumber,
        };
        ajaxFunction(ErjDocErjaUri, 'POST', ErjDocErjaObject).done(function (response) {
            self.ErjDocErja(response);
            SetDataErjDocErja();
        });
    }



    self.ViewErjDocErja = function (Band) {
        serialErja = Band.SerialNumber;
        docBMode = Band.DocBMode;

        getErjUsersList(serialErja);

        getDocK(serialErja);
        getErjResultList(serialErja, null, null, null)

        getErjDocErja(serialErja);

        $('#m_StatusParvandeh').val(Band.Status);
        $('#m_StatusErja').val(Band.RjStatus);

        old_StatusParvandeh = Band.Status;
        old_StatusErja = Band.RjStatus;

        khdtHasTime = Band.KhdtHasTime;

        showHideInformation = false;
        $('#panelInformation').attr('hidden', '');

        showHideSpec = false;

        $('#erja').removeAttr('hidden', '');
        $('#saveParvandeh').removeAttr('hidden', '');
        $('#panel_Result').removeAttr('hidden', '');
        $('#m_StatusParvandeh').prop('disabled', false);
        $('#m_StatusErja').prop('disabled', false);

        if (docBMode == 1) { // رونوشت
            $('#panelFooterParvandeh').attr('hidden', '');
            $('#panelFooterRonevesht').removeAttr('hidden', '');
            $('#erja').attr('hidden', '');

            $('#p_SaptDate').val(dateNow);
            $('#p_RjTime_M').val('');
            $('#p_RjTime_H').val('');


            if (Band.RjTime > 0) {
                $('#p_SaptDate').val(Band.RjDate);
                rjtimeRonevesht = Band.RjTimeSt.split(":");
                $('#p_RjTime_H').val(rjtimeRonevesht[0]);
                $('#p_RjTime_M').val(rjtimeRonevesht[1]);
            }

        }
        else {
            $('#panelFooterParvandeh').removeAttr('hidden', '');
            $('#panelFooterRonevesht').attr('hidden', '');
            $('#erja').removeAttr('hidden', '');
        }

        if (Band.ToUserCode.toUpperCase() != userName.toUpperCase() || sessionStorage.ModeCodeErja == "2") {
            flag_Save = true;
            $('#erja').attr('hidden', '');
            $('#panel_Result').attr('hidden', '');
            $('#saveParvandeh').attr('hidden', '');
            $('#m_StatusParvandeh').prop('disabled', true);
            $('#m_StatusErja').prop('disabled', true);
        }





        if (Band.RjReadSt == 'T' && sessionStorage.ModeCodeErja == "1") {
            ErjSaveDoc_RjRead_Object = {
                DocBMode: Band.DocBMode,
                SerialNumber: serialErja,
                BandNo: Band.BandNo,
                RjReadSt: 'F'
            };

            ajaxFunction(ErjSaveDoc_RjRead_Uri, 'POST', ErjSaveDoc_RjRead_Object).done(function (response) {
                //AlertErja();
            });
        }
        $('#modal-ErjDocErja').modal('show');

    }

    self.FilterErjValue = ko.observable("");
    self.FilterErj = ko.computed(function () {
        var filter = self.FilterErjValue();
        return ko.utils.arrayFilter(self.ErjDocErja(), function (item) {
            return item.BandNo == filter; 
        });
    });

    function SetDataErjDocErja() {
        list = self.ErjDocErja();
        $("#BodyErjDocH").empty();
        listLastBand = self.ErjResultList();
        if (list.length > 0) {
            listLastBand = self.ErjResultList();
            countBand = list[list.length - 1].BandNo;
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

            for (var i = 1; i <= countBand; i++) {

                self.FilterErjValue(i);
                listBand = self.FilterErj();
                text = ConvertComm(listBand[0].RjComm);

                countRonevesht = listBand.length

                if (countRonevesht > 1) {
                    // text += ' <br\> '
                }

                for (var j = 1; j < countRonevesht; j++) {
                    text +=
                        '  <div style="padding: 3px;margin: 0px 10px 0px 0px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                        + '   <div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('نتیجه رونوشت از :') + '</h6> <h6>' + listBand[j].FromUserName + '</h6>'
                        + '   </div>'
                        + '</div > '
                    if (listBand[j].RjComm == '')
                        text += ' <div style="margin: 0px 15px 0px 0px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">' + "‍‍";
                    else {
                        text += ' <div style="margin: 0px 15px 0px 0px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                        text += ConvertComm(listBand[j].RjComm);
                    }
                    text += ' </div> ';
                }



                if (listBand[0].RooneveshtUsers != '' && i < countBand) {

                    text += ''//'</br>'
                        + '  <div style="padding: 3px;margin: 0px 10px 0px 0px;background-color: #d9d9d9 !important;color: #555555;border-radius: 10px;">'
                        + '   <div class=" form-inline" > <h6>' + translate(' رونوشت به : ')
                        + listBand[0].RooneveshtUsers
                        + '</h6>'
                        + '</div > '
                    text += ' </div> ';
                }


                textBody =
                    '<div style="border-top: 0px solid #fff !important;">'
                    + '    <div>'
                    + '        <div class="cardErj">'
                    + '            <div class="header" style="background-color: #f5d3b4;padding-right: 3px;padding-left: 0px;">'
                    + '<div class="form-inline"> '
                    + '     <div class= "col-md-8 form-inline" > '
                    + '         <h6>' + i + ') ' + listBand[0].FromUserName + '</h6>'
                    + '         <img src="/Content/img/new item/arrow-back-svgrepo-com.svg" style="width: 11px;margin-left: 0px; margin-right: 0px;" /> '
                    + '         <h6>' + listBand[0].ToUserName + '</h6> '
                    + '     </div>'
                    + '     <div class="col-md-4 form-inline"> '
                    + '         <h6 style="padding-left: 5px;">' + listBand[0].RjTimeSt + '</h6> '
                    + '         <h6>' + listBand[0].RjDate + '</h6> '
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
                    + '<div class="body" style="padding:5px;">';

                textBody += text
                if (i == countBand)
                    textBody += textLastBand

                textBody += '</div>'
                    + '        </div>'
                    + '    </div>'
                    + '</div>'

                $('#BodyErjDocH').append(textBody);
               
            }
            if (i > 0)
                bandNo = i
            else
                bandNo = 1;
        }

    }

    $("#modal-ErjDocErja").on('shown.bs.modal', function () {
        var element = document.getElementById("BodyErjDocH");
        element.scrollTop = element.scrollHeight;
    });

    $("#modal-ErjDocErja").on('hidden.bs.modal', function () {
        if (sessionStorage.ModeCodeErja == "1") {
            getDocB_Last();
        }
    })


    $('#ShowHideInformation').click(function () {
        if (showHideInformation) {
            showHideInformation = false;
            $('#panelInformation').attr('hidden', '');
            $('#imgInformation').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        }
        else {
            showHideInformation = true;
            $('#panelInformation').removeAttr('hidden', '');
            $('#imgInformation').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
        }
    })

    $('#ShowHideSpec').click(function () {
        if (showHideSpec) {
            showHideSpec = false;
            $('#eghdamComm').css("height", "24px");
            $('#docDesc').css("height", "24px");
            $('#specialComm').css("height", "24px");
            $('#finalComm').css("height", "24px");
            $('#imgSpec').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        }
        else {
            showHideSpec = true;
            // autosize.update($('textarea'));
            autosize.update($('#eghdamComm'));
            autosize.update($('#docDesc'));

            if (SpecialCommTrs == 1) {
                if ($("#specialComm").css('font-style') == 'italic') {
                    $("#specialComm").attr('readonly', false);
                    TextHighlightDel("#specialComm");
                    $("#specialComm").val(specialComm);
                }
            }
            autosize.update($('#specialComm'));
            autosize.update($('#finalComm'));
            $('#imgSpec').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
        }

    })

    $('#specialComm').click(function () {
        if (SpecialCommTrs == 1) {
            if ($("#specialComm").css('font-style') == 'italic') {
                TextHighlightDel("#specialComm");
                $("#specialComm").attr('readonly', false);
                $("#specialComm").val(specialComm);
            }
        }
        else
            showNotification(translate('دسترسی ندارید'), 0);
    })


    $('#ShowEghdamComm').click(function () {
        $('#titleComm').text(translate('توضیحات اقدام'));
        $('#commPublic').attr("style", "");
        $('#codeComm').text('EghdamComm');
        $('#commPublic').attr('readonly', true);
        $('#commPublic').val($('#eghdamComm').val());
        $('#modal-Comm').modal('show');
    });

    $('#ShowDocDesc').click(function () {
        $('#titleComm').text(translate('توضیحات عمومی'));
        $('#commPublic').attr("style", "");
        $('#codeComm').text('DocDesc');
        $('#commPublic').attr('readonly', true);
        $('#commPublic').val($('#docDesc').val());
        $('#modal-Comm').modal('show');
    });

    $('#ShowSpecialComm').click(function () {
        $('#codeComm').text('SpecialComm');
        if (SpecialCommTrs == 1) {
            if ($("#specialComm").css('font-style') == 'italic') {
                $("#specialComm").attr('readonly', false);
                TextHighlightDel("#specialComm");
                $("#specialComm").val(specialComm);
            }
            $('#titleComm').text(translate('توضیحات مدیران'));
            $('#commPublic').attr("style", "");
            $('#commPublic').attr('readonly', false);
            $('#commPublic').val($('#specialComm').val());
            $('#modal-Comm').modal('show');
        }
    });


    $('#ShowFinalComm').click(function () {
        $('#codeComm').text('FinalComm');
        $('#titleComm').text(translate('توضیحات نهایی'));
        $('#commPublic').attr("style", "");
        $('#commPublic').attr('readonly', false);
        $('#commPublic').val($('#finalComm').val());
        $('#modal-Comm').modal('show');
    });


    $('#ShowResult').click(function () {
        $('#codeComm').text('Natijeh');
        $('#titleComm').text(translate('نتیجه'));
        $('#commPublic').attr("style", "");
        $('#commPublic').attr('readonly', false);
        $('#commPublic').val($('#Result').val());
        $('#modal-Comm').modal('show');
    });



    var DocAttachUri = server + '/api/KarbordData/DocAttach/'; // آدرس لیست پیوست 
    self.DocAttachList = ko.observableArray([]); // ليست پیوست
    self.AddAttachList = ko.observableArray([]);

    function getDocAttachList(serial) {
        var DocAttachObject = {
            ProgName: 'ERJ1',
            ModeCode: '1',
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
                getDocAttachList(serialErja);
            }
        })
    })


    $('#attachFile').click(function () {
        getDocAttachList(serialErja);
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
                    ModeCode: '1',
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






    $('#saveParvandeh').click(function () {
        SaveParvandeh();
    })


    function SaveParvandeh() {
        flagSave = true;
        if (docBMode == 1) { // رونوشت
            trs = localStorage.getItem("userModeErj");
            if (trs == 'ADMIN') {
                SaveDoch();
            }

            ErjSaveDoc_CD(bandNo);
            ErjSaveDoc_CSave(bandNo, true);
        }
        else {
            ErjSaveDoc_BSave(bandNo);
        }
    }


    //Add DocB  ذخیره ارجاعات
    function ErjSaveDoc_BSave(bandNoImput) {
        rjDate = dateNow;
        rjMhltDate = $("#RjMhltDate").val().toEnglishDigit();
        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();
        fromUserCode = userName;

        
        toUserCode = $("#p_ErjUser").val();
        rjTime = 0;
        if (bandNoImput == 0 || sessionStorage.ModeCodeErja == "2") {
            if (rjTime_H != '' || rjTime_M != '') {

                if (rjTime_M != '') {
                    rjTime_M = parseInt(rjTime_M);
                    rjTime_M = rjTime_M / 60;
                }
                else {
                    rjTime_M = parseInt('0');
                }

                if (rjTime_H != '') {
                    rjTime_H = parseInt(rjTime_H);
                }
                else {
                    rjTime_H = parseInt("0");
                }


                rjTime = rjTime_H + rjTime_M;
            }
        }

        var ErjSaveDoc_BSaveObject;
        if (bandNoImput == 0 || sessionStorage.ModeCodeErja == "2") { // erja
            natijeh = $("#e_Result").val();


            ErjSaveDoc_BSaveObject = {
                SerialNumber: serialNumber,
                Natijeh: natijeh,
                FromUserCode: fromUserCode,
                ToUserCode: toUserCode,
                RjDate: '',//rjDate,
                RjTime: rjTime,
                RjMhltDate: rjMhltDate,
                BandNo: bandNoImput,
                SrMode: sessionStorage.ModeCodeErja == "1" ? 0 : 1,
                RjStatus: $("#m_StatusErja").val(),
                FarayandCode: self.FarayandCode(),
            };
        }
        else // save
        {

            SaveDoch();
            status = $("#m_StatusParvandeh").val();

            natijeh = $("#Result").val();

            ErjSaveDoc_BSaveObject = {
                SerialNumber: serialNumber,
                Natijeh: natijeh,
                FromUserCode: '',
                ToUserCode: '',
                RjDate: '',//rjDate,
                RjTime: 0,
                RjMhltDate: '',
                BandNo: bandNoImput,
                SrMode: sessionStorage.ModeCodeErja == "1" ? 0 : 1,
                RjStatus: $("#m_StatusErja").val(),
                FarayandCode: 0,
            };



            ErjSaveDoc_HStatusObject = {
                SerialNumber: serialNumber,
                Status: status
            };
            ajaxFunction(ErjSaveDoc_HStatusUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_HStatusObject).done(function (response) {

            });

        }


        ajaxFunction(ErjSaveDoc_BSaveUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_BSaveObject).done(function (response) {
            if (flagSave == true) {
                showNotification(translate('پرونده') + ' ' + serialNumber + ' ' + translate('ذخیره شد'), 1);
            }
            else if (flagSave == false) {
            }

            $("#TableBodyListErjUsersRonevesht").empty();

            if (flagSave != null) {
                getDocB_Last();
                self.sortTableDocB_Last();
            }

        });
        flagInsertFdoch = 1;
    };




    function SaveDoch() {
        status = $("#m_StatusParvandeh").val();

        if ($("#specialComm").css('font-style') == 'italic')
            special = specialComm;
        else
            special = $("#specialComm").val();



        ErjSaveDoc_HUObject = { // ذخیره اطلاعات پرونده
            SerialNumber: serialNumber,
            Tanzim: sessionStorage.userName,
            Status: status,
            Spec: $("#m_Spec").val(),
            DocDesc: $("#docDesc").val(),
            EghdamComm: $("#eghdamComm").val(),
            FinalComm: $("#finalComm").val(),
            SpecialComm: special,
            F01: $("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val(),
            F02: $("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val(),
            F03: $("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val(),
            F04: $("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val(),
            F05: $("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val(),
            F06: $("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val(),
            F07: $("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val(),
            F08: $("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val(),
            F09: $("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val(),
            F10: $("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val(),
            F11: $("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val(),
            F12: $("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val(),
            F13: $("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val(),
            F14: $("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val(),
            F15: $("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val(),
            F16: $("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val(),
            F17: $("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val(),
            F18: $("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val(),
            F19: $("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val(),
            F20: $("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val(),
        };

        ajaxFunction(Web_ErjSaveDoc_HUUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_HUObject).done(function (response) {
            flag_Save = true;
        });
    }



    $('#erja').click(function () {
        $('#p_Result').css('display', 'none');
        $('#modal-Erja').modal('show');
    });

    $("#Close_ModalErj").click(function (e) {
        $('#modal-Erja').modal('hide');
    })


    self.ErjUsersList = ko.observableArray([]); // لیست کاربران  
    var ErjUsersUri = server + '/api/KarbordData/Web_ErjUsers/'; // آدرس کاربران زمان ارجاع

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



};

ko.applyBindings(new ViewModel());

