const templates = {
  login: function() {
    return {
      body: {
        name: this.userName,
        intro: 'This is a magic link to login to bitbank.',
        action: {
          instructions: 'To login, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Login',
            link: this.validationUrl,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
  },
};

export const fetchBody = ({ templateId, dictionary }) => {
  const templateFn = templates[templateId];
  return templateFn.call(dictionary);
};
