class App {
    
        constructor (){


            this.currentEvent = null; // permet de stocker l'event en cours d'edition

            // formulaire ajout des events 
            this.$form_event = $("#add-event");//formulaire
            this.$event = $("#event"); // champ texte
            this.$description = $("#description");
            this.$date_start_event = $("#date_start");
            this.$date_end_event = $("#date_end");

            this.$add = $("#add"); // bouton ajouter form event

            // fenetre information & description de l'event
            this.$infos= $("#eventinfos");
            this.$titre = $("#container_eventinfos h2");
            this.$descriptioninfos = $("#descriptioninfos");
            this.$d_event = $("#d_event");
            this.$e_event = $("#e_event");

            this.events = []; // tableau objets events

            // on declanche des instanciations des que new app
            this.readEvents(); // lire boucle sur event dans events 
            this.displayEvents(); // afiche 
            this.reinit(); //initialise valeur event + hide form et infos event

        }

        reinit(){
            this.$form_event.hide();
            this.$form_event.slideUp(300);
            this.$event.val("");
            this.$infos.hide();
            this.$infos.slideUp(300);
        }

        addEvent( event ){
            this.events.push( event );
        }

        saveEvents(){
            // le locale storage ne peut enregistere que des chaines de caracter
            // on utilise JSON.stringify pour trnasformer un tableau d'objet en chaine de cgharactere JSON/
            var eventString  = JSON.stringify( this.events );
            localStorage.setItem("events", eventString);

        }
        
        readEvents() {
            var eventString = localStorage.getItem("events");
            var events = JSON.parse( eventString );

            if(!events){ // s'il n y a pas d'event dans le LS alors on arrete le read
                return;
            }

            for(var eventObject of events){
                var event = new Event ( eventObject.name, eventObject.description, eventObject.datestartevent, eventObject.dateendevent  );

                this.addEvent( event );
            }
        }



        displayEvents(){

            for( var event of this.events ){
                event.display();
            }

        }


        removeEvent(index){

            var event = this.events[index]; // on recupere l'event pour appeler destroy
            event.$dom.fadeOut(300, function(){
                event.destroy(); // on retire du DOM
            })
            
            this.events.splice(index, 1); // supprime 1 element à l'index indiqué

        }

            
        initPickersEvents(){
            var options = {
                closeText: 'Fermer',
                prevText: '&#x3c;Préc',
                nextText: 'Suiv&#x3e;',
                currentText: 'Aujourd\'hui',
                monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
                'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
                monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
                'Jul','Aou','Sep','Oct','Nov','Dec'],
                dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
                dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
                dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: '',
                minDate: 0,
                maxDate: '+12M +0D',
                // minDate: new Date (2018, 0, 1), // en cas resa debut fixe 
                // maxDate: new Date (2018,  11, 31),
                // beforeShowDay: $.datepicker.noWeekends,
                // beforeShowDay: $.proxy(this.ClosedDay, this), // pour ne pas perdre le this en tant que mon app
                numberOfMonths: 1,
                showButtonPanel: true
        
                };
        
                this.$date_start_event.datepicker( options);
                this.$date_end_event.datepicker( options);
        
        
            }

    }