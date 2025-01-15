// Define showProjectDetails globally
window.showProjectDetails = function(projectId) {
    fetch("projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                document.getElementById("DetailsModalCenterTitle").textContent = project.title;

                const modalBody = document.getElementById("modalBody");
modalBody.innerHTML = `
    <img src="${project.logoImage.src}" alt="${project.logoImage.alt}" style="height: ${project.logoImage.style.height};">
    <br>
    ${project.links.map(link => `<a class="project-item-links button1" href="${link.url}" target="_blank" title="${link.title}">${link.text}</a>`).join('')}
    <br><br>
    <h2>Description</h2>
    <p class="text-start">${project.description}</p>
    <p class="text-start">${project.stack}</p>
    <h3 class="text-start"> Login</h3>
    <p class="text-start"> <strong> ${project.loginData}</p>
    <h3>My role was to build:</h3>
    <ul class="list-group">
        ${project.role.map(item => `<li class="list-group-item text-start">${item}</li>`).join('')}
    </ul>
    <br/>
    <h3>I learned to:</h3>
    <ul class="list-group">
        ${project.learnings.map(item => `<li class="list-group-item text-start">${item}</li>`).join('')}
    </ul>
    <br/>
    <h3>Technologies Used</h3>
    <ul class="list-group list-group-horizontal flex-wrap">
        ${project.technologies.map(tech => `<li class="list-group-item text-start">${tech}</li>`).join('')}
    </ul>
    <br/>
    <h3>Project Images</h3>
    <div class="project-images">
        ${project.images.map(image => `
            <div class="project-image-container">
                <img src="${image.src}" alt="${image.alt}" style="height: ${image.style.height};">
            </div>
        `).join('')}
    </div>
`;

                const modal = new bootstrap.Modal(document.getElementById("ProjectDetailsModalCenter"));
                modal.show();
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};

// Load and process the JSON data
document.addEventListener('DOMContentLoaded', function() {
    fetch("projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const projectList = document.getElementById("projectList");

            data.projects.forEach(project => {
                const projectItem = document.createElement("div");
                projectItem.className = "project-list__item";
                projectItem.innerHTML = `
                    <h3>${project.title}</h3>
                    <img src="${project.logoImage.src}" alt="${project.logoImage.alt}" style="height: ${project.logoImage.style.height};">
                    <p>${project.description}</p>
                    <button class="btn btn-secondary" onclick="showProjectDetails(${project.id})">View Details</button>
                `;
                projectList.appendChild(projectItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});