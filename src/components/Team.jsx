import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { RiSearchLine } from 'react-icons/ri';

function Team() {
  const [teamData, setTeamData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098')
      .then(response => {
        setTeamData(response.data);
      })
      .catch(error => {
        console.error('Error fetching team data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeamData = teamData.filter(member =>
    member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTeamSection = (role) => {
    return (
      <div>
        <h2>{role === 'admin' ? 'Administrators' : 'Members'}</h2>
        <div className="team-list">
          {filteredTeamData.filter(member => member.role === role).map(member => (
            <div key={member.id} className="member-card">
              <img className="avatar" src={member.img} alt={`${member.first_name} ${member.last_name}`} />
              <div className="info">
                <p className="name">{member.first_name} {member.last_name}</p>
                <p className="email">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="team-page">
      <div className="header">
        <h1>Team</h1>
        <div className="search">
          <div className="search-container">
            <RiSearchLine className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      {renderTeamSection('admin')}
      <hr />
      {renderTeamSection('member')}
    </div>
  );
}

export default Team;
