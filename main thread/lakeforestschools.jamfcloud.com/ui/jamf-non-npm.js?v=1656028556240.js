! function(e, t) {
    var n = t.documentElement,
        i = [];
    "ontouchstart" in e || 0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints || e.DocumentTouch && t instanceof DocumentTouch ? i.push("is-touch") : i.push("non-touch"), n.className += " " + i.join(" ")
}(window, document), $.fn.dataTableExt.oPagination.jamfSelect = {
    fnInit: function(n, e, i) {
        var t = document.createElement("div"),
            a = document.createElement("select"),
            o = document.createElement("button"),
            r = document.createElement("button");
        t.className = "paginate-input-wrapper", a.className = "jamf-button select", o.className = "jamf-button previous", r.className = "jamf-button next", r.type = "button", o.type = "button", t.appendChild(a), e.appendChild(o), e.appendChild(t), e.appendChild(r), "" !== n.sTableId && e.setAttribute("id", n.sTableId + "_paginate"), n.aLengthMenu = [
            [10, 25, 50, 100, 500, 1e3],
            [10, 25, 50, 100, 500, 1e3]
        ], n.deferRender = !0, -1 === n.aLengthMenu[1].indexOf(n._iDisplayLength) && (n._iDisplayLength = n.aLengthMenu[1][0], defaultsWrite("resultsPerPage", n._iDisplayLength));
        var s = ".grid-frame-inner";
        n.sScrollSelector && (s = n.sScrollSelector), $(a).change(function(e) {
            if ($(s).scrollTop(0), "" !== this.value && !this.value.match(/[^0-9]/)) {
                var t = n._iDisplayLength * (this.value - 1);
                if (t > n.fnRecordsDisplay()) return n._iDisplayStart = (Math.ceil((n.fnRecordsDisplay() - 1) / n._iDisplayLength) - 1) * n._iDisplayLength, void i(n);
                n._iDisplayStart = t, i(n)
            }
        }), $(o).click(function() {
            $(s).scrollTop(0), n.oApi._fnPageChange(n, "previous"), i(n)
        }), $(r).click(function() {
            $(s).scrollTop(0), n.oApi._fnPageChange(n, "next"), i(n)
        })
    },
    fnUpdate: function(e, t) {
        if (e.aanFeatures.p)
            for (var n = Math.ceil(e.fnRecordsDisplay() / e._iDisplayLength), i = Math.ceil(e._iDisplayStart / e._iDisplayLength) + 1, a = e.aanFeatures.p, o = 0, r = a.length; o < r; o++) {
                var s = a[o].getElementsByTagName("select")[0];
                if (s.options.length != n)
                    for (var l = s.options.length = 0; l < n; l++) {
                        var u = document.createElement("option");
                        u.text = l + 1, u.value = l + 1;
                        try {
                            s.add(u, null)
                        } catch (e) {
                            s.add(u)
                        }
                    }
                s.value = i;
                var d = a[o].getElementsByClassName("jamf-button previous")[0];
                1 == i ? (d.classList.add("disabled"), d.disabled = !0) : (d.classList.remove("disabled"), d.disabled = !1);
                var c = a[o].getElementsByClassName("jamf-button next")[0];
                i == n || 0 == n ? (c.classList.add("disabled"), c.disabled = !0) : (c.classList.remove("disabled"), c.disabled = !1);
                var f = a[o].getElementsByClassName("jamf-button select")[0],
                    m = a[o].getElementsByClassName("paginate-input-wrapper")[0];
                0 == n ? (m.classList.add("disabled"), f.classList.add("disabled"), f.disabled = !0) : (m.classList.remove("disabled"), f.classList.remove("disabled"), f.disabled = !1)
            }
    }
};
var currentFocus = null,
    ajaxFocus = null,
    currentScrollPosition = 0;

function updateSortedTables() {
    $("#content-inside").find("table.tablesorter").each(function() {
        $(this).trigger("update")
    })
}

function showDeletePrompt() {
    replaceFormInside("delete-verification"), document.getElementById("read-buttons").style.display = "none", document.getElementById("delete-buttons").style.display = "block"
}

function cancelDeletePrompt() {
    unReplaceFormInside("delete-verification"), document.getElementById("read-buttons").style.display = "block", document.getElementById("delete-buttons").style.display = "none"
}

function replaceFormInside(e) {
    document.getElementById("form-inside").style.display = "none", document.getElementById(e).style.display = "block", document.getElementById("back-button-mobile") && (document.getElementById("back-button-mobile").style.display = "none"), document.getElementById("edit-button-mobile") && (document.getElementById("edit-button-mobile").style.display = "none")
}

function unReplaceFormInside(e) {
    document.getElementById("form-inside").style.display = "flex", document.getElementById(e).style.display = "none", document.getElementById("back-button-mobile") && (document.getElementById("back-button-mobile").style.display = "block"), document.getElementById("edit-button-mobile") && (document.getElementById("edit-button-mobile").style.display = "block")
}

function showAddSiteWarning(e, t, n, i) {
    document.getElementById("form-inside").style.display = "none", document.getElementById("add-site-verification").style.display = "block", document.getElementById("add-site-verification").classList.remove("hide-element"), $("#add-site-verification").appendTo("#form-wrapper form"), document.getElementById("read-buttons").style.display = "none", document.getElementById("remove-site-buttons").style.display = "none", document.getElementById("add-site-buttons").style.display = "block", "" != e && (document.getElementById("addSiteTitle").innerText = e), "" != t && (document.getElementById("addSiteText").innerText = t), $("#add-site-save-button").click(function() {
        submitAddSite(n, i), hideAddSiteWarning()
    })
}

function hideAddSiteWarning() {
    document.getElementById("form-inside").style.display = "flex", document.getElementById("add-site-verification").style.display = "none", document.getElementById("add-site-verification").classList.add("hide-element"), document.getElementById("read-buttons").style.display = "block", document.getElementById("add-site-buttons").style.display = "none", document.getElementById("edit-buttons") && (document.getElementById("edit-buttons").style.display = "none"), document.getElementById("remove-site-buttons").style.display = "none"
}

function showRemoveSiteWarning(e, t, n, i) {
    document.getElementById("form-inside").style.display = "none", document.getElementById("remove-site-verification").style.display = "block", document.getElementById("remove-site-verification").classList.remove("hide-element"), $("#remove-site-verification").appendTo("#form-wrapper form"), document.getElementById("edit-buttons").style.display = "none", document.getElementById("add-site-buttons").style.display = "none", document.getElementById("remove-site-buttons").style.display = "block", "" != e && (document.getElementById("removeSiteTitle").innerText = e), "" != t && (document.getElementById("removeSiteText").innerText = t), $("#remove-site-save-button").click(function() {
        i(n), hideRemoveSiteWarning()
    })
}

function hideRemoveSiteWarning() {
    document.getElementById("form-inside").style.display = "flex", document.getElementById("remove-site-verification").style.display = "none", document.getElementById("form-buttons").style.display = "block", document.getElementById("remove-site-buttons").style.display = "none", document.getElementById("edit-buttons").style.display = "block"
}

function submitAddSite(e, t) {
    document.getElementById(e).value = !0, t && t()
}

function disableForm() {
    $("#form-inside").find("input, textarea, button, select, submit").attr("disabled", "disabled")
}

function changeTab(e) {
    changeTabFast(e)
}

function createNewEvent(e) {
    if ("function" == typeof Event) var t = new Event(e);
    else(t = document.createEvent("Event")).initEvent(e, !0, !0);
    return t
}

function changeTabFast(e) {
    var t = $("[id='" + e + "']"),
        n = "-active",
        i = "-inactive";
    if (t.length) {
        $("#form-wrapper ul.tabs").find("li").removeClass("active"), t.addClass("active"), t.show(), $("#lastTab").val(e), $("#form-inside").find(".pane:not(.payload)").removeAttr("style").removeClass(n).addClass(i), $("[id='" + e + "_Pane']").removeAttr("style").removeClass(i).addClass(n), setTimeout(function() {
            if ($("#sideNavigationScrollbox").length) {
                var e = $("#lastSideTab").attr("value");
                "null" !== e && "" !== e ? changeSideTab(document.getElementById("lastSideTab").value) : $("#sideNavigationScrollbox .side-navigation li:first a")[0].click()
            }
        });
        var a = createNewEvent("resize"),
            o = createNewEvent("topTabChange");
        window.dispatchEvent(a), window.dispatchEvent(o)
    }
    "function" == typeof onChangeTab && onChangeTab(e)
}

function hidePanes() {
    var e = $("#form-inside").find("div.pane");
    e.removeAttr("style").addClass("-inactive"), e.hasClass("-active") && e.removeClass("-active")
}

function getXMLValue(e, t) {
    var n = getXMLValueNoDefault(e, t);
    return null == n ? "" : n
}

function getXMLValueNoDefault(e, t) {
    if (0 != e.getElementsByTagName(t).length) return null != e.getElementsByTagName(t)[0].childNodes[0] ? e.getElementsByTagName(t)[0].childNodes[0].nodeValue : null
}

function updateFieldText(e, t) {
    null === t && (t = ""), null != t && (document.getElementById(e).textContent = t)
}

function updateFieldTextFromXML(e, t) {
    updateFieldText(t + "_VALUE", getXMLValueNoDefault(e, t))
}

function updateUnderscoredFieldTextFromXML(e, t) {
    updateFieldText(t.replace("/_/g", " ") + "_VALUE", getXMLValue(e, t.replace("/_/g", " ")))
}

function updateFieldValue(e, t) {
    t && (document.getElementById(e).value = t)
}

function updateDateFromXML(e, t) {
    updateFieldValue(t + "_month", getXMLValue(e, t + "_month")), updateFieldValue(t + "_day", getXMLValue(e, t + "_day")), updateFieldValue(t + "_year", getXMLValue(e, t + "_year"))
}

function applyFieldValidationErrors(e, t) {
    removeAllValidationErrors(), $(e.getElementsByTagName("ERROR")).each(function(e) {
        appendErrorMessageToInputDiv(getErrorFieldValue(this, "ERROR_FIELD"), "", getErrorFieldValue(this, "ERROR_TEXT"), t)
    })
}

function appendErrorMessageToInputDiv(n, e, i, t) {
    var a = document.getElementById(n + "Error");
    if (null == a || "undefined" == a) {
        var o = document.getElementById(t);
        $(o.getElementsByTagName("div")).each(function(e) {
            if ($(this).attr("id") == n + "Wrapper") {
                (a = document.createElement("span")).id = n + "Error", a.className = "jamf-label error-message required";
                var t = document.createTextNode(i);
                a.appendChild(t), $(this).append(a)
            }
        })
    }
}

function getErrorFieldValue(e, t) {
    return e.getElementsByTagName(t)[0].textContent
}

function getSingleWarningFieldValue(e, i) {
    var a = "";
    return $(e.getElementsByTagName("WARNING")).each(function(e) {
        var t = getErrorFieldValue(this, "WARNING_FIELD"),
            n = getErrorFieldValue(this, "WARNING_TEXT");
        t == i && (a = n)
    }), a
}

function removeAllValidationErrors() {
    $(".error, .required").each(function(e) {
        $(this).remove()
    })
}

function removeValidationErrors(e) {
    $("#" + e).find(".error, .required").remove()
}

function drawDefaultTabs() {
    var e = document.getElementById("lastTab").value,
        t = document.getElementById("top-tabs");
    "null" == e ? t && changeTabFast($("#top-tabs li:nth-of-type(1)").attr("id")) : t && changeTabFast(e);
    var n = document.getElementById("lastSideTab").value,
        i = document.getElementById("sideNavigation");
    "null" == n ? i && changeSideTab($("#sideNavigation li:nth-of-type(1)").attr("id").replace("_Tab", "")) : i && changeSideTab(n)
}

function showPane(e, t) {
    (t ? $("#" + t) : $("#contentScrollbox")).find("div.pane").removeClass("-active").addClass("-inactive"), document.getElementById(e).classList.remove("-inactive"), document.getElementById(e).classList.add("-active"), "function" == typeof onShowPane && onShowPane(e, t)
}

function clearCurrentFocus() {
    currentFocus = null
}

