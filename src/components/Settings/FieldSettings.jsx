import React from 'react';
import { FIELD_TYPES } from './constants';
import FieldSettingItem from './components/FieldSettingItem';
import './styles.css';

const FieldSettings = ({ settings, onUpdate }) => {
  const handleFieldUpdate = (fieldName, updates) => {
    onUpdate(fieldName, updates);
  };

  const groupedSettings = {
    'Basic Information': ['consultantName', 'customerName', 'companyName', 'email'],
    'Floor Specifications': ['floorSize', 'floorFinishHeight', 'floorCapacity', 'deckingType'],
    'Additional Features': ['staircase', 'handrail', 'handrailType', 'handrailLength', 'accessGate', 'accessGateType'],
    'Supply Details': ['supplyType', 'totalPrice']
  };

  return (
    <div className="field-settings">
      {Object.entries(groupedSettings).map(([group, fields]) => (
        <div key={group} className="settings-group">
          <h2>{group}</h2>
          <div className="settings-grid">
            {fields.map(fieldName => (
              <FieldSettingItem
                key={fieldName}
                fieldName={fieldName}
                settings={settings[fieldName]}
                onUpdate={(updates) => handleFieldUpdate(fieldName, updates)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FieldSettings;
