function setupNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-expand-lg navbar-dark';
  nav.style.backgroundColor = '#052438';
  
  nav.innerHTML = `
    <div class="container-fluid">
      ${currentPage !== 'index.html' ? `
        <a class="navbar-brand" href="./index.html">
          <img src="img/FullLogo3.png" alt="Full Logo for Developer Elizabeth Howell" height="80">
        </a>
      ` : `<a class="navbar-brand" href="./index.html">
          <img src="img/FullLogo3.png" alt="Full Logo for Developer Elizabeth Howell" height="80" style="visibility: hidden;">
        </a>`}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="./index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'about.html' ? 'active' : ''}" href="./about.html">About Me</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'work.html' ? 'active' : ''}" href="./work.html">Portfolio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}" href="./contact.html">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  `;

  const header = document.querySelector('.page-header');
  header.innerHTML = '';
  header.appendChild(nav);
}

document.addEventListener('DOMContentLoaded', setupNavigation);
