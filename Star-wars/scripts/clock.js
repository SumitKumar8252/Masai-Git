function updateClock(){
    const now= new Date()
    const time= now.toLocaleTimeString()
    const day= now.toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'});
    document.getElementById("footerClock").textContent= `${time} ${day}`;
}

setInterval(updateClock, 1000)
updateClock()