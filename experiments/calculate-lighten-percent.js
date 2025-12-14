// Calculate the actual lightening percentage used in CSS

// From CSS: #a85555 -> #b86b6b
var base = 0xa85555;
var light = 0xb86b6b;

var r1 = (base >> 16) & 0xFF;
var g1 = (base >> 8) & 0xFF;
var b1 = base & 0xFF;

var r2 = (light >> 16) & 0xFF;
var g2 = (light >> 8) & 0xFF;
var b2 = light & 0xFF;

console.log('Base color #a85555:', 'R=' + r1, 'G=' + g1, 'B=' + b1);
console.log('Light color #b86b6b:', 'R=' + r2, 'G=' + g2, 'B=' + b2);
console.log('Difference:', 'R+' + (r2-r1), 'G+' + (g2-g1), 'B+' + (b2-b1));

var avgDiff = ((r2-r1) + (g2-g1) + (b2-b1)) / 3;
console.log('Average difference:', avgDiff);
console.log('That\'s a percentage increase of:', (avgDiff / 2.55).toFixed(2) + '%');

// Let's test a few more
console.log('\n--- Testing more color pairs ---');

var pairs = [
    ['#a85555', '#b86b6b'],
    ['#b87355', '#c68565'],
    ['#5586b8', '#6598c6']
];

pairs.forEach(function(pair) {
    var base = parseInt(pair[0].slice(1), 16);
    var light = parseInt(pair[1].slice(1), 16);

    var r1 = (base >> 16) & 0xFF;
    var g1 = (base >> 8) & 0xFF;
    var b1 = base & 0xFF;

    var r2 = (light >> 16) & 0xFF;
    var g2 = (light >> 8) & 0xFF;
    var b2 = light & 0xFF;

    var avgDiff = ((r2-r1) + (g2-g1) + (b2-b1)) / 3;
    var percent = avgDiff / 2.55;

    console.log(pair[0] + ' -> ' + pair[1] + ': avg diff=' + avgDiff.toFixed(2) + ', percent=' + percent.toFixed(2) + '%');
});
