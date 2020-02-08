[...document.querySelectorAll(".copy-btn")].forEach(el => {
    console.log(el);
    el.addEventListener('click', e => {
        console.log('in');
        const text = e.target.closest('.jscode').innerText;
        const ta = document.createElement('textarea');
        ta.style = 'position: fixed; top: 100vh';
        document.body.appendChild(ta);
        ta.value = text;
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();
    });
});
