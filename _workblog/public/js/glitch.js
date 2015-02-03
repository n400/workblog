/* glitch text mouseover scripts, version 1.06
 by stAllio!
 last revised: july 19, 2014

 check the following for updates, documentation, etc:
 http://animalswithinanimals.com/generator/

 */

String.prototype.splice = function (idx, rem, s) {
    // inserts s at point idx in a string
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};

String.prototype.replaceAt = function (idx, rem, s) {
    // inserts s at point idx in a string and removes original char
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem) + 1));
};

function randomNumFromLetter(letter) {
    // different "scripts" of text use different diacritical marks,
    // so pick appropriate range based on input character
    var randomDiacritic = 0;
    if (/[\u0400-\u04ff]/.test(letter)) {
        // cyrillic
        randomDiacritic = randomFromInterval(1155, 1161);
    } else if (/[\u0531-\u058f]/.test(letter)) {
        // armenian - only has one modifier char
        randomDiacritic = 1369;
    } else if (/[\u0591-\u05f4]/.test(letter)) {
        // hebrew (right to left!!) - 1425-1469, also 1471, 1473-1474, 1476-1477, 1479
        randomDiacritic = randomFromInterval(1419, 1469);
        if (randomDiacritic == 1424) {
            randomDiacritic = 1479;
        } else if (randomDiacritic >= 1422 && randomDiacritic <= 1423) {
            randomDiacritic = randomDiacritic + 54;
        } else if (randomDiacritic >= 1420 && randomDiacritic <= 1421) {
            randomDiacritic = randomDiacritic + 53;
        } else if (randomDiacritic == 1419) {
            randomDiacritic = 1471;
        }
    } else if (/[\u0600-\u06ff]/.test(letter)) {
        // arabic (right to left!!) - 1611-1630, also 1552-1557
        randomDiacritic = randomFromInterval(1605, 1630);
        if (randomDiacritic >= 1605 && randomDiacritic <= 1610) {
            randomDiacritic = randomDiacritic - 53;
        }
    } else if (/[\u0700-\u074f]/.test(letter)) {
        // syriaic (right to left!!)
        randomDiacritic = randomFromInterval(1840, 1866);
    } else if (/[\u0780-\u07b1]/.test(letter)) {
        // thaana (right to left!!)
        randomDiacritic = randomFromInterval(1958, 1968);
    } else if (/[\u07c0-\u07f1]/.test(letter)) {
        // nko (right to left!!) - requires code2000 or similar font
        randomDiacritic = randomFromInterval(2027, 2035);
    } else if (/[\u0800-\u083e]/.test(letter)) {
        // samaritan (right to left!!) - not displayable with web fonts
        randomDiacritic = randomFromInterval(2075, 2093);
    } else if (/[\u0840-\u085e]/.test(letter)) {
        // mandaic (right to left!!) - not displayable with web fonts
        randomDiacritic = randomFromInterval(2137, 2139);
    } else if (/[\u08a0-\u08fe]/.test(letter)) {
        // arabic extended a (right to left!!) - not displayable with web fonts
        randomDiacritic = randomFromInterval(2276, 2302);
    } else if (/[\u0900-\u097f]/.test(letter)) {
        // devanagari
        randomDiacritic = randomFromInterval(2364, 2388);
    } else if (/[\u0981-\u09fb]/.test(letter)) {
        // bengali -- 2492-2531, also 2433-2435
        randomDiacritic = randomFromInterval(2489, 2531);
        if (randomDiacritic >= 2689 && randomDiacritic <= 2691) {
            randomDiacritic = randomDiacritic - 56;
        }
    } else if (/[\u0a01-\u0a75]/.test(letter)) {
        // gurmukhi -- 2620-2641, also 2561-2562, 2672-2673
        randomDiacritic = randomFromInterval(2616, 2641);
        if (randomDiacritic >= 2616 && randomDiacritic <= 2617) {
            randomDiacritic = randomDiacritic - 55;
        } else if (randomDiacritic >= 2618 && randomDiacritic <= 2619) {
            randomDiacritic = randomDiacritic + 54;
        }
    } else if (/[\u0a81-\u0af1]/.test(letter)) {
        // gujarati -- 2748-2765, also 2689-2690, 2786-2787
        randomDiacritic = randomFromInterval(2744, 2765);
        if (randomDiacritic >= 2744 && randomDiacritic <= 2745) {
            randomDiacritic = randomDiacritic - 55;
        } else if (randomDiacritic >= 2746 && randomDiacritic <= 2747) {
            randomDiacritic = randomDiacritic + 40;
        }
    } else if (/[\u0b01-\u0b77]/.test(letter)) {
        // oriya -- 2878-2903, also 2876, 2914-2915
        randomDiacritic = randomFromInterval(2875, 2903);
        if (randomDiacritic == 2875) {
            randomDiacritic = 2914;
        } else if (randomDiacritic == 2877) {
            randomDiacritic = 2915;
        }
    } else if (/[\u0b82-\u0bfa]/.test(letter)) {
        // tamil -- 2946-2647, also 3008, 3021, plus spacing combining chars @ 3006-3031
        randomDiacritic = randomFromInterval(2944, 2947);
        if (randomDiacritic == 2944) {
            randomDiacritic = 3008;
        } else if (randomDiacritic == 2945) {
            randomDiacritic = 3021;
        }
    } else if (/[\u0c01-\u0c7f]/.test(letter)) {
        // telugu -- plus spacing combining chars @ 3073-3075
        randomDiacritic = randomFromInterval(3134, 3158);
    } else if (/[\u0c82-\u0cf2]/.test(letter)) {
        // kannada -- 3362-3286, also 3260, 3298-3299, plus spacing combining chars @ 3202-3203
        randomDiacritic = randomFromInterval(3259, 3286);
        if (randomDiacritic >= 3260 && randomDiacritic <= 3261) {
            randomDiacritic = randomDiacritic + 38;
        } else if (randomDiacritic == 3259) {
            randomDiacritic = 3260;
        }
    } else if (/[\u0d02-\u0d7f]/.test(letter)) {
        // malayalam -- also 3405, 3426-3427, plus spacing combining chars @ 3330-3331, 3391-3392, 3398-3904
        randomDiacritic = randomFromInterval(3390, 3396);
        if (randomDiacritic == 3390) {
            randomDiacritic = 3405;
        } else if (randomDiacritic >= 3391 && randomDiacritic <= 3392) {
            randomDiacritic = randomDiacritic + 35;
        }
    } else if (/[\u0d82-\u0df4]/.test(letter)) {
        // sinhala -- plus spacing combining chars @ 3458-3459, 3544-3571
        randomDiacritic = randomFromInterval(3530, 3571);
        if (randomDiacritic >= 3543 && randomDiacritic <= 3544) {
            randomDiacritic = randomDiacritic - 85;
        }
    } else if (/[\u0e01-\u0e5b]/.test(letter)) {
        // thai 3655-3662, also 3633, 3636-3642
        randomDiacritic = randomFromInterval(3648, 3662);
        if (randomDiacritic == 3654) {
            randomDiacritic = 3633;
        } else if (randomDiacritic >= 3648 && randomDiacritic <= 3653) {
            randomDiacritic = randomDiacritic - 12;
        }
    } else if (/[\u0e81-\u0edf]/.test(letter)) {
        // lao
        randomDiacritic = randomFromInterval(3761, 3772);
    } else if (/[\u0f00-\u0ffd]/.test(letter)) {
        // tibetan - 3984-4028, also 3864-3865, 3893, 3897, 3953-3975  plus spacing combining 3902-3903
        randomDiacritic = randomFromInterval(3957, 4028);
        if (randomDiacritic >= 3961 && randomDiacritic <= 3983) {
            randomDiacritic = randomDiacritic - 8;
        } else if (randomDiacritic == 3660) {
            randomDiacritic = 3897;
        } else if (randomDiacritic == 3659) {
            randomDiacritic = 3893;
        } else if (randomDiacritic >= 3957 && randomDiacritic <= 3958) {
            randomDiacritic = randomDiacritic + 93;
        }
    } else if (/[\u1200-\u137c]/.test(letter)) {
        // ethiopic
        randomDiacritic = randomFromInterval(4957, 4959);
    } else if (/[\u1780-\u17f9]/.test(letter)) {
        // khmer
        randomDiacritic = randomFromInterval(6068, 6099);
    } else if (/[\u3040-\u309f]/.test(letter)) {
        // hiragana
        randomDiacritic = randomFromInterval(12441, 12442);
    } else if (/[\u30a0-\u30ff]/.test(letter)) {
        // katakana
        randomDiacritic = randomFromInterval(12441, 12442);
    } else if (/[\u3200-\u4db5]/.test(letter)) {
        // CJK
        randomDiacritic = randomFromInterval(12330, 12333);
    } else {
        // cobining diacritical marks block, plus a few from supplement
        randomDiacritic = randomFromInterval(768, 890);
        // reroute nums above 880 to supplemental block
        if (randomDiacritic >= 880 && randomDiacritic <= 890) {
            randomDiacritic = randomDiacritic + 6736;
            // 832-833 (U+0340-U+0341) don't always play well with facebook,
            // so reroute those to supplemental
        } else if (randomDiacritic >= 832 && randomDiacritic <= 833) {
            randomDiacritic = randomDiacritic + 6846;
        }
    }

    return randomDiacritic;
};



