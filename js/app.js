
function get_splash() {

    $(".hideAll").hide();

    var getSplash = $.ajax({
        url: "services/splash.php",
        type: "POST",
        dataType: "json"
    });

    getSplash.done(function (data) {
        
        var content = "";

        $.each(data, function (i, item) {

            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var cover_id = item.cover_id;
            var cover_name = item.cover_name;

            var poster_path = "./uploads/" + cover_id +
                "/" + cover_name;

            content +=
            `
            <div class="large-3 medium-6 small-12 cell">
                <div class="card-section grid-y movie" data-id=`+ movie_id +`>
                    <img src="`+ poster_path +`" alt=" `+ movie_name +`">
                    <div class="card">
                        <h5>`+ movie_name +`</h5>
                    </div>
                </div>
            </div>
            
            `;
            

        });

        $(".splash_content").html(content);
        $(".orbit").show();
        $(".heading").show();

        $(window).scrollTop(0);
        $(".splash_container").fadeIn();

    });

    getSplash.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getMovie)" +
            textStatus);
    });
}

function getSearch(search_text) {

    var getSearch = $.ajax({
        url: "services/search.php",
        type: "POST",
        data: {
            search_text: search_text
        },
        dataType: "json"
    });


    getSearch.done(function (data) {
        //alert("dingo: " + data);
        var content = "";

        $.each(data, function (i, item) {

            var type = item.type;

            if (type == "1") {
                var id = item.movie_id;
                var name = item.movie_name;
                var image_id = item.cover_id;
                var image_name = item.cover_name;
                var className = "movie";
            } else {
                var id = item.people_id;
                var name = item.name;
                var image_id = item.cover_id;
                var image_name = item.cover_name;
                var className = "people";
            }

            var image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div data-id="` + id + `" class="search_container ` + className + ` clearFloat">
                            <div class="left">
                                <img src="` + image + `" alt="` + name + `">
                            </div>
                            <div class="right">` + name + `</div>
                        </div>`;

        });

        $(".search_results").html(content).show();


    });

    getSearch.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getSearch)" +
            textStatus);
    });
}
// function hideSearch(){
//     $(".search_results").html(content).hide();
// }

function get_movie(movie_id) {
    $(".hideAll").fadeOut();

    var getMovie = $.ajax({
        url: "services/movie.php",
        type: "POST",
        data: {
            movie_id: movie_id
        },
        dataType: "json"
    });

    getMovie.done(function (data) {

        $(".movie_name").html(data.movie_name);
        $(".description").html(data.description);
        $(".rating").html(data.movie_rating);
        $(".date_me").html(data.movie_date_me);
        $(".movie_hour_me").html(data.movie_hour_me);
        $(".movie_minute_me").html(data.movie_minute_me);
        $(".colour_id").html(data.colour_id);
        $(".genre").html(data.genre);
        $(".category").html(data.category_name);
        $(".writers").html(data.writers[0].name);
        // add picture image
        var poster_path = "./uploads/" + data.cover_image_id +
            "/" + data.cover_image_name;

        $(".main_poster").attr("src", poster_path).attr("alt", data.movie_name);

        var content = "";

        $.each(data.cast, function (i, item) {

            var people_id = item.people_id;
            var name = item.name;
            var character_name = item.character_name;
            var image_id = item.image_id;
            var image_name = item.image_name;

            var poster_path = "./uploads/" + image_id +
                "/" + image_name;


            content += 

            `
            <div class="large-3 medium-6 small-12 cell">
                <div class="card-section grid-y people" data-id=`+ people_id +`>
                    <img src="`+ poster_path +`" alt=" `+ name +`">
                    <div class="card">
                        <h5>`+ name +`</h5>
                        <p>`+ character_name+`</p>
                    </div>
                </div>
            </div>
        
            `;
            

        });
        $(".cast").html(content);

        content = "";
        $.each(data.related_movies, function (i, item) {

            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var id = item.id;
            var name = item.name;

            var poster_path = "./uploads/" + id +
                "/" + name;

            content += `
                    
            <div class="large-3 medium-4 small-6 cell">
                <div class="card-section grid-y movie" data-id=`+ movie_id +`>
                    <img src="`+ poster_path +`" alt=" `+ movie_name +`">
                    <h5>`+ movie_name +`</h5>
                </div>
            </div>
            
            `;

        });

        $(".related_movies").html(content);

       //window.scrollTo(0, 0);
        $(window).scrollTop(0);
        $(".movie_container").fadeIn();

    });
    getMovie.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getMovie)" +
            textStatus);
    });

}

function get_people(people_id) {
    $(".hideAll").fadeOut();

    var getPeople = $.ajax({
        url: "services/people.php",
        type: "POST",
        data: {
            people_id: people_id
        },
        dataType: "json"
    });

    getPeople.done(function (data) {

        $(".people_name").html(data.people_name);
        $(".people_biography").html(data.people_biography);
        $(".born").html(data.born);
        $(".died").html(data.died);

        // add picture image
        var poster_path = "./uploads/" + data.cover_image_id +
            "/" + data.cover_image_name;

        $(".cover_image").attr("src", poster_path).attr("alt", data.people_name);


        var content = "";

        $.each(data.people_images, function (i, item) {
            var id = item.id;
            var name = item.name;

            var poster_path = "./uploads/" + id +
                "/" + name;

            content += 
            `
            <div class="large-4 medium-4 cell">
                <div class="images_vertical image_id people" data-id=`+ id +`>
                    <img src="`+poster_path+`" alt="`+id+`">
                </div>
            </div>
            `;
        });

        
        $(".people_images").html(content);

        content = "";


        $.each(data.related_movies, function (i, item) {

            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var id = item.id;
            var name = item.name;

            var poster_path = "./uploads/" + id +
                "/" + name;

            content += `
                    
            <div class="large-3 medium-4 small-6 cell">
                <div class="card-section grid-y people" data-id=`+ movie_id +`>
                    <img src="`+ poster_path +`" alt=" `+ movie_name +`">
                    <h5>`+ movie_name +`</h5>
                </div>
            </div>
            
            `;

        });

        $(".related_movies").html(content);

        //window.scrollTo(0, 0);
        $(window).scrollTop(0);
        $(".people_container").fadeIn();
    });
    getPeople.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getPeople)" +
            textStatus);
    });

}

$(document).foundation();


$(document).ready(
    function () {

        
        get_splash();

        $("#search").keyup(
            function () {
                var search_text = $(this).val();
                getSearch(search_text);
            }
        );

        $(document).on("click", "body .splash", function () {
            get_splash();
        });
        $(document).on("click", "body .movie", function () {
            var movie_id = $(this).attr("data-id");
            //alert(movie_id);
            get_movie(movie_id);
        });

        $(document).on("click", "body .people", function () {
            var people_id = $(this).attr("data-id");
            get_people(people_id);
        });
        $(".homeBtn").on("click", function(){
            get_splash();
        })

        $(document).on("click", "body .movieBtn", function () {
            $(".people").fadeOut();
            $(".movie").fadeOut();
        });
    }
    
);