function ajaxResponse(e) {
    this.responseXML = e
}
void 0 === NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach), $(document).ready(function() {
    var o;
    $("#logo").mouseover(function() {
        $("#logo-hover").show()
    }), $("#logo").mouseout(function() {
        $("#logo-hover").hide()
    }), $("#logs").click(function() {
        $(this).toggleClass("logs-active")
    }), $("#settings").click(function() {
        $(this).toggleClass("settings-active")
    }), $("#notifications-link").click(function() {
        $(".sites-modal").hide(), $("#user-modal").hide(), $("#notifications-modal").toggle()
    }), $("#notifications-link-mobile").click(function() {
        $("#notifications-modal-mobile").toggle()
    }), $("#notifications-modal .handle").click(function() {
        $("#notifications-modal").toggle()
    }), $("#notifications-modal-mobile .handle").click(function() {
        $("#notifications-modal-mobile").toggle()
    }), $("#user-link").click(function() {
        $(".sites-modal").hide(), $("#notifications-modal").hide(), $("#user-modal").toggle()
    }), $("#user-link-mobile").click(function() {
        $(".sites-modal").hide(), $("#user-modal-mobile").toggle()
    }), $("#user-modal .handle").click(function() {
        $("#user-modal").toggle()
    }), $("#user-modal-mobile .handle").click(function() {
        $("#user-modal-mobile").toggle()
    }), $("#search-icon").click(function() {
        $("#searchbox").toggle(), $(".active-page").toggle(), $("#logo-dash").toggleClass("logo-search")
    }), $("#search-icon-mobile").click(function() {
        $("#searchbox").toggle()
    }), $("#close-search").click(function() {
        $("#searchbox").toggle(), $(".active-page").toggle(), $("#logo-dash").toggleClass("logo-search")
    }), $(document).on("keyup", "input.clearRequiredOnEntry", function() {
        $("span.clearRequiredOnEntry").hide()
    }), (o = jQuery).fn.searchApps = function(e, n) {
        var t = {
                onSelect: function() {
                    return !0
                },
                onFocus: function() {
                    return !0
                },
                appendTo: o(this).parent()
            },
            i = o.extend({}, t, e),
            a = this;
        a.autocomplete({
            source: function(e, a) {
                var t = "SEARCH_TERM=" + e.term;
                submitAjaxPredefinedForm("AJAX_SEARCH_APP_REPOSITORIES", t += void 0 === n ? "" : "&FIELD_OS_TYPE=" + n, function(e) {
                    var t = parseArray(e.responseXML, "APP_NAME"),
                        n = parseArray(e.responseXML, "BUNDLE_ID"),
                        i = o.map(t, function(e, t) {
                            return {
                                appName: e,
                                bundleID: n[t]
                            }
                        });
                    a(i)
                })
            },
            select: function(e, t) {
                return i.onSelect(a, t.item)
            },
            focus: function(e, t) {
                return i.onFocus(a, t.item)
            },
            appendTo: i.appendTo
        }).autocomplete("instance")._renderItem = function(e, t) {
            return o("<li>").data("item.autocomplete", t).append("<div class='searchListAppName'>" + t.appName + "</div><div class='search-list-bundle-id'>" + t.bundleID + "</div>").appendTo(e)
        }
    }, addListenersToFields(), "function" == typeof setDefaultField && setDefaultField(), window.scrollTo(0, 1), $("table.tablesorter").each(function() {
        var i = {};
        $(this).find("th").each(function(e, t) {
            var n = {};
            $(this).hasClass("no-tablesorter") ? n.sorter = !1 : $(this).hasClass("enforce-text-sort") && (n.sorter = "text"), i[$(this).index()] = n
        }), $(this).tablesorter({
            headers: i
        })
    }), $("table.standardDataTable").each(function() {
        var i = new Array,
            e = $(this),
            a = e.attr("id"),
            o = e.find("th").length,
            t = e.data("emptytext");
        e.find("th").each(function() {
            null != $(this).attr("notSortable") ? i.push({
                bSortable: !1
            }) : 0 < $(this).children("span.sortableDate").length ? i.push({
                bSortable: !0,
                sType: "epoch"
            }) : i.push({
                bSortable: !0
            })
        }), e.dataTable({
            iDisplayLength: -1,
            bAutoWidth: !1,
            bStateSave: !0,
            fnStateSave: function(e, t) {
                localStorage.setItem("JSS_DataTables_" + window.location.pathname + window.location.search + "#" + a, JSON.stringify(t))
            },
            fnStateLoad: function(e) {
                var t = JSON.parse(localStorage.getItem("JSS_DataTables_" + window.location.pathname + window.location.search + "#" + a));
                if (t && t.ColSizes == o)
                    for (var n = 0; n < t.ColSizes.length; n++) null != t.ColSizes[n] && (i[n].sWidth = t.ColSizes[n]);
                else if (null != t) return localStorage.removeItem("JSS_DataTables_" + window.location.pathname + window.location.search + "#" + a), null;
                return t
            },
            sDom: "zt",
            aoColumns: i,
            language: {
                emptyTable: null
            },
            initComplete: function() {
                $(".dataTables_empty").text(t)
            }
        })
    }), "function" == typeof setDefaultTab && setDefaultTab(), "function" == typeof setDefaultSideTab && setDefaultSideTab(), "function" == typeof scopeFinishLoading && scopeFinishLoading(), "function" == typeof pageLoadCompleteDrawTabs && (pageLoadCompleteDrawTabs(), "function" == typeof setDefaultField && setDefaultField()), "function" == typeof deploymentScopeFinishLoading && (deploymentScopeFinishLoading(), addListenersToFields())
}), $(function() {
    for (var e, t, n = $("#top-tabs li"), i = [], a = [], o = 0; o < n.length; o++) i.push(n[o].id), a.push(n[o].id + "_Pane");
    for (var r = 0; r < a.length; r++)
        if (0 < (e = $("[id='" + a[r] + "']").find(".has-error").length)) {
            t = a[r];
            for (var s = 0; s < a.length; s++)
                if (t === i[s] + "_Pane") {
                    var l = $("[id='" + i[s] + "']");
                    l.addClass("display-errors"), l.find("a").append("<span class='errors-found' translate='ERROR_COUNT' translate-interpolation='messageformat' translate-value-count='" + e + "'>&nbsp;</span>")
                }
        }
});
var forEach = function(e, t, n) {
    for (var i = 0; i < e.length; i++) t.call(n, i, e[i])
};

function changeSideTab(e) {
    if (currentScrollPosition = window.pageYOffset, window.scrollTo(0, 0), currentFocus = null, $("#sideNavigationScrollbox ul.side-navigation").find("li").attr("class", ""), document.querySelectorAll("#" + e + "_Tab").length) {
        var t = document.querySelectorAll("#" + e + "_Tab");
        forEach(t, function(e, t) {
            t.setAttribute("class", "current")
        }), showPane(e + "_Pane"), $("#form-buttons-top #navtitle").hide(), $("#form-buttons-top #leftnav").hide(), document.getElementById("contentScrollbox").scrollTop = 0, document.getElementById("lastSideTab").value = e
    }
}

function handleFormSubmission() {
    if (null == currentFocus) return !1;
    var e = currentFocus;
    return $("#" + e.id).is(":visible") && 0 !== $("#" + e.id).parents().filter("div.inline-edit").length ? (ajaxFocus = currentFocus, currentFocus = void 0, $("#" + e.id).parents().filter("div.inline-edit").children().filter(".insideActionButton").click(), !1) : $("#" + e.id).is(":visible") && 0 !== $("#" + e.id).parents().filter("tr.inline-edit").length ? (currentFocus = void 0, $("#" + e.id).parents().filter("tr.inline-edit").children().children().filter(".insideActionButton").click(), !1) : !$("#" + e.id).is(":visible") || 0 === $("#" + e.id).parents().filter(".dataTables_filter").length || (currentFocus = void 0, !1)
}
var ajaxInProgress = {};

function submitAjaxFormConfirm(e, t, n, i) {
    submitAjaxForm(e, t, function(e) {
        if (getXMLValue(e.responseXML, "saveConfirm")) {
            var t = "setOverlayContentFunction_" + i;
            "function" == typeof window[t] ? window[t](e.responseXML) : $(i + " modal-body div").text(getXMLValue(e.responseXML, "SAVE_VERIFICATION_CONTENT")), window["openOverlay_" + i]()
        } else n && n(e)
    })
}

function addHiddenValuesForPostConfirm(e, t, n, i) {
    var a = document.getElementById(i);
    $("<input>").attr({
        type: "hidden",
        id: "FIELD_POSTCONFIRM_ACTION",
        name: "FIELD_POSTCONFIRM_ACTION",
        value: e
    }).appendTo(a), $("<input>").attr({
        type: "hidden",
        id: "FIELD_POSTCONFIRM_INPUT",
        name: "FIELD_POSTCONFIRM_INPUT",
        value: t
    }).appendTo(a), $("<input>").attr({
        type: "hidden",
        name: "FIELD_POSTCONFIRM_CALLBACK_FUNCTION",
        id: "FIELD_POSTCONFIRM_CALLBACK_FUNCTION",
        value: functionName(n)
    }).appendTo(a), $("<input>").attr({
        type: "hidden",
        id: "FIELD_POSTCONFIRM_FIELD",
        name: "FIELD_POSTCONFIRM_FIELD",
        value: i
    }).appendTo(a)
}

function functionName(e) {
    var t = e.toString();
    return t = (t = t.substr("function ".length)).substr(0, t.indexOf("("))
}

function submitAjaxForm(i, e, a) {
    if (!(i in ajaxInProgress)) {
        ajaxInProgress[i] = !0;
        var t = buildAJAXUrl(),
            n = "ajaxAction=" + i + "&session-token=" + $("#session-token").val();
        n += formToParameterList(e);
        (new Date).getTime();
        $.ajax({
            url: t,
            type: "POST",
            data: n,
            success: function(e, t, n) {
                delete ajaxInProgress[i], a && a(e), currentFocus = ajaxFocus
            },
            error: function(e, t, n) {
                delete ajaxInProgress[i], currentFocus = ajaxFocus
            },
            dataFilter: function(e, t) {
                return new ajaxResponse($.parseXML(e))
            }
        })
    }
}

function formToParameterList(e) {
    for (var t = $("#" + e + " :input"), n = "", i = 0; i < t.length; i++) switch (t[i].type) {
        case "button":
            break;
        case "checkbox":
        case "radio":
            t[i].checked && (n = n + "&" + t[i].name + "=" + t[i].value);
            break;
        default:
            n = n + "&" + t[i].name + "=" + encodeURIComponent(t[i].value)
    }
    return n
}

function submitAjaxSubscriptionForm(e, t, n) {
    var i = "&objectUID=" + e + "&subscriptionType=" + t + "&value=" + n + "&session-token=" + $("#session-token").val();
    $.ajax({
        url: "subscriptions.ajax",
        type: "POST",
        data: i
    })
}

function submitAjaxPredefinedForm(e, t, i, a, o) {
    var n = buildAJAXUrl(),
        r = t + "&ajaxAction=" + e + "&session-token=" + $("#session-token").val();
    $.ajax({
        url: n,
        type: "POST",
        data: r,
        success: function(e, t, n) {
            i && i(e, o)
        },
        dataFilter: function(e, t) {
            return new ajaxResponse($.parseXML(e))
        },
        error: function(e, t, n) {
            console.error(n), a && a(e, t, n, o)
        }
    })
}

function submitAjaxPredefinedFormJSON(e, t, i, a) {
    var n = buildAJAXUrl(),
        o = t + "&ajaxAction=" + e + "&session-token=" + $("#session-token").val();
    $.ajax({
        url: n,
        type: "POST",
        data: o,
        dataType: "json",
        success: function(e, t, n) {
            i && i(e)
        },
        error: function(e, t, n) {
            console.error(n), a && a(e, t, n)
        }
    })
}

function buildAJAXUrl(e, t, n) {
    var i = window.location.href;
    return -1 != i.indexOf("/legacy") && (i = i.replace("/legacy", "")), i = -1 != i.indexOf(".html") ? i.replace(".html", ".ajax") : "index.ajax"
}

function buildAJAXSafeUrl() {
    var e = buildAJAXUrl();
    return e += "&session-token=" + $("#session-token").val()
}

function isSet(e) {
    return null != e
}

function defaultsWrite(e, t) {
    var n = "&key=" + e + "&value=" + t + "&session-token=" + $("#session-token").val();
    $.ajax({
        url: "defaultsWrite.ajax",
        type: "POST",
        data: n
    })
}

function reloadPage() {
    var e = window.location.href;
    window.location = e
}

function mobileNavigationChange() {
    elem = document.getElementById("mobile-nav-choice"), window.location = elem.value
}
$(document).on("change", ".dataTables_length select", function() {
    defaultsWrite("resultsPerPage", this.value)
});
var addedListenersAlready = !1;

function addListenersToFields() {
    addedListenersAlready || ($(document).on("focus", "input, select, textarea, search", function() {
        $(this).is(":visible") && (currentFocus = this)
    }), $(document).on("blur", "input, select, textarea, search", function() {
        currentFocus = null
    }), addedListenersAlready = !0)
}

function setCurrentFocus(e) {
    currentFocus = e
}

function parseArray(e, t, n) {
    null == n && (n = function(e) {
        return e
    });
    for (var i = new Array, a = 0; a < e.getElementsByTagName(t).length; a++) null != e.getElementsByTagName(t)[a].childNodes[0] ? i[a] = n(e.getElementsByTagName(t)[a].childNodes[0].nodeValue) : i[a] = "";
    return i
}

function parseUsers(e, t) {
    t = void 0 !== t ? t : "user";
    for (var n = e.responseXML.getElementsByTagName(t), i = new Array, a = 0; a < n.length; a++) {
        var o = new Object;
        null != n[a].getElementsByTagName("FIELD_UID")[0].childNodes[0] ? o.uid = n[a].getElementsByTagName("FIELD_UID")[0].childNodes[0].nodeValue : o.uid = "", null != n[a].getElementsByTagName("FIELD_USERNAME")[0].childNodes[0] ? o.username = n[a].getElementsByTagName("FIELD_USERNAME")[0].childNodes[0].nodeValue : o.username = "", null != n[a].getElementsByTagName("FIELD_REAL_NAME")[0].childNodes[0] ? o.fullname = n[a].getElementsByTagName("FIELD_REAL_NAME")[0].childNodes[0].nodeValue : o.fullname = "", null != n[a].getElementsByTagName("FIELD_EMAIL_ADDRESS")[0].childNodes[0] ? o.email = n[a].getElementsByTagName("FIELD_EMAIL_ADDRESS")[0].childNodes[0].nodeValue : o.email = "", null != n[a].getElementsByTagName("FIELD_PHONE")[0].childNodes[0] ? o.phone = n[a].getElementsByTagName("FIELD_PHONE")[0].childNodes[0].nodeValue : o.phone = "", null != n[a].getElementsByTagName("FIELD_POSITION")[0].childNodes[0] ? o.position = n[a].getElementsByTagName("FIELD_POSITION")[0].childNodes[0].nodeValue : o.position = "", null != n[a].getElementsByTagName("FIELD_LDAP_SERVER_ID")[0].childNodes[0] ? o.ldapServerID = n[a].getElementsByTagName("FIELD_LDAP_SERVER_ID")[0].childNodes[0].nodeValue : o.ldapServerID = "", n[a].getElementsByTagName("FIELD_BUILDING")[0] && (null != n[a].getElementsByTagName("FIELD_BUILDING")[0].childNodes[0] ? o.building = n[a].getElementsByTagName("FIELD_BUILDING")[0].childNodes[0].nodeValue : o.building = "", null != n[a].getElementsByTagName("FIELD_DEPARTMENT")[0].childNodes[0] ? o.department = n[a].getElementsByTagName("FIELD_DEPARTMENT")[0].childNodes[0].nodeValue : o.department = "", null != n[a].getElementsByTagName("FIELD_ROOM")[0].childNodes[0] ? o.room = n[a].getElementsByTagName("FIELD_ROOM")[0].childNodes[0].nodeValue : o.room = "", null != n[a].getElementsByTagName("FIELD_BUILDING_ID")[0].childNodes[0] ? o.buildingID = n[a].getElementsByTagName("FIELD_BUILDING_ID")[0].childNodes[0].nodeValue : o.buildingID = "", null != n[a].getElementsByTagName("FIELD_DEPARTMENT_ID")[0].childNodes[0] ? o.departmentID = n[a].getElementsByTagName("FIELD_DEPARTMENT_ID")[0].childNodes[0].nodeValue : o.departmentID = "", null != n[a].getElementsByTagName("FIELD_LDAP_SERVER_ID")[0].childNodes[0] ? o.ldapServerID = n[a].getElementsByTagName("FIELD_LDAP_SERVER_ID")[0].childNodes[0].nodeValue : o.ldapServerID = ""), i[a] = o
    }
    return i
}

