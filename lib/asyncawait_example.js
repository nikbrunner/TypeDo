function scaryClown() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('🤡');
        }, 2000);
    });
}

async function msg() {
    const msg = await scaryClown();
    console.log('Message:', msg);
}

msg(); // Message: 🤡 <-- after 2 seconds

const request = async () => {
    const response = await fetch('https://api.com/values/1');
    const json = await response.json();
    console.log(json);
};

request();
