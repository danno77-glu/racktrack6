import React, { useState, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { processTemplate } from './utils/templateProcessor';

const QuotePreview = ({ template, quote }) => {
  const { settings, loading } = useSettings();
  const [processedContent, setProcessedContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const processContent = async () => {
      if (!template || !quote || !settings) return;
      
      try {
        const content = await processTemplate(template, quote, settings);
        setProcessedContent(content);
        setError(null);
      } catch (err) {
        console.error('Error processing template:', err);
        setError('Error processing template');
      }
    };

    processContent();
  }, [template, quote, settings]);

  if (loading) {
    return (
      <div className="quote-preview loading">
        Loading template...
      </div>
    );
  }

  if (error) {
    return (
      <div className="quote-preview error">
        {error}
      </div>
    );
  }

  if (!processedContent) {
    return (
      <div className="quote-preview empty">
        Select a template to preview the quote
      </div>
    );
  }

  return (
    <div className="quote-preview">
      <div 
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: processedContent }} 
      />
    </div>
  );
};

export default QuotePreview;
