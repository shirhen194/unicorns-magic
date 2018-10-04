import Unicorn from './class-unicorn.js'


function sendUnicorn(unicorn){
    return $.post( "unicorns", unicorn).then(() => 
    {console.log("unicorn was sent!")}).fail(()=> 
    {console.log("unicorn was not sent!")})
}


function getUnicorns(){
    return $.get("unicorns").then((unicorns)=>{renderUnicorns(unicorns)})
}

function removeUnicorn(unicornId){
    return $.ajax({
        method: 'DELETE',
        url: `unicorns/${unicornId}`
    })
        .then(() => {getUnicorns()}).fail(()=> console.log("problem deleting"))
    
}

function renderUnicorns(unicorns){
    $('.unicorns').empty();
    var source = $('#unicorn-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template({ unicorns });

    // append our new html to the page
    $('.unicorns').append(newHTML);
}

$('.Get-unicorn').on('click', function () {
    let name = $(this).closest('.unicorn-form').find('.name-input').val()
    let magic = $(this).closest('.unicorn-form').find('.magic-input').val()
    let unicorn = new Unicorn(name,magic)
    sendUnicorn(unicorn).then(()=>getUnicorns()).fail(()=> 
    {console.log("we didnt get unicorns!:(")})
})

$(".unicorns").on('click', '.delete-unicorn', function () {
    let id = $(this).closest('.unicorn').data().id
    removeUnicorn(id);

})


getUnicorns().fail(()=> 
    {console.log("we didnt get unicorns!:(")})

