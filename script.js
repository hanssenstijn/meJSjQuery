// mouse over image displays once a welcoming text
$(".circular--header").one("mouseenter", function() {
    alert("Hey There!\nWelcome to my Web Page.\nMy name is Stijn Hanssen.\nTry to find all the events/effects.");
});

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml2 .letter',
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i
    }).add({
        targets: '.ml2',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

// rotation of the programming skills
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length };
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

// API call to the reddit website to get multiple images
$('.btn').click(function() {
    $('.text').text('loading . . .');

    $.ajax({
        type: "GET",
        url: "https://www.reddit.com/r/aww/search.json?q=puppy&restrict_sr=true",
        success: function(response) {
            $('.text').html('');
            var children = response.data.children;
            for (var i = 0; i < children.length; i++) {
                var src = children[i].data.thumbnail;
                var image = "<img class=\"dog--img\" src = '" + children[i].data.thumbnail + "' / > ";
                $('.text').append(image);
            }

        },
    });
});

// API call to the reddit website to get multiple images
$('.btnweather').click(function() {
    $('.textweather').text('loading . . .');

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=Maastricht&appid=2c574178a9481451d546499bb2293d77",
        type: "GET",
        dataType: "jsonp",
        success: function(data) {
            $('.textweather').html('');
            var temp = Math.round(data.main.temp - 273.15).toString();
            var feels = Math.round(data.main.feels_like - 273.15).toString();
            $('.textweather').html("The weather in " +
                data.name.bold().fontsize(5) + " is at this moment " +
                temp.bold().fontsize(5) + " &#8451 (Feeling Temperature: " +
                feels.bold().fontsize(5) + " &#8451 ) . Weather State: " +
                data.weather[0].main.bold().fontsize(5));
        },
    });
});
