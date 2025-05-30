import emailjs from '@emailjs/browser';

emailjs.init('2n_iGxs89alx-x2NE');

const sendEmail = async (templateParams) => {
    try {
        const res = await emailjs.send('service_rhbu8e4', 'template_3fvjir9', templateParams);
        console.log('SUCCESS!', res.status, res.text);
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

export { sendEmail };
