
(async () => {
    let success = 0;
    let error = 0;

    const promises = [];

    for (let i = 0; i < 10000; i++) {
        promises.push((fetch('http://localhost:3000/balance?user_id=1&amount=-2', {
            method: 'PUT',
        }).catch(e => {error++}).then(response => {if(response.status >= 400) {error++} else {success++}; return response.text()}).then(console.log)));  
    }

    try {
        await Promise.all(promises);
    } catch(e) {
        console.error(e);
    }

    setTimeout(() => {
        console.log('success', success);
        console.log('error', error);
    }, 10000);
})();