function parseComputerLocations(e) {
    for (var t = e.responseXML.getElementsByTagName("computer"), n = new Array, i = 0; i < t.length; i++) {
        var a = new Object;
        null != t[i].getElementsByTagName("FIELD_JSS_ID")[0].childNodes[0] ? a.id = t[i].getElementsByTagName("FIELD_JSS_ID")[0].childNodes[0].nodeValue : a.id = "", null != t[i].getElementsByTagName("FIELD_COMPUTER_NAME")[0].childNodes[0] ? a.name = t[i].getElementsByTagName("FIELD_COMPUTER_NAME")[0].childNodes[0].nodeValue : a.name = "", null != t[i].getElementsByTagName("FIELD_USERNAME")[0].childNodes[0] ? a.username = t[i].getElementsByTagName("FIELD_USERNAME")[0].childNodes[0].nodeValue : a.username = "", null != t[i].getElementsByTagName("FIELD_REAL_NAME")[0].childNodes[0] ? a.fullname = t[i].getElementsByTagName("FIELD_REAL_NAME")[0].childNodes[0].nodeValue : a.fullname = "", null != t[i].getElementsByTagName("FIELD_EMAIL_ADDRESS")[0].childNodes[0] ? a.email = t[i].getElementsByTagName("FIELD_EMAIL_ADDRESS")[0].childNodes[0].nodeValue : a.email = "", null != t[i].getElementsByTagName("FIELD_PHONE")[0].childNodes[0] ? a.phone = t[i].getElementsByTagName("FIELD_PHONE")[0].childNodes[0].nodeValue : a.phone = "", t[i].getElementsByTagName("FIELD_BUILDING")[0].childNodes[0], a.building = "", t[i].getElementsByTagName("FIELD_DEPARTMENT")[0].childNodes[0], a.department = "", null != t[i].getElementsByTagName("FIELD_ROOM")[0].childNodes[0] ? a.room = t[i].getElementsByTagName("FIELD_ROOM")[0].childNodes[0].nodeValue : a.room = "", null != t[i].getElementsByTagName("FIELD_POSITION")[0].childNodes[0] ? a.position = t[i].getElementsByTagName("FIELD_POSITION")[0].childNodes[0].nodeValue : a.position = "", null != t[i].getElementsByTagName("FIELD_BUILDING_ID")[0].childNodes[0] ? a.buildingID = t[i].getElementsByTagName("FIELD_BUILDING_ID")[0].childNodes[0].nodeValue : a.buildingID = "", null != t[i].getElementsByTagName("FIELD_DEPARTMENT_ID")[0].childNodes[0] ? a.departmentID = t[i].getElementsByTagName("FIELD_DEPARTMENT_ID")[0].childNodes[0].nodeValue : a.departmentID = "", null != t[i].getElementsByTagName("FIELD_LDAP_SERVER_ID")[0].childNodes[0] ? a.ldapServerID = t[i].getElementsByTagName("FIELD_LDAP_SERVER_ID")[0].childNodes[0].nodeValue : a.ldapServerID = "", null != t[i].getElementsByTagName("FIELD_UID")[0].childNodes[0] ? a.uid = t[i].getElementsByTagName("FIELD_UID")[0].childNodes[0].nodeValue : a.uid = "", n[i] = a
    }
    return n
}

function clearDiv(e) {
    document.getElementById(e).innerHTML = ""
}

function createTable(e, t, n) {
    var i = "";
    i = (i += '<div class="table-wrapper">') + '<table id="' + t + '" class="jamf-inner-list jamf-inner-list-payload full-width">', i += "<thead>", i += "<tr>";
    for (var a = 0; a < n.length; a++) i = i + "<th>" + n[a] + "</th>";
    i += "</tr>", i += "<style>", i += "\x3c!-- ", i += "@media (max-width: 600px) { ";
    for (a = 0; a < n.length; a++) i = i + "table." + t + " td:nth-of-type(" + (a + 1) + '):before { content: "' + n[a] + '";}';
    i += "}", i += "--\x3e ", i += "</style>", i += "</thead>", i += "<tbody>", i += "</tbody>", i += "</table>", i += "</div>", document.getElementById(e).innerHTML = i
}

function emitSubmitEvent(e) {
    var t;
    if (e && (document.forms[e] && (t = document.forms[e]), ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (t = e), t)) {
        var n = document.createEvent("Event");
        n.initEvent("jamfSubmit", !0, !0), t.dispatchEvent(n)
    }
}

function checkSuppressSubmit(e, t) {
    if ("Done" !== t) {
        var n = document.activeElement.hasAttribute("suppress-submit") && !$(".jamf-assistant")[0],
            i = $(document.activeElement).closest(".jamf-form-item").find("button[submit-button]");
        n ? i.click() : e && a()
    } else a();

    function a() {
        ["download", "trust profile"].some(function(e) {
            return 0 <= t.toLowerCase().indexOf(e)
        }) || emitSubmitEvent("f"), $(document.activeElement).blur(), document.f.submit()
    }
}

function submitForm(e, t, n, i, a) {
    var o = document.getElementById("f"),
        r = $(o).children("input[name='action']")[0];
    null != r && o.removeChild(r);
    var s = document.createElement("input");
    if (s.setAttribute("type", "hidden"), s.setAttribute("name", "action"), s.setAttribute("value", e), o.appendChild(s), null != n) {
        var l = document.createElement("input");
        l.setAttribute("type", "hidden"), l.setAttribute("name", t), l.setAttribute("value", n), o.appendChild(l)
    }
    null != a && ((l = document.createElement("input")).setAttribute("type", "hidden"), l.setAttribute("name", i), l.setAttribute("value", a), o.appendChild(l)), checkSuppressSubmit(!0, e)
}

function submitAlternateEdit(e, t) {
    var n = $.extend({}, {
            target: {
                tab: null,
                sidetab: null
            },
            return: {
                tab: null,
                sidetab: null
            }
        }, t),
        i = $("#f");
    i.addHiddenFormInput = function(e, t) {
        if (null != t) {
            var n = $("<input>").attr("type", "hidden").attr("name", e).val(t);
            this.append($(n))
        }
    }, $(i).children("input[name='action']").remove(), i.addHiddenFormInput("action", "ACTION_ALTERNATE_EDIT"), i.addHiddenFormInput("ALTERNATE_EDIT_UID", e), i.addHiddenFormInput("ALTERNATE_EDIT_TAB", n.target.tab), i.addHiddenFormInput("ALTERNATE_EDIT_SIDE_TAB", n.target.sidetab), i.addHiddenFormInput("ALTERNATE_EDIT_TAB_RETURN", n.return.tab), i.addHiddenFormInput("ALTERNATE_EDIT_SIDE_TAB_RETURN", n.return.sidetab), emitSubmitEvent("f"), i.submit()
}

function submitFormAsIs() {
    var e = $("#f");
    $(e).find("input[name='action']").remove();
    var t = $("<input>").attr("type", "hidden").attr("name", "action").val("nothing");
    if (e.append($(t)), null != currentFocus) {
        var n = $("<input>").attr("type", "hidden").attr("name", "focus").val(currentFocus.id);
        e.append($(n))
    }
    emitSubmitEvent("f"), e.submit()
}

function submitReportForm(e, t, n) {
    var i = document.getElementById("f"),
        a = $(i).children("input[name='action']")[0];
    null != a && i.removeChild(a);
    var o = document.createElement("input");
    if (o.setAttribute("type", "hidden"), o.setAttribute("name", "action"), o.setAttribute("value", e), i.appendChild(o), null != n) {
        var r = $(i).children("input[name='" + t + "']")[0];
        null != r && i.removeChild(r);
        var s = document.createElement("input");
        s.setAttribute("type", "hidden"), s.setAttribute("name", t), s.setAttribute("value", n), i.appendChild(s)
    }
    emitSubmitEvent("f"), document.f.submit()
}

function addChoiceToSelect(e, t, n) {
    var i = document.getElementById(e);
    i[i.length] = new Option(n, t)
}

function addSelectedChoiceToSelect(e, t, n, i) {
    var a = document.getElementById(e),
        o = new Option(n, t);
    a[a.length] = o, i && o.setAttribute("selected", "selected")
}

function deleteChoicesFromSelect(e) {
    $("#" + e).find("option").remove()
}

function deleteRowsFromTable(e) {
    $("#" + e).find("tr:gt(0)").remove()
}

function deleteRowFromTable(e, t) {
    $("#" + e)[0].deleteRow(t)
}

function addRowToTable(e, t, n, i, a) {
    var o = document.getElementById(e),
        r = document.getElementById(t);
    if (!r || !r.length) {
        var s = document.createElement("tr"),
            l = "";
        a && (s.style.display = "none"), s.setAttribute("id", t), s.setAttribute("ng-non-bindable", ""), i && (l += i), "-1" == t.slice(-2) && (l += " not-saved-yet"), s.setAttribute("class", l);
        var u = o.getElementsByTagName("tbody")[0];
        u || (o.appendChild(document.createElement("tbody")), u = o.getElementsByTagName("tbody")[0]), $(u).append(s);
        for (var d = 0; d < n.length; d++) {
            var c = document.createElement("td"),
                f = n[d];
            if ("boolean" == typeof f) {
                var m = document.createElement("input");
                m.setAttribute("type", "checkbox"), m.setAttribute("disabled", "true"), f && m.setAttribute("checked", "checked"), c.appendChild(m)
            } else c.appendChild(document.createTextNode(f));
            s.appendChild(c)
        }
        return s
    }
}

function addRowToTablePreformatted(e, t, n, i) {
    var a = document.getElementById(e),
        o = document.createElement("tr");
    o.setAttribute("id", t), o.setAttribute("ng-non-bindable", ""), i && o.setAttribute("class", i);
    var r = a.getElementsByTagName("tbody")[0];
    r ? r.appendChild(o) : a.appendChild(o);
    for (var s = 0; s < n.length; s++) {
        var l = document.createElement("td");
        l.appendChild(n[s]), o.appendChild(l)
    }
}

function addFirstRowToTable(e, t, n, i) {
    var a = document.getElementById(e),
        o = document.createElement("tr");
    o.setAttribute("id", t), i && o.setAttribute("class", i);
    var r = a.getElementsByTagName("tbody")[0];
    r ? r.insertBefore(o, r.childNodes[0]) : a.insertBefore(o, a.childNodes[0]);
    for (var s = 0; s < n.length; s++) {
        var l = document.createElement("td");
        l.appendChild(document.createTextNode(n[s])), o.appendChild(l)
    }
}

function addSelectToTable(e, t, n, i, a, o, r) {
    var s = document.createElement("div");
    s.setAttribute("class", "jamf-select-wrapper");
    var l = document.createElement("select");
    l.setAttribute("name", n), l.setAttribute("id", i), l.setAttribute("class", "jamf-select");
    for (var u = 0; u < a.length; u++) {
        var d = document.createElement("option");
        d.setAttribute("value", a[u]), d.text = o[u], l.appendChild(d), r && r == a[u] && (l.selectedIndex = u)
    }
    s.appendChild(l), $("#" + e + " td:nth-of-type(" + t + ")").html(s), addListenersToFields()
}

function addCheckboxToTD(e, t, n, i, a, o) {
    var r = document.createElement("input");
    r.setAttribute("name", n), r.setAttribute("id", i), r.setAttribute("type", "checkbox"), "true" == o && r.setAttribute("disabled", "true"), "" != a && r.setAttribute("checked", "checked"), $("#" + e + " td:nth-of-type(" + t + ")").html(r)
}

function addSelectWithDisableToTable(e, t, n, i, a, o, r, s) {
    var l = document.createElement("div");
    l.setAttribute("class", "jamf-select-wrapper");
    var u = document.createElement("select");
    u.setAttribute("name", n), u.setAttribute("id", i), "true" == s && checkbox.setAttribute("disabled", "true");
    for (var d = 0; d < a.length; d++) {
        var c = document.createElement("option");
        c.setAttribute("value", a[d]), c.text = o[d], u.appendChild(c), r && r == a[d] && (u.selectedIndex = d)
    }
    l.appendChild(u), $("#" + e + " td:nth-of-type(" + t + ")").html(l), addListenersToFields()
}

function addSelectToTableWithOnChange(e, t, n, i, a, o, r, s) {
    var l = document.createElement("div");
    l.setAttribute("class", "jamf-select-wrapper");
    var u = document.createElement("select");
    u.setAttribute("name", n), u.setAttribute("id", i), u.setAttribute("onchange", "javascript:" + s), u.classList.add("jamf-select");
    for (var d = 0; d < a.length; d++) {
        var c = document.createElement("option");
        c.setAttribute("value", a[d]), c.text = o[d], u.appendChild(c), r && r == a[d] && (u.selectedIndex = d)
    }
    l.appendChild(u), $("#" + e + " td:nth-of-type(" + t + ")").html(l)
}

