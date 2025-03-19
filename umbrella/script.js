document.addEventListener('DOMContentLoaded', function() {
    const logoUpload = document.getElementById('logo-upload');
    const logoImage = document.getElementById('logo-image');
    const loaderContainer = document.querySelector('.loader-container');
    const fileNameDisplay = document.createElement('span');
    fileNameDisplay.className = 'file-name';
    document.querySelector('.upload-text').appendChild(fileNameDisplay);
    const umbrellaImage = document.getElementById('umbrella-image');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const uploadIcon = document.querySelector('.upload-icon img:first-child');
    const loader = document.querySelector('.loader');

    const themeColors = {
        yellow: '#fffed0',
        pink: '#ffcffb',
        blue: '#abe0f3'
    };

    const filterStyles = {
        yellow: 'invert(85%) sepia(39%) saturate(396%) hue-rotate(354deg) brightness(101%) contrast(96%)',
        pink: 'invert(72%) sepia(46%) saturate(2352%) hue-rotate(283deg) brightness(102%) contrast(101%)',
        blue: 'invert(45%) sepia(77%) saturate(1642%) hue-rotate(165deg) brightness(96%) contrast(101%)'
    };

    function applyTheme(color) {
        document.body.style.backgroundColor = themeColors[color];
        uploadIcon.style.filter = filterStyles[color];
        loaderContainer.style.backgroundColor = themeColors[color];
        loader.style.filter = filterStyles[color];
    }

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            const color = this.dataset.color;
            const imageUrl = this.dataset.image;
            
            loaderContainer.style.opacity = '1';
            loaderContainer.style.visibility = 'visible';
            
            applyTheme(color);
            
            umbrellaImage.style.opacity = '0';
            document.body.className = `${color}-theme`;

            setTimeout(() => {
                umbrellaImage.src = imageUrl;
                umbrellaImage.onload = function() {
                    loaderContainer.style.opacity = '0';
                    loaderContainer.style.visibility = 'hidden';
                    umbrellaImage.style.opacity = '1';
                };
            }, 1000);
        });
    });

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.match('image.*') && isFileSizeValid(file)) {
            fileNameDisplay.textContent = file.name;
            loaderContainer.style.opacity = '1';
            loaderContainer.style.visibility = 'visible';

            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    setTimeout(() => {
                        loaderContainer.style.opacity = '0';
                        loaderContainer.style.visibility = 'hidden';
                    }, 500);
                };
                logoImage.src = e.target.result;
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file (PNG, JPG, or SVG) under 5MB.');
        }
    }

    function isFileSizeValid(file) {
        return file.size <= 5 * 1024 * 1024;
    }

    logoUpload.addEventListener('change', handleFileUpload);
});
