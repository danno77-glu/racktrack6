import React from 'react';
    import FieldSettings from './FieldSettings';
    import { useFieldSettings } from './hooks/useFieldSettings';
    import AuditorSettings from './AuditorSettings';
    import DamagePriceSettings from './DamagePriceSettings';
    import './styles.css';

    const Settings = () => {
      const { settings, loading, error, updateField, resetToDefaults, updateDamagePrices } = useFieldSettings();

      if (loading) {
        return <div className="settings-loading">Loading settings...</div>;
      }

      if (error) {
        return <div className="settings-error">Error: {error}</div>;
      }

      return (
        <div className="settings">
          <div className="settings-header">
            <h1>Form Settings</h1>
            <button onClick={resetToDefaults} className="reset-button">
              Reset to Defaults
            </button>
          </div>

          <FieldSettings 
            settings={settings}
            onUpdate={updateField}
          />
          <AuditorSettings />
          <DamagePriceSettings
            damagePrices={settings.damagePrices}
            onUpdate={updateDamagePrices}
          />
        </div>
      );
    };

    export default Settings;