function glitchTextMouseover(x) {
    // picks a random char in input text, and adds a random diacritic




    var textLength = x.innerHTML.length;


    // pick a random char in input string
    var i = randomFromInterval(1, textLength);

    var letter = x.innerHTML.charAt(i - 1);

    // call randomNumFromLetter() script to pick random diacritic of appropriate type
    var randomDiacritic = randomNumFromLetter(letter);

    x.innerHTML = x.innerHTML.splice(i, 0, '&#' + randomDiacritic + ';');


};

function glitchAllMouseover(x) {
    // adds a random diacritic after every char in input string
    // note that diacritics you already added count as chars, so these add up fast!


    // declare these here so we don't re-declare every time loop runs
    var randomDiacritic = 768;
    var glitching = x.innerHTML;
    var letter = 'b';
    var textLength = x.innerHTML.length;

    // for next loop - cycle through all chars and add random diacritic after each
    for (var i = textLength; i >= 1; i -= 1) {

        letter = glitching.charAt(i - 1);

        randomDiacritic = randomNumFromLetter(letter);

        glitching = glitching.splice(i, 0, '&#' + randomDiacritic + ';');
        x.innerHTML = glitching;

        // copy glitched text back into input box, if desired

    }
};


function glitchAllSameMouseover(x) {
    // this is the same as glitchAll except it adds the same diacritic after each char

    var textLength = x.innerHTML.length;


    // this time we pick a diacritic before looping through text
    var glitching = x.innerHTML;
    // pick diacritic based on char at index 0
    var letter = glitching.charAt(0);

    var randomDiacritic = randomNumFromLetter(letter);

    // for next loop
    for (var i = textLength; i >= 1; i -= 1) {

        glitching = glitching.splice(i, 0, '&#' + randomDiacritic + ';');
        x.innerHTML = glitching;


    }
};

