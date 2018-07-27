   
    $(document).ready(function () {

        // 'https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id={your app_id}&app_key={your app_key}'

            if ((localStorage.getItem("favorites")) !== null) {
                $(".savedstuff").removeClass("disabled")
            }
        

        $(".custombutton").on("submit", function(e) {
            
              e.preventDefault()
              hideKeyboard = function() {
                document.activeElement.blur();
                $("input").blur();
              };
              var newMood = $(".addbutton").val()
              var newButton = $("<button>")
              newButton.text(newMood)
              newButton.attr("class", "coolbeans searchbutton");
              newButton.attr("data-mood", newMood);              
              $(".buttonarea").append(newButton);
              $(document).on('click','.searchbutton', searchAPI)
              
              
            
        });
            
        $(".savedstuff").on("click", function() {

            $(".buttons").css("display", "none");
            $("#reactiongif").empty();
            var gifs = localStorage.getItem("favorites");
            $("#reactiongif").html(gifs)

        })

        searchAPI = function() {
            

      
            var reaction = $(this).attr("data-mood");
      
            
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
              reaction + "&api_key=dFNnGXb85LkyR37i8qf9UDCN9Rt8z5Ym&rating=r&limit=200";
      
            
            $.ajax({
              url: queryURL,
              method: "GET"
            })
              
              .then(function(response) {
                console.log(queryURL);
      
                console.log(response);
                var results = response.data;
      
                for (var i = 0; i < 10; i++) {

                    var k = (Math.floor((Math.random()) * 100));
      
                  var reactionDIV = $("<span>");
                  reactionDIV.attr("class", "gifbox"); ////create span for each gif////
                  
      
                  var reactionGIF = $("<img>");  ///fetch image of gif///////
                  reactionGIF.attr("src", results[k].images.fixed_height.url);
      
                  
                  reactionDIV.append(reactionGIF); ///attach gif to the span /////



                  var infoDIV = $("<div>"); /////put all the info for the gif into a div/////
                  infoDIV.attr("class", "infobox")
                  var p = $("<span>").html("<p><strong>Title: </strong>" + results[k].title + "<br>" + "<strong>Rating: </strong>" + results[k].rating + "<br>" + "<strong>Last Trending: </strong>" + results[k].trending_datetime + "</p>");
                  var s = $("<a>").attr("Href", results[k].url).text("Link");
                  var q = $("<button>").attr("class", "favorite btn-sm").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Add to Favorites")



                  infoDIV.append(p);
                  infoDIV.append(s);
                  infoDIV.append("<br>")
                  infoDIV.append(q);
                  reactionDIV.append(infoDIV) /////put the info div into span////
      
                  $("#reactiongif").prepend(reactionDIV); ////attach the span to the DOM////
                  $(document).on('click','.favorite', addFavorite)
                }
              });
         
        };

        $(".favorite").on("click", function() {

            
            var gif = $(this).closest(".gifbox")
            gif = JSON.stringify(gif);
            var favorites = localStorage.getItem("favorites");
            favorites.append(gif)
            localStorage.setItem("favorites", favorites)
        })

        $(".searchbutton").on("click", function() {
      
            var reaction = $(this).attr("data-mood");
      
            
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
              reaction + "+reaction" + "&api_key=dFNnGXb85LkyR37i8qf9UDCN9Rt8z5Ym&rating=r&limit=200";
      
            
            $.ajax({
              url: queryURL,
              method: "GET"
            })
              
              .then(function(response) {
                console.log(queryURL);
      
                console.log(response);
                var results = response.data;
      
                for (var i = 0; i < 10; i++) {

                    var k = (Math.floor((Math.random()) * 100));
      
                  var reactionDIV = $("<span>");
                  reactionDIV.attr("class", "gifbox"); ////create span for each gif////
                  
      
                  var reactionGIF = $("<img>");  ///fetch image of gif///////
                  reactionGIF.attr("src", results[k].images.fixed_height.url);
      
                  
                  reactionDIV.append(reactionGIF); ///attach gif to the span /////



                  var infoDIV = $("<div>"); /////put all the info for the gif into a div/////
                  infoDIV.attr("class", "infobox")
                  var p = $("<span>").html("<p><strong>Title: </strong>" + results[k].title + "<br>" + "<strong>Rating: </strong>" + results[k].rating + "<br>" + "<strong>Last Trending: </strong>" + results[k].trending_datetime + "</p>");
                  var s = $("<a>").attr("Href", results[k].url).text("Link");
                  var q = $("<button>").attr("class", "favorite btn-sm").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Add to Favorites")
                  



                  infoDIV.append(p);
                  infoDIV.append(s);
                  infoDIV.append("<br>")
                  infoDIV.append(q);
                  reactionDIV.append(infoDIV) /////put the info div into span////
      
                  $("#reactiongif").prepend(reactionDIV); ////attach the span to the DOM////
                  $(document).on('click','.favorite', addFavorite)
                }
              });
          })

         
          addFavorite = function () {

                $(".savedstuff").removeClass("disabled");
                var gif = $(this).parent().parent();
                var gif = $('<div>').append($(gif).clone()).html();
                $(this).off();
                if (localStorage.getItem("favorites") === null) {

                    return localStorage.setItem("favorites", gif)
                    .end();

                } else {

                    var favorites = localStorage.getItem("favorites");
                    return localStorage.setItem("favorites", favorites + gif)
                    .end(); 
                
                }
               
                

            }

        });
