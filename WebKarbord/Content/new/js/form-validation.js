"use strict"; $(function () {
    $("#form_validation").validate({
        rules: {
            checkbox: { required: !0 },
            gender: { required: !0 }
        },
        highlight: function (r)
        {
            $(r).parents(".form-line").addClass("error")
        },
        unhighlight: function (r)
        {
            $(r).parents(".form-line").removeClass("error")
        },
        errorPlacement:
            function (r, e) {
                $(e).parents(".form-group").append(r)
            }
    }), $("#form_advanced_validation").validate({
        rules: {
            date: { customdate: !0 },
            creditcard: { creditcard: !0 }
        },
        highlight:
            function (r) {
                $(r).parents(".form-line").addClass("error")
            },
        unhighlight:
            function (r) {
                $(r).parents(".form-line").removeClass("error")
            },
        errorPlacement:
            function (r, e) {
                $(e).parents(".form-group").append(r)
            }
        }),

        $.validator.addMethod("customdate", function (r, e) {
            return r.match(/^\d\d\d\d?-\d\d?-\d\d$/)
        },
            "Please enter a date in the format YYYY-MM-DD."),
        $.validator.addMethod("creditcard", function (r, e) {
            return r.match(/^\d\d\d\d?-\d\d\d\d?-\d\d\d\d?-\d\d\d\d$/)
    },
        "Please enter a credit card in the format XXXX-XXXX-XXXX-XXXX.")
});