function glitchTextPreciseMouseover(x, charNum) {
    // picks a random char in input text, and the diacritic provided
    // arg 'diacritic' is required and can the a number or the ID of an input that provides a number



    var textLength = x.innerHTML.length;


    // pick a random char in input string
    var i = randomFromInterval(1, textLength);



    x.innerHTML = x.innerHTML.splice(i, 0, '&#' + charNum + ';');


};

function glitchAllPreciseMouseover(x, charNum) {
    // this is the same as glitchAllSame except the diacritic is supplied as input

    var textLength = x.innerHTML.length;

    var glitching = x.innerHTML;



    // for next loop
    for (var i = textLength; i >= 1; i -= 1) {

        glitching = glitching.splice(i, 0, '&#' + charNum + ';');
        x.innerHTML = glitching;


    }
};


function randomizeTextMouseover(x) {
    // effectively replaces every char in input string with a random char
    var textLength = x.innerHTML.length;


    var randomChar = 63;
    var glitching = x.innerHTML;

    // for next loop - stop after each character, add a new random character, then delete original character
    for (var i = textLength - 1; i >= 0; i -= 1) {

        letter = glitching.charAt(i);

        // stop at 10175 to avoid too many undisplayable chars (empty squares) but you could go much higher
        randomChar = randomFromInterval(33, 10175);

        // ampersand and angle brackets don't play well, so avoid them too
        if (randomChar == 38) {
            randomChar = randomFromInterval(63, 1969);
        } else if (randomChar == 60) {
            randomChar = randomFromInterval(63, 1969);
        } else if (randomChar == 62) {
            randomChar = randomFromInterval(63, 1969);
        }

        glitching = glitching.replaceAt(i, 0, '&#' + randomChar + ';');
        x.innerHTML = glitching;

    }
};


function randomizeInRangeMouseover(x, startRange, endRange) {
    // same as randomizeText() except you specify the range of characters

    var textLength = x.innerHTML.length;


    var randomChar = 63;
    var glitching = x.innerHTML;

    // for next loop - stop after each character, add a new random character, then delete original character
    for (var i = textLength - 1; i >= 0; i -= 1) {

        randomChar = randomFromInterval(startRange, endRange);

        // ampersand and angle brackets don't play well, so avoid them too
        if (randomChar == 38) {
            randomChar = randomFromInterval(63, 1969);
        } else if (randomChar == 60) {
            randomChar = randomFromInterval(63, 1969);
        } else if (randomChar == 62) {
            randomChar = randomFromInterval(63, 1969);
        }

        // if you don't want to filter out these blocks, comment out/delete this section
        else if (randomChar >= 2043 && randomChar <= 2304) {
            // these blocks undisplayable with common web fonts, so avoid
            randomChar = randomFromInterval(7424, 10175);
        } else if (randomChar >= 6688 && randomChar <= 7247) {
            randomChar = randomFromInterval(7424, 10175);
        }

        glitching = glitching.replaceAt(i, 0, '&#' + randomChar + ';');
        x.innerHTML = glitching;


    }
};

