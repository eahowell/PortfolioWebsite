const SkillsChart = () => {
    const skills = [
      { name: 'Root Cause Analysis', subskills: ['Kepner-Tregoe', 'Cause-Mapping'], value: 95 },
      { name: 'Excel & VBA', value: 95 },
      { name: 'Power Platform', subskills: ['PowerApps', 'Power Automate', 'Power BI'], value: 85 },
      { name: 'JavaScript & React', value: 60 },
      { name: 'HTML & CSS', value: 75 },
      { name: 'Git & GitHub', value: 80 },
      { name: 'Databases', subskills: ['SQL', 'mongoDB', 'FirestoreDB'], value: 60 },
      { name: 'UI/UX Frameworks', value: 60 },
      { name: 'RESTful API', value: 55 },
      { name: 'SharePoint', value: 65 },
      { name: 'Data Visualization', value: 65 },
      { name: 'Angular', value: 30 }
    ].sort((a, b) => b.value - a.value);
  
    const SkillBar = ({ skill }) => (
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '0.25rem' 
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start' // Ensures left alignment
          }}>
            <span style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: 'var(--LightText)',
              textAlign: 'left' // Explicit left alignment
            }}>{skill.name}</span>
            {skill.subskills && (
              <div style={{ 
                fontSize: '0.875rem', 
                color: 'var(--AccentBlue)',
                marginTop: '0.25rem',
                textAlign: 'left' // Explicit left alignment
              }}>
                {skill.subskills.join(' • ')}
              </div>
            )}
          </div>
          <span style={{ 
            fontSize: '1.125rem', 
            fontWeight: '500',
            color: 'var(--LightText)',
            paddingLeft: '1rem' // Added padding to separate from skill name
          }}>{skill.value}%</span>
        </div>
        <div style={{ 
          backgroundColor: 'var(--AccentPink)', 
          borderRadius: '9999px',
          height: '1rem',
          opacity: '0.9'
        }}>
          <div
            style={{
              height: '100%',
              borderRadius: '9999px',
              width: `${skill.value}%`,
              backgroundColor: 'var(--AccentBlue)',
              transition: 'width 1s ease-in-out'
            }}
          />
        </div>
      </div>
    );
  
    return (
      <div style={{ 
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          textAlign: 'center',
          color: 'var(--LightText)'
        }}>Technical Skills</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </div>
        
        <div style={{ 
          marginTop: '1.5rem',
          fontSize: '0.875rem',
          color: 'var(--AccentBlue)',
          textAlign: 'center'
        }}>
          Skill levels are represented as relative proficiency percentages
        </div>
      </div>
    );
};