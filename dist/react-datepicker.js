!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(
        exports,
        require("react"),
        require("prop-types"),
        require("classnames"),
        require("react-onclickoutside"),
        require("react-popper")
      )
    : "function" == typeof define && define.amd
    ? define([
        "exports",
        "react",
        "prop-types",
        "classnames",
        "react-onclickoutside",
        "react-popper"
      ], t)
    : t(
        (e.DatePicker = {}),
        e.React,
        e.PropTypes,
        e.classNames,
        e.onClickOutside,
        e.ReactPopper
      );
})(this, function(e, h, t, p, n, u) {
  "use strict";
  function m(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return (
      e instanceof Date ||
      ("object" == typeof e &&
        "[object Date]" === Object.prototype.toString.call(e))
    );
  }
  function E(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var t = Object.prototype.toString.call(e);
    return e instanceof Date || ("object" == typeof e && "[object Date]" === t)
      ? new Date(e.getTime())
      : "number" == typeof e || "[object Number]" === t
      ? new Date(e)
      : (("string" != typeof e && "[object String]" !== t) ||
          void 0 === console ||
          (console.warn(
            "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fpAk2"
          ),
          console.warn(Error().stack)),
        new Date(NaN));
  }
  function g(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var t = E(e);
    return !isNaN(t);
  }
  function O(e) {
    if (null === e || !0 === e || !1 === e) return NaN;
    var t = +e;
    return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
  }
  (h = h && h.hasOwnProperty("default") ? h.default : h),
    (t = t && t.hasOwnProperty("default") ? t.default : t),
    (p = p && p.hasOwnProperty("default") ? p.default : p),
    (n = n && n.hasOwnProperty("default") ? n.default : n);
  var a = 6e4;
  function N(e) {
    var t = new Date(e.getTime()),
      n = t.getTimezoneOffset();
    t.setSeconds(0, 0);
    var r = t.getTime() % a;
    return n * a + r;
  }
  var o = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" }
  };
  function r(n) {
    return function(e) {
      var t = e || {};
      return (
        n.formats[t.width ? t.width + "" : n.defaultWidth] ||
        n.formats[n.defaultWidth]
      );
    };
  }
  var i = {
      date: r({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy"
        },
        defaultWidth: "full"
      }),
      time: r({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a"
        },
        defaultWidth: "full"
      }),
      dateTime: r({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}"
        },
        defaultWidth: "full"
      })
    },
    s = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P"
    };
  function c(a) {
    return function(e, t) {
      var n = t || {},
        r = n.width ? n.width + "" : a.defaultWidth;
      return ("formatting" === (n.context ? n.context + "" : "standalone") &&
      a.formattingValues
        ? a.formattingValues[r] || a.formattingValues[a.defaultFormattingWidth]
        : a.values[r] ||
          a.values[
            a.defaultWidth
          ])[a.argumentCallback ? a.argumentCallback(e) : e];
    };
  }
  function l(c) {
    return function(e, t) {
      var n = e + "",
        r = t || {},
        a = r.width,
        o = n.match(
          (a && c.matchPatterns[a]) || c.matchPatterns[c.defaultMatchWidth]
        );
      if (!o) return null;
      var i,
        s = o[0],
        u = (a && c.parsePatterns[a]) || c.parsePatterns[c.defaultParseWidth];
      return (
        (i =
          "[object Array]" === Object.prototype.toString.call(u)
            ? u.findIndex(function(e) {
                return e.test(n);
              })
            : (function(e, t) {
                for (var n in e) if (e.hasOwnProperty(n) && t(e[n])) return n;
              })(u, function(e) {
                return e.test(n);
              })),
        (i = c.valueCallback ? c.valueCallback(i) : i),
        {
          value: (i = r.valueCallback ? r.valueCallback(i) : i),
          rest: n.slice(s.length)
        }
      );
    };
  }
  var d,
    _ = {
      formatDistance: function(e, t, n) {
        var r;
        return (
          (n = n || {}),
          (r =
            "string" == typeof o[e]
              ? o[e]
              : 1 === t
              ? o[e].one
              : o[e].other.replace("{{count}}", t)),
          n.addSuffix ? (0 < n.comparison ? "in " + r : r + " ago") : r
        );
      },
      formatLong: i,
      formatRelative: function(e, t, n, r) {
        return s[e];
      },
      localize: {
        ordinalNumber: function(e, t) {
          var n = +e,
            r = n % 100;
          if (20 < r || r < 10)
            switch (r % 10) {
              case 1:
                return n + "st";
              case 2:
                return n + "nd";
              case 3:
                return n + "rd";
            }
          return n + "th";
        },
        era: c({
          values: {
            narrow: ["B", "A"],
            abbreviated: ["BC", "AD"],
            wide: ["Before Christ", "Anno Domini"]
          },
          defaultWidth: "wide"
        }),
        quarter: c({
          values: {
            narrow: ["1", "2", "3", "4"],
            abbreviated: ["Q1", "Q2", "Q3", "Q4"],
            wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
          },
          defaultWidth: "wide",
          argumentCallback: function(e) {
            return +e - 1;
          }
        }),
        month: c({
          values: {
            narrow: [
              "J",
              "F",
              "M",
              "A",
              "M",
              "J",
              "J",
              "A",
              "S",
              "O",
              "N",
              "D"
            ],
            abbreviated: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            wide: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ]
          },
          defaultWidth: "wide"
        }),
        day: c({
          values: {
            narrow: ["S", "M", "T", "W", "T", "F", "S"],
            short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            wide: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ]
          },
          defaultWidth: "wide"
        }),
        dayPeriod: c({
          values: {
            narrow: {
              am: "a",
              pm: "p",
              midnight: "mi",
              noon: "n",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            },
            abbreviated: {
              am: "AM",
              pm: "PM",
              midnight: "midnight",
              noon: "noon",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            },
            wide: {
              am: "a.m.",
              pm: "p.m.",
              midnight: "midnight",
              noon: "noon",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            }
          },
          defaultWidth: "wide",
          formattingValues: {
            narrow: {
              am: "a",
              pm: "p",
              midnight: "mi",
              noon: "n",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            },
            abbreviated: {
              am: "AM",
              pm: "PM",
              midnight: "midnight",
              noon: "noon",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            },
            wide: {
              am: "a.m.",
              pm: "p.m.",
              midnight: "midnight",
              noon: "noon",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            }
          },
          defaultFormattingWidth: "wide"
        })
      },
      match: {
        ordinalNumber: ((d = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function(e) {
            return parseInt(e, 10);
          }
        }),
        function(e, t) {
          var n = e + "",
            r = t || {},
            a = n.match(d.matchPattern);
          if (!a) return null;
          var o = a[0],
            i = n.match(d.parsePattern);
          if (!i) return null;
          var s = d.valueCallback ? d.valueCallback(i[0]) : i[0];
          return {
            value: (s = r.valueCallback ? r.valueCallback(s) : s),
            rest: n.slice(o.length)
          };
        }),
        era: l({
          matchPatterns: {
            narrow: /^(b|a)/i,
            abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
            wide: /^(before christ|before common era|anno domini|common era)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: { any: [/^b/i, /^(a|c)/i] },
          defaultParseWidth: "any"
        }),
        quarter: l({
          matchPatterns: {
            narrow: /^[1234]/i,
            abbreviated: /^q[1234]/i,
            wide: /^[1234](th|st|nd|rd)? quarter/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
          defaultParseWidth: "any",
          valueCallback: function(e) {
            return e + 1;
          }
        }),
        month: l({
          matchPatterns: {
            narrow: /^[jfmasond]/i,
            abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
            wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: {
            narrow: [
              /^j/i,
              /^f/i,
              /^m/i,
              /^a/i,
              /^m/i,
              /^j/i,
              /^j/i,
              /^a/i,
              /^s/i,
              /^o/i,
              /^n/i,
              /^d/i
            ],
            any: [
              /^ja/i,
              /^f/i,
              /^mar/i,
              /^ap/i,
              /^may/i,
              /^jun/i,
              /^jul/i,
              /^au/i,
              /^s/i,
              /^o/i,
              /^n/i,
              /^d/i
            ]
          },
          defaultParseWidth: "any"
        }),
        day: l({
          matchPatterns: {
            narrow: /^[smtwf]/i,
            short: /^(su|mo|tu|we|th|fr|sa)/i,
            abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
            wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: {
            narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
            any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
          },
          defaultParseWidth: "any"
        }),
        dayPeriod: l({
          matchPatterns: {
            narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
            any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
          },
          defaultMatchWidth: "any",
          parsePatterns: {
            any: {
              am: /^a/i,
              pm: /^p/i,
              midnight: /^mi/i,
              noon: /^no/i,
              morning: /morning/i,
              afternoon: /afternoon/i,
              evening: /evening/i,
              night: /night/i
            }
          },
          defaultParseWidth: "any"
        })
      },
      options: { weekStartsOn: 0, firstWeekContainsDate: 1 }
    };
  function f(e, t) {
    for (var n = e < 0 ? "-" : "", r = "" + Math.abs(e); r.length < t; )
      r = "0" + r;
    return n + r;
  }
  var w = function(e, t) {
      var n = e.getUTCFullYear(),
        r = 0 < n ? n : 1 - n;
      return f("yy" === t ? r % 100 : r, t.length);
    },
    y = function(e, t) {
      var n = e.getUTCMonth();
      return "M" === t ? n + 1 + "" : f(n + 1, 2);
    },
    v = function(e, t) {
      return f(e.getUTCDate(), t.length);
    },
    b = function(e, t) {
      return f(e.getUTCHours() % 12 || 12, t.length);
    },
    D = function(e, t) {
      return f(e.getUTCHours(), t.length);
    },
    C = function(e, t) {
      return f(e.getUTCMinutes(), t.length);
    },
    k = function(e, t) {
      return f(e.getUTCSeconds(), t.length);
    };
  function T(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var t = E(e),
      n = t.getUTCDay(),
      r = (n < 1 ? 7 : 0) + n - 1;
    return t.setUTCDate(t.getUTCDate() - r), t.setUTCHours(0, 0, 0, 0), t;
  }
  function M(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var t = E(e),
      n = t.getUTCFullYear(),
      r = new Date(0);
    r.setUTCFullYear(n + 1, 0, 4), r.setUTCHours(0, 0, 0, 0);
    var a = T(r),
      o = new Date(0);
    o.setUTCFullYear(n, 0, 4), o.setUTCHours(0, 0, 0, 0);
    var i = T(o);
    return t.getTime() < a.getTime()
      ? t.getTime() < i.getTime()
        ? n - 1
        : n
      : n + 1;
  }
  var S = 6048e5;
  function x(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var t = E(e),
      n =
        T(t).getTime() -
        (function(e) {
          if (arguments.length < 1)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var t = M(e),
            n = new Date(0);
          return n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0), T(n);
        })(t).getTime();
    return 1 + Math.round(n / S);
  }
  function q(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = t || {},
      r = n.locale,
      a = r && r.options && r.options.weekStartsOn,
      o = null == a ? 0 : O(a),
      i = null == n.weekStartsOn ? o : O(n.weekStartsOn);
    if (i < 0 || 6 < i)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var s = E(e),
      u = s.getUTCDay(),
      c = (u < i ? 7 : 0) + u - i;
    return s.setUTCDate(s.getUTCDate() - c), s.setUTCHours(0, 0, 0, 0), s;
  }
  function P(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = E(e, t),
      r = n.getUTCFullYear(),
      a = t || {},
      o = a.locale,
      i = o && o.options && o.options.firstWeekContainsDate,
      s = null == i ? 1 : O(i),
      u = null == a.firstWeekContainsDate ? s : O(a.firstWeekContainsDate);
    if (u < 1 || 7 < u)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var c = new Date(0);
    c.setUTCFullYear(r + 1, 0, u), c.setUTCHours(0, 0, 0, 0);
    var l = q(c, t),
      p = new Date(0);
    p.setUTCFullYear(r, 0, u), p.setUTCHours(0, 0, 0, 0);
    var d = q(p, t);
    return n.getTime() < l.getTime()
      ? n.getTime() < d.getTime()
        ? r - 1
        : r
      : r + 1;
  }
  var Y = 6048e5;
  function U(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r =
        q(n, t).getTime() -
        (function(e, t) {
          if (arguments.length < 1)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var n = t || {},
            r = n.locale,
            a = r && r.options && r.options.firstWeekContainsDate,
            o = null == a ? 1 : O(a),
            i =
              null == n.firstWeekContainsDate ? o : O(n.firstWeekContainsDate),
            s = P(e, t),
            u = new Date(0);
          return u.setUTCFullYear(s, 0, i), u.setUTCHours(0, 0, 0, 0), q(u, t);
        })(n, t).getTime();
    return 1 + Math.round(r / Y);
  }
  var F = "midnight",
    W = "noon",
    I = "morning",
    L = "afternoon",
    H = "evening",
    R = "night",
    B = {
      G: function(e, t, n) {
        var r = 0 < e.getUTCFullYear() ? 1 : 0;
        switch (t) {
          case "G":
          case "GG":
          case "GGG":
            return n.era(r, { width: "abbreviated" });
          case "GGGGG":
            return n.era(r, { width: "narrow" });
          case "GGGG":
          default:
            return n.era(r, { width: "wide" });
        }
      },
      y: function(e, t, n) {
        if ("yo" !== t) return w(e, t);
        var r = e.getUTCFullYear();
        return n.ordinalNumber(0 < r ? r : 1 - r, { unit: "year" });
      },
      Y: function(e, t, n, r) {
        var a = P(e, r),
          o = 0 < a ? a : 1 - a;
        return "YY" !== t
          ? "Yo" === t
            ? n.ordinalNumber(o, { unit: "year" })
            : f(o, t.length)
          : f(o % 100, 2);
      },
      R: function(e, t) {
        return f(M(e), t.length);
      },
      u: function(e, t) {
        return f(e.getUTCFullYear(), t.length);
      },
      Q: function(e, t, n) {
        var r = Math.ceil((1 + e.getUTCMonth()) / 3);
        switch (t) {
          case "Q":
            return r + "";
          case "QQ":
            return f(r, 2);
          case "Qo":
            return n.ordinalNumber(r, { unit: "quarter" });
          case "QQQ":
            return n.quarter(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "QQQQQ":
            return n.quarter(r, { width: "narrow", context: "formatting" });
          case "QQQQ":
          default:
            return n.quarter(r, { width: "wide", context: "formatting" });
        }
      },
      q: function(e, t, n) {
        var r = Math.ceil((1 + e.getUTCMonth()) / 3);
        switch (t) {
          case "q":
            return r + "";
          case "qq":
            return f(r, 2);
          case "qo":
            return n.ordinalNumber(r, { unit: "quarter" });
          case "qqq":
            return n.quarter(r, {
              width: "abbreviated",
              context: "standalone"
            });
          case "qqqqq":
            return n.quarter(r, { width: "narrow", context: "standalone" });
          case "qqqq":
          default:
            return n.quarter(r, { width: "wide", context: "standalone" });
        }
      },
      M: function(e, t, n) {
        var r = e.getUTCMonth();
        switch (t) {
          case "M":
          case "MM":
            return y(e, t);
          case "Mo":
            return n.ordinalNumber(r + 1, { unit: "month" });
          case "MMM":
            return n.month(r, { width: "abbreviated", context: "formatting" });
          case "MMMMM":
            return n.month(r, { width: "narrow", context: "formatting" });
          case "MMMM":
          default:
            return n.month(r, { width: "wide", context: "formatting" });
        }
      },
      L: function(e, t, n) {
        var r = e.getUTCMonth();
        switch (t) {
          case "L":
            return r + 1 + "";
          case "LL":
            return f(r + 1, 2);
          case "Lo":
            return n.ordinalNumber(r + 1, { unit: "month" });
          case "LLL":
            return n.month(r, { width: "abbreviated", context: "standalone" });
          case "LLLLL":
            return n.month(r, { width: "narrow", context: "standalone" });
          case "LLLL":
          default:
            return n.month(r, { width: "wide", context: "standalone" });
        }
      },
      w: function(e, t, n, r) {
        var a = U(e, r);
        return "wo" === t
          ? n.ordinalNumber(a, { unit: "week" })
          : f(a, t.length);
      },
      I: function(e, t, n) {
        var r = x(e);
        return "Io" === t
          ? n.ordinalNumber(r, { unit: "week" })
          : f(r, t.length);
      },
      d: function(e, t, n) {
        return "do" === t
          ? n.ordinalNumber(e.getUTCDate(), { unit: "date" })
          : v(e, t);
      },
      D: function(e, t, n) {
        var r = (function(e) {
          if (arguments.length < 1)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var t = E(e),
            n = t.getTime();
          t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
          var r = t.getTime();
          return 1 + Math.floor((n - r) / 864e5);
        })(e);
        return "Do" === t
          ? n.ordinalNumber(r, { unit: "dayOfYear" })
          : f(r, t.length);
      },
      E: function(e, t, n) {
        var r = e.getUTCDay();
        switch (t) {
          case "E":
          case "EE":
          case "EEE":
            return n.day(r, { width: "abbreviated", context: "formatting" });
          case "EEEEE":
            return n.day(r, { width: "narrow", context: "formatting" });
          case "EEEEEE":
            return n.day(r, { width: "short", context: "formatting" });
          case "EEEE":
          default:
            return n.day(r, { width: "wide", context: "formatting" });
        }
      },
      e: function(e, t, n, r) {
        var a = e.getUTCDay(),
          o = (a - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "e":
            return o + "";
          case "ee":
            return f(o, 2);
          case "eo":
            return n.ordinalNumber(o, { unit: "day" });
          case "eee":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "eeeee":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "eeeeee":
            return n.day(a, { width: "short", context: "formatting" });
          case "eeee":
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      c: function(e, t, n, r) {
        var a = e.getUTCDay(),
          o = (a - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "c":
            return o + "";
          case "cc":
            return f(o, t.length);
          case "co":
            return n.ordinalNumber(o, { unit: "day" });
          case "ccc":
            return n.day(a, { width: "abbreviated", context: "standalone" });
          case "ccccc":
            return n.day(a, { width: "narrow", context: "standalone" });
          case "cccccc":
            return n.day(a, { width: "short", context: "standalone" });
          case "cccc":
          default:
            return n.day(a, { width: "wide", context: "standalone" });
        }
      },
      i: function(e, t, n) {
        var r = e.getUTCDay(),
          a = 0 === r ? 7 : r;
        switch (t) {
          case "i":
            return a + "";
          case "ii":
            return f(a, t.length);
          case "io":
            return n.ordinalNumber(a, { unit: "day" });
          case "iii":
            return n.day(r, { width: "abbreviated", context: "formatting" });
          case "iiiii":
            return n.day(r, { width: "narrow", context: "formatting" });
          case "iiiiii":
            return n.day(r, { width: "short", context: "formatting" });
          case "iiii":
          default:
            return n.day(r, { width: "wide", context: "formatting" });
        }
      },
      a: function(e, t, n) {
        var r = e.getUTCHours() / 12 < 1 ? "am" : "pm";
        switch (t) {
          case "a":
          case "aa":
          case "aaa":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "aaaaa":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "aaaa":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      b: function(e, t, n) {
        var r,
          a = e.getUTCHours();
        switch (
          ((r = 12 === a ? W : 0 === a ? F : a / 12 < 1 ? "am" : "pm"), t)
        ) {
          case "b":
          case "bb":
          case "bbb":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "bbbbb":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "bbbb":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      B: function(e, t, n) {
        var r,
          a = e.getUTCHours();
        switch (((r = a < 17 ? (a < 12 ? (a < 4 ? R : I) : L) : H), t)) {
          case "B":
          case "BB":
          case "BBB":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "BBBBB":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "BBBB":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      h: function(e, t, n) {
        if ("ho" !== t) return b(e, t);
        var r = e.getUTCHours() % 12;
        return 0 === r && (r = 12), n.ordinalNumber(r, { unit: "hour" });
      },
      H: function(e, t, n) {
        return "Ho" === t
          ? n.ordinalNumber(e.getUTCHours(), { unit: "hour" })
          : D(e, t);
      },
      K: function(e, t, n) {
        var r = e.getUTCHours() % 12;
        return "Ko" === t
          ? n.ordinalNumber(r, { unit: "hour" })
          : f(r, t.length);
      },
      k: function(e, t, n) {
        var r = e.getUTCHours();
        return (
          0 === r && (r = 24),
          "ko" === t ? n.ordinalNumber(r, { unit: "hour" }) : f(r, t.length)
        );
      },
      m: function(e, t, n) {
        return "mo" === t
          ? n.ordinalNumber(e.getUTCMinutes(), { unit: "minute" })
          : C(e, t);
      },
      s: function(e, t, n) {
        return "so" === t
          ? n.ordinalNumber(e.getUTCSeconds(), { unit: "second" })
          : k(e, t);
      },
      S: function(e, t) {
        var n = t.length,
          r = e.getUTCMilliseconds();
        return f(Math.floor(r * Math.pow(10, n - 3)), n);
      },
      X: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        if (0 === a) return "Z";
        switch (t) {
          case "X":
            return Q(a);
          case "XXXX":
          case "XX":
            return X(a);
          case "XXXXX":
          case "XXX":
          default:
            return X(a, ":");
        }
      },
      x: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "x":
            return Q(a);
          case "xxxx":
          case "xx":
            return X(a);
          case "xxxxx":
          case "xxx":
          default:
            return X(a, ":");
        }
      },
      O: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + j(a, ":");
          case "OOOO":
          default:
            return "GMT" + X(a, ":");
        }
      },
      z: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + j(a, ":");
          case "zzzz":
          default:
            return "GMT" + X(a, ":");
        }
      },
      t: function(e, t, n, r) {
        return f(Math.floor((r._originalDate || e).getTime() / 1e3), t.length);
      },
      T: function(e, t, n, r) {
        return f((r._originalDate || e).getTime(), t.length);
      }
    };
  function j(e, t) {
    var n = 0 < e ? "-" : "+",
      r = Math.abs(e),
      a = Math.floor(r / 60),
      o = r % 60;
    return 0 === o ? n + (a + "") : n + (a + "") + (t || "") + f(o, 2);
  }
  function Q(e, t) {
    return e % 60 != 0 ? X(e, t) : (0 < e ? "-" : "+") + f(Math.abs(e) / 60, 2);
  }
  function X(e, t) {
    var n = t || "",
      r = 0 < e ? "-" : "+",
      a = Math.abs(e);
    return r + f(Math.floor(a / 60), 2) + n + f(a % 60, 2);
  }
  function A(e, t) {
    switch (e) {
      case "P":
        return t.date({ width: "short" });
      case "PP":
        return t.date({ width: "medium" });
      case "PPP":
        return t.date({ width: "long" });
      case "PPPP":
      default:
        return t.date({ width: "full" });
    }
  }
  function G(e, t) {
    switch (e) {
      case "p":
        return t.time({ width: "short" });
      case "pp":
        return t.time({ width: "medium" });
      case "ppp":
        return t.time({ width: "long" });
      case "pppp":
      default:
        return t.time({ width: "full" });
    }
  }
  var K = {
    p: G,
    P: function(e, t) {
      var n,
        r = e.match(/(P+)(p+)?/),
        a = r[1],
        o = r[2];
      if (!o) return A(e, t);
      switch (a) {
        case "P":
          n = t.dateTime({ width: "short" });
          break;
        case "PP":
          n = t.dateTime({ width: "medium" });
          break;
        case "PPP":
          n = t.dateTime({ width: "long" });
          break;
        case "PPPP":
        default:
          n = t.dateTime({ width: "full" });
      }
      return n.replace("{{date}}", A(a, t)).replace("{{time}}", G(o, t));
    }
  };
  function V(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e).getTime(),
      r = O(t);
    return new Date(n + r);
  }
  function z(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return V(e, -O(t));
  }
  var J = ["D", "DD", "YY", "YYYY"];
  function Z(e) {
    return -1 != J.indexOf(e);
  }
  function $(e) {
    throw new RangeError(
      "`options.awareOfUnicodeTokens` must be set to `true` to use `" +
        e +
        "` token; see: https://git.io/fxCyr"
    );
  }
  var ee = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    te = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    ne = /^'(.*?)'?$/,
    re = /''/g;
  function ae(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = t + "",
      a = n || {},
      o = a.locale || _,
      i = o.options && o.options.firstWeekContainsDate,
      s = null == i ? 1 : O(i),
      u = null == a.firstWeekContainsDate ? s : O(a.firstWeekContainsDate);
    if (u < 1 || 7 < u)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var c = o.options && o.options.weekStartsOn,
      l = null == c ? 0 : O(c),
      p = null == a.weekStartsOn ? l : O(a.weekStartsOn);
    if (p < 0 || 6 < p)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if (!o.localize)
      throw new RangeError("locale must contain localize property");
    if (!o.formatLong)
      throw new RangeError("locale must contain formatLong property");
    var d = E(e);
    if (!g(d)) throw new RangeError("Invalid time value");
    var h = z(d, N(d)),
      f = {
        firstWeekContainsDate: u,
        weekStartsOn: p,
        locale: o,
        _originalDate: d
      };
    return r
      .match(te)
      .map(function(e) {
        var t = e[0];
        return "p" !== t && "P" !== t ? e : (0, K[t])(e, o.formatLong, f);
      })
      .join("")
      .match(ee)
      .map(function(e) {
        if ("''" === e) return "'";
        var t = e[0];
        if ("'" === t) return e.match(ne)[1].replace(re, "'");
        var n = B[t];
        return n
          ? (!a.awareOfUnicodeTokens && Z(e) && $(e), n(h, e, o.localize, f))
          : e;
      })
      .join("");
  }
  var oe = 6e4;
  function ie(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return V(e, O(t) * oe);
  }
  var se = 36e5;
  function ue(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return V(e, O(t) * se);
  }
  function ce(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = O(t);
    return n.setDate(n.getDate() + r), n;
  }
  function le(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return ce(e, 7 * O(t));
  }
  function pe(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var t = E(e),
      n = t.getFullYear(),
      r = t.getMonth(),
      a = new Date(0);
    return a.setFullYear(n, r + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
  }
  function de(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = O(t),
      a = n.getMonth() + r,
      o = new Date(0);
    o.setFullYear(n.getFullYear(), a, 1), o.setHours(0, 0, 0, 0);
    var i = pe(o);
    return n.setMonth(a, Math.min(i, n.getDate())), n;
  }
  function he(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return de(e, 12 * O(t));
  }
  function fe(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return de(e, -O(t));
  }
  function me(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return E(e).getMinutes();
  }
  function ge(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return E(e).getHours();
  }
  function we(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return E(e).getDate();
  }
  function ye(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return E(e).getMonth();
  }
  function ve(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return E(e).getFullYear();
  }
  function be(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return E(e).getTime();
  }
  function De(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = O(t);
    return n.setMinutes(r), n;
  }
  function Ce(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = O(t);
    return n.setHours(r), n;
  }
  function ke(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = O(t),
      a = n.getFullYear(),
      o = n.getDate(),
      i = new Date(0);
    i.setFullYear(a, r, 15), i.setHours(0, 0, 0, 0);
    var s = pe(i);
    return n.setMonth(r, Math.min(o, s)), n;
  }
  function Te(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = O(t);
    return isNaN(n) ? new Date(NaN) : (n.setFullYear(r), n);
  }
  function Me(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n;
    return (
      (null == e
        ? []
        : "function" == typeof e.forEach
        ? e
        : Array.prototype.slice.call(e)
      ).forEach(function(e) {
        var t = E(e);
        (void 0 === n || t < n || isNaN(t)) && (n = t);
      }),
      n
    );
  }
  function Se(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n;
    return (
      (null == e
        ? []
        : "function" == typeof e.forEach
        ? e
        : Array.prototype.slice.call(e)
      ).forEach(function(e) {
        var t = E(e);
        (void 0 === n || n < t || isNaN(t)) && (n = t);
      }),
      n
    );
  }
  function xe(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var t = E(e);
    return t.setHours(0, 0, 0, 0), t;
  }
  var Ee = 864e5;
  function Oe(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = xe(e),
      r = xe(t),
      a = n.getTime() - N(n),
      o = r.getTime() - N(r);
    return Math.round((a - o) / Ee);
  }
  function Ne(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = E(t);
    return (
      12 * (n.getFullYear() - r.getFullYear()) + (n.getMonth() - r.getMonth())
    );
  }
  function _e(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = t || {},
      r = n.locale,
      a = r && r.options && r.options.weekStartsOn,
      o = null == a ? 0 : O(a),
      i = null == n.weekStartsOn ? o : O(n.weekStartsOn);
    if (i < 0 || 6 < i)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var s = E(e),
      u = s.getDay(),
      c = (u < i ? 7 : 0) + u - i;
    return s.setDate(s.getDate() - c), s.setHours(0, 0, 0, 0), s;
  }
  var qe = 6048e5;
  function Pe(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = E(t);
    return n.getTime() == r.getTime();
  }
  function Ye(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = E(t);
    return n.getTime() > r.getTime();
  }
  function Ue(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = E(e),
      r = E(t);
    return n.getTime() < r.getTime();
  }
  function Fe(e, t) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var n = t || {},
      r = E(e).getTime(),
      a = E(n.start).getTime(),
      o = E(n.end).getTime();
    if (a > o) throw new RangeError("Invalid interval");
    return a <= r && r <= o;
  }
  function We(e, t) {
    if (null == e)
      throw new TypeError(
        "assign requires that input parameter not be null or undefined"
      );
    for (var n in (t = t || {})) t.hasOwnProperty(n) && (e[n] = t[n]);
    return e;
  }
  function Ie(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = n || {},
      a = r.locale,
      o = a && a.options && a.options.weekStartsOn,
      i = null == o ? 0 : O(o),
      s = null == r.weekStartsOn ? i : O(r.weekStartsOn);
    if (s < 0 || 6 < s)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var u = E(e),
      c = O(t),
      l = (((c % 7) + 7) % 7 < s ? 7 : 0) + c - u.getUTCDay();
    return u.setUTCDate(u.getUTCDate() + l), u;
  }
  var Le = /^(1[0-2]|0?\d)/,
    He = /^(3[0-1]|[0-2]?\d)/,
    Re = /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
    Be = /^(5[0-3]|[0-4]?\d)/,
    je = /^(2[0-3]|[0-1]?\d)/,
    Qe = /^(2[0-4]|[0-1]?\d)/,
    Xe = /^(1[0-1]|0?\d)/,
    Ae = /^(1[0-2]|0?\d)/,
    Ge = /^[0-5]?\d/,
    Ke = /^[0-5]?\d/,
    Ve = /^\d/,
    ze = /^\d{1,2}/,
    Je = /^\d{1,3}/,
    Ze = /^\d{1,4}/,
    $e = /^-?\d+/,
    et = /^-?\d/,
    tt = /^-?\d{1,2}/,
    nt = /^-?\d{1,3}/,
    rt = /^-?\d{1,4}/,
    at = /^([+-])(\d{2})(\d{2})?|Z/,
    ot = /^([+-])(\d{2})(\d{2})|Z/,
    it = /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    st = /^([+-])(\d{2}):(\d{2})|Z/,
    ut = /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/;
  function ct(e, t, n) {
    var r = t.match(e);
    if (!r) return null;
    var a = parseInt(r[0], 10);
    return { value: n ? n(a) : a, rest: t.slice(r[0].length) };
  }
  function lt(e, t) {
    var n = t.match(e);
    return n
      ? "Z" === n[0]
        ? { value: 0, rest: t.slice(1) }
        : {
            value:
              ("+" === n[1] ? 1 : -1) *
              (36e5 * (n[2] ? parseInt(n[2], 10) : 0) +
                6e4 * (n[3] ? parseInt(n[3], 10) : 0) +
                1e3 * (n[5] ? parseInt(n[5], 10) : 0)),
            rest: t.slice(n[0].length)
          }
      : null;
  }
  function pt(e, t) {
    return ct($e, e, t);
  }
  function dt(e, t, n) {
    switch (e) {
      case 1:
        return ct(Ve, t, n);
      case 2:
        return ct(ze, t, n);
      case 3:
        return ct(Je, t, n);
      case 4:
        return ct(Ze, t, n);
      default:
        return ct(RegExp("^\\d{1," + e + "}"), t, n);
    }
  }
  function ht(e, t, n) {
    switch (e) {
      case 1:
        return ct(et, t, n);
      case 2:
        return ct(tt, t, n);
      case 3:
        return ct(nt, t, n);
      case 4:
        return ct(rt, t, n);
      default:
        return ct(RegExp("^-?\\d{1," + e + "}"), t, n);
    }
  }
  function ft(e) {
    switch (e) {
      case "morning":
        return 4;
      case "evening":
        return 17;
      case "pm":
      case "noon":
      case "afternoon":
        return 12;
      case "am":
      case "midnight":
      case "night":
      default:
        return 0;
    }
  }
  function mt(e, t) {
    var n,
      r = 0 < t,
      a = r ? t : 1 - t;
    if (a > 50) {
      var o = a + 50;
      n = e + 100 * Math.floor(o / 100) - (o % 100 <= e ? 100 : 0);
    } else n = e || 100;
    return r ? n : 1 - n;
  }
  var gt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    wt = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function yt(e) {
    return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
  }
  var vt = {
      G: {
        priority: 140,
        parse: function(e, t, n, r) {
          switch (t) {
            case "G":
            case "GG":
            case "GGG":
              return (
                n.era(e, { width: "abbreviated" }) ||
                n.era(e, { width: "narrow" })
              );
            case "GGGGG":
              return n.era(e, { width: "narrow" });
            case "GGGG":
            default:
              return (
                n.era(e, { width: "wide" }) ||
                n.era(e, { width: "abbreviated" }) ||
                n.era(e, { width: "narrow" })
              );
          }
        },
        set: function(e, t, n, r) {
          return (
            e.setUTCFullYear(1 === n ? 10 : -9, 0, 1),
            e.setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      y: {
        priority: 130,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return { year: e, isTwoDigitYear: "yy" === t };
          };
          switch (t) {
            case "y":
              return dt(4, e, a);
            case "yo":
              return n.ordinalNumber(e, { unit: "year", valueCallback: a });
            default:
              return dt(t.length, e, a);
          }
        },
        validate: function(e, t, n) {
          return t.isTwoDigitYear || 0 < t.year;
        },
        set: function(e, t, n, r) {
          var a = P(e, r);
          if (n.isTwoDigitYear) {
            var o = mt(n.year, a);
            return e.setUTCFullYear(o, 0, 1), e.setUTCHours(0, 0, 0, 0), e;
          }
          return (
            e.setUTCFullYear(0 < a ? n.year : 1 - n.year, 0, 1),
            e.setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      Y: {
        priority: 130,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return { year: e, isTwoDigitYear: "YY" === t };
          };
          switch (t) {
            case "Y":
              return dt(4, e, a);
            case "Yo":
              return n.ordinalNumber(e, { unit: "year", valueCallback: a });
            default:
              return dt(t.length, e, a);
          }
        },
        validate: function(e, t, n) {
          return t.isTwoDigitYear || 0 < t.year;
        },
        set: function(e, t, n, r) {
          var a = e.getUTCFullYear();
          if (n.isTwoDigitYear) {
            var o = mt(n.year, a);
            return (
              e.setUTCFullYear(o, 0, r.firstWeekContainsDate),
              e.setUTCHours(0, 0, 0, 0),
              q(e, r)
            );
          }
          return (
            e.setUTCFullYear(
              0 < a ? n.year : 1 - n.year,
              0,
              r.firstWeekContainsDate
            ),
            e.setUTCHours(0, 0, 0, 0),
            q(e, r)
          );
        }
      },
      R: {
        priority: 130,
        parse: function(e, t, n, r) {
          return ht("R" === t ? 4 : t.length, e);
        },
        set: function(e, t, n, r) {
          var a = new Date(0);
          return a.setUTCFullYear(n, 0, 4), a.setUTCHours(0, 0, 0, 0), T(a);
        }
      },
      u: {
        priority: 130,
        parse: function(e, t, n, r) {
          return ht("u" === t ? 4 : t.length, e);
        },
        set: function(e, t, n, r) {
          return e.setUTCFullYear(n, 0, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      Q: {
        priority: 120,
        parse: function(e, t, n, r) {
          switch (t) {
            case "Q":
            case "QQ":
              return dt(t.length, e);
            case "Qo":
              return n.ordinalNumber(e, { unit: "quarter" });
            case "QQQ":
              return (
                n.quarter(e, { width: "abbreviated", context: "formatting" }) ||
                n.quarter(e, { width: "narrow", context: "formatting" })
              );
            case "QQQQQ":
              return n.quarter(e, { width: "narrow", context: "formatting" });
            case "QQQQ":
            default:
              return (
                n.quarter(e, { width: "wide", context: "formatting" }) ||
                n.quarter(e, { width: "abbreviated", context: "formatting" }) ||
                n.quarter(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 4;
        },
        set: function(e, t, n, r) {
          return e.setUTCMonth(3 * (n - 1), 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      q: {
        priority: 120,
        parse: function(e, t, n, r) {
          switch (t) {
            case "q":
            case "qq":
              return dt(t.length, e);
            case "qo":
              return n.ordinalNumber(e, { unit: "quarter" });
            case "qqq":
              return (
                n.quarter(e, { width: "abbreviated", context: "standalone" }) ||
                n.quarter(e, { width: "narrow", context: "standalone" })
              );
            case "qqqqq":
              return n.quarter(e, { width: "narrow", context: "standalone" });
            case "qqqq":
            default:
              return (
                n.quarter(e, { width: "wide", context: "standalone" }) ||
                n.quarter(e, { width: "abbreviated", context: "standalone" }) ||
                n.quarter(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 4;
        },
        set: function(e, t, n, r) {
          return e.setUTCMonth(3 * (n - 1), 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      M: {
        priority: 110,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return e - 1;
          };
          switch (t) {
            case "M":
              return ct(Le, e, a);
            case "MM":
              return dt(2, e, a);
            case "Mo":
              return n.ordinalNumber(e, { unit: "month", valueCallback: a });
            case "MMM":
              return (
                n.month(e, { width: "abbreviated", context: "formatting" }) ||
                n.month(e, { width: "narrow", context: "formatting" })
              );
            case "MMMMM":
              return n.month(e, { width: "narrow", context: "formatting" });
            case "MMMM":
            default:
              return (
                n.month(e, { width: "wide", context: "formatting" }) ||
                n.month(e, { width: "abbreviated", context: "formatting" }) ||
                n.month(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 11;
        },
        set: function(e, t, n, r) {
          return e.setUTCMonth(n, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      L: {
        priority: 110,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return e - 1;
          };
          switch (t) {
            case "L":
              return ct(Le, e, a);
            case "LL":
              return dt(2, e, a);
            case "Lo":
              return n.ordinalNumber(e, { unit: "month", valueCallback: a });
            case "LLL":
              return (
                n.month(e, { width: "abbreviated", context: "standalone" }) ||
                n.month(e, { width: "narrow", context: "standalone" })
              );
            case "LLLLL":
              return n.month(e, { width: "narrow", context: "standalone" });
            case "LLLL":
            default:
              return (
                n.month(e, { width: "wide", context: "standalone" }) ||
                n.month(e, { width: "abbreviated", context: "standalone" }) ||
                n.month(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 11;
        },
        set: function(e, t, n, r) {
          return e.setUTCMonth(n, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      w: {
        priority: 100,
        parse: function(e, t, n, r) {
          switch (t) {
            case "w":
              return ct(Be, e);
            case "wo":
              return n.ordinalNumber(e, { unit: "week" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 53;
        },
        set: function(e, t, n, r) {
          return q(
            (function(e, t, n) {
              if (arguments.length < 2)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var r = E(e),
                a = O(t),
                o = U(r, n) - a;
              return r.setUTCDate(r.getUTCDate() - 7 * o), r;
            })(e, n, r),
            r
          );
        }
      },
      I: {
        priority: 100,
        parse: function(e, t, n, r) {
          switch (t) {
            case "I":
              return ct(Be, e);
            case "Io":
              return n.ordinalNumber(e, { unit: "week" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 53;
        },
        set: function(e, t, n, r) {
          return T(
            (function(e, t) {
              if (arguments.length < 2)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var n = E(e),
                r = O(t),
                a = x(n) - r;
              return n.setUTCDate(n.getUTCDate() - 7 * a), n;
            })(e, n, r),
            r
          );
        }
      },
      d: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "d":
              return ct(He, e);
            case "do":
              return n.ordinalNumber(e, { unit: "date" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          var r = yt(e.getUTCFullYear()),
            a = e.getUTCMonth();
          return r ? 1 <= t && t <= wt[a] : 1 <= t && t <= gt[a];
        },
        set: function(e, t, n, r) {
          return e.setUTCDate(n), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      D: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "D":
            case "DD":
              return ct(Re, e);
            case "Do":
              return n.ordinalNumber(e, { unit: "date" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return yt(e.getUTCFullYear())
            ? 1 <= t && t <= 366
            : 1 <= t && t <= 365;
        },
        set: function(e, t, n, r) {
          return e.setUTCMonth(0, n), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      E: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "E":
            case "EE":
            case "EEE":
              return (
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "EEEEE":
              return n.day(e, { width: "narrow", context: "formatting" });
            case "EEEEEE":
              return (
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "EEEE":
            default:
              return (
                n.day(e, { width: "wide", context: "formatting" }) ||
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 6;
        },
        set: function(e, t, n, r) {
          return (e = Ie(e, n, r)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      e: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return ((e + r.weekStartsOn + 6) % 7) + 7 * Math.floor((e - 1) / 7);
          };
          switch (t) {
            case "e":
            case "ee":
              return dt(t.length, e, a);
            case "eo":
              return n.ordinalNumber(e, { unit: "day", valueCallback: a });
            case "eee":
              return (
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "eeeee":
              return n.day(e, { width: "narrow", context: "formatting" });
            case "eeeeee":
              return (
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "eeee":
            default:
              return (
                n.day(e, { width: "wide", context: "formatting" }) ||
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 6;
        },
        set: function(e, t, n, r) {
          return (e = Ie(e, n, r)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      c: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return ((e + r.weekStartsOn + 6) % 7) + 7 * Math.floor((e - 1) / 7);
          };
          switch (t) {
            case "c":
            case "cc":
              return dt(t.length, e, a);
            case "co":
              return n.ordinalNumber(e, { unit: "day", valueCallback: a });
            case "ccc":
              return (
                n.day(e, { width: "abbreviated", context: "standalone" }) ||
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
            case "ccccc":
              return n.day(e, { width: "narrow", context: "standalone" });
            case "cccccc":
              return (
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
            case "cccc":
            default:
              return (
                n.day(e, { width: "wide", context: "standalone" }) ||
                n.day(e, { width: "abbreviated", context: "standalone" }) ||
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 6;
        },
        set: function(e, t, n, r) {
          return (e = Ie(e, n, r)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      i: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return 0 === e ? 7 : e;
          };
          switch (t) {
            case "i":
            case "ii":
              return dt(t.length, e);
            case "io":
              return n.ordinalNumber(e, { unit: "day" });
            case "iii":
              return (
                n.day(e, {
                  width: "abbreviated",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
            case "iiiii":
              return n.day(e, {
                width: "narrow",
                context: "formatting",
                valueCallback: a
              });
            case "iiiiii":
              return (
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
            case "iiii":
            default:
              return (
                n.day(e, {
                  width: "wide",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "abbreviated",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 7;
        },
        set: function(e, t, n, r) {
          return (
            (e = (function(e, t) {
              if (arguments.length < 2)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var n = O(t);
              n % 7 == 0 && (n -= 7);
              var r = E(e),
                a = (((n % 7) + 7) % 7 < 1 ? 7 : 0) + n - r.getUTCDay();
              return r.setUTCDate(r.getUTCDate() + a), r;
            })(e, n, r)).setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      a: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "a":
            case "aa":
            case "aaa":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "aaaaa":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "aaaa":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n, r) {
          return e.setUTCHours(ft(n), 0, 0, 0), e;
        }
      },
      b: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "b":
            case "bb":
            case "bbb":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "bbbbb":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "bbbb":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n, r) {
          return e.setUTCHours(ft(n), 0, 0, 0), e;
        }
      },
      B: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "B":
            case "BB":
            case "BBB":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "BBBBB":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "BBBB":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n, r) {
          return e.setUTCHours(ft(n), 0, 0, 0), e;
        }
      },
      h: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "h":
              return ct(Ae, e);
            case "ho":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 12;
        },
        set: function(e, t, n, r) {
          var a = 12 <= e.getUTCHours();
          return (
            e.setUTCHours(
              a && n < 12 ? n + 12 : a || 12 !== n ? n : 0,
              0,
              0,
              0
            ),
            e
          );
        }
      },
      H: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "H":
              return ct(je, e);
            case "Ho":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 23;
        },
        set: function(e, t, n, r) {
          return e.setUTCHours(n, 0, 0, 0), e;
        }
      },
      K: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "K":
              return ct(Xe, e);
            case "Ko":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 11;
        },
        set: function(e, t, n, r) {
          var a = 12 <= e.getUTCHours();
          return e.setUTCHours(a && n < 12 ? n + 12 : n, 0, 0, 0), e;
        }
      },
      k: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "k":
              return ct(Qe, e);
            case "ko":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 24;
        },
        set: function(e, t, n, r) {
          return e.setUTCHours(24 < n ? n : n % 24, 0, 0, 0), e;
        }
      },
      m: {
        priority: 60,
        parse: function(e, t, n, r) {
          switch (t) {
            case "m":
              return ct(Ge, e);
            case "mo":
              return n.ordinalNumber(e, { unit: "minute" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 59;
        },
        set: function(e, t, n, r) {
          return e.setUTCMinutes(n, 0, 0), e;
        }
      },
      s: {
        priority: 50,
        parse: function(e, t, n, r) {
          switch (t) {
            case "s":
              return ct(Ke, e);
            case "so":
              return n.ordinalNumber(e, { unit: "second" });
            default:
              return dt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 59;
        },
        set: function(e, t, n, r) {
          return e.setUTCSeconds(n, 0), e;
        }
      },
      S: {
        priority: 30,
        parse: function(e, t, n, r) {
          return dt(t.length, e, function(e) {
            return Math.floor(e * Math.pow(10, 3 - t.length));
          });
        },
        set: function(e, t, n, r) {
          return e.setUTCMilliseconds(n), e;
        }
      },
      X: {
        priority: 10,
        parse: function(e, t, n, r) {
          switch (t) {
            case "X":
              return lt(at, e);
            case "XX":
              return lt(ot, e);
            case "XXXX":
              return lt(it, e);
            case "XXXXX":
              return lt(ut, e);
            case "XXX":
            default:
              return lt(st, e);
          }
        },
        set: function(e, t, n, r) {
          return t.timestampIsSet ? e : new Date(e.getTime() - n);
        }
      },
      x: {
        priority: 10,
        parse: function(e, t, n, r) {
          switch (t) {
            case "x":
              return lt(at, e);
            case "xx":
              return lt(ot, e);
            case "xxxx":
              return lt(it, e);
            case "xxxxx":
              return lt(ut, e);
            case "xxx":
            default:
              return lt(st, e);
          }
        },
        set: function(e, t, n, r) {
          return t.timestampIsSet ? e : new Date(e.getTime() - n);
        }
      },
      t: {
        priority: 40,
        parse: function(e, t, n, r) {
          return pt(e);
        },
        set: function(e, t, n, r) {
          return [new Date(1e3 * n), { timestampIsSet: !0 }];
        }
      },
      T: {
        priority: 20,
        parse: function(e, t, n, r) {
          return pt(e);
        },
        set: function(e, t, n, r) {
          return [new Date(n), { timestampIsSet: !0 }];
        }
      }
    },
    bt = 10,
    Dt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    Ct = /^'(.*?)'?$/,
    kt = /''/g,
    Tt = /\S/;
  function Mt(e, t, n, r) {
    if (arguments.length < 3)
      throw new TypeError(
        "3 arguments required, but only " + arguments.length + " present"
      );
    var a = e + "",
      o = t + "",
      i = r || {},
      s = i.locale || _;
    if (!s.match) throw new RangeError("locale must contain match property");
    var u = s.options && s.options.firstWeekContainsDate,
      c = null == u ? 1 : O(u),
      l = null == i.firstWeekContainsDate ? c : O(i.firstWeekContainsDate);
    if (l < 1 || 7 < l)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var p = s.options && s.options.weekStartsOn,
      d = null == p ? 0 : O(p),
      h = null == i.weekStartsOn ? d : O(i.weekStartsOn);
    if (h < 0 || 6 < h)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if ("" === o) return "" === a ? E(n) : new Date(NaN);
    var f,
      m = { firstWeekContainsDate: l, weekStartsOn: h, locale: s },
      g = [{ priority: bt, set: St, index: 0 }],
      w = o.match(Dt);
    for (f = 0; f < w.length; f++) {
      var y = w[f];
      !i.awareOfUnicodeTokens && Z(y) && $(y);
      var v = y[0],
        b = vt[v];
      if (b) {
        var D = b.parse(a, y, s.match, m);
        if (!D) return new Date(NaN);
        g.push({
          priority: b.priority,
          set: b.set,
          validate: b.validate,
          value: D.value,
          index: g.length
        }),
          (a = D.rest);
      } else {
        if (
          ("''" === y
            ? (y = "'")
            : "'" === v && (y = y.match(Ct)[1].replace(kt, "'")),
          0 != a.indexOf(y))
        )
          return new Date(NaN);
        a = a.slice(y.length);
      }
    }
    if (0 < a.length && Tt.test(a)) return new Date(NaN);
    var C = g
        .map(function(e) {
          return e.priority;
        })
        .sort(function(e, t) {
          return t - e;
        })
        .filter(function(e, t, n) {
          return n.indexOf(e) === t;
        })
        .map(function(t) {
          return g
            .filter(function(e) {
              return e.priority === t;
            })
            .reverse();
        })
        .map(function(e) {
          return e[0];
        }),
      k = E(n);
    if (isNaN(k)) return new Date(NaN);
    var T = z(k, N(k)),
      M = {};
    for (f = 0; f < C.length; f++) {
      var S = C[f];
      if (S.validate && !S.validate(T, S.value, m)) return new Date(NaN);
      var x = S.set(T, M, S.value, m);
      x[0] ? ((T = x[0]), We(M, x[1])) : (T = x);
    }
    return T;
  }
  function St(e, t) {
    if (t.timestampIsSet) return e;
    var n = new Date(0);
    return (
      n.setFullYear(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()),
      n.setHours(
        e.getUTCHours(),
        e.getUTCMinutes(),
        e.getUTCSeconds(),
        e.getUTCMilliseconds()
      ),
      n
    );
  }
  var xt =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(e) {
            return typeof e;
          }
        : function(e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          },
    Et = function(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    Ot = (function() {
      function r(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e;
      };
    })(),
    Nt =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      },
    _t = function(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    },
    qt = function(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    };
  function Pt(e) {
    var t = e ? E(e) : new Date();
    return Yt(t) ? t : null;
  }
  function Yt(e) {
    return g(e) && Ye(e, new Date("1/1/1000"));
  }
  function Ut(e, t, n) {
    if ("en" === n) return ae(e, t, { awareOfUnicodeTokens: !0 });
    var r = Xt(n);
    return (
      n &&
        !r &&
        console.warn(
          'A locale object was not found for the provided string ["' + n + '"].'
        ),
      !r && Qt() && Xt(Qt()) && (r = Xt(Qt())),
      ae(e, t, { locale: r || null, awareOfUnicodeTokens: !0 })
    );
  }
  function Ft(e, t) {
    var n = t.hour,
      r = void 0 === n ? 0 : n,
      a = t.minute,
      o = void 0 === a ? 0 : a,
      i = t.second;
    return Ce(
      De(
        (function(e, t) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var n = E(e),
            r = O(t);
          return n.setSeconds(r), n;
        })(e, void 0 === i ? 0 : i),
        o
      ),
      r
    );
  }
  function Wt(e) {
    !(function(e, t) {
      if (arguments.length < 2)
        throw new TypeError(
          "2 arguments required, but only " + arguments.length + " present"
        );
      var n = E(e),
        r = O(t);
      n.setMonth(0), n.setDate(r);
    })(e, 1);
    return Ht(
      (function(e, t) {
        if (arguments.length < 1)
          throw new TypeError(
            "1 argument required, but only " + arguments.length + " present"
          );
        var n = t || {},
          r = n.locale,
          a = r && r.options && r.options.weekStartsOn,
          o = null == a ? 0 : O(a),
          i = null == n.weekStartsOn ? o : O(n.weekStartsOn);
        if (i < 0 || 6 < i)
          throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
          );
        var s = E(e),
          u = s.getDay(),
          c = 6 + (u < i ? -7 : 0) - (u - i);
        return s.setDate(s.getDate() + c), s.setHours(23, 59, 59, 999), s;
      })(e),
      e
    )
      ? (function(e, t, n) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = _e(e, n),
            a = _e(t, n),
            o = r.getTime() - N(r),
            i = a.getTime() - N(a);
          return Math.round((o - i) / qe);
        })(
          e,
          (function(e) {
            if (arguments.length < 1)
              throw new TypeError(
                "1 argument required, but only " + arguments.length + " present"
              );
            var t = E(e),
              n = new Date(0);
            return (
              n.setFullYear(t.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n
            );
          })(e)
        ) + 1
      : 1;
  }
  function It(e, t) {
    return _e(e, { locale: Xt(t || Qt()) });
  }
  function Lt(e) {
    return (function(e) {
      if (arguments.length < 1)
        throw new TypeError(
          "1 argument required, but only " + arguments.length + " present"
        );
      var t = E(e);
      return t.setDate(1), t.setHours(0, 0, 0, 0), t;
    })(e);
  }
  function Ht(e, t) {
    return e && t
      ? (function(e, t) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var n = E(e),
            r = E(t);
          return n.getFullYear() == r.getFullYear();
        })(e, t)
      : !e && !t;
  }
  function Rt(e, t) {
    return e && t
      ? (function(e, t) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var n = E(e),
            r = E(t);
          return (
            n.getFullYear() == r.getFullYear() && n.getMonth() == r.getMonth()
          );
        })(e, t)
      : !e && !t;
  }
  function Bt(e, t) {
    return e && t
      ? (function(e, t) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var n = xe(e),
            r = xe(t);
          return n.getTime() == r.getTime();
        })(e, t)
      : !e && !t;
  }
  function jt(e, t, n) {
    var r = void 0;
    try {
      r = Fe(e, { start: t, end: n });
    } catch (e) {
      r = !1;
    }
    return r;
  }
  function Qt() {
    return window.__localeId__;
  }
  function Xt(e) {
    return window.__localeData__ ? window.__localeData__[e] : null;
  }
  function At(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = e.excludeDates,
      r = e.includeDates,
      a = e.filterDate;
    return (
      Gt(t, { minDate: e.minDate, maxDate: e.maxDate }) ||
      (n &&
        n.some(function(e) {
          return Bt(t, e);
        })) ||
      (r &&
        !r.some(function(e) {
          return Bt(t, e);
        })) ||
      (a && !a(Pt(t))) ||
      !1
    );
  }
  function Gt(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.minDate,
      r = t.maxDate;
    return (n && Oe(e, n) < 0) || (r && 0 < Oe(e, r));
  }
  function Kt(e, t) {
    for (var n = t.length, r = 0; r < n; r++)
      if (ge(t[r]) === ge(e) && me(t[r]) === me(e)) return !0;
    return !1;
  }
  function Vt(e, t) {
    var n = t.minTime,
      r = t.maxTime;
    if (!n || !r) throw Error("Both minTime and maxTime props required");
    var a = Pt(),
      o = Ce(De(a, me(e)), ge(e)),
      i = Ce(De(a, me(n)), ge(n)),
      s = Ce(De(a, me(r)), ge(r)),
      u = void 0;
    try {
      u = !Fe(o, { start: i, end: s });
    } catch (e) {
      u = !1;
    }
    return u;
  }
  function zt(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.minDate,
      r = t.includeDates,
      a = fe(e, 1);
    return (
      (n && 0 < Ne(n, a)) ||
      (r &&
        r.every(function(e) {
          return 0 < Ne(e, a);
        })) ||
      !1
    );
  }
  function Jt(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.maxDate,
      r = t.includeDates,
      a = de(e, 1);
    return (
      (n && 0 < Ne(a, n)) ||
      (r &&
        r.every(function(e) {
          return 0 < Ne(a, e);
        })) ||
      !1
    );
  }
  function Zt(e) {
    var t = e.minDate,
      n = e.includeDates;
    return n && t
      ? Me(
          n.filter(function(e) {
            return 0 <= Oe(e, t);
          })
        )
      : n
      ? Me(n)
      : t;
  }
  function $t(e) {
    var t = e.maxDate,
      n = e.includeDates;
    return n && t
      ? Se(
          n.filter(function(e) {
            return Oe(e, t) <= 0;
          })
        )
      : n
      ? Se(n)
      : t;
  }
  function en() {
    for (
      var e =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [],
        t =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : "react-datepicker__day--highlighted",
        n = new Map(),
        r = 0,
        a = e.length;
      r < a;
      r++
    ) {
      var o = e[r];
      if (m(o)) {
        var i = Ut(o, "MM.dd.yyyy"),
          s = n.get(i) || [];
        s.includes(t) || (s.push(t), n.set(i, s));
      } else if ("object" === (void 0 === o ? "undefined" : xt(o))) {
        var u = Object.keys(o),
          c = u[0],
          l = o[u[0]];
        if ("string" == typeof c && l.constructor === Array)
          for (var p = 0, d = l.length; p < d; p++) {
            var h = Ut(l[p], "MM.dd.yyyy"),
              f = n.get(h) || [];
            f.includes(c) || (f.push(c), n.set(h, f));
          }
      }
    }
    return n;
  }
  function tn(e, t, n, r, a) {
    for (var o = a.length, i = [], s = 0; s < o; s++) {
      var u = ie(ue(e, ge(a[s])), me(a[s])),
        c = ie(e, (n + 1) * r);
      Ye(u, t) && Ue(u, c) && i.push(a[s]);
    }
    return i;
  }
  var nn = (function(t) {
    function n(e) {
      Et(this, n);
      var a = qt(this, t.call(this, e));
      return (
        (a.renderOptions = function() {
          var t = a.props.year,
            e = a.state.yearsList.map(function(e) {
              return h.createElement(
                "div",
                {
                  className:
                    t === e
                      ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                      : "react-datepicker__year-option",
                  key: e,
                  ref: e,
                  onClick: a.onChange.bind(a, e)
                },
                t === e
                  ? h.createElement(
                      "span",
                      { className: "react-datepicker__year-option--selected" },
                      "✓"
                    )
                  : "",
                e
              );
            }),
            n = a.props.minDate ? ve(a.props.minDate) : null,
            r = a.props.maxDate ? ve(a.props.maxDate) : null;
          return (
            (r &&
              a.state.yearsList.find(function(e) {
                return e === r;
              })) ||
              e.unshift(
                h.createElement(
                  "div",
                  {
                    className: "react-datepicker__year-option",
                    ref: "upcoming",
                    key: "upcoming",
                    onClick: a.incrementYears
                  },
                  h.createElement("a", {
                    className:
                      "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"
                  })
                )
              ),
            (n &&
              a.state.yearsList.find(function(e) {
                return e === n;
              })) ||
              e.push(
                h.createElement(
                  "div",
                  {
                    className: "react-datepicker__year-option",
                    ref: "previous",
                    key: "previous",
                    onClick: a.decrementYears
                  },
                  h.createElement("a", {
                    className:
                      "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"
                  })
                )
              ),
            e
          );
        }),
        (a.onChange = function(e) {
          a.props.onChange(e);
        }),
        (a.handleClickOutside = function() {
          a.props.onCancel();
        }),
        (a.shiftYears = function(t) {
          var e = a.state.yearsList.map(function(e) {
            return e + t;
          });
          a.setState({ yearsList: e });
        }),
        (a.incrementYears = function() {
          return a.shiftYears(1);
        }),
        (a.decrementYears = function() {
          return a.shiftYears(-1);
        }),
        (a.state = {
          yearsList: (function(e, t, n, r) {
            for (var a = [], o = 0; o < 2 * t + 1; o++) {
              var i = e + t - o,
                s = !0;
              n && (s = ve(n) <= i), r && s && (s = ve(r) >= i), s && a.push(i);
            }
            return a;
          })(
            a.props.year,
            e.yearDropdownItemNumber || (e.scrollableYearDropdown ? 10 : 5),
            a.props.minDate,
            a.props.maxDate
          )
        }),
        a
      );
    }
    return (
      _t(n, t),
      (n.prototype.render = function() {
        var e = p({
          "react-datepicker__year-dropdown": !0,
          "react-datepicker__year-dropdown--scrollable": this.props
            .scrollableYearDropdown
        });
        return h.createElement("div", { className: e }, this.renderOptions());
      }),
      n
    );
  })(h.Component);
  nn.propTypes = {
    minDate: t.instanceOf(Date),
    maxDate: t.instanceOf(Date),
    onCancel: t.func.isRequired,
    onChange: t.func.isRequired,
    scrollableYearDropdown: t.bool,
    year: t.number.isRequired,
    yearDropdownItemNumber: t.number
  };
  var rn = n(nn),
    an = (function(o) {
      function i() {
        var e, a;
        Et(this, i);
        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        return (
          ((e = a = qt(this, o.call.apply(o, [this].concat(n)))).state = {
            dropdownVisible: !1
          }),
          (a.renderSelectOptions = function() {
            for (
              var e = a.props.minDate ? ve(a.props.minDate) : 1900,
                t = a.props.maxDate ? ve(a.props.maxDate) : 2100,
                n = [],
                r = e;
              r <= t;
              r++
            )
              n.push(h.createElement("option", { key: r, value: r }, r));
            return n;
          }),
          (a.onSelectChange = function(e) {
            a.onChange(e.target.value);
          }),
          (a.renderSelectMode = function() {
            return h.createElement(
              "select",
              {
                value: a.props.year,
                className: "react-datepicker__year-select",
                onChange: a.onSelectChange
              },
              a.renderSelectOptions()
            );
          }),
          (a.renderReadView = function(e) {
            return h.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__year-read-view",
                onClick: function(e) {
                  return a.toggleDropdown(e);
                }
              },
              h.createElement("span", {
                className: "react-datepicker__year-read-view--down-arrow"
              }),
              h.createElement(
                "span",
                {
                  className: "react-datepicker__year-read-view--selected-year"
                },
                a.props.year
              )
            );
          }),
          (a.renderDropdown = function() {
            return h.createElement(rn, {
              key: "dropdown",
              ref: "options",
              year: a.props.year,
              onChange: a.onChange,
              onCancel: a.toggleDropdown,
              minDate: a.props.minDate,
              maxDate: a.props.maxDate,
              scrollableYearDropdown: a.props.scrollableYearDropdown,
              yearDropdownItemNumber: a.props.yearDropdownItemNumber
            });
          }),
          (a.renderScrollMode = function() {
            var e = a.state.dropdownVisible,
              t = [a.renderReadView(!e)];
            return e && t.unshift(a.renderDropdown()), t;
          }),
          (a.onChange = function(e) {
            a.toggleDropdown(), e !== a.props.year && a.props.onChange(e);
          }),
          (a.toggleDropdown = function(e) {
            a.setState(
              { dropdownVisible: !a.state.dropdownVisible },
              function() {
                a.props.adjustDateOnChange &&
                  a.handleYearChange(a.props.date, e);
              }
            );
          }),
          (a.handleYearChange = function(e, t) {
            a.onSelect(e, t), a.setOpen();
          }),
          (a.onSelect = function(e, t) {
            a.props.onSelect && a.props.onSelect(e, t);
          }),
          (a.setOpen = function() {
            a.props.setOpen && a.props.setOpen(!0);
          }),
          qt(a, e)
        );
      }
      return (
        _t(i, o),
        (i.prototype.render = function() {
          var e = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              e = this.renderScrollMode();
              break;
            case "select":
              e = this.renderSelectMode();
          }
          return h.createElement(
            "div",
            {
              className:
                "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--" +
                this.props.dropdownMode
            },
            e
          );
        }),
        i
      );
    })(h.Component);
  an.propTypes = {
    adjustDateOnChange: t.bool,
    dropdownMode: t.oneOf(["scroll", "select"]).isRequired,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    onChange: t.func.isRequired,
    scrollableYearDropdown: t.bool,
    year: t.number.isRequired,
    yearDropdownItemNumber: t.number,
    date: t.instanceOf(Date),
    onSelect: t.func,
    setOpen: t.func
  };
  var on = (function(o) {
    function i() {
      var e, n;
      Et(this, i);
      for (var t = arguments.length, r = Array(t), a = 0; a < t; a++)
        r[a] = arguments[a];
      return (
        ((e = n = qt(
          this,
          o.call.apply(o, [this].concat(r))
        )).renderOptions = function() {
          return n.props.monthNames.map(function(e, t) {
            return h.createElement(
              "div",
              {
                className:
                  n.props.month === t
                    ? "react-datepicker__month-option --selected_month"
                    : "react-datepicker__month-option",
                key: e,
                ref: e,
                onClick: n.onChange.bind(n, t)
              },
              n.props.month === t
                ? h.createElement(
                    "span",
                    { className: "react-datepicker__month-option--selected" },
                    "✓"
                  )
                : "",
              e
            );
          });
        }),
        (n.onChange = function(e) {
          return n.props.onChange(e);
        }),
        (n.handleClickOutside = function() {
          return n.props.onCancel();
        }),
        qt(n, e)
      );
    }
    return (
      _t(i, o),
      (i.prototype.render = function() {
        return h.createElement(
          "div",
          { className: "react-datepicker__month-dropdown" },
          this.renderOptions()
        );
      }),
      i
    );
  })(h.Component);
  on.propTypes = {
    onCancel: t.func.isRequired,
    onChange: t.func.isRequired,
    month: t.number.isRequired,
    monthNames: t.arrayOf(t.string.isRequired).isRequired
  };
  var sn = n(on),
    un = (function(o) {
      function i() {
        var e, r;
        Et(this, i);
        for (var t = arguments.length, n = Array(t), a = 0; a < t; a++)
          n[a] = arguments[a];
        return (
          ((e = r = qt(this, o.call.apply(o, [this].concat(n)))).state = {
            dropdownVisible: !1
          }),
          (r.renderSelectOptions = function(e) {
            return e.map(function(e, t) {
              return h.createElement("option", { key: t, value: t }, e);
            });
          }),
          (r.renderSelectMode = function(e) {
            return h.createElement(
              "select",
              {
                value: r.props.month,
                className: "react-datepicker__month-select",
                onChange: function(e) {
                  return r.onChange(e.target.value);
                }
              },
              r.renderSelectOptions(e)
            );
          }),
          (r.renderReadView = function(e, t) {
            return h.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__month-read-view",
                onClick: r.toggleDropdown
              },
              h.createElement("span", {
                className: "react-datepicker__month-read-view--down-arrow"
              }),
              h.createElement(
                "span",
                {
                  className: "react-datepicker__month-read-view--selected-month"
                },
                t[r.props.month]
              )
            );
          }),
          (r.renderDropdown = function(e) {
            return h.createElement(sn, {
              key: "dropdown",
              ref: "options",
              month: r.props.month,
              monthNames: e,
              onChange: r.onChange,
              onCancel: r.toggleDropdown
            });
          }),
          (r.renderScrollMode = function(e) {
            var t = r.state.dropdownVisible,
              n = [r.renderReadView(!t, e)];
            return t && n.unshift(r.renderDropdown(e)), n;
          }),
          (r.onChange = function(e) {
            r.toggleDropdown(), e !== r.props.month && r.props.onChange(e);
          }),
          (r.toggleDropdown = function() {
            return r.setState({ dropdownVisible: !r.state.dropdownVisible });
          }),
          qt(r, e)
        );
      }
      return (
        _t(i, o),
        (i.prototype.render = function() {
          var r = this,
            e = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
              this.props.useShortMonthInDropdown
                ? function(e) {
                    return (t = e), Ut(ke(Pt(), t), "LLL", n);
                    var t, n;
                  }
                : function(e) {
                    return (
                      (t = e), (n = r.props.locale), Ut(ke(Pt(), t), "LLLL", n)
                    );
                    var t, n;
                  }
            ),
            t = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              t = this.renderScrollMode(e);
              break;
            case "select":
              t = this.renderSelectMode(e);
          }
          return h.createElement(
            "div",
            {
              className:
                "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--" +
                this.props.dropdownMode
            },
            t
          );
        }),
        i
      );
    })(h.Component);
  un.propTypes = {
    dropdownMode: t.oneOf(["scroll", "select"]).isRequired,
    locale: t.string,
    month: t.number.isRequired,
    onChange: t.func.isRequired,
    useShortMonthInDropdown: t.bool
  };
  var cn = (function(t) {
    function n(e) {
      Et(this, n);
      var r = qt(this, t.call(this, e));
      return (
        (r.renderOptions = function() {
          return r.state.monthYearsList.map(function(e) {
            var t = be(e),
              n = Ht(r.props.date, e) && Rt(r.props.date, e);
            return h.createElement(
              "div",
              {
                className: n
                  ? "react-datepicker__month-year-option --selected_month-year"
                  : "react-datepicker__month-year-option",
                key: t,
                ref: t,
                onClick: r.onChange.bind(r, t)
              },
              n
                ? h.createElement(
                    "span",
                    {
                      className: "react-datepicker__month-year-option--selected"
                    },
                    "✓"
                  )
                : "",
              Ut(e, r.props.dateFormat)
            );
          });
        }),
        (r.onChange = function(e) {
          return r.props.onChange(e);
        }),
        (r.handleClickOutside = function() {
          r.props.onCancel();
        }),
        (r.state = {
          monthYearsList: (function(e, t) {
            for (var n = [], r = Lt(e), a = Lt(t); !Ye(r, a); )
              n.push(Pt(r)), (r = de(r, 1));
            return n;
          })(r.props.minDate, r.props.maxDate)
        }),
        r
      );
    }
    return (
      _t(n, t),
      (n.prototype.render = function() {
        var e = p({
          "react-datepicker__month-year-dropdown": !0,
          "react-datepicker__month-year-dropdown--scrollable": this.props
            .scrollableMonthYearDropdown
        });
        return h.createElement("div", { className: e }, this.renderOptions());
      }),
      n
    );
  })(h.Component);
  cn.propTypes = {
    minDate: t.instanceOf(Date).isRequired,
    maxDate: t.instanceOf(Date).isRequired,
    onCancel: t.func.isRequired,
    onChange: t.func.isRequired,
    scrollableMonthYearDropdown: t.bool,
    date: t.instanceOf(Date).isRequired,
    dateFormat: t.string.isRequired
  };
  var ln = n(cn),
    pn = (function(o) {
      function i() {
        var e, a;
        Et(this, i);
        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        return (
          ((e = a = qt(this, o.call.apply(o, [this].concat(n)))).state = {
            dropdownVisible: !1
          }),
          (a.renderSelectOptions = function() {
            for (
              var e = Lt(a.props.minDate), t = Lt(a.props.maxDate), n = [];
              !Ye(e, t);

            ) {
              var r = be(e);
              n.push(
                h.createElement(
                  "option",
                  { key: r, value: r },
                  Ut(e, a.props.dateFormat, a.props.locale)
                )
              ),
                (e = de(e, 1));
            }
            return n;
          }),
          (a.onSelectChange = function(e) {
            a.onChange(e.target.value);
          }),
          (a.renderSelectMode = function() {
            return h.createElement(
              "select",
              {
                value: be(Lt(a.props.date)),
                className: "react-datepicker__month-year-select",
                onChange: a.onSelectChange
              },
              a.renderSelectOptions()
            );
          }),
          (a.renderReadView = function(e) {
            var t = Ut(a.props.date, a.props.dateFormat, a.props.locale);
            return h.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__month-year-read-view",
                onClick: function(e) {
                  return a.toggleDropdown(e);
                }
              },
              h.createElement("span", {
                className: "react-datepicker__month-year-read-view--down-arrow"
              }),
              h.createElement(
                "span",
                {
                  className:
                    "react-datepicker__month-year-read-view--selected-month-year"
                },
                t
              )
            );
          }),
          (a.renderDropdown = function() {
            return h.createElement(ln, {
              key: "dropdown",
              ref: "options",
              date: a.props.date,
              dateFormat: a.props.dateFormat,
              onChange: a.onChange,
              onCancel: a.toggleDropdown,
              minDate: a.props.minDate,
              maxDate: a.props.maxDate,
              scrollableMonthYearDropdown: a.props.scrollableMonthYearDropdown
            });
          }),
          (a.renderScrollMode = function() {
            var e = a.state.dropdownVisible,
              t = [a.renderReadView(!e)];
            return e && t.unshift(a.renderDropdown()), t;
          }),
          (a.onChange = function(e) {
            a.toggleDropdown();
            var t = Pt(parseInt(e));
            (Ht(a.props.date, t) && Rt(a.props.date, t)) || a.props.onChange(t);
          }),
          (a.toggleDropdown = function() {
            return a.setState({ dropdownVisible: !a.state.dropdownVisible });
          }),
          qt(a, e)
        );
      }
      return (
        _t(i, o),
        (i.prototype.render = function() {
          var e = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              e = this.renderScrollMode();
              break;
            case "select":
              e = this.renderSelectMode();
          }
          return h.createElement(
            "div",
            {
              className:
                "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--" +
                this.props.dropdownMode
            },
            e
          );
        }),
        i
      );
    })(h.Component);
  pn.propTypes = {
    dropdownMode: t.oneOf(["scroll", "select"]).isRequired,
    dateFormat: t.string.isRequired,
    locale: t.string,
    maxDate: t.instanceOf(Date).isRequired,
    minDate: t.instanceOf(Date).isRequired,
    date: t.instanceOf(Date).isRequired,
    onChange: t.func.isRequired,
    scrollableMonthYearDropdown: t.bool
  };
  var dn = (function(a) {
    function o() {
      var e, s;
      Et(this, o);
      for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return (
        ((e = s = qt(
          this,
          a.call.apply(a, [this].concat(n))
        )).handleClick = function(e) {
          !s.isDisabled() && s.props.onClick && s.props.onClick(e);
        }),
        (s.handleMouseEnter = function(e) {
          !s.isDisabled() && s.props.onMouseEnter && s.props.onMouseEnter(e);
        }),
        (s.isSameDay = function(e) {
          return Bt(s.props.day, e);
        }),
        (s.isKeyboardSelected = function() {
          return (
            !s.props.disabledKeyboardNavigation &&
            !s.props.inline &&
            !s.isSameDay(s.props.selected) &&
            s.isSameDay(s.props.preSelection)
          );
        }),
        (s.isDisabled = function() {
          return At(s.props.day, s.props);
        }),
        (s.getHighLightedClass = function(e) {
          var t = s.props,
            n = t.highlightDates;
          if (!n) return !1;
          var r = Ut(t.day, "MM.dd.yyyy");
          return n.get(r);
        }),
        (s.isInRange = function() {
          var e = s.props,
            t = e.startDate,
            n = e.endDate;
          return !(!t || !n) && jt(e.day, t, n);
        }),
        (s.isInSelectingRange = function() {
          var e = s.props,
            t = e.day,
            n = e.selectsStart,
            r = e.selectsEnd,
            a = e.selectingDate,
            o = e.startDate,
            i = e.endDate;
          return (
            !((!n && !r) || !a || s.isDisabled()) &&
            (n && i && (Ue(a, i) || Pe(a, i))
              ? jt(t, a, i)
              : !(!r || !o || (!Ye(a, o) && !Pe(a, o))) && jt(t, o, a))
          );
        }),
        (s.isSelectingRangeStart = function() {
          if (!s.isInSelectingRange()) return !1;
          var e = s.props,
            t = e.day;
          return Bt(t, e.selectsStart ? e.selectingDate : e.startDate);
        }),
        (s.isSelectingRangeEnd = function() {
          if (!s.isInSelectingRange()) return !1;
          var e = s.props,
            t = e.day;
          return Bt(t, e.selectsEnd ? e.selectingDate : e.endDate);
        }),
        (s.isRangeStart = function() {
          var e = s.props,
            t = e.startDate;
          return !(!t || !e.endDate) && Bt(t, e.day);
        }),
        (s.isRangeEnd = function() {
          var e = s.props,
            t = e.endDate;
          return !(!e.startDate || !t) && Bt(t, e.day);
        }),
        (s.isWeekend = function() {
          var e = (function(e) {
            if (arguments.length < 1)
              throw new TypeError(
                "1 argument required, but only " + arguments.length + " present"
              );
            return E(e).getDay();
          })(s.props.day);
          return 0 === e || 6 === e;
        }),
        (s.isOutsideMonth = function() {
          return void 0 !== s.props.month && s.props.month !== ye(s.props.day);
        }),
        (s.getClassNames = function(e) {
          var t,
            n = s.props.dayClassName ? s.props.dayClassName(e) : void 0;
          return p(
            "react-datepicker__day",
            n,
            "react-datepicker__day--" + Ut(s.props.day, "ddd", t),
            {
              "react-datepicker__day--disabled": s.isDisabled(),
              "react-datepicker__day--selected": s.isSameDay(s.props.selected),
              "react-datepicker__day--keyboard-selected": s.isKeyboardSelected(),
              "react-datepicker__day--range-start": s.isRangeStart(),
              "react-datepicker__day--range-end": s.isRangeEnd(),
              "react-datepicker__day--in-range": s.isInRange(),
              "react-datepicker__day--in-selecting-range": s.isInSelectingRange(),
              "react-datepicker__day--selecting-range-start": s.isSelectingRangeStart(),
              "react-datepicker__day--selecting-range-end": s.isSelectingRangeEnd(),
              "react-datepicker__day--today": s.isSameDay(Pt()),
              "react-datepicker__day--weekend": s.isWeekend(),
              "react-datepicker__day--outside-month": s.isOutsideMonth()
            },
            s.getHighLightedClass("react-datepicker__day--highlighted")
          );
        }),
        qt(s, e)
      );
    }
    return (
      _t(o, a),
      (o.prototype.render = function() {
        return h.createElement(
          "div",
          {
            className: this.getClassNames(this.props.day),
            onClick: this.handleClick,
            onMouseEnter: this.handleMouseEnter,
            "aria-label": "day-" + we(this.props.day),
            role: "option"
          },
          this.props.renderDayContents
            ? this.props.renderDayContents(we(this.props.day))
            : we(this.props.day)
        );
      }),
      o
    );
  })(h.Component);
  dn.propTypes = {
    disabledKeyboardNavigation: t.bool,
    day: t.instanceOf(Date).isRequired,
    dayClassName: t.func,
    endDate: t.instanceOf(Date),
    highlightDates: t.instanceOf(Map),
    inline: t.bool,
    month: t.number,
    onClick: t.func,
    onMouseEnter: t.func,
    preSelection: t.instanceOf(Date),
    selected: t.object,
    selectingDate: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    startDate: t.instanceOf(Date),
    renderDayContents: t.func
  };
  var hn = (function(o) {
    function i() {
      var e, t;
      Et(this, i);
      for (var n = arguments.length, r = Array(n), a = 0; a < n; a++)
        r[a] = arguments[a];
      return (
        ((e = t = qt(
          this,
          o.call.apply(o, [this].concat(r))
        )).handleClick = function(e) {
          t.props.onClick && t.props.onClick(e);
        }),
        qt(t, e)
      );
    }
    return (
      _t(i, o),
      (i.prototype.render = function() {
        return h.createElement(
          "div",
          {
            className: p({
              "react-datepicker__week-number": !0,
              "react-datepicker__week-number--clickable": !!this.props.onClick
            }),
            "aria-label": "week-" + this.props.weekNumber,
            onClick: this.handleClick
          },
          this.props.weekNumber
        );
      }),
      i
    );
  })(h.Component);
  hn.propTypes = { weekNumber: t.number.isRequired, onClick: t.func };
  var fn = (function(o) {
    function i() {
      var e, a;
      Et(this, i);
      for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return (
        ((e = a = qt(
          this,
          o.call.apply(o, [this].concat(n))
        )).handleDayClick = function(e, t) {
          a.props.onDayClick && a.props.onDayClick(e, t);
        }),
        (a.handleDayMouseEnter = function(e) {
          a.props.onDayMouseEnter && a.props.onDayMouseEnter(e);
        }),
        (a.handleWeekClick = function(e, t, n) {
          "function" == typeof a.props.onWeekSelect &&
            a.props.onWeekSelect(e, t, n),
            a.props.shouldCloseOnSelect && a.props.setOpen(!1);
        }),
        (a.formatWeekNumber = function(e) {
          return a.props.formatWeekNumber ? a.props.formatWeekNumber(e) : Wt(e);
        }),
        (a.renderDays = function() {
          var n = It(a.props.day, a.props.locale),
            e = [],
            t = a.formatWeekNumber(n);
          if (a.props.showWeekNumber) {
            var r = a.props.onWeekSelect
              ? a.handleWeekClick.bind(a, n, t)
              : void 0;
            e.push(
              h.createElement(hn, { key: "W", weekNumber: t, onClick: r })
            );
          }
          return e.concat(
            [0, 1, 2, 3, 4, 5, 6].map(function(e) {
              var t = ce(n, e);
              return h.createElement(dn, {
                key: e,
                day: t,
                month: a.props.month,
                onClick: a.handleDayClick.bind(a, t),
                onMouseEnter: a.handleDayMouseEnter.bind(a, t),
                minDate: a.props.minDate,
                maxDate: a.props.maxDate,
                excludeDates: a.props.excludeDates,
                includeDates: a.props.includeDates,
                inline: a.props.inline,
                highlightDates: a.props.highlightDates,
                selectingDate: a.props.selectingDate,
                filterDate: a.props.filterDate,
                preSelection: a.props.preSelection,
                selected: a.props.selected,
                selectsStart: a.props.selectsStart,
                selectsEnd: a.props.selectsEnd,
                startDate: a.props.startDate,
                endDate: a.props.endDate,
                dayClassName: a.props.dayClassName,
                renderDayContents: a.props.renderDayContents,
                disabledKeyboardNavigation: a.props.disabledKeyboardNavigation
              });
            })
          );
        }),
        qt(a, e)
      );
    }
    return (
      _t(i, o),
      (i.prototype.render = function() {
        return h.createElement(
          "div",
          { className: "react-datepicker__week" },
          this.renderDays()
        );
      }),
      Ot(i, null, [
        {
          key: "defaultProps",
          get: function() {
            return { shouldCloseOnSelect: !0 };
          }
        }
      ]),
      i
    );
  })(h.Component);
  fn.propTypes = {
    disabledKeyboardNavigation: t.bool,
    day: t.instanceOf(Date).isRequired,
    dayClassName: t.func,
    endDate: t.instanceOf(Date),
    excludeDates: t.array,
    filterDate: t.func,
    formatWeekNumber: t.func,
    highlightDates: t.instanceOf(Map),
    includeDates: t.array,
    inline: t.bool,
    locale: t.string,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    month: t.number,
    onDayClick: t.func,
    onDayMouseEnter: t.func,
    onWeekSelect: t.func,
    preSelection: t.instanceOf(Date),
    selected: t.instanceOf(Date),
    selectingDate: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    showWeekNumber: t.bool,
    startDate: t.instanceOf(Date),
    setOpen: t.func,
    shouldCloseOnSelect: t.bool,
    renderDayContents: t.func
  };
  var mn = (function(a) {
    function o() {
      var e, s;
      Et(this, o);
      for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return (
        ((e = s = qt(
          this,
          a.call.apply(a, [this].concat(n))
        )).handleDayClick = function(e, t) {
          s.props.onDayClick &&
            s.props.onDayClick(e, t, s.props.orderInDisplay);
        }),
        (s.handleDayMouseEnter = function(e) {
          s.props.onDayMouseEnter && s.props.onDayMouseEnter(e);
        }),
        (s.handleMouseLeave = function() {
          s.props.onMouseLeave && s.props.onMouseLeave();
        }),
        (s.isWeekInMonth = function(e) {
          var t = s.props.day,
            n = ce(e, 6);
          return Rt(e, t) || Rt(n, t);
        }),
        (s.renderWeeks = function() {
          for (
            var e = [],
              t = s.props.fixedHeight,
              n = It(Lt(s.props.day), s.props.locale),
              r = 0,
              a = !1;
            e.push(
              h.createElement(fn, {
                key: r,
                day: n,
                month: ye(s.props.day),
                onDayClick: s.handleDayClick,
                onDayMouseEnter: s.handleDayMouseEnter,
                onWeekSelect: s.props.onWeekSelect,
                formatWeekNumber: s.props.formatWeekNumber,
                locale: s.props.locale,
                minDate: s.props.minDate,
                maxDate: s.props.maxDate,
                excludeDates: s.props.excludeDates,
                includeDates: s.props.includeDates,
                inline: s.props.inline,
                highlightDates: s.props.highlightDates,
                selectingDate: s.props.selectingDate,
                filterDate: s.props.filterDate,
                preSelection: s.props.preSelection,
                selected: s.props.selected,
                selectsStart: s.props.selectsStart,
                selectsEnd: s.props.selectsEnd,
                showWeekNumber: s.props.showWeekNumbers,
                startDate: s.props.startDate,
                endDate: s.props.endDate,
                dayClassName: s.props.dayClassName,
                setOpen: s.props.setOpen,
                shouldCloseOnSelect: s.props.shouldCloseOnSelect,
                disabledKeyboardNavigation: s.props.disabledKeyboardNavigation,
                renderDayContents: s.props.renderDayContents
              })
            ),
              !a;

          ) {
            r++, (n = le(n, 1));
            var o = t && 6 <= r,
              i = !t && !s.isWeekInMonth(n);
            if (o || i) {
              if (!s.props.peekNextMonth) break;
              a = !0;
            }
          }
          return e;
        }),
        (s.getClassNames = function() {
          var e = s.props;
          return p("react-datepicker__month", {
            "react-datepicker__month--selecting-range":
              e.selectingDate && (e.selectsStart || e.selectsEnd)
          });
        }),
        qt(s, e)
      );
    }
    return (
      _t(o, a),
      (o.prototype.render = function() {
        return h.createElement(
          "div",
          {
            className: this.getClassNames(),
            onMouseLeave: this.handleMouseLeave,
            role: "listbox",
            "aria-label": "month-" + Ut(this.props.day, "YYYY-MM")
          },
          this.renderWeeks()
        );
      }),
      o
    );
  })(h.Component);
  mn.propTypes = {
    disabledKeyboardNavigation: t.bool,
    day: t.instanceOf(Date).isRequired,
    dayClassName: t.func,
    endDate: t.instanceOf(Date),
    orderInDisplay: t.number,
    excludeDates: t.array,
    filterDate: t.func,
    fixedHeight: t.bool,
    formatWeekNumber: t.func,
    highlightDates: t.instanceOf(Map),
    includeDates: t.array,
    inline: t.bool,
    locale: t.string,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    onDayClick: t.func,
    onDayMouseEnter: t.func,
    onMouseLeave: t.func,
    onWeekSelect: t.func,
    peekNextMonth: t.bool,
    preSelection: t.instanceOf(Date),
    selected: t.instanceOf(Date),
    selectingDate: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    showWeekNumbers: t.bool,
    startDate: t.instanceOf(Date),
    setOpen: t.func,
    shouldCloseOnSelect: t.bool,
    renderDayContents: t.func
  };
  var gn = (function(a) {
    function o() {
      var e, d;
      Et(this, o);
      for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return (
        ((e = d = qt(
          this,
          a.call.apply(a, [this].concat(n))
        )).handleClick = function(e) {
          ((d.props.minTime || d.props.maxTime) && Vt(e, d.props)) ||
            (d.props.excludeTimes && Kt(e, d.props.excludeTimes)) ||
            (d.props.includeTimes && !Kt(e, d.props.includeTimes)) ||
            d.props.onChange(e);
        }),
        (d.liClasses = function(e, t, n) {
          var r = ["react-datepicker__time-list-item"];
          return (
            t === ge(e) &&
              n === me(e) &&
              r.push("react-datepicker__time-list-item--selected"),
            (((d.props.minTime || d.props.maxTime) && Vt(e, d.props)) ||
              (d.props.excludeTimes && Kt(e, d.props.excludeTimes)) ||
              (d.props.includeTimes && !Kt(e, d.props.includeTimes))) &&
              r.push("react-datepicker__time-list-item--disabled"),
            d.props.injectTimes &&
              (60 * ge(e) + me(e)) % d.props.intervals != 0 &&
              r.push("react-datepicker__time-list-item--injected"),
            r.join(" ")
          );
        }),
        (d.renderTimes = function() {
          for (
            var e = [],
              n = d.props.format ? d.props.format : "p",
              t = d.props.intervals,
              r = d.props.selected ? d.props.selected : Pt(),
              a = ge(r),
              o = me(r),
              i = xe(Pt()),
              s = 1440 / t,
              u =
                d.props.injectTimes &&
                d.props.injectTimes.sort(function(e, t) {
                  return e - t;
                }),
              c = 0;
            c < s;
            c++
          ) {
            var l = ie(i, c * t);
            if ((e.push(l), u)) {
              var p = tn(i, l, c, t, u);
              e = e.concat(p);
            }
          }
          return e.map(function(t, e) {
            return h.createElement(
              "li",
              {
                key: e,
                onClick: d.handleClick.bind(d, t),
                className: d.liClasses(t, a, o),
                ref: function(e) {
                  ((a === ge(t) && o === me(t)) ||
                    (a === ge(t) && !d.centerLi)) &&
                    (d.centerLi = e);
                }
              },
              Ut(t, n)
            );
          });
        }),
        qt(d, e)
      );
    }
    return (
      _t(o, a),
      (o.prototype.componentDidMount = function() {
        this.list.scrollTop = o.calcCenterPosition(
          this.props.monthRef
            ? this.props.monthRef.clientHeight - this.header.clientHeight
            : this.list.clientHeight,
          this.centerLi
        );
      }),
      (o.prototype.render = function() {
        var t = this,
          e = null;
        return (
          this.props.monthRef &&
            this.header &&
            (e = this.props.monthRef.clientHeight - this.header.clientHeight),
          h.createElement(
            "div",
            {
              className:
                "react-datepicker__time-container " +
                (this.props.todayButton
                  ? "react-datepicker__time-container--with-today-button"
                  : "")
            },
            h.createElement(
              "div",
              {
                className:
                  "react-datepicker__header react-datepicker__header--time",
                ref: function(e) {
                  t.header = e;
                }
              },
              h.createElement(
                "div",
                { className: "react-datepicker-time__header" },
                this.props.timeCaption
              )
            ),
            h.createElement(
              "div",
              { className: "react-datepicker__time" },
              h.createElement(
                "div",
                { className: "react-datepicker__time-box" },
                h.createElement(
                  "ul",
                  {
                    className: "react-datepicker__time-list",
                    ref: function(e) {
                      t.list = e;
                    },
                    style: e ? { height: e } : {}
                  },
                  this.renderTimes.bind(this)()
                )
              )
            )
          )
        );
      }),
      Ot(o, null, [
        {
          key: "defaultProps",
          get: function() {
            return {
              intervals: 30,
              onTimeChange: function() {},
              todayButton: null,
              timeCaption: "Time"
            };
          }
        }
      ]),
      o
    );
  })(h.Component);
  function wn(e) {
    var t = e.children,
      n = e.arrowProps;
    return h.createElement(
      "div",
      { className: e.className },
      h.createElement(
        "div",
        Nt({ className: "react-datepicker__triangle" }, void 0 === n ? {} : n)
      ),
      t
    );
  }
  (gn.propTypes = {
    format: t.string,
    includeTimes: t.array,
    intervals: t.number,
    selected: t.instanceOf(Date),
    onChange: t.func,
    todayButton: t.node,
    minTime: t.instanceOf(Date),
    maxTime: t.instanceOf(Date),
    excludeTimes: t.array,
    monthRef: t.object,
    timeCaption: t.string,
    injectTimes: t.array
  }),
    (gn.calcCenterPosition = function(e, t) {
      return t.offsetTop - (e / 2 - t.clientHeight / 2);
    }),
    (wn.propTypes = {
      className: t.string,
      children: t.node,
      arrowProps: t.object
    });
  var yn = [
      "react-datepicker__year-select",
      "react-datepicker__month-select",
      "react-datepicker__month-year-select"
    ],
    vn = (function(t) {
      function n(e) {
        Et(this, n);
        var u = qt(this, t.call(this, e));
        return (
          (u.handleClickOutside = function(e) {
            u.props.onClickOutside(e);
          }),
          (u.handleDropdownFocus = function(e) {
            (function() {
              var t = (
                (0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : {}
                ).className || ""
              ).split(/\s+/);
              return yn.some(function(e) {
                return 0 <= t.indexOf(e);
              });
            })(e.target) && u.props.onDropdownFocus();
          }),
          (u.getDateInView = function() {
            var e = u.props,
              t = e.preSelection,
              n = e.selected,
              r = e.openToDate,
              a = Zt(u.props),
              o = $t(u.props),
              i = Pt(),
              s = r || n || t;
            return s || (a && Ue(i, a) ? a : o && Ye(i, o) ? o : i);
          }),
          (u.increaseMonth = function() {
            u.setState({ date: de(u.state.date, 1) }, function() {
              return u.handleMonthChange(u.state.date);
            });
          }),
          (u.decreaseMonth = function() {
            u.setState({ date: fe(u.state.date, 1) }, function() {
              return u.handleMonthChange(u.state.date);
            });
          }),
          (u.handleDayClick = function(e, t, n) {
            return u.props.onSelect(e, t, n);
          }),
          (u.handleDayMouseEnter = function(e) {
            return u.setState({ selectingDate: e });
          }),
          (u.handleMonthMouseLeave = function() {
            return u.setState({ selectingDate: null });
          }),
          (u.handleYearChange = function(e) {
            u.props.onYearChange && u.props.onYearChange(e);
          }),
          (u.handleMonthChange = function(e) {
            u.props.onMonthChange && u.props.onMonthChange(e),
              u.props.adjustDateOnChange &&
                (u.props.onSelect && u.props.onSelect(e),
                u.props.setOpen && u.props.setOpen(!0));
          }),
          (u.handleMonthYearChange = function(e) {
            u.handleYearChange(e), u.handleMonthChange(e);
          }),
          (u.changeYear = function(e) {
            u.setState({ date: Te(u.state.date, e) }, function() {
              return u.handleYearChange(u.state.date);
            });
          }),
          (u.changeMonth = function(e) {
            u.setState({ date: ke(u.state.date, e) }, function() {
              return u.handleMonthChange(u.state.date);
            });
          }),
          (u.changeMonthYear = function(e) {
            u.setState(
              { date: Te(ke(u.state.date, ye(e)), ve(e)) },
              function() {
                return u.handleMonthYearChange(u.state.date);
              }
            );
          }),
          (u.header = function() {
            var r = It(
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : u.state.date,
                u.props.locale
              ),
              e = [];
            return (
              u.props.showWeekNumbers &&
                e.push(
                  h.createElement(
                    "div",
                    { key: "W", className: "react-datepicker__day-name" },
                    u.props.weekLabel || "#"
                  )
                ),
              e.concat(
                [0, 1, 2, 3, 4, 5, 6].map(function(e) {
                  var t = ce(r, e),
                    n = u.formatWeekday(t, u.props.locale);
                  return h.createElement(
                    "div",
                    { key: e, className: "react-datepicker__day-name" },
                    n
                  );
                })
              )
            );
          }),
          (u.formatWeekday = function(e, t) {
            return u.props.formatWeekDay
              ? (0, u.props.formatWeekDay)(Ut(e, "EEEE", t))
              : u.props.useWeekdaysShort
              ? Ut(e, "EEE", t)
              : Ut(e, "EEEEEE", t);
          }),
          (u.renderPreviousMonthButton = function() {
            if (!u.props.renderCustomHeader) {
              var e = zt(u.state.date, u.props);
              if (
                (u.props.forceShowMonthNavigation ||
                  u.props.showDisabledMonthNavigation ||
                  !e) &&
                !u.props.showTimeSelectOnly
              ) {
                var t = [
                    "react-datepicker__navigation",
                    "react-datepicker__navigation--previous"
                  ],
                  n = u.decreaseMonth;
                return (
                  e &&
                    u.props.showDisabledMonthNavigation &&
                    (t.push("react-datepicker__navigation--previous--disabled"),
                    (n = null)),
                  h.createElement(
                    "button",
                    { type: "button", className: t.join(" "), onClick: n },
                    u.props.previousMonthButtonLabel
                  )
                );
              }
            }
          }),
          (u.renderNextMonthButton = function() {
            if (!u.props.renderCustomHeader) {
              var e = Jt(u.state.date, u.props);
              if (
                (u.props.forceShowMonthNavigation ||
                  u.props.showDisabledMonthNavigation ||
                  !e) &&
                !u.props.showTimeSelectOnly
              ) {
                var t = [
                  "react-datepicker__navigation",
                  "react-datepicker__navigation--next"
                ];
                u.props.showTimeSelect &&
                  t.push("react-datepicker__navigation--next--with-time"),
                  u.props.todayButton &&
                    t.push(
                      "react-datepicker__navigation--next--with-today-button"
                    );
                var n = u.increaseMonth;
                return (
                  e &&
                    u.props.showDisabledMonthNavigation &&
                    (t.push("react-datepicker__navigation--next--disabled"),
                    (n = null)),
                  h.createElement(
                    "button",
                    { type: "button", className: t.join(" "), onClick: n },
                    u.props.nextMonthButtonLabel
                  )
                );
              }
            }
          }),
          (u.renderCurrentMonth = function() {
            var e =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : u.state.date,
              t = ["react-datepicker__current-month"];
            return (
              u.props.showYearDropdown &&
                t.push("react-datepicker__current-month--hasYearDropdown"),
              u.props.showMonthDropdown &&
                t.push("react-datepicker__current-month--hasMonthDropdown"),
              u.props.showMonthYearDropdown &&
                t.push("react-datepicker__current-month--hasMonthYearDropdown"),
              h.createElement(
                "div",
                { className: t.join(" ") },
                Ut(e, u.props.dateFormat, u.props.locale)
              )
            );
          }),
          (u.renderYearDropdown = function() {
            if (
              u.props.showYearDropdown &&
              !(0 < arguments.length && void 0 !== arguments[0] && arguments[0])
            )
              return h.createElement(an, {
                adjustDateOnChange: u.props.adjustDateOnChange,
                date: u.state.date,
                onSelect: u.props.onSelect,
                setOpen: u.props.setOpen,
                dropdownMode: u.props.dropdownMode,
                onChange: u.changeYear,
                minDate: u.props.minDate,
                maxDate: u.props.maxDate,
                year: ve(u.state.date),
                scrollableYearDropdown: u.props.scrollableYearDropdown,
                yearDropdownItemNumber: u.props.yearDropdownItemNumber
              });
          }),
          (u.renderMonthDropdown = function() {
            if (
              u.props.showMonthDropdown &&
              !(0 < arguments.length && void 0 !== arguments[0] && arguments[0])
            )
              return h.createElement(un, {
                dropdownMode: u.props.dropdownMode,
                locale: u.props.locale,
                onChange: u.changeMonth,
                month: ye(u.state.date),
                useShortMonthInDropdown: u.props.useShortMonthInDropdown
              });
          }),
          (u.renderMonthYearDropdown = function() {
            if (
              u.props.showMonthYearDropdown &&
              !(0 < arguments.length && void 0 !== arguments[0] && arguments[0])
            )
              return h.createElement(pn, {
                dropdownMode: u.props.dropdownMode,
                locale: u.props.locale,
                dateFormat: u.props.dateFormat,
                onChange: u.changeMonthYear,
                minDate: u.props.minDate,
                maxDate: u.props.maxDate,
                date: u.state.date,
                scrollableMonthYearDropdown: u.props.scrollableMonthYearDropdown
              });
          }),
          (u.renderTodayButton = function() {
            if (u.props.todayButton && !u.props.showTimeSelectOnly)
              return h.createElement(
                "div",
                {
                  className: "react-datepicker__today-button",
                  onClick: function(e) {
                    return u.props.onSelect(xe(Pt()), e);
                  }
                },
                u.props.todayButton
              );
          }),
          (u.renderDefaultHeader = function(e) {
            var t = e.monthDate,
              n = e.i;
            return h.createElement(
              "div",
              { className: "react-datepicker__header" },
              u.renderCurrentMonth(t),
              h.createElement(
                "div",
                {
                  className:
                    "react-datepicker__header__dropdown react-datepicker__header__dropdown--" +
                    u.props.dropdownMode,
                  onFocus: u.handleDropdownFocus
                },
                u.renderMonthDropdown(0 !== n),
                u.renderMonthYearDropdown(0 !== n),
                u.renderYearDropdown(0 !== n)
              ),
              h.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                u.header(t)
              )
            );
          }),
          (u.renderCustomHeader = function(e) {
            var t = e.monthDate;
            if (0 !== e.i) return null;
            var n = zt(u.state.date, u.props),
              r = Jt(u.state.date, u.props);
            return h.createElement(
              "div",
              {
                className:
                  "react-datepicker__header react-datepicker__header--custom",
                onFocus: u.props.onDropdownFocus
              },
              u.props.renderCustomHeader(
                Nt({}, u.state, {
                  changeMonth: u.changeMonth,
                  changeYear: u.changeYear,
                  decreaseMonth: u.decreaseMonth,
                  increaseMonth: u.increaseMonth,
                  prevMonthButtonDisabled: n,
                  nextMonthButtonDisabled: r
                })
              ),
              h.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                u.header(t)
              )
            );
          }),
          (u.renderMonths = function() {
            if (!u.props.showTimeSelectOnly) {
              for (var e = [], t = 0; t < u.props.monthsShown; ++t) {
                var n = de(u.state.date, t - u.props.monthSelectedIn);
                e.push(
                  h.createElement(
                    "div",
                    {
                      key: "month-" + t,
                      ref: function(e) {
                        u.monthContainer = e;
                      },
                      className: "react-datepicker__month-container"
                    },
                    u.props.renderCustomHeader
                      ? u.renderCustomHeader({ monthDate: n, i: t })
                      : u.renderDefaultHeader({ monthDate: n, i: t }),
                    h.createElement(mn, {
                      day: n,
                      dayClassName: u.props.dayClassName,
                      onDayClick: u.handleDayClick,
                      onDayMouseEnter: u.handleDayMouseEnter,
                      onMouseLeave: u.handleMonthMouseLeave,
                      onWeekSelect: u.props.onWeekSelect,
                      orderInDisplay: t,
                      formatWeekNumber: u.props.formatWeekNumber,
                      locale: u.props.locale,
                      minDate: u.props.minDate,
                      maxDate: u.props.maxDate,
                      excludeDates: u.props.excludeDates,
                      highlightDates: u.props.highlightDates,
                      selectingDate: u.state.selectingDate,
                      includeDates: u.props.includeDates,
                      inline: u.props.inline,
                      fixedHeight: u.props.fixedHeight,
                      filterDate: u.props.filterDate,
                      preSelection: u.props.preSelection,
                      selected: u.props.selected,
                      selectsStart: u.props.selectsStart,
                      selectsEnd: u.props.selectsEnd,
                      showWeekNumbers: u.props.showWeekNumbers,
                      startDate: u.props.startDate,
                      endDate: u.props.endDate,
                      peekNextMonth: u.props.peekNextMonth,
                      setOpen: u.props.setOpen,
                      shouldCloseOnSelect: u.props.shouldCloseOnSelect,
                      renderDayContents: u.props.renderDayContents,
                      disabledKeyboardNavigation:
                        u.props.disabledKeyboardNavigation
                    })
                  )
                );
              }
              return e;
            }
          }),
          (u.renderTimeSection = function() {
            if (
              u.props.showTimeSelect &&
              (u.state.monthContainer || u.props.showTimeSelectOnly)
            )
              return h.createElement(gn, {
                selected: u.props.selected,
                onChange: u.props.onTimeChange,
                format: u.props.timeFormat,
                includeTimes: u.props.includeTimes,
                intervals: u.props.timeIntervals,
                minTime: u.props.minTime,
                maxTime: u.props.maxTime,
                excludeTimes: u.props.excludeTimes,
                timeCaption: u.props.timeCaption,
                todayButton: u.props.todayButton,
                showMonthDropdown: u.props.showMonthDropdown,
                showMonthYearDropdown: u.props.showMonthYearDropdown,
                showYearDropdown: u.props.showYearDropdown,
                withPortal: u.props.withPortal,
                monthRef: u.state.monthContainer,
                injectTimes: u.props.injectTimes
              });
          }),
          (u.state = {
            date: u.getDateInView(),
            selectingDate: null,
            monthContainer: null
          }),
          u
        );
      }
      return (
        _t(n, t),
        Ot(n, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                onDropdownFocus: function() {},
                monthsShown: 1,
                monthSelectedIn: 0,
                forceShowMonthNavigation: !1,
                timeCaption: "Time",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next Month"
              };
            }
          }
        ]),
        (n.prototype.componentDidMount = function() {
          var e = this;
          this.props.showTimeSelect &&
            (this.assignMonthContainer = void e.setState({
              monthContainer: e.monthContainer
            }));
        }),
        (n.prototype.componentDidUpdate = function(e) {
          this.props.preSelection &&
          !Bt(this.props.preSelection, e.preSelection)
            ? this.setState({ date: this.props.preSelection })
            : this.props.openToDate &&
              !Bt(this.props.openToDate, e.openToDate) &&
              this.setState({ date: this.props.openToDate });
        }),
        (n.prototype.render = function() {
          return h.createElement(
            this.props.container || wn,
            {
              className: p("react-datepicker", this.props.className, {
                "react-datepicker--time-only": this.props.showTimeSelectOnly
              })
            },
            this.renderPreviousMonthButton(),
            this.renderNextMonthButton(),
            this.renderMonths(),
            this.renderTodayButton(),
            this.renderTimeSection(),
            this.props.children
          );
        }),
        n
      );
    })(h.Component);
  vn.propTypes = {
    adjustDateOnChange: t.bool,
    className: t.string,
    children: t.node,
    container: t.func,
    dateFormat: t.oneOfType([t.string, t.array]).isRequired,
    dayClassName: t.func,
    disabledKeyboardNavigation: t.bool,
    dropdownMode: t.oneOf(["scroll", "select"]),
    endDate: t.instanceOf(Date),
    excludeDates: t.array,
    filterDate: t.func,
    fixedHeight: t.bool,
    formatWeekNumber: t.func,
    highlightDates: t.instanceOf(Map),
    includeDates: t.array,
    includeTimes: t.array,
    injectTimes: t.array,
    inline: t.bool,
    locale: t.string,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    monthsShown: t.number,
    monthSelectedIn: t.number,
    onClickOutside: t.func.isRequired,
    onMonthChange: t.func,
    onYearChange: t.func,
    forceShowMonthNavigation: t.bool,
    onDropdownFocus: t.func,
    onSelect: t.func.isRequired,
    onWeekSelect: t.func,
    showTimeSelect: t.bool,
    showTimeSelectOnly: t.bool,
    timeFormat: t.string,
    timeIntervals: t.number,
    onTimeChange: t.func,
    minTime: t.instanceOf(Date),
    maxTime: t.instanceOf(Date),
    excludeTimes: t.array,
    timeCaption: t.string,
    openToDate: t.instanceOf(Date),
    peekNextMonth: t.bool,
    scrollableYearDropdown: t.bool,
    scrollableMonthYearDropdown: t.bool,
    preSelection: t.instanceOf(Date),
    selected: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    showMonthDropdown: t.bool,
    showMonthYearDropdown: t.bool,
    showWeekNumbers: t.bool,
    showYearDropdown: t.bool,
    startDate: t.instanceOf(Date),
    todayButton: t.string,
    useWeekdaysShort: t.bool,
    formatWeekDay: t.func,
    withPortal: t.bool,
    weekLabel: t.string,
    yearDropdownItemNumber: t.number,
    setOpen: t.func,
    shouldCloseOnSelect: t.bool,
    useShortMonthInDropdown: t.bool,
    showDisabledMonthNavigation: t.bool,
    previousMonthButtonLabel: t.string,
    nextMonthButtonLabel: t.string,
    renderCustomHeader: t.func,
    renderDayContents: t.func
  };
  var bn = u.placements,
    Dn = (function(e) {
      function t() {
        return Et(this, t), qt(this, e.apply(this, arguments));
      }
      return (
        _t(t, e),
        (t.prototype.render = function() {
          var e = this.props,
            n = e.popperComponent,
            t = e.popperModifiers,
            r = e.popperPlacement,
            a = e.popperProps,
            o = e.targetComponent,
            i = void 0;
          if (!e.hidePopper) {
            var s = p("react-datepicker-popper", e.className);
            i = h.createElement(
              u.Popper,
              Nt({ modifiers: t, placement: r }, a),
              function(e) {
                var t = e.arrowProps;
                return h.createElement(
                  "div",
                  Nt(
                    { ref: e.ref, style: e.style },
                    { className: s, "data-placement": e.placement }
                  ),
                  h.cloneElement(n, { arrowProps: t })
                );
              }
            );
          }
          return (
            this.props.popperContainer &&
              (i = h.createElement(this.props.popperContainer, {}, i)),
            h.createElement(
              u.Manager,
              { id: "datePicker-container" },
              h.createElement(u.Reference, null, function(e) {
                return h.createElement(
                  "div",
                  { ref: e.ref, className: "react-datepicker-wrapper" },
                  o
                );
              }),
              i
            )
          );
        }),
        Ot(t, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                hidePopper: !0,
                popperModifiers: {
                  preventOverflow: {
                    enabled: !0,
                    escapeWithReference: !0,
                    boundariesElement: "viewport"
                  }
                },
                popperProps: {},
                popperPlacement: "bottom-start"
              };
            }
          }
        ]),
        t
      );
    })(h.Component);
  Dn.propTypes = {
    className: t.string,
    hidePopper: t.bool,
    popperComponent: t.element,
    popperModifiers: t.object,
    popperPlacement: t.oneOf(bn),
    popperContainer: t.func,
    popperProps: t.object,
    targetComponent: t.element
  };
  var Cn = "MuiButtonBase-root MuiButton-root MuiButton-contained ml-2",
    kn = n(vn);
  var Tn = "Date input not valid.",
    Mn = (function(t) {
      function n(e) {
        Et(this, n);
        var l = qt(this, t.call(this, e));
        return (
          (l.getPreSelection = function() {
            return l.props.openToDate
              ? l.props.openToDate
              : l.props.selectsEnd && l.props.startDate
              ? l.props.startDate
              : l.props.selectsStart && l.props.endDate
              ? l.props.endDate
              : Pt();
          }),
          (l.calcInitialState = function() {
            var e = l.getPreSelection(),
              t = Zt(l.props),
              n = $t(l.props),
              r = t && Ue(e, t) ? t : n && Ye(e, n) ? n : e;
            return {
              open: l.props.startOpen || !1,
              preventFocus: !1,
              preSelection: l.props.selected ? l.props.selected : r,
              highlightDates: en(l.props.highlightDates),
              focused: !1
            };
          }),
          (l.clearPreventFocusTimeout = function() {
            l.preventFocusTimeout && clearTimeout(l.preventFocusTimeout);
          }),
          (l.setFocus = function() {
            l.input && l.input.focus && l.input.focus();
          }),
          (l.setBlur = function() {
            l.input && l.input.blur && l.input.blur(), l.cancelFocusInput();
          }),
          (l.setOpen = function(e) {
            var t =
              1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            l.setState(
              {
                open: e,
                preSelection:
                  e && l.state.open
                    ? l.state.preSelection
                    : l.calcInitialState().preSelection,
                lastPreSelectChange: xn
              },
              function() {
                e ||
                  l.setState(
                    function(e) {
                      return { focused: !!t && e.focused };
                    },
                    function() {
                      !t && l.setBlur(), l.setState({ inputValue: null });
                    }
                  );
              }
            );
          }),
          (l.inputOk = function() {
            return m(l.state.preSelection);
          }),
          (l.isCalendarOpen = function() {
            return void 0 === l.props.open
              ? l.state.open && !l.props.disabled && !l.props.readOnly
              : l.props.open;
          }),
          (l.handleFocus = function(e) {
            l.state.preventFocus ||
              (l.props.onFocus(e),
              l.props.preventOpenOnFocus || l.props.readOnly || l.setOpen(!0)),
              l.setState({ focused: !0 });
          }),
          (l.cancelFocusInput = function() {
            clearTimeout(l.inputFocusTimeout), (l.inputFocusTimeout = null);
          }),
          (l.deferFocusInput = function() {
            l.cancelFocusInput(),
              (l.inputFocusTimeout = setTimeout(function() {
                return l.setFocus();
              }, 1));
          }),
          (l.handleDropdownFocus = function() {
            l.cancelFocusInput();
          }),
          (l.handleBlur = function(e) {
            l.state.open && !l.props.withPortal
              ? l.deferFocusInput()
              : l.props.onBlur(e),
              l.setState({ focused: !1 });
          }),
          (l.handleCalendarClickOutside = function(e) {
            l.props.inline || l.setOpen(!1),
              l.props.onClickOutside(e),
              l.props.withPortal && e.preventDefault();
          }),
          (l.handleChange = function() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            var r = t[0];
            if (
              !l.props.onChangeRaw ||
              (l.props.onChangeRaw.apply(l, t),
              "function" == typeof r.isDefaultPrevented &&
                !r.isDefaultPrevented())
            ) {
              l.setState({
                inputValue: r.target.value,
                lastPreSelectChange: Sn
              });
              var a,
                o,
                i,
                s,
                u = ((a = r.target.value),
                (o = l.props.dateFormat),
                (i = null),
                (s = Xt(l.props.locale)),
                Array.isArray(o)
                  ? (o.forEach(function(e) {
                      var t = Mt(a, e, new Date(), s);
                      Yt(t) && (i = t);
                    }),
                    i)
                  : (Yt((i = Mt(a, o, new Date(), s))) || (i = new Date(a)),
                    Yt(i) ? i : null));
              (!u && r.target.value) || l.setSelected(u, r, !0);
            }
          }),
          (l.handleSelect = function(e, t, n) {
            l.setState({ preventFocus: !0 }, function() {
              return (
                (l.preventFocusTimeout = setTimeout(function() {
                  return l.setState({ preventFocus: !1 });
                }, 50)),
                l.preventFocusTimeout
              );
            }),
              l.setSelected(e, t, void 0, n),
              !l.props.shouldCloseOnSelect || l.props.showTimeSelect
                ? l.setPreSelection(e)
                : l.props.inline || l.setOpen(!1);
          }),
          (l.setSelected = function(e, t, n, r) {
            var a = e;
            if (null !== a && At(a, l.props))
              Gt(a, l.props) &&
                (l.props.onChange(e, t), l.props.onSelect(a, t));
            else {
              if (!Bt(l.props.selected, a) || l.props.allowSameDay) {
                if (null !== a) {
                  if (l.props.selected) {
                    var o = l.props.selected;
                    n && (o = Pt(a)),
                      (a = Ft(a, {
                        hour: ge(o),
                        minute: me(o),
                        second: (function(e) {
                          if (arguments.length < 1)
                            throw new TypeError(
                              "1 argument required, but only " +
                                arguments.length +
                                " present"
                            );
                          return E(e).getSeconds();
                        })(o)
                      }));
                  }
                  l.props.inline || l.setState({ preSelection: a }),
                    l.props.inline &&
                      1 < l.props.monthsShown &&
                      !l.props.inlineFocusSelectedMonth &&
                      l.setState({ monthSelectedIn: r });
                }
                l.props.onChange(a, t);
              }
              l.props.onSelect(a, t), n || l.setState({ inputValue: null });
            }
          }),
          (l.setPreSelection = function(e) {
            (!(void 0 !== l.props.minDate && void 0 !== l.props.maxDate) ||
              !e ||
              jt(e, l.props.minDate, l.props.maxDate)) &&
              l.setState({ preSelection: e });
          }),
          (l.handleTimeChange = function(e) {
            var t = Ft(
              l.props.selected ? l.props.selected : l.getPreSelection(),
              { hour: ge(e), minute: me(e) }
            );
            l.setState({ preSelection: t }),
              l.props.onChange(t),
              l.props.shouldCloseOnSelect && l.setOpen(!1),
              l.setState({ inputValue: null });
          }),
          (l.onInputClick = function() {
            l.props.disabled || l.props.readOnly || l.setOpen(!0),
              l.props.onInputClick();
          }),
          (l.onInputKeyDown = function(e) {
            l.props.onKeyDown(e);
            var t = e.key;
            if (l.state.open || l.props.inline || l.props.preventOpenOnFocus) {
              var n = Pt(l.state.preSelection);
              if ("Enter" === t)
                e.preventDefault(),
                  l.inputOk() && l.state.lastPreSelectChange === xn
                    ? (l.handleSelect(n, e),
                      !l.props.shouldCloseOnSelect && l.setPreSelection(n))
                    : l.setOpen(!1);
              else if ("Escape" === t)
                e.preventDefault(),
                  l.setOpen(!1),
                  l.inputOk() || l.props.onInputError({ code: 1, msg: Tn });
              else if ("Tab" === t) l.setOpen(!1, !0);
              else if (!l.props.disabledKeyboardNavigation) {
                var r = void 0;
                switch (t) {
                  case "ArrowLeft":
                    r = (function(e, t) {
                      if (arguments.length < 2)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return ce(e, -O(t));
                    })(n, 1);
                    break;
                  case "ArrowRight":
                    r = ce(n, 1);
                    break;
                  case "ArrowUp":
                    r = (function(e, t) {
                      if (arguments.length < 2)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return le(e, -O(t));
                    })(n, 1);
                    break;
                  case "ArrowDown":
                    r = le(n, 1);
                    break;
                  case "PageUp":
                    r = fe(n, 1);
                    break;
                  case "PageDown":
                    r = de(n, 1);
                    break;
                  case "Home":
                    r = (function(e, t) {
                      if (arguments.length < 2)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return he(e, -O(t));
                    })(n, 1);
                    break;
                  case "End":
                    r = he(n, 1);
                }
                if (!r)
                  return void (
                    l.props.onInputError &&
                    l.props.onInputError({ code: 1, msg: Tn })
                  );
                e.preventDefault(),
                  l.setState({ lastPreSelectChange: xn }),
                  l.props.adjustDateOnChange && l.setSelected(r),
                  l.setPreSelection(r);
              }
            } else ("ArrowDown" !== t && "ArrowUp" !== t) || l.onInputClick();
          }),
          (l.onClearClick = function(e) {
            e && e.preventDefault && e.preventDefault(),
              l.props.onChange(null, e),
              l.setState({ inputValue: null });
          }),
          (l.clear = function() {
            l.onClearClick();
          }),
          (l.renderCalendar = function() {
            return l.props.inline || l.isCalendarOpen()
              ? h.createElement(
                  kn,
                  {
                    ref: function(e) {
                      l.calendar = e;
                    },
                    locale: l.props.locale,
                    adjustDateOnChange: l.props.adjustDateOnChange,
                    setOpen: l.setOpen,
                    shouldCloseOnSelect: l.props.shouldCloseOnSelect,
                    dateFormat: l.props.dateFormatCalendar,
                    useWeekdaysShort: l.props.useWeekdaysShort,
                    formatWeekDay: l.props.formatWeekDay,
                    dropdownMode: l.props.dropdownMode,
                    selected: l.props.selected,
                    preSelection: l.state.preSelection,
                    onSelect: l.handleSelect,
                    onWeekSelect: l.props.onWeekSelect,
                    openToDate: l.props.openToDate,
                    minDate: l.props.minDate,
                    maxDate: l.props.maxDate,
                    selectsStart: l.props.selectsStart,
                    selectsEnd: l.props.selectsEnd,
                    startDate: l.props.startDate,
                    endDate: l.props.endDate,
                    excludeDates: l.props.excludeDates,
                    filterDate: l.props.filterDate,
                    onClickOutside: l.handleCalendarClickOutside,
                    formatWeekNumber: l.props.formatWeekNumber,
                    highlightDates: l.state.highlightDates,
                    includeDates: l.props.includeDates,
                    includeTimes: l.props.includeTimes,
                    injectTimes: l.props.injectTimes,
                    inline: l.props.inline,
                    peekNextMonth: l.props.peekNextMonth,
                    showMonthDropdown: l.props.showMonthDropdown,
                    useShortMonthInDropdown: l.props.useShortMonthInDropdown,
                    showMonthYearDropdown: l.props.showMonthYearDropdown,
                    showWeekNumbers: l.props.showWeekNumbers,
                    showYearDropdown: l.props.showYearDropdown,
                    withPortal: l.props.withPortal,
                    forceShowMonthNavigation: l.props.forceShowMonthNavigation,
                    showDisabledMonthNavigation:
                      l.props.showDisabledMonthNavigation,
                    scrollableYearDropdown: l.props.scrollableYearDropdown,
                    scrollableMonthYearDropdown:
                      l.props.scrollableMonthYearDropdown,
                    todayButton: l.props.todayButton,
                    weekLabel: l.props.weekLabel,
                    inputBoxClassName: Cn,
                    fixedHeight: l.props.fixedHeight,
                    monthsShown: l.props.monthsShown,
                    monthSelectedIn: l.state.monthSelectedIn,
                    onDropdownFocus: l.handleDropdownFocus,
                    onMonthChange: l.props.onMonthChange,
                    onYearChange: l.props.onYearChange,
                    dayClassName: l.props.dayClassName,
                    showTimeSelect: l.props.showTimeSelect,
                    showTimeSelectOnly: l.props.showTimeSelectOnly,
                    onTimeChange: l.handleTimeChange,
                    timeFormat: l.props.timeFormat,
                    timeIntervals: l.props.timeIntervals,
                    minTime: l.props.minTime,
                    maxTime: l.props.maxTime,
                    excludeTimes: l.props.excludeTimes,
                    timeCaption: l.props.timeCaption,
                    className: l.props.calendarClassName,
                    container: l.props.calendarContainer,
                    yearDropdownItemNumber: l.props.yearDropdownItemNumber,
                    previousMonthButtonLabel: l.props.previousMonthButtonLabel,
                    nextMonthButtonLabel: l.props.nextMonthButtonLabel,
                    disabledKeyboardNavigation:
                      l.props.disabledKeyboardNavigation,
                    renderCustomHeader: l.props.renderCustomHeader,
                    popperProps: l.props.popperProps,
                    renderDayContents: l.props.renderDayContents
                  },
                  l.props.children
                )
              : null;
          }),
          (l.renderDateInput = function() {
            var e,
              t,
              n,
              r,
              a,
              o,
              i = p(l.props.className, (((e = {})[Cn] = l.state), e)),
              s =
                l.props.customInput ||
                h.createElement("input", {
                  type: "text",
                  onKeyPress: function(e) {
                    e.preventDefault();
                  }
                }),
              u = l.props.customInputRef || "ref",
              c =
                "string" == typeof l.props.value
                  ? l.props.value
                  : "string" == typeof l.state.inputValue
                  ? l.state.inputValue
                  : ((a = (r = l.props).dateFormat),
                    (o = r.locale),
                    ((n = l.props.selected) &&
                      Ut(n, Array.isArray(a) ? a[0] : a, o)) ||
                      "");
            return h.cloneElement(
              s,
              (((t = {})[u] = function(e) {
                l.input = e;
              }),
              (t.value = c),
              (t.onBlur = l.handleBlur),
              (t.onChange = l.handleChange),
              (t.onClick = l.onInputClick),
              (t.onFocus = l.handleFocus),
              (t.onKeyDown = l.onInputKeyDown),
              (t.id = l.props.id),
              (t.name = l.props.name),
              (t.autoFocus = l.props.autoFocus),
              (t.placeholder = l.props.placeholderText),
              (t.disabled = l.props.disabled),
              (t.autoComplete = l.props.autoComplete),
              (t.className = i),
              (t.title = l.props.title),
              (t.readOnly = l.props.readOnly),
              (t.required = l.props.required),
              (t.tabIndex = l.props.tabIndex),
              t)
            );
          }),
          (l.renderClearButton = function() {
            return l.props.isClearable && null != l.props.selected
              ? h.createElement("button", {
                  type: "button",
                  className: "react-datepicker__close-icon",
                  onClick: l.onClearClick,
                  title: l.props.clearButtonTitle,
                  tabIndex: -1
                })
              : null;
          }),
          (l.state = l.calcInitialState()),
          l
        );
      }
      return (
        _t(n, t),
        Ot(n, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                allowSameDay: !1,
                dateFormat: "MM/dd/yyyy",
                dateFormatCalendar: "LLLL yyyy",
                onChange: function() {},
                disabled: !1,
                disabledKeyboardNavigation: !1,
                dropdownMode: "scroll",
                onFocus: function() {},
                onBlur: function() {},
                onKeyDown: function() {},
                onInputClick: function() {},
                onSelect: function() {},
                onClickOutside: function() {},
                onMonthChange: function() {},
                preventOpenOnFocus: !1,
                onYearChange: function() {},
                onInputError: function() {},
                monthsShown: 1,
                readOnly: !1,
                withPortal: !1,
                shouldCloseOnSelect: !0,
                showTimeSelect: !1,
                timeIntervals: 30,
                timeCaption: "Time",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next month",
                renderDayContents: function(e) {
                  return e;
                },
                inlineFocusSelectedMonth: !1
              };
            }
          }
        ]),
        (n.prototype.componentDidUpdate = function(e, t) {
          var n, r, a, o;
          e.inline &&
            ((r = this.props.selected),
            (n = e.selected) && r
              ? ye(n) !== ye(r) || ve(n) !== ve(r)
              : n !== r) &&
            this.setPreSelection(this.props.selected),
            void 0 !== this.state.monthSelectedIn &&
              e.monthsShown !== this.props.monthsShown &&
              this.setState({ monthSelectedIn: 0 }),
            e.highlightDates !== this.props.highlightDates &&
              this.setState({ highlightDates: en(this.props.highlightDates) }),
            !t.focused &&
              ((o = this.props.selected), (a = e.selected) && o && !Pe(a, o)) &&
              this.setState({ inputValue: null });
        }),
        (n.prototype.componentWillUnmount = function() {
          this.clearPreventFocusTimeout();
        }),
        (n.prototype.render = function() {
          var e = this.renderCalendar();
          return this.props.inline && !this.props.withPortal
            ? e
            : this.props.withPortal
            ? h.createElement(
                "div",
                null,
                this.props.inline
                  ? null
                  : h.createElement(
                      "div",
                      { className: "react-datepicker__input-container" },
                      this.renderDateInput(),
                      this.renderClearButton()
                    ),
                this.state.open || this.props.inline
                  ? h.createElement(
                      "div",
                      { className: "react-datepicker__portal" },
                      e
                    )
                  : null
              )
            : h.createElement(Dn, {
                className: this.props.popperClassName,
                hidePopper: !this.isCalendarOpen(),
                popperModifiers: this.props.popperModifiers,
                targetComponent: h.createElement(
                  "div",
                  { className: "react-datepicker__input-container" },
                  this.renderDateInput(),
                  this.renderClearButton()
                ),
                popperContainer: this.props.popperContainer,
                popperComponent: e,
                popperPlacement: this.props.popperPlacement,
                popperProps: this.props.popperProps
              });
        }),
        n
      );
    })(h.Component);
  Mn.propTypes = {
    adjustDateOnChange: t.bool,
    allowSameDay: t.bool,
    autoComplete: t.string,
    autoFocus: t.bool,
    calendarClassName: t.string,
    calendarContainer: t.func,
    children: t.node,
    className: t.string,
    customInput: t.element,
    customInputRef: t.string,
    dateFormat: t.oneOfType([t.string, t.array]),
    dateFormatCalendar: t.string,
    dayClassName: t.func,
    disabled: t.bool,
    disabledKeyboardNavigation: t.bool,
    dropdownMode: t.oneOf(["scroll", "select"]).isRequired,
    endDate: t.instanceOf(Date),
    excludeDates: t.array,
    filterDate: t.func,
    fixedHeight: t.bool,
    formatWeekNumber: t.func,
    highlightDates: t.array,
    id: t.string,
    includeDates: t.array,
    includeTimes: t.array,
    injectTimes: t.array,
    inline: t.bool,
    isClearable: t.bool,
    locale: t.string,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    monthsShown: t.number,
    name: t.string,
    onBlur: t.func,
    onChange: t.func.isRequired,
    onSelect: t.func,
    onWeekSelect: t.func,
    onClickOutside: t.func,
    onChangeRaw: t.func,
    onFocus: t.func,
    onInputClick: t.func,
    onKeyDown: t.func,
    onMonthChange: t.func,
    onYearChange: t.func,
    onInputError: t.func,
    open: t.bool,
    openToDate: t.instanceOf(Date),
    peekNextMonth: t.bool,
    placeholderText: t.string,
    popperContainer: t.func,
    popperClassName: t.string,
    popperModifiers: t.object,
    popperPlacement: t.oneOf(bn),
    popperProps: t.object,
    preventOpenOnFocus: t.bool,
    readOnly: t.bool,
    required: t.bool,
    scrollableYearDropdown: t.bool,
    scrollableMonthYearDropdown: t.bool,
    selected: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    showMonthDropdown: t.bool,
    showMonthYearDropdown: t.bool,
    showWeekNumbers: t.bool,
    showYearDropdown: t.bool,
    forceShowMonthNavigation: t.bool,
    showDisabledMonthNavigation: t.bool,
    startDate: t.instanceOf(Date),
    startOpen: t.bool,
    tabIndex: t.number,
    timeCaption: t.string,
    title: t.string,
    todayButton: t.node,
    useWeekdaysShort: t.bool,
    formatWeekDay: t.func,
    value: t.string,
    weekLabel: t.string,
    withPortal: t.bool,
    yearDropdownItemNumber: t.number,
    shouldCloseOnSelect: t.bool,
    showTimeSelect: t.bool,
    showTimeSelectOnly: t.bool,
    timeFormat: t.string,
    timeIntervals: t.number,
    minTime: t.instanceOf(Date),
    maxTime: t.instanceOf(Date),
    excludeTimes: t.array,
    useShortMonthInDropdown: t.bool,
    clearButtonTitle: t.string,
    previousMonthButtonLabel: t.string,
    nextMonthButtonLabel: t.string,
    renderCustomHeader: t.func,
    renderDayContents: t.func,
    inlineFocusSelectedMonth: t.bool
  };
  var Sn = "input",
    xn = "navigate";
  (e.registerLocale = function(e, t) {
    window.__localeData__ || (window.__localeData__ = {}),
      (window.__localeData__[e] = t);
  }),
    (e.setDefaultLocale = function(e) {
      window.__localeId__ = e;
    }),
    (e.getDefaultLocale = Qt),
    (e.default = Mn),
    (e.CalendarContainer = wn),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
