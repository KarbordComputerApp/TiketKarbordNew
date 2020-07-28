﻿var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader;
    var server = localStorage.getItem("ApiAddress");

    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;
    sessionStorage.searchADocH = "";
    self.bundNumberImport = 0;

    var AccCode = "";
    var ZAccCode = "";
    var bandnumber = 0;
    var bandnumberedit = 0;
    var flagFinalSave = false;
    var flagEditBand = false;
    var flag = -1;
    var flagInsertADocH;
    var zGruAcc = "";
    self.flagupdateband = false;
    self.AModeCode = ko.observable();
    self.CheckStatusCode = ko.observable();

    var allSearchAcc = true;
    var allSearchAcc = true;

    self.SerialNumber = ko.observable();
    var Serial = '';
    self.DocNoOut = ko.observable();
    self.MkzCode = ko.observable();
    self.OprCode = ko.observable();
    self.ArzCode = ko.observable();
    self.ArzRate = ko.observable();
    self.CheckVosoolDate = ko.observable();


    self.DocDate = ko.observable();
    self.CheckDate = ko.observable();
    self.Spec = ko.observable();

    self.BandNo = ko.observable();
    self.AccCode = ko.observable();
    self.ZAccCode = ko.observable();

    self.TrafCode = ko.observable();
    self.TrafZCode = ko.observable();


    self.Bede = ko.observable();
    self.Best = ko.observable();

    self.AccList = ko.observableArray([]); // ليست حساب ها
    self.ZAccList = ko.observableArray([]); // ليست زیر حساب ها
    self.ADocBList = ko.observableArray([]); // ليست بند های سند
    self.ADocHList = ko.observableArray([]); // اطلاعات  سند  
    self.AModeList = ko.observableArray([]); // نوع سند  
    self.CheckStatusList = ko.observableArray([]); // ليست نوع چک ها
    self.MkzList = ko.observableArray([]); // ليست مرکز هزینه
    self.OprList = ko.observableArray([]); // ليست پروژه ها
    self.ArzList = ko.observableArray([]); // ليست ارز ها
    self.CheckList = ko.observableArray([]); // ليست چک ها
    self.BankList = ko.observableArray([]); // ليست چک ها
    self.ShobeList = ko.observableArray([]); // ليست چک ها
    self.JariList = ko.observableArray([]); // ليست چک ها


    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var ZAccUri = server + '/api/Web_Data/ZAcc/'; // آدرس حساب ها

    var ADocHUri = server + '/api/ADocData/ADocH/'; // آدرس هدر سند 
    var ADocHiUri = server + '/api/AFI_ADocHi/'; // آدرس ذخیره هدر سند 

    var ADocBUri = server + '/api/ADocData/ADocB/'; // آدرس بند سند 
    var ADocBiUri = server + '/api/AFI_ADocBi/'; // آدرس ذخیره یند سند 

    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند
    var ColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز 
    var CheckUri = server + '/api/ADocData/CheckList/'; // آدرس لیست چک  
    var BankUri = server + '/api/ADocData/Bank/'; // آدرس لیست بانک  
    var ShobeUri = server + '/api/ADocData/Shobe/'; // آدرس لیست شعبه  
    var JariUri = server + '/api/ADocData/Jari/'; // آدرس لیست جاری 
    var ADocHLastDateUri = server + '/api/ADocData/ADocH/LastDate/'; // آدرس آخرین تاریخ سند
    var CheckStatusUri = server + '/api/ADocData/CheckStatus/'; // آدرس وضعیت  




    //Get Acc List
    function getAccList() {
        ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AccList(data);
        });
    }



    //Get ZAcc List
    function getZAccList(filter) {
        ajaxFunction(ZAccUri + ace + '/' + sal + '/' + group + '/' + filter, 'GET').done(function (data) {
            self.ZAccList(data);
        });
    }


    //Get AMode List
    function getAModeList() {
        ajaxFunction(AModeUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AModeList(data);
            if (flagupdateHeader == 1)
                $("#modeCode").val(sessionStorage.ModeCodeValue);
        });
    }

    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.OprList(data);
        });
    }

    //Get Arz List
    function getArzList() {
        ajaxFunction(ArzUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.ArzList(data);
        });
    }

    //Get CheckList List
    function getCheckList() {
        ajaxFunction(CheckUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.CheckList(data);
        });
    }

    //Get BankList List
    function getBankList() {
        ajaxFunction(BankUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.BankList(data);
        });
    }

    //Get ShobeList List
    function getShobeList() {
        ajaxFunction(ShobeUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.ShobeList(data);
        });
    }

    //Get JariList List
    function getJariList() {
        ajaxFunction(JariUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.JariList(data);
        });
    }

    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.MkzList(data);
        });
    }

    //Get SanadCols List
    function getColsSanadList() {
        ajaxFunction(ColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/ADocB/' + sessionStorage.userName, 'GET').done(function (data) {
            CreateTableSanad(data);
        });
    }

    //Get CheckCols List
    function getColsCheckList() {
        ajaxFunction(ColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/CheckList/' + sessionStorage.userName, 'GET').done(function (data) {
            CreateTableCheck(data);
        });
    }

    function getADocHLastDate() {
        ajaxFunction(ADocHLastDateUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.InOut, 'GET').done(function (data) {
            self.DocDate(data);
        });
    }

    //Get CheckStatus List
    function getCheckStatusList(PDMode) {
        ajaxFunction(CheckStatusUri + ace + '/' + sal + '/' + group + '/' + PDMode + '/0', 'GET').done(function (data) {
            self.CheckStatusList(data);
        });
    }

    //Get ADocH 
    function getADocH(serialNumber) {

    }

    //Get ADocB 
    function getADocB(serialNumber) {
        ajaxFunction(ADocBUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.ADocBList(data);
            calcsum(data);
        });
    }

    getColsSanadList();
    getColsCheckList();
    getAccList();
    getAModeList();
    getOprList();
    getArzList();
    getMkzList();
    getCheckList();
    getBankList();
    getShobeList();
    getJariList();
    getCheckStatusList(1);

    self.ClearADocH = function ClearADocH() {
        Serial = '';
        sessionStorage.flagupdateHeader = '0';
        flagupdateHeader = 0;
        self.DocNoOut('');
        self.DocDate($('#tarikh').val().toEnglishDigit());
        self.Spec('');
        self.Spec('');
    };

    if (flagupdateHeader == 1) {
        flagInsertADocH = 1;
        Serial = sessionStorage.SerialNumber;
        self.SerialNumber(Serial);
        self.DocNoOut(sessionStorage.DocNo);
        self.DocDate(sessionStorage.DocDate);
        self.Spec(sessionStorage.Spec);
        $("#docnoout").text(sessionStorage.DocNo);
        getADocB(Serial);
        getADocH(Serial);
    }
    else {
        flagInsertADocH = 0;
        getADocHLastDate();
    }


    function calcsum(list) {
        totalBede = 0;
        totalBest = 0;
        for (var i = 0; i < list.length; ++i) {
            ADocBData = list[i];
            totalBede += ADocBData.Bede;
            totalBest += ADocBData.Best;
        }

        $("#textTotal").text('جمع');
        $("#textMon").text('تفاوت');
        $("#totalBede").text(NumberToNumberString(totalBede.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalBest").text(NumberToNumberString(totalBest.toFixed(parseInt(sessionStorage.Deghat))));

    }




    self.currentColumn = ko.observable("");
    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeRate = ko.observable("");


    self.currentPageAcc = ko.observable();
    self.pageSizeAcc = ko.observable(10);
    self.currentPageIndexAcc = ko.observable(0);

    self.filterAcc0 = ko.observable("");
    self.filterAcc1 = ko.observable("");
    self.filterAcc2 = ko.observable("");

    self.filterAccList = ko.computed(function () {

        self.currentPageIndexAcc(0);
        var filter0 = self.filterAcc0().toUpperCase();
        var filter1 = self.filterAcc1();
        var filter2 = self.filterAcc2();

        if (!filter0 && !filter1 && !filter2) {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    item.AutoCreate == 0
                return result;
            })
            return tempData;
        } else {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                    item.AutoCreate == 0
                return result;
            })
            return tempData;
        }
    });


    self.currentPageAcc = ko.computed(function () {
        var pageSizeAcc = parseInt(self.pageSizeAcc(), 10),
            startIndex = pageSizeAcc * self.currentPageIndexAcc(),
            endIndex = startIndex + pageSizeAcc;
        return self.filterAccList().slice(startIndex, endIndex);
    });

    self.nextPageAcc = function () {
        if (((self.currentPageIndexAcc() + 1) * self.pageSizeAcc()) < self.filterAccList().length) {
            self.currentPageIndexAcc(self.currentPageIndexAcc() + 1);
        }
    };

    self.previousPageAcc = function () {
        if (self.currentPageIndexAcc() > 0) {
            self.currentPageIndexAcc(self.currentPageIndexAcc() - 1);
        }
    };

    self.firstPageAcc = function () {
        self.currentPageIndexAcc(0);
    };

    self.lastPageAcc = function () {
        countAcc = parseInt(self.filterAccList().length / self.pageSizeAcc(), 10);
        if ((self.filterAccList().length % self.pageSizeAcc()) == 0)
            self.currentPageIndexAcc(countAcc - 1);
        else
            self.currentPageIndexAcc(countAcc);
    };

    self.sortTableAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.AccList.sort(function (left, right) {
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


    $('#refreshAcc').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست حساب ها به روز رسانی شود ؟",
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
                getAccList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectAcc = function (item) {
        zGruAcc = "";
        if (item.HasChild == 0 || item.NextLevelFromZAcc == 1) {
            if (item.NextLevelFromZAcc == 1) {
                $('#btnZAcc').removeAttr('hidden', '');
                if (item.ZGru != "") {
                    getZAccList(item.ZGru);
                    $('#modal-ZAcc').modal('show');
                }
            }
            else {
                $('#btnZAcc').attr('hidden', '');
                $('#nameZAcc').val('');
                self.ZAccCode(0);
            }


            if (item.PDMode > 0) {
                ShowCheck();
            }
            else {
                HiddenCheck();
            }

            
            if (item.Mkz > 0) {
                $('#btnMkz').removeAttr('hidden', '');
            }
            else {
                $('#btnMkz').attr('hidden', '');
                $('#nameMkz').val('');
            }

            $('#nameAcc').val('(' + item.Code + ') ' + item.Name);
            self.AccCode(item.Code);
            $('#modal-Acc').modal('toggle');
        }
        else
            return showNotification('این حساب قابل انتخاب نیست', 0);
    }


    $('#modal-Acc').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });






    self.currentPageZAcc = ko.observable();
    self.pageSizeZAcc = ko.observable(10);
    self.currentPageIndexZAcc = ko.observable(0);

    self.filterZAcc0 = ko.observable("");
    self.filterZAcc1 = ko.observable("");
    self.filterZAcc2 = ko.observable("");

    self.filterZAccList = ko.computed(function () {
        self.currentPageIndexZAcc(0);
        var filter0 = self.filterZAcc0().toUpperCase();
        var filter1 = self.filterZAcc1();
        var filter2 = self.filterZAcc2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ZAccList();
        } else {
            tempData = ko.utils.arrayFilter(self.ZAccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageZAcc = ko.computed(function () {
        var pageSizeZAcc = parseInt(self.pageSizeZAcc(), 10),
            startIndex = pageSizeZAcc * self.currentPageIndexZAcc(),
            endIndex = startIndex + pageSizeZAcc;
        return self.filterZAccList().slice(startIndex, endIndex);
    });

    self.nextPageZAcc = function () {
        if (((self.currentPageIndexZAcc() + 1) * self.pageSizeZAcc()) < self.filterZAccList().length) {
            self.currentPageIndexZAcc(self.currentPageIndexZAcc() + 1);
        }
    };

    self.previousPageZAcc = function () {
        if (self.currentPageIndexZAcc() > 0) {
            self.currentPageIndexZAcc(self.currentPageIndexZAcc() - 1);
        }
    };

    self.firstPageZAcc = function () {
        self.currentPageIndexZAcc(0);
    };

    self.lastPageZAcc = function () {
        countZAcc = parseInt(self.filterZAccList().length / self.pageSizeZAcc(), 10);
        if ((self.filterZAccList().length % self.pageSizeZAcc()) == 0)
            self.currentPageIndexZAcc(countZAcc - 1);
        else
            self.currentPageIndexZAcc(countZAcc);
    };

    self.sortTableZAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ZAccList.sort(function (left, right) {
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


    $('#refreshZAcc').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست زیر حساب ها به روز رسانی شود ؟",
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
                getZAccList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectZAcc = function (item) {
        $('#nameZAcc').val('(' + item.Code + ') ' + item.Name);
        self.ZAccCode(item.Code);
        $('#modal-ZAcc').modal('toggle');
    }


    $('#modal-ZAcc').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });
























    self.currentPageTraf = ko.observable();
    self.pageSizeTraf = ko.observable(10);
    self.currentPageIndexTraf = ko.observable(0);

    self.filterTraf0 = ko.observable("");
    self.filterTraf1 = ko.observable("");
    self.filterTraf2 = ko.observable("");

    self.filterTrafList = ko.computed(function () {

        self.currentPageIndexTraf(0);
        var filter0 = self.filterTraf0().toUpperCase();
        var filter1 = self.filterTraf1();
        var filter2 = self.filterTraf2();

        if (!filter0 && !filter1 && !filter2) {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    item.AutoCreate == 0
                return result;
            })
            return tempData;
        } else {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                    item.AutoCreate == 0
                return result;
            })
            return tempData;
        }
    });


    self.currentPageTraf = ko.computed(function () {
        var pageSizeTraf = parseInt(self.pageSizeTraf(), 10),
            startIndex = pageSizeTraf * self.currentPageIndexTraf(),
            endIndex = startIndex + pageSizeTraf;
        return self.filterTrafList().slice(startIndex, endIndex);
    });

    self.nextPageTraf = function () {
        if (((self.currentPageIndexTraf() + 1) * self.pageSizeTraf()) < self.filterTrafList().length) {
            self.currentPageIndexTraf(self.currentPageIndexTraf() + 1);
        }
    };

    self.previousPageTraf = function () {
        if (self.currentPageIndexTraf() > 0) {
            self.currentPageIndexTraf(self.currentPageIndexTraf() - 1);
        }
    };

    self.firstPageTraf = function () {
        self.currentPageIndexTraf(0);
    };

    self.lastPageTraf = function () {
        countTraf = parseInt(self.filterTrafList().length / self.pageSizeTraf(), 10);
        if ((self.filterTrafList().length % self.pageSizeTraf()) == 0)
            self.currentPageIndexTraf(countTraf - 1);
        else
            self.currentPageIndexTraf(countTraf);
    };

    self.sortTableTraf = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.AccList.sort(function (left, right) {
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


    $('#refreshTraf').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست طرف حساب ها به روز رسانی شود ؟",
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
                getAccList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectTraf = function (item) {
        zGruTraf = "";
        if (item.HasChild == 0 || item.NextLevelFromZAcc == 1) {

            if (item.NextLevelFromZAcc == 1) {
                $('#btnTrafZ').removeAttr('hidden', '');
                if (item.ZGru != "") {
                    getZAccList(item.ZGru);
                    $('#modal-TrafZ').modal('show');
                }
            }
            else {
                $('#btnTrafZ').attr('hidden', '');
                $('#nameZAcc').val('');
                self.ZAccCode(0);
            }


            $('#nameTraf').val('(' + item.Code + ') ' + item.Name);
            self.TrafCode(item.Code);
            $('#modal-Traf').modal('toggle');
        }
        else
            return showNotification('این طرف حساب قابل انتخاب نیست', 0);
    }


    $('#modal-Traf').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });






    self.currentPageTrafZ = ko.observable();
    self.pageSizeTrafZ = ko.observable(10);
    self.currentPageIndexTrafZ = ko.observable(0);

    self.filterTrafZ0 = ko.observable("");
    self.filterTrafZ1 = ko.observable("");
    self.filterTrafZ2 = ko.observable("");

    self.filterTrafZList = ko.computed(function () {

        self.currentPageIndexTrafZ(0);
        var filter0 = self.filterTrafZ0().toUpperCase();
        var filter1 = self.filterTrafZ1();
        var filter2 = self.filterTrafZ2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ZAccList();
        } else {
            tempData = ko.utils.arrayFilter(self.ZAccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageTrafZ = ko.computed(function () {
        var pageSizeTrafZ = parseInt(self.pageSizeTrafZ(), 10),
            startIndex = pageSizeTrafZ * self.currentPageIndexTrafZ(),
            endIndex = startIndex + pageSizeTrafZ;
        return self.filterTrafZList().slice(startIndex, endIndex);
    });

    self.nextPageTrafZ = function () {
        if (((self.currentPageIndexTrafZ() + 1) * self.pageSizeTrafZ()) < self.filterTrafZList().length) {
            self.currentPageIndexTrafZ(self.currentPageIndexTrafZ() + 1);
        }
    };

    self.previousPageTrafZ = function () {
        if (self.currentPageIndexTrafZ() > 0) {
            self.currentPageIndexTrafZ(self.currentPageIndexTrafZ() - 1);
        }
    };

    self.firstPageTrafZ = function () {
        self.currentPageIndexTrafZ(0);
    };

    self.lastPageTrafZ = function () {
        countTrafZ = parseInt(self.filterTrafZList().length / self.pageSizeTrafZ(), 10);
        if ((self.filterTrafZList().length % self.pageSizeTrafZ()) == 0)
            self.currentPageIndexTrafZ(countTrafZ - 1);
        else
            self.currentPageIndexTrafZ(countTrafZ);
    };

    self.sortTableTrafZ = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ZAccList.sort(function (left, right) {
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


    $('#refreshTrafZ').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست زیر حساب ها به روز رسانی شود ؟",
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
                getZAccList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectTrafZ = function (item) {
        $('#nameTrafZ').val('(' + item.Code + ') ' + item.Name);
        self.TrafZCode(item.Code);
        $('#modal-TrafZ').modal('toggle');
    }


    $('#modal-TrafZ').on('shown.bs.modal', function () {
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
        if (orderProp == null) {
            return null
        }
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


    self.selectOpr = function (item) {
        $('#nameOpr').val('(' + item.Code + ') ' + item.Name);
        self.OprCode(item.Code);
    }


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
        if (orderProp == null) {
            return null
        }
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
            }
        })
    })


    self.selectMkz = function (item) {
        $('#nameMkz').val('(' + item.Code + ') ' + item.Name);
        self.MkzCode(item.Code);
    }


    $('#modal-Mkz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });













    self.currentPageArz = ko.observable();
    self.pageSizeArz = ko.observable(10);
    self.currentPageIndexArz = ko.observable(0);

    self.filterArz0 = ko.observable("");
    self.filterArz1 = ko.observable("");
    self.filterArz2 = ko.observable("");
    self.filterArz3 = ko.observable("");

    self.filterArzList = ko.computed(function () {

        self.currentPageIndexArz(0);
        var filter0 = self.filterArz0().toUpperCase();
        var filter1 = self.filterArz1();
        var filter2 = self.filterArz2();
        var filter3 = self.filterArz3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.ArzList();
        } else {
            tempData = ko.utils.arrayFilter(self.ArzList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                    ko.utils.stringStartsWith(item.Rate.toString().toLowerCase(), filter3)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageArz = ko.computed(function () {
        var pageSizeArz = parseInt(self.pageSizeArz(), 10),
            startIndex = pageSizeArz * self.currentPageIndexArz(),
            endIndex = startIndex + pageSizeArz;
        return self.filterArzList().slice(startIndex, endIndex);
    });

    self.nextPageArz = function () {
        if (((self.currentPageIndexArz() + 1) * self.pageSizeArz()) < self.filterArzList().length) {
            self.currentPageIndexArz(self.currentPageIndexArz() + 1);
        }
    };

    self.previousPageArz = function () {
        if (self.currentPageIndexArz() > 0) {
            self.currentPageIndexArz(self.currentPageIndexArz() - 1);
        }
    };

    self.firstPageArz = function () {
        self.currentPageIndexArz(0);
    };

    self.lastPageArz = function () {
        countArz = parseInt(self.filterArzList().length / self.pageSizeArz(), 10);
        if ((self.filterArzList().length % self.pageSizeArz()) == 0)
            self.currentPageIndexArz(countArz - 1);
        else
            self.currentPageIndexArz(countArz);
    };

    self.sortTableArz = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ArzList.sort(function (left, right) {
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
        self.iconTypeRate('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Rate') self.iconTypeRate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshArz').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست ارز به روز رسانی شود ؟",
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
                getArzList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectArz = function (item) {
        $('#nameArz').val('(' + item.Code + ') ' + item.Name);
        self.ArzCode(item.Code);
        //ArzRate(item.Rate);
        $('#ArzRate').val(item.Rate);
    }


    $('#modal-Arz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });








    self.currentPageBank = ko.observable();
    self.pageSizeBank = ko.observable(10);
    self.currentPageIndexBank = ko.observable(0);

    self.filterBank0 = ko.observable("");

    self.filterBankList = ko.computed(function () {

        self.currentPageIndexBank(0);
        var filter0 = self.filterBank0();

        if (!filter0) {
            return self.BankList();
        } else {
            tempData = ko.utils.arrayFilter(self.BankList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageBank = ko.computed(function () {
        var pageSizeBank = parseInt(self.pageSizeBank(), 10),
            startIndex = pageSizeBank * self.currentPageIndexBank(),
            endIndex = startIndex + pageSizeBank;
        return self.filterBankList().slice(startIndex, endIndex);
    });

    self.nextPageBank = function () {
        if (((self.currentPageIndexBank() + 1) * self.pageSizeBank()) < self.filterBankList().length) {
            self.currentPageIndexBank(self.currentPageIndexBank() + 1);
        }
    };

    self.previousPageBank = function () {
        if (self.currentPageIndexBank() > 0) {
            self.currentPageIndexBank(self.currentPageIndexBank() - 1);
        }
    };

    self.firstPageBank = function () {
        self.currentPageIndexBank(0);
    };

    self.lastPageBank = function () {
        countBank = parseInt(self.filterBankList().length / self.pageSizeBank(), 10);
        if ((self.filterBankList().length % self.pageSizeBank()) == 0)
            self.currentPageIndexBank(countBank - 1);
        else
            self.currentPageIndexBank(countBank);
    };

    self.sortTableBank = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.BankList.sort(function (left, right) {
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

        self.iconTypeName('');

        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshBank').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست بانک به روز رسانی شود ؟",
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
                getBankList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectBank = function (item) {
        $('#nameBank').val(item.Name);
    }


    $('#modal-Bank').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });










    self.currentPageShobe = ko.observable();
    self.pageSizeShobe = ko.observable(10);
    self.currentPageIndexShobe = ko.observable(0);

    self.filterShobe0 = ko.observable("");

    self.filterShobeList = ko.computed(function () {

        self.currentPageIndexShobe(0);
        var filter0 = self.filterShobe0();

        if (!filter0) {
            return self.ShobeList();
        } else {
            tempData = ko.utils.arrayFilter(self.ShobeList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageShobe = ko.computed(function () {
        var pageSizeShobe = parseInt(self.pageSizeShobe(), 10),
            startIndex = pageSizeShobe * self.currentPageIndexShobe(),
            endIndex = startIndex + pageSizeShobe;
        return self.filterShobeList().slice(startIndex, endIndex);
    });

    self.nextPageShobe = function () {
        if (((self.currentPageIndexShobe() + 1) * self.pageSizeShobe()) < self.filterShobeList().length) {
            self.currentPageIndexShobe(self.currentPageIndexShobe() + 1);
        }
    };

    self.previousPageShobe = function () {
        if (self.currentPageIndexShobe() > 0) {
            self.currentPageIndexShobe(self.currentPageIndexShobe() - 1);
        }
    };

    self.firstPageShobe = function () {
        self.currentPageIndexShobe(0);
    };

    self.lastPageShobe = function () {
        countShobe = parseInt(self.filterShobeList().length / self.pageSizeShobe(), 10);
        if ((self.filterShobeList().length % self.pageSizeShobe()) == 0)
            self.currentPageIndexShobe(countShobe - 1);
        else
            self.currentPageIndexShobe(countShobe);
    };

    self.sortTableShobe = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ShobeList.sort(function (left, right) {
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

        self.iconTypeName('');

        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshShobe').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست شعبه به روز رسانی شود ؟",
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
                getShobeList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectShobe = function (item) {
        $('#nameShobe').val(item.Name);
    }


    $('#modal-Shobe').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });













    self.currentPageJari = ko.observable();
    self.pageSizeJari = ko.observable(10);
    self.currentPageIndexJari = ko.observable(0);

    self.filterJari0 = ko.observable("");

    self.filterJariList = ko.computed(function () {

        self.currentPageIndexJari(0);
        var filter0 = self.filterJari0();


        if (!filter0) {
            return self.JariList();
        } else {
            tempData = ko.utils.arrayFilter(self.JariList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageJari = ko.computed(function () {
        var pageSizeJari = parseInt(self.pageSizeJari(), 10),
            startIndex = pageSizeJari * self.currentPageIndexJari(),
            endIndex = startIndex + pageSizeJari;
        return self.filterJariList().slice(startIndex, endIndex);
    });

    self.nextPageJari = function () {
        if (((self.currentPageIndexJari() + 1) * self.pageSizeJari()) < self.filterJariList().length) {
            self.currentPageIndexJari(self.currentPageIndexJari() + 1);
        }
    };

    self.previousPageJari = function () {
        if (self.currentPageIndexJari() > 0) {
            self.currentPageIndexJari(self.currentPageIndexJari() - 1);
        }
    };

    self.firstPageJari = function () {
        self.currentPageIndexJari(0);
    };

    self.lastPageJari = function () {
        countJari = parseInt(self.filterJariList().length / self.pageSizeJari(), 10);
        if ((self.filterJariList().length % self.pageSizeJari()) == 0)
            self.currentPageIndexJari(countJari - 1);
        else
            self.currentPageIndexJari(countJari);
    };

    self.sortTableJari = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.JariList.sort(function (left, right) {
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


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshJari').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست جاری به روز رسانی شود ؟",
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
                getJariList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectJari = function (item) {
        $('#nameJari').val(item.Name);
    }


    $('#modal-Jari').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageCheck = ko.observable();
    self.pageSizeCheck = ko.observable(10);
    self.currentPageIndexCheck = ko.observable(0);

    self.filterCheckNo = ko.observable("");
    self.filterCheckDate = ko.observable("");
    self.filterValue = ko.observable("");
    self.filterBank = ko.observable("");
    self.filterShobe = ko.observable("");
    self.filterJari = ko.observable("");
    self.filterBaratNo = ko.observable("");
    self.filterCheckStatus = ko.observable("");
    self.filterCheckStatusSt = ko.observable("");
    self.filterCheckRadif = ko.observable("");
    self.filterCheckComm = ko.observable("");

    self.filterTrafFullCode = ko.observable("");
    self.filterTrafFullName = ko.observable("");

    self.filterCheckList = ko.computed(function () {

        self.currentPageIndexCheck(0);
        var filterCheckNo = self.filterCheckNo();
        var filterCheckDate = self.filterCheckDate();
        var filterValue = self.filterValue();
        var filterBank = self.filterBank();
        var filterShobe = self.filterShobe();
        var filterJari = self.filterJari();
        var filterBaratNo = self.filterBaratNo();
        var filterCheckStatus = self.filterCheckStatus();
        var filterCheckStatusSt = self.filterCheckStatusSt();
        var filterCheckRadif = self.filterCheckRadif();
        var filterCheckComm = self.filterCheckComm();
        var filterTrafFullCode = self.filterTrafFullCode();
        var filterTrafFullName = self.filterTrafFullName();

        if (!filterCheckNo && !filterCheckDate && !filterValue && !filterBank && !filterShobe && !filterJari && !filterBaratNo
            && !filterCheckStatus && !filterCheckStatusSt && !filterCheckRadif && !filterCheckComm && !filterTrafFullCode && !filterTrafFullName) {
            return self.CheckList();
        } else {
            tempData = ko.utils.arrayFilter(self.CheckList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.CheckNo.toString().toLowerCase(), filterCheckNo) &&
                    (item.CheckDate == null ? '' : item.CheckDate.toString().search(filterCheckDate) >= 0) &&
                    ko.utils.stringStartsWith(item.Value.toString().toLowerCase(), filterValue) &&
                    (item.Bank == null ? '' : item.Bank.toString().search(filterBank) >= 0) &&
                    (item.Shobe == null ? '' : item.Shobe.toString().search(filterShobe) >= 0) &&
                    (item.Jari == null ? '' : item.Jari.toString().search(filterJari) >= 0) &&
                    ko.utils.stringStartsWith(item.BaratNo.toString().toLowerCase(), filterBaratNo) &&
                    (item.CheckStatus == null ? '' : item.CheckStatus.toString().search(filterCheckStatus) >= 0) &&
                    (item.CheckStatusSt == null ? '' : item.CheckStatusSt.toString().search(filterCheckStatusSt) >= 0) &&
                    ko.utils.stringStartsWith(item.CheckRadif.toString().toLowerCase(), filterCheckRadif) &&
                    (item.CheckComm == null ? '' : item.CheckComm.toString().search(filterCheckComm) >= 0) &&
                    ko.utils.stringStartsWith(item.TrafFullCode.toString().toLowerCase(), filterTrafFullCode) &&
                    (item.TrafFullName == null ? '' : item.TrafFullName.toString().search(filterTrafFullName) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCheck = ko.computed(function () {
        var pageSizeCheck = parseInt(self.pageSizeCheck(), 10),
            startIndex = pageSizeCheck * self.currentPageIndexCheck(),
            endIndex = startIndex + pageSizeCheck;
        return self.filterCheckList().slice(startIndex, endIndex);
    });

    self.nextPageCheck = function () {
        if (((self.currentPageIndexCheck() + 1) * self.pageSizeCheck()) < self.filterCheckList().length) {
            self.currentPageIndexCheck(self.currentPageIndexCheck() + 1);
        }
    };

    self.previousPageCheck = function () {
        if (self.currentPageIndexCheck() > 0) {
            self.currentPageIndexCheck(self.currentPageIndexCheck() - 1);
        }
    };

    self.firstPageCheck = function () {
        self.currentPageIndexCheck(0);
    };

    self.lastPageCheck = function () {
        countCheck = parseInt(self.filterCheckList().length / self.pageSizeCheck(), 10);
        if ((self.filterCheckList().length % self.pageSizeCheck()) == 0)
            self.currentPageIndexCheck(countCheck - 1);
        else
            self.currentPageIndexCheck(countCheck);
    };

    self.iconTypeCode = ko.observable("");

    self.iconTypeCheckNo = ko.observable("");
    self.iconTypeCheckDate = ko.observable("");
    self.iconTypeValue = ko.observable("");
    self.iconTypeBank = ko.observable("");
    self.iconTypeShobe = ko.observable("");
    self.iconTypeJari = ko.observable("");
    self.iconTypeBaratNo = ko.observable("");
    self.iconTypeCheckStatus = ko.observable("");
    self.iconTypeCheckStatusSt = ko.observable("");
    self.iconTypeCheckRadif = ko.observable("");
    self.iconTypeCheckComm = ko.observable("");
    self.iconTypeTrafFullCode = ko.observable("");
    self.iconTypeTrafFullName = ko.observable("");
    self.sortTableCheck = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.CheckList.sort(function (left, right) {
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

        // CheckNo,CheckDate,Value,Bank,Shobe,Jari,BaratNo,CheckStatus,CheckStatusSt,CheckRadif,CheckComm,TrafCode,TrafFullName

        self.iconTypeCheckNo('');
        self.iconTypeCheckDate('');
        self.iconTypeValue('');
        self.iconTypeBank('');
        self.iconTypeShobe('');
        self.iconTypeJari('');
        self.iconTypeBaratNo('');
        self.iconTypeCheckStatus('');
        self.iconTypeCheckStatusSt('');
        self.iconTypeCheckRadif('');
        self.iconTypeCheckComm('');
        self.iconTypeTrafFullCode('');
        self.iconTypeTrafFullName('');

        if (orderProp == 'CheckNo') self.iconTypeCheckNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckDate') self.iconTypeCheckDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Value') self.iconTypeValue((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bank') self.iconTypeBank((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Shobe') self.iconTypeShobe((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Jari') self.iconTypeJari((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'BaratNo') self.iconTypeBaratNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckStatus') self.iconTypeCheckStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckStatusSt') self.iconTypeCheckStatusSt((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckRadif') self.iconTypeCheckRadif((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckComm') self.iconTypeCheckComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafFullCode') self.iconTypeTrafFullCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafFullName') self.iconTypeTrafFullName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshCheck').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست حساب ها به روز رسانی شود ؟",
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
                getCheckList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectCheck = function (item) {
        // CheckNo,CheckDate,Value,Bank,Shobe,Jari,BaratNo,CheckStatus,CheckStatusSt,CheckRadif,CheckComm,TrafCode,TrafFullName

        $('#CheckNo').val(item.CheckNo);
        $('#CheckDate').val(item.CheckDate);
        $('#Value').val(NumberToNumberString(item.Value));
        $('#nameBank').val(item.Bank);
        $('#nameShobe').val(item.Shobe);
        $('#nameJari').val(item.Jari);
        $('#BaratNo').val(item.BaratNo);
        $('#CheckRadif').val(item.CheckRadif);
        if (item.TrafCode != '') {
            $('#nameTraf').val('(' + item.TrafCode + ') ' + item.TrafName);
        }
        else {
            $('#nameTraf').val('');
        }

        if (item.TrafZCode != '') {
            $('#nameZName').val('(' + item.TrafZCode + ') ' + item.TrafZName);
        }
        else {
            $('#nameZName').val('');
        }
        $('#CheckComm').val(item.CheckComm);

        $('#modal-Check').modal('toggle');
    }


    $('#modal-Check').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });















    self.ClearADocB = function ClearADocB() {
        // $('#codeKala').val('');
        //$('#nameKala').val('');
        // $("#unitName").empty();
        // self.KalaCode('');
        //self.Amount1('');
        //self.Amount2('');
        //self.Amount3('');
        //self.UnitPrice('');
        // self.TotalPrice('');
        // self.Discount('');
        //self.MainUnit('');
        // self.Comm('');

        //        $("#totalPrice").css("backgroundColor", "white");
        //        $("#unitPrice").css("backgroundColor", "white");
        //$("#discountdarsad").css("backgroundColor", "white");
        //$("#discountprice").css("backgroundColor", "white");
        //        flag = -1;
        //       flagdiscount = -1;
    };

    self.ImportBand = function (item) {
        self.ClearADocB();
        self.flagupdateband = false;
        self.bundNumberImport = item.BandNo;
    }


    function GetBandNumber() {

        if (self.ADocBList().length > 0) {
            bandnumber = self.ADocBList().length + 1;
        } else {
            bandnumber = 1;
        }
    }

    function HiddenCheck() {
        $('#panelCheck').attr('hidden', '');
        $("#panelSanad").removeClass("col-md-8");
        $("#panelSanad").addClass("col-md-12");
    }

    function ShowCheck() {
        $('#panelCheck').removeAttr('hidden', '');
        $("#panelSanad").removeClass("col-md-12");
        $("#panelSanad").addClass("col-md-8");
    }

    self.ButtonADocH = function ButtonADocH(newADocH) {
        $('#btnZAcc').attr('hidden', '');
        HiddenCheck();
        if (flagInsertADocH == 0) {
            self.ClearADocB();
            AddADocH(newADocH);
            flagInsertADocH == 1 ? $('#modal-Band').modal() : null
        } else {
            $('#modal-Band').modal()
        }
    }

    //Add new ADocH 
    function AddADocH(newADocH) {
        var tarikh = $("#tarikh").val().toEnglishDigit();
        modeCode = $("#modeCode").val();
        bandnumber = 0;

        if (tarikh.length != 10) {
            return showNotification('تاريخ را صحيح وارد کنيد', 0);
        }

        if (tarikh == '') {
            return showNotification('تاريخ را وارد کنيد', 0);
        }

        if ((tarikh >= sessionStorage.BeginDate) && (tarikh <= sessionStorage.EndDate)) {
        }
        else {
            return showNotification('تاريخ وارد شده با سال انتخابي همخواني ندارد', 0);
        }

        if (modeCode == '') {
            return showNotification('نوع سند را انتخاب کنید', 0);
        }

        if (self.DocNoOut == '') {
            return showNotification('شماره سند را وارد کنيد', 0);
        }



        var ADocObject = {
            SerialNumber: 0,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            mDocDate: 'null',
            Spec: self.Spec(),
            DocNoMode: 1,
            UserCode: sessionStorage.userName,
            ModeCode: modeCode,
            InsertMode: 0,
            DocNo: 0,
            StartNo: 0,
            EndNo: 0,
            BranchCode: 0,
            Tanzim: sessionStorage.userName,
            TahieShode: 'null',
            Eghdam: sessionStorage.userName
        };

        ajaxFunction(ADocHiUri + ace + '/' + sal + '/' + group, 'POST', ADocObject).done(function (response) {
            var res = response.split("-");
            Serial = res[0];
            DocNoOut = res[1];
            $('#docnoout').text(DocNoOut);
            flagInsertADocH = 1;
        });
        flagInsertADoc = 1;
    };


    //AddADocB
    self.AddADocB = function AddADocB(newADocB) {
    };


    //update ADocB
    self.UpdateADocB = function UpdateADocB(newADocB) {

    };


    function CreateTableSanad(data) {
        $("#TableSanad").empty();
        $('#TableSanad').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr>' +
            CreateTableTh('AccFullCode', data) +
            CreateTableTh('AccFullName', data) +
            CreateTableTh('Comm', data) +
            CreateTableTh('Bede', data) +
            CreateTableTh('Best', data) +
            CreateTableTh('CheckNo', data) +
            CreateTableTh('CheckDate', data) +
            CreateTableTh('Bank', data) +
            CreateTableTh('Shobe', data) +
            CreateTableTh('Jari', data) +
            CreateTableTh('TrafFullCode', data) +
            CreateTableTh('TrafFullName', data) +
            CreateTableTh('MkzCode', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprCode', data) +
            CreateTableTh('OprName', data) +
            CreateTableTh('BandSpec', data) +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: ADocBList" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
            CreateTableTd('AccFullCode', 0, 0, data) +
            CreateTableTd('AccFullName', 0, 0, data) +
            CreateTableTd('Comm', 0, 0, data) +
            CreateTableTd('Bede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('Best', sessionStorage.Deghat, 2, data) +
            CreateTableTd('CheckNo', 0, 0, data) +
            CreateTableTd('CheckDate', 0, 0, data) +
            CreateTableTd('Bank', 0, 0, data) +
            CreateTableTd('Shobe', 0, 0, data) +
            CreateTableTd('Jari', 0, 0, data) +
            CreateTableTd('TrafFullCode', 0, 0, data) +
            CreateTableTd('TrafFullName', 0, 0, data) +
            CreateTableTd('MkzCode', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('OprCode', 0, 0, data) +
            CreateTableTd('OprName', 0, 0, data) +
            CreateTableTd('BandSpec', 0, 0, data) +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            CreateTableTdSum('AccFullCode', 0, data) +
            CreateTableTdSum('AccFullName', 1, data) +
            CreateTableTdSum('Comm', 1, data) +
            CreateTableTdSum('Bede', 2, data) +
            CreateTableTdSum('Best', 2, data) +
            CreateTableTdSum('CheckNo', 1, data) +
            CreateTableTdSum('CheckDate', 1, data) +
            CreateTableTdSum('Bank', 1, data) +
            CreateTableTdSum('Shobe', 1, data) +
            CreateTableTdSum('Jari', 1, data) +
            CreateTableTdSum('TrafFullCode', 1, data) +
            CreateTableTdSum('TrafFullName', 1, data) +
            CreateTableTdSum('MkzCode', 1, data) +
            CreateTableTdSum('MkzName', 1, data) +
            CreateTableTdSum('OprCode', 1, data) +
            CreateTableTdSum('OprName', 1, data) +
            CreateTableTdSum('BandSpec', 1, data) +
            ' </tr>' +
            ' <tr style="background-color:#e37d228f;">' +
            CreateTableTdSum('AccFullCode', 3, data) +
            CreateTableTdSum('AccFullName', 1, data) +
            CreateTableTdSum('Comm', 1, data) +
            CreateTableTdSum('MonBede', 2, data) +
            CreateTableTdSum('MonBest', 2, data) +
            CreateTableTdSum('CheckNo', 1, data) +
            CreateTableTdSum('CheckDate', 1, data) +
            CreateTableTdSum('Bank', 1, data) +
            CreateTableTdSum('Shobe', 1, data) +
            CreateTableTdSum('Jari', 1, data) +
            CreateTableTdSum('TrafFullCode', 1, data) +
            CreateTableTdSum('TrafFullName', 1, data) +
            CreateTableTdSum('MkzCode', 1, data) +
            CreateTableTdSum('MkzName', 1, data) +
            CreateTableTdSum('OprCode', 1, data) +
            CreateTableTdSum('OprName', 1, data) +
            CreateTableTdSum('BandSpec', 1, data) +
            ' </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }

    function CreateTableTh(field, data) {
        text = '<th ';
        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden >';
        text +=
            '<span data-column="' + field + '">' + TextField + '</span>' +
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
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ' % 10)), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'#3f4853\' }"" style="text-align: right;"></td>'
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
        if (field != "MonBede" && field != "MonBest") {
            if (TextField == 0)
                text += 'Hidden ';
        }

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
            case 3:
                text += 'id="textMon"></td>';
                break;
        }
        return text;
    }


    function CreateTableCheck(data) {
        $("#TableCheck").empty();
        $('#TableCheck').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableCheck">' +
            CreateTableThCheck('CheckNo', data) +
            CreateTableThCheck('CheckDate', data) +
            CreateTableThCheck('Value', data) +
            CreateTableThCheck('Bank', data) +
            CreateTableThCheck('Shobe', data) +
            CreateTableThCheck('Jari', data) +
            CreateTableThCheck('BaratNo', data) +
            CreateTableThCheck('CheckStatus', data) +
            CreateTableThCheck('CheckStatusSt', data) +
            CreateTableThCheck('CheckRadif', data) +
            CreateTableThCheck('CheckComm', data) +
            CreateTableThCheck('TrafFullCode', data) +
            CreateTableThCheck('TrafFullName', data) +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageCheck" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind="click: $parent.selectCheck">' +
            CreateTableTdCheck('CheckNo', 0, 0, data) +
            CreateTableTdCheck('CheckDate', 0, 0, data) +
            CreateTableTdCheck('Value', 0, 0, data) +
            CreateTableTdCheck('Bank', 0, 0, data) +
            CreateTableTdCheck('Shobe', 0, 0, data) +
            CreateTableTdCheck('Jari', 0, 0, data) +
            CreateTableTdCheck('BaratNo', 0, 0, data) +
            CreateTableTdCheck('CheckStatus', 0, 0, data) +
            CreateTableTdCheck('CheckStatusSt', 0, 0, data) +
            CreateTableTdCheck('CheckRadif', 0, 0, data) +
            CreateTableTdCheck('CheckComm', 0, 0, data) +
            CreateTableTdCheck('TrafFullCode', 0, 0, data) +
            CreateTableTdCheck('TrafFullName', 0, 0, data) +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearchCheck('CheckNo', data) +
            CreateTableTdSearchCheck('CheckDate', data) +
            CreateTableTdSearchCheck('Value', data) +
            CreateTableTdSearchCheck('Bank', data) +
            CreateTableTdSearchCheck('Shobe', data) +
            CreateTableTdSearchCheck('Jari', data) +
            CreateTableTdSearchCheck('BaratNo', data) +
            CreateTableTdSearchCheck('CheckStatus', data) +
            CreateTableTdSearchCheck('CheckStatusSt', data) +
            CreateTableTdSearchCheck('CheckRadif', data) +
            CreateTableTdSearchCheck('CheckComm', data) +
            CreateTableTdSearchCheck('TrafFullCode', data) +
            CreateTableTdSearchCheck('TrafFullName', data) +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }


    function CreateTableThCheck(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'data-column="' + field + '">' +
            '<span data-column="' + field + '">' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + field + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }" ></i> </span> ' +
            '</th>';
        return text;
    }

    function CreateTableTdCheck(field, Deghat, no, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + '"></td>';
                break;
            case 1:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ' % 10)), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'#3f4853\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\'" style="text-align: right;"></td>'
                break;
        }
        return text;
    }

    function CreateTableTdSearchCheck(field, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\'" type="text" class="form-control" style="height: 2.4rem;" /> </td>';
        return text;
    }


};

ko.applyBindings(new ViewModel());