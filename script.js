document.getElementById('profileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const qualifications = document.getElementById('qualifications').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
  
    // Create a profile object
    const profile = {
      firstname,
      lastname,
      email,
      qualifications,
      experience,
      skills,
    };
  
    // Save to localStorage (for demonstration purposes)
    localStorage.setItem('jobSeekerProfile', JSON.stringify(profile));
  
    // Display success message
    alert('Profile saved successfully!');
    console.log('Profile Data:', profile);
  
    // Optionally, redirect to another page
    // window.location.href = 'dashboard.html';
  });