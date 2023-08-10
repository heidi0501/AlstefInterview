// Example input
/*
const inputTest = `
NATURAL,40,500.0
1001,6200,30,9.653
2001,7200,50,11.21
`;
createPacks(inputTest);
*/
const form = document.querySelector('form')
const input = document.querySelector('textarea[name="input"]');
const output = document.querySelector('.output');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    output.textContent = ''

    const value = input.value;
    createPacks(value)
})

function createPacks(input) {
    const lines = input.trim().split('\n');
    const [sortOrder, maxItemsPerPack, maxWeightPerPack] = lines.shift().split(',');

    const items = lines.map(line => {
        const [itemId, itemLength, itemQuantity, pieceWeight] = line.split(',').map(Number);
        return {
            itemId,
            itemLength,
            itemQuantity,
            pieceWeight
        };
    });

    let currentPack = { packNumber: 0, items: [], packLength: 0, packWeight: 0 };
    const packs = [];

    switch (sortOrder) {
        case 'NATURAL':
            items.forEach(item => {
                while (item.itemQuantity > 0) {
                    if (
                        currentPack.items.length >= maxItemsPerPack ||
                        currentPack.packWeight + item.pieceWeight > maxWeightPerPack
                    ) {
                        packs.push(currentPack);
                        currentPack = { packNumber: currentPack.packNumber + 1, items: [], packLength: 0, packWeight: 0 };
                    }

                    currentPack.items.push(item);
                    currentPack.packLength = Math.max(currentPack.packLength, item.itemLength);
                    currentPack.packWeight += item.pieceWeight;
                    item.itemQuantity--;
                }
            });
            if (currentPack.items.length > 0)
                packs.push(currentPack);

            break;

            case 'SHORT_TO_LONG':
            items.sort((a, b) => a.itemLength - b.itemLength);
            items.forEach(item => {
                while (item.itemQuantity > 0) {
                    if (
                        currentPack.items.length >= maxItemsPerPack ||
                        currentPack.packWeight + item.pieceWeight > maxWeightPerPack
                    ) {
                        packs.push(currentPack);
                        currentPack = { packNumber: currentPack.packNumber + 1, items: [], packLength: 0, packWeight: 0 };
                    }

                    currentPack.items.push(item);
                    currentPack.packLength = Math.max(currentPack.packLength, item.itemLength);
                    currentPack.packWeight += item.pieceWeight;
                    item.itemQuantity--;
                }
            });
            if (currentPack.items.length > 0)
                packs.push(currentPack);

            break;

        case 'LONG_TO_SHORT':
            items.sort((a, b) => b.itemLength - a.itemLength);
            items.forEach(item => {
                while (item.itemQuantity > 0) {
                    if (
                        currentPack.items.length >= maxItemsPerPack ||
                        currentPack.packWeight + item.pieceWeight > maxWeightPerPack
                    ) {
                        packs.push(currentPack);
                        currentPack = { packNumber: currentPack.packNumber + 1, items: [], packLength: 0, packWeight: 0 };
                    }

                    currentPack.items.push(item);
                    currentPack.packLength = Math.max(currentPack.packLength, item.itemLength);
                    currentPack.packWeight += item.pieceWeight;
                    item.itemQuantity--;
                }
            });
            if (currentPack.items.length > 0)
                packs.push(currentPack);

            break;

            default:
                console.log('Invalid sort order');
                output.innerHTML += `<span>Invalid sort order</span>`

            return;
    }

    packs.forEach(pack => {
        output.innerHTML += `<span>Pack Number: ${pack.packNumber + 1}</span>`
        const uniqueItems = pack.items.filter((item, index) => pack.items.indexOf(item) === index);
        uniqueItems.forEach(item => {
            output.innerHTML += `<span>${item.itemId},${item.itemLength},${item.itemQuantity},${item.pieceWeight}</span>`;
        });
        output.innerHTML +=` <span>Pack Length: ${pack.packLength}, Pack Weight: ${pack.packWeight.toFixed(2)}</span>`;
    });
}