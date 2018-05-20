export const validationMessages = {
  emailIsRequired: "Please input your email!",
  passwordIsRequired: "Please input your Password!",
  emailFormatIsIncorrect: "The input is not valid E-mail!",
  confirmIsRequired: "Please confirm your password!",
  nicknameIsRequired: "Please input your nickname!"
};

export const validationRules = {
  email: [
    {
      required: true,
      message: validationMessages.required
    },
    {
      type: 'email',
      message: validationMessages.emailFormatIsIncorrect
    }
  ],
  password: [
    {
      required: true,
      message: validationMessages.required
    }
  ],
  confirm: [
    {
      required: true,
      message: validationMessages.confirmIsRequired
    }
  ],
  nickname: [
    {
      required: true,
      message: validationMessages.nicknameIsRequired,
      whitespace: true
    }
  ]
};
