﻿var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");


    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.KalaList = ko.observableArray([]); // ليست کالا ها
    self.CustList = ko.observableArray([]); // ليست مشتریان 
    self.CGruList = ko.observableArray([]); // ليست  گروه مشتریان 
    self.KGruList = ko.observableArray([]); // ليست گروه کالا ها
    self.MkzList = ko.observableArray([]); // ليست مرکز هزینه
    self.OprList = ko.observableArray([]); // ليست پروژه ها
    self.FModeList = ko.observableArray([]); // لیست نوع فاکتور ها
    self.StatusList = ko.observableArray([]); // ليست نوع سند ها


    self.TrzFKala_SList = ko.observableArray([]); // لیست گزارش  

    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالا ها
    var CustUri = server + '/api/Web_Data/Cust/'; // آدرس مشتریان
    var CGruUri = server + '/api/Web_Data/CGru/'; // آدرس گروه مشتریان
    var KGruUri = server + '/api/Web_Data/KGru/'; // آدرس گروه کالا
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var FModeUri = server + '/api/FDocData/FMode/'; // آدرس نوع فاکتور ها 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 

    var TrzFKala_SUri = server + '/api/ReportFct/TrzFKala/'; // آدرس گزارش 

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);

    self.AzShomarh = ko.observable();
    self.TaShomarh = ko.observable();


    var allSearchKala = true;

    var StatusCode = '';
    var counterStatus = 0;
    var list_StatusSelect = new Array();

    var KalaCode = '';
    var counterKala = 0;
    var list_KalaSelect = new Array();

    var InvCode = '';
    var counterInv = 0;
    var list_InvSelect = new Array();

    var KGruCode = '';
    var counterKGru = 0;
    var list_KGruSelect = new Array();

    var CustCode = '';
    var counterCust = 0;
    var list_CustSelect = new Array();

    var CGruCode = '';
    var counterCGru = 0;
    var list_CGruSelect = new Array();

    var MkzCode = '';
    var counterMkz = 0;
    var list_MkzSelect = new Array();

    var OprCode = '';
    var counterOpr = 0;
    var list_OprSelect = new Array();




    //CreateTableReport(RprtColsList);
    $("#textTotal").text('');


    //Get RprtCols List
    function getRprtColsList() {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/TrzFKala_S/' + sessionStorage.userName, 'GET').done(function (data) {
             CreateTableReport(data);
        });
    }

    //Get Status List
    function getStatusList() {
        progName = getProgName('S');
        ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
            self.StatusList(data);
        });
    }

    //Get  FMode List
    function getFModeList() {
        ajaxFunction(FModeUri + ace + '/' + sal + '/' + group + '/2', 'GET').done(function (data) {
            self.FModeList(data);

            select = document.getElementById('modeCode');
            for (var i = 0; i < data.length; i++) {
                opt = document.createElement('option');
                opt.value = data[i].Code;
                opt.innerHTML = data[i].Name;
                select.appendChild(opt);
            }

            opt = document.createElement('option');
            opt.value = data[1].Code + '*' + data[2].Code;
            opt.innerHTML = data[1].Name + ' با احتساب برگشتی';
            opt.selected = true;
            select.appendChild(opt);
        });
    }


    //Get  FMode List
    function getZeroList() {
        select = document.getElementById('zeroValue');

        opt = document.createElement('option');
        opt.value = '0';
        opt.innerHTML = 'نمایش مانده های صفر';
        opt.selected = true;
        select.appendChild(opt);

        opt = document.createElement('option');
        opt.value = '1';
        opt.innerHTML = 'عدم نمایش مانده های صفر';
        select.appendChild(opt);
    }




    //Get kala List
    function getKalaList() {
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.KalaList(data);
        });
    }

    //Get Inv List 
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.InvList(data);
        });
    }

    //Get  KGru List
    function getKGruList() {
        ajaxFunction(KGruUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.KGruList(data);
        });
    }

    self.OptionsCaptionAnbar = ko.computed(function () {
        return 'همه انبار ها';
    });


    //Get Cust List
    function getCustList() {
        ajaxFunction(CustUri + ace + '/' + sal + '/' + group + '/' + null, 'GET').done(function (data) {
            self.CustList(data);
        });
    }

    //Get CGru List
    function getCGruList() {
        ajaxFunction(CGruUri + ace + '/' + sal + '/' + group + '/1', 'GET').done(function (data) {
            self.CGruList(data);
        });
    }

    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.OprList(data);
        });
    }

    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.MkzList(data);
        });
    }

    //Get TrzFKala_S
    function getTrzFKala_S() {


        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

        azShomarh = $("#azshomarh").val();
        taShomarh = $("#tashomarh").val();

        zeroValue = $("#zeroValue").val();

        modeCode = $("#modeCode").val().split("*");
        modeCode1 = modeCode[0];
        modeCode2 = modeCode[1];
        if (modeCode.length == 1)
            modeCode2 = '';

        var statusCode = '';
        for (var i = 0; i <= counterStatus - 1; i++) {
            if (i < counterStatus - 1)
                statusCode += list_StatusSelect[i] + '*';
            else
                statusCode += list_StatusSelect[i];
        }

        var invcode = '';
        for (var i = 0; i <= counterInv - 1; i++) {
            if (i < counterInv - 1)
                invcode += list_InvSelect[i] + '*';
            else
                invcode += list_InvSelect[i];
        }

        var kGrucode = '';
        for (var i = 0; i <= counterKGru - 1; i++) {
            if (i < counterKGru - 1)
                kGrucode += list_KGruSelect[i] + '*';
            else
                kGrucode += list_KGruSelect[i];
        }

        var kalacode = '';
        for (var i = 0; i <= counterKala - 1; i++) {
            if (i < counterKala - 1)
                kalacode += list_KalaSelect[i] + '*';
            else
                kalacode += list_KalaSelect[i];
        }

        var Custcode = '';
        for (var i = 0; i <= counterCust - 1; i++) {
            if (i < counterCust - 1)
                Custcode += list_CustSelect[i] + '*';
            else
                Custcode += list_CustSelect[i];
        }

        var CGrucode = '';
        for (var i = 0; i <= counterCGru - 1; i++) {
            if (i < counterCGru - 1)
                CGrucode += list_CGruSelect[i] + '*';
            else
                CGrucode += list_CGruSelect[i];
        }

        var mkzcode = '';
        for (var i = 0; i <= counterMkz - 1; i++) {
            if (i < counterMkz - 1)
                mkzcode += list_MkzSelect[i] + '*';
            else
                mkzcode += list_MkzSelect[i];
        }

        var oprcode = '';
        for (var i = 0; i <= counterOpr - 1; i++) {
            if (i < counterOpr - 1)
                oprcode += list_OprSelect[i] + '*';
            else
                oprcode += list_OprSelect[i];
        }


        var TrzFKala_SObject = {
            ModeCode1: modeCode1,
            ModeCode2: modeCode2,
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            azShomarh: azShomarh,
            taShomarh: taShomarh,
            CustCode: Custcode,
            CGruCode: CGrucode,
            MkzCode: mkzcode,
            OprCode: oprcode,
            InvCode: invcode,
            StatusCode: statusCode,
            ZeroValue: zeroValue,
            KGruCode: kGrucode,
            KalaCode: kalacode,
        };
        ajaxFunction(TrzFKala_SUri + ace + '/' + sal + '/' + group, 'POST', TrzFKala_SObject).done(function (response) {
            self.TrzFKala_SList(response);
            $("div.loader").hide();
        });
    }

    function calcsum(list) {
        totalAmount1 = 0;
        totalAmount2 = 0;
        totalAmount3 = 0;
        totalAddMinPrice1 = 0;
        totalAddMinPrice2 = 0;
        totalAddMinPrice3 = 0;
        totalAddMinPrice4 = 0;
        totalAddMinPrice5 = 0;
        totalAddMinPrice6 = 0;
        totalAddMinPrice7 = 0;
        totalAddMinPrice8 = 0;
        totalAddMinPrice9 = 0;
        totalAddMinPrice10 = 0;
        totalUnitPrice1 = 0;
        totalUnitPrice2 = 0;
        totalUnitPrice3 = 0;
        totalDiscount = 0;
        totalOnlyDiscountPrice = 0;
        totalFinalPrice = 0;
        totalTotalPrice = 0;

        KalaDeghat1 = 0;
        KalaDeghat2 = 0;
        KalaDeghat3 = 0;

        PriceDeghat1 = 0;
        PriceDeghat2 = 0;
        PriceDeghat3 = 0;

        maxKalaDeghat1 = 0;
        maxKalaDeghat2 = 0;
        maxKalaDeghat3 = 0;

        maxPriceDeghat1 = 0;
        maxPriceDeghat2 = 0;
        maxPriceDeghat3 = 0;

        for (var i = 0; i < list.length; ++i) {
            TrzFKala_SData = list[i];
            totalAmount1 += TrzFKala_SData.Amount1;
            totalAmount2 += TrzFKala_SData.Amount2;
            totalAmount3 += TrzFKala_SData.Amount3;

            totalAddMinPrice1 += TrzFKala_SData.AddMinPrice1;
            totalAddMinPrice2 += TrzFKala_SData.AddMinPrice2;
            totalAddMinPrice3 += TrzFKala_SData.AddMinPrice3;
            totalAddMinPrice4 += TrzFKala_SData.AddMinPrice4;
            totalAddMinPrice5 += TrzFKala_SData.AddMinPrice5;
            totalAddMinPrice6 += TrzFKala_SData.AddMinPrice6;
            totalAddMinPrice7 += TrzFKala_SData.AddMinPrice7;
            totalAddMinPrice8 += TrzFKala_SData.AddMinPrice8;
            totalAddMinPrice9 += TrzFKala_SData.AddMinPrice9;
            totalAddMinPrice10 += TrzFKala_SData.AddMinPrice10;

            totalDiscount += TrzFKala_SData.Discount;
            totalOnlyDiscountPrice += TrzFKala_SData.OnlyDiscountPrice;
            totalFinalPrice += TrzFKala_SData.FinalPrice;
            totalTotalPrice += TrzFKala_SData.TotalPrice;

            KalaDeghat1 = TrzFKala_SData.DeghatM1;
            KalaDeghat2 = TrzFKala_SData.DeghatM2;
            KalaDeghat3 = TrzFKala_SData.DeghatM3;

            KalaDeghat1 > maxKalaDeghat1 ? maxKalaDeghat1 = KalaDeghat1 : maxKalaDeghat1 = maxKalaDeghat1;
            KalaDeghat2 > maxKalaDeghat2 ? maxKalaDeghat2 = KalaDeghat2 : maxKalaDeghat2 = maxKalaDeghat2;
            KalaDeghat3 > maxKalaDeghat3 ? maxKalaDeghat3 = KalaDeghat3 : maxKalaDeghat3 = maxKalaDeghat3;
        }

        $("#textTotal").text('جمع');
        $("#totalAmount1").text(NumberToNumberString(totalAmount1.toFixed(maxKalaDeghat1)));
        $("#totalAmount2").text(NumberToNumberString(totalAmount2.toFixed(maxKalaDeghat2)));
        $("#totalAmount3").text(NumberToNumberString(totalAmount3.toFixed(maxKalaDeghat3)));
        $("#totalAddMinPrice1").text(NumberToNumberString(totalAddMinPrice1.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice2").text(NumberToNumberString(totalAddMinPrice2.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice3").text(NumberToNumberString(totalAddMinPrice3.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice4").text(NumberToNumberString(totalAddMinPrice4.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice5").text(NumberToNumberString(totalAddMinPrice5.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice6").text(NumberToNumberString(totalAddMinPrice6.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice7").text(NumberToNumberString(totalAddMinPrice7.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice8").text(NumberToNumberString(totalAddMinPrice8.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice9").text(NumberToNumberString(totalAddMinPrice9.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice10").text(NumberToNumberString(totalAddMinPrice10.toFixed(parseInt(sessionStorage.Deghat))));
        //$("#totalUnitPrice").text(NumberToNumberString(totalUnitPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalDiscount").text(NumberToNumberString(totalDiscount.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalOnlyDiscountPrice").text(NumberToNumberString(totalOnlyDiscountPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalFinalPrice").text(NumberToNumberString(totalFinalPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalTotalPrice").text(NumberToNumberString(totalTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

    }


    $("#CreateReport").click(function () {
        getTrzFKala_S();
    });

    getRprtColsList();
    getFModeList();
    getInvList();
    getKalaList();
    getCustList();
    getStatusList();
    getCGruList();
    getKGruList();
    getOprList();
    getMkzList();
    getZeroList();

    $('#nameKala').val('همه موارد');
    $('#nameInv').val('همه موارد');
    $('#nameKGru').val('همه موارد');
    $('#nameCust').val('همه موارد');
    $('#nameCGru').val('همه موارد');
    $('#nameOpr').val('همه موارد');
    $('#nameMkz').val('همه موارد');
    $('#nameStatus').val('همه موارد');

    self.currentPageTrzFKala_S = ko.observable();
    self.pageSizeTrzFKala_S = ko.observable(10);
    self.currentPageIndexTrzFKala_S = ko.observable(0);
    self.iconType = ko.observable("");

    self.filterKalaCode = ko.observable("");
    self.filterKalaName = ko.observable("");
    self.filterKalaF01 = ko.observable("");
    self.filterKalaF02 = ko.observable("");
    self.filterKalaF03 = ko.observable("");
    self.filterKalaF04 = ko.observable("");
    self.filterKalaF05 = ko.observable("");
    self.filterKalaF06 = ko.observable("");
    self.filterKalaF07 = ko.observable("");
    self.filterKalaF08 = ko.observable("");
    self.filterKalaF09 = ko.observable("");
    self.filterKalaF10 = ko.observable("");
    self.filterKalaF11 = ko.observable("");
    self.filterKalaF12 = ko.observable("");
    self.filterKalaF13 = ko.observable("");
    self.filterKalaF14 = ko.observable("");
    self.filterKalaF15 = ko.observable("");
    self.filterKalaF16 = ko.observable("");
    self.filterKalaF17 = ko.observable("");
    self.filterKalaF18 = ko.observable("");
    self.filterKalaF19 = ko.observable("");
    self.filterKalaF20 = ko.observable("");
    self.filterKalaUnitName1 = ko.observable("");
    self.filterKalaUnitName2 = ko.observable("");
    self.filterKalaUnitName3 = ko.observable("");
    self.filterAmount1 = ko.observable("");
    self.filterAmount2 = ko.observable("");
    self.filterAmount3 = ko.observable("");
    self.filterAddMinPrice1 = ko.observable("");
    self.filterAddMinPrice2 = ko.observable("");
    self.filterAddMinPrice3 = ko.observable("");
    self.filterAddMinPrice4 = ko.observable("");
    self.filterAddMinPrice5 = ko.observable("");
    self.filterAddMinPrice6 = ko.observable("");
    self.filterAddMinPrice7 = ko.observable("");
    self.filterAddMinPrice8 = ko.observable("");
    self.filterAddMinPrice9 = ko.observable("");
    self.filterAddMinPrice10 = ko.observable("");
    self.filterUnitPrice1 = ko.observable("");
    self.filterUnitPrice2 = ko.observable("");
    self.filterUnitPrice3 = ko.observable("");
    self.filterDiscount = ko.observable("");
    self.filterOnlyDiscountPrice = ko.observable("");
    self.filterFinalPrice = ko.observable("");
    self.filterTotalPrice = ko.observable("");

    self.filterTrzFKala_SList = ko.computed(function () {
        self.currentPageIndexTrzFKala_S(0);
        var filterKalaCode = self.filterKalaCode();
        var filterKalaName = self.filterKalaName();
        var filterKalaF01 = self.filterKalaF01();
        var filterKalaF02 = self.filterKalaF02();
        var filterKalaF03 = self.filterKalaF03();
        var filterKalaF04 = self.filterKalaF04();
        var filterKalaF05 = self.filterKalaF05();
        var filterKalaF06 = self.filterKalaF06();
        var filterKalaF07 = self.filterKalaF07();
        var filterKalaF08 = self.filterKalaF08();
        var filterKalaF09 = self.filterKalaF09();
        var filterKalaF10 = self.filterKalaF10();
        var filterKalaF11 = self.filterKalaF11();
        var filterKalaF12 = self.filterKalaF12();
        var filterKalaF13 = self.filterKalaF13();
        var filterKalaF14 = self.filterKalaF14();
        var filterKalaF15 = self.filterKalaF15();
        var filterKalaF16 = self.filterKalaF16();
        var filterKalaF17 = self.filterKalaF17();
        var filterKalaF18 = self.filterKalaF18();
        var filterKalaF19 = self.filterKalaF19();
        var filterKalaF20 = self.filterKalaF20();
        var filterKalaUnitName1 = self.filterKalaUnitName1();
        var filterKalaUnitName2 = self.filterKalaUnitName2();
        var filterKalaUnitName3 = self.filterKalaUnitName3();
        var filterAmount1 = self.filterAmount1();
        var filterAmount2 = self.filterAmount2();
        var filterAmount3 = self.filterAmount3();
        var filterAddMinPrice1 = self.filterAddMinPrice1();
        var filterAddMinPrice2 = self.filterAddMinPrice2();
        var filterAddMinPrice3 = self.filterAddMinPrice3();
        var filterAddMinPrice4 = self.filterAddMinPrice4();
        var filterAddMinPrice5 = self.filterAddMinPrice5();
        var filterAddMinPrice6 = self.filterAddMinPrice6();
        var filterAddMinPrice7 = self.filterAddMinPrice7();
        var filterAddMinPrice8 = self.filterAddMinPrice8();
        var filterAddMinPrice9 = self.filterAddMinPrice9();
        var filterAddMinPrice10 = self.filterAddMinPrice10();
        var filterUnitPrice1 = self.filterUnitPrice1();
        var filterUnitPrice2 = self.filterUnitPrice2();
        var filterUnitPrice3 = self.filterUnitPrice3();
        var filterDiscount = self.filterDiscount();
        var filterOnlyDiscountPrice = self.filterOnlyDiscountPrice();
        var filterFinalPrice = self.filterFinalPrice();
        var filterTotalPrice = self.filterTotalPrice();

        tempData = ko.utils.arrayFilter(self.TrzFKala_SList(), function (item) {
            result =
                (item.KalaCode == null ? '' : item.KalaCode.toString().search(filterKalaCode) >= 0) &&
                (item.KalaName == null ? '' : item.KalaName.toString().search(filterKalaName) >= 0) &&
                (item.KalaF01 == null ? '' : item.KalaF01.toString().search(filterKalaF01) >= 0) &&
                (item.KalaF02 == null ? '' : item.KalaF01.toString().search(filterKalaF02) >= 0) &&
                (item.KalaF03 == null ? '' : item.KalaF01.toString().search(filterKalaF03) >= 0) &&
                (item.KalaF04 == null ? '' : item.KalaF01.toString().search(filterKalaF04) >= 0) &&
                (item.KalaF05 == null ? '' : item.KalaF01.toString().search(filterKalaF05) >= 0) &&
                (item.KalaF06 == null ? '' : item.KalaF01.toString().search(filterKalaF06) >= 0) &&
                (item.KalaF07 == null ? '' : item.KalaF01.toString().search(filterKalaF07) >= 0) &&
                (item.KalaF08 == null ? '' : item.KalaF01.toString().search(filterKalaF08) >= 0) &&
                (item.KalaF09 == null ? '' : item.KalaF01.toString().search(filterKalaF09) >= 0) &&
                (item.KalaF10 == null ? '' : item.KalaF01.toString().search(filterKalaF10) >= 0) &&
                (item.KalaF11 == null ? '' : item.KalaF01.toString().search(filterKalaF11) >= 0) &&
                (item.KalaF12 == null ? '' : item.KalaF01.toString().search(filterKalaF12) >= 0) &&
                (item.KalaF13 == null ? '' : item.KalaF01.toString().search(filterKalaF13) >= 0) &&
                (item.KalaF14 == null ? '' : item.KalaF01.toString().search(filterKalaF14) >= 0) &&
                (item.KalaF15 == null ? '' : item.KalaF01.toString().search(filterKalaF15) >= 0) &&
                (item.KalaF16 == null ? '' : item.KalaF01.toString().search(filterKalaF16) >= 0) &&
                (item.KalaF17 == null ? '' : item.KalaF01.toString().search(filterKalaF17) >= 0) &&
                (item.KalaF18 == null ? '' : item.KalaF01.toString().search(filterKalaF18) >= 0) &&
                (item.KalaF19 == null ? '' : item.KalaF01.toString().search(filterKalaF19) >= 0) &&
                (item.KalaF20 == null ? '' : item.KalaF01.toString().search(filterKalaF20) >= 0) &&
                (item.KalaUnitName1 == null ? '' : item.KalaUnitName1.toString().search(filterKalaUnitName1) >= 0) &&
                (item.KalaUnitName2 == null ? '' : item.KalaUnitName2.toString().search(filterKalaUnitName2) >= 0) &&
                (item.KalaUnitName3 == null ? '' : item.KalaUnitName3.toString().search(filterKalaUnitName3) >= 0) &&
                ko.utils.stringStartsWith(item.Amount1.toString().toLowerCase(), filterAmount1) &&
                ko.utils.stringStartsWith(item.Amount2.toString().toLowerCase(), filterAmount2) &&
                ko.utils.stringStartsWith(item.Amount3.toString().toLowerCase(), filterAmount3) &&
                ko.utils.stringStartsWith(item.AddMinPrice1.toString().toLowerCase(), filterAddMinPrice1) &&
                ko.utils.stringStartsWith(item.AddMinPrice2.toString().toLowerCase(), filterAddMinPrice2) &&
                ko.utils.stringStartsWith(item.AddMinPrice3.toString().toLowerCase(), filterAddMinPrice3) &&
                ko.utils.stringStartsWith(item.AddMinPrice4.toString().toLowerCase(), filterAddMinPrice4) &&
                ko.utils.stringStartsWith(item.AddMinPrice5.toString().toLowerCase(), filterAddMinPrice5) &&
                ko.utils.stringStartsWith(item.AddMinPrice6.toString().toLowerCase(), filterAddMinPrice6) &&
                ko.utils.stringStartsWith(item.AddMinPrice7.toString().toLowerCase(), filterAddMinPrice7) &&
                ko.utils.stringStartsWith(item.AddMinPrice8.toString().toLowerCase(), filterAddMinPrice8) &&
                ko.utils.stringStartsWith(item.AddMinPrice9.toString().toLowerCase(), filterAddMinPrice9) &&
                ko.utils.stringStartsWith(item.AddMinPrice10.toString().toLowerCase(), filterAddMinPrice10) &&
                ko.utils.stringStartsWith(item.UnitPrice1.toString().toLowerCase(), filterUnitPrice1) &&
                ko.utils.stringStartsWith(item.UnitPrice2.toString().toLowerCase(), filterUnitPrice2) &&
                ko.utils.stringStartsWith(item.UnitPrice3.toString().toLowerCase(), filterUnitPrice3) &&
                ko.utils.stringStartsWith(item.Discount.toString().toLowerCase(), filterDiscount) &&
                ko.utils.stringStartsWith(item.OnlyDiscountPrice.toString().toLowerCase(), filterOnlyDiscountPrice) &&
                ko.utils.stringStartsWith(item.FinalPrice.toString().toLowerCase(), filterFinalPrice) &&
                ko.utils.stringStartsWith(item.TotalPrice.toString().toLowerCase(), filterTotalPrice)
            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;

    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchTrzFKala_S);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTrzFKala_S = 0;
        sessionStorage.searchTrzFKala_S = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTrzFKala_S(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TrzFKala_SList(), function (item) {
                indexTrzFKala_S += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexTrzFKala_S < self.pageSizeTrzFKala_S())
                self.currentPageIndexTrzFKala_S(0);
            else {
                var a = Math.round((indexTrzFKala_S / self.pageSizeTrzFKala_S()), 0);
                if (a < (indexTrzFKala_S / self.pageSizeTrzFKala_S())) a += 1;
                self.currentPageIndexTrzFKala_S(a - 1);
            }
            return value;
        }
    });


    self.currentPageTrzFKala_S = ko.computed(function () {
        var pageSizeTrzFKala_S = parseInt(self.pageSizeTrzFKala_S(), 10),
            startIndex = pageSizeTrzFKala_S * self.currentPageIndexTrzFKala_S(),
            endIndex = startIndex + pageSizeTrzFKala_S;
        return self.filterTrzFKala_SList().slice(startIndex, endIndex);
    });

    self.nextPageTrzFKala_S = function () {
        if (((self.currentPageIndexTrzFKala_S() + 1) * self.pageSizeTrzFKala_S()) < self.filterTrzFKala_SList().length) {
            self.currentPageIndexTrzFKala_S(self.currentPageIndexTrzFKala_S() + 1);
        }
    };

    self.previousPageTrzFKala_S = function () {
        if (self.currentPageIndexTrzFKala_S() > 0) {
            self.currentPageIndexTrzFKala_S(self.currentPageIndexTrzFKala_S() - 1);
        }
    };

    self.firstPageTrzFKala_S = function () {
        self.currentPageIndexTrzFKala_S(0);
    };

    self.lastPageTrzFKala_S = function () {
        tempCountTrzFKala_S = parseInt(self.filterTrzFKala_SList().length / self.pageSizeTrzFKala_S(), 10);
        if ((self.filterTrzFKala_SList().length % self.pageSizeTrzFKala_S()) == 0)
            self.currentPageIndexTrzFKala_S(tempCountTrzFKala_S - 1);
        else
            self.currentPageIndexTrzFKala_S(tempCountTrzFKala_S);
    };


    self.iconTypeKalaCode = ko.observable("");
    self.iconTypeKalaName = ko.observable("");
    self.iconTypeKalaF01 = ko.observable("");
    self.iconTypeKalaF01 = ko.observable("");
    self.iconTypeKalaF02 = ko.observable("");
    self.iconTypeKalaF03 = ko.observable("");
    self.iconTypeKalaF04 = ko.observable("");
    self.iconTypeKalaF05 = ko.observable("");
    self.iconTypeKalaF06 = ko.observable("");
    self.iconTypeKalaF07 = ko.observable("");
    self.iconTypeKalaF08 = ko.observable("");
    self.iconTypeKalaF09 = ko.observable("");
    self.iconTypeKalaF10 = ko.observable("");
    self.iconTypeKalaF11 = ko.observable("");
    self.iconTypeKalaF12 = ko.observable("");
    self.iconTypeKalaF13 = ko.observable("");
    self.iconTypeKalaF14 = ko.observable("");
    self.iconTypeKalaF15 = ko.observable("");
    self.iconTypeKalaF16 = ko.observable("");
    self.iconTypeKalaF17 = ko.observable("");
    self.iconTypeKalaF18 = ko.observable("");
    self.iconTypeKalaF19 = ko.observable("");
    self.iconTypeKalaF20 = ko.observable("");
    self.iconTypeKalaUnitName1 = ko.observable("");
    self.iconTypeKalaUnitName2 = ko.observable("");
    self.iconTypeKalaUnitName3 = ko.observable("");
    self.iconTypeAmount1 = ko.observable("");
    self.iconTypeAmount2 = ko.observable("");
    self.iconTypeAmount3 = ko.observable("");
    self.iconTypeAddMinPrice1 = ko.observable("");
    self.iconTypeAddMinPrice2 = ko.observable("");
    self.iconTypeAddMinPrice3 = ko.observable("");
    self.iconTypeAddMinPrice4 = ko.observable("");
    self.iconTypeAddMinPrice5 = ko.observable("");
    self.iconTypeAddMinPrice6 = ko.observable("");
    self.iconTypeAddMinPrice7 = ko.observable("");
    self.iconTypeAddMinPrice8 = ko.observable("");
    self.iconTypeAddMinPrice9 = ko.observable("");
    self.iconTypeAddMinPrice10 = ko.observable("");
    self.iconTypeUnitPrice1 = ko.observable("");
    self.iconTypeUnitPrice2 = ko.observable("");
    self.iconTypeUnitPrice3 = ko.observable("");
    self.iconTypeDiscount = ko.observable("");
    self.iconTypeOnlyDiscountPrice = ko.observable("");
    self.iconTypeFinalPrice = ko.observable("");
    self.iconTypeTotalPrice = ko.observable("");

    self.sortTableTrzFKala_S = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.TrzFKala_SList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";


        self.iconTypeKalaCode('');
        self.iconTypeKalaName('');
        self.iconTypeKalaF01('');
        self.iconTypeKalaF01('');
        self.iconTypeKalaF02('');
        self.iconTypeKalaF03('');
        self.iconTypeKalaF04('');
        self.iconTypeKalaF05('');
        self.iconTypeKalaF06('');
        self.iconTypeKalaF07('');
        self.iconTypeKalaF08('');
        self.iconTypeKalaF09('');
        self.iconTypeKalaF10('');
        self.iconTypeKalaF11('');
        self.iconTypeKalaF12('');
        self.iconTypeKalaF13('');
        self.iconTypeKalaF14('');
        self.iconTypeKalaF15('');
        self.iconTypeKalaF16('');
        self.iconTypeKalaF17('');
        self.iconTypeKalaF18('');
        self.iconTypeKalaF19('');
        self.iconTypeKalaF20('');
        self.iconTypeKalaUnitName1('');
        self.iconTypeKalaUnitName2('');
        self.iconTypeKalaUnitName3('');
        self.iconTypeAmount1('');
        self.iconTypeAmount2('');
        self.iconTypeAmount3('');
        self.iconTypeAddMinPrice1('');
        self.iconTypeAddMinPrice2('');
        self.iconTypeAddMinPrice3('');
        self.iconTypeAddMinPrice4('');
        self.iconTypeAddMinPrice5('');
        self.iconTypeAddMinPrice6('');
        self.iconTypeAddMinPrice7('');
        self.iconTypeAddMinPrice8('');
        self.iconTypeAddMinPrice9('');
        self.iconTypeAddMinPrice10('');
        self.iconTypeUnitPrice1('');
        self.iconTypeUnitPrice2('');
        self.iconTypeUnitPrice3('');
        self.iconTypeDiscount('');
        self.iconTypeOnlyDiscountPrice('');
        self.iconTypeFinalPrice('');
        self.iconTypeTotalPrice('');

        if (orderProp == 'KalaCode') self.iconTypeKalaCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaName') self.iconTypeKalaName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF01') self.iconTypeKalaF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF02') self.iconTypeKalaF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF03') self.iconTypeKalaF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF04') self.iconTypeKalaF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF05') self.iconTypeKalaF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF06') self.iconTypeKalaF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF07') self.iconTypeKalaF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF08') self.iconTypeKalaF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF09') self.iconTypeKalaF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF10') self.iconTypeKalaF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF11') self.iconTypeKalaF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF12') self.iconTypeKalaF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF13') self.iconTypeKalaF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF14') self.iconTypeKalaF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF15') self.iconTypeKalaF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF16') self.iconTypeKalaF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF17') self.iconTypeKalaF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF18') self.iconTypeKalaF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF19') self.iconTypeKalaF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF20') self.iconTypeKalaF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName1') self.iconTypeKalaUnitName1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName2') self.iconTypeKalaUnitName2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName3') self.iconTypeKalaUnitName3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount1') self.iconTypeAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount2') self.iconTypeAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount3') self.iconTypeAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice1') self.iconTypeAddMinPrice1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice2') self.iconTypeAddMinPrice2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice3') self.iconTypeAddMinPrice3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice4') self.iconTypeAddMinPrice4((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice5') self.iconTypeAddMinPrice5((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice6') self.iconTypeAddMinPrice6((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice7') self.iconTypeAddMinPrice7((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice8') self.iconTypeAddMinPrice8((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice9') self.iconTypeAddMinPrice9((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice10') self.iconTypeAddMinPrice10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice1') self.iconTypeUnitPrice1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice2') self.iconTypeUnitPrice2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice3') self.iconTypeUnitPrice3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Discount') self.iconTypeDiscount((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OnlyDiscountPrice') self.iconTypeOnlyDiscountPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FinalPrice') self.iconTypeFinalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TotalPrice') self.iconTypeTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    }


    self.currentPageInv = ko.observable();
    self.pageSizeInv = ko.observable(10);
    self.currentPageIndexInv = ko.observable(0);

    self.filterInv0 = ko.observable("");
    self.filterInv1 = ko.observable("");
    self.filterInv2 = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");


    self.currentPageStatus = ko.observable();
    self.pageSizeStatus = ko.observable(10);
    self.currentPageIndexStatus = ko.observable(0);

    self.filterStatus0 = ko.observable("");

    self.filterStatusList = ko.computed(function () {

        self.currentPageIndexStatus(0);
        var filter0 = self.filterStatus0();

        if (!filter0) {
            return self.StatusList();
        } else {
            tempData = ko.utils.arrayFilter(self.StatusList(), function (item) {
                result =
                    item.Status == null ? '' : item.Status.toString().search(filter0) >= 0
                return result;
            })
            return tempData;
        }
    });


    self.currentPageStatus = ko.computed(function () {
        var pageSizeStatus = parseInt(self.pageSizeStatus(), 10),
            startIndex = pageSizeStatus * self.currentPageIndexStatus(),
            endIndex = startIndex + pageSizeStatus;
        return self.filterStatusList().slice(startIndex, endIndex);
    });

    self.nextPageStatus = function () {
        if (((self.currentPageIndexStatus() + 1) * self.pageSizeStatus()) < self.filterStatusList().length) {
            self.currentPageIndexStatus(self.currentPageIndexStatus() + 1);
        }
    };

    self.previousPageStatus = function () {
        if (self.currentPageIndexStatus() > 0) {
            self.currentPageIndexStatus(self.currentPageIndexStatus() - 1);
        }
    };

    self.firstPageStatus = function () {
        self.currentPageIndexStatus(0);
    };

    self.lastPageStatus = function () {
        countStatus = parseInt(self.filterStatusList().length / self.pageSizeStatus(), 10);
        if ((self.filterStatusList().length % self.pageSizeStatus()) == 0)
            self.currentPageIndexStatus(countStatus - 1);
        else
            self.currentPageIndexStatus(countStatus);
    };

    self.sortTableStatus = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.StatusList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeStatus('');


        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshStatus').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست وضعیت به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getStatusList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddStatus = function (item) {

        StatusCode = item.Code;
        find = false;
        list_StatusSelect.forEach(function (item, key) {
            if (item == StatusCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListStatus').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Status">' + item.Status + '</td > '
                + '</tr>'
            );
            list_StatusSelect[counterStatus] = item.Status;
            counterStatus = counterStatus + 1;
        }
    };


    self.AddAllStatus = function () {
        list_StatusSelect = new Array();
        list = self.StatusList();
        $("#TableBodyListStatus").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListStatus').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Status">' + list[i].Status + '</td > '
                + '</tr>'
            );
            list_StatusSelect[i] = list[i].Status;
            counterStatus = i + 1;
        }
    };


    self.DelAllStatus = function () {
        list_StatusSelect = new Array();
        counterStatus = 0;
        $("#TableBodyListStatus").empty();
    };


    $('#modal-Status').on('hide.bs.modal', function () {
        if (counterStatus > 0)
            $('#nameStatus').val(counterStatus + ' مورد انتخاب شده ')
        else
            $('#nameStatus').val('همه موارد');
    });

    $('#modal-Status').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });







    self.filterInvList = ko.computed(function () {

        self.currentPageIndexInv(0);
        var filter0 = self.filterInv0().toUpperCase();
        var filter1 = self.filterInv1();
        var filter2 = self.filterInv2();

        if (!filter0 && !filter1 && !filter2) {
            return self.InvList();
        } else {
            tempData = ko.utils.arrayFilter(self.InvList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageInv = ko.computed(function () {
        var pageSizeInv = parseInt(self.pageSizeInv(), 10),
            startIndex = pageSizeInv * self.currentPageIndexInv(),
            endIndex = startIndex + pageSizeInv;
        return self.filterInvList().slice(startIndex, endIndex);
    });

    self.nextPageInv = function () {
        if (((self.currentPageIndexInv() + 1) * self.pageSizeInv()) < self.filterInvList().length) {
            self.currentPageIndexInv(self.currentPageIndexInv() + 1);
        }
    };

    self.previousPageInv = function () {
        if (self.currentPageIndexInv() > 0) {
            self.currentPageIndexInv(self.currentPageIndexInv() - 1);
        }
    };

    self.firstPageInv = function () {
        self.currentPageIndexInv(0);
    };

    self.lastPageInv = function () {
        countInv = parseInt(self.filterInvList().length / self.pageSizeInv(), 10);
        if ((self.filterInvList().length % self.pageSizeInv()) == 0)
            self.currentPageIndexInv(countInv - 1);
        else
            self.currentPageIndexInv(countInv);
    };

    self.sortTableInv = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.InvList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });

        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";


        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');

        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");


        self.iconType((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }


    $('#refreshInv').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست انبار ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getInvList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddInv = function (item) {

        InvCode = item.Code;
        find = false;
        list_InvSelect.forEach(function (item, key) {
            if (item == InvCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListInv').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_InvSelect[counterInv] = item.Code;
            counterInv = counterInv + 1;
        }
    };


    self.AddAllInv = function () {
        list_InvSelect = new Array();
        list = self.InvList();
        $("#TableBodyListInv").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListInv').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_InvSelect[i] = list[i].Code;
            counterInv = i + 1;
        }
    };


    self.DelAllInv = function () {
        list_InvSelect = new Array();
        counterInv = 0;
        $("#TableBodyListInv").empty();
    };


    $('#modal-Inv').on('hide.bs.modal', function () {
        if (counterInv > 0)
            $('#nameInv').val(counterInv + ' مورد انتخاب شده ')
        else
            $('#nameInv').val('همه موارد');
    });

    $('#modal-Inv').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageKGru = ko.observable();
    self.pageSizeKGru = ko.observable(10);
    self.currentPageIndexKGru = ko.observable(0);

    self.filterKGru0 = ko.observable("");
    self.filterKGru1 = ko.observable("");
    self.filterKGru2 = ko.observable("");

    self.filterKGruList = ko.computed(function () {

        self.currentPageIndexKGru(0);
        var filter0 = self.filterKGru0().toUpperCase();
        var filter1 = self.filterKGru1();
        var filter2 = self.filterKGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.KGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.KGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKGru = ko.computed(function () {
        var pageSizeKGru = parseInt(self.pageSizeKGru(), 10),
            startIndex = pageSizeKGru * self.currentPageIndexKGru(),
            endIndex = startIndex + pageSizeKGru;
        return self.filterKGruList().slice(startIndex, endIndex);
    });

    self.nextPageKGru = function () {
        if (((self.currentPageIndexKGru() + 1) * self.pageSizeKGru()) < self.filterKGruList().length) {
            self.currentPageIndexKGru(self.currentPageIndexKGru() + 1);
        }
    };

    self.previousPageKGru = function () {
        if (self.currentPageIndexKGru() > 0) {
            self.currentPageIndexKGru(self.currentPageIndexKGru() - 1);
        }
    };

    self.firstPageKGru = function () {
        self.currentPageIndexKGru(0);
    };

    self.lastPageKGru = function () {
        countKGru = parseInt(self.filterKGruList().length / self.pageSizeKGru(), 10);
        if ((self.filterKGruList().length % self.pageSizeKGru()) == 0)
            self.currentPageIndexKGru(countKGru - 1);
        else
            self.currentPageIndexKGru(countKGru);
    };

    self.sortTableKGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.KGruList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshKGru').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست گروه کالا به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getKGruList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddKGru = function (item) {

        KGruCode = item.Code;
        find = false;
        list_KGruSelect.forEach(function (item, key) {
            if (item == KGruCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListKGru').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_KGruSelect[counterKGru] = item.Code;
            counterKGru = counterKGru + 1;
        }
    };


    self.AddAllKGru = function () {
        list_KGruSelect = new Array();
        list = self.KGruList();
        $("#TableBodyListKGru").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListKGru').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_KGruSelect[i] = list[i].Code;
            counterKGru = i + 1;
        }
    };


    self.DelAllKGru = function () {
        list_KGruSelect = new Array();
        counterKGru = 0;
        $("#TableBodyListKGru").empty();
    };


    $('#modal-KGru').on('hide.bs.modal', function () {
        if (counterKGru > 0)
            $('#nameKGru').val(counterKGru + ' مورد انتخاب شده ')
        else
            $('#nameKGru').val('همه موارد');
    });

    $('#modal-KGru').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageKala = ko.observable();
    self.pageSizeKala = ko.observable(10);
    self.currentPageIndexKala = ko.observable(0);

    self.filterKala0 = ko.observable("");
    self.filterKala1 = ko.observable("");
    self.filterKala2 = ko.observable("");
    self.filterKala3 = ko.observable("");

    self.iconTypeFanniNo = ko.observable("");

    self.filterKalaList = ko.computed(function () {

        self.currentPageIndexKala(0);
        var filter0 = self.filterKala0().toUpperCase();
        var filter1 = self.filterKala1();
        var filter2 = self.filterKala2();
        var filter3 = self.filterKala3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.KalaList();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.FanniNo == null ? '' : item.FanniNo.toString().search(filter2) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter3) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKala = ko.computed(function () {
        var pageSizeKala = parseInt(self.pageSizeKala(), 10),
            startIndex = pageSizeKala * self.currentPageIndexKala(),
            endIndex = startIndex + pageSizeKala;
        return self.filterKalaList().slice(startIndex, endIndex);
    });

    self.nextPageKala = function () {
        if (((self.currentPageIndexKala() + 1) * self.pageSizeKala()) < self.filterKalaList().length) {
            self.currentPageIndexKala(self.currentPageIndexKala() + 1);
        }
    };

    self.previousPageKala = function () {
        if (self.currentPageIndexKala() > 0) {
            self.currentPageIndexKala(self.currentPageIndexKala() - 1);
        }
    };

    self.firstPageKala = function () {
        self.currentPageIndexKala(0);
    };

    self.lastPageKala = function () {
        countKala = parseInt(self.filterKalaList().length / self.pageSizeKala(), 10);
        if ((self.filterKalaList().length % self.pageSizeKala()) == 0)
            self.currentPageIndexKala(countKala - 1);
        else
            self.currentPageIndexKala(countKala);
    };

    self.sortTableKala = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.KalaList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeFanniNo('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FanniNo') self.iconTypeFanniNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }


    $('#refreshkala').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست کالا ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getKalaList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddKala = function (item) {

        KalaCode = item.Code;
        find = false;
        list_KalaSelect.forEach(function (item, key) {
            if (item == KalaCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListKala').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: FanniNo">' + item.FanniNo + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_KalaSelect[counterKala] = item.Code;
            counterKala = counterKala + 1;
        }
    };


    self.AddAllKala = function () {
        list_KalaSelect = new Array();
        list = self.KalaList();
        $("#TableBodyListKala").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListKala').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: FanniNo">' + list[i].FanniNo + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_KalaSelect[i] = list[i].Code;
            counterKala = i + 1;
        }
    };


    self.DelAllKala = function () {
        list_KalaSelect = new Array();
        counterKala = 0;
        $("#TableBodyListKala").empty();
    };


    $('#modal-kala').on('hide.bs.modal', function () {
        if (counterKala > 0)
            $('#nameKala').val(counterKala + ' مورد انتخاب شده ')
        else
            $('#nameKala').val('همه موارد');
    });

    $('#modal-kala').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageCGru = ko.observable();
    self.pageSizeCGru = ko.observable(10);
    self.currentPageIndexCGru = ko.observable(0);

    self.filterCGru0 = ko.observable("");
    self.filterCGru1 = ko.observable("");
    self.filterCGru2 = ko.observable("");

    self.filterCGruList = ko.computed(function () {

        self.currentPageIndexCGru(0);
        var filter0 = self.filterCGru0().toUpperCase();
        var filter1 = self.filterCGru1();
        var filter2 = self.filterCGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.CGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.CGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCGru = ko.computed(function () {
        var pageSizeCGru = parseInt(self.pageSizeCGru(), 10),
            startIndex = pageSizeCGru * self.currentPageIndexCGru(),
            endIndex = startIndex + pageSizeCGru;
        return self.filterCGruList().slice(startIndex, endIndex);
    });

    self.nextPageCGru = function () {
        if (((self.currentPageIndexCGru() + 1) * self.pageSizeCGru()) < self.filterCGruList().length) {
            self.currentPageIndexCGru(self.currentPageIndexCGru() + 1);
        }
    };

    self.previousPageCGru = function () {
        if (self.currentPageIndexCGru() > 0) {
            self.currentPageIndexCGru(self.currentPageIndexCGru() - 1);
        }
    };

    self.firstPageCGru = function () {
        self.currentPageIndexCGru(0);
    };

    self.lastPageCGru = function () {
        countCGru = parseInt(self.filterCGruList().length / self.pageSizeCGru(), 10);
        if ((self.filterCGruList().length % self.pageSizeCGru()) == 0)
            self.currentPageIndexCGru(countCGru - 1);
        else
            self.currentPageIndexCGru(countCGru);
    };

    self.sortTableCGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.CGruList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshCGru').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست تحویل دهنده / گیرنده به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getCGruList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddCGru = function (item) {

        CGruCode = item.Code;
        find = false;
        list_CGruSelect.forEach(function (item, key) {
            if (item == CGruCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListCGru').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_CGruSelect[counterCGru] = item.Code;
            counterCGru = counterCGru + 1;
        }
    };


    self.AddAllCGru = function () {
        list_CGruSelect = new Array();
        list = self.CGruList();
        $("#TableBodyListCGru").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListCGru').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_CGruSelect[i] = list[i].Code;
            counterCGru = i + 1;
        }
    };


    self.DelAllCGru = function () {
        list_CGruSelect = new Array();
        counterCGru = 0;
        $("#TableBodyListCGru").empty();
    };


    $('#modal-CGru').on('hide.bs.modal', function () {
        if (counterCGru > 0)
            $('#nameCGru').val(counterCGru + ' مورد انتخاب شده ')
        else
            $('#nameCGru').val('همه موارد');
    });

    $('#modal-CGru').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });










    self.currentPageCust = ko.observable();
    self.pageSizeCust = ko.observable(10);
    self.currentPageIndexCust = ko.observable(0);

    self.filterCust0 = ko.observable("");
    self.filterCust1 = ko.observable("");
    self.filterCust2 = ko.observable("");

    self.filterCustList = ko.computed(function () {

        self.currentPageIndexCust(0);
        var filter0 = self.filterCust0().toUpperCase();
        var filter1 = self.filterCust1();
        var filter2 = self.filterCust2();

        if (!filter0 && !filter1 && !filter2) {
            return self.CustList();
        } else {
            tempData = ko.utils.arrayFilter(self.CustList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCust = ko.computed(function () {
        var pageSizeCust = parseInt(self.pageSizeCust(), 10),
            startIndex = pageSizeCust * self.currentPageIndexCust(),
            endIndex = startIndex + pageSizeCust;
        return self.filterCustList().slice(startIndex, endIndex);
    });

    self.nextPageCust = function () {
        if (((self.currentPageIndexCust() + 1) * self.pageSizeCust()) < self.filterCustList().length) {
            self.currentPageIndexCust(self.currentPageIndexCust() + 1);
        }
    };

    self.previousPageCust = function () {
        if (self.currentPageIndexCust() > 0) {
            self.currentPageIndexCust(self.currentPageIndexCust() - 1);
        }
    };

    self.firstPageCust = function () {
        self.currentPageIndexCust(0);
    };

    self.lastPageCust = function () {
        countCust = parseInt(self.filterCustList().length / self.pageSizeCust(), 10);
        if ((self.filterCustList().length % self.pageSizeCust()) == 0)
            self.currentPageIndexCust(countCust - 1);
        else
            self.currentPageIndexCust(countCust);
    };

    self.sortTableCust = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.CustList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshCust').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست تحویل دهنده / گیرنده به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getCustList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddCust = function (item) {

        CustCode = item.Code;
        find = false;
        list_CustSelect.forEach(function (item, key) {
            if (item == CustCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListCust').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_CustSelect[counterCust] = item.Code;
            counterCust = counterCust + 1;
        }
    };


    self.AddAllCust = function () {
        list_CustSelect = new Array();
        list = self.CustList();
        $("#TableBodyListCust").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListCust').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_CustSelect[i] = list[i].Code;
            counterCust = i + 1;
        }
    };


    self.DelAllCust = function () {
        list_CustSelect = new Array();
        counterCust = 0;
        $("#TableBodyListCust").empty();
    };


    $('#modal-Cust').on('hide.bs.modal', function () {
        if (counterCust > 0)
            $('#nameCust').val(counterCust + ' مورد انتخاب شده ')
        else
            $('#nameCust').val('همه موارد');
    });

    $('#modal-Cust').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageOpr = ko.observable();
    self.pageSizeOpr = ko.observable(10);
    self.currentPageIndexOpr = ko.observable(0);

    self.filterOpr0 = ko.observable("");
    self.filterOpr1 = ko.observable("");
    self.filterOpr2 = ko.observable("");

    self.filterOprList = ko.computed(function () {

        self.currentPageIndexOpr(0);
        var filter0 = self.filterOpr0().toUpperCase();
        var filter1 = self.filterOpr1();
        var filter2 = self.filterOpr2();

        if (!filter0 && !filter1 && !filter2) {
            return self.OprList();
        } else {
            tempData = ko.utils.arrayFilter(self.OprList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageOpr = ko.computed(function () {
        var pageSizeOpr = parseInt(self.pageSizeOpr(), 10),
            startIndex = pageSizeOpr * self.currentPageIndexOpr(),
            endIndex = startIndex + pageSizeOpr;
        return self.filterOprList().slice(startIndex, endIndex);
    });

    self.nextPageOpr = function () {
        if (((self.currentPageIndexOpr() + 1) * self.pageSizeOpr()) < self.filterOprList().length) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() + 1);
        }
    };

    self.previousPageOpr = function () {
        if (self.currentPageIndexOpr() > 0) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() - 1);
        }
    };

    self.firstPageOpr = function () {
        self.currentPageIndexOpr(0);
    };

    self.lastPageOpr = function () {
        countOpr = parseInt(self.filterOprList().length / self.pageSizeOpr(), 10);
        if ((self.filterOprList().length % self.pageSizeOpr()) == 0)
            self.currentPageIndexOpr(countOpr - 1);
        else
            self.currentPageIndexOpr(countOpr);
    };

    self.sortTableOpr = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.OprList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshOpr').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست پروژه به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getOprList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddOpr = function (item) {

        OprCode = item.Code;
        find = false;
        list_OprSelect.forEach(function (item, key) {
            if (item == OprCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListOpr').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_OprSelect[counterOpr] = item.Code;
            counterOpr = counterOpr + 1;
        }
    };


    self.AddAllOpr = function () {
        list_OprSelect = new Array();
        list = self.OprList();
        $("#TableBodyListOpr").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListOpr').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_OprSelect[i] = list[i].Code;
            counterOpr = i + 1;
        }
    };


    self.DelAllOpr = function () {
        list_OprSelect = new Array();
        counterOpr = 0;
        $("#TableBodyListOpr").empty();
    };


    $('#modal-Opr').on('hide.bs.modal', function () {
        if (counterOpr > 0)
            $('#nameOpr').val(counterOpr + ' مورد انتخاب شده ')
        else
            $('#nameOpr').val('همه موارد');
    });

    $('#modal-Opr').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });



    self.currentPageMkz = ko.observable();
    self.pageSizeMkz = ko.observable(10);
    self.currentPageIndexMkz = ko.observable(0);

    self.filterMkz0 = ko.observable("");
    self.filterMkz1 = ko.observable("");
    self.filterMkz2 = ko.observable("");

    self.filterMkzList = ko.computed(function () {

        self.currentPageIndexMkz(0);
        var filter0 = self.filterMkz0().toUpperCase();
        var filter1 = self.filterMkz1();
        var filter2 = self.filterMkz2();

        if (!filter0 && !filter1 && !filter2) {
            return self.MkzList();
        } else {
            tempData = ko.utils.arrayFilter(self.MkzList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageMkz = ko.computed(function () {
        var pageSizeMkz = parseInt(self.pageSizeMkz(), 10),
            startIndex = pageSizeMkz * self.currentPageIndexMkz(),
            endIndex = startIndex + pageSizeMkz;
        return self.filterMkzList().slice(startIndex, endIndex);
    });

    self.nextPageMkz = function () {
        if (((self.currentPageIndexMkz() + 1) * self.pageSizeMkz()) < self.filterMkzList().length) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() + 1);
        }
    };

    self.previousPageMkz = function () {
        if (self.currentPageIndexMkz() > 0) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() - 1);
        }
    };

    self.firstPageMkz = function () {
        self.currentPageIndexMkz(0);
    };

    self.lastPageMkz = function () {
        countMkz = parseInt(self.filterMkzList().length / self.pageSizeMkz(), 10);
        if ((self.filterMkzList().length % self.pageSizeMkz()) == 0)
            self.currentPageIndexMkz(countMkz - 1);
        else
            self.currentPageIndexMkz(countMkz);
    };

    self.sortTableMkz = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.MkzList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshMkz').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست مرکز هزینه به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getMkzList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالا ها به روز رسانی شد' });
            }
        })
    })


    self.AddMkz = function (item) {

        MkzCode = item.Code;
        find = false;
        list_MkzSelect.forEach(function (item, key) {
            if (item == MkzCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListMkz').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_MkzSelect[counterMkz] = item.Code;
            counterMkz = counterMkz + 1;
        }
    };


    self.AddAllMkz = function () {
        list_MkzSelect = new Array();
        list = self.MkzList();
        $("#TableBodyListMkz").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListMkz').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_MkzSelect[i] = list[i].Code;
            counterMkz = i + 1;
        }
    };


    self.DelAllMkz = function () {
        list_MkzSelect = new Array();
        counterMkz = 0;
        $("#TableBodyListMkz").empty();
    };


    $('#modal-Mkz').on('hide.bs.modal', function () {
        if (counterMkz > 0)
            $('#nameMkz').val(counterMkz + ' مورد انتخاب شده ')
        else
            $('#nameMkz').val('همه موارد');
    });

    $('#modal-Mkz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    $('.fix').attr('class', 'form-line date focused fix');


    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableTrzFKala_S">' +
            CreateTableTh('KalaCode', data) +
            CreateTableTh('KalaName', data) +
            CreateTableTh('KalaF01', data) +
            CreateTableTh('KalaF02', data) +
            CreateTableTh('KalaF03', data) +
            CreateTableTh('KalaF04', data) +
            CreateTableTh('KalaF05', data) +
            CreateTableTh('KalaF06', data) +
            CreateTableTh('KalaF07', data) +
            CreateTableTh('KalaF08', data) +
            CreateTableTh('KalaF09', data) +
            CreateTableTh('KalaF10', data) +
            CreateTableTh('KalaF11', data) +
            CreateTableTh('KalaF12', data) +
            CreateTableTh('KalaF13', data) +
            CreateTableTh('KalaF14', data) +
            CreateTableTh('KalaF15', data) +
            CreateTableTh('KalaF16', data) +
            CreateTableTh('KalaF17', data) +
            CreateTableTh('KalaF18', data) +
            CreateTableTh('KalaF19', data) +
            CreateTableTh('KalaF20', data) +
            CreateTableTh('KalaUnitName1', data) +
            CreateTableTh('Amount1', data) +
            CreateTableTh('UnitPrice1', data) +
            CreateTableTh('KalaUnitName2', data) +
            CreateTableTh('Amount2', data) +
            CreateTableTh('UnitPrice2', data) +
            CreateTableTh('KalaUnitName3', data) +
            CreateTableTh('Amount3', data) +
            CreateTableTh('UnitPrice3', data) +
            CreateTableTh('TotalPrice', data) +
            CreateTableTh('Discount', data) +
            CreateTableTh('AddMinPrice1', data) +
            CreateTableTh('AddMinPrice2', data) +
            CreateTableTh('AddMinPrice3', data) +
            CreateTableTh('AddMinPrice4', data) +
            CreateTableTh('AddMinPrice5', data) +
            CreateTableTh('AddMinPrice6', data) +
            CreateTableTh('AddMinPrice7', data) +
            CreateTableTh('AddMinPrice8', data) +
            CreateTableTh('AddMinPrice9', data) +
            CreateTableTh('AddMinPrice10', data) +
            CreateTableTh('OnlyDiscountPrice', data) +
            CreateTableTh('FinalPrice', data) +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageTrzFKala_S" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
            CreateTableTd('KalaCode', 0, 0, data) +
            CreateTableTd('KalaName', 0, 0, data) +
            CreateTableTd('KalaF01', 0, 0, data) +
            CreateTableTd('KalaF02', 0, 0, data) +
            CreateTableTd('KalaF03', 0, 0, data) +
            CreateTableTd('KalaF04', 0, 0, data) +
            CreateTableTd('KalaF05', 0, 0, data) +
            CreateTableTd('KalaF06', 0, 0, data) +
            CreateTableTd('KalaF07', 0, 0, data) +
            CreateTableTd('KalaF08', 0, 0, data) +
            CreateTableTd('KalaF09', 0, 0, data) +
            CreateTableTd('KalaF10', 0, 0, data) +
            CreateTableTd('KalaF11', 0, 0, data) +
            CreateTableTd('KalaF12', 0, 0, data) +
            CreateTableTd('KalaF13', 0, 0, data) +
            CreateTableTd('KalaF14', 0, 0, data) +
            CreateTableTd('KalaF15', 0, 0, data) +
            CreateTableTd('KalaF16', 0, 0, data) +
            CreateTableTd('KalaF17', 0, 0, data) +
            CreateTableTd('KalaF18', 0, 0, data) +
            CreateTableTd('KalaF19', 0, 0, data) +
            CreateTableTd('KalaF20', 0, 0, data) +
            CreateTableTd('KalaUnitName1', 0, 0, data) +
            CreateTableTd('Amount1', 'DeghatM1', 1, data) +
            CreateTableTd('UnitPrice1', 'DeghatR1', 2, data) +
            CreateTableTd('KalaUnitName2', 0, 0, data) +
            CreateTableTd('Amount2', 'DeghatM2', 1, data) +
            CreateTableTd('UnitPrice2', 'DeghatR2', 2, data) +
            CreateTableTd('KalaUnitName3', 0, 0, data) +
            CreateTableTd('Amount3', 'DeghatM3', 1, data) +
            CreateTableTd('UnitPrice3', 'DeghatR3', 2, data) +
            CreateTableTd('TotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('Discount', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice1', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice2', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice3', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice4', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice5', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice6', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice7', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice8', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice9', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice10', sessionStorage.Deghat, 2, data) +
            CreateTableTd('OnlyDiscountPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('FinalPrice', sessionStorage.Deghat, 2, data) +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            CreateTableTdSum('KalaCode', 0, data) +
            CreateTableTdSum('KalaName', 1, data) +
            CreateTableTdSum('KalaF01', 1, data) +
            CreateTableTdSum('KalaF02', 1, data) +
            CreateTableTdSum('KalaF03', 1, data) +
            CreateTableTdSum('KalaF04', 1, data) +
            CreateTableTdSum('KalaF05', 1, data) +
            CreateTableTdSum('KalaF06', 1, data) +
            CreateTableTdSum('KalaF07', 1, data) +
            CreateTableTdSum('KalaF08', 1, data) +
            CreateTableTdSum('KalaF09', 1, data) +
            CreateTableTdSum('KalaF10', 1, data) +
            CreateTableTdSum('KalaF11', 1, data) +
            CreateTableTdSum('KalaF12', 1, data) +
            CreateTableTdSum('KalaF13', 1, data) +
            CreateTableTdSum('KalaF14', 1, data) +
            CreateTableTdSum('KalaF15', 1, data) +
            CreateTableTdSum('KalaF16', 1, data) +
            CreateTableTdSum('KalaF17', 1, data) +
            CreateTableTdSum('KalaF18', 1, data) +
            CreateTableTdSum('KalaF19', 1, data) +
            CreateTableTdSum('KalaF20', 1, data) +
            CreateTableTdSum('KalaUnitName1', 1, data) +
            CreateTableTdSum('Amount1', 2, data) +
            CreateTableTdSum('UnitPrice1', 2, data) +
            CreateTableTdSum('KalaUnitName2', 1, data) +
            CreateTableTdSum('Amount2', 2, data) +
            CreateTableTdSum('UnitPrice2', 2, data) +
            CreateTableTdSum('KalaUnitName3', 1, data) +
            CreateTableTdSum('Amount3', 2, data) +
            CreateTableTdSum('UnitPrice3', 2, data) +
            CreateTableTdSum('TotalPrice', 2, data) +
            CreateTableTdSum('Discount', 2, data) +
            CreateTableTdSum('AddMinPrice1', 2, data) +
            CreateTableTdSum('AddMinPrice2', 2, data) +
            CreateTableTdSum('AddMinPrice3', 2, data) +
            CreateTableTdSum('AddMinPrice4', 2, data) +
            CreateTableTdSum('AddMinPrice5', 2, data) +
            CreateTableTdSum('AddMinPrice6', 2, data) +
            CreateTableTdSum('AddMinPrice7', 2, data) +
            CreateTableTdSum('AddMinPrice8', 2, data) +
            CreateTableTdSum('AddMinPrice9', 2, data) +
            CreateTableTdSum('AddMinPrice10', 2, data) +
            CreateTableTdSum('OnlyDiscountPrice', 2, data) +
            CreateTableTdSum('FinalPrice', 2, data) +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('KalaCode', data) +
            CreateTableTdSearch('KalaName', data) +
            CreateTableTdSearch('KalaF01', data) +
            CreateTableTdSearch('KalaF02', data) +
            CreateTableTdSearch('KalaF03', data) +
            CreateTableTdSearch('KalaF04', data) +
            CreateTableTdSearch('KalaF05', data) +
            CreateTableTdSearch('KalaF06', data) +
            CreateTableTdSearch('KalaF07', data) +
            CreateTableTdSearch('KalaF08', data) +
            CreateTableTdSearch('KalaF09', data) +
            CreateTableTdSearch('KalaF10', data) +
            CreateTableTdSearch('KalaF11', data) +
            CreateTableTdSearch('KalaF12', data) +
            CreateTableTdSearch('KalaF13', data) +
            CreateTableTdSearch('KalaF14', data) +
            CreateTableTdSearch('KalaF15', data) +
            CreateTableTdSearch('KalaF16', data) +
            CreateTableTdSearch('KalaF17', data) +
            CreateTableTdSearch('KalaF18', data) +
            CreateTableTdSearch('KalaF19', data) +
            CreateTableTdSearch('KalaF20', data) +
            CreateTableTdSearch('KalaUnitName1', data) +
            CreateTableTdSearch('Amount1', data) +
            CreateTableTdSearch('UnitPrice1', data) +
            CreateTableTdSearch('KalaUnitName2', data) +
            CreateTableTdSearch('Amount2', data) +
            CreateTableTdSearch('UnitPrice2', data) +
            CreateTableTdSearch('KalaUnitName3', data) +
            CreateTableTdSearch('Amount3', data) +
            CreateTableTdSearch('UnitPrice3', data) +
            CreateTableTdSearch('TotalPrice', data) +
            CreateTableTdSearch('Discount', data) +
            CreateTableTdSearch('AddMinPrice1', data) +
            CreateTableTdSearch('AddMinPrice2', data) +
            CreateTableTdSearch('AddMinPrice3', data) +
            CreateTableTdSearch('AddMinPrice4', data) +
            CreateTableTdSearch('AddMinPrice5', data) +
            CreateTableTdSearch('AddMinPrice6', data) +
            CreateTableTdSearch('AddMinPrice7', data) +
            CreateTableTdSearch('AddMinPrice8', data) +
            CreateTableTdSearch('AddMinPrice9', data) +
            CreateTableTdSearch('AddMinPrice10', data) +
            CreateTableTdSearch('OnlyDiscountPrice', data) +
            CreateTableTdSearch('FinalPrice', data) +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }

    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'data-column="' + field + '">' +
            '<span>' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + field + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }" ></i> </span> ' +
            '</th>';
        return text;
    }


    function CreateTableTd(field, Deghat, no, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + '"></td>';
                break;
            case 1:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ')) , style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\'" style="text-align: right;"></td>'
                break;
        }
        return text;
    }

    function CreateTableTdSum(field, no, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'id="textTotal"></td>';
                break;
            case 1:
                text += '></td>'
                break;
            case 2:
                text += 'id="total' + field + '" style="direction: ltr;"></td>'
                break;
        }
        return text;
    }

    function CreateTableTdSearch(field, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\'" type="text" class="form-control" style="height: 2.4rem;" /> </td>';
        return text;
    }

};

ko.applyBindings(new ViewModel());
