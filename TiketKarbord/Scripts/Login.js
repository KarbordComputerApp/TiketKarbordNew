var ViewModel = function () {
    var server;

    var userAccount = "10000";
    var passAccount = "1";

    var user = "";
    var pass = "";

    var check = 0;

    var LoginUri; // 
    var LoginTestUri;

    //var serverAccount = 'http://192.168.0.106:902/api/';
    var serverAccount = 'http://127.0.0.1:902/api/';



    sessionStorage.SelectMenu = '';


    $("#user").focus();

    $("#user").keydown(function (e) {
        if (e.keyCode == key_Enter) {
            $("#pass").focus();
        }
    });

    $("#pass").keydown(function (e) {
        if (e.keyCode == key_Enter) {
            LoginUser();
        }
    });


    $("#userAccount").keydown(function (e) {
        if (e.keyCode == key_Enter) {
            $("#passAccount").focus();
        }
    });

    $("#passAccount").keydown(function (e) {
        if (e.keyCode == key_Enter) {
            LoginAccount();
        }
    });



    localStorage.setItem("serverAccount", serverAccount);



    var MachineId = localStorage.getItem("MachineIdKarbord");
    if (MachineId == null || MachineId == '') {
        var d = new Date();
        id = d.getDate() + d.getTime();
        localStorage.setItem("MachineIdKarbord", id);
    }


    var AccountUri = serverAccount + 'Account/'; // آدرس حساب

    var lastMachineId;

    function getLoginData() {

        pass === '' ? pass = 'null' : pass = pass;

        var LoginObject = {
            userName: user,
            pass: pass,
            param1: 'u-Xe',
            param2: 'zqQ3',
        }
        ajaxFunction(LoginUri, 'POST', LoginObject, true).done(function (data) {
        });
    }

    function getAccountData() {
        //window.localStorage.clear();
        ajaxFunctionAccount(AccountUri + userAccount + '/' + passAccount, 'GET').done(function (data) {
            if (data === 0) {

                return showNotification('نام مجوز ورود یا کلمه عبور اشتباه است', 0);
            }
            else {
                serverAddress = data.AddressApi;
                apiAddressPos = data.AddressApiPos;
                afi1List = data.AFI1_Group;
                afi8List = data.AFI8_Group;
                erjList = data.ERJ_Group;

                afi1Access = data.AFI1_Access;
                afi8Access = data.AFI8_Access;
                erjAccess = data.ERJ_Access;

                lockNumber = data.lockNumber;
                multilang = data.multilang;
                logoutmin = data.logoutmin;

                whereKala = data.WhereKala;
                whereCust = data.WhereCust;
                whereThvl = data.WhereThvl;
                whereAcc = data.WhereAcc;

                Master_ProgName = data.ProgName;
                Fct_or_Inv = data.Fct_or_Inv == 'FCT5' ? 'Fct5' : data.Fct_or_Inv == 'INV5' ? 'Inv5' : data.Fct_or_Inv;

                localStorage.setItem("ApiAddress", serverAddress);
                localStorage.setItem("ApiAddressPos", apiAddressPos);
                localStorage.setItem('userNameAccount', userAccount);
                localStorage.setItem('passAccount', passAccount);
                localStorage.setItem("lockNumber", lockNumber);

                localStorage.setItem('DataAccount', JSON.stringify(data));
                localStorage.setItem('afi1List', afi1List);
                localStorage.setItem('afi8List', afi8List);
                localStorage.setItem('erjList', erjList);

                localStorage.setItem('afi1Access', afi1Access);
                localStorage.setItem('afi8Access', afi8Access);
                localStorage.setItem('erjAccess', erjAccess);
                localStorage.setItem('multilang', multilang);
                localStorage.setItem('logoutmin', logoutmin);

                localStorage.setItem('whereKala', whereKala);
                localStorage.setItem('whereCust', whereCust);
                localStorage.setItem('whereThvl', whereThvl);
                localStorage.setItem('whereAcc', whereAcc);

                localStorage.setItem('Master_ProgName', Master_ProgName);
                localStorage.setItem('Fct_or_Inv', Fct_or_Inv);

                localStorage.setItem('expireDate', data.toDate);

               return showNotification('اتصال برقرار شد', 1);
            }
        });
    }


    self.LoginUser = function LoginUser() {

        user = $("#user").val();
        pass = $("#pass").val();
        if (user === "" || user === null) {
            return showNotification('نام کاربری را وارد کنید', 0);
        }
        window.location.href = localStorage.getItem("urlIndex");//sessionStorage.urlSetting;

        /*  server = localStorage.getItem("ApiAddress");
        if (server === null || server === "") {
            return showNotification('تنظیمات اتصال به وب را وارد کنید', 0);
            //return Swal.fire({ type: 'info', title: 'خطا در ورود', text: 'مشخصات سرویس را وارد کنید' });
        }
        user = $("#user").val();
        pass = $("#pass").val();
        if (user === "" || user === null) {
            return showNotification('نام کاربری را وارد کنید', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' نام کاربری را وارد کنید ' });
        }
        //if (pass == "" || pass == null) {
        //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' کلمه عبور را وارد کنید ' });
        //}
        LoginUri = server + '/api/Web_Data/Login/';
        LoginTestUri = server + '/api/Web_Data/LoginTest';
        //sessionStorage.ace = 0;

        //localStorage.setItem('ace', '');
        //localStorage.setItem('group', '');
        //localStorage.setItem('sal', '');
        localStorage.setItem("Inbox", 0);

        localStorage.setItem('Access', null);
        localStorage.setItem('AccessErj', null);
        sessionStorage.SelectMenu = 9;
        sessionStorage.Login = "OK";
        getLoginData();*/



    }







    self.LoginAccount = function LoginAccount() {

        userAccount = $("#userAccount").val();
        passAccount = $("#passAccount").val();

        if (userAccount === "" || userAccount === null) {
            return showNotification('نام کاربری را وارد کنید', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' نام کاربری را وارد کنید ' });
        }
        if (passAccount === "" || passAccount === null) {
            return showNotification('کلمه عبور را وارد کنید', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' کلمه عبور را وارد کنید ' });
        }

        //asciiuserAccount = '';
        //for (var i = 0; i < userAccount.length; i++)
        //    asciiuserAccount += (userAccount[i].charCodeAt(0) * 1024) + ',';
        //asciiuserAccount += i;

        //asciipassAccount = '';
        //for (var i = 0; i < passAccount.length; i++)
        //    asciipassAccount += (passAccount[i].charCodeAt(0) * 1024) + ',';
        //asciipassAccount += i;


        localStorage.setItem('ace', '');
        localStorage.setItem('group', '');
        localStorage.setItem('sal', '');

        localStorage.setItem("SalAcc", '');
        localStorage.setItem("SalFct", '');
        localStorage.setItem("SalInv", '');

        localStorage.setItem("Inbox", 0);

        getAccountData();
    }

    tempUser = localStorage.getItem("userName");
    tempPass = localStorage.getItem("password");
    $('#user').val(tempUser);
    $('#pass').val(tempPass == "null" ? '' : tempPass);

    // ورود خودکار به صفحه خانه
    if (tempUser != '') {
        // self.LoginUser();
    }

    function getIP() {
        ajaxFunctionAccount('http://ip-api.com/json/', 'GET').done(function (data) {
            //a = sessionStorage.MacAddress;
            //b = sessionStorage.IP4Address;
            localStorage.setItem("IPW", data.query);
            localStorage.setItem("CountryLogin", data.country);
            localStorage.setItem("CityLogin", data.city);

            sessionStorage.IPW = data.query;
            sessionStorage.CountryLogin = data.country
            sessionStorage.CityLogin = data.city
        });
    }

    //showMacAddress();
    getIP();
    ///a = GetLocalIPAddr();
    //a = a;

};

ko.applyBindings(new ViewModel());




