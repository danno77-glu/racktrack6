import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import './styles.css';
import Next7DaysAudits from './Next7DaysAudits';

const AuditorDashboard = () => {
  const [auditors, setAuditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuditorStats = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase.rpc('get_auditor_stats').select('*');

        if (error) throw error;

        const sortedData = data.sort((a, b) => b.completed_audits - a.completed_audits);
        setAuditors(sortedData);
      } catch (error) {
        console.error('Error fetching auditor stats:', error);
        setError('Failed to fetch auditor stats.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuditorStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="auditor-dashboard">
      <h1>Auditor Dashboard</h1>

      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <table>
          <thead>
            <tr>
              <th>Auditor</th>
              <th>Completed</th>
              <th>Booked</th>
              <th>Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {auditors.map(auditor => (
              <tr key={auditor.auditor_id}>
                <td>{auditor.auditor_name}</td>
                <td>{auditor.completed_audits}</td>
                <td>{auditor.booked_audits}</td>
                <td>{auditor.outstanding_audits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Next7DaysAudits />
    </div>
  );
};

export default AuditorDashboard;
