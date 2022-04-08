// ==UserScript==
// @name         Dofusbook real dmg calculator
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.dofusbook.net/fr/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dofusbook.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
        function computeRealDmgAvg(){
            document.querySelectorAll(".c-boostcard").forEach(function(card){
                var dmg = getDmgAvg(".c-boostcard__wrapper.cc_0 .c-boostcard__carac")
                var dmgCC = getDmgAvg(".c-boostcard__wrapper.cc_1 .c-boostcard__carac")
                function getDmgAvg(name){
                    var txt = card.querySelector(name).lastChild.textContent.split(" ")
                    var min = parseInt(txt[1])
                    var max = parseInt(txt[4])
                    var avg = (max - min)/2+min
                    return avg
                }
                var cc = parseInt(card.querySelectorAll(".CmpWidget-tag span")[3].textContent.split(" ")[0].split("%")[0])/100.0
                var realDmgAvg = dmg*(1-cc)+dmgCC*cc
                console.log("CC",cc*100,"%","//","avg dmg",dmg,"//","avg dmg CC",dmgCC,"//","real avg dmg",realDmgAvg)

                var el = document.createElement("div")
                el.style.cssText = "flex:2;"
                el.classList.add('real-dmg-avg')
                var currentEl = card.querySelector('.real-dmg-avg')
                if (currentEl) el = currentEl
                el.textContent = Math.round(realDmgAvg)
                card.querySelector(".c-boostcard__wrapper.cc_0 .c-boostcard__carac").closest(".l-flex").insertBefore(el, card.querySelector(".c-boostcard__wrapper.cc_1"))
            })
        }
    window.addEventListener('click', computeRealDmgAvg)

    /*
        var btn = document.createElement('button')
        btn.innerText = "Calcul dommage réels"
        btn.onclick = computeRealDmgAvg
        document.querySelector("div.title").appendChild(btn)
*/
})();
