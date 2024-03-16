const display = document.getElementById("real")
print = (arg) => {display.innerHTML += arg + `\n`; display.scrollTop = display.scrollHeight;}
print("This is a program handmaded by AlphaSolid &copy; Friday, 15 March 2024 2pm UTC. Completed in under 30 minutes. \nHi! This is a mass-coin-flipping simulation. It doesn't really prove anything new but simply simulates how mathematics, probability, and randomess \"doesn't not work\" in that sense &#129335;");

const inputs = document.querySelectorAll('input');
document.getElementById("userN").focus();

inputs.forEach(input => {
  input.setAttribute('autocomplete', 'off')
  input.setAttribute('autocorrect', 'off')
  input.setAttribute('autocapitalize', 'off')
  input.setAttribute('spellcheck', false)
})

document.getElementById("terminal").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formDataObj = {};
    data.forEach((value, key) => (formDataObj[key] = value));
    let input = formDataObj["user"].trim()
    print(`\n>> ${input}`);
    document.getElementById("userN").value = "";
    handle(input)
})

let temp;
async function handle(command) {

    if (temp == 'sub') {
        zz=+command
        if (zz!=NaN && zz>=1 && zz<=8e9 && zz%1==0) {
            temp = '';
            let noh = "";
            if (zz<5e8) {
                noh = "10 seconds"
            } else if (zz<1e9) {
                noh = "20 seconds"
            } else if (zz<3e9) {
                noh = "1 minute\nHonestly, there is actually another command. It's 'ultra', it also simulates what 'start' does but it is capable of taking in any large finite number, and runs ultra fast."
            } else if (zz<=8e9) {
                noh = "3 minutes\nHonestly, there is actually another command. It's 'ultra', it also simulates what 'start' does but it is capable of taking in any large finite number, and runs ultra fast."
            }
            print(`Alright... here we go. ${zz} test subjects. Wait a bit as we process... (shouldn't take more than ${noh})`);
            await delay();
            game(zz)
        } else if (zz>8e9) { print("Sir, the world only has around 8 billion homo sapiens. Try a lower number. We don't have enough subjects within our Matrix.")
        } else { print("Input a positive integer between 1 to 8 billion for the number of test subjects"); }
    }
    else if (command == "start") {
        print("How many test subjects?");
        temp = "sub";
    }
    else if (command.includes("ultra")) {
        osc=+command.slice("ultra ".length)
        if (osc!=NaN && osc>=1 && osc<=1e308 && osc%1==0) {
            print(`Alright... here we go. ${osc} test subjects. This should take seconds.`);
            await delay();
            gameU(osc)
        } else if (osc>1e308) { print("Honestly, I lied again. There is actually a limit to this and that is 1e308. However, this is not something we have control of as this is the actual data limit for numbers in the system.")
        } else { print("The notation is 'ultra [number]'. The [number] should be a positive finite integer representing the number of test subjects. For example, 'ultra 1e8', 'ultra 3141592653589793', 'ultra 5.4e207'"); }
    }
    else { print("No such command. The only valid command right now is 'start' to begin the simulation") }
}

async function game(subs) {
    let total = subs;
    let round = 0;
    let prev = total;

    while (total>0) {
        print(`Round ${round} (1/${2**(round+1)} chance) [${total} standing. ${prev-total} new flipped a tail.]`)
        prev = total;

        total = 0;
        for (let i=0;i<prev;i++) {
            total += Math.random() < 0.5 ? 1 : 0;
        }
        round++;
        await delay();
    }
    print(`Round ${round} (1/${2**(round+1)} chance) [${total} standing. ${prev-total} new flipped a tail.]`)
}

async function gameU(subs) {
    let total = subs;
    let round = 0;
    let prev = total;

    while (total>0) {
        print(`Round ${round} (1/2^${round} chance) [${total} standing Heads. ${prev-total} new Tails.]`)
        prev = total;

        total = 0;
        total = Math.round(Math.random()*prev);
        round++;
        await delay();
    }
    print(`Round ${round} (1/2^${round} chance) [${total} standing Heads. ${prev-total} new Tails.]`)
}

function delay(ms=0) {
    return new Promise(resolve => setTimeout(resolve, ms))
}