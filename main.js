/*    Codes list
    80 004 - user not found
    80 000 - user disabled friend requests
*/

let __codes = {
    log: [80_004],
    push: [80_000],
    exit: []
}

let __config = {
    token: "",
    cancel_on_result: false
}

let __user = {
    username: "Abcidk",
    discriminator: 1
}

// main
let results = [];
function next() { __user.discriminator++; setTimeout(loop, 6999); }

async function loop() {
    if (__user.discriminator < 1 || __user.discriminator > 9999) {
        console.log("discriminator out of range 1-9999 (exiting brute-forcing process)");
        console.log(results);
        return;
    };
    
    const tag = __user.username + "#" + __user.discriminator;
    const response = await fetch("https://discord.com/api/v9/users/@me/relationships", {
        body: JSON.stringify(__user),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        }
    });
    
    console.clear();
    if (response.ok) {
        results.push(tag);
        console.log(`found: ${tag}`);
        
        if (!__config.cancel_on_result) next();
    }
    
    else {
        let data = await response.json();
        
        if (__codes.push.includes(data.code)) results.push(tag);
        if (__codes.exit.includes(data.code)) { console.log(`${tag}, ${data.code}: ${data.message} (exiting brute-forcing process)`); return; }
        else if (__codes.log.includes(data.code)) console.log(`${tag}, ${data.code}: ${data.message} (log)`);
        
        next();
    }
};

loop();
