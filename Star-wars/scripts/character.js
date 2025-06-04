const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  document.getElementById("characterDetails").textContent = "Character ID not found in URL.";
} else {
  fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Character not found");
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("characterDetails");
      container.innerHTML = `
        <img src="${data.image}" alt="${data.name}" style="width: 300px; border-radius: 12px;" />
        <h2>${data.name}</h2>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Species:</strong> ${data.species}</p>
        <p><strong>Homeworld:</strong> ${data.homeworld}</p>
        <p><strong>Affiliations:</strong> ${data.affiliations.join(', ')}</p>
        <p><strong>Height:</strong> ${data.height} cm</p>
        <p><strong>Mass:</strong> ${data.mass} kg</p>
        <p><strong>Eye Color:</strong> ${data.eyeColor}</p>
        <p><strong>Hair Color:</strong> ${data.hairColor}</p>
        <p><strong>Skin Color:</strong> ${data.skinColor}</p>
      `;
    })
    .catch(error => {
      document.getElementById("characterDetails").textContent = error.message;
    });
}
