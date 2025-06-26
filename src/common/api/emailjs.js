import emailjs from '@emailjs/browser';
import data from '../../../data.json'

export class EmailJS {
    constructor(parentStateManager) {
        this.parentStateManager = parentStateManager

        emailjs.init(data.emailjs.publicKey);
    }

    sendEmail = async (templateParams) => {
        try {
            const res = await emailjs.send(data.emailjs.serviceKey, data.emailjs.templateKey, templateParams);
            this.parentStateManager.state.sendEmail = true
            console.log('SUCCESS!', res.status, res.text);
        } catch (err) {
            console.error('Error sending email:', err);
            this.parentStateManager.state.sendEmail = false
        }
    };
}