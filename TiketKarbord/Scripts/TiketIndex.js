var ViewModel = function () {
    var self = this;
    self.ErjDocXKList = ko.observableArray([]); // لیست گزارش  

    server = 'http://185.208.174.64:8001';
    var ErjDocXKUri = server + '/api/KarbordData/Web_ErjDocXK/'; // آدرس تیکت ها  

    ajaxFunction(server + '/api/Data/GetDate/', 'GET', false).done(function (list) {
        dateNow_Shamsi = list[0];
    });


    function getErjDocXK(log) {
        var ErjDocXKObject = {
            LockNo: lockNumber,
            ModeCode: '204',
            FlagLog: log,
            IP: '',
            CallProg: 'Tiket',
            LoginLink: false,
            top: null,
            Status: "فعال",
        }

        ErjDocXKObject = {
            LockNo: "10000",
            ModeCode: "204",
            FlagLog: true,
            IP: "151.238.51.222",
            CallProg: "Web",
            LoginLink: false,
            top: null,
            Status: null
        }

        ajaxFunction("http://localhost:1000/api/KarbordData/Web_ErjDocXK/", 'Post', ErjDocXKObject).done(function (dataDocXK) {


            var Object_TicketStatus = {
                SerialNumber: '',
                LockNumber: lockNumber == "000091" ? null : lockNumber,
                IP: ipw,
                CallProg: 'Web'
            }
            ajaxFunction(TicketStatusUri, 'Post', Object_TicketStatus, false).done(function (dataTicketStatus) {

                for (var i = 0; i < dataDocXK.length; i++) {
                    dataDocXK[i].ChatCount = 0;
                    for (var j = 0; j < dataTicketStatus.length; j++) {
                        if (dataDocXK[i].SerialNumber == dataTicketStatus[j].SerialNumber)
                            dataDocXK[i].Status = dataTicketStatus[j].TicketStatusSt;
                    }
                }

                //self.ErjDocXKList(dataDocXK);
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

            self.ErjDocXKList(dataDocXK);
        });
    }

    getErjDocXK(true);

};

ko.applyBindings(new ViewModel());

