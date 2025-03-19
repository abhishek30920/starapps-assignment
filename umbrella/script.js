document.addEventListener('DOMContentLoaded', function() {

    const logoUpload = document.getElementById('logo-upload');
    const logoImage = document.getElementById('logo-image');
    const uploadBox = document.querySelector('.upload-box');
    const loaderContainer = document.querySelector('.loader-container');
    
    const fileNameDisplay = document.createElement('span'); 
    fileNameDisplay.className = 'file-name'; 
    document.querySelector('.upload-text').appendChild(fileNameDisplay);
    const umbrellaImage = document.getElementById('umbrella-image');
  
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const uploadIcon = document.querySelector('.upload-icon img:first-child'); 

    const loader = document.querySelector('.loader');
  
  // Setting initial theme
  document.body.className = 'blue-theme';
  
  // Handle color switch selection
  colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', function() {
          // Remove active class from all switches
          colorSwatches.forEach(s => s.classList.remove('active'));
      
          // Add active class to clicked swatch
          this.classList.add('active');
          
        
 
          const color = this.dataset.color;
          const imageUrl = this.dataset.image;
          console.log(color)
          // Show loader
          loaderContainer.style.opacity = '1';
          loaderContainer.style.visibility = 'visible';
          console.log(document.styleSheets)
       
        if(this.dataset.color=='yellow'){
          document.body.style.backgroundColor='#fffed0'
          document.querySelector('.upload-icon').style.color="fffed0"
          uploadIcon.style.filter = 'invert(85%) sepia(39%) saturate(396%) hue-rotate(354deg) brightness(101%) contrast(96%)';
          document.querySelector('.loader-container').style.backgroundColor="#fffed0"
          document.querySelector('.loader').style.filter='invert(85%) sepia(39%) saturate(396%) hue-rotate(354deg) brightness(101%) contrast(96%)';
        }else if(this.dataset.color=='pink'){
          document.body.style.backgroundColor='#ffcffb'
          uploadIcon.style.filter = 'invert(72%) sepia(46%) saturate(2352%) hue-rotate(283deg) brightness(102%) contrast(101%)';
          document.querySelector('.loader-container').style.backgroundColor="#ffcffb"
          document.querySelector('.loader').style.filter='invert(72%) sepia(46%) saturate(2352%) hue-rotate(283deg) brightness(102%) contrast(101%)';
        }else{
          document.body.style.backgroundColor="#abe0f3"
          uploadIcon.style.filter = 'invert(45%) sepia(77%) saturate(1642%) hue-rotate(165deg) brightness(96%) contrast(101%)';

            document.querySelector('.loader-container').style.backgroundColor="#abe0f3"
            document.querySelector('.loader').style.filter='invert(45%) sepia(77%) saturate(1642%) hue-rotate(165deg) brightness(96%) contrast(101%)';
        }
          umbrellaImage.style.opacity = '0';
          
          // Update theme
          document.body.className = `${color}-theme`;
          
          // Update umbrella image with delay to show loading effect
          setTimeout(() => {
              umbrellaImage.src = imageUrl;
              umbrellaImage.onload = function() {
                  // Hide loader
                  loaderContainer.style.opacity = '0';
                  loaderContainer.style.visibility = 'hidden';
                  umbrellaImage.style.opacity = '1';
              };
          }, 1000); 
      });
  });
  
  // Handle file upload
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.match('image.*')) {
            alert('Please select an image file (PNG, JPG, or SVG)');
            return;
        }
        if (!isFileSizeValid(file)) {
            return;
        }
        if(!file.type.size)
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
    }
}


logoUpload.removeEventListener('change', handleFileUpload);
logoUpload.addEventListener('change', handleFileUpload);
});

function isFileSizeValid(file) {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    
    if (file.size > maxSizeInBytes) {
        alert('File size exceeds 5MB limit. Please select a smaller file.');
        return false;
    }
    
    return true;
}