// Theme management
const themes = [
  { name: 'theme1', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
  { name: 'theme2', url: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
  { name: 'theme3', url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
  { name: 'theme4', url: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
  { name: 'theme5', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' }
];

function setRandomTheme() {
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  document.body.style.backgroundImage = `url('${randomTheme.url}')`;
  localStorage.setItem('currentTheme', randomTheme.name);
}

// Set theme on page load
window.addEventListener('load', () => {
  const currentTheme = localStorage.getItem('currentTheme');
  if (!currentTheme) {
    setRandomTheme();
  } else {
    const theme = themes.find(t => t.name === currentTheme);
    if (theme) {
      document.body.style.backgroundImage = `url('${theme.url}')`;
    } else {
      setRandomTheme();
    }
  }
});

// Simulated event types data
const eventTypes = [
  { id: 1, name: "Party", description: "Celebrate any occasion with a fun-filled party", price: 1000 },
  { id: 2, name: "Ceremony", description: "Formal events for special occasions", price: 1500 },
  { id: 3, name: "Wedding", description: "Beautiful wedding ceremonies and receptions", price: 5000 },
  { id: 4, name: "Conference", description: "Professional gatherings for various industries", price: 4000 },
  { id: 5, name: "Concert", description: "Live music performances for all genres", price: 3000 }
];

// User Login
const userLoginForm = document.getElementById('userLoginForm');
if (userLoginForm) {
  userLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    
    if ((email === 'amanv4674@gmail.com' && password === '@Aman123') ||
        (email === 'amit123@gmail.com' && password === '@Amit123')) {
      alert('Login successful!');
      window.location.href = 'event-types.html';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });
}

// Admin Login
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    if (email === 'vermaman03@gmail.com' && password === 'P@ssw0rd') {
      alert('Admin login successful!');
      window.location.href = 'admin-dashboard.html';
    } else {
      alert('Invalid admin credentials. Please try again.');
    }
  });
}

// Event Type Selection
const eventTypeGrid = document.getElementById('eventTypeGrid');
if (eventTypeGrid) {
  eventTypes.forEach(eventType => {
    const eventTypeElement = document.createElement('div');
    eventTypeElement.classList.add('event-type');
    eventTypeElement.innerHTML = `
      <h3>${eventType.name}</h3>
      <p>${eventType.description}</p>
      <p class="price">$${eventType.price}</p>
      <button class="btn btn-primary select-event" data-event-id="${eventType.id}">Select</button>
    `;
    eventTypeGrid.appendChild(eventTypeElement);
  });

  // Add event listeners to the select buttons
  const selectButtons = document.querySelectorAll('.select-event');
  selectButtons.forEach(button => {
    button.addEventListener('click', function() {
      const eventId = this.getAttribute('data-event-id');
      const selectedEvent = eventTypes.find(event => event.id === parseInt(eventId));
      if (selectedEvent) {
        localStorage.setItem('selectedEventType', JSON.stringify(selectedEvent));
        window.location.href = 'book-event.html';
      }
    });
  });
}

// Update Book Event form to include selected event type
const bookEventForm = document.getElementById('bookEventForm');
if (bookEventForm) {
  const selectedEventType = JSON.parse(localStorage.getItem('selectedEventType'));
  if (selectedEventType) {
    const eventTypeDisplay = document.createElement('div');
    eventTypeDisplay.classList.add('selected-event-type');
    eventTypeDisplay.innerHTML = `
      <h3>Selected Event Type: ${selectedEventType.name}</h3>
      <p>Price: $${selectedEventType.price}</p>
    `;
    bookEventForm.insertBefore(eventTypeDisplay, bookEventForm.firstChild);
  }

  bookEventForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const attendees = document.getElementById('attendees').value;
    const location = document.getElementById('location').value;
    const eventDescription = document.getElementById('eventDescription').value;
    
    const newEvent = { 
      ...selectedEventType,
      eventName, 
      eventDate, 
      eventTime, attendees,
      location,
      eventDescription
    };
    
    // In a real application, you would send this data to a server to save the event
    alert('Event booked successfully!');
    localStorage.removeItem('selectedEventType');
    window.location.href = 'event-types.html';
  });
}

// Admin Dashboard
const upcomingEventList = document.getElementById('upcomingEventList');
const completedEventList = document.getElementById('completedEventList');

if (upcomingEventList && completedEventList) {
  // In a real application, you would fetch this data from a server
  const events = [
    { id: 1, name: "Company Conference", type: "Conference", date: "2024-06-15", time: "09:00", status: "upcoming" },
    { id: 2, name: "Summer Music Festival", type: "Concert", date: "2024-07-20", time: "18:00", status: "upcoming" },
    { id: 3, name: "Annual Charity Gala", type: "Ceremony", date: "2024-05-10", time: "19:00", status: "completed" },
    { id: 4, name: "Tech Startup Launch Party", type: "Party", date: "2024-04-05", time: "20:00", status: "completed" }
  ];

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event-item');
    eventElement.innerHTML = `
      <h4>${event.name}</h4>
      <p>Type: ${event.type}</p>
      <p>Date: ${event.date}</p>
      <p>Time: ${event.time}</p>
    `;

    if (event.status === 'upcoming') {
      upcomingEventList.appendChild(eventElement);
    } else {
      completedEventList.appendChild(eventElement);
    }
  });
}

// Logout functionality
const logoutLinks = document.querySelectorAll('#logoutLink');
logoutLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // In a real application, you would invalidate the session on the server
    alert('You have been logged out.');
    window.location.href = 'index.html';
  });
});

