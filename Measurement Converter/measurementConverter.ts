import * as readline from 'readline';
class MeasurementConverter {
    static convertLength(value: number, fromUnit: string, toUnit: string): number {
        const units: { [key: string]: number } = {
            "meters": 1,
            "kilometers": 1000,
            "centimeters": 0.01,
            "inches": 0.0254,
            "feet": 0.3048,
            "miles": 1609.34
        };
        if (!units[fromUnit] || !units[toUnit]) {
            throw new Error("Invalid units");
        }
        const metersValue = value * units[fromUnit];
        return metersValue / units[toUnit];
    }
}

function getUserInput(): Promise<{ value: number, fromUnit: string, toUnits: string[] }> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question("Enter the value to convert: ", (value) => {
            const numericValue = parseFloat(value);
            if (isNaN(numericValue)) {
                console.error("Invalid input. Please enter a numeric value.");
                rl.close();
                process.exit(1);
            }
            rl.question("Enter the unit to convert from (meters, kilometers, centimeters, inches, feet, miles): ", (fromUnit) => {
                rl.question("Enter the units to convert to (separated by commas, e.g., meters,kilometers,centimeters, inches, feet, miles): ", (toUnits) => {
                    rl.close();
                    resolve({ value: numericValue, fromUnit, toUnits: toUnits.split(",") });
                });
            });
        });
    });
}

async function main() {
    const userInput = await getUserInput();
    try {
        console.log(`Converting ${userInput.value} ${userInput.fromUnit} to:`);
        userInput.toUnits.forEach(unit => {
            const result = MeasurementConverter.convertLength(userInput.value, userInput.fromUnit, unit.trim());
            console.log(`${result.toFixed(2)} ${unit}`);
        });
    } catch (error) {
        console.error(error.message);
    }
}

main();