function addButtonToLastTD(e, t, n, i) {
    var a = document.createElement("input");
    i ? a.setAttribute("class", i + " jamf-button jamf-button-table") : a.setAttribute("class", "jamf-button jamf-button-table"), a.setAttribute("type", "button"), a.setAttribute("value", t), a.setAttribute("onclick", "javascript:" + n), $("#" + e + " td:last").html(a)
}

function addButtonToTD(e, t, n, i, a) {
    var o = document.createElement("input");
    a ? o.setAttribute("class", a + " jamf-button jamf-button-table") : o.setAttribute("class", "jamf-button jamf-button-table"), o.setAttribute("type", "button"), o.setAttribute("value", n), o.setAttribute("onclick", "javascript:" + i), $("#" + e + " td:nth-of-type(" + t + ")").html(o)
}

function addTextInputToTDWithChooseCriteria(e, t, n, i, a, o) {
    var r = document.createElement("input");
    r.setAttribute("style", "float:left;margin-right: 6px;\t"), r.setAttribute("type", "text"), r.setAttribute("style", "margin:0 15px 0 0"), r.setAttribute("name", n), r.setAttribute("id", i), r.setAttribute("value", a), $("#" + e + " td:nth-of-type(" + t + ")").html(r).addClass("flex-cell"), addListenersToFields(), r.focus(), currentFocus = r;
    var s = document.createElement("a");
    s.setAttribute("href", "javascript:" + o), s.setAttribute("style", "min-width:24px"), s.setAttribute("class", "jamf-button small icon-only icon-more-circles-horizontal"), $("#" + e + " td:nth-of-type(" + t + ")").append(s)
}

function addEllipsisToTD(e, t, n, i, a) {
    var o = document.createElement("a");
    o.setAttribute("href", "javascript:" + i + "('" + a + "')"), o.setAttribute("class", "jamf-button small icon-only icon-more-circles-horizontal"), $("#" + e + " td:nth-of-type(" + t + ")").html(o)
}

function addTextInputToTD(e, t, n, i, a, o, r, s) {
    var l = document.createElement("input");
    l.setAttribute("type", "text"), l.setAttribute("name", n), l.setAttribute("id", i), l.setAttribute("class", "jamf-input-text"), l.setAttribute("value", a), o && l.setAttribute("onchange", "javascript:" + o), l.setAttribute("placeholder", void 0 === s ? "" : s), $("#" + e + " td:nth-of-type(" + t + ")").html(l), addListenersToFields(), void 0 === r && (r = !0), r && (l.focus(), currentFocus = l)
}

function addHiddenFieldToTD(e, t, n) {
    var i = document.createElement("input");
    i.setAttribute("type", "hidden"), i.setAttribute("name", t), i.setAttribute("id", t), i.setAttribute("value", n), $("#" + e + " td:first").append(i)
}

function addHiddenFieldToTDWithID(e, t, n, i) {
    var a = document.createElement("input");
    a.setAttribute("type", "hidden"), a.setAttribute("name", t), a.setAttribute("id", n), a.setAttribute("value", i), $("#" + e + " td:first").append(a)
}

function addReorderToTD(e, t, n, o, r, s, l, i, a, u) {
    function d(e) {
        var t = "Up" == e ? s : l,
            n = "ui/images/navigation/Move" + e + ".png",
            i = $("<img>").attr("src", n).addClass("re-order").toggleClass("disabled", t),
            a = $("<a>").append(i);
        return t || a.attr("href", "javascript:" + o + "('" + e + "','" + r + c + f + m + "')"), a
    }
    var c = "",
        f = "",
        m = "";
    void 0 !== i && (c = "','" + i), void 0 !== a && (f = "','" + a), void 0 !== u && (m = "','" + u);
    var p = $("<div>").append(d("Up")).append(d("Down"));
    $("#" + e).find("td:nth-of-type(" + t + ")").html(p)
}

function getScriptTypeForAce(e) {
    for (var t = [
            ["#!/bin/sh", "sh"],
            ["#!/bin/bash", "sh"],
            ["#!/bin/csh", "sh"],
            ["#!/usr/bin/perl", "perl"],
            ["#!/usr/bin/python", "python"]
        ], n = 0; n < t.length; n++)
        if (0 == e.indexOf(t[n][0])) return t[n][1];
    return "text"
}

function drawGreyChart(e) {
    e.Set("chart.colors", ["Gradient(#939598:#939598:#939598:#808285)"]), drawPieChart(e)
}

function drawRGYChart(e) {
    e.Set("chart.colors", ["Gradient(#67AE3E:#67AE3E:#67AE3E:#5CA038)", "Gradient(#FFD400:#FFD400:#FFD400:#E9C103)", "Gradient(#B8292F:#B8292F:#B8292F:#B8292F)", "Gradient(#FF9900:#FF9900:#FF9900:#FF9900)"]), drawPieChart(e)
}

function drawSevenColorChart(e) {
    e.Set("chart.colors", ["Gradient(#11274A:#11274A:#11274A:#0B2042)", "Gradient(#2E5AA0:#2E5AA0:#2E5AA0:#2A5393)", "Gradient(#88B2DF:#88B2DF:#88B2DF:#7DA9DA)", "Gradient(#CCDBF1:#CCDBF1:#CCDBF1:#B5D0ED)", "Gradient(#5CA038:#5CA038:#5CA038:#539333)", "Gradient(#9BC55D:#9BC55D:#9BC55D:#89B951)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)", "Gradient(#CFE5AE:#CFE5AE:#CFE5AE:#B8DA92)"]), drawPieChart(e)
}

function drawPieChart(e) {
    e.Set("chart.strokestyle", "transparent"), e.Set("chart.shadow", !1), e.Draw()
}
$(function() {
    var t;
    !$(".scrollbox-side").length || $(document).on("keydown", function(e) {
        13 !== e.keyCode || "INPUT" !== (t = document.activeElement.nodeName) && "SELECT" !== t || e.preventDefault()
    })
});
var fileTypePackage = 0,
    fileTypeEbook = 1,
    fileTypeMDApp = 2,
    fileTypeScript = 3;

function fileExists(e, t) {
    var n = new XMLHttpRequest,
        i = "fileExists?name=" + e + "&fileType=" + t;
    return n.open("GET", i, !1), n.send(), "true" == n.responseXML.getElementsByTagName("exists")[0].firstChild.nodeValue
}

function addWarningToField(e, t) {
    var n = $("#" + e.id + "Warning");
    $(n).is(":visible") && removeWarningFromField(e), $(n).html(t), 0 < t.length && "undefined" != t && "null" != t && $(n).show()
}

function removeWarningFromField(e) {
    $("#" + e.id + "Warning").hide()
}

function formatDashboardWidget(e) {
    var t = $("#" + e),
        n = t.find("div.dashboard-object-link"),
        i = Math.max.apply(Math, n.map(function() {
            return $(this).height()
        }));
    i < 32 && (i = 32), n.height(i), t.find("li.empty-widget").height(t.find("li").height())
}

