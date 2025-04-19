import emailjs from '@emailjs/browser';

const EMAIL_SERVICE_ID = 'service_2g2ojpk';
const CONTACT_TEMPLATE_ID = 'template_tkq93s7';
const ORDER_TEMPLATE_ID = 'template_4kbx3hp';
const EMAIL_PUBLIC_KEY = 'dVwNM_13ItVz_G38i';

export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      {
        to_email: 'mrrockeyx@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      EMAIL_PUBLIC_KEY
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

export const sendOrderEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  websiteType: string;
  selectedFeatures: string[];
  theme: string;
  colorStyle: string;
  layout: string;
  budget: string;
  deadline: string;
  totalCost: number;
  estimatedTime: number;
  additionalMessage: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      ORDER_TEMPLATE_ID,
      {
        to_email: 'mrrockeyx@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        website_type: formData.websiteType,
        selected_features: formData.selectedFeatures.join(', '),
        theme: formData.theme,
        color_style: formData.colorStyle,
        layout: formData.layout,
        budget: formData.budget,
        deadline: formData.deadline,
        total_cost: `$${formData.totalCost.toLocaleString()}`,
        estimated_time: `${formData.estimatedTime} days`,
        additional_message: formData.additionalMessage,
      },
      EMAIL_PUBLIC_KEY
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
