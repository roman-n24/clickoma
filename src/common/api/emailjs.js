import emailjs from '@emailjs/browser';

export class EmailJS {
    constructor(parentStateManager) {
        this.parentStateManager = parentStateManager

        emailjs.init('2n_iGxs89alx-x2NE');
    }

    sendEmail = async (templateParams) => {
        try {
            const res = await emailjs.send('service_rhbu8e4', 'template_3fvjir9', templateParams);
            this.parentStateManager.state.sendEmail = true
            console.log('SUCCESS!', res.status, res.text);
        } catch (err) {
            console.error('Error sending email:', err);
            this.parentStateManager.state.sendEmail = false
        }
    };
}