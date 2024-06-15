var ViewModel = function () {
    var self = this;

    var ErjDayRHUri = server + '/api/KarbordData/ErjDayRH/'; // آدرس گزارش کارها
    var ErjDayRBUri = server + '/api/KarbordData/ErjDayRB/'; // آدرس بند های گزارش کار 


    self.ErjDayRHList = ko.observableArray([]); // لیست گزارش  
    self.ErjDayRBList = ko.observableArray([]); // لیست نتیجه 


    function getErjDayRH() {
        var ErjDayRHObject = {
            Mode: 0,
            UserCode: userName ,
            Status: '',
            DocDate: '',
            Eghdam: '',
            Tanzim: '',
        };
        ajaxFunction(ErjDayRHUri, 'POST', ErjDayRHObject, false).done(function (response) {
            self.ErjDayRHList(response);
            $("#CountList").text(response.length);
        });
    }

    getErjDayRH();

    self.DocBModeChange = function () {
        getErjDayRH();
    }

    $('#refreshErjDayRH').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست گزارش کارها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getErjDayRH();
            }
        })
    })


    $("#Close_ModalErjDayRB").click(function (e) {
        $('#modal-ErjDayRB').modal('hide');
    })
    
    self.ViewErjDayRH = function (Band) {
        var ErjDayRBObject = {
            SerialNumber : Band.SerialNumber
        };
        ajaxFunction(ErjDayRBUri, 'POST', ErjDayRBObject, false).done(function (response) {
            self.ErjDayRBList(response);
        });

        $('#modal-ErjDayRB').modal('show');
    }

    self.CovertTime = function (time) {
        h = Math.floor(time)
        m = Math.round((time - Math.floor(time)) * 60 ) 

        return h + ':' + m ;
    }


};

ko.applyBindings(new ViewModel());

