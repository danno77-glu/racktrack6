import { processField } from '../../../utils/templateProcessing/fieldProcessor';
import { processConditionals } from '../../../utils/templateProcessing/conditionalProcessor';
import { processVariables } from '../../../utils/templateProcessing/variableProcessor';
import { formatDate } from '../../../utils/dateFormatting';
import { formatCurrency } from '../../../utils/formatters';

export const processTemplate = async (template, quote, settings) => {
  if (!template?.content || !quote || !settings) return '';
  
  // Process all fields with their formatted values
  const processedFields = {
    // Handle special fields
    date: {
      label: 'Date',
      value: formatDate(quote.timestamp)
    },
    referenceNumber: {
      label: 'Reference',
      value: `MQ-${quote.referenceNumber}`
    },
    totalPrice: {
      label: 'Total Price (excl. GST)',
      value: formatCurrency(quote.totalPrice)
    },
    // Handle handrail display
    handrail: {
      label: 'Handrail',
      value: quote.handrailType !== 'No Handrail' && quote.handrailLength 
        ? `${quote.handrailLength}m of ${quote.handrailType}`
        : quote.handrailType || 'No Handrail'
    },
    // Handle access gate display
    accessGate: {
      label: 'Access Gate',
      value: quote.accessGate !== 'No Gate' ? quote.accessGate : 'No Gate'
    },
    accessGateType: {
      label: 'Access Gate Type',
      value: quote.accessGate !== 'No Gate' ? quote.accessGate : 'No Gate'
    }
  };

  // Process all other fields
  Object.entries(quote).forEach(([key, value]) => {
    if (processedFields[key] || !settings[key]) return;

    const processed = processField(settings[key], value);
    processedFields[key] = {
      label: settings[key].label || key,
      value: processed.value
    };
  });

  let content = template.content;

  // Process template in order: conditionals first, then variables
  content = processConditionals(content, processedFields);
  content = processVariables(content, processedFields);

  // Remove any stray template code
  content = content.replace(/{{#if\s+.*?}}.*?{{\/if}}/gs, '');
  content = content.replace(/{{.*?}}/g, '');

  return content;
};
