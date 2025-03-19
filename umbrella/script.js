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
          
          // Get color and image URL
 
          const color = this.dataset.color;
          const imageUrl = this.dataset.image;
          console.log(color)
          // Show loader
          loaderContainer.style.opacity = '1';
          loaderContainer.style.visibility = 'visible';
          console.log(document.styleSheets)
       
        if(this.dataset.color=='yellow'){
          document.body.style.backgroundColor='#fffed0'
          document.querySelector('.loader-container').style.backgroundColor="#fffed0"
        }else if(this.dataset.color=='pink'){
          document.body.style.backgroundColor='#ffcffb'
             document.querySelector('.loader-container').style.backgroundColor="#ffcffb"
        }else{
          document.body.style.backgroundColor="#abe0f3"
            document.querySelector('.loader-container').style.backgroundColor="#abe0f3"
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
          }, 1000); // 1 second delay to show loading animation
      });
  });
  
  // Handle file upload
  logoUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      
      if (file) {
          // Check if file is an image
          if (!file.type.match('image.*')) {
              alert('Please select an image file (PNG, JPG, or SVG)');
              return;
          }
          fileNameDisplay.textContent = file.name;
          // Show loader
          loaderContainer.style.opacity = '1';
          loaderContainer.style.visibility = 'visible';
          
          // Read and display the file
          const reader = new FileReader();
          
          reader.onload = function(e) {
              // Create a new image to get dimensions
              const img = new Image();
              img.onload = function() {
                  // Hide loader after a short delay
                  setTimeout(() => {
                      loaderContainer.style.opacity = '0';
                      loaderContainer.style.visibility = 'hidden';
                  }, 500);
              };
              
              // Set the logo image source
              logoImage.src = e.target.result;
              img.src = e.target.result;
          };
          
          reader.readAsDataURL(file);
      }
  });
  
  // Handle drag and drop
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      uploadBox.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
  }
  
  ['dragenter', 'dragover'].forEach(eventName => {
      uploadBox.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
      uploadBox.addEventListener(eventName, unhighlight, false);
  });
  
  function highlight() {
      uploadBox.style.borderColor = 'var(--primary-dark)';
      uploadBox.style.backgroundColor = '#f7f7f7';
  }
  
  function unhighlight() {
      uploadBox.style.borderColor = 'var(--primary-color)';
      uploadBox.style.backgroundColor = 'var(--white)';
  }
  
  uploadBox.addEventListener('drop', handleDrop, false);
  
  function handleDrop(e) {
      const dt = e.dataTransfer;
      const file = dt.files[0];
      
      if (file) {
          // Check if file is an image
          if (!file.type.match('image.*')) {
              alert('Please select an image file (PNG, JPG, or SVG)');
              return;
          }
          
          // Show loader
          loaderContainer.style.opacity = '1';
          loaderContainer.style.visibility = 'visible';
          
          // Read and display the file
          const reader = new FileReader();
          
          reader.onload = function(e) {
              // Create a new image to get dimensions
              const img = new Image();
              img.onload = function() {
                  // Hide loader after a short delay
                  setTimeout(() => {
                      loaderContainer.style.opacity = '0';
                      loaderContainer.style.visibility = 'hidden';
                  }, 500);
              };
              
              // Set the logo image source
              logoImage.src = e.target.result;
              img.src = e.target.result;
          };
          
          reader.readAsDataURL(file);
      }
  }
  
  // Click on upload box to trigger file input
  uploadBox.addEventListener('click', function() {
      logoUpload.click();
  });
});