var app = new App(); // instance de l'application
app.initPickersEvents(); // init du datepicker

app.reinit();


app.$add.click(function(){

app.$form_event.slideToggle(200);

});

app.$form_event.submit(function(event){

    event.preventDefault(); //Empeche le rechargement
    var name = app.$event.val();// recupere la valeur du champ titre
    var description = app.$description.val();// recupere la valeur du champ description
    var datestartevent = app.$date_start_event.val();// recupere la valeur du champ description
    var dateendevent = app.$date_end_event.val();// recupere la valeur du champ description

    var event = new Event ( name, description, datestartevent, dateendevent );
    app.addEvent( event );
    event.display();
    app.setAlertToday();
    app.displayAlertToday();
    

    app.reinit();

});



//on click sur event 
$(document).on("click", ".event .openeventinfos", function(){
app.$infos.fadeIn(300); 
var index = $ (".event").index( $(this).parent() );
var event = app.events[ index ]; //cherche l'event corrspondant
app.currentEvent = event; // on va stocker event dans app on va pouvoir s'en resservir par la suite

app.$titre.html( event.name );
app.$descriptioninfos.html( event.description );
app.$d_event.html( event.datestartevent );
app.$e_event.html( event.dateendevent );

});


// cache les infos events
$(document).on("click", "#close", function(){
    app.$infos.fadeOut(300);
});

// remove les events = destroy de localstorage et cache les infos
$(document).on("click", ".close", function(event){
        event.stopPropagation(); // empeche la propagation de l'evenement au parent
       var index = $(".close").index( $(this));
        app.removeEvent ( index ); 
        app.$infos.fadeOut(300);
    });

     

    window.onbeforeunload = function(){ //lorsque l'utilisateur quitte la page sauvegarde sur localstorage
    app.saveEvents();
}