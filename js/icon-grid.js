const IconGrid = () => {
  const icons = [
    { id: 1, name: "HTML", path: "img/9055395_bxs_file_html_icon.svg" },
    { id: 2, name: "CSS", path: "img/9055543_bxs_file_css_icon.svg" },
    { id: 3, name: "JavaScript", path: "img/9035061_logo_javascript_icon.svg" },
    { id: 6, name: "TypeScript", path: "img/9074220_typescript_icon.svg" },
    { id: 4, name: "React", path: "img/4691292_react native_react_icon.svg" },
    { id: 5, name: "Angular", path: "img/4691504_angular_icon.svg" },
    { id: 7, name: "MongoDB", path: "img/4691284_mongodb_icon.svg" },
    { id: 8, name: "SQL", path: "img/9045090_sql_icon.svg" },
    { id: 9, name: "Firebase", path: "img/4691533_firebase_icon.svg" },
    { id: 10, name: "AWS", path: "img/8546827_aws_icon (1).svg" },
    { id: 11, name: "SharePoint", path: "img/5761482_coding_development_logo_sharepoint_spd_icon.svg" },
    { id: 12, name: "GitHub", path: "img/317712_code repository_github_repository_resource_icon (1).svg" },
    { id: 13, name: "Kepner-Tregoe", path: "img/KT.png" },
    { id: 15, name: "Microsoft Power Platform", path: "img/power-platform2.png" }
  ];

  return (
    <div className="container py-4">
      <h2 className="text-center text-light mb-4 fw-bold">Technologies & Methods</h2>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {icons.map((icon) => (
          <div key={icon.id} className="col text-center">
            <div 
              className="icon-box bg-info p-2 rounded mx-auto"
              style={{ 
                width: '4.5rem', 
                height: '4.5rem',
                transition: 'transform 0.3s ease'
                // cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={icon.path}
                alt={`${icon.name} icon`}
                className="img-fluid p-1"
                style={{ maxHeight: '100%', maxWidth: '100%' , height: '4rem', width: 'auto' }}
              />
            </div>
            <span className="d-block mt-2 text-light small">{icon.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};