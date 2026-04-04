console.log("Welcome to the Community Portal");

window.addEventListener('load', () => {
  alert("Welcome to the Community Portal! Page fully loaded.");
});

class CommunityEvent {
  constructor(id, title, date, category, seats) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.category = category;
    this.seats = seats;
  }
}

CommunityEvent.prototype.checkAvailability = function() {
  return this.seats > 0;
};

function createCategoryTracker() {
  const tracker = {};
  return function(category) {
    tracker[category] = (tracker[category] || 0) + 1;
    return tracker[category];
  };
}
const trackRegistration = createCategoryTracker();

let events = [];

async function loadEvents() {
  const spinner = document.getElementById('spinnerContainer');
  spinner.style.display = 'flex';
  
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error("Failed to fetch events mock database.");
    }
    const data = await response.json();
    
    events = data.map(item => new CommunityEvent(item.id, item.title, item.date, item.category, item.seats));
    
    events.push(new CommunityEvent(5, "Creative Writing Workshop", "2026-08-01", "arts", 12));
    
    if (events.length > 0) {
      console.log("Object.entries of first event:", Object.entries(events[0]));
    }
    
    const formattedEventTitles = events.map(e => `Event: ${e.title} (${e.category})`);
    console.log("Formatted map titles:", formattedEventTitles);
    
    const musicEvents = events.filter(e => e.category === 'music');
    console.log("Filtered music events:", musicEvents);
    
    renderEvents();
    populateSelectOptions();
  } catch (error) {
    console.error("Error occurred while loading events:", error.message);
  } finally {
    spinner.style.display = 'none';
  }
}

function renderEvents() {
  const container = document.getElementById('eventsContainer');
  container.innerHTML = '';
  
  const clonedEvents = [...events];
  
  clonedEvents.forEach(event => {
    const { id, title, date, category, seats } = event;
    
    const isAvailable = event.checkAvailability();
    
    if (!isAvailable && seats === 0) {
      return;
    }
    
    const card = document.createElement('article');
    card.className = `eventCard event-card-item`;
    card.setAttribute('data-category', category);
    
    const categoryBadge = `<span class="badge badge-${category}">${category}</span>`;
    const seatsInfo = `Available Seats: ${seats}`;
    
    card.innerHTML = `
      <div>
        ${categoryBadge}
        <h3>${title}</h3>
        <p class="event-details">Date: ${date}</p>
        <p class="event-details" id="seats-display-${id}">${seatsInfo}</p>
      </div>
      <button class="btn" id="reg-btn-${id}" onclick="quickRegister(${id})">Quick Register</button>
    `;
    
    container.appendChild(card);
  });
}

function populateSelectOptions() {
  const select = document.getElementById('eventSelect');
  select.innerHTML = '<option value="">-- Choose an Event --</option>';
  
  events.forEach(e => {
    if (e.checkAvailability()) {
      const option = document.createElement('option');
      option.value = e.id;
      option.textContent = e.title;
      select.appendChild(option);
    }
  });
}

function quickRegister(eventId) {
  try {
    const event = events.find(e => e.id === eventId);
    if (!event) {
      throw new Error("Event not found.");
    }
    
    if (!event.checkAvailability()) {
      throw new Error(`The event "${event.title}" is already full!`);
    }
    
    event.seats--;
    
    const count = trackRegistration(event.category);
    console.log(`Registered for ${event.category}. Total registrations in this category: ${count}`);
    
    renderEvents();
    populateSelectOptions();
    
    alert(`Successfully registered for ${event.title}!`);
  } catch (error) {
    alert(`Registration failed: ${error.message}`);
  }
}

function filterAndRender() {
  const searchVal = $('#searchInput').val().toLowerCase();
  const categoryVal = $('#categoryFilter').val();
  
  $('.event-card-item').each(function() {
    const title = $(this).find('h3').text().toLowerCase();
    const category = $(this).data('category');
    
    const matchSearch = title.includes(searchVal);
    const matchCategory = (categoryVal === 'all' || category === categoryVal);
    
    if (matchSearch && matchCategory) {
      $(this).fadeIn(300);
    } else {
      $(this).fadeOut(300);
    }
  });
}

$('#searchInput').on('keyup', filterAndRender);
$('#categoryFilter').on('change', filterAndRender);

$('#registerBtn').click(() => {
  console.log("Form registration button clicked via jQuery.");
});

const form = document.getElementById('registrationForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nameInput = form.elements['fullName'];
  const emailInput = form.elements['emailAddr'];
  const eventSelect = form.elements['eventSelect'];
  const feedbackContainer = document.getElementById('formFeedback');
  
  nameInput.classList.remove('is-invalid');
  emailInput.classList.remove('is-invalid');
  eventSelect.classList.remove('is-invalid');
  feedbackContainer.innerHTML = '';
  
  let isValid = true;
  
  if (!nameInput.value || nameInput.value.trim().length < 3) {
    nameInput.classList.add('is-invalid');
    isValid = false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value || !emailRegex.test(emailInput.value)) {
    emailInput.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!eventSelect.value) {
    eventSelect.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  const selectedEventId = parseInt(eventSelect.value);
  const targetEvent = events.find(item => item.id === selectedEventId);
  
  feedbackContainer.innerHTML = '<div class="alert alert-danger" style="background-color: #eff6ff; color: #1d4ed8; border-color: #bfdbfe;">Submitting registration to server...</div>';
  
  setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        userName: nameInput.value,
        userEmail: emailInput.value,
        eventId: selectedEventId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server responded with error.");
      }
      return response.json();
    })
    .then(data => {
      targetEvent.seats--;
      
      const count = trackRegistration(targetEvent.category);
      console.log(`Registered for ${targetEvent.category}. Total registrations: ${count}`);
      
      renderEvents();
      populateSelectOptions();
      
      feedbackContainer.innerHTML = `
        <div class="alert alert-success">
          Success! Registered for ${targetEvent.title}. (Ref ID: ${data.id})
        </div>
      `;
      
      form.reset();
    })
    .catch(error => {
      feedbackContainer.innerHTML = `
        <div class="alert alert-danger">
          Submission failed: ${error.message}
        </div>
      `;
    });
  }, 1200);
});

loadEvents();