function randomizeBlockMouseover(x, blockName) {
    // given a block name, pick the correct range for generating random characters

    if (blockName == "Latin") {
        var startRange = 33;
        var endRange = 879;
    } else if (blockName == "Basic ASCII") {
        var startRange = 33;
        var endRange = 127;
    } else if (blockName == "Extended ASCII") {
        var startRange = 33;
        var endRange = 255;
    } else if (blockName == "Greek") {
        var startRange = 880;
        var endRange = 1023;
    } else if (blockName == "Cyrillic") {
        var startRange = 1024;
        var endRange = 1309;
    } else if (blockName == "Armenian") {
        var startRange = 1329;
        var endRange = 1419;
    } else if (blockName == "Hebrew") {
        var startRange = 1425;
        var endRange = 1524;
    } else if (blockName == "Arabic") {
        var startRange = 1536;
        var endRange = 1791;
    } else if (blockName == "Syriac") {
        var startRange = 1792;
        var endRange = 1871;
    } else if (blockName == "Thaana") {
        var startRange = 1902;
        var endRange = 1969;
    } else if (blockName == "NKo") {
        var startRange = 1984;
        var endRange = 2042;
    } else if (blockName == "Devanagari") {
        var startRange = 2304;
        var endRange = 2431;
    } else if (blockName == "Bengali") {
        var startRange = 2433;
        var endRange = 2554;
    } else if (blockName == "Gurmukhi") {
        var startRange = 2561;
        var endRange = 2677;
    } else if (blockName == "Gujarati") {
        var startRange = 2689;
        var endRange = 2801;
    } else if (blockName == "Oriya") {
        var startRange = 2817;
        var endRange = 2935;
    } else if (blockName == "Tamil") {
        var startRange = 2946;
        var endRange = 3066;
    } else if (blockName == "Telugu") {
        var startRange = 3073;
        var endRange = 3199;
    } else if (blockName == "Kannada") {
        var startRange = 3202;
        var endRange = 3314;
    } else if (blockName == "Malayalam") {
        var startRange = 3330;
        var endRange = 3455;
    } else if (blockName == "Sinhala") {
        var startRange = 3458;
        var endRange = 3572;
    } else if (blockName == "Thai") {
        var startRange = 3585;
        var endRange = 3675;
    } else if (blockName == "Lao") {
        var startRange = 3703;
        var endRange = 3807;
    } else if (blockName == "Tibetan") {
        var startRange = 3840;
        var endRange = 4058;
    } else if (blockName == "Myanmar") {
        var startRange = 4096;
        var endRange = 4255;
    } else if (blockName == "Georgian") {
        var startRange = 4256;
        var endRange = 4351;
    } else if (blockName == "Hangul") {
        var startRange = 4352;
        var endRange = 4607;
    } else if (blockName == "Ethiopic") {
        var startRange = 4608;
        var endRange = 4988;
    } else if (blockName == "Cherokee") {
        var startRange = 5024;
        var endRange = 5108;
    } else if (blockName == "Canadian Aboriginal") {
        var startRange = 5120;
        var endRange = 5759;
    } else if (blockName == "Ogham") {
        var startRange = 5760;
        var endRange = 5788;
    } else if (blockName == "Runic") {
        var startRange = 5792;
        var endRange = 5872;
    } else if (blockName == "Hanunoo") {
        var startRange = 5920;
        var endRange = 5942;
    } else if (blockName == "Buhid") {
        var startRange = 5952;
        var endRange = 5971;
    } else if (blockName == "Khmer") {
        var startRange = 6016;
        var endRange = 6137;
    } else if (blockName == "Mongolian") {
        var startRange = 6144;
        var endRange = 6314;
    } else if (blockName == "Limbu") {
        var startRange = 6400;
        var endRange = 6479;
    } else if (blockName == "Tai Le") {
        var startRange = 6480;
        var endRange = 6516;
    } else if (blockName == "Buginese") {
        var startRange = 6656;
        var endRange = 6683;
    } else if (blockName == "Ol Chiki") {
        var startRange = 7248;
        var endRange = 7295;
    } else if (blockName == "Punctuation") {
        var startRange = 8192;
        var endRange = 8303;
    } else if (blockName == "Superscripts") {
        var startRange = 8304;
        var endRange = 8348;
    } else if (blockName == "Currency") {
        var startRange = 8352;
        var endRange = 8378;
    } else if (blockName == "Hiragana") {
        var startRange = 12353;
        var endRange = 12447;
    } else if (blockName == "Katakana") {
        var startRange = 12448;
        var endRange = 12543;
    } else if (blockName == "Bopomofo") {
        var startRange = 12549;
        var endRange = 12589;
    } else if (blockName == "CJK") {
        var startRange = 12800;
        var endRange = 19893;
    } else if (blockName == "Broad") {
        var startRange = 33;
        var endRange = 10175;
    } else if (blockName == "Shapes") {
        var startRange = 9472;
        var endRange = 9727;
    } else if (blockName == "Blocks") {
        var startRange = 9600;
        var endRange = 9631;
    } else if (blockName == "Shades") {
        var startRange = 9617;
        var endRange = 9619;
    } else if (blockName == "Geometric") {
        var startRange = 9632;
        var endRange = 9727;
    } else if (blockName == "Symbols") {
        var startRange = 9728;
        var endRange = 9839;
    } else if (blockName == "More Symbols") {
        var startRange = 9840;
        var endRange = 9983;
    } else if (blockName == "Dingbats") {
        var startRange = 9985;
        var endRange = 10175;
    } else if (blockName == "Braille") {
        var startRange = 10240;
        var endRange = 10495;
    } else if (blockName == "Glagolithic") {
        var startRange = 11264;
        var endRange = 11358;
    } else if (blockName == "Coptic") {
        var startRange = 11392;
        var endRange = 11498;
    } else if (blockName == "Tifinagh") {
        var startRange = 11568;
        var endRange = 11621;
    } else if (blockName == "Supplemental Punctuation") {
        var startRange = 11776;
        var endRange = 11835;
    } else if (blockName == "Vai") {
        var startRange = 42240;
        var endRange = 42539;
    } else if (blockName == "Saurashtra") {
        var startRange = 43136;
        var endRange = 43203;
    } else if (blockName == "Kayah Li") {
        var startRange = 43264;
        var endRange = 43311;
    } else if (blockName == "Rejang") {
        var startRange = 43312;
        var endRange = 43347;
    } else if (blockName == "Cham") {
        var startRange = 43520;
        var endRange = 43574;
    } else if (blockName == "Linear B") {
        var startRange = 65536;
        var endRange = 65786;
    } else if (blockName == "Cypriot") {
        var startRange = 67584;
        var endRange = 65647;
    } else if (blockName == "Phaistos Disc") {
        var startRange = 66000;
        var endRange = 66045;
    } else if (blockName == "Arrows") {
        var startRange = 8592;
        var endRange = 8682;
    } else if (blockName == "Letterlike") {
        var startRange = 8448;
        var endRange = 8527;
    } else if (blockName == "Numbers") {
        var startRange = 8528;
        var endRange = 8585;
    } else if (blockName == "Technical") {
        var startRange = 8704;
        var endRange = 9203;
    } else if (blockName == "Enclosed") {
        var startRange = 9312;
        var endRange = 9471;
    } else if (blockName == "IPA") {
        var startRange = 592;
        var endRange = 687;
    } else if (blockName == "Phonetics") {
        var startRange = 7424;
        var endRange = 7615;
    } else if (blockName == "Mishmash") {
        var startRange = 7124;
        var endRange = 10175;
    } else if (blockName == "Pictographs") {
        var startRange = 127744;
        var endRange = 128591;
    } else if (blockName == "Transport") {
        var startRange = 128640;
        var endRange = 128709;
    } else if (blockName == "Alchemical") {
        var startRange = 128768;
        var endRange = 128883;
    } else if (blockName == "Music") {
        var startRange = 119040;
        var endRange = 119261;
    }
    // call randomizeInRange() to generate the random character and output back to screen
    var textLength = x.innerHTML.length;


    var randomChar = 63;
    var glitching = x.innerHTML;

    // for next loop - stop after each character, add a new random character, then delete original character
    for (var i = textLength - 1; i >= 0; i -= 1) {

        randomChar = randomFromInterval(startRange, endRange);

        glitching = glitching.replaceAt(i, 0, '&#' + randomChar + ';');
        x.innerHTML = glitching;


    }
};

function randomFromInterval(from, to) {
    // generate a "random" number between from and to
    return Math.floor(Math.random() *(to - from + 1) + from);
};