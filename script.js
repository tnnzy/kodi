// script.js - Funcționalități simple

document.addEventListener('DOMContentLoaded', function() {
    // Efecte hover pentru iteme
    const fileItems = document.querySelectorAll('.file-item');

    fileItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = '#f8f9fa';
        });

        item.addEventListener('mouseleave', function() {
            this.style.background = 'white';
        });
    });

    // Tracking pentru descărcări
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const fileName = this.parentElement.querySelector('.file-name').textContent;
            console.log('Descărcare: ' + fileName);

            // Feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> DESCĂRCAT!';
            this.style.background = '#2980b9';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '#27ae60';
            }, 2000);
        });
    });

    console.log('Site Kodi Downloads încărcat!');
});
