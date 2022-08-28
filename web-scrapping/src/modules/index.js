async function login(page) {
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', process.env.GMAIL_USER);
    await Promise.all([
        await page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    ]);
    
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', process.env.GMAIL_PASS);
    await Promise.all([
        await page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: "domcontentloaded" })
    ]);
}

async function runCommand(page) {
    // const commandsTool = "nvm install --lts && nvm use --lts && npm install -g @nestjs/cli && npm install pm2 -g";
    // const commandDeamon = "cd ~/lahatra-gcp/api && cd api && npm install && nest buil && pm2 start dist/main.js --name API";
    const commands = "cd ~/lahatra-gcp && git pull origin main && cd api && npm install && nest build && pm2 reload API";
    commands.split("").forEach(async (value) => await page.keyboard.press(value));
    await page.keyboard.press('Enter');
}

function timeSleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

module.exports = {
    login,
    runCommand,
    timeSleep
}
