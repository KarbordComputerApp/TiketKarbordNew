! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Sweetalert2 = e()
}(this, function () {
    "use strict";

    function w(t) {
        return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function r(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function a() {
        return (a = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
            }
            return t
        }).apply(this, arguments)
    }

    function s(t) {
        return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function c(t, e) {
        return (c = Object.setPrototypeOf || function (t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function u(t, e, n) {
        return (u = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function () { })), !0
            } catch (t) {
                return !1
            }
        }() ? Reflect.construct : function (t, e, n) {
            var o = [null];
            o.push.apply(o, e);
            var i = new (Function.bind.apply(t, o));
            return n && c(i, n.prototype), i
        }).apply(null, arguments)
    }

    function l(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? function (t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }

    function d(t, e, n) {
        return (d = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
            var o = function (t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = s(t)););
                return t
            }(t, e);
            if (o) {
                var i = Object.getOwnPropertyDescriptor(o, e);
                return i.get ? i.get.call(n) : i.value
            }
        })(t, e, n || t)
    }
    var e = "SweetAlert2:",
        p = function (e) {
            return Object.keys(e).map(function (t) {
                return e[t]
            })
        },
        f = function (t) {
            return Array.prototype.slice.call(t)
        },
        C = function (t) {
            console.warn("".concat(e, " ").concat(t))
        },
        k = function (t) {
            console.error("".concat(e, " ").concat(t))
        },
        m = [],
        h = function (t, e) {
            var n;
            n = '"'.concat(t, '" is deprecated and will be removed in the next major release. Please use "').concat(e, '" instead.'), -1 === m.indexOf(n) && (m.push(n), C(n))
        },
        v = function (t) {
            return "function" == typeof t ? t() : t
        },
        B = function (t) {
            return t && Promise.resolve(t) === t
        },
        t = Object.freeze({
            cancel: "cancel",
            backdrop: "backdrop",
            close: "close",
            esc: "esc",
            timer: "timer"
        }),
        n = function (t) {
            var e = {};
            for (var n in t) e[t[n]] = "swal2-" + t[n];
            return e
        },
        x = n(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "toast", "toast-shown", "toast-column", "fade", "show", "hide", "noanimation", "close", "title", "header", "content", "actions", "confirm", "cancel", "footer", "icon", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl"]),
        g = n(["success", "warning", "info", "question", "error"]),
        b = {
            previousBodyPadding: null
        },
        y = function (t, e) {
            return t.classList.contains(e)
        },
        S = function (e, t, n) {
            f(e.classList).forEach(function (t) {
                -1 === p(x).indexOf(t) && -1 === p(g).indexOf(t) && e.classList.remove(t)
            }), t && t[n] && O(e, t[n])
        };

    function A(t, e) {
        if (!e) return null;
        switch (e) {
            case "select":
            case "textarea":
            case "file":
                return M(t, x[e]);
            case "checkbox":
                return t.querySelector(".".concat(x.checkbox, " input"));
            case "radio":
                return t.querySelector(".".concat(x.radio, " input:checked")) || t.querySelector(".".concat(x.radio, " input:first-child"));
            case "range":
                return t.querySelector(".".concat(x.range, " input"));
            default:
                return M(t, x.input)
        }
    }
    var P, L = function (t) {
        if (t.focus(), "file" !== t.type) {
            var e = t.value;
            t.value = "", t.value = e
        }
    },
        E = function (t, e, n) {
            t && e && ("string" == typeof e && (e = e.split(/\s+/).filter(Boolean)), e.forEach(function (e) {
                t.forEach ? t.forEach(function (t) {
                    n ? t.classList.add(e) : t.classList.remove(e)
                }) : n ? t.classList.add(e) : t.classList.remove(e)
            }))
        },
        O = function (t, e) {
            E(t, e, !0)
        },
        T = function (t, e) {
            E(t, e, !1)
        },
        M = function (t, e) {
            for (var n = 0; n < t.childNodes.length; n++)
                if (y(t.childNodes[n], e)) return t.childNodes[n]
        },
        V = function (t, e, n) {
            n || 0 === parseInt(n) ? t.style[e] = "number" == typeof n ? n + "px" : n : t.style.removeProperty(e)
        },
        j = function (t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "flex";
            t.style.opacity = "", t.style.display = e
        },
        q = function (t) {
            t.style.opacity = "", t.style.display = "none"
        },
        H = function (t, e, n) {
            e ? j(t, n) : q(t)
        },
        I = function (t) {
            return !(!t || !(t.offsetWidth || t.offsetHeight || t.getClientRects().length))
        },
        R = function () {
            return document.body.querySelector("." + x.container)
        },
        N = function (t) {
            var e = R();
            return e ? e.querySelector(t) : null
        },
        D = function (t) {
            return N("." + t)
        },
        U = function () {
            return D(x.popup)
        },
        _ = function () {
            var t = U();
            return f(t.querySelectorAll("." + x.icon))
        },
        z = function () {
            var t = _().filter(function (t) {
                return I(t)
            });
            return t.length ? t[0] : null
        },
        W = function () {
            return D(x.title)
        },
        K = function () {
            return D(x.content)
        },
        F = function () {
            return D(x.image)
        },
        Z = function () {
            return D(x["progress-steps"])
        },
        Q = function () {
            return D(x["validation-message"])
        },
        Y = function () {
            return N("." + x.actions + " ." + x.confirm)
        },
        $ = function () {
            return N("." + x.actions + " ." + x.cancel)
        },
        J = function () {
            return D(x.actions)
        },
        X = function () {
            return D(x.header)
        },
        G = function () {
            return D(x.footer)
        },
        tt = function () {
            return D(x.close)
        },
        et = function () {
            var t = f(U().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function (t, e) {
                return t = parseInt(t.getAttribute("tabindex")), (e = parseInt(e.getAttribute("tabindex"))) < t ? 1 : t < e ? -1 : 0
            }),
                e = f(U().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter(function (t) {
                    return "-1" !== t.getAttribute("tabindex")
                });
            return function (t) {
                for (var e = [], n = 0; n < t.length; n++) - 1 === e.indexOf(t[n]) && e.push(t[n]);
                return e
            }(t.concat(e)).filter(function (t) {
                return I(t)
            })
        },
        nt = function () {
            return !ot() && !document.body.classList.contains(x["no-backdrop"])
        },
        ot = function () {
            return document.body.classList.contains(x["toast-shown"])
        },
        it = function () {
            return "undefined" == typeof window || "undefined" == typeof document
        },
        rt = '\n <div aria-labelledby="'.concat(x.title, '" aria-describedby="').concat(x.content, '" class="').concat(x.popup, '" tabindex="-1">\n   <div class="').concat(x.header, '">\n     <ul class="').concat(x["progress-steps"], '"></ul>\n     <div class="').concat(x.icon, " ").concat(g.error, '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="').concat(x.icon, " ").concat(g.question, '"></div>\n     <div class="').concat(x.icon, " ").concat(g.warning, '"></div>\n     <div class="').concat(x.icon, " ").concat(g.info, '"></div>\n     <div class="').concat(x.icon, " ").concat(g.success, '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="').concat(x.image, '" />\n     <h2 class="').concat(x.title, '" id="').concat(x.title, '"></h2>\n     <button type="button" class="').concat(x.close, '">&times;</button>\n   </div>\n   <div class="').concat(x.content, '">\n     <div id="').concat(x.content, '"></div>\n     <input class="').concat(x.input, '" />\n     <input type="file" class="').concat(x.file, '" />\n     <div class="').concat(x.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(x.select, '"></select>\n     <div class="').concat(x.radio, '"></div>\n     <label for="').concat(x.checkbox, '" class="').concat(x.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat(x.label, '"></span>\n     </label>\n     <textarea class="').concat(x.textarea, '"></textarea>\n     <div class="').concat(x["validation-message"], '" id="').concat(x["validation-message"], '"></div>\n   </div>\n   <div class="').concat(x.actions, '">\n     <button type="button" class="').concat(x.confirm, '">OK</button>\n     <button type="button" class="').concat(x.cancel, '">Cancel</button>\n   </div>\n   <div class="').concat(x.footer, '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
        at = function (t) {
            Jt.isVisible() && P !== t.target.value && Jt.resetValidationMessage(), P = t.target.value
        },
        st = function (t) {
            var e;
            if ((e = R()) && (e.parentNode.removeChild(e), T([document.documentElement, document.body], [x["no-backdrop"], x["toast-shown"], x["has-column"]])), it()) k("SweetAlert2 requires document to initialize");
            else {
                var n = document.createElement("div");
                n.className = x.container, n.innerHTML = rt;
                var o, i, r, a, s, c, u, l, d, p, f, m, g = "string" == typeof (o = t.target) ? document.querySelector(o) : o;
                g.appendChild(n), i = t, (r = U()).setAttribute("role", i.toast ? "alert" : "dialog"), r.setAttribute("aria-live", i.toast ? "polite" : "assertive"), i.toast || r.setAttribute("aria-modal", "true"), a = g, "rtl" === window.getComputedStyle(a).direction && O(R(), x.rtl), s = K(), c = M(s, x.input), u = M(s, x.file), l = s.querySelector(".".concat(x.range, " input")), d = s.querySelector(".".concat(x.range, " output")), p = M(s, x.select), f = s.querySelector(".".concat(x.checkbox, " input")), m = M(s, x.textarea), c.oninput = at, u.onchange = at, p.onchange = at, f.onchange = at, m.oninput = at, l.oninput = function (t) {
                    at(t), d.value = l.value
                }, l.onchange = function (t) {
                    at(t), l.nextSibling.value = l.value
                }
            }
        },
        ct = function (t, e) {
            t instanceof HTMLElement ? e.appendChild(t) : "object" === w(t) ? ut(e, t) : t && (e.innerHTML = t)
        },
        ut = function (t, e) {
            if (t.innerHTML = "", 0 in e)
                for (var n = 0; n in e; n++) t.appendChild(e[n].cloneNode(!0));
            else t.appendChild(e.cloneNode(!0))
        },
        lt = function () {
            if (it()) return !1;
            var t = document.createElement("div"),
                e = {
                    WebkitAnimation: "webkitAnimationEnd",
                    OAnimation: "oAnimationEnd oanimationend",
                    animation: "animationend"
                };
            for (var n in e)
                if (e.hasOwnProperty(n) && void 0 !== t.style[n]) return e[n];
            return !1
        }(),
        dt = function (t) {
            var e = K().querySelector("#" + x.content);
            t.html ? (ct(t.html, e), j(e, "block")) : t.text ? (e.textContent = t.text, j(e, "block")) : q(e),
                function (e) {
                    for (var t, n = K(), o = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], i = function (t) {
                        t.placeholder && !e.inputPlaceholder || (t.placeholder = e.inputPlaceholder)
                    }, r = 0; r < o.length; r++) {
                        var a = x[o[r]],
                            s = M(n, a);
                        if (t = A(n, o[r])) {
                            for (var c in t.attributes)
                                if (t.attributes.hasOwnProperty(c)) {
                                    var u = t.attributes[c].name;
                                    "type" !== u && "value" !== u && t.removeAttribute(u)
                                }
                            for (var l in e.inputAttributes) "range" === o[r] && "placeholder" === l || t.setAttribute(l, e.inputAttributes[l])
                        }
                        s.className = a, e.inputClass && O(s, e.inputClass), e.customClass && O(s, e.customClass.input), q(s)
                    }
                    switch (e.input) {
                        case "text":
                        case "email":
                        case "password":
                        case "number":
                        case "tel":
                        case "url":
                            t = M(n, x.input), "string" == typeof e.inputValue || "number" == typeof e.inputValue ? t.value = e.inputValue : B(e.inputValue) || C('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(w(e.inputValue), '"')), i(t), t.type = e.input, j(t);
                            break;
                        case "file":
                            i(t = M(n, x.file)), t.type = e.input, j(t);
                            break;
                        case "range":
                            var d = M(n, x.range),
                                p = d.querySelector("input"),
                                f = d.querySelector("output");
                            p.value = e.inputValue, p.type = e.input, f.value = e.inputValue, j(d);
                            break;
                        case "select":
                            var m = M(n, x.select);
                            if (m.innerHTML = "", e.inputPlaceholder) {
                                var g = document.createElement("option");
                                g.innerHTML = e.inputPlaceholder, g.value = "", g.disabled = !0, g.selected = !0, m.appendChild(g)
                            }
                            j(m);
                            break;
                        case "radio":
                            var h = M(n, x.radio);
                            h.innerHTML = "", j(h);
                            break;
                        case "checkbox":
                            var v = M(n, x.checkbox),
                                b = A(n, "checkbox");
                            b.type = "checkbox", b.value = 1, b.id = x.checkbox, b.checked = Boolean(e.inputValue), v.querySelector("span").innerHTML = e.inputPlaceholder, j(v);
                            break;
                        case "textarea":
                            var y = M(n, x.textarea);
                            y.value = e.inputValue, i(y), j(y);
                            break;
                        case null:
                            break;
                        default:
                            k('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input, '"'))
                    }
                }(t), S(K(), t.customClass, "content")
        },
        pt = function () {
            for (var t = _(), e = 0; e < t.length; e++) q(t[e])
        },
        ft = function () {
            for (var t = U(), e = window.getComputedStyle(t).getPropertyValue("background-color"), n = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), o = 0; o < n.length; o++) n[o].style.backgroundColor = e
        },
        mt = function (c) {
            var u = Z();
            if (!c.progressSteps || 0 === c.progressSteps.length) return q(u);
            j(u), u.innerHTML = "";
            var l = parseInt(null === c.currentProgressStep ? Jt.getQueueStep() : c.currentProgressStep);
            l >= c.progressSteps.length && C("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), c.progressSteps.forEach(function (t, e) {
                var n, o, i, r, a = (n = t, o = document.createElement("li"), O(o, x["progress-step"]), o.innerHTML = n, o);
                if (u.appendChild(a), e === l && O(a, x["active-progress-step"]), e !== c.progressSteps.length - 1) {
                    var s = (i = t, r = document.createElement("li"), O(r, x["progress-step-line"]), i.progressStepsDistance && (r.style.width = i.progressStepsDistance), r);
                    u.appendChild(s)
                }
            })
        },
        gt = function (t) {
            var e, n, o, i, r = X();
            S(r, t.customClass, "header"), mt(t),
                function (t) {
                    var e = z();
                    if (e && e.classList.contains(g[t.type])) S(e, t.customClass, "icon");
                    else if (pt(), t.type)
                        if (ft(), -1 !== Object.keys(g).indexOf(t.type)) {
                            var n = N(".".concat(x.icon, ".").concat(g[t.type]));
                            j(n), S(n, t.customClass, "icon"), E(n, "swal2-animate-".concat(t.type, "-icon"), t.animation)
                        } else k('Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.type, '"'))
                }(t),
                function (t) {
                    var e = F();
                    if (!t.imageUrl) return q(e);
                    j(e), e.setAttribute("src", t.imageUrl), e.setAttribute("alt", t.imageAlt), V(e, "width", t.imageWidth), V(e, "height", t.imageHeight), e.className = x.image, S(e, t.customClass, "image"), t.imageClass && O(e, t.imageClass)
                }(t), e = t, n = W(), H(n, e.title || e.titleText), e.title && ct(e.title, n), e.titleText && (n.innerText = e.titleText), S(n, e.customClass, "title"), o = t, i = tt(), S(i, o.customClass, "closeButton"), H(i, o.showCloseButton), i.setAttribute("aria-label", o.closeButtonAriaLabel)
        },
        ht = function (t) {
            var e, n, o, i;
            e = t, n = U(), V(n, "width", e.width), V(n, "padding", e.padding), e.background && (n.style.background = e.background), n.className = x.popup, e.toast ? (O([document.documentElement, document.body], x["toast-shown"]), O(n, x.toast)) : O(n, x.modal), S(n, e.customClass, "popup"), "string" == typeof e.customClass && O(n, e.customClass), E(n, x.noanimation, !e.animation),
                function (t) {
                    var e = R();
                    if (e) {
                        if ("string" == typeof t.backdrop ? e.style.background = t.backdrop : t.backdrop || O([document.documentElement, document.body], x["no-backdrop"]), !t.backdrop && t.allowOutsideClick && C('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'), t.position in x ? O(e, x[t.position]) : (C('The "position" parameter is not valid, defaulting to "center"'), O(e, x.center)), t.grow && "string" == typeof t.grow) {
                            var n = "grow-" + t.grow;
                            n in x && O(e, x[n])
                        }
                        S(e, t.customClass, "container"), t.customContainerClass && O(e, t.customContainerClass)
                    }
                }(t), gt(t), dt(t),
                function (t) {
                    var e = J(),
                        n = Y(),
                        o = $();
                    if (t.showConfirmButton || t.showCancelButton ? j(e) : q(e), S(e, t.customClass, "actions"), H(n, t.showConfirmButton, "inline-block"), H(o, t.showCancelButton, "inline-block"), n.innerHTML = t.confirmButtonText, o.innerHTML = t.cancelButtonText, n.setAttribute("aria-label", t.confirmButtonAriaLabel), o.setAttribute("aria-label", t.cancelButtonAriaLabel), n.className = x.confirm, S(n, t.customClass, "confirmButton"), O(n, t.confirmButtonClass), o.className = x.cancel, S(o, t.customClass, "cancelButton"), O(o, t.cancelButtonClass), t.buttonsStyling) {
                        O([n, o], x.styled), t.confirmButtonColor && (n.style.backgroundColor = t.confirmButtonColor), t.cancelButtonColor && (o.style.backgroundColor = t.cancelButtonColor);
                        var i = window.getComputedStyle(n).getPropertyValue("background-color");
                        n.style.borderLeftColor = i, n.style.borderRightColor = i
                    } else T([n, o], x.styled), n.style.backgroundColor = n.style.borderLeftColor = n.style.borderRightColor = "", o.style.backgroundColor = o.style.borderLeftColor = o.style.borderRightColor = ""
                }(t), o = t, i = G(), H(i, o.footer), o.footer && ct(o.footer, i), S(i, o.customClass, "footer")
        };
    var vt = [],
        bt = function () {
            var t = U();
            t || Jt.fire(""), t = U();
            var e = J(),
                n = Y(),
                o = $();
            j(e), j(n), O([t, e], x.loading), n.disabled = !0, o.disabled = !0, t.setAttribute("data-loading", !0), t.setAttribute("aria-busy", !0), t.focus()
        },
        yt = {},
        wt = function () {
            return new Promise(function (t) {
                var e = window.scrollX,
                    n = window.scrollY;
                yt.restoreFocusTimeout = setTimeout(function () {
                    yt.previousActiveElement && yt.previousActiveElement.focus ? (yt.previousActiveElement.focus(), yt.previousActiveElement = null) : document.body && document.body.focus(), t()
                }, 100), void 0 !== e && void 0 !== n && window.scrollTo(e, n)
            })
        },
        Ct = {
            title: "",
            titleText: "",
            text: "",
            html: "",
            footer: "",
            type: null,
            toast: !1,
            customClass: "",
            customContainerClass: "",
            target: "body",
            backdrop: !0,
            animation: !0,
            heightAuto: !0,
            allowOutsideClick: !0,
            allowEscapeKey: !0,
            allowEnterKey: !0,
            stopKeydownPropagation: !0,
            keydownListenerCapture: !1,
            showConfirmButton: !0,
            showCancelButton: !1,
            preConfirm: null,
            confirmButtonText: "OK",
            confirmButtonAriaLabel: "",
            confirmButtonColor: null,
            confirmButtonClass: "",
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "",
            cancelButtonColor: null,
            cancelButtonClass: "",
            buttonsStyling: !0,
            reverseButtons: !1,
            focusConfirm: !0,
            focusCancel: !1,
            showCloseButton: !1,
            closeButtonAriaLabel: "Close this dialog",
            showLoaderOnConfirm: !1,
            imageUrl: null,
            imageWidth: null,
            imageHeight: null,
            imageAlt: "",
            imageClass: "",
            timer: null,
            width: null,
            padding: null,
            background: null,
            input: null,
            inputPlaceholder: "",
            inputValue: "",
            inputOptions: {},
            inputAutoTrim: !0,
            inputClass: "",
            inputAttributes: {},
            inputValidator: null,
            validationMessage: null,
            grow: !1,
            position: "center",
            progressSteps: [],
            currentProgressStep: null,
            progressStepsDistance: null,
            onBeforeOpen: null,
            onAfterClose: null,
            onOpen: null,
            onClose: null,
            scrollbarPadding: !0
        },
        kt = ["title", "titleText", "text", "html", "type", "customClass", "showConfirmButton", "showCancelButton", "confirmButtonText", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonClass", "cancelButtonText", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonClass", "buttonsStyling", "reverseButtons", "imageUrl", "imageWidth", "imageHeigth", "imageAlt", "imageClass", "progressSteps", "currentProgressStep"],
        Bt = {
            customContainerClass: "customClass",
            confirmButtonClass: "customClass",
            cancelButtonClass: "customClass",
            imageClass: "customClass",
            inputClass: "customClass"
        },
        xt = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusCancel", "heightAuto", "keydownListenerCapture"],
        St = function (t) {
            return Ct.hasOwnProperty(t)
        },
        At = function (t) {
            return Bt[t]
        },
        Pt = Object.freeze({
            isValidParameter: St,
            isUpdatableParameter: function (t) {
                return -1 !== kt.indexOf(t)
            },
            isDeprecatedParameter: At,
            argsToParams: function (n) {
                var o = {};
                switch (w(n[0])) {
                    case "object":
                        a(o, n[0]);
                        break;
                    default:
                        ["title", "html", "type"].forEach(function (t, e) {
                            switch (w(n[e])) {
                                case "string":
                                    o[t] = n[e];
                                    break;
                                case "undefined":
                                    break;
                                default:
                                    k("Unexpected type of ".concat(t, '! Expected "string", got ').concat(w(n[e])))
                            }
                        })
                }
                return o
            },
            isVisible: function () {
                return I(U())
            },
            clickConfirm: function () {
                return Y() && Y().click()
            },
            clickCancel: function () {
                return $() && $().click()
            },
            getContainer: R,
            getPopup: U,
            getTitle: W,
            getContent: K,
            getImage: F,
            getIcon: z,
            getIcons: _,
            getCloseButton: tt,
            getActions: J,
            getConfirmButton: Y,
            getCancelButton: $,
            getHeader: X,
            getFooter: G,
            getFocusableElements: et,
            getValidationMessage: Q,
            isLoading: function () {
                return U().hasAttribute("data-loading")
            },
            fire: function () {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return u(this, e)
            },
            mixin: function (n) {
                return function (t) {
                    function e() {
                        return o(this, e), l(this, s(e).apply(this, arguments))
                    }
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && c(t, e)
                    }(e, t), r(e, [{
                        key: "_main",
                        value: function (t) {
                            return d(s(e.prototype), "_main", this).call(this, a({}, n, t))
                        }
                    }]), e
                }(this)
            },
            queue: function (t) {
                var r = this;
                vt = t;
                var a = function (t, e) {
                    vt = [], document.body.removeAttribute("data-swal2-queue-step"), t(e)
                },
                    s = [];
                return new Promise(function (i) {
                    ! function e(n, o) {
                        n < vt.length ? (document.body.setAttribute("data-swal2-queue-step", n), r.fire(vt[n]).then(function (t) {
                            void 0 !== t.value ? (s.push(t.value), e(n + 1, o)) : a(i, {
                                dismiss: t.dismiss
                            })
                        })) : a(i, {
                            value: s
                        })
                    }(0)
                })
            },
            getQueueStep: function () {
                return document.body.getAttribute("data-swal2-queue-step")
            },
            insertQueueStep: function (t, e) {
                return e && e < vt.length ? vt.splice(e, 0, t) : vt.push(t)
            },
            deleteQueueStep: function (t) {
                void 0 !== vt[t] && vt.splice(t, 1)
            },
            showLoading: bt,
            enableLoading: bt,
            getTimerLeft: function () {
                return yt.timeout && yt.timeout.getTimerLeft()
            },
            stopTimer: function () {
                return yt.timeout && yt.timeout.stop()
            },
            resumeTimer: function () {
                return yt.timeout && yt.timeout.start()
            },
            toggleTimer: function () {
                var t = yt.timeout;
                return t && (t.running ? t.stop() : t.start())
            },
            increaseTimer: function (t) {
                return yt.timeout && yt.timeout.increase(t)
            },
            isTimerRunning: function () {
                return yt.timeout && yt.timeout.isRunning()
            }
        }),
        Lt = {
            promise: new WeakMap,
            innerParams: new WeakMap,
            domCache: new WeakMap
        };

    function Et() {
        var t = Lt.innerParams.get(this),
            e = Lt.domCache.get(this);
        t.showConfirmButton || (q(e.confirmButton), t.showCancelButton || q(e.actions)), T([e.popup, e.actions], x.loading), e.popup.removeAttribute("aria-busy"), e.popup.removeAttribute("data-loading"), e.confirmButton.disabled = !1, e.cancelButton.disabled = !1
    }
    var Ot = function () {
        null === b.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (b.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")), document.body.style.paddingRight = b.previousBodyPadding + function () {
            if ("ontouchstart" in window || navigator.msMaxTouchPoints) return 0;
            var t = document.createElement("div");
            t.style.width = "50px", t.style.height = "50px", t.style.overflow = "scroll", document.body.appendChild(t);
            var e = t.offsetWidth - t.clientWidth;
            return document.body.removeChild(t), e
        }() + "px")
    },
        Tt = function () {
            null !== b.previousBodyPadding && (document.body.style.paddingRight = b.previousBodyPadding + "px", b.previousBodyPadding = null)
        },
        Mt = function () {
            if (y(document.body, x.iosfix)) {
                var t = parseInt(document.body.style.top, 10);
                T(document.body, x.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * t
            }
        },
        Vt = function () {
            return !!window.MSInputMethodContext && !!document.documentMode
        },
        jt = function () {
            var t = R(),
                e = U();
            t.style.removeProperty("align-items"), e.offsetTop < 0 && (t.style.alignItems = "flex-start")
        },
        qt = function () {
            "undefined" != typeof window && Vt() && window.removeEventListener("resize", jt)
        },
        Ht = function () {
            f(document.body.children).forEach(function (t) {
                t.hasAttribute("data-previous-aria-hidden") ? (t.setAttribute("aria-hidden", t.getAttribute("data-previous-aria-hidden")), t.removeAttribute("data-previous-aria-hidden")) : t.removeAttribute("aria-hidden")
            })
        },
        It = {
            swalPromiseResolve: new WeakMap
        };

    function Rt(t, e) {
        ot() ? Ut(e) : (wt().then(function () {
            return Ut(e)
        }), yt.keydownTarget.removeEventListener("keydown", yt.keydownHandler, {
            capture: yt.keydownListenerCapture
        }), yt.keydownHandlerAdded = !1), t.parentNode && t.parentNode.removeChild(t), T([document.documentElement, document.body], [x.shown, x["height-auto"], x["no-backdrop"], x["toast-shown"], x["toast-column"]]), nt() && (Tt(), Mt(), qt(), Ht())
    }

    function Nt(t, e, n) {
        t.removeEventListener(lt, Nt), y(t, x.hide) && Rt(e, n)
    }

    function Dt(t) {
        var e = R(),
            n = U(),
            o = Lt.innerParams.get(this),
            i = It.swalPromiseResolve.get(this),
            r = o.onClose,
            a = o.onAfterClose;
        n && (null !== r && "function" == typeof r && r(n), T(n, x.show), O(n, x.hide), lt && !y(n, x.noanimation) ? n.addEventListener(lt, Nt.bind(null, n, e, a)) : Rt(e, a), i(t || {}))
    }
    var Ut = function (t) {
        null !== t && "function" == typeof t && setTimeout(function () {
            t()
        })
    };

    function _t(t, e, n) {
        var o = Lt.domCache.get(t);
        e.forEach(function (t) {
            o[t].disabled = n
        })
    }

    function zt(t, e) {
        if (!t) return !1;
        if ("radio" === t.type)
            for (var n = t.parentNode.parentNode.querySelectorAll("input"), o = 0; o < n.length; o++) n[o].disabled = e;
        else t.disabled = e
    }
    var Wt = function () {
        function n(t, e) {
            o(this, n), this.callback = t, this.remaining = e, this.running = !1, this.start()
        }
        return r(n, [{
            key: "start",
            value: function () {
                return this.running || (this.running = !0, this.started = new Date, this.id = setTimeout(this.callback, this.remaining)), this.remaining
            }
        }, {
            key: "stop",
            value: function () {
                return this.running && (this.running = !1, clearTimeout(this.id), this.remaining -= new Date - this.started), this.remaining
            }
        }, {
            key: "increase",
            value: function (t) {
                var e = this.running;
                return e && this.stop(), this.remaining += t, e && this.start(), this.remaining
            }
        }, {
            key: "getTimerLeft",
            value: function () {
                return this.running && (this.stop(), this.start()), this.remaining
            }
        }, {
            key: "isRunning",
            value: function () {
                return this.running
            }
        }]), n
    }(),
        Kt = {
            email: function (t, e) {
                return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid email address")
            },
            url: function (t, e) {
                return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid URL")
            }
        };
    var Ft = function (t) {
        var e = R(),
            n = U();
        null !== t.onBeforeOpen && "function" == typeof t.onBeforeOpen && t.onBeforeOpen(n), t.animation ? (O(n, x.show), O(e, x.fade), T(n, x.hide)) : T(n, x.fade), j(n), e.style.overflowY = "hidden", lt && !y(n, x.noanimation) ? n.addEventListener(lt, function t() {
            n.removeEventListener(lt, t), e.style.overflowY = "auto"
        }) : e.style.overflowY = "auto", O([document.documentElement, document.body, e], x.shown), t.heightAuto && t.backdrop && !t.toast && O([document.documentElement, document.body], x["height-auto"]), nt() && (t.scrollbarPadding && Ot(), function () {
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !y(document.body, x.iosfix)) {
                var t = document.body.scrollTop;
                document.body.style.top = -1 * t + "px", O(document.body, x.iosfix)
            }
        }(), "undefined" != typeof window && Vt() && (jt(), window.addEventListener("resize", jt)), f(document.body.children).forEach(function (t) {
            t === R() || function (t, e) {
                if ("function" == typeof t.contains) return t.contains(e)
            }(t, R()) || (t.hasAttribute("aria-hidden") && t.setAttribute("data-previous-aria-hidden", t.getAttribute("aria-hidden")), t.setAttribute("aria-hidden", "true"))
        }), setTimeout(function () {
            e.scrollTop = 0
        })), ot() || yt.previousActiveElement || (yt.previousActiveElement = document.activeElement), null !== t.onOpen && "function" == typeof t.onOpen && setTimeout(function () {
            t.onOpen(n)
        })
    },
        Zt = {
            select: function (t, e, i) {
                var r = M(t, x.select);
                e.forEach(function (t) {
                    var e = t[0],
                        n = t[1],
                        o = document.createElement("option");
                    o.value = e, o.innerHTML = n, i.inputValue.toString() === e.toString() && (o.selected = !0), r.appendChild(o)
                }), r.focus()
            },
            radio: function (t, e, a) {
                var s = M(t, x.radio);
                e.forEach(function (t) {
                    var e = t[0],
                        n = t[1],
                        o = document.createElement("input"),
                        i = document.createElement("label");
                    o.type = "radio", o.name = x.radio, o.value = e, a.inputValue.toString() === e.toString() && (o.checked = !0);
                    var r = document.createElement("span");
                    r.innerHTML = n, r.className = x.label, i.appendChild(o), i.appendChild(r), s.appendChild(i)
                });
                var n = s.querySelectorAll("input");
                n.length && n[0].focus()
            }
        };
    var Qt, Yt = Object.freeze({
        hideLoading: Et,
        disableLoading: Et,
        getInput: function (t) {
            var e = Lt.innerParams.get(t || this);
            return A(Lt.domCache.get(t || this).content, e.input)
        },
        close: Dt,
        closePopup: Dt,
        closeModal: Dt,
        closeToast: Dt,
        enableButtons: function () {
            _t(this, ["confirmButton", "cancelButton"], !1)
        },
        disableButtons: function () {
            _t(this, ["confirmButton", "cancelButton"], !0)
        },
        enableConfirmButton: function () {
            h("Swal.disableConfirmButton()", "Swal.getConfirmButton().removeAttribute('disabled')"), _t(this, ["confirmButton"], !1)
        },
        disableConfirmButton: function () {
            h("Swal.enableConfirmButton()", "Swal.getConfirmButton().setAttribute('disabled', '')"), _t(this, ["confirmButton"], !0)
        },
        enableInput: function () {
            return zt(this.getInput(), !1)
        },
        disableInput: function () {
            return zt(this.getInput(), !0)
        },
        showValidationMessage: function (t) {
            var e = Lt.domCache.get(this);
            e.validationMessage.innerHTML = t;
            var n = window.getComputedStyle(e.popup);
            e.validationMessage.style.marginLeft = "-".concat(n.getPropertyValue("padding-left")), e.validationMessage.style.marginRight = "-".concat(n.getPropertyValue("padding-right")), j(e.validationMessage);
            var o = this.getInput();
            o && (o.setAttribute("aria-invalid", !0), o.setAttribute("aria-describedBy", x["validation-message"]), L(o), O(o, x.inputerror))
        },
        resetValidationMessage: function () {
            var t = Lt.domCache.get(this);
            t.validationMessage && q(t.validationMessage);
            var e = this.getInput();
            e && (e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedBy"), T(e, x.inputerror))
        },
        getProgressSteps: function () {
            return h("Swal.getProgressSteps()", "const swalInstance = Swal.fire({progressSteps: ['1', '2', '3']}); const progressSteps = swalInstance.params.progressSteps"), Lt.innerParams.get(this).progressSteps
        },
        setProgressSteps: function (t) {
            h("Swal.setProgressSteps()", "Swal.update()");
            var e = a({}, Lt.innerParams.get(this), {
                progressSteps: t
            });
            Lt.innerParams.set(this, e), mt(e)
        },
        showProgressSteps: function () {
            var t = Lt.domCache.get(this);
            j(t.progressSteps)
        },
        hideProgressSteps: function () {
            var t = Lt.domCache.get(this);
            q(t.progressSteps)
        },
        _main: function (t) {
            var p = this;
            ! function (t) {
                for (var e in t) St(i = e) || C('Unknown parameter "'.concat(i, '"')), t.toast && (o = e, -1 !== xt.indexOf(o) && C('The parameter "'.concat(o, '" is incompatible with toasts'))), At(n = void 0) && h(n, At(n));
                var n, o, i
            }(t);
            var f = a({}, Ct, t);
            ! function (e) {
                e.inputValidator || Object.keys(Kt).forEach(function (t) {
                    e.input === t && (e.inputValidator = Kt[t])
                }), e.showLoaderOnConfirm && !e.preConfirm && C("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"), e.animation = v(e.animation), (!e.target || "string" == typeof e.target && !document.querySelector(e.target) || "string" != typeof e.target && !e.target.appendChild) && (C('Target parameter is not valid, defaulting to "body"'), e.target = "body"), "string" == typeof e.title && (e.title = e.title.split("\n").join("<br />"));
                var t = U(),
                    n = "string" == typeof e.target ? document.querySelector(e.target) : e.target;
                (!t || t && n && t.parentNode !== n.parentNode) && st(e)
            }(f), Object.freeze(f), Lt.innerParams.set(this, f), yt.timeout && (yt.timeout.stop(), delete yt.timeout), clearTimeout(yt.restoreFocusTimeout);
            var m = {
                popup: U(),
                container: R(),
                content: K(),
                actions: J(),
                confirmButton: Y(),
                cancelButton: $(),
                closeButton: tt(),
                validationMessage: Q(),
                progressSteps: Z()
            };
            Lt.domCache.set(this, m), ht(f);
            var g = this.constructor;
            return new Promise(function (t) {
                var n = function (t) {
                    p.closePopup({
                        value: t
                    })
                },
                    s = function (t) {
                        p.closePopup({
                            dismiss: t
                        })
                    };
                It.swalPromiseResolve.set(p, t), f.timer && (yt.timeout = new Wt(function () {
                    s("timer"), delete yt.timeout
                }, f.timer)), f.input && setTimeout(function () {
                    var t = p.getInput();
                    t && L(t)
                }, 0);
                for (var c = function (e) {
                    f.showLoaderOnConfirm && g.showLoading(), f.preConfirm ? (p.resetValidationMessage(), Promise.resolve().then(function () {
                        return f.preConfirm(e, f.validationMessage)
                    }).then(function (t) {
                        I(m.validationMessage) || !1 === t ? p.hideLoading() : n(void 0 === t ? e : t)
                    })) : n(e)
                }, e = function (t) {
                    var e = t.target,
                        n = m.confirmButton,
                        o = m.cancelButton,
                        i = n && (n === e || n.contains(e)),
                        r = o && (o === e || o.contains(e));
                    switch (t.type) {
                        case "click":
                            if (i)
                                if (p.disableButtons(), f.input) {
                                    var a = function () {
                                        var t = p.getInput();
                                        if (!t) return null;
                                        switch (f.input) {
                                            case "checkbox":
                                                return t.checked ? 1 : 0;
                                            case "radio":
                                                return t.checked ? t.value : null;
                                            case "file":
                                                return t.files.length ? t.files[0] : null;
                                            default:
                                                return f.inputAutoTrim ? t.value.trim() : t.value
                                        }
                                    }();
                                    f.inputValidator ? (p.disableInput(), Promise.resolve().then(function () {
                                        return f.inputValidator(a, f.validationMessage)
                                    }).then(function (t) {
                                        p.enableButtons(), p.enableInput(), t ? p.showValidationMessage(t) : c(a)
                                    })) : p.getInput().checkValidity() ? c(a) : (p.enableButtons(), p.showValidationMessage(f.validationMessage))
                                } else c(!0);
                            else r && (p.disableButtons(), s(g.DismissReason.cancel))
                    }
                }, o = m.popup.querySelectorAll("button"), i = 0; i < o.length; i++) o[i].onclick = e, o[i].onmouseover = e, o[i].onmouseout = e, o[i].onmousedown = e;
                if (m.closeButton.onclick = function () {
                    s(g.DismissReason.close)
                }, f.toast) m.popup.onclick = function () {
                    f.showConfirmButton || f.showCancelButton || f.showCloseButton || f.input || s(g.DismissReason.close)
                };
                else {
                    var r = !1;
                    m.popup.onmousedown = function () {
                        m.container.onmouseup = function (t) {
                            m.container.onmouseup = void 0, t.target === m.container && (r = !0)
                        }
                    }, m.container.onmousedown = function () {
                        m.popup.onmouseup = function (t) {
                            m.popup.onmouseup = void 0, (t.target === m.popup || m.popup.contains(t.target)) && (r = !0)
                        }
                    }, m.container.onclick = function (t) {
                        r ? r = !1 : t.target === m.container && v(f.allowOutsideClick) && s(g.DismissReason.backdrop)
                    }
                }
                f.reverseButtons ? m.confirmButton.parentNode.insertBefore(m.cancelButton, m.confirmButton) : m.confirmButton.parentNode.insertBefore(m.confirmButton, m.cancelButton);
                var a = function (t, e) {
                    for (var n = et(f.focusCancel), o = 0; o < n.length; o++) return (t += e) === n.length ? t = 0 : -1 === t && (t = n.length - 1), n[t].focus();
                    m.popup.focus()
                };
                if (yt.keydownHandlerAdded && (yt.keydownTarget.removeEventListener("keydown", yt.keydownHandler, {
                    capture: yt.keydownListenerCapture
                }), yt.keydownHandlerAdded = !1), f.toast || (yt.keydownHandler = function (t) {
                    return function (t, e) {
                        if (e.stopKeydownPropagation && t.stopPropagation(), "Enter" !== t.key || t.isComposing)
                            if ("Tab" === t.key) {
                                for (var n = t.target, o = et(e.focusCancel), i = -1, r = 0; r < o.length; r++)
                                    if (n === o[r]) {
                                        i = r;
                                        break
                                    }
                                t.shiftKey ? a(i, -1) : a(i, 1), t.stopPropagation(), t.preventDefault()
                            } else -1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].indexOf(t.key) ? document.activeElement === m.confirmButton && I(m.cancelButton) ? m.cancelButton.focus() : document.activeElement === m.cancelButton && I(m.confirmButton) && m.confirmButton.focus() : "Escape" !== t.key && "Esc" !== t.key || !0 !== v(e.allowEscapeKey) || (t.preventDefault(), s(g.DismissReason.esc));
                        else if (t.target && p.getInput() && t.target.outerHTML === p.getInput().outerHTML) {
                            if (-1 !== ["textarea", "file"].indexOf(e.input)) return;
                            g.clickConfirm(), t.preventDefault()
                        }
                    }(t, f)
                }, yt.keydownTarget = f.keydownListenerCapture ? window : m.popup, yt.keydownListenerCapture = f.keydownListenerCapture, yt.keydownTarget.addEventListener("keydown", yt.keydownHandler, {
                    capture: yt.keydownListenerCapture
                }), yt.keydownHandlerAdded = !0), p.enableButtons(), p.hideLoading(), p.resetValidationMessage(), f.toast && (f.input || f.footer || f.showCloseButton) ? O(document.body, x["toast-column"]) : T(document.body, x["toast-column"]), "select" === f.input || "radio" === f.input) {
                    var u = K(),
                        l = function (t) {
                            return Zt[f.input](u, (e = t, n = [], "undefined" != typeof Map && e instanceof Map ? e.forEach(function (t, e) {
                                n.push([e, t])
                            }) : Object.keys(e).forEach(function (t) {
                                n.push([t, e[t]])
                            }), n), f);
                            var e, n
                        };
                    B(f.inputOptions) ? (g.showLoading(), f.inputOptions.then(function (t) {
                        p.hideLoading(), l(t)
                    })) : "object" === w(f.inputOptions) ? l(f.inputOptions) : k("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(w(f.inputOptions)))
                } else if (-1 !== ["text", "email", "number", "tel", "textarea"].indexOf(f.input) && B(f.inputValue)) {
                    var d = g.getInput();
                    g.showLoading(), q(d), f.inputValue.then(function (t) {
                        d.value = "number" === f.input ? parseFloat(t) || 0 : t + "", j(d), d.focus(), p.hideLoading()
                    }).catch(function (t) {
                        k("Error in inputValue promise: " + t), d.value = "", j(d), d.focus(), p.hideLoading()
                    })
                }
                Ft(f), f.toast || (v(f.allowEnterKey) ? f.focusCancel && I(m.cancelButton) ? m.cancelButton.focus() : f.focusConfirm && I(m.confirmButton) ? m.confirmButton.focus() : a(-1, 1) : document.activeElement && "function" == typeof document.activeElement.blur && document.activeElement.blur()), m.container.scrollTop = 0
            })
        },
        update: function (e) {
            var n = {};
            Object.keys(e).forEach(function (t) {
                Jt.isUpdatableParameter(t) ? n[t] = e[t] : C('Invalid parameter to update: "'.concat(t, '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js'))
            });
            var t = a({}, Lt.innerParams.get(this), n);
            ht(t), Lt.innerParams.set(this, t), Object.defineProperties(this, {
                params: {
                    value: a({}, this.params, e),
                    writable: !1,
                    enumerable: !0
                }
            })
        }
    });

    function $t() {
        if ("undefined" != typeof window) {
            "undefined" == typeof Promise && k("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"), Qt = this;
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            var o = Object.freeze(this.constructor.argsToParams(e));
            Object.defineProperties(this, {
                params: {
                    value: o,
                    writable: !1,
                    enumerable: !0,
                    configurable: !0
                }
            });
            var i = this._main(this.params);
            Lt.promise.set(this, i)
        }
    }
    $t.prototype.then = function (t) {
        return Lt.promise.get(this).then(t)
    }, $t.prototype.finally = function (t) {
        return Lt.promise.get(this).finally(t)
    }, a($t.prototype, Yt), a($t, Pt), Object.keys(Yt).forEach(function (e) {
        $t[e] = function () {
            var t;
            if (Qt) return (t = Qt)[e].apply(t, arguments)
        }
    }), $t.DismissReason = t, $t.version = "8.8.1";
    var Jt = $t;
    return Jt.default = Jt
}), "undefined" != typeof window && window.Sweetalert2 && (window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2);
"undefined" != typeof document && function (e, t) {
    var n = e.createElement("style");
    if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);
    else try {
        n.innerHTML = t
    } catch (e) {
        n.innerText = t
    }
}(
    document,
    
       // "@charset \"UTF-8\";@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:initial;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon::before{display:flex;align-items:center;font-size:2em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon::before{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:2em;height:2.8125em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.25em;left:-.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 2em;transform-origin:0 2em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:showSweetToast .5s;animation:showSweetToast .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:hideSweetToast .2s forwards;animation:hideSweetToast .2s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:animate-toast-success-tip .75s;animation:animate-toast-success-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:animate-toast-success-long .75s;animation:animate-toast-success-long .75s}@-webkit-keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@-webkit-keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;background-color:transparent;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto;border-radius:20px;}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-popup .swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-popup .swal2-title{display:block;position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-popup .swal2-actions{z-index:1;flex-wrap:wrap;align-items:center;justify-content:center;margin:1.25em auto 0}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;width:2.5em;height:2.5em;margin:.46875em;padding:0;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{content:'';display:inline-block;width:15px;height:15px;margin-left:5px;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff}.swal2-popup .swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-popup .swal2-styled:not([disabled]){cursor:pointer}.swal2-popup .swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;color:#fff;font-size:1.0625em;background-color: #ec8121 !important;border-top-left-radius: 15px;border-bottom-left-radius: 15px;height: 35px;width: 150px;box-shadow: 2px 2px 5px 1px #4048524f;}.swal2-popup .swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;color:#fff;font-size:1.0625em;background-color: #ec8121 !important;border-top-right-radius: 15px;border-bottom-right-radius: 15px;height: 35px;width: 150px;box-shadow: 2px 2px 5px 1px #4048524f;}.swal2-popup .swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-popup .swal2-styled::-moz-focus-inner{border:0}.swal2-popup .swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-popup .swal2-image{max-width:100%;margin:1.25em auto}.swal2-popup .swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-popup .swal2-close:hover{-webkit-transform:none;transform:none;color:#f27474}.swal2-popup>.swal2-checkbox,.swal2-popup>.swal2-file,.swal2-popup>.swal2-input,.swal2-popup>.swal2-radio,.swal2-popup>.swal2-select,.swal2-popup>.swal2-textarea{display:none}.swal2-popup .swal2-content{z-index:1;justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;word-wrap:break-word}.swal2-popup #swal2-content{text-align:center}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-radio,.swal2-popup .swal2-select,.swal2-popup .swal2-textarea{margin:1em auto}.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);font-size:1.125em}.swal2-popup .swal2-file.swal2-inputerror,.swal2-popup .swal2-input.swal2-inputerror,.swal2-popup .swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-popup .swal2-file:focus,.swal2-popup .swal2-input:focus,.swal2-popup .swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-popup .swal2-file::-webkit-input-placeholder,.swal2-popup .swal2-input::-webkit-input-placeholder,.swal2-popup .swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-popup .swal2-file:-ms-input-placeholder,.swal2-popup .swal2-input:-ms-input-placeholder,.swal2-popup .swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::-ms-input-placeholder,.swal2-popup .swal2-input::-ms-input-placeholder,.swal2-popup .swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::placeholder,.swal2-popup .swal2-input::placeholder,.swal2-popup .swal2-textarea::placeholder{color:#ccc}.swal2-popup .swal2-range{margin:1em auto;background:inherit}.swal2-popup .swal2-range input{width:80%}.swal2-popup .swal2-range output{width:20%;font-weight:600;text-align:center}.swal2-popup .swal2-range input,.swal2-popup .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-popup .swal2-input{height:2.625em;padding:0 .75em}.swal2-popup .swal2-input[type=number]{max-width:10em}.swal2-popup .swal2-file{background:inherit;font-size:1.125em}.swal2-popup .swal2-textarea{height:6.75em;padding:.75em}.swal2-popup .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:#545454;font-size:1.125em}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-radio{align-items:center;justify-content:center;background:inherit}.swal2-popup .swal2-checkbox label,.swal2-popup .swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-popup .swal2-checkbox input,.swal2-popup .swal2-radio input{margin:0 .4em}.swal2-popup .swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-popup .swal2-validation-message::before{content:'!';display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;zoom:normal;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;zoom:normal;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon::before{display:flex;align-items:center;height:92%;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning::before{content:'!'}.swal2-icon.swal2-info{border-color:#ec8121;color:#ec8121}.swal2-icon.swal2-info::before{content:'i'}.swal2-icon.swal2-question{border-color:#ec8121;color:#ec8121}.swal2-icon.swal2-question::before{content:'?'}.swal2-icon.swal2-question.swal2-arabic-question-mark::before{content:'�'}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:initial!important}}"
        
        "@charset \"UTF-8\";@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:initial;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon::before{display:flex;align-items:center;font-size:2em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon::before{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:2em;height:2.8125em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.25em;left:-.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 2em;transform-origin:0 2em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:showSweetToast .5s;animation:showSweetToast .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:hideSweetToast .2s forwards;animation:hideSweetToast .2s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:animate-toast-success-tip .75s;animation:animate-toast-success-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:animate-toast-success-long .75s;animation:animate-toast-success-long .75s}@-webkit-keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@-webkit-keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;background-color:transparent;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto;border-radius:20px;}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-popup .swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-popup .swal2-title{display:block;position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-popup .swal2-actions{z-index:1;flex-wrap:wrap;align-items:center;justify-content:center;margin:1.25em auto 0}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;width:2.5em;height:2.5em;margin:.46875em;padding:0;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{content:'';display:inline-block;width:15px;height:15px;margin-left:5px;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff}.swal2-popup .swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-popup .swal2-styled:not([disabled]){cursor:pointer}.swal2-popup .swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;color:#fff;font-size:1.0625em;background-color: #ec8121 !important;border-top-right-radius: 15px;border-bottom-right-radius: 15px;height: 35px;width: 150px;box-shadow: 2px 2px 5px 1px #4048524f;}.swal2-popup .swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;color:#fff;font-size:1.0625em;background-color: #ec8121 !important;border-top-left-radius: 15px;border-bottom-left-radius: 15px;height: 35px;width: 150px;box-shadow: 2px 2px 5px 1px #4048524f;}.swal2-popup .swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-popup .swal2-styled::-moz-focus-inner{border:0}.swal2-popup .swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-popup .swal2-image{max-width:100%;margin:1.25em auto}.swal2-popup .swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-popup .swal2-close:hover{-webkit-transform:none;transform:none;color:#f27474}.swal2-popup>.swal2-checkbox,.swal2-popup>.swal2-file,.swal2-popup>.swal2-input,.swal2-popup>.swal2-radio,.swal2-popup>.swal2-select,.swal2-popup>.swal2-textarea{display:none}.swal2-popup .swal2-content{z-index:1;justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;word-wrap:break-word}.swal2-popup #swal2-content{text-align:center}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-radio,.swal2-popup .swal2-select,.swal2-popup .swal2-textarea{margin:1em auto}.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);font-size:1.125em}.swal2-popup .swal2-file.swal2-inputerror,.swal2-popup .swal2-input.swal2-inputerror,.swal2-popup .swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-popup .swal2-file:focus,.swal2-popup .swal2-input:focus,.swal2-popup .swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-popup .swal2-file::-webkit-input-placeholder,.swal2-popup .swal2-input::-webkit-input-placeholder,.swal2-popup .swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-popup .swal2-file:-ms-input-placeholder,.swal2-popup .swal2-input:-ms-input-placeholder,.swal2-popup .swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::-ms-input-placeholder,.swal2-popup .swal2-input::-ms-input-placeholder,.swal2-popup .swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::placeholder,.swal2-popup .swal2-input::placeholder,.swal2-popup .swal2-textarea::placeholder{color:#ccc}.swal2-popup .swal2-range{margin:1em auto;background:inherit}.swal2-popup .swal2-range input{width:80%}.swal2-popup .swal2-range output{width:20%;font-weight:600;text-align:center}.swal2-popup .swal2-range input,.swal2-popup .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-popup .swal2-input{height:2.625em;padding:0 .75em}.swal2-popup .swal2-input[type=number]{max-width:10em}.swal2-popup .swal2-file{background:inherit;font-size:1.125em}.swal2-popup .swal2-textarea{height:6.75em;padding:.75em}.swal2-popup .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:#545454;font-size:1.125em}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-radio{align-items:center;justify-content:center;background:inherit}.swal2-popup .swal2-checkbox label,.swal2-popup .swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-popup .swal2-checkbox input,.swal2-popup .swal2-radio input{margin:0 .4em}.swal2-popup .swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-popup .swal2-validation-message::before{content:'!';display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;zoom:normal;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;zoom:normal;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon::before{display:flex;align-items:center;height:92%;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning::before{content:'!'}.swal2-icon.swal2-info{border-color:#ec8121;color:#ec8121}.swal2-icon.swal2-info::before{content:'i'}.swal2-icon.swal2-question{border-color:#ec8121;color:#ec8121}.swal2-icon.swal2-question::before{content:'?'}.swal2-icon.swal2-question.swal2-arabic-question-mark::before{content:'�'}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:initial!important}}"
);