class Event {
    
        constructor ( name, description, datestartevent, dateendevent){
            this.name = name;
            this.description = description;
            this.datestartevent = datestartevent;
            this.dateendevent = dateendevent;
            this.$dom = null; // pour le DOM
        }
    
        display(){
            var div = "<div class='event'>";
            div += "<div class='close'>X</div>";
            div += "<h2>"+ this.name +"</h2>";
            div += "<p>"+ this.description +"</p>";
            div += "<p>"+ this.datestartevent +"</p>";
            div += "<p>"+ this.dateendevent +"</p>";
            div += "<di class='openeventinfos'> voir details </div>";
            div += "</div>";
    
            this.$dom = $(div);//$("<div></div>") // creer un element JQUERY pour ajouter au DOM
            $("#container_events").append( this.$dom ); // pour le rajouter au DOM
    
            
        }


        
        destroy(){
            this.$dom.remove(); //retire du DOM
        }
    
    
    }