function htmlEscape(e) {
    return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function handleMetric(e, t, n) {
    var i, a = n[t];
    if (isSet(a)) {
        var o = "";
        o = a.linkURI ? '<a href="' + a.linkURI + '">' + a.displayValue + "</a>" : a.displayValue, $("#" + e + "_" + t).html("<span>" + t + ": " + o), i = a.value
    } else console.error("metric" + t + " not found"), i = -1;
    return i
}

function dismissNotification(e) {
    if (confirm("Are you sure you want to dismiss this notification?\nThis action is permanent and cannot be undone")) {
        var t = {
            notificationId: e,
            action: "delete",
            "session-token": $("#session-token").val()
        };
        $.ajax({
            method: "POST",
            url: "deleteNotification.ajax",
            data: t
        }).done(function() {
            parent.window.location.reload()
        }).fail(function(e, t, n) {
            console.error(n)
        })
    }
}

function promptSaveVerification(e, t) {
    $("#saveVerificationHeaderSpan").text(e), $("#saveVerificationContentSpan").text(t), $("#saveVerificationOverlayWindow").show()
}

function cancelSaveVerification() {
    $("#FIELD_CONFIRM_SUBMIT").val("false"), $("#saveVerificationOverlayWindow").hide()
}

function acceptSaveVerification() {
    $("#FIELD_CONFIRM_SUBMIT").val("true")
}

function setSessionExpirationTimestamp(e) {}

function changeElementStyle(e, t, n) {
    if (e && t) {
        var i = document.getElementById(e);
        i && (i.style[t] = n)
    }
}

function clearSystemInfoCache() {
    return window.parent.angular.element("head").injector().get("systemInfo").clearInfo(), !0
}

function updateAuth() {
    return window.parent.postMessage({
        id: "hello-from-the-iframe",
        payload: {
            type: "refresh-auth"
        }
    }, window.location.origin), !0
}

function fixScrollOnClass(e, o) {
    var r, n = document.querySelectorAll("." + e),
        s = document.documentElement;
    n && n.length && o && (r = e, document.documentElement.addEventListener("touchmove", function(e) {
        if (s.classList && s.classList.contains(o)) {
            for (var t = e.target || e.srcElement, n = this.className ? this.className.toString() : "", i = t.className.toString(), a = !1; null !== t;) {
                if (t.classList && t.classList.contains(r)) {
                    a = !0;
                    break
                }
                t = t.parentNode
            }
            if (a) return;
            if (n !== r && i !== r) return e.stopPropagation(), e.preventDefault(), !1
        }
    }), function() {
        for (var e = n, t = 0; t < e.length; t++) {
            e[t].addEventListener("touchstart", function() {
                if (s.classList && s.classList.contains(o)) {
                    var e = this.scrollTop,
                        t = this.scrollHeight,
                        n = e + this.offsetHeight;
                    0 === e ? this.scrollTop = 1 : n === t && (this.scrollTop = e - 1)
                }
            })
        }
    }())
}
$.fn.dataTableExt && ($.fn.dataTable.ext.order["dom-checkbox"] = function(e, t) {
    return this.api().column(t, {
        order: "index"
    }).nodes().map(function(e, t) {
        return $("input", e).prop("checked") ? "1" : "0"
    })
}, $.fn.dataTableExt.oApi.fnGetSelectedRows = function() {
    return this.$("input:checked").toArray().map(function(e) {
        return e.value
    })
}), $(function() {
    setTimeout(function() {
        for (var e = document.getElementsByClassName("dataTable"), t = 0; t < e.length; t++) {
            var n = e[t];
            if (null != n && null != document.getElementById(n.id + "_filter")) {
                var i = document.getElementById(n.id + "_filter").getElementsByTagName("input")[0];
                if (null != i) {
                    i.type = "text", i.placeholder || (i.placeholder = "Filter Results"), i.value && (i.className = "show-close");
                    var a = document.createElement("Button");
                    a.setAttribute("type", "button"), a.className = "jamf-button icon-only small icon-close", a.addEventListener("click", function() {
                        i.value = "", i.className = "", $("#" + n.id).DataTable().search("").draw(), i.focus()
                    }), i.addEventListener("keyup", function() {
                        i.value ? i.className = "show-close" : i.className = ""
                    }), i.parentNode.insertBefore(a, i.nextSibling)
                }
            }
        }
    }, 250)
}), document.addEventListener("angularReady", function() {
    setTimeout(function() {
        fixScrollOnClass("actionsheet_scrollable", "actionsheet_opened")
    }, 0)
});
var AngularServices = new function() {
        this.injector = !1, this.Modal = new function() {
            this.OpenById = function(e) {
                e && (AngularServices.injector || (AngularServices.injector = angular.element(document).injector()), setTimeout(function() {
                    AngularServices.injector.get("jamfModalService").openModalById(e)
                }, 0))
            }, this.CloseById = function(e) {
                e && (AngularServices.injector || (AngularServices.injector = angular.element(document).injector()), setTimeout(function() {
                    AngularServices.injector.get("jamfModalService").closeModalById(e)
                }, 0))
            }
        }, this.Translate = new function() {
            this.Instant = function() {
                var e = getAngularServiceFromParent("$translate");
                return e.instant.apply(e, arguments)
            }
        }, this.Common = new function() {
            this.CloseAll = function() {
                AngularServices.injector || (AngularServices.injector = angular.element(document).injector()), AngularServices.injector.get("jamfCommonService").closeAllActiveElements()
            }
        }, this.BreadcrumbsService = new function() {
            this.Items = function() {
                return AngularServices.injector || (AngularServices.injector = angular.element(document).injector()), AngularServices.injector.get("breadcrumbItemsService").items
            }
        }, this.InteractionService = new function() {
            this.Init = function() {
                return AngularServices.injector || (AngularServices.injector = angular.element(document).injector()), AngularServices.injector.get("interactionService")
            }, this.Publish = function(e, t, n, i) {
                e && t && (AngularServices.injector || (AngularServices.injector = angular.element(document).injector()), setTimeout(function() {
                    AngularServices.injector.get("interactionService").publish(e, t, n, i)
                }, 0))
            }
        }, this.SafeTranslate = new function() {
            this.Instant = function() {
                var e = getAngularServiceFromParent("safeTranslate");
                return e.instant.apply(e, arguments)
            }
        }
    },
    AngularUtilities = new function() {
        this.injector = !1, this.Location = new function() {
            this.Go = function(e, t) {
                AngularUtilities.injector || (AngularUtilities.injector = angular.element(document).injector());
                var n = AngularUtilities.injector.get("$timeout"),
                    i = AngularUtilities.injector.get("$location"),
                    a = t || {};
                if ("string" == typeof a) try {
                    a = JSON.parse(a)
                } catch (e) {
                    a = {}
                }
                n(function() {
                    i.path(e).search(a)
                })
            }, this.Reload = function() {
                emitSubmitEvent("f"), window.parent.window.document.getElementsByTagName("iframe")[0].contentWindow.document.location.reload()
            }
        }
    };

function changeTabNoHistory(e, t) {
    getAngularServiceFromParent("$state").go(e, t, {
        location: "replace"
    })
}

function isIeOrEdge() {
    var e = window.navigator.userAgent;
    return -1 < e.indexOf("MSIE ") || -1 < e.indexOf("Trident/") || -1 < e.indexOf("Edge/")
}

function makeSafeForCSS(e, n) {
    return e.replace(/[^a-z0-9]/g, function(e) {
        var t = e.charCodeAt(0);
        if (32 == t) return "-";
        if (n) {
            if (65 <= t && t <= 90) return "_" + e.toLowerCase()
        } else if (65 <= t && t <= 90) return e.toLowerCase();
        return "__" + ("000" + t.toString(16)).slice(-4)
    })
}

function windowTopLocation(e, t) {
    if (e)
        if (window.self !== window.top) window.parent.windowTopLocation(e, t);
        else {
            var n = e.split("?");
            if (!t && 1 < n.length && n[1].length) try {
                e = n[0], t = JSON.parse('{"' + decodeURI(n[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
            } catch (e) {}
            AngularUtilities.Location.Go(e, t)
        }
}

function listenForUpload() {
    document.addEventListener("finishedUploading", function() {
        document.location.reload()
    })
}

function optionalInputFields() {
    function d(e) {
        var t = $(e).is(":checked"),
            n = $(e).closest(".optional-cp-input-group").find(".jamf-form-item");
        t ? (n.removeClass("disabled"), n.find("input").each(function(e, t) {
            $(t).removeClass("disabled"), $(t).removeAttr("disabled")
        })) : (n.addClass("disabled"), n.find("input").each(function(e, t) {
            $(t).hasClass("optional-cp-input-group") || ($(t).addClass("disabled"), $(t).attr("disabled", "disabled"))
        }))
    }
    $("div.optional-cp-input-group").each(function(e, t) {
        var n = $(t),
            i = n.data("display"),
            a = n.data("enabled"),
            o = n.data("name");
        if (i)
            if (!0 === document.enableOptionalInputGroups) {
                var r = $("<div></div>");
                r.addClass("optional-cp-input-group-wrapper"), r.addClass("jamf-switch");
                var s = $('<input type="checkbox" />');
                s.attr("name", o), s.attr("id", o), s.val("true"), a && s.attr("checked", "checked"), s.change(function() {
                    d(s)
                });
                var l = $("<label></label>");
                l.attr("for", o), r.append(s), r.append(l), n.append(r), d(s)
            } else {
                var u = $('<input type="hidden" />');
                u.attr("name", o), u.attr("id", o), u.val("true"), n.parent().append(u)
            }
    })
}

function getAngularServiceFromParent(e) {
    return window.parent.angular.element(window.parent.document).injector().get(e)
}

function xmlToJson(e) {
    var t = {};
    if (1 == e.nodeType) {
        if (0 < e.attributes.length) {
            t["@attributes"] = {};
            for (var n = 0; n < e.attributes.length; n++) {
                var i = e.attributes.item(n);
                t["@attributes"][i.nodeName] = i.nodeValue
            }
        }
    } else 3 == e.nodeType && (t = e.nodeValue);
    if (e.hasChildNodes())
        for (var a = 0; a < e.childNodes.length; a++) {
            var o = e.childNodes.item(a),
                r = o.nodeName;
            if (void 0 === t[r]) t[r] = xmlToJson(o);
            else {
                if (void 0 === t[r].push) {
                    var s = t[r];
                    t[r] = [], t[r].push(s)
                }
                t[r].push(xmlToJson(o))
            }
        }
    return t
}

function PrestageSkipSteps(e, t) {
    var n, i;
    this.attachEvents = function(e, t) {
        (n = $("#" + e)).click(a), (i = $("." + t + " :checkbox").not("." + t + " :checkbox[disabled]")).change(o), o()
    };
    var a = function() {
            r(function() {
                i.prop("checked", !0), n.val(t)
            }, function() {
                i.prop("checked", !1), n.val(e)
            })
        },
        o = function() {
            r(function() {
                n.val(e)
            }, function() {
                n.val(t)
            })
        },
        r = function(e, t) {
            s() ? e() : t()
        },
        s = function() {
            return 0 < $(i).not(":checked").length
        }
}

function versionCompare(e, t, n) {
    var i = n && n.lexicographical,
        a = n && n.zeroExtend,
        o = e.split("."),
        r = t.split(".");

    function s(e) {
        return (i ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(e)
    }
    if (!o.every(s) || !r.every(s)) return NaN;
    if (a) {
        for (; o.length < r.length;) o.push("0");
        for (; r.length < o.length;) r.push("0")
    }
    i || (o = o.map(Number), r = r.map(Number));
    for (var l = 0; l < o.length; ++l) {
        if (r.length == l) return 1;
        if (o[l] != r[l]) return o[l] > r[l] ? 1 : -1
    }
    return o.length != r.length ? -1 : 0
}
$(document).ready(function() {
        optionalInputFields()
    }),
    function(e, t) {
        jQuery.fn[t] = function(e) {
            return e ? this.bind("resize", function(n, i, a) {
                var o;
                return function() {
                    var e = this,
                        t = arguments;
                    o ? clearTimeout(o) : a && n.apply(e, t), o = setTimeout(function() {
                        a || n.apply(e, t), o = null
                    }, i || 100)
                }
            }(e)) : this.trigger(t)
        }
    }(jQuery, "smartModalResize"),
    function(o) {
        "use strict";
        var t = {
            init: function(e) {
                var t = {
                    top: "auto",
                    left: "auto",
                    autoOpen: !1,
                    overlayOpacity: .5,
                    overlayColor: "#000",
                    overlayClose: !0,
                    overlayParent: "body",
                    closeOnEscape: !0,
                    closeButtonClass: ".close",
                    transitionIn: "",
                    transitionOut: "",
                    onOpen: !1,
                    onClose: !1,
                    zIndex: function() {
                        return (e = Math.max.apply(Math, o.makeArray(o("*").map(function() {
                            return o(this).css("z-index")
                        }).filter(function() {
                            return o.isNumeric(this)
                        }).map(function() {
                            return parseInt(this, 10)
                        })))) === -1 / 0 ? 0 : e + 1;
                        var e
                    },
                    updateZIndexOnOpen: !0,
                    hasVariableWidth: !1
                };
                return e = o.extend(t, e), this.each(function() {
                    var n = e,
                        i = o('<div class="lean-overlay"></div>'),
                        a = o(this);
                    i.css({
                        display: "none",
                        position: "fixed",
                        "z-index": n.updateZIndexOnOpen ? 0 : n.zIndex(),
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                        background: n.overlayColor,
                        opacity: n.overlayOpacity,
                        overflow: "auto"
                    }).appendTo(n.overlayParent), a.css({
                        display: "none",
                        position: "fixed",
                        "z-index": n.updateZIndexOnOpen ? 0 : n.zIndex() + 1,
                        left: -1 < parseInt(n.left, 10) ? n.left + "px" : "50%",
                        top: -1 < parseInt(n.top, 10) ? n.top + "px" : "50%"
                    }), a.bind("openModal", function() {
                        var e = n.updateZIndexOnOpen ? n.zIndex() : parseInt(i.css("z-index"), 10),
                            t = e + 1;
                        "" !== n.transitionIn && "" !== n.transitionOut && a.removeClass(n.transitionOut).addClass(n.transitionIn), a.css({
                            display: "block",
                            "margin-left": (-1 < parseInt(n.left, 10) ? 0 : -a.outerWidth() / 2) + "px",
                            "margin-top": (-1 < parseInt(n.top, 10) ? 0 : -a.outerHeight() / 2) + "px",
                            "z-index": t
                        }), i.css({
                            "z-index": e,
                            display: "block"
                        }), n.onOpen && "function" == typeof n.onOpen && n.onOpen(a[0])
                    }), a.bind("closeModal", function() {
                        "" !== n.transitionIn && "" !== n.transitionOut ? (a.removeClass(n.transitionIn).addClass(n.transitionOut), a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                            a.css("display", "none"), i.css("display", "none")
                        })) : (a.css("display", "none"), i.css("display", "none")), n.onClose && "function" == typeof n.onClose && n.onClose(a[0])
                    }), i.click(function() {
                        n.overlayClose && a.trigger("closeModal")
                    }), o(document).keydown(function(e) {
                        n.closeOnEscape && 27 === e.keyCode && a.trigger("closeModal")
                    }), o(window).smartModalResize(function() {
                        n.hasVariableWidth && a.css({
                            "margin-left": (-1 < parseInt(n.left, 10) ? 0 : -a.outerWidth() / 2) + "px",
                            "margin-top": (-1 < parseInt(n.top, 10) ? 0 : -a.outerHeight() / 2) + "px"
                        })
                    }), a.on("click", n.closeButtonClass, function(e) {
                        a.trigger("closeModal"), e.preventDefault()
                    }), n.autoOpen && a.trigger("openModal")
                })
            }
        };
        o.fn.easyModal = function(e) {
            return t[e] ? t[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void o.error("Method " + e + " does not exist on jQuery.easyModal") : t.init.apply(this, arguments)
        }
    }(jQuery),
    function() {
        "use strict";
        var o = function(e) {
            if (!(this instanceof o)) return new o(e);
            if (this.version = 1, this.support = !("undefined" == typeof File || "undefined" == typeof Blob || "undefined" == typeof FileList || !Blob.prototype.webkitSlice && !Blob.prototype.mozSlice && !Blob.prototype.slice), !this.support) return !1;
            var m = this;
            m.files = [], m.defaults = {
                chunkSize: 1048576,
                forceChunkSize: !1,
                simultaneousUploads: 3,
                fileParameterName: "file",
                throttleProgressCallbacks: .5,
                query: {},
                headers: {},
                preprocess: null,
                method: "multipart",
                prioritizeFirstAndLastChunk: !1,
                target: "/",
                parameterNamespace: "",
                testChunks: !0,
                generateUniqueIdentifier: null,
                maxChunkRetries: void 0,
                chunkRetryInterval: void 0,
                permanentErrors: [400, 404, 415, 500, 501],
                maxFiles: void 0,
                withCredentials: !1,
                xhrTimeout: 0,
                maxFilesErrorCallback: function(e, t) {
                    var n = m.getOpt("maxFiles");
                    alert("Please upload " + n + " file" + (1 === n ? "" : "s") + " at a time.")
                },
                minFileSize: 1,
                minFileSizeErrorCallback: function(e, t) {
                    alert(e.fileName || e.name + " is too small, please upload files larger than " + p.formatSize(m.getOpt("minFileSize")) + ".")
                },
                maxFileSize: void 0,
                maxFileSizeErrorCallback: function(e, t) {
                    alert(e.fileName || e.name + " is too large, please upload files less than " + p.formatSize(m.getOpt("maxFileSize")) + ".")
                },
                fileType: [],
                fileTypeErrorCallback: function(e, t) {
                    alert(e.fileName || e.name + " has type not allowed, please upload files of type " + m.getOpt("fileType") + ".")
                },
                invalidChars: ["/", "?", "<", ">", "\\", ":", "*", "|", '"', "[", "]"],
                invalidCharsErrorCallback: function(e, t) {
                    alert(e.fileName || e.name + ' has illegal characters ( /:?<>\\*|"[] ) and cannot be uploaded.')
                }
            }, m.opts = e || {}, m.getOpt = function(e) {
                var t = this;
                if (e instanceof Array) {
                    var n = {};
                    return p.each(e, function(e) {
                        n[e] = t.getOpt(e)
                    }), n
                }
                if (t instanceof r) {
                    if (void 0 !== t.opts[e]) return t.opts[e];
                    t = t.fileObj
                }
                if (t instanceof h) {
                    if (void 0 !== t.opts[e]) return t.opts[e];
                    t = t.resumableObj
                }
                if (t instanceof o) return void 0 !== t.opts[e] ? t.opts[e] : t.defaults[e]
            }, m.events = [], m.on = function(e, t) {
                m.events.push(e.toLowerCase(), t)
            }, m.fire = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
                var n = e[0].toLowerCase();
                for (t = 0; t <= m.events.length; t += 2) m.events[t] == n && m.events[t + 1].apply(m, e.slice(1)), "catchall" == m.events[t] && m.events[t + 1].apply(null, e);
                "fileerror" == n && m.fire("error", e[2], e[1]), "fileprogress" == n && m.fire("progress")
            };

            function t(e) {
                p.stopEvent(e), e.dataTransfer && e.dataTransfer.items ? i(e.dataTransfer.items, e) : e.dataTransfer && e.dataTransfer.files && i(e.dataTransfer.files, e)
            }

            function n(e) {
                e.preventDefault()
            }
            var p = {
                    stopEvent: function(e) {
                        e.stopPropagation(), e.preventDefault()
                    },
                    each: function(e, t) {
                        if (void 0 !== e.length) {
                            for (var n = 0; n < e.length; n++)
                                if (!1 === t(e[n])) return
                        } else
                            for (n in e)
                                if (!1 === t(n, e[n])) return
                    },
                    generateUniqueIdentifier: function(e) {
                        var t = m.getOpt("generateUniqueIdentifier");
                        if ("function" == typeof t) return t(e);
                        var n = e.webkitRelativePath || e.fileName || e.name;
                        return e.size + "-" + n.replace(/[^0-9a-zA-Z_-]/gim, "")
                    },
                    contains: function(e, t) {
                        var n = !1;
                        return p.each(e, function(e) {
                            return e != t || !(n = !0)
                        }), n
                    },
                    formatSize: function(e) {
                        return e < 1024 ? e + " bytes" : e < 1048576 ? (e / 1024).toFixed(0) + " KiB" : e < 1073741824 ? (e / 1024 / 1024).toFixed(1) + " MiB" : (e / 1024 / 1024 / 1024).toFixed(1) + " GiB"
                    },
                    getTarget: function(e) {
                        var t = m.getOpt("target");
                        return t.indexOf("?") < 0 ? t += "?" : t += "&", t + e.join("&")
                    }
                },
                i = function(e, t, n, i) {
                    n = n || {
                        total: 0,
                        files: [],
                        event: t
                    }, s(e.length, n);
                    for (var a = 0; a < e.length; a++) {
                        var o, r = e[a];
                        if (r.isFile || r.isDirectory) o = r;
                        else if (r.getAsEntry) o = r.getAsEntry();
                        else {
                            if (!r.webkitGetAsEntry) {
                                if ("function" == typeof r.getAsFile) {
                                    l(r.getAsFile(), n, i);
                                    continue
                                }
                                if (File && r instanceof File) {
                                    l(r, n, i);
                                    continue
                                }
                                s(-1, n);
                                continue
                            }
                            o = r.webkitGetAsEntry()
                        }
                        if (o) {
                            if (o.isFile) o.file(function(e) {
                                l(e, n, i)
                            }, function(e) {
                                console.warn(e)
                            });
                            else if (o.isDirectory) {
                                o.createReader()
                            }
                        } else s(-1, n)
                    }
                },
                s = function(e, t) {
                    t.total += e, t.files.length === t.total && a(t.files, t.event)
                },
                l = function(e, t, n) {
                    n && (e.relativePath = n + "/" + e.name), t.files.push(e), t.files.length === t.total && a(t.files, t.event)
                },
                a = function(e, u) {
                    var d = 0,
                        c = m.getOpt(["maxFiles", "minFileSize", "maxFileSize", "maxFilesErrorCallback", "minFileSizeErrorCallback", "maxFileSizeErrorCallback", "fileType", "fileTypeErrorCallback", "invalidChars", "invalidCharsErrorCallback"]);
                    if (void 0 !== c.maxFiles && c.maxFiles < e.length + m.files.length) {
                        if (1 !== c.maxFiles || 1 !== m.files.length || 1 !== e.length) return c.maxFilesErrorCallback(e, d++), !1;
                        m.removeFile(m.files[0])
                    }
                    var f = [];
                    p.each(e, function(n) {
                        var e = n.name;
                        if ("undefined" !== c.invalidChars) {
                            for (var t = !1, i = 0; i < c.invalidChars.length; i++)
                                if (-1 != e.indexOf(c.invalidChars[i])) {
                                    t = !0;
                                    break
                                } if (t) return c.invalidCharsErrorCallback(n, d++), !1
                        }
                        if (0 < c.fileType.length) {
                            var a = !1;
                            for (var o in c.fileType) {
                                var r = "." + c.fileType[o];
                                if (-1 !== e.indexOf(r, e.length - r.length)) {
                                    a = !0;
                                    break
                                }
                            }
                            if (!a) return c.fileTypeErrorCallback(n, d++), !1
                        }
                        if (void 0 !== c.minFileSize && n.size < c.minFileSize) return c.minFileSizeErrorCallback(n, d++), !1;
                        if (void 0 !== c.maxFileSize && n.size > c.maxFileSize) return c.maxFileSizeErrorCallback(n, d++), !1;

                        function s(t) {
                            m.getFromUniqueIdentifier(t) || function() {
                                n.uniqueIdentifier = t;
                                var e = new h(m, n, t);
                                m.files.push(e), f.push(e), e.container = void 0 !== u ? u.srcElement : null, window.setTimeout(function() {
                                    m.fire("fileAdded", e, u)
                                }, 0)
                            }()
                        }
                        var l = p.generateUniqueIdentifier(n);
                        l && "function" == typeof l.done && "function" == typeof l.fail ? l.done(function(e) {
                            s(e)
                        }).fail(function() {
                            s()
                        }) : s(l)
                    }), window.setTimeout(function() {
                        m.fire("filesAdded", f)
                    }, 0)
                };

            function h(e, t, n) {
                var i = this;
                i.opts = {}, i.getOpt = e.getOpt, i._prevProgress = 0, i.resumableObj = e, i.file = t, i.fileName = t.fileName || t.name, i.size = t.size, i.relativePath = t.webkitRelativePath || t.relativePath || i.fileName, i.uniqueIdentifier = n, i._pause = !1, i.container = "";

                function a(e, t) {
                    switch (e) {
                        case "progress":
                            i.resumableObj.fire("fileProgress", i);
                            break;
                        case "error":
                            i.abort(), o = !0, i.chunks = [], i.resumableObj.fire("fileError", i, t);
                            break;
                        case "success":
                            if (o) return;
                            i.resumableObj.fire("fileProgress", i), i.isComplete() && i.resumableObj.fire("fileSuccess", i, t);
                            break;
                        case "retry":
                            i.resumableObj.fire("fileRetry", i)
                    }
                }
                var o = void 0 !== n;
                return i.chunks = [], i.abort = function() {
                    var t = 0;
                    p.each(i.chunks, function(e) {
                        "uploading" == e.status() && (e.abort(), t++)
                    }), 0 < t && i.resumableObj.fire("fileProgress", i)
                }, i.cancel = function() {
                    var e = i.chunks;
                    i.chunks = [], p.each(e, function(e) {
                        "uploading" == e.status() && (e.abort(), i.resumableObj.uploadNextChunk())
                    }), i.resumableObj.removeFile(i), i.resumableObj.fire("fileProgress", i)
                }, i.retry = function() {
                    i.bootstrap();
                    var e = !1;
                    i.resumableObj.on("chunkingComplete", function() {
                        e || i.resumableObj.upload(), e = !0
                    })
                }, i.bootstrap = function() {
                    i.abort(), o = !1, i.chunks = [], i._prevProgress = 0;
                    for (var e = i.getOpt("forceChunkSize") ? Math.ceil : Math.floor, t = Math.max(e(i.file.size / i.getOpt("chunkSize")), 1), n = 0; n < t; n++) ! function(e) {
                        window.setTimeout(function() {
                            i.chunks.push(new r(i.resumableObj, i, e, a)), i.resumableObj.fire("chunkingProgress", i, e / t)
                        }, 0)
                    }(n);
                    window.setTimeout(function() {
                        i.resumableObj.fire("chunkingComplete", i)
                    }, 0)
                }, i.progress = function() {
                    if (o) return 1;
                    var t = 0,
                        n = !1;
                    return p.each(i.chunks, function(e) {
                        "error" == e.status() && (n = !0), t += e.progress(!0)
                    }), t = n ? 1 : .99999 < t ? 1 : t, t = Math.max(i._prevProgress, t), i._prevProgress = t
                }, i.isUploading = function() {
                    var t = !1;
                    return p.each(i.chunks, function(e) {
                        if ("uploading" == e.status()) return !(t = !0)
                    }), t
                }, i.isComplete = function() {
                    var n = !1;
                    return p.each(i.chunks, function(e) {
                        var t = e.status();
                        if ("pending" == t || "uploading" == t || 1 === e.preprocessState) return !(n = !0)
                    }), !n
                }, i.pause = function(e) {
                    i._pause = void 0 === e ? !i._pause : e
                }, i.isPaused = function() {
                    return i._pause
                }, i.resumableObj.fire("chunkingStart", i), i.bootstrap(), this
            }

            function r(e, t, n, i) {
                var d = this;
                d.opts = {}, d.getOpt = e.getOpt, d.resumableObj = e, d.fileObj = t, d.fileObjSize = t.size, d.fileObjType = t.file.type, d.offset = n, d.callback = i, d.lastProgressCallback = new Date, d.tested = !1, d.retries = 0, d.pendingRetry = !1, d.preprocessState = 0;
                var a = d.getOpt("chunkSize");
                return d.loaded = 0, d.startByte = d.offset * a, d.endByte = Math.min(d.fileObjSize, (d.offset + 1) * a), d.fileObjSize - d.endByte < a && !d.getOpt("forceChunkSize") && (d.endByte = d.fileObjSize), d.xhr = null, d.test = function() {
                    d.xhr = new XMLHttpRequest;

                    function e(e) {
                        d.tested = !0;
                        var t = d.status();
                        "success" == t ? (d.callback(t, d.message()), d.resumableObj.uploadNextChunk()) : d.send()
                    }
                    d.xhr.addEventListener("load", e, !1), d.xhr.addEventListener("error", e, !1), d.xhr.addEventListener("timeout", e, !1);
                    var n = [],
                        i = d.getOpt("parameterNamespace"),
                        t = d.getOpt("query");
                    "function" == typeof t && (t = t(d.fileObj, d)), p.each(t, function(e, t) {
                        n.push([encodeURIComponent(i + e), encodeURIComponent(t)].join("="))
                    }), n.push([i + "chunk", encodeURIComponent(d.offset + 1)].join("=")), n.push([i + "chunks", encodeURIComponent(d.fileObj.chunks.length)].join("=")), d.xhr.open("GET", p.getTarget(n)), d.xhr.timeout = d.getOpt("xhrTimeout"), d.xhr.withCredentials = d.getOpt("withCredentials"), p.each(d.getOpt("headers"), function(e, t) {
                        d.xhr.setRequestHeader(e, t)
                    }), d.xhr.send(null)
                }, d.preprocessFinished = function() {
                    d.preprocessState = 2, d.send()
                }, d.send = function() {
                    var e = d.getOpt("preprocess");
                    if ("function" == typeof e) switch (d.preprocessState) {
                        case 0:
                            return d.preprocessState = 1, void e(d);
                        case 1:
                            return
                    }
                    if (!d.getOpt("testChunks") || d.tested) {
                        d.xhr = new XMLHttpRequest, d.xhr.upload.addEventListener("progress", function(e) {
                            new Date - d.lastProgressCallback > 1e3 * d.getOpt("throttleProgressCallbacks") && (d.callback("progress"), d.lastProgressCallback = new Date), d.loaded = e.loaded || 0
                        }, !1), d.loaded = 0, d.pendingRetry = !1, d.callback("progress");
                        var t = function(e) {
                            var t = d.status();
                            if ("success" == t || "error" == t) d.callback(t, d.message()), d.resumableObj.uploadNextChunk();
                            else {
                                d.callback("retry", d.message()), d.abort(), d.retries++;
                                var n = d.getOpt("chunkRetryInterval");
                                void 0 !== n ? (d.pendingRetry = !0, setTimeout(d.send, n)) : d.send()
                            }
                        };
                        d.xhr.addEventListener("load", t, !1), d.xhr.addEventListener("error", t, !1), d.xhr.addEventListener("timeout", t, !1);
                        var n = {
                                chunk: d.offset,
                                chunks: d.fileObj.chunks.length
                            },
                            i = d.getOpt("query");
                        "function" == typeof i && (i = i(d.fileObj, d)), p.each(i, function(e, t) {
                            n[e] = t
                        });
                        var a = d.fileObj.file.slice ? "slice" : d.fileObj.file.mozSlice ? "mozSlice" : d.fileObj.file.webkitSlice ? "webkitSlice" : "slice",
                            o = d.fileObj.file[a](d.startByte, d.endByte),
                            r = null,
                            s = d.getOpt("target"),
                            l = d.getOpt("parameterNamespace");
                        if ("octet" === d.getOpt("method")) {
                            r = o;
                            var u = [];
                            p.each(n, function(e, t) {
                                u.push([encodeURIComponent(l + e), encodeURIComponent(t)].join("="))
                            }), s = p.getTarget(u)
                        } else {
                            r = new FormData;
                            u = [];
                            p.each(n, function(e, t) {
                                u.push([encodeURIComponent(l + e), encodeURIComponent(t)].join("="))
                            }), s = p.getTarget(u), r.append(l + d.getOpt("fileParameterName"), o)
                        }
                        d.xhr.open("POST", s), d.xhr.timeout = d.getOpt("xhrTimeout"), d.xhr.withCredentials = d.getOpt("withCredentials"), p.each(d.getOpt("headers"), function(e, t) {
                            d.xhr.setRequestHeader(e, t)
                        }), d.xhr.send(r)
                    } else d.test()
                }, d.abort = function() {
                    d.xhr && d.xhr.abort(), d.xhr = null
                }, d.status = function() {
                    return d.pendingRetry ? "uploading" : d.xhr ? d.xhr.readyState < 4 ? "uploading" : 200 <= d.xhr.status && d.xhr.status < 300 ? "success" : p.contains(d.getOpt("permanentErrors"), d.xhr.status) || d.retries >= d.getOpt("maxChunkRetries") ? "error" : (d.abort(), "pending") : "pending"
                }, d.message = function() {
                    return d.xhr ? d.xhr.responseText : ""
                }, d.progress = function(e) {
                    void 0 === e && (e = !1);
                    var t = e ? (d.endByte - d.startByte) / d.fileObjSize : 1;
                    if (d.pendingRetry) return 0;
                    switch (d.status()) {
                        case "success":
                        case "error":
                            return 1 * t;
                        case "pending":
                            return 0 * t;
                        default:
                            return d.loaded / (d.endByte - d.startByte) * t
                    }
                }, this
            }
            return m.uploadNextChunk = function() {
                var t = !1;
                if (m.getOpt("prioritizeFirstAndLastChunk") && (p.each(m.files, function(e) {
                        return e.chunks.length && "pending" == e.chunks[0].status() && 0 === e.chunks[0].preprocessState ? (e.chunks[0].send(), !(t = !0)) : 1 < e.chunks.length && "pending" == e.chunks[e.chunks.length - 1].status() && 0 === e.chunks[e.chunks.length - 1].preprocessState ? (e.chunks[e.chunks.length - 1].send(), !(t = !0)) : void 0
                    }), t)) return !0;
                if (p.each(m.files, function(e) {
                        if (!1 === e.isPaused() && p.each(e.chunks, function(e) {
                                if ("pending" == e.status() && 0 === e.preprocessState) return e.send(), !(t = !0)
                            }), t) return !1
                    }), t) return !0;
                var n = !1;
                return p.each(m.files, function(e) {
                    if (!e.isComplete()) return !(n = !0)
                }), n || m.fire("complete"), !1
            }, m.assignBrowse = function(e, i) {
                void 0 === e.length && (e = [e]), p.each(e, function(e) {
                    var t;
                    "INPUT" === e.tagName && "file" === e.type ? t = e : ((t = document.createElement("input")).setAttribute("type", "file"), t.style.display = "none", e.addEventListener("click", function() {
                        t.style.opacity = 0, t.style.display = "block", t.focus(), t.click(), t.style.display = "none"
                    }, !1), e.appendChild(t));
                    var n = m.getOpt("maxFiles");
                    void 0 === n || 1 != n ? t.setAttribute("multiple", "multiple") : t.removeAttribute("multiple"), i ? t.setAttribute("webkitdirectory", "webkitdirectory") : t.removeAttribute("webkitdirectory"), t.addEventListener("change", function(e) {
                        a(e.target.files, e), e.target.value = ""
                    }, !1)
                })
            }, m.assignDrop = function(e) {
                void 0 === e.length && (e = [e]), p.each(e, function(e) {
                    e.addEventListener("dragover", n, !1), e.addEventListener("dragenter", n, !1), e.addEventListener("drop", t, !1)
                })
            }, m.unAssignDrop = function(e) {
                void 0 === e.length && (e = [e]), p.each(e, function(e) {
                    e.removeEventListener("dragover", n), e.removeEventListener("dragenter", n), e.removeEventListener("drop", t)
                })
            }, m.isUploading = function() {
                var t = !1;
                return p.each(m.files, function(e) {
                    if (e.isUploading()) return !(t = !0)
                }), t
            }, m.upload = function() {
                if (!m.isUploading()) {
                    m.fire("uploadStart");
                    for (var e = 1; e <= m.getOpt("simultaneousUploads"); e++) m.uploadNextChunk()
                }
            }, m.pause = function() {
                p.each(m.files, function(e) {
                    e.abort()
                }), m.fire("pause")
            }, m.cancel = function() {
                for (var e = m.files.length - 1; 0 <= e; e--) m.files[e].cancel();
                m.fire("cancel")
            }, m.progress = function() {
                var t = 0,
                    n = 0;
                return p.each(m.files, function(e) {
                    t += e.progress() * e.size, n += e.size
                }), 0 < n ? t / n : 0
            }, m.addFile = function(e, t) {
                a([e], t)
            }, m.removeFile = function(e) {
                for (var t = m.files.length - 1; 0 <= t; t--) m.files[t] === e && m.files.splice(t, 1)
            }, m.getFromUniqueIdentifier = function(t) {
                var n = !1;
                return p.each(m.files, function(e) {
                    e.uniqueIdentifier == t && (n = e)
                }), n
            }, m.getSize = function() {
                var t = 0;
                return p.each(m.files, function(e) {
                    t += e.size
                }), t
            }, this
        };
        "undefined" != typeof module ? module.exports = o : "function" == typeof define && define.amd ? define(function() {
            return o
        }) : window.Resumable = o
    }(),
    function(r) {
        r(document).ready(function() {
            r(".chunked-uploader").each(function() {
                ! function(e) {
                    ! function(o) {
                        var n = new Resumable({
                                target: o.baseUrl,
                                headers: {
                                    "X-Auth-Token": o.token
                                },
                                maxFiles: 1,
                                chunkSize: o.chunkSize,
                                testChunks: !1,
                                fileType: o.fileExts,
                                maxChunkRetries: 20,
                                chunkRetryInterval: 1e3,
                                permanentErrors: [400, 401, 403, 404, 405, 408, 409, 415, 418, 500, 501],
                                maxFileSize: 21474836479
                            }),
                            a = r(o.element).find("button.uploadbrowse")[0];
                        n.assignBrowse(a), n.assignDrop(a), n.on("fileAdded", function(e, t) {
                            n.opts.target = o.baseUrl + "/" + e.fileName + "/part", r("#" + o.fileNameField).val(e.fileName), r("#fileLabel" + o.fileNameField).text(e.fileName), r("#fileLabel" + o.fileNameField).show(), r(a).text("Change File"), null !== window[o.fileCallback] && void 0 !== window[o.fileCallback] && window[o.fileCallback](e), r("#nameWarning").hide(), r("#nameError").hide(), r("#fileNameWarning").hide(), r("#fileNameError").hide()
                        }), n.on("uploadStart", function() {
                            r(a).hide(), console.log("Using current chunk size of", n.opts.chunkSize)
                        }), n.on("error", function(e, t) {
                            if (null !== t) {
                                null !== window[o.fileErrorCallback] && void 0 !== window[o.fileErrorCallback] && window[o.fileErrorCallback](), r(a).show(), r(a).text("Choose File");
                                var n = r(o.element).find(".progress");
                                r(n).is(":visible") && r(n).hide();
                                var i = r(o.element).find(".errorServerUpload");
                                r(i).is(":visible") || showUploadServerError(), r("#" + o.fileNameField).val(""), r("#fileLabel" + o.fileNameField).val(""), r("#fileLabel" + o.fileNameField).hide()
                            }
                        }), n.on("fileSuccess", function(e, t) {
                            null !== window[o.callback] && void 0 !== window[o.callback] && window[o.callback]()
                        }), n.on("fileProgress", function(e) {
                            var t = r(o.element).find(".progress");
                            r(t).is(":visible") || r(t).show();
                            var n = (100 * e.progress(!1)).toFixed(0),
                                i = (e.size / 1e6).toFixed(1),
                                a = (e.size / 1e6 * e.progress(!1)).toFixed(1);
                            r(o.element).find(".uploadprogress").text(a + " MB of " + i + " MB (" + n + "%)"), r(o.element).find(".progress-bar-inner-progress").css("width", n + "%")
                        }), window.resumableUploader = n
                    }(function(e) {
                        var t = r(e);
                        return {
                            element: t,
                            baseUrl: t.data("base-url"),
                            token: t.data("upload-token"),
                            callback: t.data("callback"),
                            fileCallback: t.data("file-callback"),
                            fileNameField: t.data("file-name-field"),
                            fileExts: t.data("file-types").split(","),
                            fileErrorCallback: t.data("file-error-callback"),
                            chunkSize: t.data("chunk-size"),
                            upload: {
                                file: null,
                                offset: 0
                            }
                        }
                    }(e))
                }(this)
            })
        })
    }(jQuery),
    function(s, e, o) {
        s.fn.dataTableExt.oApi.fnColResize = function(e, t, n) {
            var i = e.aoColumns.length;
            t != n && (t < 0 || i <= t ? this.oApi._fnLog(e, 1, "ColResize 'from' index is out of bounds: " + t) : (n < 0 || i <= n) && this.oApi._fnLog(e, 1, "ColResize 'to' index is out of bounds: " + n))
        }, jQuery.fn.dataTableExt.oSort["epoch-asc"] = function(e, t) {
            return e < t ? 1 : t < e ? -1 : 0
        }, jQuery.fn.dataTableExt.oSort["epoch-desc"] = function(e, t) {
            return e < t ? -1 : t < e ? 1 : 0
        }, ColResize = function(e, t) {
            return this.oTable = e, this.CLASS && "ColResize" == this.CLASS || alert("Warning: ColResize must be initialised with the keyword 'new'"), void 0 === t && (t = {}), this.s = {
                dt: null,
                init: t,
                fixed: 0,
                mouse: {
                    startX: -1,
                    startY: -1,
                    offsetX: -1,
                    offsetY: -1,
                    target: -1,
                    targetIndex: -1,
                    fromIndex: -1
                },
                aoTargets: []
            }, this.dom = {
                drag: null,
                resize: null,
                pointer: null
            }, this.s.dt = e.fnSettings(), this._fnConstruct(), ColResize.aoInstances.push(this), this
        }, ColResize.prototype = {
            fnReset: function() {
                for (var e = [], t = 0, n = this.s.dt.aoColumns.length; t < n; t++) e.push(this.s.dt.aoColumns[t]._ColResize_iOrigCol);
                this._fnOrderColumns(e)
            },
            _fnConstruct: function() {
                var e, t, n = this;
                for (this.s.init.iFixedColumns && (this.s.fixed = this.s.init.iFixedColumns), e = 0, t = this.s.dt.aoColumns.length; e < t; e++) e > this.s.fixed - 1 && this._fnMouseListener(e, this.s.dt.aoColumns[e].nTh);
                this.s.dt.oApi._fnCallbackReg(this.s.dt, "aoStateSaveParams", function(e, t) {
                    n._fnStateSave.call(n, t)
                }, "ColResize_State");
                var i = null;
                if (this.s.dt.oLoadedState && void 0 !== this.s.dt.oLoadedState.ColSizes && (i = this.s.dt.oLoadedState.ColSizes), i)
                    for (e = 0, t = this.s.dt.aoColumns.length; e < t; e++) this.s.dt.aoColumns[e].sWidth = i[e]
            },
            _fnStateSave: function(e) {
                var t, n, i = this.s.dt;
                for (e.ColSizes = [], t = 0, n = i.aoColumns.length; t < n; t++) e.ColSizes[t] = i.aoColumns[t].sWidth
            },
            _fnMouseListener: function(e, o) {
                var r = this;
                s(o).bind("mousemove.ColResize", function(e) {
                    if (s(o).unbind("mousedown.ColResize"), null === r.dom.resize) {
                        var t = "TH" == e.target.nodeName ? e.target : s(e.target).parents("TH")[0],
                            n = s(t).offset(),
                            i = s(t).innerWidth(),
                            a = s(t).outerWidth();
                        e.pageX >= Math.round(n.left + i - 3) && e.pageX <= Math.round(n.left + a) ? (r._fnSetElementCursor(t, !0), s(o).bind("mousedown.ColResize", function(e) {
                            return r._fnMouseDown.call(r, e, o), !1
                        })) : r._fnSetElementCursor(t, !1)
                    } else r._fnSetElementCursor(t, !1)
                })
            },
            _fnSetElementCursor: function(e, t) {
                if (e) {
                    var n = void 0 === t || !1 === t ? "pointer" : "col-resize";
                    s(e).css({
                        cursor: n
                    })
                }
            },
            _fnMouseDown: function(e, t) {
                var n = this,
                    i = this.oTable;
                this.s.dt.aoColumns;
                t = s(t), i.fnSortOnOff("_all", !1), n.nLastTh = s(t).parent().children("th:last"), n.nLastThOriginalWidth = n.nLastTh.width(), this.s.mouse.startX = e.pageX, this.s.mouse.startWidth = t.width();
                var a = (this.s.mouse.resizeElem = t).next();
                this.s.mouse.nextStartWidth = a.width(), n.dom.resize = !0, s(o).unbind("mousemove.ColResize"), s(o).unbind("mouseup.ColResize"), s(o).bind("mousemove.ColResize", function(e) {
                    n._fnMouseMove.call(n, e)
                }), s(o).bind("mouseup.ColResize", function(e) {
                    return s(o).one("click.ColResize", function(e) {
                        i.fnSortOnOff("_all", !0)
                    }), n._fnSetColumnWidth(t), t.index() !== n.nLastTh.index() && n._fnSetColumnWidth(n.nLastTh), n._fnMouseUp.call(n, e), e.preventDefault(), e.cancelBubble = !0, e.stopImmediatePropagation(), n._fnSetElementCursor(t, !1), s(o).unbind("mousemove.ColResize"), s(o).unbind("mouseup.ColResize"), !1
                })
            },
            _fnSetColumnWidth: function(e) {
                var t = this.oTable;
                this.s.dt.aoColumns[s(e).index()].sWidth = e.width() + "px", s(t).dataTable().fnDraw()
            },
            _fnMouseMove: function(e) {
                if (this.dom.resize) {
                    var t = this.s.mouse.resizeElem,
                        n = (s(t).next(), e.pageX - this.s.mouse.startX);
                    0 != n && s(t).width(this.s.mouse.startWidth + n), n < 0 && this.nLastTh.index() !== jQuery(t).index() && this.nLastTh.width(this.nLastThOriginalWidth + Math.abs(n))
                }
            },
            _fnMouseUp: function(e) {
                return this.dom.resize = null, !1
            }
        }, ColResize.aoInstances = [], ColResize.prototype.CLASS = "ColResize", ColResize.VERSION = "0.5.1", ColResize.prototype.VERSION = ColResize.VERSION, "function" == typeof s.fn.dataTable && "function" == typeof s.fn.dataTableExt.fnVersionCheck && s.fn.dataTableExt.fnVersionCheck("1.8.0") ? (s.fn.dataTableExt.oApi.fnSortOnOff = function(e, t, n) {
            for (var i = 0, a = ("string" == typeof t && "_all" == t ? e.aoColumns : t).length; i < a; i++) e.aoColumns[i].bSortable = n
        }, s.fn.dataTableExt.aoFeatures.push({
            fnInit: function(e) {
                var t = e.oInstance;
                if (void 0 === t._oPluginColResize) {
                    var n = void 0 !== e.oInit.oColResize ? e.oInit.oColResize : {};
                    t._oPluginColResize = new ColResize(e.oInstance, n)
                } else t.oApi._fnLog(e, 1, "ColResize attempted to initialise twice. Ignoring second");
                return null
            },
            cFeature: "z",
            sFeature: "ColResize"
        })) : alert("Warning: ColResize requires DataTables 1.8.0 or greater - www.datatables.net/download")
    }(jQuery, window, document),
    function(B) {
        "use strict";
        B.fn.rowGrouping = function(D) {
            var w = {
                iGroupingColumnIndex: 0,
                sGroupingColumnSortDirection: "",
                iGroupingOrderByColumnIndex: -1,
                sGroupingClass: "group",
                sGroupItemClass: "group-item",
                bHideGroupingColumn: !0,
                bHideGroupingOrderByColumn: !0,
                sGroupBy: "name",
                sGroupLabelPrefix: "",
                fnGroupLabelFormat: function(e) {
                    return e
                },
                bExpandableGrouping: !1,
                bExpandSingleGroup: !1,
                iExpandGroupOffset: 100,
                asExpandedGroups: null,
                sDateFormat: "dd/MM/yyyy",
                sEmptyGroupLabel: "-",
                bSetGroupingClassOnTR: !1,
                iGroupingColumnIndex2: -1,
                sGroupingColumnSortDirection2: "",
                iGroupingOrderByColumnIndex2: -1,
                sGroupingClass2: "subgroup",
                sGroupItemClass2: "subgroup-item",
                bHideGroupingColumn2: !0,
                bHideGroupingOrderByColumn2: !0,
                sGroupBy2: "name",
                sGroupLabelPrefix2: "",
                fnGroupLabelFormat2: function(e) {
                    return e
                },
                bExpandableGrouping2: !1,
                fnOnGrouped: function() {},
                fnOnGroupCreated: function(e, t, n) {},
                fnOnGroupCompleted: function(e, t, n) {},
                oHideEffect: null,
                oShowEffect: null,
                bUseFilteringForGrouping: !1
            };
            return this.each(function(e, t) {
                var E = B(t).dataTable(),
                    b = new Array;

                function v(e, t, n) {
                    var i = document.createElement("tr"),
                        a = document.createElement("td"),
                        o = document.createElement("button");
                    i.id = "group-id-" + E.attr("id") + "_" + e;
                    var r = {
                        id: i.id,
                        key: e,
                        text: t,
                        level: 0,
                        groupItemClass: ".group-item-" + e,
                        dataGroup: e,
                        aoSubgroups: new Array
                    };
                    return I.bSetGroupingClassOnTR ? i.className = I.sGroupingClass + " " + e : a.className = I.sGroupingClass + " " + e, a.colSpan = n, a.innerHTML = I.sGroupLabelPrefix + I.fnGroupLabelFormat("" == t ? I.sEmptyGroupLabel : t, r), I.bExpandableGrouping && (C(e) ? (o.className += " jamf-collapse", r.state = "collapsed") : (o.className += " jamf-expand", r.state = "expanded"), o.className += " jamf-button small icon-only", a.className += " group-item-expander", B(o).attr("data-group", r.dataGroup), B(o).attr("data-group-level", r.level), B(o).click(u)), a.appendChild(o), i.appendChild(a), (b[e] = r).nGroup = i, I.fnOnGroupCreated(r, e, 1), r
                }

                function y(e, t, n, i) {
                    var a = document.createElement("tr");
                    a.id = i.id + "_" + e;
                    var o = document.createElement("td"),
                        r = document.createElement("button"),
                        s = i.dataGroup + "_" + e,
                        l = {
                            id: a.id,
                            key: e,
                            text: t,
                            level: i.level + 1,
                            groupItemClass: ".group-item-" + s,
                            dataGroup: s,
                            aoSubgroups: new Array
                        };
                    return I.bSetGroupingClassOnTR ? a.className = I.sGroupingClass2 + " " + e : o.className = I.sGroupingClass2 + " " + e, o.colSpan = n, o.innerHTML = I.sGroupLabelPrefix2 + I.fnGroupLabelFormat2("" == t ? I.sEmptyGroupLabel : t, l), I.bExpandableGrouping && (a.className += " group-item-" + i.dataGroup), I.bExpandableGrouping && I.bExpandableGrouping2 && (C(l.dataGroup) ? (r.className += " jamf-collapse", l.state = "collapsed") : (r.className += " jamf-expand", l.state = "expanded"), r.className += " jamf-button small icon-only", o.className += " group-item-expander", B(r).attr("data-group", l.dataGroup), B(r).attr("data-group-level", l.level), B(r).click(u)), o.appendChild(r), a.appendChild(o), i.aoSubgroups[l.dataGroup] = l, (b[l.dataGroup] = l).nGroup = a, I.fnOnGroupCreated(l, e, 2), l
                }

                function C(e) {
                    return null != b[e] ? "collapsed" == b[e].state : -1 < e.indexOf("_") ? void 0 : (!T || null != F && 0 != F.length) && -1 == B.inArray(e, F)
                }

                function a(e) {
                    return e.length < s + l ? e : e.substr(s, l)
                }

                function n(e) {
                    return e
                }

                function i(e) {
                    return e.substr(0, 1)
                }

                function A(e) {
                    return "" === e ? "-" : e.toLowerCase().replace(/[^a-zA-Z0-9\u0080-\uFFFF]+/g, "-")
                }

                function o(e) {
                    b[e].state = "expanded", B("button[data-group='" + e + "']").removeClass("jamf-collapse"), B("button[data-group='" + e + "']").addClass("jamf-expand"), I.bUseFilteringForGrouping ? E.fnDraw() : (-1 == jQuery.inArray(e, F) && F.push(e), null != I.oHideEffect ? B(".group-item-" + e, E)[I.oShowEffect.method](I.oShowEffect.duration, I.oShowEffect.easing, function() {}) : B(".group-item-" + e, E).show())
                }

                function r(e) {
                    b[e].state = "collapsed", B("button[data-group='" + e + "']").removeClass("jamf-expand"), B("button[data-group='" + e + "']").addClass("jamf-collapse"), I.bUseFilteringForGrouping ? E.fnDraw() : (B(".group-item-" + e).each(function() {
                        E.fnIsOpen(this) && (null != I.fnOnRowClosed && I.fnOnRowClosed(this), E.fnClose(this))
                    }), null != I.oHideEffect ? B(".group-item-" + e, E)[I.oHideEffect.method](I.oHideEffect.duration, I.oHideEffect.easing, function() {}) : B(".group-item-" + e, E).hide())
                }

                function u(e) {
                    var t = B(this).attr("data-group"),
                        n = (B(this).attr("data-group-level"), !C(t));
                    if (I.bExpandSingleGroup) {
                        if (!n)
                            if (r(B("td.jamf-expand").attr("data-group")), o(t), -1 != I.iExpandGroupOffset) {
                                var i = B("#group-id-" + E.attr("id") + "_" + t).offset().top - I.iExpandGroupOffset;
                                window.scroll(0, i)
                            } else {
                                i = E.offset().top;
                                window.scroll(0, i)
                            }
                    } else n ? r(t) : o(t);
                    e.preventDefault()
                }
                B(this).dataTableExt.aoGroups = b;
                var s = 6,
                    l = 4,
                    F = new Array,
                    T = !0,
                    I = B.extend(w, D); - 1 == I.iGroupingOrderByColumnIndex ? (I.bCustomColumnOrdering = !1, I.iGroupingOrderByColumnIndex = I.iGroupingColumnIndex) : I.bCustomColumnOrdering = !0, "" == I.sGroupingColumnSortDirection && ("year" == I.sGroupBy ? I.sGroupingColumnSortDirection = "desc" : I.sGroupingColumnSortDirection = "asc"), -1 == I.iGroupingOrderByColumnIndex2 ? (I.bCustomColumnOrdering2 = !1, I.iGroupingOrderByColumnIndex2 = I.iGroupingColumnIndex2) : I.bCustomColumnOrdering2 = !0, "" == I.sGroupingColumnSortDirection2 && ("year" == I.sGroupBy2 ? I.sGroupingColumnSortDirection2 = "desc" : I.sGroupingColumnSortDirection2 = "asc"), s = I.sDateFormat.toLowerCase().indexOf("yy"), l = I.sDateFormat.toLowerCase().lastIndexOf("y") - I.sDateFormat.toLowerCase().indexOf("y") + 1;
                var d = I.sDateFormat.toLowerCase().indexOf("mm"),
                    c = I.sDateFormat.toLowerCase().lastIndexOf("m") - I.sDateFormat.toLowerCase().indexOf("m") + 1,
                    S = n;
                switch (I.sGroupBy) {
                    case "letter":
                        S = i;
                        break;
                    case "year":
                        S = function(e) {
                            return a(e)
                        };
                        break;
                    case "month":
                        S = function(e) {
                            return e.substr(s, l) + " " + function(e) {
                                return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][e - 1]
                            }(e.substr(d, c))
                        };
                        break;
                    default:
                        S = n
                }
                if (null != I.asExpandedGroups) {
                    if ("NONE" == I.asExpandedGroups) I.asExpandedGroups = [], F = I.asExpandedGroups, T = !1;
                    else if ("ALL" == I.asExpandedGroups) I.bAddAllGroupsAsExpanded = !0;
                    else if (I.asExpandedGroups.constructor == String) {
                        var f = I.asExpandedGroups;
                        I.asExpandedGroups = new Array, I.asExpandedGroups.push(A(f)), F = I.asExpandedGroups, T = !1
                    } else if (I.asExpandedGroups.constructor == Array) {
                        for (var m = 0; m < I.asExpandedGroups.length && (F.push(A(I.asExpandedGroups[m])), !I.bExpandSingleGroup); m++);
                        T = !1
                    }
                } else I.asExpandedGroups = new Array, I.bAddAllGroupsAsExpanded = !0;
                if (I.bExpandSingleGroup) {
                    var p = B("tbody tr", E),
                        h = E.fnGetData(p[0], I.iGroupingColumnIndex),
                        g = h;
                    "year" != I.sGroupBy && (g = S(h));
                    var x = A(g);
                    I.asExpandedGroups = new Array, I.asExpandedGroups.push(x)
                }
                E.fnSetColumnVis(I.iGroupingColumnIndex, !I.bHideGroupingColumn), I.bCustomColumnOrdering && E.fnSetColumnVis(I.iGroupingOrderByColumnIndex, !I.bHideGroupingOrderByColumn), -1 != I.iGroupingColumnIndex2 && E.fnSetColumnVis(I.iGroupingColumnIndex2, !I.bHideGroupingColumn2), I.bCustomColumnOrdering2 && E.fnSetColumnVis(I.iGroupingOrderByColumnIndex2, !I.bHideGroupingOrderByColumn2), E.fnSettings().aoDrawCallback.push({
                    fn: function(e) {
                        E.fnSettings().oFeatures.bServerSide && (T = !0);
                        var t = !1;
                        if (-1 != I.iGroupingColumnIndex2 && (t = !0), 0 != e.aiDisplayMaster.length) {
                            for (var n = B("tbody tr", E), i = 0, a = 0; a < e.aoColumns.length; a++) e.aoColumns[a].bVisible && (i += 1);
                            var o = null,
                                r = null;
                            if (0 < e.aiDisplay.length)
                                for (var s = 0; s < n.length; s++) {
                                    var l = e._iDisplayStart + s;
                                    E.fnSettings().oFeatures.bServerSide && (l = s);
                                    var u, d = null,
                                        c = "",
                                        f = null;
                                    d = u = this.fnGetData(n[s], I.iGroupingColumnIndex);
                                    if ("year" != I.sGroupBy && (d = S(u)), t && (null == (c = e.aoData[e.aiDisplay[l]]._aData[I.iGroupingColumnIndex2]) && (c = e.aoData[e.aiDisplay[l]]._aData[e.aoColumns[I.iGroupingColumnIndex2].mDataProp]), "year" != I.sGroupBy2 && (f = S(c))), null == o || A(d) != A(o)) {
                                        var m = A(d);
                                        null != o && I.fnOnGroupCompleted(b[A(o)]), I.bAddAllGroupsAsExpanded && -1 == jQuery.inArray(m, F) && F.push(m);
                                        var p = v(m, d, i).nGroup;
                                        null != n[s].parentNode ? n[s].parentNode.insertBefore(p, n[s]) : B(n[s]).before(p), o = d, r = null
                                    }
                                    if (B(n[s]).attr("data-group", b[m].dataGroup), B(n[s]).addClass(I.sGroupItemClass), B(n[s]).addClass("group-item-" + m), I.bExpandableGrouping && C(m) && !I.bUseFilteringForGrouping && B(n[s]).hide(), t) {
                                        if (null == r || A(f) != A(r)) {
                                            var h = y(A(d) + "-" + A(f), f, i, b[m]),
                                                g = h.nGroup;
                                            n[s].parentNode.insertBefore(g, n[s]), r = f
                                        }
                                        B(n[s]).attr("data-group", h.dataGroup).addClass(I.sGroupItemClass2).addClass("group-item-" + h.dataGroup)
                                    }
                                }
                            null != o && I.fnOnGroupCompleted(b[A(o)]), I.fnOnGrouped(b), T = !1
                        }
                    },
                    sName: "fnRowGrouping"
                });
                var N = new Array;
                switch (N.push([I.iGroupingOrderByColumnIndex, I.sGroupingColumnSortDirection]), -1 != I.iGroupingColumnIndex2 && N.push([I.iGroupingOrderByColumnIndex2, I.sGroupingColumnSortDirection2]), E.fnSettings().aaSortingFixed = N, I.sGroupBy) {
                    case "name":
                        break;
                    case "letter":
                        E.fnSettings().aoColumns[I.iGroupingOrderByColumnIndex].sSortDataType = "rg-letter", B.fn.dataTableExt.afnSortData["rg-letter"] = function(e, t) {
                            var n = [];
                            return B("td:eq(" + t + ")", e.oApi._fnGetTrNodes(e)).each(function() {
                                n.push(i(this.innerHTML))
                            }), n
                        };
                        break;
                    case "year":
                        E.fnSettings().aoColumns[I.iGroupingOrderByColumnIndex].sSortDataType = "rg-date", B.fn.dataTableExt.afnSortData["rg-date"] = function(e, t) {
                            var n = [],
                                i = e.oApi._fnGetTrNodes(e);
                            for (m = 0; m < i.length; m++) n.push(a(E.fnGetData(i[m], t)));
                            return n
                        }
                }
                I.bUseFilteringForGrouping && B.fn.dataTableExt.afnFiltering.push(function(e, t, n) {
                    if (e.nTable.id !== E[0].id) return !0;
                    var i = t[I.iGroupingColumnIndex];
                    return void 0 === i && (i = t[e.aoColumns[I.iGroupingColumnIndex].mDataProp]), !C(A(i)) || (E.fnIsOpen(E.fnGetNodes(n)) && (null != I.fnOnRowClosed && I.fnOnRowClosed(this), E.fnClose(E.fnGetNodes(n))), !1)
                }), E.fnDraw()
            })
        }
    }(jQuery), jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "software-version-pre": function(e) {
            return e
        },
        "software-version-asc": function(e, t) {
            return versionCompare(e, t)
        },
        "software-version-desc": function(e, t) {
            return versionCompare(t, e)
        }
    });
