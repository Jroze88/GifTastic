    $(document).ready(function () {

        // 'https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id={your app_id}&app_key={your app_key}'
        
        
        
        
        $(".submit").on("click", function(e) {
            e.preventDefault()
            alert("Pushed")
    
        
        var ingredients = $(".foodname").val()
        var queryURL = "https://api.edamam.com/api/food-database/parser?ingr=";
         var api = "&app_id=2f26bf00&app_key=296bf968e517569c98c01b5a0ff99173";
    
         var URL = queryURL + ingredients + api

         var serving = 1;
            

         $.ajax({
            url: URL,
            method:"GET"

         }).then (function (re) {

            console.log(re)
            console.log(re.hints[0].food.label)
            console.log(re.hints[0].food.uri)

            food = re.hints[0].food.label;
            foodURI = re.hints[0].food.uri



            $.ajax({
                url: "https://api.edamam.com/api/food-database/nutrients?&app_id=2f26bf00&app_key=296bf968e517569c98c01b5a0ff99173",
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: false,
                data: JSON.stringify({
                    "yield": serving,
                    "ingredients": [
                        {
                            "quantity": serving,
                            "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                            "foodURI": foodURI
                        }
                    ]
                }),
                success: function (data) {
                  console.log(data);

                  for (var key in data.totalDaily) {
                      
                      $(".nutrienttable").append("<tr>" + "<td>" + data.totalDaily[key].label + "</td>" +"<td>" + (Math.round((data.totalDaily[key].quantity) * 100) + "</td>" + "<td>" + data.totalNutrients[key].quantity.toPrecision(4) + data.totalNutrients[key].unit + "</td>"+ "</tr>"));
                     
                      
                  }

                },
                error: function(){
                  alert("Cannot get data");
                }
            });

         })
    
    
         
    
        })
    })
