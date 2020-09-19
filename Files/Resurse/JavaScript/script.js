window.onload=function(){
    
    console.log(window.localStorage.getItem('pret_min'));
    document.getElementById("Pret_min").value=window.localStorage.getItem('pret_min');
    
	var ajaxRequest = new XMLHttpRequest();

	ajaxRequest.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
                
                //Task I.4 Durata executie
                var t0 = performance.now()

                var text=this.responseText;
                var obJson = JSON.parse(this.responseText);
                afiseazaJsonTemplate(obJson);
                
                var t1 = performance.now()
                
                console.log("Ca sa citim fisierul Json si sa afisam tabelul a durat " + Math.round((t1 - t0) * 10000) / 10000 + " millisecunde.");
                
                document.getElementById("Sortare").onclick=function() {
                    let rbs=document.querySelectorAll('input[name="Sort"]');
                    for(let rb of rbs)
                    {
                        if(rb.checked){
                            if(rb.value=="asc")sortare_pret_asc(obJson);
                            else sortare_pret_desc(obJson);
                        }
                    }
                    selectare(obJson);
                }
                document.getElementById("Eliminare").onclick=function() {
                    var pret_min = document.getElementById("Pret_min").value;
                    window.localStorage.setItem('pret_min',pret_min);
                    console.log(pret_min);
                    afiseazaJsonTemplate(obJson);
                    elimin_over_i(obJson,pret_min);
                    selectare(obJson);
                }
                document.getElementById("Resetare").onclick=function() {
                    obJson=JSON.parse(text);afiseazaJsonTemplate(obJson);
                }
                /*document.getElementById("Age_b").onclick=function() {
                    var age = document.getElementById("Age").value;
                    console.log(age);
                    initializeClock();
                    function getTimeRemaining(){
                          const total = Date.parse(new Date()) - Date.parse('2000-12-15');
                          const seconds = Math.floor( (total/1000) % 60 );
                          const minutes = Math.floor( (total/1000/60) % 60 );
                          const hours = Math.floor( (total/(1000*60*60)) % 24 );
                          const days = Math.floor( total/(1000*60*60*24) );
                          return {total,days,hours,minutes,seconds};
                    }
                    function initializeClock() {
                          const clock = document.getElementById("age_out");
                          const timeinterval = setInterval(function(){
                            const t = getTimeRemaining();
                            clock.innerHTML = 'Traiesti de: '+ '<br>' +'zile: ' + t.days + '<br>' +
                                              'ore: '+ t.hours + '<br>' +
                                              'minute: ' + t.minutes + '<br>' +
                                              'secunde: ' + t.seconds;
                      },1000);
                    }
                    
                }*/
                window.onkeydown=function(e){
                    if(e.ctrlKey && e.code == "KeyS"){
                        console.log(e);
                        e.preventDefault();
                        var pret_min = document.getElementById("Pret_min").value;
                        window.localStorage.setItem('pret_min',pret_min);
                    }
                }
                window.onkeypress=function(e){
                    if(e.ctrlKey && e.code == "KeyZ"){
                        e.preventDefault();
                        obJson=JSON.parse(text);
                        afiseazaJsonTemplate(obJson);
                    }
                    if(e.code == "KeyE"){
                        elimina(obJson,obJson.carti.length-1);
                        afiseazaJsonTemplate(obJson);
                    }
                    selectare(obJson);
                }
                //idleReset(obJson,text);
                selectare(obJson);    
			}
	};
	ajaxRequest.open("GET", "Resurse/json/Carti.json", true);
	ajaxRequest.send();
	function afiseazaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   
			let container=document.getElementById("afisTemplate");

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			for(let i=0;i<obJson.carti.length;i++){
                if(obJson.carti[i].disponibil){
                    textTemplate+=ejs.render("<div style='color:green' title='<%=carte.pret/carte.nr_pagini%>' class='templ_student' id='<%= carte.id %>'>\
                    <div>Id: <%= carte.id %></div>\
                    <div>Nume: <%= carte.nume %></div>\
                    <div>An: <%= carte.an %></div>\
                    <div>Nr_pagini: <%= carte.nr_pagini %></div>\
                    <div>Pret: <%= carte.pret %></div>\
                    <div>Raport Pret/Pagina: <%= Math.round(carte.pret/carte.nr_pagini * 10000) / 10000 %></div>\
                    </div>", 
                    {carte: obJson.carti[i]});}
                else 
                {
                    textTemplate+=ejs.render("<div style='color:red' title='<%=carte.pret/carte.nr_pagini%>' class='templ_student' id='<%= carte.id %>'>\
                    <div>Id: <%= carte.id %></div>\
                    <div>Nume: <%= carte.nume %></div>\
                    <div>An: <%= carte.an %></div>\
                    <div>Nr_pagini: <%= carte.nr_pagini %></div>\
                    <div>Pret: <%= carte.pret %></div>\
                    <div>Raport Pret/Pagina: <%= Math.round(carte.pret/carte.nr_pagini * 10000) / 10000 %></div>\
                    </div>", 
                    {carte: obJson.carti[i]});}
			} 
			//adaug textul cu afisarea studentilor in container
			container.innerHTML=textTemplate;
	}
    function selectare(obJson){
        var randuri = document.getElementById("afisTemplate").children;
        var vranduri = Array.prototype.slice.call(randuri);
        for (let x of vranduri){
        x.onclick=function(e){ 
            if(e.shiftKey){
                var randuri = document.getElementById("afisTemplate").children;
                var vranduri = Array.prototype.slice.call(randuri);
                console.log(vranduri);
                for (let x of vranduri){
                    if(x.classList.contains('selectat')){   
                        x.remove();
                        j=0;
                        for (let i of obJson.carti){
                            if(i.id==x.id)
                            {
                                console.log(i.id,j);
                                obJson.carti.splice(j,1);
                            }
                        j++;
                        }
                    }
                }
            }
            else 
                this.classList.toggle("selectat");
            }
        }
    }
    function elimin_over_i(obJson,val){
        var randuri = document.getElementById("afisTemplate").children;
        var vranduri = Array.prototype.slice.call(randuri);
        console.log(vranduri);
        for (let x of vranduri){
            console.log(x.children[4].textContent);
            if(x.children[4].textContent>("Pret: "+val)){console.log(x.children[0]);x.remove();}
        }
    }
    function idleReset() {
        var t;
        window.onload = resetTimer;
        window.onmousemove = resetTimer;
        window.onmousedown = resetTimer;  // catches touchscreen presses as well      
        window.ontouchstart = resetTimer; // catches touchscreen swipes as well 
        window.onclick = resetTimer;      // catches touchpad clicks as well
        window.onkeypress = resetTimer;   
        window.addEventListener('scroll', resetTimer, true); // improved; see comments

        function yourFunction() {
            console.log('inactiv');
            window.location.reload(false); 
        }

        function resetTimer() {
            clearTimeout(t);
            t = setTimeout(yourFunction, 60000);  // time is in milliseconds
        }
    }
    idleReset();
    function sortare_pret_asc(obJson)
    {
        obJson.carti.sort(function(a,b){
            return a.pret - b.pret;
        });
        afiseazaJsonTemplate(obJson);
    }
    function sortare_pret_desc(obJson)
    {
        obJson.carti.sort(function(a,b){
            return b.pret - a.pret;
        });
        afiseazaJsonTemplate(obJson);
    }
    function elimina(obJson,i)
    {
        obJson.carti.splice(i,1);
        console.log(obJson);
    }
    var titlu = document.querySelector('.animation');
    setInterval(Change_color, 1000);
    function Change_color(){
        let rand_color='#'+(Math.random()*0xFFFFFF>>0).toString(16);
        titlu.style.color=rand_color;
    }
}