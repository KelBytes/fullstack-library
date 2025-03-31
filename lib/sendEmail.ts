import emailjs from '@emailjs/browser';
import config from "@/lib/config";


export async function sendEmail({ email, message, subject }: { email: string; message: string; subject: string }) {
  
  const templateParams = {
  email,
    message,
  subject,
};

 
  // Implement email sending logic here
  emailjs.send(config.env.emailjs.serviceId, config.env.emailjs.templateId, templateParams).then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (error) => {
      console.log('FAILED...', error);
    },
  );
}