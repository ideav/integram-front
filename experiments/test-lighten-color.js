// Test the lightenColor function

function lightenColor(color, percent) {
    // Handle hex colors (e.g., #a85555)
    if (color.startsWith('#')) {
        var num = parseInt(color.slice(1), 16);
        var r = (num >> 16) + Math.round(2.55 * percent);
        var g = ((num >> 8) & 0x00FF) + Math.round(2.55 * percent);
        var b = (num & 0x0000FF) + Math.round(2.55 * percent);

        // Ensure values stay within 0-255 range
        r = Math.min(255, r);
        g = Math.min(255, g);
        b = Math.min(255, b);

        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }

    // Handle rgb/rgba colors
    if (color.startsWith('rgb')) {
        var matches = color.match(/\d+/g);
        if (matches && matches.length >= 3) {
            var r = Math.min(255, parseInt(matches[0]) + Math.round(2.55 * percent));
            var g = Math.min(255, parseInt(matches[1]) + Math.round(2.55 * percent));
            var b = Math.min(255, parseInt(matches[2]) + Math.round(2.55 * percent));

            if (matches.length === 4) {
                return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + matches[3] + ')';
            }
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    }

    // If color format is not recognized, return original color
    return color;
}

// Test cases
console.log('Testing lightenColor function:\n');

// Test hex colors
console.log('Hex color tests:');
console.log('#a85555 + 10% =', lightenColor('#a85555', 10), '(expected: #b86b6b or similar)');
console.log('#b87355 + 10% =', lightenColor('#b87355', 10), '(expected: #c68565 or similar)');
console.log('#5586b8 + 10% =', lightenColor('#5586b8', 10), '(expected: #6598c6 or similar)');

// Test RGB colors
console.log('\nRGB color tests:');
console.log('rgb(168, 85, 85) + 10% =', lightenColor('rgb(168, 85, 85)', 10));
console.log('rgb(85, 134, 184) + 10% =', lightenColor('rgb(85, 134, 184)', 10));

// Test RGBA colors
console.log('\nRGBA color tests:');
console.log('rgba(168, 85, 85, 0.8) + 10% =', lightenColor('rgba(168, 85, 85, 0.8)', 10));

// Test edge cases
console.log('\nEdge cases:');
console.log('Unknown format "hsl(120, 50%, 50%)" =', lightenColor('hsl(120, 50%, 50%)', 10), '(should return original)');

// Compare with expected values from CSS
console.log('\n\nComparison with CSS variables:');
console.log('CSS has: --status-color-3689: #a85555 and --status-color-3689-light: #b86b6b');
console.log('Our function: #a85555 +10% =', lightenColor('#a85555', 10));

// Calculate the actual difference
var original = '#a85555';
var expected = '#b86b6b';
var calculated = lightenColor(original, 10);
console.log('Original:', original);
console.log('Expected (from CSS):', expected);
console.log('Calculated:', calculated);
console.log('Match:', calculated === expected ? 'YES ✓' : 'NO (but close is ok)');
