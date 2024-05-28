var ViewModel = function () {
    var self = this;

    self.ErjDocHList = ko.observableArray([]); // لیست گزارش  
    self.FarayandList = ko.observableArray([]); // لیست فرایند 
    self.RelatedDocsList = ko.observableArray([]); // لیست گزارش  
    self.MahramanehList = ko.observableArray([]); // لیست محرمانه 
    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.ErjDocYearsList = ko.observableArray([]); // لیست سال پرونده ها 
    self.ErjDocErja = ko.observableArray([]); // لیست پرونده  
    self.ErjResultList = ko.observableArray([]); // لیست نتیجه 
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.ErjUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.RepToUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.DocAttachList = ko.observableArray([]); // ليست پیوست
    self.TestDoc_DeleteList = ko.observableArray([]); // لیست تست حذف 


    var ErjDocHUri = server + '/api/KarbordData/ErjDocH/'; // آدرس پرونده ها  
    var ErjDocErjaUri = server + '/api/KarbordData/ErjDocErja/'; // آدرس  ارجاع
    var ErjResultUri = server + '/api/KarbordData/ErjResult/'; // آدرس نتیجه
    var MahramanehUri = server + '/api/KarbordData/Mahramaneh/'; // آدرس محرمانه
    var ErjStatusUri = server + '/api/KarbordData/ErjStatus/'; // آدرس وضعیت 
    var ErjUsersUri = server + '/api/KarbordData/Web_ErjUsers/'; // آدرس کاربران زمان ارجاع
    







    self.p_DocDate = ko.observable('');
    self.p_MhltDate = ko.observable('');
    self.p_AmalDate = ko.observable('');
    self.p_EndDate = ko.observable('');
    self.p_Eghdam = ko.observable('');
    self.p_Tanzim = ko.observable('');
    self.p_EghdamName = ko.observable('');
    self.p_TanzimName = ko.observable('');
    self.p_Spec = ko.observable('');
    self.ErjCustCode = ko.observable();
    self.KhdtCode = ko.observable();
    self.p_RelatedDocs = ko.observable();
    self.p_Status = ko.observable();
    self.ErjUsersCode = ko.observable();
    self.DocYearsSelect = ko.observable();
    self.StatusParvandehSelect = ko.observable();
    self.FarayandCode = ko.observable();

    var useSanadOtherUser = true;
    var showHideResult = false;
    var serialErja = 0;


    function getErjDocH(log) {
        var ErjDocHObject = {
            Mode: 0,
            UserCode: userName,
            select: 0,
            AccessSanad: true,
            Sal: "",
            Status: "",
            DocNo: "",
            Sort: null,
            ModeSort: "DESC"
        };

        ajaxFunction(ErjDocHUri, 'Post', ErjDocHObject).done(function (data) {
            self.ErjDocHList(data);
        });
    }

    getErjDocH(true);


    function getErjDocErja(serialNumber) {
        var ErjDocErjaObject = {
            SerialNumber: serialNumber,
        };
        ajaxFunction(ErjDocErjaUri, 'POST', ErjDocErjaObject).done(function (response) {
            self.ErjDocErja(response);
            SetDataErjDocErja();
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
                    + '         <h6 style="font-size: 11px;">' + i + ') ' + listBand[0].FromUserName + '</h6>'
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




    self.ViewDocH = function (item) {

        serialErja = item.SerialNumber;

        editDoc = item.EditDocTrs && localStorage.getItem("CHG_ErjDOC")
        editDoc == true || editDoc == "true" ? $("#P_Action").show() : $("#P_Action").hide();

        flag_Save = false;
       

        khdtHasTime = item.KhdtHasTime;

        self.p_DocDate(item.DocDate);
        self.p_MhltDate(item.MhltDate);
        self.p_AmalDate(item.AmalDate);
        self.p_EndDate(item.EndDate);

        self.p_Eghdam(item.Eghdam);
        self.p_Tanzim(item.Tanzim);

        self.p_EghdamName(item.EghdamName);
        self.p_TanzimName(item.TanzimName);
        self.p_Spec(item.Spec);
        self.ErjCustCode(item.CustCode);
        self.KhdtCode(item.KhdtCode);
        doc_KhdtCode = item.KhdtCode;
        if (item.RelatedDocs == "0") {
            $('#p_RelatedDocs').val('');
            self.p_RelatedDocs("");
        }
        else {
            $('#p_RelatedDocs').val(item.RelatedDocs);
            self.p_RelatedDocs(item.RelatedDocs);
        }

        $('#p_docno').val(item.DocNo);
        $('#nameErjCust').val(item.CustName);
        $('#nameKhdt').val(item.KhdtName);

        $('#p_EghdamComm').val(item.EghdamComm);

        if (item.Eghdam == sessionStorage.userName)
            $('#p_EghdamComm').attr('readonly', false);
        else
            $('#p_EghdamComm').attr('readonly', true);

        $('#p_DocDesc').val(item.DocDesc);
        //$('#p_SpecialComm').val(item.SpecialComm);
        $('#p_FinalComm').val(item.FinalComm);
        $('#p_Mahramaneh').val(item.Mahramaneh);
        $('#p_Status').val(item.Status);

        specialComm = item.SpecialComm;
        SpecialCommTrs = item.SpecialCommTrs;
        $("#p_SpecialComm").val(translate('برای نمایش کلیک کنید'));
        $("#p_SpecialComm").attr('readonly', true);
        TextHighlight("#p_SpecialComm");

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

        docBMode = item.DocBMode;
        serialErja = item.SerialNumber;
        getErjResultList(serialErja, null, null, null)
        getErjDocErja(serialErja);


        if (self.ErjDocErja().length == 0) {
            $('#ErjDocErja').removeAttr('hidden', '');

            //$('#ErjDocErja').prop('disabled', false);
        }
        else {
            $('#ErjDocErja').attr('hidden', '');
            //$('#ErjDocErja').prop('disabled', true);
        }


        $('#saveDocH').removeAttr('hidden', '');
        $('#AddNewDocAttach').removeAttr('hidden', '');

        if (useSanadOtherUser == true) {
            $('#saveDocH').attr('hidden', '');
            $('#ErjDocErja').attr('hidden', '');
            $('#AddNewDocAttach').attr('hidden', '');
        }


        $('#modal-DocH').modal('show');

    }










    self.AddNewDocH = function (item) {
        $('#modal-DocH').modal('show');
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

    $("#modal-DocH").on('shown.bs.modal', function () {
        showHideResult = false;
    })

    self.currentPageIndexErjDocH = ko.observable(0);

    $('#refreshErjDocH').click(function () {

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
                getErjDocH(false);
            }
        })
    })

    $("#Close_ModalDocH").click(function (e) {
        $('#modal-DocH').modal('hide');
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


    function SaveDocH() {

        docDate = $("#p_DocDate").val().toEnglishDigit();
        natijeh = $("#Result").val();
        p_NameCust = $("#p_NameCust").val();
        p_Motaghazi = $("#p_Motaghazi").val();
        p_Status = $("#p_Status").val();
        p_Spec = $("#p_Spec").val();
        p_ActiveChat = $('#ActiveChat').is(':checked');


    }


    $('#saveDocH').click(function () {
        SaveDocH();
    });


    $('#Close_ModalErj').click(function () {
        $('#modal-Erja').modal('hide');
    })

    $('#SendDocH').click(function () {
        $('#modal-Erja').modal('show');
        $('#e_Result').val($('#Result').val());
    })



    function getErjUsersList(serial) {
        var ErjUsersObject = {
            userCode: userName,
            SerialNumber: serial,
        }
        ajaxFunction(ErjUsersUri, 'Post', ErjUsersObject).done(function (data) {
            self.ErjUsersList(data);
        });
    }





    $('#saveErja').click(function () {
        SaveErja();
    })





  

    function getMahramanehList() {

        list = localStorage.getItem('Mahramaneh');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('Mahramaneh'));
            self.MahramanehList(list)
        }
        else {
            ajaxFunction(MahramanehUri, 'GET').done(function (data) {
                self.MahramanehList(data);
                localStorage.setItem("Mahramaneh", JSON.stringify(data));
            });
        }
    }


    getMahramanehList();




};






ko.applyBindings(new ViewModel());

