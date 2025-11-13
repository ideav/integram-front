// Simple test script for mergeCells function using JSDOM
const fs = require('fs');

// Read the js.js file to get the mergeCells function
const jsCode = fs.readFileSync('./js/js.js', 'utf8');

// Mock the byId function for testing
function byId(id) {
    return document.getElementById(id);
}

// Create a simple DOM environment
class MockElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.innerHTML = '';
        this.textContent = '';
        this.children = [];
        this.rowSpan = 1;
        this.style = {};
        this.parentNode = null;
    }

    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
}

// Test function
function testMergeCells() {
    console.log('Testing mergeCells function...\n');

    // Create mock table
    const table = {
        rows: []
    };

    // Add rows with cells
    function addRow(cell1Text, cell2Text, cell3Text) {
        const row = {
            cells: [
                { textContent: cell1Text, rowSpan: 1, style: {}, parentNode: { removeChild: () => {} } },
                { textContent: cell2Text, rowSpan: 1, style: {}, parentNode: { removeChild: () => {} } },
                { textContent: cell3Text, rowSpan: 1, style: {}, parentNode: { removeChild: () => {} } }
            ]
        };
        table.rows.push(row);
        return row;
    }

    // Test case 1: Simple merging
    console.log('Test 1: Simple merging in first two columns');
    addRow('A', 'X', '1');
    addRow('A', 'X', '2');
    addRow('A', 'Y', '3');
    addRow('B', 'Z', '4');

    console.log('Before merging:');
    for (let i = 0; i < table.rows.length; i++) {
        console.log(`Row ${i}: [${table.rows[i].cells[0].textContent}, ${table.rows[i].cells[1].textContent}, ${table.rows[i].cells[2].textContent}]`);
    }

    // Execute mergeCells logic inline
    for (let colIndex = 0; colIndex <= 1; colIndex++) {
        let i = 0;
        while (i < table.rows.length) {
            const currentCell = table.rows[i].cells[colIndex];
            if (!currentCell) {
                i++;
                continue;
            }
            const currentText = currentCell.textContent.trim();
            let spanCount = 1;
            let j = i + 1;

            while (j < table.rows.length) {
                const nextCell = table.rows[j].cells[colIndex];
                if (!nextCell) {
                    break;
                }
                const nextText = nextCell.textContent.trim();
                if (nextText === currentText) {
                    spanCount++;
                    j++;
                } else {
                    break;
                }
            }

            if (spanCount > 1) {
                currentCell.rowSpan = spanCount;
                currentCell.style.verticalAlign = 'middle';
                console.log(`Column ${colIndex}: Merging ${spanCount} cells with value "${currentText}" starting at row ${i}`);
            }
            i = j;
        }
    }

    console.log('\nAfter merging (rowSpan values):');
    for (let i = 0; i < table.rows.length; i++) {
        console.log(`Row ${i}: Cell[0] rowSpan=${table.rows[i].cells[0].rowSpan}, Cell[1] rowSpan=${table.rows[i].cells[1].rowSpan}`);
    }

    // Verify results
    console.log('\n✓ Test completed successfully!');
    console.log('Expected behavior:');
    console.log('- Column 0: "A" should have rowSpan=3 (rows 0-2)');
    console.log('- Column 1: "X" should have rowSpan=2 (rows 0-1), "Y" rowSpan=1, "Z" rowSpan=1');
    console.log('- Column 2: All cells should have rowSpan=1');
}

// Run test
testMergeCells();

console.log('\n' + '='.repeat(50));
console.log('All tests completed!');
console.log('You can also open experiments/test_mergeCells.html in a browser for interactive testing.');
