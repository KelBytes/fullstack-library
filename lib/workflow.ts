import { Client } from "@upstash/workflow";
import config from "@/lib/config";
import emailjs from '@emailjs/browser';

export const workflowClient = new Client({
  token: config.env.upstash.qstashToken,
  baseUrl: config.env.upstash.qstashUrl,
});

 emailjs.init({
  publicKey: config.env.emailjs.publicKey,
});

export async function sendEmail({email, message, subject}: {email: string; message: string; subject: string}) {
  
  const templateParams = {
  email: email,
    message: message,
  subject: subject,
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