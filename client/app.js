const guestbookContainer = document.getElementById("guestbookContainer");

async function getGuestbook() {
    const response = await fetch("https://guestbook-7nc2.onrender.com/guestbook");
    const data = await response.json();
    console.log(data);

    guestbookContainer.innerHTML = "";

    data.forEach(function(guest){
    const guestbook = document.createElement("p");
    guestbook.textContent = `${guest.name} from ${guest.hometown}: "${guest.message}"`
    guestbookContainer.appendChild(guestbook);
});
};


getGuestbook();

const form = document.getElementById("guestbookForm");

async function handlePostGuestMessage(event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
   
    await fetch("hhttps://guestbook-7nc2.onrender.com/guestbook", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
     });
     form.reset();
     getGuestbook();
}

form.addEventListener("submit", handlePostGuestMessage);

