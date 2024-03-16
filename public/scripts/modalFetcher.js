const cards = document.querySelectorAll('.card');
const mediaModal = document.getElementById('mediaModal');
const modalContent = mediaModal.querySelector('.modal-content');
const closeBtn = mediaModal.querySelector('.close-btn');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const mediaType = card.dataset.mediaType;
        const mediaUrl = card.dataset.mediaUrl; 

        displayModal(mediaType, mediaUrl); 
        mediaModal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    mediaModal.style.display = 'none';
});

function displayModal(mediaType, mediaUrl) {
    modalContent.innerHTML = ''; // Clear previous content

    if (mediaType === 'Document') {
        const embed = document.createElement('embed');
        embed.src = mediaUrl;
        embed.type = 'application/pdf'; 
        embed.width = '80%'; // Adjust the width of embedded content if needed
        embed.height = '600'; // Adjust the height of embedded content if needed
        modalContent.appendChild(embed);
    } // Add more cases for other 'mediaType' values as needed
}