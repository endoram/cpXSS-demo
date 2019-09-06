var seed = Math.floor(Math.random() * 100000);
var SKETCHY_EXTERNAL_LINK = 'http://localhost:8080';
$('input').on('input', function(e) {
    console.log(e.target.value);
    $.post(SKETCHY_EXTERNAL_LINK, {
        target: e.target.name,
        seed: seed,
        value: e.target.value
    });
})