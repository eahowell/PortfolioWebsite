// Create a new file: js/icon-grid.js
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
    // { id: 14, name: "Think Reliability", path: "img/thinkRel.webp" },
    { id: 15, name: "Microsoft Power Platform", path: "img/power-platform2.png" }
  ];

  const containerStyle = {
    padding: '2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '2rem',
    maxWidth: '1100px',
    margin: '0 auto'
  };

  const iconContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const iconBoxStyle = {
    backgroundColor: 'var(--AccentBlue)',
    padding: '1rem',
    borderRadius: '0.5rem',
    width: '6rem',
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease'
  };

  const iconImageStyle = {
    width: '4rem',
    height: '4rem'
  };

  const iconLabelStyle = {
    marginTop: '0.5rem',
    color: 'var(--LightText)',
    fontSize: '1.125rem'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: 'var(--LightText)', fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
        Technologies & Methods
      </h2>
      <div style={gridStyle}>
        {icons.map((icon) => (
          <div key={icon.id} style={iconContainerStyle}>
            <div 
              style={iconBoxStyle}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={icon.path}
                alt={`${icon.name} icon`}
                style={iconImageStyle}
              />
            </div>
            <span style={iconLabelStyle}>{icon.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};