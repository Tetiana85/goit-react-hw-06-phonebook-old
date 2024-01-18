import { Formik } from 'formik';
import {
  Form,
  StyledLabel,
  Field,
  FormButton,
  ErrorMessage,
} from './ContactForm.styled';
import * as Yup from 'yup';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  number: Yup.number()
    .integer('Must be an integer')
    .min(1000000, 'Must be at least 7 digits')
    .max(9999999999999, 'Must be at most 13 digits')
    .required('Required'),
});

const ContactForm = ({ updateContact }) => {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={contactSchema}
        onSubmit={(values, actions) => {
          updateContact(values);
          actions.resetForm();
        }}
      >
        <Form>
          <StyledLabel htmlFor="name">
            Name:
            <Field id="name" name="name" autoComplete="name" />
            <ErrorMessage name="name" component="span" />
          </StyledLabel>

          <StyledLabel htmlFor="number">
            Number:
            <Field id="number" name="number" type="tel" autoComplete="tel" />
            <ErrorMessage name="number" component="span" />
          </StyledLabel>

          <FormButton type="submit">Add contact</FormButton>
        </Form>
      </Formik>
    </div>
  );
};
export default ContactForm;
