var ViewModel = function () {
    var user = "";
    var pass = "";

    sessionStorage.SelectMenu = ''; 

    var LoginUri = server + '/api/KarbordData/Login/';

    $("#user").focus();

    tempUser = localStorage.getItem("userNameTiket");
    tempPass = localStorage.getItem("passwordTiket");
    $('#user').val(tempUser);
    $('#pass').val(tempPass == "null" ? '' : tempPass);

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




    var MachineId = localStorage.getItem("MachineIdKarbordTiket");
    if (MachineId == null || MachineId == '') {
        var d = new Date();
        id = d.getDate() + d.getTime();
        localStorage.setItem("MachineIdKarbordTiket", id);
    }






    self.LoginUser = function LoginUser() {

        user = $("#user").val();
        pass = $("#pass").val();
        if (user === "" || user === null) {
            return showNotification('نام کاربری را وارد کنید', 0);
        }
        getLoginData();
    }

    function getLoginData() {
        pass === '' ? pass = 'null' : pass = pass;

        var LoginObject = {
            userName: user,
            pass: pass,
            param1: 'u-Xe',
            param2: 'zqQ3',
        }

        ajaxFunction(LoginUri, 'POST', LoginObject, true).done(function (data) {
            if (data.length == 1) {
                item = data[0];
                localStorage.setItem("userNameFaTiket", item.Name);

                if (item.Value == 1) {
                    localStorage.setItem("userNameTiket", user);
                    localStorage.setItem('passwordTiket', pass);
                    getIP();
                    getAccessUser();
                    localStorage.removeItem('ErjUsers');
                    window.location.href = localStorage.getItem("urlIndex");
                }
                else {
                    return showNotification(translate('نام کاربری یا کلمه عبور اشتباه است'), 0);
                    sessionStorage.userName = '';
                    sessionStorage.pass = '';
                    localStorage.setItem("userNameTiket", '');
                    localStorage.setItem('passwordTiket', '');
                    localStorage.setItem('userNameFaTiket', '');
                }
            }
        });
    }


};

ko.applyBindings(new ViewModel());




