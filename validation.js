import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required('Le nom complet est requis.'),
  email: yup
    .string()
    .email('Veuillez entrer une adresse email valide.')
    .required('L\'adresse email est requise.'),
  phone: yup
    .string()
    .matches(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Le format du numéro de téléphone est invalide.')
    .required('Le numéro de téléphone est requis.'),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .required('Le mot de passe est requis.'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas.')
    .required('La confirmation du mot de passe est requise.'),
});