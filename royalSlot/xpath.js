'use strict';
(function() {
    var exports = self["xmlDomLib"];

    function curry(func) {
        var slice = Array.prototype.slice,
            totalargs = func.length,
            partial = function(args, fn) {
                return function() {
                    return fn.apply(this, args.concat(slice.call(arguments)))
                }
            },
            fn = function() {
                var args = slice.call(arguments);
                return args.length < totalargs ? partial(args, fn) : func.apply(this, slice.apply(arguments, [0, totalargs]))
            };
        return fn
    }
    var forEach = curry(function(f, xs) {
        for (var i = 0; i < xs.length; i += 1) f(xs[i], i, xs)
    });
    var reduce = curry(function(f, seed, xs) {
        var acc =
            seed;
        forEach(function(x, i) {
            acc = f(acc, x, i)
        }, xs);
        return acc
    });
    var map = curry(function(f, xs) {
        var mapped = new Array(xs.length);
        forEach(function(x, i) {
            mapped[i] = f(x)
        }, xs);
        return mapped
    });
    var filter = curry(function(f, xs) {
        var filtered = [];
        forEach(function(x, i) {
            if (f(x, i)) filtered.push(x)
        }, xs);
        return filtered
    });

    function compose() {
        if (arguments.length === 0) throw new Error("compose requires at least one argument");
        var funcs = Array.prototype.slice.call(arguments).reverse();
        var f0 = funcs[0];
        var fRem = funcs.slice(1);
        return function() {
            return reduce(function(acc,
                next) {
                return next(acc)
            }, f0.apply(null, arguments), fRem)
        }
    }
    var includes = curry(function(values, value) {
        for (var i = 0; i < values.length; i += 1)
            if (values[i] === value) return true;
        return false
    });

    function always(value) {
        return function() {
            return value
        }
    }
    var prop = curry(function(name, obj) {
        return obj[name]
    });

    function toString(x) {
        return x.toString()
    }
    var join = curry(function(s, xs) {
        return xs.join(s)
    });
    var wrap = curry(function(pref, suf, str) {
        return pref + str + suf
    });

    function assign(target) {
        var to = Object(target);
        for (var index = 1; index <
            arguments.length; index++) {
            var nextSource = arguments[index];
            if (nextSource != null)
                for (var nextKey in nextSource)
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) to[nextKey] = nextSource[nextKey]
        }
        return to
    }
    XPathParser.prototype = new Object;
    XPathParser.prototype.constructor = XPathParser;
    XPathParser.superclass = Object.prototype;

    function XPathParser() {
        this.init()
    }
    XPathParser.prototype.init = function() {
        this.reduceActions = [];
        this.reduceActions[3] = function(rhs) {
            return new OrOperation(rhs[0], rhs[2])
        };
        this.reduceActions[5] =
            function(rhs) {
                return new AndOperation(rhs[0], rhs[2])
            };
        this.reduceActions[7] = function(rhs) {
            return new EqualsOperation(rhs[0], rhs[2])
        };
        this.reduceActions[8] = function(rhs) {
            return new NotEqualOperation(rhs[0], rhs[2])
        };
        this.reduceActions[10] = function(rhs) {
            return new LessThanOperation(rhs[0], rhs[2])
        };
        this.reduceActions[11] = function(rhs) {
            return new GreaterThanOperation(rhs[0], rhs[2])
        };
        this.reduceActions[12] = function(rhs) {
            return new LessThanOrEqualOperation(rhs[0], rhs[2])
        };
        this.reduceActions[13] = function(rhs) {
            return new GreaterThanOrEqualOperation(rhs[0],
                rhs[2])
        };
        this.reduceActions[15] = function(rhs) {
            return new PlusOperation(rhs[0], rhs[2])
        };
        this.reduceActions[16] = function(rhs) {
            return new MinusOperation(rhs[0], rhs[2])
        };
        this.reduceActions[18] = function(rhs) {
            return new MultiplyOperation(rhs[0], rhs[2])
        };
        this.reduceActions[19] = function(rhs) {
            return new DivOperation(rhs[0], rhs[2])
        };
        this.reduceActions[20] = function(rhs) {
            return new ModOperation(rhs[0], rhs[2])
        };
        this.reduceActions[22] = function(rhs) {
            return new UnaryMinusOperation(rhs[1])
        };
        this.reduceActions[24] =
            function(rhs) {
                return new BarOperation(rhs[0], rhs[2])
            };
        this.reduceActions[25] = function(rhs) {
            return new PathExpr(undefined, undefined, rhs[0])
        };
        this.reduceActions[27] = function(rhs) {
            rhs[0].locationPath = rhs[2];
            return rhs[0]
        };
        this.reduceActions[28] = function(rhs) {
            rhs[0].locationPath = rhs[2];
            rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
            return rhs[0]
        };
        this.reduceActions[29] = function(rhs) {
            return new PathExpr(rhs[0], [], undefined)
        };
        this.reduceActions[30] = function(rhs) {
            if (Utilities.instance_of(rhs[0],
                    PathExpr)) {
                if (rhs[0].filterPredicates == undefined) rhs[0].filterPredicates = [];
                rhs[0].filterPredicates.push(rhs[1]);
                return rhs[0]
            } else return new PathExpr(rhs[0], [rhs[1]], undefined)
        };
        this.reduceActions[32] = function(rhs) {
            return rhs[1]
        };
        this.reduceActions[33] = function(rhs) {
            return new XString(rhs[0])
        };
        this.reduceActions[34] = function(rhs) {
            return new XNumber(rhs[0])
        };
        this.reduceActions[36] = function(rhs) {
            return new FunctionCall(rhs[0], [])
        };
        this.reduceActions[37] = function(rhs) {
            return new FunctionCall(rhs[0],
                rhs[2])
        };
        this.reduceActions[38] = function(rhs) {
            return [rhs[0]]
        };
        this.reduceActions[39] = function(rhs) {
            rhs[2].unshift(rhs[0]);
            return rhs[2]
        };
        this.reduceActions[43] = function(rhs) {
            return new LocationPath(true, [])
        };
        this.reduceActions[44] = function(rhs) {
            rhs[1].absolute = true;
            return rhs[1]
        };
        this.reduceActions[46] = function(rhs) {
            return new LocationPath(false, [rhs[0]])
        };
        this.reduceActions[47] = function(rhs) {
            rhs[0].steps.push(rhs[2]);
            return rhs[0]
        };
        this.reduceActions[49] = function(rhs) {
            return new Step(rhs[0], rhs[1], [])
        };
        this.reduceActions[50] = function(rhs) {
            return new Step(Step.CHILD, rhs[0], [])
        };
        this.reduceActions[51] = function(rhs) {
            return new Step(rhs[0], rhs[1], rhs[2])
        };
        this.reduceActions[52] = function(rhs) {
            return new Step(Step.CHILD, rhs[0], rhs[1])
        };
        this.reduceActions[54] = function(rhs) {
            return [rhs[0]]
        };
        this.reduceActions[55] = function(rhs) {
            rhs[1].unshift(rhs[0]);
            return rhs[1]
        };
        this.reduceActions[56] = function(rhs) {
            if (rhs[0] == "ancestor") return Step.ANCESTOR;
            else if (rhs[0] == "ancestor-or-self") return Step.ANCESTORORSELF;
            else if (rhs[0] == "attribute") return Step.ATTRIBUTE;
            else if (rhs[0] == "child") return Step.CHILD;
            else if (rhs[0] == "descendant") return Step.DESCENDANT;
            else if (rhs[0] == "descendant-or-self") return Step.DESCENDANTORSELF;
            else if (rhs[0] == "following") return Step.FOLLOWING;
            else if (rhs[0] == "following-sibling") return Step.FOLLOWINGSIBLING;
            else if (rhs[0] == "namespace") return Step.NAMESPACE;
            else if (rhs[0] == "parent") return Step.PARENT;
            else if (rhs[0] == "preceding") return Step.PRECEDING;
            else if (rhs[0] == "preceding-sibling") return Step.PRECEDINGSIBLING;
            else if (rhs[0] == "self") return Step.SELF;
            return -1
        };
        this.reduceActions[57] = function(rhs) {
            return Step.ATTRIBUTE
        };
        this.reduceActions[59] = function(rhs) {
            if (rhs[0] == "comment") return NodeTest.commentTest;
            else if (rhs[0] == "text") return NodeTest.textTest;
            else if (rhs[0] == "processing-instruction") return NodeTest.anyPiTest;
            else if (rhs[0] == "node") return NodeTest.nodeTest;
            return new NodeTest(-1, undefined)
        };
        this.reduceActions[60] = function(rhs) {
            return new NodeTest.PITest(rhs[2])
        };
        this.reduceActions[61] = function(rhs) {
            return rhs[1]
        };
        this.reduceActions[63] = function(rhs) {
            rhs[1].absolute = true;
            rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
            return rhs[1]
        };
        this.reduceActions[64] = function(rhs) {
            rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
            rhs[0].steps.push(rhs[2]);
            return rhs[0]
        };
        this.reduceActions[65] = function(rhs) {
            return new Step(Step.SELF, NodeTest.nodeTest, [])
        };
        this.reduceActions[66] = function(rhs) {
            return new Step(Step.PARENT, NodeTest.nodeTest, [])
        };
        this.reduceActions[67] = function(rhs) {
            return new VariableReference(rhs[1])
        };
        this.reduceActions[68] = function(rhs) {
            return NodeTest.nameTestAny
        };
        this.reduceActions[69] = function(rhs) {
            return new NodeTest.NameTestPrefixAny(rhs[0].split(":")[0])
        };
        this.reduceActions[70] = function(rhs) {
            return new NodeTest.NameTestQName(rhs[0])
        }
    };
    XPathParser.actionTable = [" s s        sssssssss    s ss  s  ss", "                 s                  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "                rrrrr               ", " s s        sssssssss    s ss  s  ss", "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
        " s s        sssssssss    s ss  s  ss", "                            s       ", "                            s       ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "  s                                 ", "                            s       ", " s           s  sssss          s  s ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "a                                   ",
        "r       s                    rr  r  ", "r      sr                    rr  r  ", "r   s  rr            s       rr  r  ", "r   rssrr            rss     rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrrsss         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrrs  rr  r  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "r  srrrrrrrr         rrrrrrs rr sr  ", "r  srrrrrrrr         rrrrrrs rr  r  ", "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "                sssss               ", "r  rrrrrrrrr         rrrrrrr rr sr  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "                             s      ", "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ", "              s                     ", "                             s      ", "                rrrrr               ", " s s        sssssssss    s sss s  ss", "r  srrrrrrrr         rrrrrrs rr  r  ", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss      ss  s  ss", " s s        sssssssss    s ss  s  ss", " s           s  sssss          s  s ", " s           s  sssss          s  s ", "r  rrrrrrrrr         rrrrrrr rr rr  ", " s           s  sssss          s  s ", " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ", "r  rrrrrrrrr         rrrrrrr rr sr  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "                             s      ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "                             rr     ", "                             s      ", "                             rs     ", "r      sr                    rr  r  ", "r   s  rr            s       rr  r  ", "r   rssrr            rss     rr  r  ",
        "r   rssrr            rss     rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrrsss         rrrrr   rr  r  ", "r   rrrrrsss         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "                                 r  ", "                                 s  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ", "r  srrrrrrrr         rrrrrrs rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", " s s        sssssssss    s ss  s  ss", "r  rrrrrrrrr         rrrrrrr rr rr  ", "                             r      "
    ];
    XPathParser.actionTableNumber = [" 1 0        /.-,+*)('    & %$  #  \"!",
        "                 J                  ", "a  aaaaaaaaa         aaaaaaa aa  a  ", "                YYYYY               ", " 1 0        /.-,+*)('    & %$  #  \"!", "K1  KKKKKKKK .  +*)('KKKKKK  KK# K\" ", " 1 0        /.-,+*)('    & %$  #  \"!", "                            N       ", "                            O       ", "e  eeeeeeeee         eeeeeee ee ee  ", "f  fffffffff         fffffff ff ff  ", "d  ddddddddd         ddddddd dd dd  ", "B  BBBBBBBBB         BBBBBBB BB BB  ", "A  AAAAAAAAA         AAAAAAA AA AA  ",
        "  P                                 ", "                            Q       ", " 1           .  +*)('          #  \" ", "b  bbbbbbbbb         bbbbbbb bb  b  ", "                                    ", "!       S                    !!  !  ", '"      T"                    ""  "  ', "$   V  $$            U       $$  $  ", "&   &ZY&&            &XW     &&  &  ", ")   )))))            )))\\[   ))  )  ", ".   ....._^]         .....   ..  .  ", "1   11111111         11111   11  1  ", "5   55555555         55555`  55  5  ",
        "7   77777777         777777  77  7  ", "9   99999999         999999  99  9  ", ":  c::::::::         ::::::b :: a:  ", "I  fIIIIIIII         IIIIIIe II  I  ", "=  =========         ======= == ==  ", "?  ?????????         ??????? ?? ??  ", "C  CCCCCCCCC         CCCCCCC CC CC  ", "J   JJJJJJJJ         JJJJJJ  JJ  J  ", "M   MMMMMMMM         MMMMMM  MM  M  ", "N  NNNNNNNNN         NNNNNNN NN  N  ", "P  PPPPPPPPP         PPPPPPP PP  P  ", "                +*)('               ", "R  RRRRRRRRR         RRRRRRR RR aR  ",
        "U  UUUUUUUUU         UUUUUUU UU  U  ", "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ", "c  ccccccccc         ccccccc cc cc  ", "                             j      ", "L  fLLLLLLLL         LLLLLLe LL  L  ", "6   66666666         66666   66  6  ", "              k                     ", "                             l      ", "                XXXXX               ", " 1 0        /.-,+*)('    & %$m #  \"!", "_  f________         ______e __  _  ", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('      %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1           .  +*)('          #  \" ", " 1           .  +*)('          #  \" ", ">  >>>>>>>>>         >>>>>>> >> >>  ", " 1           .  +*)('          #  \" ", " 1           .  +*)('          #  \" ", "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ", "V  VVVVVVVVV         VVVVVVV VV aV  ", "T  TTTTTTTTT         TTTTTTT TT  T  ", "@  @@@@@@@@@         @@@@@@@ @@ @@  ", "                             \u0087      ", "[  [[[[[[[[[         [[[[[[[ [[ [[  ", "D  DDDDDDDDD         DDDDDDD DD DD  ", "                             HH     ",
        "                             \u0088      ", "                             F\u0089     ", "#      T#                    ##  #  ", "%   V  %%            U       %%  %  ", "'   'ZY''            'XW     ''  '  ", "(   (ZY((            (XW     ((  (  ", "+   +++++            +++\\[   ++  +  ", "*   *****            ***\\[   **  *  ", "-   -----            ---\\[   --  -  ", ",   ,,,,,            ,,,\\[   ,,  ,  ", "0   00000_^]         00000   00  0  ", "/   /////_^]         /////   //  /  ", "2   22222222         22222   22  2  ",
        "3   33333333         33333   33  3  ", "4   44444444         44444   44  4  ", "8   88888888         888888  88  8  ", "                                 ^  ", "                                 \u008a  ", ";  f;;;;;;;;         ;;;;;;e ;;  ;  ", "<  f<<<<<<<<         <<<<<<e <<  <  ", "O  OOOOOOOOO         OOOOOOO OO  O  ", "`  `````````         ``````` ``  `  ", "S  SSSSSSSSS         SSSSSSS SS  S  ", "W  WWWWWWWWW         WWWWWWW WW  W  ", "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ", "E  EEEEEEEEE         EEEEEEE EE EE  ",
        " 1 0        /.-,+*)('    & %$  #  \"!", "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ", "                             G      "
    ];
    XPathParser.gotoTable = ["3456789:;<=>?@ AB  CDEFGH IJ ", "                             ", "                             ", "                             ", "L456789:;<=>?@ AB  CDEFGH IJ ", "            M        EFGH IJ ", "       N;<=>?@ AB  CDEFGH IJ ", "                             ", "                             ", "                             ", "                             ", "                             ",
        "                             ", "                             ", "                             ", "                             ", "            S        EFGH IJ ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ",
        "                             ", "              e              ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                        h  J ", "              i          j   ", "                             ", "                             ", "                             ", "                             ",
        "                             ", "                             ", "                             ", "                             ", "                             ", "o456789:;<=>?@ ABpqCDEFGH IJ ", "                             ", "  r6789:;<=>?@ AB  CDEFGH IJ ", "   s789:;<=>?@ AB  CDEFGH IJ ", "    t89:;<=>?@ AB  CDEFGH IJ ", "    u89:;<=>?@ AB  CDEFGH IJ ", "     v9:;<=>?@ AB  CDEFGH IJ ", "     w9:;<=>?@ AB  CDEFGH IJ ", "     x9:;<=>?@ AB  CDEFGH IJ ", "     y9:;<=>?@ AB  CDEFGH IJ ", "      z:;<=>?@ AB  CDEFGH IJ ",
        "      {:;<=>?@ AB  CDEFGH IJ ", "       |;<=>?@ AB  CDEFGH IJ ", "       };<=>?@ AB  CDEFGH IJ ", "       ~;<=>?@ AB  CDEFGH IJ ", "         \u007f=>?@ AB  CDEFGH IJ ", "\u0080456789:;<=>?@ AB  CDEFGH IJ\u0081", "            \u0082        EFGH IJ ", "            \u0083        EFGH IJ ", "                             ", "                     \u0084 GH IJ ", "                     \u0085 GH IJ ", "              i          \u0086   ", "              i          \u0087   ", "                             ", "                             ",
        "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ",
        "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "o456789:;<=>?@ AB\u008cqCDEFGH IJ ", "                             ",
        "                             "
    ];
    XPathParser.productions = [
        [1, 1, 2],
        [2, 1, 3],
        [3, 1, 4],
        [3, 3, 3, -9, 4],
        [4, 1, 5],
        [4, 3, 4, -8, 5],
        [5, 1, 6],
        [5, 3, 5, -22, 6],
        [5, 3, 5, -5, 6],
        [6, 1, 7],
        [6, 3, 6, -23, 7],
        [6, 3, 6, -24, 7],
        [6, 3, 6, -6, 7],
        [6, 3, 6, -7, 7],
        [7, 1, 8],
        [7, 3, 7, -25, 8],
        [7, 3, 7, -26, 8],
        [8, 1, 9],
        [8, 3, 8, -12, 9],
        [8, 3, 8, -11, 9],
        [8, 3, 8, -10, 9],
        [9, 1, 10],
        [9, 2, -26, 9],
        [10, 1, 11],
        [10, 3, 10, -27, 11],
        [11, 1, 12],
        [11, 1, 13],
        [11, 3, 13, -28, 14],
        [11, 3, 13, -4, 14],
        [13, 1, 15],
        [13, 2, 13, 16],
        [15, 1, 17],
        [15, 3, -29, 2, -30],
        [15, 1, -15],
        [15, 1, -16],
        [15, 1, 18],
        [18, 3, -13, -29, -30],
        [18, 4, -13, -29, 19, -30],
        [19, 1, 20],
        [19, 3, 20, -31, 19],
        [20, 1, 2],
        [12, 1, 14],
        [12, 1, 21],
        [21, 1, -28],
        [21, 2, -28, 14],
        [21, 1, 22],
        [14, 1, 23],
        [14, 3, 14, -28, 23],
        [14, 1, 24],
        [23, 2, 25, 26],
        [23, 1, 26],
        [23, 3, 25, 26, 27],
        [23, 2, 26, 27],
        [23, 1, 28],
        [27, 1, 16],
        [27, 2, 16, 27],
        [25, 2, -14, -3],
        [25, 1, -32],
        [26, 1, 29],
        [26, 3, -20, -29, -30],
        [26, 4, -21, -29, -15, -30],
        [16, 3, -33, 30, -34],
        [30, 1, 2],
        [22, 2, -4, 14],
        [24, 3, 14, -4, 23],
        [28, 1, -35],
        [28, 1, -2],
        [17, 2, -36, -18],
        [29, 1, -17],
        [29, 1, -19],
        [29, 1, -18]
    ];
    XPathParser.DOUBLEDOT = 2;
    XPathParser.DOUBLECOLON = 3;
    XPathParser.DOUBLESLASH =
        4;
    XPathParser.NOTEQUAL = 5;
    XPathParser.LESSTHANOREQUAL = 6;
    XPathParser.GREATERTHANOREQUAL = 7;
    XPathParser.AND = 8;
    XPathParser.OR = 9;
    XPathParser.MOD = 10;
    XPathParser.DIV = 11;
    XPathParser.MULTIPLYOPERATOR = 12;
    XPathParser.FUNCTIONNAME = 13;
    XPathParser.AXISNAME = 14;
    XPathParser.LITERAL = 15;
    XPathParser.NUMBER = 16;
    XPathParser.ASTERISKNAMETEST = 17;
    XPathParser.QNAME = 18;
    XPathParser.NCNAMECOLONASTERISK = 19;
    XPathParser.NODETYPE = 20;
    XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
    XPathParser.EQUALS = 22;
    XPathParser.LESSTHAN = 23;
    XPathParser.GREATERTHAN =
        24;
    XPathParser.PLUS = 25;
    XPathParser.MINUS = 26;
    XPathParser.BAR = 27;
    XPathParser.SLASH = 28;
    XPathParser.LEFTPARENTHESIS = 29;
    XPathParser.RIGHTPARENTHESIS = 30;
    XPathParser.COMMA = 31;
    XPathParser.AT = 32;
    XPathParser.LEFTBRACKET = 33;
    XPathParser.RIGHTBRACKET = 34;
    XPathParser.DOT = 35;
    XPathParser.DOLLAR = 36;
    XPathParser.prototype.tokenize = function(s1) {
        var types = [];
        var values = [];
        var s = s1 + "\x00";
        var pos = 0;
        var c = s.charAt(pos++);
        while (1) {
            while (c == " " || c == "\t" || c == "\r" || c == "\n") c = s.charAt(pos++);
            if (c == "\x00" || pos >= s.length) break;
            if (c == "(") {
                types.push(XPathParser.LEFTPARENTHESIS);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == ")") {
                types.push(XPathParser.RIGHTPARENTHESIS);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == "[") {
                types.push(XPathParser.LEFTBRACKET);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == "]") {
                types.push(XPathParser.RIGHTBRACKET);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == "@") {
                types.push(XPathParser.AT);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == ",") {
                types.push(XPathParser.COMMA);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == "|") {
                types.push(XPathParser.BAR);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == "+") {
                types.push(XPathParser.PLUS);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == "-") {
                types.push(XPathParser.MINUS);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == "=") {
                types.push(XPathParser.EQUALS);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == "$") {
                types.push(XPathParser.DOLLAR);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == ".") {
                c = s.charAt(pos++);
                if (c == ".") {
                    types.push(XPathParser.DOUBLEDOT);
                    values.push("..");
                    c = s.charAt(pos++);
                    continue
                }
                if (c >= "0" && c <= "9") {
                    var number = "." + c;
                    c = s.charAt(pos++);
                    while (c >= "0" && c <= "9") {
                        number += c;
                        c = s.charAt(pos++)
                    }
                    types.push(XPathParser.NUMBER);
                    values.push(number);
                    continue
                }
                types.push(XPathParser.DOT);
                values.push(".");
                continue
            }
            if (c == "'" || c == '"') {
                var delimiter = c;
                var literal = "";
                while (pos < s.length && (c = s.charAt(pos)) !== delimiter) {
                    literal += c;
                    pos += 1
                }
                if (c !== delimiter) throw XPathException.fromMessage("Unterminated string literal: " + delimiter + literal);
                pos += 1;
                types.push(XPathParser.LITERAL);
                values.push(literal);
                c = s.charAt(pos++);
                continue
            }
            if (c >= "0" && c <= "9") {
                var number = c;
                c = s.charAt(pos++);
                while (c >= "0" && c <= "9") {
                    number += c;
                    c = s.charAt(pos++)
                }
                if (c == ".")
                    if (s.charAt(pos) >= "0" && s.charAt(pos) <= "9") {
                        number += c;
                        number += s.charAt(pos++);
                        c = s.charAt(pos++);
                        while (c >= "0" && c <= "9") {
                            number += c;
                            c = s.charAt(pos++)
                        }
                    }
                types.push(XPathParser.NUMBER);
                values.push(number);
                continue
            }
            if (c == "*") {
                if (types.length > 0) {
                    var last = types[types.length - 1];
                    if (last != XPathParser.AT && last != XPathParser.DOUBLECOLON && last != XPathParser.LEFTPARENTHESIS &&
                        last != XPathParser.LEFTBRACKET && last != XPathParser.AND && last != XPathParser.OR && last != XPathParser.MOD && last != XPathParser.DIV && last != XPathParser.MULTIPLYOPERATOR && last != XPathParser.SLASH && last != XPathParser.DOUBLESLASH && last != XPathParser.BAR && last != XPathParser.PLUS && last != XPathParser.MINUS && last != XPathParser.EQUALS && last != XPathParser.NOTEQUAL && last != XPathParser.LESSTHAN && last != XPathParser.LESSTHANOREQUAL && last != XPathParser.GREATERTHAN && last != XPathParser.GREATERTHANOREQUAL) {
                        types.push(XPathParser.MULTIPLYOPERATOR);
                        values.push(c);
                        c = s.charAt(pos++);
                        continue
                    }
                }
                types.push(XPathParser.ASTERISKNAMETEST);
                values.push(c);
                c = s.charAt(pos++);
                continue
            }
            if (c == ":")
                if (s.charAt(pos) == ":") {
                    types.push(XPathParser.DOUBLECOLON);
                    values.push("::");
                    pos++;
                    c = s.charAt(pos++);
                    continue
                }
            if (c == "/") {
                c = s.charAt(pos++);
                if (c == "/") {
                    types.push(XPathParser.DOUBLESLASH);
                    values.push("//");
                    c = s.charAt(pos++);
                    continue
                }
                types.push(XPathParser.SLASH);
                values.push("/");
                continue
            }
            if (c == "!")
                if (s.charAt(pos) == "=") {
                    types.push(XPathParser.NOTEQUAL);
                    values.push("!=");
                    pos++;
                    c = s.charAt(pos++);
                    continue
                }
            if (c == "<") {
                if (s.charAt(pos) == "=") {
                    types.push(XPathParser.LESSTHANOREQUAL);
                    values.push("<=");
                    pos++;
                    c = s.charAt(pos++);
                    continue
                }
                types.push(XPathParser.LESSTHAN);
                values.push("<");
                c = s.charAt(pos++);
                continue
            }
            if (c == ">") {
                if (s.charAt(pos) == "=") {
                    types.push(XPathParser.GREATERTHANOREQUAL);
                    values.push(">=");
                    pos++;
                    c = s.charAt(pos++);
                    continue
                }
                types.push(XPathParser.GREATERTHAN);
                values.push(">");
                c = s.charAt(pos++);
                continue
            }
            if (c == "_" || Utilities.isLetter(c.charCodeAt(0))) {
                var name = c;
                c = s.charAt(pos++);
                while (Utilities.isNCNameChar(c.charCodeAt(0))) {
                    name += c;
                    c = s.charAt(pos++)
                }
                if (types.length > 0) {
                    var last = types[types.length - 1];
                    if (last != XPathParser.AT && last != XPathParser.DOUBLECOLON && last != XPathParser.LEFTPARENTHESIS && last != XPathParser.LEFTBRACKET && last != XPathParser.AND && last != XPathParser.OR && last != XPathParser.MOD && last != XPathParser.DIV && last != XPathParser.MULTIPLYOPERATOR && last != XPathParser.SLASH && last != XPathParser.DOUBLESLASH && last != XPathParser.BAR && last != XPathParser.PLUS && last != XPathParser.MINUS &&
                        last != XPathParser.EQUALS && last != XPathParser.NOTEQUAL && last != XPathParser.LESSTHAN && last != XPathParser.LESSTHANOREQUAL && last != XPathParser.GREATERTHAN && last != XPathParser.GREATERTHANOREQUAL) {
                        if (name == "and") {
                            types.push(XPathParser.AND);
                            values.push(name);
                            continue
                        }
                        if (name == "or") {
                            types.push(XPathParser.OR);
                            values.push(name);
                            continue
                        }
                        if (name == "mod") {
                            types.push(XPathParser.MOD);
                            values.push(name);
                            continue
                        }
                        if (name == "div") {
                            types.push(XPathParser.DIV);
                            values.push(name);
                            continue
                        }
                    }
                }
                if (c == ":") {
                    if (s.charAt(pos) == "*") {
                        types.push(XPathParser.NCNAMECOLONASTERISK);
                        values.push(name + ":*");
                        pos++;
                        c = s.charAt(pos++);
                        continue
                    }
                    if (s.charAt(pos) == "_" || Utilities.isLetter(s.charCodeAt(pos))) {
                        name += ":";
                        c = s.charAt(pos++);
                        while (Utilities.isNCNameChar(c.charCodeAt(0))) {
                            name += c;
                            c = s.charAt(pos++)
                        }
                        if (c == "(") {
                            types.push(XPathParser.FUNCTIONNAME);
                            values.push(name);
                            continue
                        }
                        types.push(XPathParser.QNAME);
                        values.push(name);
                        continue
                    }
                    if (s.charAt(pos) == ":") {
                        types.push(XPathParser.AXISNAME);
                        values.push(name);
                        continue
                    }
                }
                if (c == "(") {
                    if (name == "comment" || name == "text" || name == "node") {
                        types.push(XPathParser.NODETYPE);
                        values.push(name);
                        continue
                    }
                    if (name == "processing-instruction") {
                        if (s.charAt(pos) == ")") types.push(XPathParser.NODETYPE);
                        else types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
                        values.push(name);
                        continue
                    }
                    types.push(XPathParser.FUNCTIONNAME);
                    values.push(name);
                    continue
                }
                types.push(XPathParser.QNAME);
                values.push(name);
                continue
            }
            throw new Error("Unexpected character " + c);
        }
        types.push(1);
        values.push("[EOF]");
        return [types, values]
    };
    XPathParser.SHIFT = "s";
    XPathParser.REDUCE = "r";
    XPathParser.ACCEPT = "a";
    XPathParser.prototype.parse =
        function(s) {
            var types;
            var values;
            var res = this.tokenize(s);
            if (res == undefined) return undefined;
            types = res[0];
            values = res[1];
            var tokenPos = 0;
            var state = [];
            var tokenType = [];
            var tokenValue = [];
            var s;
            var a;
            var t;
            state.push(0);
            tokenType.push(1);
            tokenValue.push("_S");
            a = types[tokenPos];
            t = values[tokenPos++];
            while (1) {
                s = state[state.length - 1];
                switch (XPathParser.actionTable[s].charAt(a - 1)) {
                    case XPathParser.SHIFT:
                        tokenType.push(-a);
                        tokenValue.push(t);
                        state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
                        a =
                            types[tokenPos];
                        t = values[tokenPos++];
                        break;
                    case XPathParser.REDUCE:
                        var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
                        var rhs = [];
                        for (var i = 0; i < num; i++) {
                            tokenType.pop();
                            rhs.unshift(tokenValue.pop());
                            state.pop()
                        }
                        var s_ = state[state.length - 1];
                        tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
                        if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == undefined) tokenValue.push(rhs[0]);
                        else tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a -
                            1) - 32](rhs));
                        state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
                        break;
                    case XPathParser.ACCEPT:
                        return new XPath(tokenValue.pop());
                    default:
                        throw new Error("XPath parse error");
                }
            }
        };
    XPath.prototype = new Object;
    XPath.prototype.constructor = XPath;
    XPath.superclass = Object.prototype;

    function XPath(e) {
        this.expression = e
    }
    XPath.prototype.toString = function() {
        return this.expression.toString()
    };

    function setIfUnset(obj, prop, value) {
        if (!(prop in
                obj)) obj[prop] = value
    }
    XPath.prototype.evaluate = function(c) {
        c.contextNode = c.expressionContextNode;
        c.contextSize = 1;
        c.contextPosition = 1;
        if (c.isHtml) {
            setIfUnset(c, "caseInsensitive", true);
            setIfUnset(c, "allowAnyNamespaceForNoPrefix", true)
        }
        setIfUnset(c, "caseInsensitive", false);
        return this.expression.evaluate(c)
    };
    XPath.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
    XPath.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";
    Expression.prototype = new Object;
    Expression.prototype.constructor = Expression;
    Expression.superclass = Object.prototype;

    function Expression() {}
    Expression.prototype.init = function() {};
    Expression.prototype.toString = function() {
        return "<Expression>"
    };
    Expression.prototype.evaluate = function(c) {
        throw new Error("Could not evaluate expression.");
    };
    UnaryOperation.prototype = new Expression;
    UnaryOperation.prototype.constructor = UnaryOperation;
    UnaryOperation.superclass = Expression.prototype;

    function UnaryOperation(rhs) {
        if (arguments.length > 0) this.init(rhs)
    }
    UnaryOperation.prototype.init = function(rhs) {
        this.rhs =
            rhs
    };
    UnaryMinusOperation.prototype = new UnaryOperation;
    UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
    UnaryMinusOperation.superclass = UnaryOperation.prototype;

    function UnaryMinusOperation(rhs) {
        if (arguments.length > 0) this.init(rhs)
    }
    UnaryMinusOperation.prototype.init = function(rhs) {
        UnaryMinusOperation.superclass.init.call(this, rhs)
    };
    UnaryMinusOperation.prototype.evaluate = function(c) {
        return this.rhs.evaluate(c).number().negate()
    };
    UnaryMinusOperation.prototype.toString = function() {
        return "-" +
            this.rhs.toString()
    };
    BinaryOperation.prototype = new Expression;
    BinaryOperation.prototype.constructor = BinaryOperation;
    BinaryOperation.superclass = Expression.prototype;

    function BinaryOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    BinaryOperation.prototype.init = function(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs
    };
    OrOperation.prototype = new BinaryOperation;
    OrOperation.prototype.constructor = OrOperation;
    OrOperation.superclass = BinaryOperation.prototype;

    function OrOperation(lhs, rhs) {
        if (arguments.length >
            0) this.init(lhs, rhs)
    }
    OrOperation.prototype.init = function(lhs, rhs) {
        OrOperation.superclass.init.call(this, lhs, rhs)
    };
    OrOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")"
    };
    OrOperation.prototype.evaluate = function(c) {
        var b = this.lhs.evaluate(c).bool();
        if (b.booleanValue()) return b;
        return this.rhs.evaluate(c).bool()
    };
    AndOperation.prototype = new BinaryOperation;
    AndOperation.prototype.constructor = AndOperation;
    AndOperation.superclass = BinaryOperation.prototype;

    function AndOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    AndOperation.prototype.init = function(lhs, rhs) {
        AndOperation.superclass.init.call(this, lhs, rhs)
    };
    AndOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")"
    };
    AndOperation.prototype.evaluate = function(c) {
        var b = this.lhs.evaluate(c).bool();
        if (!b.booleanValue()) return b;
        return this.rhs.evaluate(c).bool()
    };
    EqualsOperation.prototype = new BinaryOperation;
    EqualsOperation.prototype.constructor =
        EqualsOperation;
    EqualsOperation.superclass = BinaryOperation.prototype;

    function EqualsOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    EqualsOperation.prototype.init = function(lhs, rhs) {
        EqualsOperation.superclass.init.call(this, lhs, rhs)
    };
    EqualsOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")"
    };
    EqualsOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).equals(this.rhs.evaluate(c))
    };
    NotEqualOperation.prototype = new BinaryOperation;
    NotEqualOperation.prototype.constructor = NotEqualOperation;
    NotEqualOperation.superclass = BinaryOperation.prototype;

    function NotEqualOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    NotEqualOperation.prototype.init = function(lhs, rhs) {
        NotEqualOperation.superclass.init.call(this, lhs, rhs)
    };
    NotEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")"
    };
    NotEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c))
    };
    LessThanOperation.prototype = new BinaryOperation;
    LessThanOperation.prototype.constructor = LessThanOperation;
    LessThanOperation.superclass = BinaryOperation.prototype;

    function LessThanOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    LessThanOperation.prototype.init = function(lhs, rhs) {
        LessThanOperation.superclass.init.call(this, lhs, rhs)
    };
    LessThanOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c))
    };
    LessThanOperation.prototype.toString = function() {
        return "(" +
            this.lhs.toString() + " < " + this.rhs.toString() + ")"
    };
    GreaterThanOperation.prototype = new BinaryOperation;
    GreaterThanOperation.prototype.constructor = GreaterThanOperation;
    GreaterThanOperation.superclass = BinaryOperation.prototype;

    function GreaterThanOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    GreaterThanOperation.prototype.init = function(lhs, rhs) {
        GreaterThanOperation.superclass.init.call(this, lhs, rhs)
    };
    GreaterThanOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c))
    };
    GreaterThanOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")"
    };
    LessThanOrEqualOperation.prototype = new BinaryOperation;
    LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
    LessThanOrEqualOperation.superclass = BinaryOperation.prototype;

    function LessThanOrEqualOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    LessThanOrEqualOperation.prototype.init = function(lhs, rhs) {
        LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs)
    };
    LessThanOrEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c))
    };
    LessThanOrEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")"
    };
    GreaterThanOrEqualOperation.prototype = new BinaryOperation;
    GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
    GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;

    function GreaterThanOrEqualOperation(lhs, rhs) {
        if (arguments.length >
            0) this.init(lhs, rhs)
    }
    GreaterThanOrEqualOperation.prototype.init = function(lhs, rhs) {
        GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs)
    };
    GreaterThanOrEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c))
    };
    GreaterThanOrEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")"
    };
    PlusOperation.prototype = new BinaryOperation;
    PlusOperation.prototype.constructor = PlusOperation;
    PlusOperation.superclass =
        BinaryOperation.prototype;

    function PlusOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    PlusOperation.prototype.init = function(lhs, rhs) {
        PlusOperation.superclass.init.call(this, lhs, rhs)
    };
    PlusOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number())
    };
    PlusOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")"
    };
    MinusOperation.prototype = new BinaryOperation;
    MinusOperation.prototype.constructor =
        MinusOperation;
    MinusOperation.superclass = BinaryOperation.prototype;

    function MinusOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    MinusOperation.prototype.init = function(lhs, rhs) {
        MinusOperation.superclass.init.call(this, lhs, rhs)
    };
    MinusOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number())
    };
    MinusOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")"
    };
    MultiplyOperation.prototype = new BinaryOperation;
    MultiplyOperation.prototype.constructor = MultiplyOperation;
    MultiplyOperation.superclass = BinaryOperation.prototype;

    function MultiplyOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    MultiplyOperation.prototype.init = function(lhs, rhs) {
        MultiplyOperation.superclass.init.call(this, lhs, rhs)
    };
    MultiplyOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number())
    };
    MultiplyOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " * " +
            this.rhs.toString() + ")"
    };
    DivOperation.prototype = new BinaryOperation;
    DivOperation.prototype.constructor = DivOperation;
    DivOperation.superclass = BinaryOperation.prototype;

    function DivOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    DivOperation.prototype.init = function(lhs, rhs) {
        DivOperation.superclass.init.call(this, lhs, rhs)
    };
    DivOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number())
    };
    DivOperation.prototype.toString = function() {
        return "(" +
            this.lhs.toString() + " div " + this.rhs.toString() + ")"
    };
    ModOperation.prototype = new BinaryOperation;
    ModOperation.prototype.constructor = ModOperation;
    ModOperation.superclass = BinaryOperation.prototype;

    function ModOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    ModOperation.prototype.init = function(lhs, rhs) {
        ModOperation.superclass.init.call(this, lhs, rhs)
    };
    ModOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number())
    };
    ModOperation.prototype.toString =
        function() {
            return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")"
        };
    BarOperation.prototype = new BinaryOperation;
    BarOperation.prototype.constructor = BarOperation;
    BarOperation.superclass = BinaryOperation.prototype;

    function BarOperation(lhs, rhs) {
        if (arguments.length > 0) this.init(lhs, rhs)
    }
    BarOperation.prototype.init = function(lhs, rhs) {
        BarOperation.superclass.init.call(this, lhs, rhs)
    };
    BarOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset())
    };
    BarOperation.prototype.toString = function() {
        return map(toString, [this.lhs, this.rhs]).join(" | ")
    };
    PathExpr.prototype = new Expression;
    PathExpr.prototype.constructor = PathExpr;
    PathExpr.superclass = Expression.prototype;

    function PathExpr(filter, filterPreds, locpath) {
        if (arguments.length > 0) this.init(filter, filterPreds, locpath)
    }
    PathExpr.prototype.init = function(filter, filterPreds, locpath) {
        PathExpr.superclass.init.call(this);
        this.filter = filter;
        this.filterPredicates = filterPreds;
        this.locationPath = locpath
    };

    function findRoot(node) {
        while (node &&
            node.parentNode) node = node.parentNode;
        return node
    }
    PathExpr.applyPredicates = function(predicates, c, nodes) {
        return reduce(function(inNodes, pred) {
            var ctx = c.extend({
                contextSize: inNodes.length
            });
            return filter(function(node, i) {
                return PathExpr.predicateMatches(pred, ctx.extend({
                    contextNode: node,
                    contextPosition: i + 1
                }))
            }, inNodes)
        }, nodes, predicates)
    };
    PathExpr.getRoot = function(xpc, nodes) {
        var firstNode = nodes[0];
        if (firstNode.nodeType === 9) return firstNode;
        if (xpc.virtualRoot) return xpc.virtualRoot;
        var ownerDoc = firstNode.ownerDocument;
        if (ownerDoc) return ownerDoc;
        var n = firstNode;
        while (n.parentNode != null) n = n.parentNode;
        return n
    };
    PathExpr.applyStep = function(step, xpc, node) {
        var self = this;
        var newNodes = [];
        xpc.contextNode = node;
        switch (step.axis) {
            case Step.ANCESTOR:
                if (xpc.contextNode === xpc.virtualRoot) break;
                var m;
                if (xpc.contextNode.nodeType == 2) m = PathExpr.getOwnerElement(xpc.contextNode);
                else m = xpc.contextNode.parentNode;
                while (m != null) {
                    if (step.nodeTest.matches(m, xpc)) newNodes.push(m);
                    if (m === xpc.virtualRoot) break;
                    m = m.parentNode
                }
                break;
            case Step.ANCESTORORSELF:
                for (var m =
                        xpc.contextNode; m != null; m = m.nodeType == 2 ? PathExpr.getOwnerElement(m) : m.parentNode) {
                    if (step.nodeTest.matches(m, xpc)) newNodes.push(m);
                    if (m === xpc.virtualRoot) break
                }
                break;
            case Step.ATTRIBUTE:
                var nnm = xpc.contextNode.attributes;
                if (nnm != null)
                    for (var k = 0; k < nnm.length; k++) {
                        var m = nnm.item(k);
                        if (step.nodeTest.matches(m, xpc)) newNodes.push(m)
                    }
                break;
            case Step.CHILD:
                for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling)
                    if (step.nodeTest.matches(m, xpc)) newNodes.push(m);
                break;
            case Step.DESCENDANT:
                var st = [xpc.contextNode.firstChild];
                while (st.length > 0)
                    for (var m = st.pop(); m != null;) {
                        if (step.nodeTest.matches(m, xpc)) newNodes.push(m);
                        if (m.firstChild != null) {
                            st.push(m.nextSibling);
                            m = m.firstChild
                        } else m = m.nextSibling
                    }
                break;
            case Step.DESCENDANTORSELF:
                if (step.nodeTest.matches(xpc.contextNode, xpc)) newNodes.push(xpc.contextNode);
                var st = [xpc.contextNode.firstChild];
                while (st.length > 0)
                    for (var m = st.pop(); m != null;) {
                        if (step.nodeTest.matches(m, xpc)) newNodes.push(m);
                        if (m.firstChild != null) {
                            st.push(m.nextSibling);
                            m = m.firstChild
                        } else m = m.nextSibling
                    }
                break;
            case Step.FOLLOWING:
                if (xpc.contextNode === xpc.virtualRoot) break;
                var st = [];
                if (xpc.contextNode.firstChild != null) st.unshift(xpc.contextNode.firstChild);
                else st.unshift(xpc.contextNode.nextSibling);
                for (var m = xpc.contextNode.parentNode; m != null && m.nodeType != 9 && m !== xpc.virtualRoot; m = m.parentNode) st.unshift(m.nextSibling);
                do
                    for (var m = st.pop(); m != null;) {
                        if (step.nodeTest.matches(m, xpc)) newNodes.push(m);
                        if (m.firstChild != null) {
                            st.push(m.nextSibling);
                            m = m.firstChild
                        } else m = m.nextSibling
                    }
                while (st.length > 0);
                break;
            case Step.FOLLOWINGSIBLING:
                if (xpc.contextNode === xpc.virtualRoot) break;
                for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling)
                    if (step.nodeTest.matches(m, xpc)) newNodes.push(m);
                break;
            case Step.NAMESPACE:
                var n = {};
                if (xpc.contextNode.nodeType == 1) {
                    n["xml"] = XPath.XML_NAMESPACE_URI;
                    n["xmlns"] = XPath.XMLNS_NAMESPACE_URI;
                    for (var m = xpc.contextNode; m != null && m.nodeType == 1; m = m.parentNode)
                        for (var k = 0; k < m.attributes.length; k++) {
                            var attr = m.attributes.item(k);
                            var nm = String(attr.name);
                            if (nm == "xmlns") {
                                if (n[""] ==
                                    undefined) n[""] = attr.value
                            } else if (nm.length > 6 && nm.substring(0, 6) == "xmlns:") {
                                var pre = nm.substring(6, nm.length);
                                if (n[pre] == undefined) n[pre] = attr.value
                            }
                        }
                    for (var pre in n) {
                        var nsn = new XPathNamespace(pre, n[pre], xpc.contextNode);
                        if (step.nodeTest.matches(nsn, xpc)) newNodes.push(nsn)
                    }
                }
                break;
            case Step.PARENT:
                m = null;
                if (xpc.contextNode !== xpc.virtualRoot)
                    if (xpc.contextNode.nodeType == 2) m = PathExpr.getOwnerElement(xpc.contextNode);
                    else m = xpc.contextNode.parentNode;
                if (m != null && step.nodeTest.matches(m, xpc)) newNodes.push(m);
                break;
            case Step.PRECEDING:
                var st;
                if (xpc.virtualRoot != null) st = [xpc.virtualRoot];
                else st = [findRoot(xpc.contextNode)];
                outer: while (st.length > 0)
                    for (var m = st.pop(); m != null;) {
                        if (m == xpc.contextNode) break outer;
                        if (step.nodeTest.matches(m, xpc)) newNodes.unshift(m);
                        if (m.firstChild != null) {
                            st.push(m.nextSibling);
                            m = m.firstChild
                        } else m = m.nextSibling
                    }
                break;
            case Step.PRECEDINGSIBLING:
                if (xpc.contextNode === xpc.virtualRoot) break;
                for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling)
                    if (step.nodeTest.matches(m,
                            xpc)) newNodes.push(m);
                break;
            case Step.SELF:
                if (step.nodeTest.matches(xpc.contextNode, xpc)) newNodes.push(xpc.contextNode);
                break;
            default:
        }
        return newNodes
    };
    PathExpr.applySteps = function(steps, xpc, nodes) {
        return reduce(function(inNodes, step) {
            return [].concat.apply([], map(function(node) {
                return PathExpr.applyPredicates(step.predicates, xpc, PathExpr.applyStep(step, xpc, node))
            }, inNodes))
        }, nodes, steps)
    };
    PathExpr.prototype.applyFilter = function(c, xpc) {
        if (!this.filter) return {
            nodes: [c.contextNode]
        };
        var ns = this.filter.evaluate(c);
        if (!Utilities.instance_of(ns, XNodeSet)) {
            if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) throw new Error("Path expression filter must evaluate to a nodeset if predicates or location path are used");
            return {
                nonNodes: ns
            }
        }
        return {
            nodes: PathExpr.applyPredicates(this.filterPredicates || [], xpc, ns.toUnsortedArray())
        }
    };
    PathExpr.applyLocationPath = function(locationPath, xpc, nodes) {
        if (!locationPath) return nodes;
        var startNodes = locationPath.absolute ? [PathExpr.getRoot(xpc, nodes)] :
            nodes;
        return PathExpr.applySteps(locationPath.steps, xpc, startNodes)
    };
    PathExpr.prototype.evaluate = function(c) {
        var xpc = assign(new XPathContext, c);
        var filterResult = this.applyFilter(c, xpc);
        if ("nonNodes" in filterResult) return filterResult.nonNodes;
        var ns = new XNodeSet;
        ns.addArray(PathExpr.applyLocationPath(this.locationPath, xpc, filterResult.nodes));
        return ns
    };
    PathExpr.predicateMatches = function(pred, c) {
        var res = pred.evaluate(c);
        return Utilities.instance_of(res, XNumber) ? c.contextPosition == res.numberValue() :
            res.booleanValue()
    };
    PathExpr.predicateString = compose(wrap("[", "]"), toString);
    PathExpr.predicatesString = compose(join(""), map(PathExpr.predicateString));
    PathExpr.prototype.toString = function() {
        if (this.filter != undefined) {
            var filterStr = toString(this.filter);
            if (Utilities.instance_of(this.filter, XString)) return wrap("'", "'", filterStr);
            if (this.filterPredicates != undefined && this.filterPredicates.length) return wrap("(", ")", filterStr) + PathExpr.predicatesString(this.filterPredicates);
            if (this.locationPath != undefined) return filterStr +
                (this.locationPath.absolute ? "" : "/") + toString(this.locationPath);
            return filterStr
        }
        return toString(this.locationPath)
    };
    PathExpr.getOwnerElement = function(n) {
        if (n.ownerElement) return n.ownerElement;
        try {
            if (n.selectSingleNode) return n.selectSingleNode("..")
        } catch (e) {}
        var doc = n.nodeType == 9 ? n : n.ownerDocument;
        var elts = doc.getElementsByTagName("*");
        for (var i = 0; i < elts.length; i++) {
            var elt = elts.item(i);
            var nnm = elt.attributes;
            for (var j = 0; j < nnm.length; j++) {
                var an = nnm.item(j);
                if (an === n) return elt
            }
        }
        return null
    };
    LocationPath.prototype =
        new Object;
    LocationPath.prototype.constructor = LocationPath;
    LocationPath.superclass = Object.prototype;

    function LocationPath(abs, steps) {
        if (arguments.length > 0) this.init(abs, steps)
    }
    LocationPath.prototype.init = function(abs, steps) {
        this.absolute = abs;
        this.steps = steps
    };
    LocationPath.prototype.toString = function() {
        return (this.absolute ? "/" : "") + map(toString, this.steps).join("/")
    };
    Step.prototype = new Object;
    Step.prototype.constructor = Step;
    Step.superclass = Object.prototype;

    function Step(axis, nodetest, preds) {
        if (arguments.length >
            0) this.init(axis, nodetest, preds)
    }
    Step.prototype.init = function(axis, nodetest, preds) {
        this.axis = axis;
        this.nodeTest = nodetest;
        this.predicates = preds
    };
    Step.prototype.toString = function() {
        return Step.STEPNAMES[this.axis] + "::" + this.nodeTest.toString() + PathExpr.predicatesString(this.predicates)
    };
    Step.ANCESTOR = 0;
    Step.ANCESTORORSELF = 1;
    Step.ATTRIBUTE = 2;
    Step.CHILD = 3;
    Step.DESCENDANT = 4;
    Step.DESCENDANTORSELF = 5;
    Step.FOLLOWING = 6;
    Step.FOLLOWINGSIBLING = 7;
    Step.NAMESPACE = 8;
    Step.PARENT = 9;
    Step.PRECEDING = 10;
    Step.PRECEDINGSIBLING =
        11;
    Step.SELF = 12;
    Step.STEPNAMES = reduce(function(acc, x) {
        return acc[x[0]] = x[1], acc
    }, {}, [
        [Step.ANCESTOR, "ancestor"],
        [Step.ANCESTORORSELF, "ancestor-or-self"],
        [Step.ATTRIBUTE, "attribute"],
        [Step.CHILD, "child"],
        [Step.DESCENDANT, "descendant"],
        [Step.DESCENDANTORSELF, "descendant-or-self"],
        [Step.FOLLOWING, "following"],
        [Step.FOLLOWINGSIBLING, "following-sibling"],
        [Step.NAMESPACE, "namespace"],
        [Step.PARENT, "parent"],
        [Step.PRECEDING, "preceding"],
        [Step.PRECEDINGSIBLING, "preceding-sibling"],
        [Step.SELF, "self"]
    ]);
    NodeTest.prototype =
        new Object;
    NodeTest.prototype.constructor = NodeTest;
    NodeTest.superclass = Object.prototype;

    function NodeTest(type, value) {
        if (arguments.length > 0) this.init(type, value)
    }
    NodeTest.prototype.init = function(type, value) {
        this.type = type;
        this.value = value
    };
    NodeTest.prototype.toString = function() {
        return "<unknown nodetest type>"
    };
    NodeTest.prototype.matches = function(n, xpc) {
        console.warn("unknown node test type")
    };
    NodeTest.NAMETESTANY = 0;
    NodeTest.NAMETESTPREFIXANY = 1;
    NodeTest.NAMETESTQNAME = 2;
    NodeTest.COMMENT = 3;
    NodeTest.TEXT =
        4;
    NodeTest.PI = 5;
    NodeTest.NODE = 6;
    NodeTest.isNodeType = function(types) {
        return compose(includes(types), prop("nodeType"))
    };
    NodeTest.makeNodeTestType = function(type, members, ctor) {
        var newType = ctor || function() {};
        newType.prototype = new NodeTest(members.type);
        newType.prototype.constructor = type;
        for (var key in members) newType.prototype[key] = members[key];
        return newType
    };
    NodeTest.makeNodeTypeTest = function(type, nodeTypes, stringVal) {
        return new(NodeTest.makeNodeTestType(type, {
            matches: NodeTest.isNodeType(nodeTypes),
            toString: always(stringVal)
        }))
    };
    NodeTest.hasPrefix = function(node) {
        return node.prefix || (node.nodeName || node.tagName).indexOf(":") !== -1
    };
    NodeTest.isElementOrAttribute = NodeTest.isNodeType([1, 2]);
    NodeTest.nameSpaceMatches = function(prefix, xpc, n) {
        var nNamespace = n.namespaceURI || "";
        if (!prefix) return !nNamespace || xpc.allowAnyNamespaceForNoPrefix && !NodeTest.hasPrefix(n);
        var ns = xpc.namespaceResolver.getNamespace(prefix, xpc.expressionContextNode);
        if (ns == null) throw new Error("Cannot resolve QName " + prefix);
        return ns ===
            nNamespace
    };
    NodeTest.localNameMatches = function(localName, xpc, n) {
        var nLocalName = n.localName || n.nodeName;
        return xpc.caseInsensitive ? localName.toLowerCase() === nLocalName.toLowerCase() : localName === nLocalName
    };
    NodeTest.NameTestPrefixAny = NodeTest.makeNodeTestType(NodeTest.NAMETESTPREFIXANY, {
        matches: function(n, xpc) {
            return NodeTest.isElementOrAttribute(n) && NodeTest.nameSpaceMatches(this.prefix, xpc, n)
        },
        toString: function() {
            return this.prefix + ":*"
        }
    }, function(prefix) {
        this.prefix = prefix
    });
    NodeTest.NameTestQName =
        NodeTest.makeNodeTestType(NodeTest.NAMETESTQNAME, {
            matches: function(n, xpc) {
                return NodeTest.isNodeType([1, 2, XPathNamespace.XPATH_NAMESPACE_NODE])(n) && NodeTest.nameSpaceMatches(this.prefix, xpc, n) && NodeTest.localNameMatches(this.localName, xpc, n)
            },
            toString: function() {
                return this.name
            }
        }, function(name) {
            var nameParts = name.split(":");
            this.name = name;
            this.prefix = nameParts.length > 1 ? nameParts[0] : null;
            this.localName = nameParts[nameParts.length > 1 ? 1 : 0]
        });
    NodeTest.PITest = NodeTest.makeNodeTestType(NodeTest.PI, {
        matches: function(n,
            xpc) {
            return NodeTest.isNodeType([7])(n) && (n.target || n.nodeName) === this.name
        },
        toString: function() {
            return wrap('processing-instruction("', '")', this.name)
        }
    }, function(name) {
        this.name = name
    });
    NodeTest.nameTestAny = NodeTest.makeNodeTypeTest(NodeTest.NAMETESTANY, [1, 2, XPathNamespace.XPATH_NAMESPACE_NODE], "*");
    NodeTest.textTest = NodeTest.makeNodeTypeTest(NodeTest.TEXT, [3, 4], "text()");
    NodeTest.commentTest = NodeTest.makeNodeTypeTest(NodeTest.COMMENT, [8], "comment()");
    NodeTest.nodeTest = NodeTest.makeNodeTypeTest(NodeTest.NODE, [1, 2, 3, 4, 7, 8, 9], "node()");
    NodeTest.anyPiTest = NodeTest.makeNodeTypeTest(NodeTest.PI, [7], "processing-instruction()");
    VariableReference.prototype = new Expression;
    VariableReference.prototype.constructor = VariableReference;
    VariableReference.superclass = Expression.prototype;

    function VariableReference(v) {
        if (arguments.length > 0) this.init(v)
    }
    VariableReference.prototype.init = function(v) {
        this.variable = v
    };
    VariableReference.prototype.toString = function() {
        return "$" + this.variable
    };
    VariableReference.prototype.evaluate =
        function(c) {
            var parts = Utilities.resolveQName(this.variable, c.namespaceResolver, c.contextNode, false);
            if (parts[0] == null) throw new Error("Cannot resolve QName " + fn);
            var result = c.variableResolver.getVariable(parts[1], parts[0]);
            if (!result) throw XPathException.fromMessage("Undeclared variable: " + this.toString());
            return result
        };
    FunctionCall.prototype = new Expression;
    FunctionCall.prototype.constructor = FunctionCall;
    FunctionCall.superclass = Expression.prototype;

    function FunctionCall(fn, args) {
        if (arguments.length >
            0) this.init(fn, args)
    }
    FunctionCall.prototype.init = function(fn, args) {
        this.functionName = fn;
        this.arguments = args
    };
    FunctionCall.prototype.toString = function() {
        var s = this.functionName + "(";
        for (var i = 0; i < this.arguments.length; i++) {
            if (i > 0) s += ", ";
            s += this.arguments[i].toString()
        }
        return s + ")"
    };
    FunctionCall.prototype.evaluate = function(c) {
        var f = FunctionResolver.getFunctionFromContext(this.functionName, c);
        if (!f) throw new Error("Unknown function " + this.functionName);
        var a = [c].concat(this.arguments);
        return f.apply(c.functionResolver.thisArg,
            a)
    };
    var Operators = new Object;
    Operators.equals = function(l, r) {
        return l.equals(r)
    };
    Operators.notequal = function(l, r) {
        return l.notequal(r)
    };
    Operators.lessthan = function(l, r) {
        return l.lessthan(r)
    };
    Operators.greaterthan = function(l, r) {
        return l.greaterthan(r)
    };
    Operators.lessthanorequal = function(l, r) {
        return l.lessthanorequal(r)
    };
    Operators.greaterthanorequal = function(l, r) {
        return l.greaterthanorequal(r)
    };
    XString.prototype = new Expression;
    XString.prototype.constructor = XString;
    XString.superclass = Expression.prototype;

    function XString(s) {
        if (arguments.length > 0) this.init(s)
    }
    XString.prototype.init = function(s) {
        this.str = String(s)
    };
    XString.prototype.toString = function() {
        return this.str
    };
    XString.prototype.evaluate = function(c) {
        return this
    };
    XString.prototype.string = function() {
        return this
    };
    XString.prototype.number = function() {
        return new XNumber(this.str)
    };
    XString.prototype.bool = function() {
        return new XBoolean(this.str)
    };
    XString.prototype.nodeset = function() {
        throw new Error("Cannot convert string to nodeset");
    };
    XString.prototype.stringValue =
        function() {
            return this.str
        };
    XString.prototype.numberValue = function() {
        return this.number().numberValue()
    };
    XString.prototype.booleanValue = function() {
        return this.bool().booleanValue()
    };
    XString.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XBoolean)) return this.bool().equals(r);
        if (Utilities.instance_of(r, XNumber)) return this.number().equals(r);
        if (Utilities.instance_of(r, XNodeSet)) return r.compareWithString(this, Operators.equals);
        return new XBoolean(this.str == r.str)
    };
    XString.prototype.notequal =
        function(r) {
            if (Utilities.instance_of(r, XBoolean)) return this.bool().notequal(r);
            if (Utilities.instance_of(r, XNumber)) return this.number().notequal(r);
            if (Utilities.instance_of(r, XNodeSet)) return r.compareWithString(this, Operators.notequal);
            return new XBoolean(this.str != r.str)
        };
    XString.prototype.lessthan = function(r) {
        return this.number().lessthan(r)
    };
    XString.prototype.greaterthan = function(r) {
        return this.number().greaterthan(r)
    };
    XString.prototype.lessthanorequal = function(r) {
        return this.number().lessthanorequal(r)
    };
    XString.prototype.greaterthanorequal = function(r) {
        return this.number().greaterthanorequal(r)
    };
    XNumber.prototype = new Expression;
    XNumber.prototype.constructor = XNumber;
    XNumber.superclass = Expression.prototype;

    function XNumber(n) {
        if (arguments.length > 0) this.init(n)
    }
    XNumber.prototype.init = function(n) {
        this.num = typeof n === "string" ? this.parse(n) : Number(n)
    };
    XNumber.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/;
    XNumber.prototype.parse = function(s) {
        return this.numberFormat.test(s) ? parseFloat(s) : Number.NaN
    };

    function padSmallNumber(numberStr) {
        var parts = numberStr.split("e-");
        var base = parts[0].replace(".", "");
        var exponent = Number(parts[1]);
        for (var i = 0; i < exponent - 1; i += 1) base = "0" + base;
        return "0." + base
    }

    function padLargeNumber(numberStr) {
        var parts = numberStr.split("e");
        var base = parts[0].replace(".", "");
        var exponent = Number(parts[1]);
        var zerosToAppend = exponent + 1 - base.length;
        for (var i = 0; i < zerosToAppend; i += 1) base += "0";
        return base
    }
    XNumber.prototype.toString = function() {
        var strValue = this.num.toString();
        if (strValue.indexOf("e-") !==
            -1) return padSmallNumber(strValue);
        if (strValue.indexOf("e") !== -1) return padLargeNumber(strValue);
        return strValue
    };
    XNumber.prototype.evaluate = function(c) {
        return this
    };
    XNumber.prototype.string = function() {
        return new XString(this.toString())
    };
    XNumber.prototype.number = function() {
        return this
    };
    XNumber.prototype.bool = function() {
        return new XBoolean(this.num)
    };
    XNumber.prototype.nodeset = function() {
        throw new Error("Cannot convert number to nodeset");
    };
    XNumber.prototype.stringValue = function() {
        return this.string().stringValue()
    };
    XNumber.prototype.numberValue = function() {
        return this.num
    };
    XNumber.prototype.booleanValue = function() {
        return this.bool().booleanValue()
    };
    XNumber.prototype.negate = function() {
        return new XNumber(-this.num)
    };
    XNumber.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XBoolean)) return this.bool().equals(r);
        if (Utilities.instance_of(r, XString)) return this.equals(r.number());
        if (Utilities.instance_of(r, XNodeSet)) return r.compareWithNumber(this, Operators.equals);
        return new XBoolean(this.num == r.num)
    };
    XNumber.prototype.notequal =
        function(r) {
            if (Utilities.instance_of(r, XBoolean)) return this.bool().notequal(r);
            if (Utilities.instance_of(r, XString)) return this.notequal(r.number());
            if (Utilities.instance_of(r, XNodeSet)) return r.compareWithNumber(this, Operators.notequal);
            return new XBoolean(this.num != r.num)
        };
    XNumber.prototype.lessthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) return r.compareWithNumber(this, Operators.greaterthan);
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) return this.lessthan(r.number());
        return new XBoolean(this.num < r.num)
    };
    XNumber.prototype.greaterthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) return r.compareWithNumber(this, Operators.lessthan);
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) return this.greaterthan(r.number());
        return new XBoolean(this.num > r.num)
    };
    XNumber.prototype.lessthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) return r.compareWithNumber(this, Operators.greaterthanorequal);
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r,
                XString)) return this.lessthanorequal(r.number());
        return new XBoolean(this.num <= r.num)
    };
    XNumber.prototype.greaterthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) return r.compareWithNumber(this, Operators.lessthanorequal);
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) return this.greaterthanorequal(r.number());
        return new XBoolean(this.num >= r.num)
    };
    XNumber.prototype.plus = function(r) {
        return new XNumber(this.num + r.num)
    };
    XNumber.prototype.minus = function(r) {
        return new XNumber(this.num -
            r.num)
    };
    XNumber.prototype.multiply = function(r) {
        return new XNumber(this.num * r.num)
    };
    XNumber.prototype.div = function(r) {
        return new XNumber(this.num / r.num)
    };
    XNumber.prototype.mod = function(r) {
        return new XNumber(this.num % r.num)
    };
    XBoolean.prototype = new Expression;
    XBoolean.prototype.constructor = XBoolean;
    XBoolean.superclass = Expression.prototype;

    function XBoolean(b) {
        if (arguments.length > 0) this.init(b)
    }
    XBoolean.prototype.init = function(b) {
        this.b = Boolean(b)
    };
    XBoolean.prototype.toString = function() {
        return this.b.toString()
    };
    XBoolean.prototype.evaluate = function(c) {
        return this
    };
    XBoolean.prototype.string = function() {
        return new XString(this.b)
    };
    XBoolean.prototype.number = function() {
        return new XNumber(this.b)
    };
    XBoolean.prototype.bool = function() {
        return this
    };
    XBoolean.prototype.nodeset = function() {
        throw new Error("Cannot convert boolean to nodeset");
    };
    XBoolean.prototype.stringValue = function() {
        return this.string().stringValue()
    };
    XBoolean.prototype.numberValue = function() {
        return this.number().numberValue()
    };
    XBoolean.prototype.booleanValue =
        function() {
            return this.b
        };
    XBoolean.prototype.not = function() {
        return new XBoolean(!this.b)
    };
    XBoolean.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) return this.equals(r.bool());
        if (Utilities.instance_of(r, XNodeSet)) return r.compareWithBoolean(this, Operators.equals);
        return new XBoolean(this.b == r.b)
    };
    XBoolean.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) return this.notequal(r.bool());
        if (Utilities.instance_of(r,
                XNodeSet)) return r.compareWithBoolean(this, Operators.notequal);
        return new XBoolean(this.b != r.b)
    };
    XBoolean.prototype.lessthan = function(r) {
        return this.number().lessthan(r)
    };
    XBoolean.prototype.greaterthan = function(r) {
        return this.number().greaterthan(r)
    };
    XBoolean.prototype.lessthanorequal = function(r) {
        return this.number().lessthanorequal(r)
    };
    XBoolean.prototype.greaterthanorequal = function(r) {
        return this.number().greaterthanorequal(r)
    };
    XBoolean.true_ = new XBoolean(true);
    XBoolean.false_ = new XBoolean(false);
    AVLTree.prototype = new Object;
    AVLTree.prototype.constructor = AVLTree;
    AVLTree.superclass = Object.prototype;

    function AVLTree(n) {
        this.init(n)
    }
    AVLTree.prototype.init = function(n) {
        this.left = null;
        this.right = null;
        this.node = n;
        this.depth = 1
    };
    AVLTree.prototype.balance = function() {
        var ldepth = this.left == null ? 0 : this.left.depth;
        var rdepth = this.right == null ? 0 : this.right.depth;
        if (ldepth > rdepth + 1) {
            var lldepth = this.left.left == null ? 0 : this.left.left.depth;
            var lrdepth = this.left.right == null ? 0 : this.left.right.depth;
            if (lldepth <
                lrdepth) this.left.rotateRR();
            this.rotateLL()
        } else if (ldepth + 1 < rdepth) {
            var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
            var rldepth = this.right.left == null ? 0 : this.right.left.depth;
            if (rldepth > rrdepth) this.right.rotateLL();
            this.rotateRR()
        }
    };
    AVLTree.prototype.rotateLL = function() {
        var nodeBefore = this.node;
        var rightBefore = this.right;
        this.node = this.left.node;
        this.right = this.left;
        this.left = this.left.left;
        this.right.left = this.right.right;
        this.right.right = rightBefore;
        this.right.node = nodeBefore;
        this.right.updateInNewLocation();
        this.updateInNewLocation()
    };
    AVLTree.prototype.rotateRR = function() {
        var nodeBefore = this.node;
        var leftBefore = this.left;
        this.node = this.right.node;
        this.left = this.right;
        this.right = this.right.right;
        this.left.right = this.left.left;
        this.left.left = leftBefore;
        this.left.node = nodeBefore;
        this.left.updateInNewLocation();
        this.updateInNewLocation()
    };
    AVLTree.prototype.updateInNewLocation = function() {
        this.getDepthFromChildren()
    };
    AVLTree.prototype.getDepthFromChildren = function() {
        this.depth = this.node == null ? 0 : 1;
        if (this.left !=
            null) this.depth = this.left.depth + 1;
        if (this.right != null && this.depth <= this.right.depth) this.depth = this.right.depth + 1
    };

    function nodeOrder(n1, n2) {
        if (n1 === n2) return 0;
        if (n1.compareDocumentPosition) {
            var cpos = n1.compareDocumentPosition(n2);
            if (cpos & 1) return 1;
            if (cpos & 10) return 1;
            if (cpos & 20) return -1;
            return 0
        }
        var d1 = 0,
            d2 = 0;
        for (var m1 = n1; m1 != null; m1 = m1.parentNode || m1.ownerElement) d1++;
        for (var m2 = n2; m2 != null; m2 = m2.parentNode || m2.ownerElement) d2++;
        if (d1 > d2) {
            while (d1 > d2) {
                n1 = n1.parentNode || n1.ownerElement;
                d1--
            }
            if (n1 ===
                n2) return 1
        } else if (d2 > d1) {
            while (d2 > d1) {
                n2 = n2.parentNode || n2.ownerElement;
                d2--
            }
            if (n1 === n2) return -1
        }
        var n1Par = n1.parentNode || n1.ownerElement,
            n2Par = n2.parentNode || n2.ownerElement;
        while (n1Par !== n2Par) {
            n1 = n1Par;
            n2 = n2Par;
            n1Par = n1.parentNode || n1.ownerElement;
            n2Par = n2.parentNode || n2.ownerElement
        }
        var n1isAttr = Utilities.isAttribute(n1);
        var n2isAttr = Utilities.isAttribute(n2);
        if (n1isAttr && !n2isAttr) return -1;
        if (!n1isAttr && n2isAttr) return 1;
        if (n1Par) {
            var cn = n1isAttr ? n1Par.attributes : n1Par.childNodes,
                len = cn.length;
            for (var i = 0; i < len; i += 1) {
                var n = cn[i];
                if (n === n1) return -1;
                if (n === n2) return 1
            }
        }
        throw new Error("Unexpected: could not determine node order");
    }
    AVLTree.prototype.add = function(n) {
        if (n === this.node) return false;
        var o = nodeOrder(n, this.node);
        var ret = false;
        if (o == -1)
            if (this.left == null) {
                this.left = new AVLTree(n);
                ret = true
            } else {
                ret = this.left.add(n);
                if (ret) this.balance()
            }
        else if (o == 1)
            if (this.right == null) {
                this.right = new AVLTree(n);
                ret = true
            } else {
                ret = this.right.add(n);
                if (ret) this.balance()
            }
        if (ret) this.getDepthFromChildren();
        return ret
    };
    XNodeSet.prototype = new Expression;
    XNodeSet.prototype.constructor = XNodeSet;
    XNodeSet.superclass = Expression.prototype;

    function XNodeSet() {
        this.init()
    }
    XNodeSet.prototype.init = function() {
        this.tree = null;
        this.nodes = [];
        this.size = 0
    };
    XNodeSet.prototype.toString = function() {
        var p = this.first();
        if (p == null) return "";
        return this.stringForNode(p)
    };
    XNodeSet.prototype.evaluate = function(c) {
        return this
    };
    XNodeSet.prototype.string = function() {
        return new XString(this.toString())
    };
    XNodeSet.prototype.stringValue =
        function() {
            return this.toString()
        };
    XNodeSet.prototype.number = function() {
        return new XNumber(this.string())
    };
    XNodeSet.prototype.numberValue = function() {
        return Number(this.string())
    };
    XNodeSet.prototype.bool = function() {
        return new XBoolean(this.booleanValue())
    };
    XNodeSet.prototype.booleanValue = function() {
        return !!this.size
    };
    XNodeSet.prototype.nodeset = function() {
        return this
    };
    XNodeSet.prototype.stringForNode = function(n) {
        if (n.nodeType == 9 || n.nodeType == 1 || n.nodeType === 11) return this.stringForContainerNode(n);
        if (n.nodeType === 2) return n.value || n.nodeValue;
        if (n.isNamespaceNode) return n.namespace;
        return n.nodeValue
    };
    XNodeSet.prototype.stringForContainerNode = function(n) {
        var s = "";
        for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
            var nt = n2.nodeType;
            if (nt === 1 || nt === 3 || nt === 4 || nt === 9 || nt === 11) s += this.stringForNode(n2)
        }
        return s
    };
    XNodeSet.prototype.buildTree = function() {
        if (!this.tree && this.nodes.length) {
            this.tree = new AVLTree(this.nodes[0]);
            for (var i = 1; i < this.nodes.length; i += 1) this.tree.add(this.nodes[i])
        }
        return this.tree
    };
    XNodeSet.prototype.first = function() {
        var p = this.buildTree();
        if (p == null) return null;
        while (p.left != null) p = p.left;
        return p.node
    };
    XNodeSet.prototype.add = function(n) {
        for (var i = 0; i < this.nodes.length; i += 1)
            if (n === this.nodes[i]) return;
        this.tree = null;
        this.nodes.push(n);
        this.size += 1
    };
    XNodeSet.prototype.addArray = function(ns) {
        var self = this;
        forEach(function(x) {
            self.add(x)
        }, ns)
    };
    XNodeSet.prototype.toArray = function() {
        var a = [];
        this.toArrayRec(this.buildTree(), a);
        return a
    };
    XNodeSet.prototype.toArrayRec = function(t, a) {
        if (t !=
            null) {
            this.toArrayRec(t.left, a);
            a.push(t.node);
            this.toArrayRec(t.right, a)
        }
    };
    XNodeSet.prototype.toUnsortedArray = function() {
        return this.nodes.slice()
    };
    XNodeSet.prototype.compareWithString = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
            var n = a[i];
            var l = new XString(this.stringForNode(n));
            var res = o(l, r);
            if (res.booleanValue()) return res
        }
        return new XBoolean(false)
    };
    XNodeSet.prototype.compareWithNumber = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
            var n = a[i];
            var l = new XNumber(this.stringForNode(n));
            var res = o(l, r);
            if (res.booleanValue()) return res
        }
        return new XBoolean(false)
    };
    XNodeSet.prototype.compareWithBoolean = function(r, o) {
        return o(this.bool(), r)
    };
    XNodeSet.prototype.compareWithNodeSet = function(r, o) {
        var arr = this.toUnsortedArray();
        var oInvert = function(lop, rop) {
            return o(rop, lop)
        };
        for (var i = 0; i < arr.length; i++) {
            var l = new XString(this.stringForNode(arr[i]));
            var res = r.compareWithString(l, oInvert);
            if (res.booleanValue()) return res
        }
        return new XBoolean(false)
    };
    XNodeSet.compareWith = curry(function(o, r) {
        if (Utilities.instance_of(r, XString)) return this.compareWithString(r, o);
        if (Utilities.instance_of(r, XNumber)) return this.compareWithNumber(r, o);
        if (Utilities.instance_of(r, XBoolean)) return this.compareWithBoolean(r, o);
        return this.compareWithNodeSet(r, o)
    });
    XNodeSet.prototype.equals = XNodeSet.compareWith(Operators.equals);
    XNodeSet.prototype.notequal = XNodeSet.compareWith(Operators.notequal);
    XNodeSet.prototype.lessthan = XNodeSet.compareWith(Operators.lessthan);
    XNodeSet.prototype.greaterthan =
        XNodeSet.compareWith(Operators.greaterthan);
    XNodeSet.prototype.lessthanorequal = XNodeSet.compareWith(Operators.lessthanorequal);
    XNodeSet.prototype.greaterthanorequal = XNodeSet.compareWith(Operators.greaterthanorequal);
    XNodeSet.prototype.union = function(r) {
        var ns = new XNodeSet;
        ns.addArray(this.toUnsortedArray());
        ns.addArray(r.toUnsortedArray());
        return ns
    };
    XPathNamespace.prototype = new Object;
    XPathNamespace.prototype.constructor = XPathNamespace;
    XPathNamespace.superclass = Object.prototype;

    function XPathNamespace(pre,
        ns, p) {
        this.isXPathNamespace = true;
        this.ownerDocument = p.ownerDocument;
        this.nodeName = "#namespace";
        this.prefix = pre;
        this.localName = pre;
        this.namespaceURI = ns;
        this.nodeValue = ns;
        this.ownerElement = p;
        this.nodeType = XPathNamespace.XPATH_NAMESPACE_NODE
    }
    XPathNamespace.prototype.toString = function() {
        return '{ "' + this.prefix + '", "' + this.namespaceURI + '" }'
    };
    XPathContext.prototype = new Object;
    XPathContext.prototype.constructor = XPathContext;
    XPathContext.superclass = Object.prototype;

    function XPathContext(vr, nr, fr) {
        this.variableResolver =
            vr != null ? vr : new VariableResolver;
        this.namespaceResolver = nr != null ? nr : new NamespaceResolver;
        this.functionResolver = fr != null ? fr : new FunctionResolver
    }
    XPathContext.prototype.extend = function(newProps) {
        return assign(new XPathContext, this, newProps)
    };
    VariableResolver.prototype = new Object;
    VariableResolver.prototype.constructor = VariableResolver;
    VariableResolver.superclass = Object.prototype;

    function VariableResolver() {}
    VariableResolver.prototype.getVariable = function(ln, ns) {
        return null
    };
    FunctionResolver.prototype =
        new Object;
    FunctionResolver.prototype.constructor = FunctionResolver;
    FunctionResolver.superclass = Object.prototype;

    function FunctionResolver(thisArg) {
        this.thisArg = thisArg != null ? thisArg : Functions;
        this.functions = new Object;
        this.addStandardFunctions()
    }
    FunctionResolver.prototype.addStandardFunctions = function() {
        this.functions["{}last"] = Functions.last;
        this.functions["{}position"] = Functions.position;
        this.functions["{}count"] = Functions.count;
        this.functions["{}id"] = Functions.id;
        this.functions["{}local-name"] =
            Functions.localName;
        this.functions["{}namespace-uri"] = Functions.namespaceURI;
        this.functions["{}name"] = Functions.name;
        this.functions["{}string"] = Functions.string;
        this.functions["{}concat"] = Functions.concat;
        this.functions["{}starts-with"] = Functions.startsWith;
        this.functions["{}contains"] = Functions.contains;
        this.functions["{}substring-before"] = Functions.substringBefore;
        this.functions["{}substring-after"] = Functions.substringAfter;
        this.functions["{}substring"] = Functions.substring;
        this.functions["{}string-length"] =
            Functions.stringLength;
        this.functions["{}normalize-space"] = Functions.normalizeSpace;
        this.functions["{}translate"] = Functions.translate;
        this.functions["{}boolean"] = Functions.boolean_;
        this.functions["{}not"] = Functions.not;
        this.functions["{}true"] = Functions.true_;
        this.functions["{}false"] = Functions.false_;
        this.functions["{}lang"] = Functions.lang;
        this.functions["{}number"] = Functions.number;
        this.functions["{}sum"] = Functions.sum;
        this.functions["{}floor"] = Functions.floor;
        this.functions["{}ceiling"] = Functions.ceiling;
        this.functions["{}round"] = Functions.round
    };
    FunctionResolver.prototype.addFunction = function(ns, ln, f) {
        this.functions["{" + ns + "}" + ln] = f
    };
    FunctionResolver.getFunctionFromContext = function(qName, context) {
        var parts = Utilities.resolveQName(qName, context.namespaceResolver, context.contextNode, false);
        if (parts[0] === null) throw new Error("Cannot resolve QName " + qName);
        return context.functionResolver.getFunction(parts[1], parts[0])
    };
    FunctionResolver.prototype.getFunction = function(localName, namespace) {
        return this.functions["{" +
            namespace + "}" + localName]
    };
    NamespaceResolver.prototype = new Object;
    NamespaceResolver.prototype.constructor = NamespaceResolver;
    NamespaceResolver.superclass = Object.prototype;

    function NamespaceResolver() {}
    NamespaceResolver.prototype.getNamespace = function(prefix, n) {
        if (prefix == "xml") return XPath.XML_NAMESPACE_URI;
        else if (prefix == "xmlns") return XPath.XMLNS_NAMESPACE_URI;
        if (n.nodeType == 9) n = n.documentElement;
        else if (n.nodeType == 2) n = PathExpr.getOwnerElement(n);
        else if (n.nodeType != 1) n = n.parentNode;
        while (n != null &&
            n.nodeType == 1) {
            var nnm = n.attributes;
            for (var i = 0; i < nnm.length; i++) {
                var a = nnm.item(i);
                var aname = a.name || a.nodeName;
                if (aname === "xmlns" && prefix === "" || aname === "xmlns:" + prefix) return String(a.value || a.nodeValue)
            }
            n = n.parentNode
        }
        return null
    };
    var Functions = new Object;
    Functions.last = function(c) {
        if (arguments.length != 1) throw new Error("Function last expects ()");
        return new XNumber(c.contextSize)
    };
    Functions.position = function(c) {
        if (arguments.length != 1) throw new Error("Function position expects ()");
        return new XNumber(c.contextPosition)
    };
    Functions.count = function() {
        var c = arguments[0];
        var ns;
        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) throw new Error("Function count expects (node-set)");
        return new XNumber(ns.size)
    };
    Functions.id = function() {
        var c = arguments[0];
        var id;
        if (arguments.length != 2) throw new Error("Function id expects (object)");
        id = arguments[1].evaluate(c);
        if (Utilities.instance_of(id, XNodeSet)) id = id.toArray().join(" ");
        else id = id.stringValue();
        var ids = id.split(/[\x0d\x0a\x09\x20]+/);
        var count =
            0;
        var ns = new XNodeSet;
        var doc = c.contextNode.nodeType == 9 ? c.contextNode : c.contextNode.ownerDocument;
        for (var i = 0; i < ids.length; i++) {
            var n;
            if (doc.getElementById) n = doc.getElementById(ids[i]);
            else n = Utilities.getElementById(doc, ids[i]);
            if (n != null) {
                ns.add(n);
                count++
            }
        }
        return ns
    };
    Functions.localName = function(c, eNode) {
        var n;
        if (arguments.length == 1) n = c.contextNode;
        else if (arguments.length == 2) n = eNode.evaluate(c).first();
        else throw new Error("Function local-name expects (node-set?)");
        if (n == null) return new XString("");
        return new XString(n.localName || n.baseName || n.target || n.nodeName || "")
    };
    Functions.namespaceURI = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) n = c.contextNode;
        else if (arguments.length == 2) n = arguments[1].evaluate(c).first();
        else throw new Error("Function namespace-uri expects (node-set?)");
        if (n == null) return new XString("");
        return new XString(n.namespaceURI)
    };
    Functions.name = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) n = c.contextNode;
        else if (arguments.length == 2) n = arguments[1].evaluate(c).first();
        else throw new Error("Function name expects (node-set?)");
        if (n == null) return new XString("");
        if (n.nodeType == 1) return new XString(n.nodeName);
        else if (n.nodeType == 2) return new XString(n.name || n.nodeName);
        else if (n.nodeType === 7) return new XString(n.target || n.nodeName);
        else if (n.localName == null) return new XString("");
        else return new XString(n.localName)
    };
    Functions.string = function() {
        var c = arguments[0];
        if (arguments.length == 1) return new XString(XNodeSet.prototype.stringForNode(c.contextNode));
        else if (arguments.length ==
            2) return arguments[1].evaluate(c).string();
        throw new Error("Function string expects (object?)");
    };
    Functions.concat = function(c) {
        if (arguments.length < 3) throw new Error("Function concat expects (string, string[, string]*)");
        var s = "";
        for (var i = 1; i < arguments.length; i++) s += arguments[i].evaluate(c).stringValue();
        return new XString(s)
    };
    Functions.startsWith = function() {
        var c = arguments[0];
        if (arguments.length != 3) throw new Error("Function startsWith expects (string, string)");
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XBoolean(s1.substring(0, s2.length) == s2)
    };
    Functions.contains = function() {
        var c = arguments[0];
        if (arguments.length != 3) throw new Error("Function contains expects (string, string)");
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XBoolean(s1.indexOf(s2) !== -1)
    };
    Functions.substringBefore = function() {
        var c = arguments[0];
        if (arguments.length != 3) throw new Error("Function substring-before expects (string, string)");
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XString(s1.substring(0, s1.indexOf(s2)))
    };
    Functions.substringAfter = function() {
        var c = arguments[0];
        if (arguments.length != 3) throw new Error("Function substring-after expects (string, string)");
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        if (s2.length == 0) return new XString(s1);
        var i = s1.indexOf(s2);
        if (i == -1) return new XString("");
        return new XString(s1.substring(i +
            s2.length))
    };
    Functions.substring = function() {
        var c = arguments[0];
        if (!(arguments.length == 3 || arguments.length == 4)) throw new Error("Function substring expects (string, number, number?)");
        var s = arguments[1].evaluate(c).stringValue();
        var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
        var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : undefined;
        return new XString(s.substring(n1, n2))
    };
    Functions.stringLength = function() {
        var c = arguments[0];
        var s;
        if (arguments.length == 1) s =
            XNodeSet.prototype.stringForNode(c.contextNode);
        else if (arguments.length == 2) s = arguments[1].evaluate(c).stringValue();
        else throw new Error("Function string-length expects (string?)");
        return new XNumber(s.length)
    };
    Functions.normalizeSpace = function() {
        var c = arguments[0];
        var s;
        if (arguments.length == 1) s = XNodeSet.prototype.stringForNode(c.contextNode);
        else if (arguments.length == 2) s = arguments[1].evaluate(c).stringValue();
        else throw new Error("Function normalize-space expects (string?)");
        var i = 0;
        var j = s.length -
            1;
        while (Utilities.isSpace(s.charCodeAt(j))) j--;
        var t = "";
        while (i <= j && Utilities.isSpace(s.charCodeAt(i))) i++;
        while (i <= j)
            if (Utilities.isSpace(s.charCodeAt(i))) {
                t += " ";
                while (i <= j && Utilities.isSpace(s.charCodeAt(i))) i++
            } else {
                t += s.charAt(i);
                i++
            }
        return new XString(t)
    };
    Functions.translate = function(c, eValue, eFrom, eTo) {
        if (arguments.length != 4) throw new Error("Function translate expects (string, string, string)");
        var value = eValue.evaluate(c).stringValue();
        var from = eFrom.evaluate(c).stringValue();
        var to = eTo.evaluate(c).stringValue();
        var cMap = reduce(function(acc, ch, i) {
            if (!(ch in acc)) acc[ch] = i > to.length ? "" : to[i];
            return acc
        }, {}, from);
        var t = join("", map(function(ch) {
            return ch in cMap ? cMap[ch] : ch
        }, value));
        return new XString(t)
    };
    Functions.boolean_ = function() {
        var c = arguments[0];
        if (arguments.length != 2) throw new Error("Function boolean expects (object)");
        return arguments[1].evaluate(c).bool()
    };
    Functions.not = function(c, eValue) {
        if (arguments.length != 2) throw new Error("Function not expects (object)");
        return eValue.evaluate(c).bool().not()
    };
    Functions.true_ = function() {
        if (arguments.length != 1) throw new Error("Function true expects ()");
        return XBoolean.true_
    };
    Functions.false_ = function() {
        if (arguments.length != 1) throw new Error("Function false expects ()");
        return XBoolean.false_
    };
    Functions.lang = function() {
        var c = arguments[0];
        if (arguments.length != 2) throw new Error("Function lang expects (string)");
        var lang;
        for (var n = c.contextNode; n != null && n.nodeType != 9; n = n.parentNode) {
            var a = n.getAttributeNS(XPath.XML_NAMESPACE_URI, "lang");
            if (a != null) {
                lang = String(a);
                break
            }
        }
        if (lang == null) return XBoolean.false_;
        var s = arguments[1].evaluate(c).stringValue();
        return new XBoolean(lang.substring(0, s.length) == s && (lang.length == s.length || lang.charAt(s.length) == "-"))
    };
    Functions.number = function() {
        var c = arguments[0];
        if (!(arguments.length == 1 || arguments.length == 2)) throw new Error("Function number expects (object?)");
        if (arguments.length == 1) return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
        return arguments[1].evaluate(c).number()
    };
    Functions.sum = function() {
        var c =
            arguments[0];
        var ns;
        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) throw new Error("Function sum expects (node-set)");
        ns = ns.toUnsortedArray();
        var n = 0;
        for (var i = 0; i < ns.length; i++) n += (new XNumber(XNodeSet.prototype.stringForNode(ns[i]))).numberValue();
        return new XNumber(n)
    };
    Functions.floor = function() {
        var c = arguments[0];
        if (arguments.length != 2) throw new Error("Function floor expects (number)");
        return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()))
    };
    Functions.ceiling = function() {
        var c = arguments[0];
        if (arguments.length != 2) throw new Error("Function ceiling expects (number)");
        return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()))
    };
    Functions.round = function() {
        var c = arguments[0];
        if (arguments.length != 2) throw new Error("Function round expects (number)");
        return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()))
    };
    var Utilities = new Object;
    Utilities.isAttribute = function(val) {
        return val && (val.nodeType === 2 || val.ownerElement)
    };
    Utilities.splitQName =
        function(qn) {
            var i = qn.indexOf(":");
            if (i == -1) return [null, qn];
            return [qn.substring(0, i), qn.substring(i + 1)]
        };
    Utilities.resolveQName = function(qn, nr, n, useDefault) {
        var parts = Utilities.splitQName(qn);
        if (parts[0] != null) parts[0] = nr.getNamespace(parts[0], n);
        else if (useDefault) {
            parts[0] = nr.getNamespace("", n);
            if (parts[0] == null) parts[0] = ""
        } else parts[0] = "";
        return parts
    };
    Utilities.isSpace = function(c) {
        return c == 9 || c == 13 || c == 10 || c == 32
    };
    Utilities.isLetter = function(c) {
        return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 192 && c <=
            214 || c >= 216 && c <= 246 || c >= 248 && c <= 255 || c >= 256 && c <= 305 || c >= 308 && c <= 318 || c >= 321 && c <= 328 || c >= 330 && c <= 382 || c >= 384 && c <= 451 || c >= 461 && c <= 496 || c >= 500 && c <= 501 || c >= 506 && c <= 535 || c >= 592 && c <= 680 || c >= 699 && c <= 705 || c == 902 || c >= 904 && c <= 906 || c == 908 || c >= 910 && c <= 929 || c >= 931 && c <= 974 || c >= 976 && c <= 982 || c == 986 || c == 988 || c == 990 || c == 992 || c >= 994 && c <= 1011 || c >= 1025 && c <= 1036 || c >= 1038 && c <= 1103 || c >= 1105 && c <= 1116 || c >= 1118 && c <= 1153 || c >= 1168 && c <= 1220 || c >= 1223 && c <= 1224 || c >= 1227 && c <= 1228 || c >= 1232 && c <= 1259 || c >= 1262 && c <= 1269 || c >= 1272 && c <= 1273 ||
            c >= 1329 && c <= 1366 || c == 1369 || c >= 1377 && c <= 1414 || c >= 1488 && c <= 1514 || c >= 1520 && c <= 1522 || c >= 1569 && c <= 1594 || c >= 1601 && c <= 1610 || c >= 1649 && c <= 1719 || c >= 1722 && c <= 1726 || c >= 1728 && c <= 1742 || c >= 1744 && c <= 1747 || c == 1749 || c >= 1765 && c <= 1766 || c >= 2309 && c <= 2361 || c == 2365 || c >= 2392 && c <= 2401 || c >= 2437 && c <= 2444 || c >= 2447 && c <= 2448 || c >= 2451 && c <= 2472 || c >= 2474 && c <= 2480 || c == 2482 || c >= 2486 && c <= 2489 || c >= 2524 && c <= 2525 || c >= 2527 && c <= 2529 || c >= 2544 && c <= 2545 || c >= 2565 && c <= 2570 || c >= 2575 && c <= 2576 || c >= 2579 && c <= 2600 || c >= 2602 && c <= 2608 || c >= 2610 && c <= 2611 ||
            c >= 2613 && c <= 2614 || c >= 2616 && c <= 2617 || c >= 2649 && c <= 2652 || c == 2654 || c >= 2674 && c <= 2676 || c >= 2693 && c <= 2699 || c == 2701 || c >= 2703 && c <= 2705 || c >= 2707 && c <= 2728 || c >= 2730 && c <= 2736 || c >= 2738 && c <= 2739 || c >= 2741 && c <= 2745 || c == 2749 || c == 2784 || c >= 2821 && c <= 2828 || c >= 2831 && c <= 2832 || c >= 2835 && c <= 2856 || c >= 2858 && c <= 2864 || c >= 2866 && c <= 2867 || c >= 2870 && c <= 2873 || c == 2877 || c >= 2908 && c <= 2909 || c >= 2911 && c <= 2913 || c >= 2949 && c <= 2954 || c >= 2958 && c <= 2960 || c >= 2962 && c <= 2965 || c >= 2969 && c <= 2970 || c == 2972 || c >= 2974 && c <= 2975 || c >= 2979 && c <= 2980 || c >= 2984 && c <= 2986 ||
            c >= 2990 && c <= 2997 || c >= 2999 && c <= 3001 || c >= 3077 && c <= 3084 || c >= 3086 && c <= 3088 || c >= 3090 && c <= 3112 || c >= 3114 && c <= 3123 || c >= 3125 && c <= 3129 || c >= 3168 && c <= 3169 || c >= 3205 && c <= 3212 || c >= 3214 && c <= 3216 || c >= 3218 && c <= 3240 || c >= 3242 && c <= 3251 || c >= 3253 && c <= 3257 || c == 3294 || c >= 3296 && c <= 3297 || c >= 3333 && c <= 3340 || c >= 3342 && c <= 3344 || c >= 3346 && c <= 3368 || c >= 3370 && c <= 3385 || c >= 3424 && c <= 3425 || c >= 3585 && c <= 3630 || c == 3632 || c >= 3634 && c <= 3635 || c >= 3648 && c <= 3653 || c >= 3713 && c <= 3714 || c == 3716 || c >= 3719 && c <= 3720 || c == 3722 || c == 3725 || c >= 3732 && c <= 3735 || c >= 3737 &&
            c <= 3743 || c >= 3745 && c <= 3747 || c == 3749 || c == 3751 || c >= 3754 && c <= 3755 || c >= 3757 && c <= 3758 || c == 3760 || c >= 3762 && c <= 3763 || c == 3773 || c >= 3776 && c <= 3780 || c >= 3904 && c <= 3911 || c >= 3913 && c <= 3945 || c >= 4256 && c <= 4293 || c >= 4304 && c <= 4342 || c == 4352 || c >= 4354 && c <= 4355 || c >= 4357 && c <= 4359 || c == 4361 || c >= 4363 && c <= 4364 || c >= 4366 && c <= 4370 || c == 4412 || c == 4414 || c == 4416 || c == 4428 || c == 4430 || c == 4432 || c >= 4436 && c <= 4437 || c == 4441 || c >= 4447 && c <= 4449 || c == 4451 || c == 4453 || c == 4455 || c == 4457 || c >= 4461 && c <= 4462 || c >= 4466 && c <= 4467 || c == 4469 || c == 4510 || c == 4520 || c == 4523 ||
            c >= 4526 && c <= 4527 || c >= 4535 && c <= 4536 || c == 4538 || c >= 4540 && c <= 4546 || c == 4587 || c == 4592 || c == 4601 || c >= 7680 && c <= 7835 || c >= 7840 && c <= 7929 || c >= 7936 && c <= 7957 || c >= 7960 && c <= 7965 || c >= 7968 && c <= 8005 || c >= 8008 && c <= 8013 || c >= 8016 && c <= 8023 || c == 8025 || c == 8027 || c == 8029 || c >= 8031 && c <= 8061 || c >= 8064 && c <= 8116 || c >= 8118 && c <= 8124 || c == 8126 || c >= 8130 && c <= 8132 || c >= 8134 && c <= 8140 || c >= 8144 && c <= 8147 || c >= 8150 && c <= 8155 || c >= 8160 && c <= 8172 || c >= 8178 && c <= 8180 || c >= 8182 && c <= 8188 || c == 8486 || c >= 8490 && c <= 8491 || c == 8494 || c >= 8576 && c <= 8578 || c >= 12353 && c <= 12436 ||
            c >= 12449 && c <= 12538 || c >= 12549 && c <= 12588 || c >= 44032 && c <= 55203 || c >= 19968 && c <= 40869 || c == 12295 || c >= 12321 && c <= 12329
    };
    Utilities.isNCNameChar = function(c) {
        return c >= 48 && c <= 57 || c >= 1632 && c <= 1641 || c >= 1776 && c <= 1785 || c >= 2406 && c <= 2415 || c >= 2534 && c <= 2543 || c >= 2662 && c <= 2671 || c >= 2790 && c <= 2799 || c >= 2918 && c <= 2927 || c >= 3047 && c <= 3055 || c >= 3174 && c <= 3183 || c >= 3302 && c <= 3311 || c >= 3430 && c <= 3439 || c >= 3664 && c <= 3673 || c >= 3792 && c <= 3801 || c >= 3872 && c <= 3881 || c == 46 || c == 45 || c == 95 || Utilities.isLetter(c) || c >= 768 && c <= 837 || c >= 864 && c <= 865 || c >= 1155 &&
            c <= 1158 || c >= 1425 && c <= 1441 || c >= 1443 && c <= 1465 || c >= 1467 && c <= 1469 || c == 1471 || c >= 1473 && c <= 1474 || c == 1476 || c >= 1611 && c <= 1618 || c == 1648 || c >= 1750 && c <= 1756 || c >= 1757 && c <= 1759 || c >= 1760 && c <= 1764 || c >= 1767 && c <= 1768 || c >= 1770 && c <= 1773 || c >= 2305 && c <= 2307 || c == 2364 || c >= 2366 && c <= 2380 || c == 2381 || c >= 2385 && c <= 2388 || c >= 2402 && c <= 2403 || c >= 2433 && c <= 2435 || c == 2492 || c == 2494 || c == 2495 || c >= 2496 && c <= 2500 || c >= 2503 && c <= 2504 || c >= 2507 && c <= 2509 || c == 2519 || c >= 2530 && c <= 2531 || c == 2562 || c == 2620 || c == 2622 || c == 2623 || c >= 2624 && c <= 2626 || c >= 2631 && c <= 2632 ||
            c >= 2635 && c <= 2637 || c >= 2672 && c <= 2673 || c >= 2689 && c <= 2691 || c == 2748 || c >= 2750 && c <= 2757 || c >= 2759 && c <= 2761 || c >= 2763 && c <= 2765 || c >= 2817 && c <= 2819 || c == 2876 || c >= 2878 && c <= 2883 || c >= 2887 && c <= 2888 || c >= 2891 && c <= 2893 || c >= 2902 && c <= 2903 || c >= 2946 && c <= 2947 || c >= 3006 && c <= 3010 || c >= 3014 && c <= 3016 || c >= 3018 && c <= 3021 || c == 3031 || c >= 3073 && c <= 3075 || c >= 3134 && c <= 3140 || c >= 3142 && c <= 3144 || c >= 3146 && c <= 3149 || c >= 3157 && c <= 3158 || c >= 3202 && c <= 3203 || c >= 3262 && c <= 3268 || c >= 3270 && c <= 3272 || c >= 3274 && c <= 3277 || c >= 3285 && c <= 3286 || c >= 3330 && c <= 3331 || c >= 3390 &&
            c <= 3395 || c >= 3398 && c <= 3400 || c >= 3402 && c <= 3405 || c == 3415 || c == 3633 || c >= 3636 && c <= 3642 || c >= 3655 && c <= 3662 || c == 3761 || c >= 3764 && c <= 3769 || c >= 3771 && c <= 3772 || c >= 3784 && c <= 3789 || c >= 3864 && c <= 3865 || c == 3893 || c == 3895 || c == 3897 || c == 3902 || c == 3903 || c >= 3953 && c <= 3972 || c >= 3974 && c <= 3979 || c >= 3984 && c <= 3989 || c == 3991 || c >= 3993 && c <= 4013 || c >= 4017 && c <= 4023 || c == 4025 || c >= 8400 && c <= 8412 || c == 8417 || c >= 12330 && c <= 12335 || c == 12441 || c == 12442 || c == 183 || c == 720 || c == 721 || c == 903 || c == 1600 || c == 3654 || c == 3782 || c == 12293 || c >= 12337 && c <= 12341 || c >= 12445 && c <=
            12446 || c >= 12540 && c <= 12542
    };
    Utilities.coalesceText = function(n) {
        for (var m = n.firstChild; m != null; m = m.nextSibling)
            if (m.nodeType == 3 || m.nodeType == 4) {
                var s = m.nodeValue;
                var first = m;
                m = m.nextSibling;
                while (m != null && (m.nodeType == 3 || m.nodeType == 4)) {
                    s += m.nodeValue;
                    var del = m;
                    m = m.nextSibling;
                    del.parentNode.removeChild(del)
                }
                if (first.nodeType == 4) {
                    var p = first.parentNode;
                    if (first.nextSibling == null) {
                        p.removeChild(first);
                        p.appendChild(p.ownerDocument.createTextNode(s))
                    } else {
                        var next = first.nextSibling;
                        p.removeChild(first);
                        p.insertBefore(p.ownerDocument.createTextNode(s), next)
                    }
                } else first.nodeValue = s;
                if (m == null) break
            } else if (m.nodeType == 1) Utilities.coalesceText(m)
    };
    Utilities.instance_of = function(o, c) {
        while (o != null) {
            if (o.constructor === c) return true;
            if (o === Object) return false;
            o = o.constructor.superclass
        }
        return false
    };
    Utilities.getElementById = function(n, id) {
        if (n.nodeType == 1)
            if (n.getAttribute("id") == id || n.getAttributeNS(null, "id") == id) return n;
        for (var m = n.firstChild; m != null; m = m.nextSibling) {
            var res = Utilities.getElementById(m,
                id);
            if (res != null) return res
        }
        return null
    };
    var XPathException = function() {
        function getMessage(code, exception) {
            var msg = exception ? ": " + exception.toString() : "";
            switch (code) {
                case XPathException.INVALID_EXPRESSION_ERR:
                    return "Invalid expression" + msg;
                case XPathException.TYPE_ERR:
                    return "Type error" + msg
            }
            return null
        }

        function XPathException(code, error, message) {
            var err = Error.call(this, getMessage(code, error) || message);
            err.code = code;
            err.exception = error;
            return err
        }
        XPathException.prototype = Object.create(Error.prototype);
        XPathException.prototype.constructor = XPathException;
        XPathException.superclass = Error;
        XPathException.prototype.toString = function() {
            return this.message
        };
        XPathException.fromMessage = function(message, error) {
            return new XPathException(null, error, message)
        };
        XPathException.INVALID_EXPRESSION_ERR = 51;
        XPathException.TYPE_ERR = 52;
        return XPathException
    }();
    XPathExpression.prototype = {};
    XPathExpression.prototype.constructor = XPathExpression;
    XPathExpression.superclass = Object.prototype;

    function XPathExpression(e, r, p) {
        this.xpath =
            p.parse(e);
        this.context = new XPathContext;
        this.context.namespaceResolver = new XPathNSResolverWrapper(r)
    }
    XPathExpression.getOwnerDocument = function(n) {
        return n.nodeType === 9 ? n : n.ownerDocument
    };
    XPathExpression.detectHtmlDom = function(n) {
        if (!n) return false;
        var doc = XPathExpression.getOwnerDocument(n);
        try {
            return doc.implementation.hasFeature("HTML", "2.0")
        } catch (e) {
            return true
        }
    };
    XPathExpression.prototype.evaluate = function(n, t, res) {
        this.context.expressionContextNode = n;
        this.context.caseInsensitive = XPathExpression.detectHtmlDom(n);
        var result = this.xpath.evaluate(this.context);
        return new XPathResult(result, t)
    };
    XPathNSResolverWrapper.prototype = {};
    XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
    XPathNSResolverWrapper.superclass = Object.prototype;

    function XPathNSResolverWrapper(r) {
        this.xpathNSResolver = r
    }
    XPathNSResolverWrapper.prototype.getNamespace = function(prefix, n) {
        if (this.xpathNSResolver == null) return null;
        return this.xpathNSResolver.lookupNamespaceURI(prefix)
    };
    NodeXPathNSResolver.prototype = {};
    NodeXPathNSResolver.prototype.constructor =
        NodeXPathNSResolver;
    NodeXPathNSResolver.superclass = Object.prototype;

    function NodeXPathNSResolver(n) {
        this.node = n;
        this.namespaceResolver = new NamespaceResolver
    }
    NodeXPathNSResolver.prototype.lookupNamespaceURI = function(prefix) {
        return this.namespaceResolver.getNamespace(prefix, this.node)
    };
    XPathResult.prototype = {};
    XPathResult.prototype.constructor = XPathResult;
    XPathResult.superclass = Object.prototype;

    function XPathResult(v, t) {
        if (t == XPathResult.ANY_TYPE)
            if (v.constructor === XString) t = XPathResult.STRING_TYPE;
            else if (v.constructor === XNumber) t = XPathResult.NUMBER_TYPE;
        else if (v.constructor === XBoolean) t = XPathResult.BOOLEAN_TYPE;
        else if (v.constructor === XNodeSet) t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
        this.resultType = t;
        switch (t) {
            case XPathResult.NUMBER_TYPE:
                this.numberValue = v.numberValue();
                return;
            case XPathResult.STRING_TYPE:
                this.stringValue = v.stringValue();
                return;
            case XPathResult.BOOLEAN_TYPE:
                this.booleanValue = v.booleanValue();
                return;
            case XPathResult.ANY_UNORDERED_NODE_TYPE:
            case XPathResult.FIRST_ORDERED_NODE_TYPE:
                if (v.constructor ===
                    XNodeSet) {
                    this.singleNodeValue = v.first();
                    return
                }
                break;
            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
                if (v.constructor === XNodeSet) {
                    this.invalidIteratorState = false;
                    this.nodes = v.toArray();
                    this.iteratorIndex = 0;
                    return
                }
                break;
            case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
            case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
                if (v.constructor === XNodeSet) {
                    this.nodes = v.toArray();
                    this.snapshotLength = this.nodes.length;
                    return
                }
                break
        }
        throw new XPathException(XPathException.TYPE_ERR);
    }
    XPathResult.prototype.iterateNext = function() {
        if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE && this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) throw new XPathException(XPathException.TYPE_ERR);
        return this.nodes[this.iteratorIndex++]
    };
    XPathResult.prototype.snapshotItem = function(i) {
        if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE && this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) throw new XPathException(XPathException.TYPE_ERR);
        return this.nodes[i]
    };
    XPathResult.ANY_TYPE =
        0;
    XPathResult.NUMBER_TYPE = 1;
    XPathResult.STRING_TYPE = 2;
    XPathResult.BOOLEAN_TYPE = 3;
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
    XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
    XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
    XPathResult.FIRST_ORDERED_NODE_TYPE = 9;

    function installDOM3XPathSupport(doc, p) {
        doc.createExpression = function(e, r) {
            try {
                return new XPathExpression(e, r, p)
            } catch (e) {
                throw new XPathException(XPathException.INVALID_EXPRESSION_ERR,
                    e);
            }
        };
        doc.createNSResolver = function(n) {
            return new NodeXPathNSResolver(n)
        };
        doc.evaluate = function(e, cn, r, t, res) {
            if (t < 0 || t > 9) throw {
                code: 0,
                toString: function() {
                    return "Request type not supported"
                }
            };
            return doc.createExpression(e, r, p).evaluate(cn, t, res)
        }
    }
    try {
        var shouldInstall = true;
        try {
            if (document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("XPath", null)) shouldInstall = false
        } catch (e) {}
        if (shouldInstall) installDOM3XPathSupport(document, new XPathParser)
    } catch (e) {}
    installDOM3XPathSupport(exports,
        new XPathParser);
    (function() {
        var parser = new XPathParser;
        var defaultNSResolver = new NamespaceResolver;
        var defaultFunctionResolver = new FunctionResolver;
        var defaultVariableResolver = new VariableResolver;

        function makeNSResolverFromFunction(func) {
            return {
                getNamespace: function(prefix, node) {
                    var ns = func(prefix, node);
                    return ns || defaultNSResolver.getNamespace(prefix, node)
                }
            }
        }

        function makeNSResolverFromObject(obj) {
            return makeNSResolverFromFunction(obj.getNamespace.bind(obj))
        }

        function makeNSResolverFromMap(map) {
            return makeNSResolverFromFunction(function(prefix) {
                return map[prefix]
            })
        }

        function makeNSResolver(resolver) {
            if (resolver && typeof resolver.getNamespace === "function") return makeNSResolverFromObject(resolver);
            if (typeof resolver === "function") return makeNSResolverFromFunction(resolver);
            if (typeof resolver === "object") return makeNSResolverFromMap(resolver);
            return defaultNSResolver
        }

        function convertValue(value) {
            if (value === null || typeof value === "undefined" || value instanceof XString || value instanceof XBoolean || value instanceof XNumber || value instanceof XNodeSet) return value;
            switch (typeof value) {
                case "string":
                    return new XString(value);
                case "boolean":
                    return new XBoolean(value);
                case "number":
                    return new XNumber(value)
            }
            var ns = new XNodeSet;
            ns.addArray([].concat(value));
            return ns
        }

        function makeEvaluator(func) {
            return function(context) {
                var args = Array.prototype.slice.call(arguments, 1).map(function(arg) {
                    return arg.evaluate(context)
                });
                var result = func.apply(this, [].concat(context, args));
                return convertValue(result)
            }
        }

        function makeFunctionResolverFromFunction(func) {
            return {
                getFunction: function(name, namespace) {
                    var found = func(name, namespace);
                    if (found) return makeEvaluator(found);
                    return defaultFunctionResolver.getFunction(name, namespace)
                }
            }
        }

        function makeFunctionResolverFromObject(obj) {
            return makeFunctionResolverFromFunction(obj.getFunction.bind(obj))
        }

        function makeFunctionResolverFromMap(map) {
            return makeFunctionResolverFromFunction(function(name) {
                return map[name]
            })
        }

        function makeFunctionResolver(resolver) {
            if (resolver && typeof resolver.getFunction === "function") return makeFunctionResolverFromObject(resolver);
            if (typeof resolver === "function") return makeFunctionResolverFromFunction(resolver);
            if (typeof resolver === "object") return makeFunctionResolverFromMap(resolver);
            return defaultFunctionResolver
        }

        function makeVariableResolverFromFunction(func) {
            return {
                getVariable: function(name, namespace) {
                    var value = func(name, namespace);
                    return convertValue(value)
                }
            }
        }

        function makeVariableResolver(resolver) {
            if (resolver) {
                if (typeof resolver.getVariable === "function") return makeVariableResolverFromFunction(resolver.getVariable.bind(resolver));
                if (typeof resolver === "function") return makeVariableResolverFromFunction(resolver);
                if (typeof resolver === "object") return makeVariableResolverFromFunction(function(name) {
                    return resolver[name]
                })
            }
            return defaultVariableResolver
        }

        function copyIfPresent(prop, dest, source) {
            if (prop in source) dest[prop] = source[prop]
        }

        function makeContext(options) {
            var context = new XPathContext;
            if (options) {
                context.namespaceResolver = makeNSResolver(options.namespaces);
                context.functionResolver = makeFunctionResolver(options.functions);
                context.variableResolver = makeVariableResolver(options.variables);
                context.expressionContextNode =
                    options.node;
                copyIfPresent("allowAnyNamespaceForNoPrefix", context, options);
                copyIfPresent("isHtml", context, options)
            } else context.namespaceResolver = defaultNSResolver;
            return context
        }

        function evaluate(parsedExpression, options) {
            var context = makeContext(options);
            return parsedExpression.evaluate(context)
        }
        var evaluatorPrototype = {
            evaluate: function(options) {
                return evaluate(this.expression, options)
            },
            evaluateNumber: function(options) {
                return this.evaluate(options).numberValue()
            },
            evaluateString: function(options) {
                return this.evaluate(options).stringValue()
            },
            evaluateBoolean: function(options) {
                return this.evaluate(options).booleanValue()
            },
            evaluateNodeSet: function(options) {
                return this.evaluate(options).nodeset()
            },
            select: function(options) {
                return this.evaluateNodeSet(options).toArray()
            },
            select1: function(options) {
                return this.select(options)[0]
            }
        };

        function parse(xpath) {
            var parsed = parser.parse(xpath);
            return Object.create(evaluatorPrototype, {
                expression: {
                    value: parsed
                }
            })
        }
        exports.parse = parse
    })();
    exports.XPath = XPath;
    exports.XPathParser = XPathParser;
    exports.XPathResult =
        XPathResult;
    exports.Step = Step;
    exports.NodeTest = NodeTest;
    exports.BarOperation = BarOperation;
    exports.NamespaceResolver = NamespaceResolver;
    exports.FunctionResolver = FunctionResolver;
    exports.VariableResolver = VariableResolver;
    exports.Utilities = Utilities;
    exports.XPathContext = XPathContext;
    exports.XNodeSet = XNodeSet;
    exports.XBoolean = XBoolean;
    exports.XString = XString;
    exports.XNumber = XNumber;
    exports.select = function(e, doc, single) {
        return exports.selectWithResolver(e, doc, null, single)
    };
    exports.useNamespaces = function(mappings) {
        var resolver = {
            mappings: mappings || {},
            lookupNamespaceURI: function(prefix) {
                return this.mappings[prefix]
            }
        };
        return function(e, doc, single) {
            return exports.selectWithResolver(e, doc, resolver, single)
        }
    };
    exports.selectWithResolver = function(e, doc, resolver, single) {
        var expression = new XPathExpression(e, resolver, new XPathParser);
        var type = XPathResult.ANY_TYPE;
        var result = expression.evaluate(doc, type, null);
        if (result.resultType == XPathResult.STRING_TYPE) result = result.stringValue;
        else if (result.resultType == XPathResult.NUMBER_TYPE) result =
            result.numberValue;
        else if (result.resultType == XPathResult.BOOLEAN_TYPE) result = result.booleanValue;
        else {
            result = result.nodes;
            if (single) result = result[0]
        }
        return result
    };
    exports.select1 = function(e, doc) {
        return exports.select(e, doc, true)
    }
})();