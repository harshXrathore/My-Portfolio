import emailjs from '@emailjs/browser';

export interface SendEmailParams {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

/**
 * Sends an email using the EmailJS browser client.
 * Validates variables and handles asynchronous dispatch.
 */
export const sendEmail = async (params: SendEmailParams): Promise<any> => {
  const sanitizeEnv = (val: string | undefined): string => {
    if (!val) return '';
    return val.trim().replace(/^['"]|['"]$/g, '');
  };

  const serviceId = sanitizeEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID);
  const templateId = sanitizeEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
  const publicKey = sanitizeEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  // Verify environment variables are present and not standard placeholders
  if (
    !serviceId || 
    !templateId || 
    !publicKey || 
    serviceId.includes('_here') || 
    templateId.includes('_here') || 
    publicKey.includes('_here')
  ) {
    throw new Error('EmailJS keys are not configured. Please supply valid VITE_EMAILJS credentials.');
  }

  const templateParams = {
    from_name: params.from_name,
    from_email: params.from_email,
    subject: params.subject || 'Cybersecurity Portfolio: Direct Inquiry',
    message: params.message,
  };

  console.log('DEBUG [EmailJS Dispatch Keys]:', {
    serviceId,
    templateId,
    publicKey,
    templateParams
  });

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
};
